
## 开始
大前天，突然发现新网的.xyz域名只有8块钱（只有8块钱，你没有看错，你没有看错，不是98，不是48，是8块钱呵呵呵），于是我就注册了一个`http://hehehe.xyz` ，感觉这个域名和我气质还是挺相符的呵呵呵。
然后有了个域名，得搭个网站，之前的`http://dacaitou.me`是windows下用wordpress +sourceforge搭的，这回就换一个高级一点的Linux下用Jekyll + Github Page 好了。好的我们开始装Jekyll，那就看官方文档好了，（还可以参考Jekyll中文 、告别wordpress，拥抱jekyll）打开终端敲，好了，艾玛第一句终端就给我黑在那几分钟是闹哪样啊！！！

![1](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/1.png)

学长说gem的官方源经常卡住，没有问题，我们换成淘宝源。然后官方源顺利删掉了，但是淘宝源添不进去是要怎样啊。

![2](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/2-4996991.png)

会不会是ruby版本不够啊，更新到最新版，那啥还要装rvm，那就装吧（参考RVM 实用指南 、rvm 安装 Ruby )，装完再用rvm装个最新版的ruby吧，那啥，ruby还是1.9.2版本是闹哪样啊，然后就找啊找，找到一个说单用户模式安装要先切换，那就果不其然，淘宝源还是添不上啊摔。

![3](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/3.png)

好像还有一个叫RubyGems东西要不要装装看啊，装! 官网首选用gem装rubygems是闹哪样啊，我就是gem出问题了好吗！好吧下安装包脱机装吧，果不其然，gem的NoMethodError错误还在啊哭，一定是我不够好，所以gem才会想要逃。百度对英文的支持不好，搜到的undefind method 都不是关于ord的啊，要不上谷歌搜吧。那就goagent + chrome + ubuntu 把。 goagent都下不动啊！！！好吧开win7那边goagent翻墙下一下goagent吧（其实win版和linux版是通用的，直接电脑复制就好。。。）下完发现linux下app engine的Application上传不了啊。（其实win下我已经上传过了，不用再上传了，那个教程发现的太晚，哭。)
终于可以上谷歌了，虽然搜到关于`undefind method 'ord'`的内容，但是讲得都是rail啊，这里面的艰辛，谁能体会，突然，天空飘来三个字：

| V &nbsp; P &nbsp; N |
|:---:|


我也是醉的不行了，关了vpn，换学校的网，gem居然就终于把淘宝源给添上了摔 。Jekyll也顺利装上，new完了项目，服务开启不了啊。

![4](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/4.png)

报这么长的错，又是大坑。后面发现原来是Node.js忘了装了，官方的文档很重要，英语更重要啊！然后就是GitHub Page 和域名绑定的坑。

## 参考资料

* Jekyll的使用参考
    * [将纯文本转化为静态博客网站](http://jekyllcn.com/docs/usage/) 
* git的使用参考
    * [使用git/github管理ios项目](http://blog.csdn.net/wangyuefenga/article/details/7460104)
    * [Git 常见问题整理](http://www.open-open.com/lib/view/open1366080269265.html) 
* git与GitHub的使用参考
    * [通过GitHub Pages建立个人站点](http://www.cnblogs.com/purediy/archive/2013/03/07/2948892.html) 
    * [使用Jekyll在Github上搭建个人博客](https://segmentfault.com/a/1190000000406019) 
* git push到GitHub不用每次输入账号和密码，SSH登陆参考
    * [Github使用指南](http://blog.csdn.net/tangbin330/article/details/9105061) 
    * [GitHub与SSH官方文档](https://help.github.com/categories/ssh/) 
* 域名绑定到GitHub Page参考
    * [浅谈github页面域名绑定](http://yanping.me/cn/blog/2011/12/04/github-pages-domain/) 
    * [再谈github页面域名绑定](http://yanping.me/cn/blog/2011/12/26/github-pages-domain-2/) 
* 我的Jekyll模版clone自
    * [Yonsm](https://github.com/Yonsm/NET) 

先写这么多，我现在被学院楼的保安赶了！我都这么拼了，你们不把http://hehehe.xyz 添加到你们的收藏夹里吗！？