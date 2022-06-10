
## 个人介绍

本站点由 `大菜头(@dacaitou) 维护`，

## 站点内容

本站点包括但不限于如下：
* [twitter|呢喃](/twitter/README.md)
* [Web](/Web/README.md)
* [Linux](/Linux/README.md)
* [Python](/python/README.md)
* [Java](/Java/README.md)
* [OS](/OS/README.md)


## 站点搭建

本站点的搭建通过如下工具实现：

* 静态网站文档生成器： [hugo](https://docsify.js.org/#/)
* 代码及文档托管： [github](https://www.github.com/Bigcaitou/dacaitou)
* 域名指向
    * `www.dact.dev` = `bigcaitou.github.io` → *.*.*.*(github page接入点)
* 静态文件托管
    * 通过 [github page](https://docs.github.com/cn/pages/getting-started-with-github-pages/about-github-pages) 实现
    * 通过github接入层自带的重定向功能
        * 将 https://www.dact.dev 重定向到 → 对应的repo https://www.github.com/Bigcaitou/dact_dev  → 对应的 github page 的 public 目录
    * 配置方式详见[docsify-部署-GitHub Pages](https://docsify.js.org/#/zh-cn/deploy?id=gitlab-pages)
* 评论系统：[gitalk](https://github.com/gitalk/gitalk)
 

