
## 跨域配置

### nginx

* [业务列表](https://deploy-jingwei.huya.com/bussiness/buss/list.jsp)

* 进入负载均衡编辑页

* 修改配置

  * ```nginx
    {
        "plugins": {
            "cors": {
                "allow_origins": "pre-live-liveu.oclivego.com,pre-m-liveu.oclivego.com", #多个域名以逗号分割
                "allow_methods": "**",
                "allow_headers": "**",
                "expose_headers": "**",
                "allow_origins_by_regex": [
                    ".*.oclivego.com"
                ],
                "max_age": 1728000,
                "allow_credential": true
            }
        }
    }
    ```

* 暂存 → 返回配置 → 保存配置 → 发布配置

* 验证


### 云产商
#### 腾讯cos

* 找到对应的bucket
  * https://console.cloud.tencent.com/cos5/bucket
  * 如无权限，联系 `gaozehao`申请权限
* 配置管理 → 安全管理 → 跨域访问CORS设置
* 添加Origin

![企业微信截图_1636102366149](images/企业微信截图_1636102366149.png)

* 验证

#### 阿里oss

访问对象存储 / Bucket列表 / xxx / 权限管理 / 跨域访问

https://oss.console.aliyun.com/bucket/****/****/permission/cors

![image-20211214104901919](images/image-20211214104901919.png)

* 添加规则

  * 来源

    * >  *.huya.info
      >
      > *.huyahaiwan.com
      >
      > *.huya.com

  * 允许 Methods

    * > GET
      >
      > POST
      >
      > PUT
      >
      > DELETE
      >
      > HEAD

  * 允许 Headers
    * *
    * 或者具体headers

  * 暴露 Headers
    * 可不填

  * 缓存时间（秒）

    * 默认0