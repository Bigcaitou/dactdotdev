
因为禾斗石开需要，安装了中标麒麟高级服务器操作系统（虚拟化版）V6，然后该系统上部署了几个JAVA WEB项目，现在需要安装nginx，但是yum无法使用，出现以下异常信息：

```
Loaded plugins: refresh-packagekit, security
http://****: [Errno 14] PYCURL ERROR 22 - "The requested URL returned error: 404 Not Found"
Trying other mirror.
Error: Cannot retrieve repository metadata (repomd.xml) for repository: base. Please verify its path and try again
```

## 修改yum源改为163
```
cd  /etc/yum.repos.d/
# 备份原有的源
mv ns6-gen-x86_64.repo ns6-gen-x86_64.repo.old
# 下载网易163的源
wget http://mirrors.163.com/.help/CentOS6-Base-163.repo
mv CentOS6-Base-163.repo CentOS-Base.repo
yum clean all
yum makecache
```


但在 yum makecache报错：

```
http://mirrors.163.com/centos/6/os/x86_64/repodata/repomd.xml: [Errno 14] PYCURL ERROR 22 - "The requested URL returned error: 404 Not Found"
尝试其他镜像。错误：Cannot retrieve repository metadata (repomd.xml) for repository: base. Please verify its path and try again
```


这是因为无法访问http://mirrors.163.com/centos/6/os/x86_64/repodata/repomd.xml，repomd.xml 在http://mirrors.163.com/centos/6-6.5下已经不存在，需要更改CentOS-Base.repo此文件中的`$releasever` 参数，对于CentOS来说，`$releasever` 来源于 `rpm -qi centos-release`  的version数值。

```
# 查询中标麒麟系统的版本
cat /proc/version
Linux version 2.6.32-358.el6.x86_64 (mockbuild@ns60x64.cs2c.com.cn) (gcc version 4.4.7 20120313 (NeoKylin 4.4.7-3) (GCC) ) #1 SMP Fri Jul 12 10:25:19 CST 2013
```


对于中标麒麟高级服务器操作系统（虚拟化版）V6，经过测试，$releasever直接取 ** 6 ** 即可。

```
vim  CentOS-Base.repo
#vim命令模式下将所有的$releasever替换为6
:1,s/$releasever/6/g
# 再执行后续的指令
yum clean all
yum makecache
```

## 添加nginx的源
根据NGINX官方文档的安装方法：

> To add NGINX yum repository, create a file named  and paste one of the configurations below:

```shell
cd /etc/yum.repos.d/
# 新建nginx.repo文件
vim nginx.repo
# 填写以下内容
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/rhel/$releasever/$basearch/
gpgcheck=0
enabled=1
```

注意：`$releasever` 和`$basearch` 需要根据系统来确定，中标麒麟高级服务器操作系统（虚拟化版）V6最后确定为http://nginx.org/packages/rhel/6/x86_64/

## 安装pcre
尝试安装`yum install nginx` , 安装nginx时报错，因为nginx的rewrite需要pcre库。

```
./configure: error: the HTTP rewrite module requires the PCRE library.
```


安装pcre-devel解决问题

```
yum -y install pcre-devel
```


重新安装nginx依然出现错误提示：

```
./configure: error: the HTTP cache module requires md5 functions
from OpenSSL library.   You can either disable the module by using
–without-http-cache option, or install the OpenSSL library into the system,
or build the OpenSSL library statically from the source with nginx by using
–with-http_ssl_module –with-openssl=&lt;path&gt; options.
```


安装openssl相关软件：

```
yum -y install openssl openssl-devel
```


安装pcre：

```
# 下载相应版本的pcre
pcre-8.39.tar.bz2
# 解包解压缩
tar xjpf pcre-8.39.tar.bz2
# 切换到pcre的目录
cd pcre-7.8
# 配置
./configure --prefix=/usr/local/pcre-8.39 --libdir=/usr/local/lib/pcre --includedir=/usr/local/include/pcre
```


configure有许多参数可配，具体参见./configure –help及手册

```
# 编译及安装
make
make install
```

## 安装NGINX

最后尝试安装`yum install nginx` ，完成。

## 参考链接

* [解决centos 6.6 更换yum 163源报错](http://461205160.blog.51cto.com/274918/1739813)
* [CentOS镜像使用帮助](http://mirrors.163.com/.help/centos.html)
* [Install](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/)
* [PCRE-nginx pcre library not found](http://tech.49jie.com/?p=859)