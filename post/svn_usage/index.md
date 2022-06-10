
## 安装
&emsp;&emsp;在CentOS的终端中运行以下命令：
```shell
yum install subversion
```
* 新建目录
    * 用于存储SVN所有文件
    
    ```shell
    mkdir /svn
    ```
* 新建svn项目
    
    ```shell
    svnadmin create /svn/project
    ```
* 目录中包含以下文件及文件夹

    ```shell
    ls /svn/project/
    conf
    db
    format
    hooks
    locks
    README.txt
    ```

### 目录用途说明

* hooks目录：放置hook脚本文件的目录
* locks目录：用来放置subversion的db锁文件和db_logs锁文件的目录，用来追踪存取文件库的客户端
* format文件：是一个文本文件，里面只放了一个整数，表示当前文件库配置的版本号
* conf目录：是这个仓库的配置文件（仓库的用户访问账号、权限等）

## 配置
### svnserve.conf文件
&emsp;&emsp;svn服务的配置文件

```shell
vi /svn/project/conf/svnserve.conf
[general]
anon-access = none
auth-access = write
password-db = /svn/project/conf/passwd#密码配置文件的位置
authz-db = /svn/project/conf/authz#权限配置文件的位置
realm = My Test Repository#svn提示信息
```

### 用户及密码passwd

```shell
vi /svn/project/conf/passwd
[users]
xiaoran.shen = 123456
test1 = 123456
test2 = 123456
```
注意：对用户配置文件的修改立即生效，不必重启svn服务。
### 用户授权authz

```shell
vi /svn/project/conf/authz
[groups]
admin = xiaoran.shen,test1
user = test2
[/]
@admin = rw
@user = r
* =
```

> 格式说明：
版本库目录格式：
[<版本库>:/项目/目录]
@<用户组名> = <权限>
<用户名> = <权限>
/ 表示对根目录（即/svn/project目录）下的所有子目录范围设置权限；
[/abc] 表示对资料库中abc项目设置权限；
创建一个admin组，组成员包括xiaoran.shen和test1
创建一个user组，成员只有test2；
admin组对目录有读写权限；
单个用户test2有读写权限；
*=表示除了上面设置的权限用户组以外，其他所有用户都设置空权限，空权限表示禁止访问本目录，这很重要一定要加上。
注意：对权限配置文件的修改立即生效，不必重启svn。

---

## 维护
### 启动svn服务
```shell
svnserve -d -r /svn/project/
```
&emsp;&emsp;如果是svn目录下有多个项目，则启动`svnserve -d -r /svn/`即可将svn目录下所有的项目启动。

### 关闭svn服务：
```shell
ps -ef | grep svn
root 4642 10 16:08 ?00:00:00 svnserve -d -r /svn/project/
root 469236760 16:13 pts/200:00:00 grep svn

kill -9 4642
```
或者
```shell
killall svnserve
```
若要使用 `/etc/init.d/svnserve` 脚本，可以修改start（）函数部分，如下：

```shell
start() {
    [ -x $exec ] || exit 5
    [ -f $config ] || exit 6
    echo -n $"Starting $prog: "
    daemon --pidfile=${pidfile} $exec $args -r /svn/project
    retval=$?
    echo $retval -eq 0 ] && touch $lockfile
    return $retval
}
```

### svn自启动
&emsp;&emsp;在rc.local自启动文件中录入需要linux自启动时候运行的脚本。

```shell
vim /etc/rc.d/rc.local
svnserve -d -r /usr/svn/
```

## 使用
### 使用windows的客户端
打开TortoiseSVN Repository Browser工具
在URL中输入：
svn://192.168.***.***回车，提示输入用户名和口令

### 使用Linux下的命令行

```shell
svn co svn://192.168.11.229
```

## 迁移
&emsp;&emsp;如果需要把一个svn数据迁移到另一个svn项目。
### dump文件
&emsp;&emsp;把原来的Repository完整导出成一个dump文件。

```shell
svnadmin dump oldpath/repo/  newpath/dumpfile
```

&emsp;&emsp;其中oldpath/repo/是老机器上版本库所在的位置.
### 导入
&emsp;&emsp;将dump文件导入到新的Repository中

```shell
cd newpath/dumpfile
svnadmin load newpath/repo/path dumpfile
```

### 检查
&emsp;&emsp;Repository文件夹下conf目录中的各个配置文件，然后启动服务同上文相似。


## FAQ
1. 命令行方式连接，提示`svn: No repository found in 'svn://192.168.***.***/project'`错误？
解决：启动svn服务的时候没有使用-r /svn/project参数，没有指明资源库的具体路径。使用`## svnserve -d -r /svn/project/` 命令来启动就可以了，不要使用系统提供的`/etc/init.d/svnserve start` 来启动，因为系统默认的启动脚本中没有使用–r /svn/project参数指定一个资源。这种情况下启动的svn服务，客户端连接会提示`svn: No repository found in 'svn://192.168.***.***/project' `这样的错误，默认svn服务器端口是3690。
2. 执行命令`## svn co svn://192.168.***.***/project`时提示“svn: Authorization failed”错误？
解决：一般这种授权失败的错误原因都来自conf/authz文件的配置
正确的配置如下：
``` conf
[groups]
admin = xiaoran.shen,test1
user = test2
[/]
@admin = rw
@user = rw
* =
```

## 链接

* 官网下载：[http://subversion.apache.org/packages.html](http://subversion.apache.org/packages.html)
* SVN客户端：TortoiseSVN，官网下载：[http://tortoisesvn.net/downloads.html](http://tortoisesvn.net/downloads.html)
