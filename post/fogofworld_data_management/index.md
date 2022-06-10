


[toc]

最近狂迷迷雾世界，在这里把整理的数据管理（导入和擦除）的教程以索引的形式分享给大家。简单介绍下世界迷雾，就是一个行走记录app，样式上采用的是擦起雾玻璃的形式，行走在新的区域，将对应的区域的雾气擦除。



>  透过世界迷雾，每趟精采的旅程仿若昨日，在地图上把走过的每一条路都记录下来，看看你在地图上所创造的独一无二终生印记，而你所要做的，只是需要展开新的冒险。你会知道，没有任何事物能够阻挡你！

* 官网：https://fogofworld.app/zh-hans/

<img src="https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/img/fog_map.ca9e485fbf24.png" alt="img" style="zoom:75%;" />#



# 数据导入

对于需要补上自己过去的轨迹，步骤大致如下：

* 各种工具导出kml文件来导出 kml
* 解决可能存在的问题
  * 坐标系偏移问题，详见 [内陆地图偏移问题](#内陆地图偏移问题)
  * 点间距过大的问题，详见 [点间距过大的问题](#点间距过大的问题)
  * ...
* 备份数据到云盘
* 导入kml到迷雾世界app
* 确认是否符合预期
  * 需要回退 或 需要擦除部分数据 详见下节 [数据擦除](#数据擦除)

## 飞行

* 参考：[ 欧礼士 - 用 FlightAware 将飞机路线导入世界迷雾的方法](https://www.jianshu.com/p/54fa1c6f0316)
* 跨度较大的间距不会被迷雾识别，需要补点

## 火车

* 参考： [那些曾经坐过的火车路线啊，它们是什么模样](https://mp.weixin.qq.com/s/dfiiNH8gVsspw6wHXOOR-Q)

* url：[铁路数据](https://fog.vicc.wang/rails.html)

## 步行&骑行&驾车

### 两步路APP

* 规划路线（ios下为例）
  * 底栏中部 start → 右上角 工具 → 左侧边栏 手绘规划 →  左上角 规划（选择步行、骑行、驾车）→ 添加 
  * 确认路径符合预期
    * 注意左行道和右行道出来的规划可能完全不同
    * 不符合预期一步一步撤销重新绘制即可
  * 确定保存
* 导出
  * 绘制以后直接导出轨迹文件
  *  APP 我的轨迹 → XXX轨迹 → 右上角（三）更多 → 导出轨迹文件 → 推荐 KML格式（路径）
* 导入迷雾世界
  * 使用 迷雾世界打开（**导入前强烈建议先同步一次**）

## 地铁

如下两个方法也适用于导出步行、骑行、驾车的轨迹，但是两步路更方便，故这里如下两个方法主要作为地铁规划使用，也可作为步行、骑行、驾车的备选方案

### 谷歌地图(需番羽土啬)

* 参考：
  *  [欧礼士 - 用谷歌地球画交通运输路线导入世界迷雾的方法](https://www.jianshu.com/p/74977d4bd8b9)
  * [欧礼士 - 用谷歌地图自动规画路线导入世界迷雾的方法](https://www.jianshu.com/p/7452cb071da7)

### 奥维互动地图

* <s>导出kml（新版已取消该功能）</s>
* 导出ovkml，修改文件名为 `***@GCJ02.kml` 再导入

## 常见问题

### 内陆地图偏移问题

* 内陆地图采用的 `WGS84` 坐标系统
* 谷歌地球画出来的路线是采用的是 国测局的 `GCJ-02` 坐标系统
* **kml文件名加上"@GCJ02" 可解决偏移问题**
  * 例如： "北京消雾之旅.kml" 改为  "北京消雾之旅@GCJ02.kml" 

### 点间距过大的问题

![What the ****?](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/img/1.jpeg)

* 参考：[世界迷雾路径补全方法大全——走过了这世界，想留下点什么](https://sspai.com/post/38942)



# 数据擦除

对于不小心导入了非预期的数据，可以使用擦除工具来擦除，擦除原理详见扩展阅读中的 [逆向工程][1]，基本步骤为：

**注：** 数据操作的原子单位为 整个 `Sync`目录 (注意大小写)

<img src="https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/img/image-20220414102247056.png" alt="image-20220414102247056" style="zoom: 33%;" />



数据流向 如图所示

* ①是从迷雾到到擦除工具
* ②是从擦除工具导入迷雾

需要注意的是 迷雾世界和终端本地文件是有同步的，所以每次操作的时候要把本地数据清掉（ios卸载app、android清理数据）

<img src="https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/img/%E8%BF%B7%E9%9B%BE%E4%B8%96%E7%95%8C%E6%95%B0%E6%8D%AE%E6%B8%85%E7%90%86%E6%95%B0%E6%8D%AE%E6%B5%81%E5%90%91.png" alt="迷雾世界数据清理数据流向" style="zoom:80%;" />

操作步骤如下：

1. 备份数据

   * **同步数据（Sync目录）到云盘**

   * 推荐使用坚果云，上传和下载速率比iCloud快，其他网盘未验证过

2. 数据擦除

   * 将 步骤1 中的 `Sync`目录 导入 `数据擦除工具`

   * 通过  `数据擦除工具` 擦除对应的轨迹

   * 导出 擦除后的数据 （`Sync`目录）

3. 导入数据到云盘

   * 在云盘上 按照日期和时间 将 `Sync` 重命名为` Sync_20220414_101600`

   * 复制 步骤2 中导出的`Sync目录` 到云盘指定位置

4. 同步数据

   * 清理迷雾世界app的数据
     * ios：只能卸载应用再重装
     * android：可以清理应用数据
   * 迷雾世界app，从云盘恢复（同步）数据

**注意**：如果擦除结果非预期，需要回退的，按如下步骤操作：

* 移除非预期的 `Sync`目录
* 使用 上述 步骤3 中重名以后的目录，重名为 `Sync`

* 重复 上述 步骤4

## fog machine

* 介绍：[github - fog machine ](https://github.com/CaviarChen/fog-machine)
* url：[https://fogmachine.8bits.io/](https://fogmachine.8bits.io/)

## Fog Eraser

* 介绍： [《世界迷雾》橡皮擦使用说明](https://mp.weixin.qq.com/s?__biz=MzUxODYwOTk5NA==&mid=2247483799&idx=1&sn=d3e5696b6b6de6f0d97efa8135a59767)
* url：[https://vicc.wang:4443](https://vicc.wang:4443)

## 对比

上述两个数据擦除工具基本对比如下：

| 工具        | fog machine | Fog Eraser              |
| ----------- | ----------- | ----------------------- |
| 收费情况    | 免费        | 收费                    |
| 正常擦除    | √           | √                       |
| 擦除方式    | 光标选择式  | 点阵式                  |
| 开源        | 是          | 否                      |
| bug及兼容性 |             | mac + chrome下，alt失效 |

建议两个都可以试下，选择适合自己的。

# 扩展学习

* [世界迷雾 - 逆向工程][1]

  

[1]: https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxODYwOTk5NA==&amp;action=getalbum&amp;album_id=2239760767187353601&amp;scene=173&amp;from_msgid=2247483840&amp;from_itemidx=1&amp;count=3&amp;nolastread=1#wechat_redirect "世界迷雾 - 逆向工程"
