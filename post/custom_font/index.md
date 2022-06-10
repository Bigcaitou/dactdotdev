
# 网页中的中文自定义字体和@font-face
**2016年4月28号更新：**
现在有第三方的工具sfnttool可以直接裁剪中文字体文件，详见《[中文字体其实也可以用在网页上的](http://www.w3ctech.com/topic/85)》

最近在看Simon Garfield的《字体的故事》，相比英文字体，感觉中文字体虽然仅常用的字就达到了2500字，但是字体、字形多变，我大中华的文字真的是博大精深、源远流长啊，想到粉笔哥和他的方正显仁字体，又想到徐静蕾字体，初中时候班上好多女生字写的很漂亮，她们写的字体也都迥乎不同，03的柳体，00的行书。而英文只有26个字母，最常见的比如美漫对话中常用的Comic San、苹果早期软件菜单和对话框显示字体Chicago（现在好像是Helvetica）、等等字体改天看完再补上。英文字体给我的变化就像苹果手持设备的大小变来变去：ipod->变大->ipod touch->能打电话->iphone->变大->ipad->变小->ipad mini，又像ipod nano全系列的身材：苗条的ipod nano12->变矮胖->ipod nano3->变苗条->ipod nano45->矮胖到变成正方形->ipod nano6（6才是我的最爱，好想买啊T.T）->又变苗条->ipod nano7。详见这贴《[形变神不变 苹果历代iPod nano变化史](http://mp3.zol.com.cn/322/3222638.html)》。英文字体给我感觉就是变粗一个字体、变细又一个字体、加衬线又一个字体、加衬线字距增加有一个、线加粗又一个。

不过字形多样的中文字体带来的一个大问题就是：在网页显示时，字体文件过于庞大，加载困难。比如接下来要提到的造字工房情书字体，otf格式就有4.1MB了，这在网页加载中绝对是个大问题，解决的办法之一就是给字体瘦身，自制或者说定制一个精简版的字体文件。

```css
@font-face {
    font-family:qingshu;
    src: url('qingshu.eot');
    src: url('qingshu.eot?#iefix') format('eot'),
    url('qingshu.woff') format('woff'),
    url('qingshu.ttf') format('truetype'),
    url('qingshu.svg#webfontjKg17VrE') format('svg');
}
```

我选的是最傻的办法，具体方法请戳《[网页中使用自定义中文字体的解决方法](http://www.cnblogs.com/leer/archive/2011/07/21/font-family-define.html)》要用的字一个个复制到新字体工程里去，复制过去咋都没把unicode值也复制过去呢，还得自己一个个添，奇怪的是一个字有多种unicode，比如“子”字，直接用Font Creator居然找不到，要到网上找“子”的unicode，5B50，但是查到的“子”字不仅有5B50,主要显示的是2F26，后来发现这个“子”在康熙字典的213个边旁部首里，unicode是从&nbsp;2F00到2FDF里，所以只能去查表才行。没去研究到底是不是所有的字体文件是这样的，总之，造字工房的情书字体这样的。

另外还有一个问题是，IE浏览器独家兼容的EOT格式的字体文件愣是做不出来，换了多个做otf或者ttf转eot格式的网址或者工具都不行，比如[Font Squirrel](http://www.fontsquirrel.com)和[ttf2eot](http://ttf2eot.sebastiankippe.com),万恶的IE啊，还好转换好的TTF、OTF、SVG在safari和chrome能用。