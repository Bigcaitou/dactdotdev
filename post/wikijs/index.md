
[TOC]

https://docs.requarks.io/install/linux

https://github.com/Requarks/wiki/releases

release可以看到具体的文件有多大

```bash
wget https://github.com/Requarks/wiki/releases/download/v2.5.276/wiki-js.tar.gz
```



1. Extract the package to the final destination of your choice:

```bash
mkdir wiki
tar xzf wiki-js.tar.gz -C ./wiki
cd ./wiki
```



1. Rename the sample config file to `config.yml`:

```bash
mv config.sample.yml config.yml
```



Edit the config file and fill in your database and port settings ([Configuration Reference](https://docs.requarks.io/install/config)):

```bash
vim config.yml
```

npm i *** 具体看情况



1. Run Wiki.js

```bash
node server
```

```shell
tar xzf wiki-js.tar.gz -C /usr/local/wiki

```

 

## Q&A

### Incorrect groups auto-increment configuration

Incorrect groups auto-increment configuration! Should start at 0 and increment by 1. Contact your database administrator.

数据库不能自增，内部mysql SASS，为了双写的节点，为了 2个节点各自都能写，不冲突，auto_increment定为2

### insert into `authentication`

insert into `authentication` (`autoEnrollGroups`, `config`, `displayName`, `domainWhitelist`, `isEnabled`, `key`, `order`, `selfRegistration`, `strategyKey`) values ('{\"v\":[]}', '{}', 'Local', '{\"v\":[]}', true, 'local', 0, false, 'local') - Duplicate entry 'local' for key 'PRIMARY'

### unknown format

> unknown format "email" ignored in schema at path "#/properties/email"

怀疑和下载以后没下全有关系，下载的包只有50M，解压时候也有报错，但是没留意

### local

删除对应的数据即可



## 优缺点

### 缺点

导入导出功能

没有图床

不能中文搜索