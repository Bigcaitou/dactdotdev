
## PonyORM生成SQL原理




详见《[How Pony ORM translates Python generators to SQL queries](https://www.slideshare.net/ponyorm/pony-orm-ep2014-slideshare)》


### AST

> 在计算机科学中，抽象语法树（Abstract Syntax Tree，AST），或简称语法树（Syntax tree），是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。之所以说语法是“抽象”的，是因为这里的语法并不会表示出真实语法中出现的每个细节。比如，嵌套括号被隐含在树的结构中，并没有以节点的形式呈现；而类似于 if-condition-then 这样的条件跳转语句，可以使用带有两个分支的节点来表示。 

![](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/20181017111303.png)

#### 后续遍历二叉树
### Python generator to SQL translation

1. Decompile bytecode and restore AST
2. Translate AST to ‘abstract SQL’
3. Translate ‘abstract SQL’ to a specific SQL dialect

### 踩坑记录 

service match_name的查询方法改成filter的形式

![](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/20181017111731.png)


service in services的形式  services是在BaseControl里的根据project筛选的



```python
items = select(
    item 
    for item in self.model 
    if item.project == project
)
```
然后再用select 相当于会有两个sql语句 而且是in services的形式 sql非常非常长 !

![20181017111739](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/20181017111739.png)

换成filter以后相当于最后才组装sql 把之前对project筛选也加进去 sql比较简洁 !

![20181017111744](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/20181017111744.png)



## 属性常见标记

* required
* optional
* primary

> Required and Optional <br>Usually most entity attributes are of Required or Optional kind. If an attribute is defined as Required then it must have a value at all times, while Optional attributes can be empty. <br>If you need the value of an attribute to be unique then you can set the attribute option unique=True. 



![20181017111058](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/20181017111058.png)

## 代码案例

### PonyORM code 

```python
class MainTable(db.Entity):id = Required(int)
    optional_attr = Optional(str)
    required_attr = Required(str)
    primary_attr = Required(str)
    unique_attr = Optional(Decimal, unique=True)
    nullable_attr = Optional(date, nullable=True)
    one_to_one_table = Required('OneToOneTable')
    one_to_many_table = Required('OneToManyTable')     
    many_to_one_tables = Set('ManyToOneTable')
    many_to_many_tables = Set('ManyToManyTable')
    PrimaryKey(id, primary_attr)
    
```
### MySQL code

MySQL生成的sql，注意optional_attr也是 `NOT NULL`，因为MySQL中的`NULL` 和 `空值` 不是一个概念，最好在Requied


```sql
CREATE TABLE `maintable` (
    `id` INTEGER NOT NULL,   
    `optional_attr` VARCHAR(255) NOT NULL,   
    `required_attr` VARCHAR(255) NOT NULL,   
    `primary_attr` VARCHAR(255) NOT NULL,   
    `unique_attr` DECIMAL(12, 2) UNIQUE,   
    `nullable_attr` DATE,   
    `one_to_one_table` INTEGER NOT NULL,   
    `one_to_many_table` INTEGER NOT NULL,   
    CONSTRAINT `pk_maintable` PRIMARY KEY (`id`, `primary_attr`) 
);
```


## 多表关联 

![20181017110420](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/20181017110420.png)

### cascade_delete关联删除


当PonyORM删除实体(entity)的实例(instance)的时候，它还需要删除与其他对象(object)的关系。两个对象之间的关系由两个关系属性定义的。



* 如果关系的另一侧被声明为 `Set` ，则只需要从该集合中删除该对象；
* 多对一，删除该实例 * 多对多，删除中间表 
* 如果另一边被声明为 `Optional` ，则只需把它设置为None； 
* 如果另一边被声明为 `Required`，不能为该关系属性指定None

可以使用属性的 `cascade_delete` 选项更改此默认行为。默认情况下，当关系的另一侧声明为Required时，此选项设置为True，对于所有其他关系类型，此选项设置为False。



* True 意味着 Pony 总是做关联删除，即时另一边定义的是 Optional。 
* False 意味着 Pony 总是不对这个关系做关联删除。

### 关联关系表

| cascade_delete | A和B的关系 |  B在A中的声明 |  A在B中的声明 | 操作 | 说明 |
|---|---|---|---|---|---|
| False | 所有关系 | 所有类型  | Require |  删除A | 因为B的声明中A是Require必须的，如果A被删除且B有记录，则会报错（raises the ConstraintError）|
 True | 一对一| |  | 删除A |  B也会删除 | 
| True | 一对多 | Set | Optional | | | 
| True | 一对多 | Set | Required | | | 
| True | 多对一 | Optional | Set | | |
| True | 多对一 | Required | Set | | |
| True | 多对一 | Set | Set | |TypeError: 'cascade_delete' option cannot be set for attribute Crontab.requestlog, because reverse attribute RequestLog.crontab is collection |

#### 案例

如果在另一端将关系定义为Required并且cascade_delete = False，则Pony会在删除尝试时引发ConstraintError异常，例如删除Services关联着Domain表，因为Domain表有外键依赖于Service，所以如果不把Domain关联联删除，删除Service时会报错。



### 采坑记录 
[How to use a SQL View with Pony ORM](https://stackoverflow.com/questions/44060834/how-to-use-a-sql-view-with-pony-orm")



### inner join和left join


[Pony ORM JOIN syntax](https://stackoverflow.com/questions/41847908/pony-orm-join-syntax)


#### raw sql 


You can write raw SQL query without defining any entity:



```python
with db_session:
    start_date = date(2017, 1, 1)
    rows = db.select('''
        SELECT `Date` AS dt, `Aluminum Count` AS ac, `PET Count` AS pc         
        FROM `ResidueCountByDate`
        WHERE `Date` >= $start_date
    ''')
    for row in rows:
        print(row[0], row[1], row[2])
        print(row.dt, row.ac, row.pc)  # the same as previous row 
```

#### new entity 


Define a new entity and specify the view name as a table name for that entity:


```python
class ResidueCountByDate(db.Entity):
    dt = PrimaryKey(date, column='Date')
    aluminum_count = Required(int, column='Aluminum Count')     
    pet_count = Required(int, column='PET Count')
```


After that you can use that entity to select data from the view:


```python
with db_session:
    start_date = date(2017, 1, 1)
    query = select(
        rc for rc in ResidueCountByDate 
        if rc.date >= start_date)
    for rc in query:
        print(rc.date, rc.aluminum_count, rc.pet_count)
```


By default, a column name is equal to an attribute name. I explicitly specified column for each attribute, because in Python attribute names cannot contain spaces, and usually written in lowercase. It is possible to explicitly specify table name if it is not equal to entity name:



```python
class ResidueCount(db.Entity):
    _table_ = 'ResidueCountByDate'
```

