


[TOC]



# 4 机器维护

## 4.1 iostat/vmstat/dstat

### 1. 直接无参数启动这些命令，能得到哪些数据？
io信息
虚拟内存信息

### 2. 如何持续监控某块硬盘的读写情况？
-d Display the device utilization report.
-k Display statistics in kilobytes per second.
```shell
iostat -d vda -k 1
```
### 3. `iostat` 命令的输出中，哪些输出对于诊断磁盘 IO 问题比较关键？


4. `iostat` 命令输出中的 `tps` 是什么东西，这个值正常情况下会在哪个范围内波动？
tps：该设备每秒的传输次数（Indicate the number of transfers per second that were issued to the device.）。“一次传输”意思是“一次I/O请求”。多个逻辑请求可能会被合并为“一次I/O请求”。“一次传输”请求的大小是未知的。

5. 怎么能让 iostat 和 vmstat 能够像 dstat 那样持续输出？



## 2.5 其他
### wget/curl

1. 如何用 wget 发一个 HTTP POST 请求？

2. 请简述 wget 续传/重复下载的逻辑及相关参数。

3. wget 的 `-O` 和 `-o` 参数有什么区别？

-o, --output-file=FILE 把记录写到FILE文件中 类似另存为
-O --output-document=FILE 把文档写到FILE文件中 比如日志文件中

4. 如何用 curl 发一个 HTTP POST 请求？

5. 如何让 curl 将网页保存为文件而不是显示在屏幕上？
if
6. 如何让 wget 将网页显示在屏幕上而不是保存为文件？
## screen/tmux
### 1. 这个命令是用来做什么的？
GNU Screen可以看作是窗口管理器的命令行界面版本。它提供了统一的管理多个会话的界面和相应的功能。
### 2. 如何继续上一次的会话？
screen -r
### 3. 如何手工保存一个会话？
screen -S david

## tar
### 1. 将一个目录 `directory` 打包并压缩成 `directory.tar.gz`。
-c或--create：建立新的备份文件；
-z或--gzip或--ungzip：通过gzip指令处理备份文件；
-v或--verbose：显示指令执行过程；
-f<备份文件>或--file=<备份文件>：指定备份文件；

```shell
tar -czvf directory.tar.gz directory
```

解压
  ```
  tar -xzvf
  ```

  ### 2. 为什么不直接使用 gzip 命令压缩，而是要使用 tar 打包并压缩？
  gzip 只是一个流压缩程序，输入一个流，输出压缩后的数据流。给它一个文件，文件本身自然就是一个流，读入、压缩、输出，还是保存成一个文件，没有问题。
  如果是一个文件夹、多个文件，该怎么办呢？按什么顺序？怎么存储文件以外的信息？（例如路径、权限。）操作系统没有提供一种可以把若干个文件组织成一个流的 API ，gzip 就无能为力。

  ### 3. 如何查看 tar 包中有哪些文件？
  -t或--list：列出备份文件的内容

  ```shell
  tar -tvzf *.tar.gz
  zcat xxx.tar.gz
  zgrep
  ```

  ### 4. 对比以下几种方式所需要的时间，以及得到的包的大小：打包但不压缩、打包并使用 gzip 算法压缩、打包并使用 bzip2 算法压缩。

