
闲着没事给自己的Mac换了一套图标，效果图如下示，期间遇到各种坑无数，现记下遇过的坑的描述、说明及解决方案，与大家分享。注：本机为MacBook Pro(Retina,13-inch)，系统版本为OS X EI Capitan (11.11.2) 。
![icon1](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/icon1.jpg)

## 1 图标
### 1.1 icns
icns是Mac OS X系统专有的应用或者文件图标的格式，与windows或者linux下的ico或png格式类似。Image file used to store icons for a Mac OS X application; 一般应用的图标文件在资源目录(Contents Resources directory) ，也可以可以通过在Finder中点击应用、文件或文件夹-&gt;查看简介-&gt;拖动(或复制)icns格式的图片到直接拖动简介中。另外也有地方运用的是PNG图片，如Dock中的Finder及Trash图标。
### 1.2 CandyBar
有OSX有教程用终端命令：

```shell
iconutil -c icns /路径/icon.iconset
```

生成相应的icns图标的教程，具体参考《[OS X 程序图标的美化](http://www.jianshu.com/p/2d21088a4439)》 ，本文推荐用CandyBar批量生产icns图标，另同类软件还有image2icns等。[CandyBar](https://panic.com/blog/candybar-mountain-lion-and-beyond/) 是一个免费的icns图标批量转换，应用图标及Dock图标批量替换的软件，用官方提供激活码激活使用。

|官方下载链接 | 
|:-------------:|
| [https://panic.com/candybar/d/CandyBar%203.3.4.zip](https://panic.com/candybar/d/CandyBar%203.3.4.zip) | 

```
PPQA-YAMA-E3KP-VHXG-B6AL-L
```

### 1.3 artcore
artcore是一个德国艺术家，个人主页是[artcore](http://www.artcoreillustrations.com/commercials/)，我用的是artcore早期的作品，在[iconarchive](http://www.iconarchive.com/artist/artcore-illustrations.html)上可以下载到图标全集。
![icon2](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/icon2.jpg)

![icon3](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/icon3.jpg)

## 2 替换
《[OS X 程序图标的美化](http://www.jianshu.com/p/2d21088a4439)》该文适用于部分应用，即以pkg格式安装的应用，Mac App Store安装的应用、系统自带应用及系统文件夹等的替换不适用，因为在OS X 10.11之后的系统，出于对安全的考虑，限制了root用户的修改系统资源及文件的权限。即使登陆用户的是管理员身份，或属于管理员用户组，也不能行使root用户的所有权限。
### 2.1 Rootless &amp; SIP
SIP系统集成保护(System Integrity Protection)是OS X 在10.11中引入的Rootless机制，顾名思义就是在得某些操作只有苹果的应用可以被许可（通过代码签名来判断）。所以第三方应用即使是运行在root权限中，有一些操作也无法完成。更多关于Rootless和SIP的信息可以参考《[OS X 10.11中Rootless的实现与解释以及关闭方法](http://tadaland.com/os-x-rootless.html)》。
### 2.2 Finder与Dock
另外在替换图标过程中，Finder和Trash在Dock中的展示需要特别注意的地方。虽然在 **我的应用** **中将Finder的图标替换了，
![icon4](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/icon4.jpg)
但是在Dock中依然还是没有变化，首先需要进入Dock的资源目录，在 /System/Library/CoreServices/Dock.app/Contents/Resources 下面， 更改 finder和垃圾桶图标，注意图标的格式是png，而且要替换两个文件Finder@1x和Finder@2x需要实现做好两大小的图标文件。然后Dock中图标缓存。在 terminal 中键入：

```shell
find /private/var/ -name *iconcache*
/private/var//folders/**/************************/C/com.apple.dock.iconcache
...
rm -rf /private/var//folders/**/************************/C/com.apple.dock.iconcache
```

找到相关的iconcache文件并删除，然后重启Dock，：

```shell
killall Dock
```

重启Dock后即可看出变化。

## 3 未解决的问题
另外有一些应用（或者说是快捷方式）的图标，如iCloud面板不能用上诉方法替换，还有待研究。