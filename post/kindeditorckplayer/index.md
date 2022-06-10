
&emsp;&emsp;因项目需要，现将KindEditor与ckplayer相结合，搭建一个带本地视频播放的cms。

## KindEditor

&emsp;&emsp;KindEditor的安装与配置这里不做多余介绍，具体参考[《官方文档-编辑器使用方法》](http://kindeditor.net/docs/usage.html)。

### ckplayer的配置

&emsp;&emsp;上传相关文件到编辑器的插件目录即`editor/plugins/ckplayer`，基本的文件包括`ckplayer.js`、`ckplayer.swf`、`ckplayer.xml`、`language.xml`和`style.css`。

### 修改格式验证代码

&emsp;&emsp;修改kindeditor.js的960行左右的上传功能的格式验证代码，加入需要支持的视频格式：

```js
function _mediaType(src) {
    if (/\.(rm|rmvb)(\?|$)/i.test(src)) {
        return'audio/x-pn-realaudio-plugin';
    }
    if (/\.(swf|flv|mp4)(\?|$)/i.test(src)) {
        return'application/x-shockwave-flash';
    }
    return'video/x-ms-asf-plugin';
}
```

&emsp;&emsp;修改jsp/upload_json.jsp的32行左右的上传功能的格式验证代码，加入需要支持的视频格式：

```java
//定义允许上传的文件扩展名
HashMap<String, String> extMap = new HashMap<String, String>();
extMap.put("image", "gif,jpg,jpeg,png,bmp");
extMap.put("flash", "swf,flv,mp4");
extMap.put("media", "swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb,mp4");
extMap.put("file", "doc,docx,xls,xlsx,ppt,htm,html,txt,zip,rar,gz,bz2");
```
&emsp;&emsp;ckplayer官方称支持以下视频格式：

| 视频协议| 视频格式|Flash| HTML5|
| :---: | :---: | :---: | :---: | 
|HTTP|flv|g.jpg|x.jpg|
|HTTP|f4v|g.jpg|x.jpg|
|HTTP|mp4|g.jpg|g.jpg|
|HTTP|m3u8|g.jpg|g.jpg|
|HTTP|webm|x.jpg|g.jpg|
|HTTP|ogg|x.jpg|g.jpg|
|RTMP|flv|g.jpg|x.jpg|
|RTMP|f4v|g.jpg|x.jpg|
|RTMP|mp4|g.jpg|x.jpg|
|RTMP|直播流|g.jpg|x.jpg|

&emsp;&emsp;所以其中要添加什么类型的文件记得在两个文件都修改。

###  修改embed标签代码

&emsp;&emsp;ckplayer播放本地视频的原理是调用ckplayer.swf打开本地的视频，下面的修改kindeditor.js中983行左右embed标签相关的代码，加入ckplayer可以识别的参数flashvars：

```javascript
function _mediaEmbed(attrs) {
    var html ='<embed';
    _each(attrs, function(key, val) {
        if (key =='src') {
            html += key +'="' + K.options.pluginsPath
                    +'ckplayer/ckplayer.swf"' +'flashvars="f=' + localhostPath + val
                    +'"';
        } else {
            html += key +'="' + val +'"';
        }
    });
    html +='/>';
    return html;
}
```

### 注意

大约在kindeditor.js的300行左右，会有如下代码：

```javascript
embed: ['id', 'class', 'src', 'width', 'height', 'type', \
        'loop', 'autostart', 'quality', '.width', '.height', \
        'align', 'allowscriptaccess', 'flashvars'],
```

&emsp;&emsp;这段代码表示的是embed标签里的属性名，记得添加ckplayer专用的代表本地视频地址的`flashvars`参数，否则在KindEditor编辑器将代码转换成HTML代码时，embed标签中的其它参数会被省略。

&emsp;&emsp;修改之后，当插入视频时，将会生成如下代码其中flashvars的其它参数可以通过&来连接更多的参数，如控制自动播放的p参数。

```html
<embed src="http://localhost:8080/editor/plugins/ckplayer/ckplayer.swf" flashvars="f=/attached/flash/20160116/20160116131808_254.mp4" type="application/x-shockwave-flash" width="550" height="400" quality="high" />

```

## 其他

&emsp;&emsp;还有一些关于编辑器和优化如下：

### 修改上传提示

&emsp;&emsp;修改 `editor/plugins/flash/flash.js` ，在html参数中如添加诸如一下代码，引导管理员更好的使用上传本地视频的功能。

```javascript
var html = [
   '<div style="padding:20px;">',
    //url
   '<div class="ke-dialog-row">',
   '<div style="color:red">',
   '本地视频上传详见<a href="http://haha.tk"  target="_blank" >《教程吧啦吧啦》</a>',
   '</div>',
   '<label for="keUrl" style="width:60px;">' + lang.url +'</label>',
   '<input class="ke-input-text" type="text" id="keUrl" name="url" value="" style="width:160px;" /> &nbsp;',
   '<input type="button" class="ke-upload-button" value="' + lang.upload +'" /> &nbsp;',
   '<span class="ke-bu
    tton-common ke-button-outer">',
   '<input type="button" class="ke-button-common ke-button" name="viewServer" value="' + lang.viewServer +'" />',
   '</span>',
   '</div>',    
```

### 视频播放去广告

&emsp;&emsp;将ckplayer.xml中setup参数的第9个值设置成0，具体参考 [官方文档](http://www.ckplayer.com/tool/#p_3_6_23)。

## 参考链接

* ckplayer 6.7
    * [ckplayer 6.7](http://www.ckplayer.com/bbs/forum.php?mod=viewthread&tid=10864)
* KindEditor4.1.10 (2013-11-23)
    * [kindeditor](http://kindeditor.net/down.php)
* 参考教程
    * [关于kindeditor整合万能的ckplayer视频播放器插件](http://www.ckplayer.com/bbs/forum.php?mod=viewthread&tid=8961&highlight=kindeditor)。
