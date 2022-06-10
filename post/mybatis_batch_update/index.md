
业务需要，要完成批量编辑产品名称。运用Mybatis的批量更新功能，同时因为需要更新的数据是iterator迭代出来的，所以需要在前端做一个标记。

### Entity
产品有产品ID、产品名称两个属性：

![product](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/product.png)

```java
public class Product extends BaseEntity {
    /** 产品ID */
    private String productId;
    /** 产品名称 */
    private String name;
    /** 产品列表查询 */
    private List productList;
    //以下省了get和set方法...
}
```

### Controller
```java
@Action(value = "updateProduct", results = { @Result(name = "success", location = "/pages/backstage/manage-product-list.jsp") })
public String updateProduct() {
    product = new Product();
    product.setProductList(productList);
    UpdateProductService service = new UpdateProductService();
    service.setEntity(product);
    service.excuteService();
    return "success";
}
```

### Service
```java
public class UpdateProductService extends BaseService {
    protected Object makeService(Product entity, SqlSession sqlSession) {
    ProductDao dao = sqlSession.getMapper(ProductDao.class);
    dao.updateProduct(entity);
    return entity;
}
}
```

### Dao
```java
public interface ProductDao {
    public int updateProduct(Product product);
}
```

### Sql
```xml
<insert id="updateProduct" parameterType="com.xxxxx.product.entity.Product">
    replace into product (
        product_id,name
    ) values
    <foreach collection="productList" item="productList" index="index" separator=",">
        (#{productList.productId}, #{productList.name})
    </foreach>
</insert>
<!--此处其实就是运用Mybatis的foreach标签来拼sql-->
```

### html
```html
<body>
    <script type="text/javascript">
    $(function() {
        $("#btn-save").on('click', function() {
            $("#updateProduct").submit();
        })
    });
    </script>
    <div class="panel panel-default">
        <div class="panel-heading">产品列表</div>
        <div class="panel-body">
        <ul class="tool-bar">
            <li>
                <a href="javascript:void(0);" id="btn-save">
                    <span class="glyphicon glyphicon-floppy-disk">
                    </span> 保存
                </a>
            </li>
        </ul>
    <div class="double-line"></div>
    <s:form role="form" action="updateProduct" method="post" namespace="/admin" theme="simple">
    <br />
    <ul class="list-group">
    <s:iterator value="product.productList" status="statusTest">
        <li class="list-group-item list-group-item-text">
            <h5>产品列表</h5> 
            <s:hidden name="%{'productList['+#statusTest.index+'].productId'}" value="%{productId}"></s:hidden>
            <div class="form-group input-group">
            <span class="input-group-addon"> 
                <span class="glyphicon glyphicon-pencil"></span> 标题
            </span>
            <s:textfield cssClass="form-control" name="%{'productList['+#statusTest.index+'].name'}" value="%{name}"></s:textfield>
            </div>
        </li>
    </s:iterator>
    </ul>
    </s:form>
    </div>
</div>
```

### 实现效果
如下图所示：

![edit-product](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/edit-product-4994274.png)