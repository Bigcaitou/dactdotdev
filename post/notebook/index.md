
[toc]

&emsp;&emsp;本人的笔记应用经历了很多代，之前的主力是`为知笔记`|`wiznote` ，`wiz`本身是基于html的，所以天生和适合做网页剪辑，因为网页也是html，所以可以保留原网页的样式，但这即是优点也是缺点，缺点是经常有很多乱七八糟的样式，浮窗之类的在默认编辑器下无法编辑。之前wiz作为我收集知识库的工具，也服役了很长时间，但是好景不长。

&emsp;&emsp;wiz被toB SAAS厂商`ONES`收购，前景很不明朗，虽然可能请了水军在公众号、知乎之类的地方发布一些文章和评论，但是明眼人也能看的出来，toB企业收购toC的应用，明显不会有对其原有的功能有什么大的期望，或者说被收购本身就意味着发展受限，虽然也有被收购以后发扬观点的案例。但是从最近为知出了macOS重构版(渐进式的web应用)的功能来看：阉割md笔记、笔记加密，仅保留协同笔记之类的骚操作，覆水难收，就此别过。

&emsp;&emsp;故本人开始了新一轮的笔记应用选择及迁移工作。

## 个人需求

个人需要的笔记大概有如下需求：

* 开放性及易迁移性
  * 支持`markdown`或其他开放文件格式
  * 支持批量导出文章或文章存于特定目录下，方便导出
  * 避免出现上述all in one，但是the one要倒闭的情况
* 多终端同步
  * 至少包括 macOS、iOS、web等
* 基本功能
  * 分类（部分应用叫笔记本）
  * 标签
  * 收藏
  * 搜索
    * 作为知识库时，搜索功能一定要强大，最好支持分词和中英文混合搜索
* 其他
  * 图床
    * 基于`PicGo`和`腾讯云COS`构建了私有的图床，详见 [dact.dev——图床](/post/dact.dev/#图床)
    * 故笔记应用的图床功能对本人不是刚需
  * 协作
    * [日常] 目前通过`腾讯文档`及苹果自带的`备忘录`app实现文档协同编辑能力
    * [工作] 由供职企业决定
  * 加密
    * 目前该功能对本人来说不是刚需，故先忽略
  * 双链
    * 作为知识库双链还是很有必要的，但是个人觉得双链的维护没有标准，比较流向的是obsidian的`[[]]`用法，待研究。

## 笔记应用对比

本人使用过如下应用：

### 已弃用

&emsp;&emsp;因有道云笔记和印象笔记等是私有的xml格式的笔记格式，迁移相对困难，后续如果出现类似wiz的被收购、倒闭、或对公司政策或者立场不满等情况，要弃用的时候，会很麻烦，故很早之前就已经弃用非开放标准的笔记应用

* 有道云笔记
  * 微博收藏备份
    * 该功能已下线
* Notion
  * 服务器在海外，网络不太稳定，虽然有加速方案
  * 国内有很多类似的，如` wolai`、`flowus`等，建议先观望
  * 开源替代品是`AppFlowy`，但是不太成熟
  * 最大的问题都是文档载体没规范，未来迁移可能是个问题

## 使用中

### 编辑器 typora

作为markdown的编辑器来说非常方便，感觉md编辑器经历了三代演进

* 第一代：编辑以后保存预览
  * 类似wiz等笔记应用
* 第二代：左右分屏（左代码又预览）
  * 类似vscode之类的工具
* 第三代：即时渲染
  * 类似typora

typora还很方便的，首先在熟悉md语法的情况下，即时渲染可以更加专注于内容本身，另外还有一些比如支持图片上传到图床功能等，都有助于沉浸在协作本身。

### 剪辑工具

#### 网页剪辑工具 Joplin + 坚果云

`Joplin`支持剪辑为md语法和批量导出，未来迁移方便。同时可通过WebDAV连接到网盘，比如坚果云，同步对应的数据到网盘以备份数据

#### 公众号、微信连接剪辑 wiz

国内的应用都支持在移动端直接将公众号或者微信链接分享给微信服务号，一键保存，Joplin在这块没有那么方便，需要依赖mac端实现，故依然使用wiz来做为该来源数据的剪辑，后面考虑其它方案来替代。

### 个人笔记

#### 开放笔记 obsidian + iCloud

使用obsidian来管理个人笔记，数据落盘在iCloud，保证macOS和iOS上可以同步，不过obsidian的功能更多是作为一个双链的知识库管理应用，只是我用的比较基础，更多用法可以参考 [我的Obsidian入门之旅][1]，

#### 私人加密笔记 wiz

目前依然使用wiz笔记或有道云笔记，暂时需求不强烈，故还没有去研究这块的笔记

### 知识库

obsidian的分类和tag功能挖掘中，后续待稳定使用以后，分享更多这块的功能，目前存量都已经从wiz迁移至Joplin。

![image-20220302103526405](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com//img/image-20220302103526405.png)

后续将挖掘Joplin或者Obsidian作为知识库的用法，毕竟现在文档数据都已经存在本地了，且都是md文本文件形式。

## 数据迁移

### 个人主站 obsidian → hugo

同时obsidian支持的元数据语法和本站点的hugo中的语法类似，比如tag标签，仅需要简单修改，即可将对应的文档兼容hugo的语法，例如

```markdown
# obsidian的语法
---
title: "个人笔记应用选择"
date: 2022-03-01T21:00:00+08:00
lastmod: 2022-03-01T21:00:00+08:00
tags: ["notebook", "markdown"]
---

# hugo的语法
---
title: "个人笔记应用选择"
date: 2022-03-01T21:00:00+08:00
lastmod: 2022-03-01T21:00:00+08:00
draft: false
tags: ["notebook", "markdown"]
categories: ["os"]

contentCopyright: '<a rel="license noopener" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" target="_blank">CC BY-NC-SA 4.0</a>'
---
```

编辑好的md文档，直接cp复制到hugo的对应目录，比如 `content/post`下，执行 `hugo -D`即可生成html页面，随后可以发布在github pages中。

### wiz迁移至Joplin

在github上找到了一个开源工具 `wiz2joplin | w2j`  支持转换wiz笔记的文档到 Joplin，基本原理是

* 分析macOS（旧版Qt客户端）下wiz的数据格式 `~/.wiznote/[email]/data/notes/`
* 将 wiz 和 Joplin笔记数据格式转换（分类、标签、内链、图片等）
* 建立临时数据库以实现断点续传
  * 故w2j的安装会依赖sqlite之类的包
* 通过Joplin的剪辑api，将文档一个一个同步到 Joplin 中

**注意**：加密文件需要解密以后才能同步

详见 [从 WizNote 为知笔记到 Joplin（下）][2]

## 参考链接

[1]: https://wiki.eryajf.net/pages/6ed7fe/#note-refactor-obsidian "我的Obsidian入门之旅"
[2]: https://blog.zengrong.net/post/wiznote2joplin2/ "从 WizNote 为知笔记到 Joplin（下）"

