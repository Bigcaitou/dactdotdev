
[toc]

# dact.dev搭建细节

## 基础组件

本站点基于 hugo + github pages实现，具体教程网上有很多，不再赘诉，本文仅针对搭建过程中的一些问题和优化做一个记录

### gittalk

[gitalk](https://github.com/gitalk/gitalk)

    * github page action
        * https://github.com/marketplace/actions/github-pages

cat `index.html`

```js
<!-- gittalk组件 -->
<link rel="stylesheet" href="//unpkg.com/gitalk/dist/gitalk.css">
<script src="//unpkg.com/gitalk/dist/gitalk.min.js"></script>
<script src="//unpkg.com/docsify/lib/plugins/gitalk.min.js"></script>

<script>
    var gitalk = new Gitalk({
    clientID: 'GITTALK_CLIENTID',
    clientSecret: 'env.GITTALK_CLIENTSECRET',
    repo: 'dacaitou',
    owner: 'Bigcaitou',
    admin: ['Bigcaitou'],
    title: location.hash.match(/#(.*?)([?]|$)/)[1],
    id: location.hash.match(/#(.*?)([?]|$)/)[1],      // Ensure uniqueness and length less than 50
    })
    // gitalk.render('gitalk-container')
</script>
```
#### clientID和clientSecret在公网中暴露的问题

之前担心clientID和clientSecret在公网中暴露会有安全问题，但是发现了官方issue里已经有人解答了：[Bug？暴露 Client_id和Client_secret ？ #150][1]

> @booxood:
> * 获取或修改 GitHub 用户数据，需要 token，为了拿到 token，除了需要 OAuth App 的 client_id 和 client_secret 外，还需要一个 Authorization Code。
> * 这个 code 是 GitHub 登录授权完成时，在跳转回 redirect_uri 的查询参数拿到的， redirect_uri 必须是在 OAuth App 配置的 callback URL 域名下。
> * 这样即使别人用了你的 client_id 和 client_secret ，跳转之后也拿不到 code，所以，有 client_id 和 client_secret 也做不了什么。

## 数据迁移

### wordpress 

之前 `dacaitou.me` `hehehe.xyz` `haha.tk`上的文字都存在wordpress上，整个项目有备份，故只许重新搭建 wordpress + mysql + php + nginx的环境，参考ubuntu的文档

官方文档： [Install and configure WordPress][1] ，大致包括如下内容

* mysql
* php
* host nginx
* wp config

恢复后，将对应的文章获取出来，以及之前对应的图片都在整个项目中。

### 个人笔记

本站点另外一些文章，来自个人笔记，主要存于wiznote、obsidian、joplin中，详见 [个人笔记应用选择](/post/notebook)

## 图床

使用 `PicGo.app`，发现可以正常上传到图床，但是无法正常返回url，会提示超时，且PicGo.app需要开机自启动且有常驻server，有一定系统占用，故改用 `PicGo-Core(command line)`，按需使用。

但发现typora选择以后无法生效，后来发现是要选择`Custom Command`，这个 `PicGo-Core(command line)`的选择只是告诉我们可以用PicGo命令行，但是实际上的生效要在`Custom Command`中定义，迷之设计。

* 安装详见 [typora+PicGo-Core指引文档][2]

  ```shell
  npm install picgo -g
  # or
  yarn global add picgo
  
  error commander@8.3.0: The engine "node" is incompatible with this module. Expected version ">= 12". Got "10.13.0"
  error Found incompatible module.
  
  # 如版本不足可以安装指定版本
  nvm install v12
  
  nvm use  v12.22.10
  Now using node v12.22.10 (npm v6.14.16)
  ```

* **注意**：使用 `picgo uploader`选择图床以后，会被默认设置为 smms，可能是bug，可以在 ``~/.picgo/config.json`中，将uploader 和 current改成对应的图床。不同的图床，配置文件不同，具体见官方文档。

  ```json
  cat ~/.picgo/config.json
  {
    "picBed": {
      "uploader": "tcyun",
      "current": "tcyun",
      "tcyun": {
        "secretId": "***",
        "secretKey": "***",
        "bucket": "***",
        "appId": "***",
        "area": "***",
        "path": "***",
        "customUrl": "",
        "version": "v5"
      },
      "transformer": "path"
    },
    "picgoPlugins": {}
  }%
  ```

> 正确的方法要先填写node的地址，在填写picgo的位置

具体详见 [typora 配置picgo-core出现env: node: No such file or directory的解决方法][4]

```shell
which node 
/Users/[username]/.nvm/versions/node/[node_version]/bin/node
which pigco 
/usr/local/bin/picgo
# 则填入图像→上传服务设定→Custom Command的命令为如下
/Users/[username]/.nvm/versions/node/[node_version]/bin/node /usr/local/bin/picgo u 
```

### cdn加速

//TODO



## 参考链接

[1]: https://ubuntu.com/tutorials/install-and-configure-wordpress "Install and configure WordPress"

[1]: https://github.com/gitalk/gitalk/issues/150 "Bug？暴露 Client_id和Client_secret ？ #150"
[2]: https://support.typora.io/Upload-Image/#picgo-core-command-line-opensource "typora Upload Images PicGo-Core (Command line) (OpenSource)"

[]: https://sspai.com/post/61624 "国内自建图床指南"

[]: https://picgo.github.io/PicGo-Core-Doc/zh/guide/  "PicGo-Core 介绍"

[4]: https://www.vpslala.com/t/774 "typora 配置picgo-core出现env: node: No such file or directory的解决方法"
