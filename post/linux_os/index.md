
[TOC]

# 1 操作系统
## 1.1 bashrc 与环境变量
### a. bash 的系统和个人配置文件的路径是什么？
全局配置
- `/etc/profile` 此文件为系统的每个用户设置环境信息,当用户第一次登录时, 该文件被执行，并从`/etc/profile.d`目录的配置文件中搜集shell的设置`/rtc/profile.d/*.sh`，
- `/etc/bashrc` 为每一个运行bash shell的用户执行此文件，当bash shell被打开时,该文件被读取。
个人配置
- `~/.bashrc`:该文件包含专用于你的bash shell的bash信息,当登录时以及每次打开新的shell时,该文件被读取
- `~/.bash_profile`:每个用户都可使用该文件输入专用于自己使用的shell信息，当用户登录时，该文件仅仅执行一次!默认情况下,他设置一些环境变量,执行用户的.bashrc文件。
- `~/.bash_profile` 是交互式、login 方式进入 bash 运行的
- `~/.bashrc` 是交互式 non-login 方式进入 bash 运行的
通常二者设置大致相同，所以通常前者会调用后者。

### b. `$PS1` 这个环境变量有什么用？
Linux系统提示符是用系统变量PS1来定义的。一般系统默认的形式是：[username@host 工作目录]$.
```shell
echo $PS1
${debian_chroot:+($debian_chroot)}\u@\h:\w\$
\u ：当前用户的账号名称
\h ：仅取主机的第一个名字，如上例，则为fc4，.linux则被省略
\w ：完整的工作目录名称。家目录会以 ~代替
```
### c. 在什么情况下需要修改 `$PATH`，应该如何合理地修改它？
想要在任意目录执行某个脚本/程序，就可以把相应的目录加到PATH里
```shell
export PATH=$PATH:/
#vi /etc/profile
# vi user/.bashrc
```
### d. 修改过 `~/.bashrc` 后，如何让改变立即生效？
```
source ~/.bashrc
```
### e. bashrc 与 profile 有什么异同点? 两者的加载顺序如何？
profile类的文件：
设定环境变量
运行命令或脚本
basrc类的文件：
设定本地变量
定义命令别名

登录式shell读取配置文件
```
/etc/profile → /etc/profile.d/*.sh → ~/.bash_profile → ~/.bashrc → /etc/bashrc
```
非登录式shell如何配置文件

```
~/.bashrc → /etc/bashrc → /etc/profile.d/*.sh
```


## cron
![](index_files/8050d825-a999-43b4-8cb6-ed70e096e396.png)

### 1. 系统配置文件的路径是什么？
```
/etc/crontab
```
### 2. cron时间描述里的 `-` 是什么意思，`/` 是什么意思？
整数间的短线（-）指定一个整数范围。譬如，1-4意味着整数 1、2、3、4。
正斜线（/）可以用来指定间隔频率。在范围后加上 /<integer>意味着在范围内可以跳过 integer。譬如，0-59/2可以用来在分钟字段定义每两分钟。间隔频率值还可以和星号一起使用。例如，*/3的值可以用在月份字段中表示每三个月运行一次任务。

### 3. `@reboot` 会在什么时候执行？
@reboot 在每次启动时运行一次

### 4. cron 的最小粒度是分钟，如何用 cron 实现每分钟跑两次（例如，分别在第 0 秒和第 30 秒）运行的任务？
```shell
# 修改用户的日常任务：crontab -e
* * * * * python test.py
* * * * * sleep 30; python test.py

# 修改系统的定时任务：vim /etc/crontab
* * * * * root python test.py
* * * * * root sleep 30 && python test.py
```
## 1.X NTP 与 UTC

### 1.X.1 ntpdate 和 ntpd 相比有什么优势和劣势？
ntpdate不会考虑其他程序是否会阵痛，直接调整时间；
ntpd在实际同步时间时是一点点的校准过来时间的，最终把时间慢慢的校正对（ntpd在和时间服务器的同步过程中，会把 BIOS 计时器的振荡频率偏差，或者说 Local Clock 的自然漂移(drift)记录下来。这样即使网络有问题，本机仍然能维持一个相当精确的走时）。
前者是调整时间，后者是校准时间。

### 1.X.2 既然已经有了 ntp，为什么还需要有 hwclock？
hwclock（hardware clock）用于 BIOS 时钟 (硬件时钟) 的修改与显示的指令。 这是一个 root 才能执行的指令，因为 Linux 系统上面 BIOS 时间与 Linux 系统时间是分开的，所以使用 date 这个指令调整了时间之后，还需要使用 hwclock 才能将修改过后的时间写入 BIOS 当中！
### 1.X.3 UTC 是什么？

UTC协调世界时，又称世界标准时间或世界协调时间，（英：Coordinated Universal Time ，法：Temps Universel Coordonné），又称世界统一时间，世界标准时间，国际协调时间。英文（CUT）和法文（TUC）的缩写不同，作为妥协，简称UTC。UTC是最主要的世界时间标准，其以原子时秒长为基础，在时刻上尽量接近于格林尼治标准时间。
[扩展阅读-UTC(世界标准时间)、GMT(格林尼治平时)、CST(北京时间)、CET(欧洲中部时间)、WET(欧洲西部时间)、EET(欧洲东部时间)](https://my.oschina.net/knightuniverse/blog/133483)

NTP 网络时间协议（英语：Network Time Protocol，简称NTP）是在数据网络潜伏时间可变的计算机系统之间通过分组交换进行时钟同步的一个网络协议

### 1.X.4 Linux中如何修改系统时区？
```bash
#linux (time zone select)
$ tzselect
#Red Hat
$ timeconfig
#Debian
$ dpkg-reconfigure tzdata
#复制相应的时区文件，替换系统时区文件；或者创建链接文件
$ cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```
### 1.X.5 什么是 Unix Time？
UNIX时间，或称POSIX时间是UNIX或类UNIX系统使用的时间表示方式：从协调世界时**1970年1月1日0时0分0秒**起至现在的总秒数，不考虑闰秒。 在多数Unix系统上Unix时间可以通过`date +%s`指令来检查。

### 1.X.6 ISO 8601 是什么？
ISO 8601的标准格式是`YYYY-MM-DDTHH:mm:ss.sssZ`，分别表示：

| 格式 | 含义 | 范围|
| :--- | :--- | :--- |
| YYYY | 年份 | 0000 ~ 9999 |
| MM | 月份 | 01 ~ 12 |
| DD | 日 | 01 ~ 31 |
| T | 分隔日期和时间 |
| HH | 小时 | 00 ~ 24 |
| mm | 分钟 | 00 ~ 59 |
| ss | 秒 | 00 ~ 59 |
| .sss | 毫秒 | 000 ~ 999 |
| Z | 时区 | 可以是 Z（UFC）、+HH:mm、-HH:mm |

## 1 硬链接与软链接

### 硬链接
多个指向同一文件。硬链接文件大小完全相同，如有多个硬链接，所链接的文件只是一个文件大小。
同一个文件所有的文件都是等价的，操作系统不区分链接创建的先后顺序，若一个文件存在两个链接，那么除去一个文件还可以通过另外一个文件来访问该文件，也可以除去创建链接时用到的文件，但只要还有一个链接存在，就可通过该连接访问文件。
### 符号链接（软链接）
建立一个独立的文件，这个文件会让数据的读取指向它链接的文件内容。类似windows快捷方式。

假设 B 是 A 的（软/硬）链接文件，回答下列问题：
### 1. 对于硬链接和软链接，比较当 A 或者 B 被删除时，各有什么后果？

删除文件A

| - | 硬链接 | 软链接 |
| :---: | :---: | :---: |
| 文件A | 还可以访问 | 被删除 |
| 链接B | 生效 | 失效 |

删除链接B

| - | 硬链接 | 软链接 |
| :---: | :---: | :---: |
| 文件A | 还可以访问 | 还可以访问 |
| 链接B | 被删除 | 被删除 |

### 2. 比较创建硬链接和软链接，各需要多少硬盘空间？
硬链接文件显示的大小是跟原文件是一样的

软链接文件显示的大小是跟原文件是不一样的，代表链接文件的真实大小。

### 3. 为什么不能对目录建立硬链接？为什么不能跨设备建立硬链接？软连接为什么可以？
因为允许目录的硬链接可能会打破文件系统的有向无环图结构，可能创建目录循环。
因为对于硬链接，不同的文件系统中inode可能相同，无法通过inode标识不同文件系统间的文件。
而对于软链接，区分不同挂载点与同一挂载点不同目录，所以可以标识不同的文件。
### 4. 当 A 不存在时，能否建立 A 的硬链接 B，能否建立 A 的软链接 B？
当A不存在时，不能建立 A 的硬链接 B，因为没有inode。
当A不存在时，能建立 A 的软链接 B。

## 文件的权限
### 1. `/usr/bin` 下某命令 abc 的文件权限为 744，非属主应如何运行这个命令？

```shell
chmod 745 abc
chmod o+x abc
```
### 2. 对于目录，文件权限里的 `w` 和 `x` 各是什么意思？

write 写
execute 执行
目录文件的读权限（r）和写权限（w），都是针对目录文件本身。
由于**目录文件内只有文件名和inode号码**，所以如果**只有读权限，只能获取文件名**，无法获取其他信息，因为其他信息都储存在inode节点中，而**读取inode节点内的信息需要目录文件的执行权限（x）**。
这里顺便说一下目录文件的"链接数"。创建目录时，默认会生成两个目录项："."和".."。前者的inode号码就是当前目录的inode号码，等同于当前目录的"硬链接"；后者的inode号码就是当前目录的父目录的inode号码，等同于父目录的"硬链接"。所以，任何一个目录的"硬链接"总数，总是等于2加上它的子目录总数

### 3. `rwsr-xr-x` 代表什么权限？
s - suid (takes the rights of user or group when executed)
SUID仅对二进制程序有效；
执行者对于该程序具有x的可执行权限；
执行权限仅在该程序执行过程中有效；
执行者将具有改程序拥有者的权限；

### 4. 什么是 umask，如何修改 umask？
查看当前权限掩码

```shell
$ umask #获取当前权限掩码
0022
umask -S
u=rwx,g=rx,o=rx
```

接下来，使用指令"mkdir"创建一个目录，并使用指令"ls"获取该目录的详细信息，输入命令如下：
```shell
$ mkdir test1 #创建目录
$ ls –d –l test1/ #显示目录的详细信息
drwxr-xr-x 2 rootlocal rootlocal 4096 2011-9-19 21:46 test1/
# 注意：在上面的输出信息中，"drwxr-xr-x"="777-022=755"。
# 修改
umask 024
```

### 5. 如果将一个目录的权限改为 711，会有什么效果？
drwx--x--x (711) -- 属主有读、写、执行权限；而属组用户和其他用户只有执行权限。
ls: cannot open directory .: Permission denied

## 管道与重定向

### 1. 重定向中的 0、1、2，各代表什么意思？

- 0 标准输入
- 1 标准输出
- 2 标准错误信息输出

可以用来指定需要重定向的标准输入或输出，比如 2>a.txt 表示将错误信息输出到文件a.txt中。

### 2. `command 2>&1 > command.log` 和 `command > command.log 2>&1` 的执行效果相同吗，为什么？

command 2>&1 > command.log
两个管道

command > command.log 2>&1
只使用了一个管道FD1，但已经包括了stdout和stderr。

### 3. 请简述管道是如何让程序能够互相协同工作的。

### 4. 命名管道是什么东西，如何创建一个有名管道？
进程间通信——使用匿名管道中，我们看到了如何使用匿名管道来在进程之间传递数据，同时也看到了这个方式的一个缺陷，就是这些进程都由一个共同的祖先进程启动，这给我们在不相关的的进程之间交换数据带来了不方便。
FIFO文件，它是一种特殊类型的文件，它在文件系统中以文件名的形式存在，但是它的行为却和之前所讲的没有名字的管道（匿名管道）类似。
mkfifo pipe name
#include <sys/types.h>
#include <sys/stat.h>
int mkfifo(const char *filename, mode_t mode);
int mknod(const char *filename, mode_t mode | S_IFIFO, (dev_t)0);
这两个函数都能创建一个FIFO文件，注意是创建一个真实存在于文件系统中的文件，filename指定了文件名，而mode则指定了文件的读写权限。

### 5. 请简述一个场景，其中使用命名管道是必要的。

## 用户管理
### a. 新用户创建时, 如果选择自动创建用户home目录, 此时home目录中自动生成的内容是从哪儿来的?


### b. 删除一个用户时, 系统会执行那些操作, 改变哪些文件?
/etc/passwd 和 /etc/group
不带选项使用 userdel，只会删除用户。用户的家目录将仍会在/home目录下。

### c. 用户的密码存储在哪个文件里?
/etc/passwd
root 加密以后明文/etc/shadow

### d. 禁止用户登录的方式有哪些?
不允许用户使用密码方式登录系统
usermod -p*username
锁住用户
usermod -L username

### e. 如何踢用户下线.
查看登录用户
who
tty 所踢用户的tty
比如：

```shell
$ who
xxx pts/0 2018-06-07 21:55 (10.120.170.101)
pkill -kill -t pts/0
```
### 6. 使用 `su user` 命令和使用 `su - user` 命令切换用户，有什么区别？

- `su user` 切换用户user之后，还是保持原user用户的路径
- `su - user` 切换用户user 之后，到user的home目录下

## apt-get 与 Debian 软件包管理

### 1. 请尽量详细地描述在执行 `apt-get update && apt-get install mtr-tiny` 的过程中，apt-get 是如何工作的。

第3点使得软件更新变得简单，可以在不关闭软件的情况下进行更新，不需要重启。因为系统通过inode号码，识别运行中的文件，不通过文件名。更新的时候，新版文件以同样的文件名，生成一个新的inode，不会影响到运行中的文件。等到下一次运行这个软件的时候，文件名就自动指向新版文件，旧版文件的inode则被回收。


apt-get install 查看软件包是否存在 查看依赖是否满足 下载依赖 安装依赖 安装软件
* 执行apt-get update
* 程序分析/etc/apt/sources.list
* 自动连网寻找list中对应的Packages/Sources/Release列表文件，如果有更新则下载之，存入/var/lib/apt/lists/目录
* 然后 apt-get install 相应的包 ，下载并安装。


### 2. 怎么升级一个软件。

```
apt-get upgrade
```
### 3. `apt-get install` 是如何处理已安装但需要升级的软件（例如openssh）的升级的？

![](index_files/0.023738407489978686.png)

### 4. 安装 mtr-tiny 的时候，向系统安装了哪些文件？
libc6
libncurses5
libtinfo5

## 安全习惯

### 1. 请从攻击者的角度来讲述有多少种方式来获得公用 wifi 中的其他用户的信息。

### 2. 请解释公私钥加密的原理，并解释应该如何保管和使用 ssh 私钥。


### 3. 请解释 ssh agent forward 的工作原理，并从攻击者的角度来讲述这一工作原理有没有可利用之处。

### 4. 列举你所知道的密码管理工具及其工作方式，并从攻击者角度来讲述这些工具有什么安全隐患。
公钥
私钥

### 5. https 全站加密有什么优势和劣势？
HTTPS = HTTP + TLS/SSL
TLS/SSL 全称安全传输层协议 Transport Layer Security, 是介于 TCP 和 HTTP 之间的一层安全协议

![index_files/ef1aecad-db9c-4019-b72a-e418623d4deb.jpg](hugo_dact_dev/post/_resources/ef1aecad-db9c-4019-b72a-e418623d4deb.jpg)

  ![index_files/ac2ae60c-7ff1-4b61-ab39-6650c4bd819c.jpg](hugo_dact_dev/post/_resources/ac2ae60c-7ff1-4b61-ab39-6650c4bd819c.jpg)
  * 优势
  * 可认证用户和服务器，确保数据发送到正确的客户机和服务器
  * 可进行加密传输、身份认证的网络协议，可防止数据在传输过程中不被窃取、改变，确保数据的完整性
  * 现行架构下最安全的解决方案，虽然不是绝对安全，但它大幅增加了中间人攻击的成本
  * 劣势
  * 技术方面
  * 相同网络环境下，HTTPS协议会使页面的加载时间延长近50%，增加10%到20%的耗电。此外，HTTPS协议还会影响缓存，增加数据开销和功耗。
  * HTTPS协议的安全是有范围的，在黑客攻击、拒绝服务攻击、服务器劫持等方面几乎起不到什么作用。
  * 最关键的，SSL 证书的信用链体系并不安全。特别是在某些国家可以控制 CA 根证书的情况下，中间人攻击一样可行。
  * 成本方面
  * SSL的专业证书需要购买，功能越强大的证书费用越高。个人网站、小网站可以选择入门级免费证书。
  * SSL 证书通常需要绑定 固定IP，为服务器增加固定IP会增加一定费用;
  * HTTPS 连接服务器端资源占用高较高多，相同负载下会增加带宽和服务器投入成本;
  ### 6. 请阐述你对最小权限原则的理解，以及为了实现此原则你需要采取的措施。
  收缩 所享有的特权，以防滥用特权。
  用户权限、iptables

  ## 分区和挂载

  1. 将所有的目录置于同一个分区有什么优势和劣势？
    系统安全
    优势
    方便
    劣势
    合理的分区能把不同文件放在不同的分区里面。如果把所有内容都防止到同一个分区下，越多的内容和程序范围表示越有可能出错，一旦重要的文件被损坏将影响到系统的使用。另外部分目录是频繁改动和操作的（如日志目录），频繁的读写可能会带来磁盘损坏，合理的分区可以保证重要信息的安全。
    效率
    直接按分区索引到对应的磁盘空间进行查找和读取，较之在一个大的磁盘空间下查找效率要高。另外，频繁改写的磁盘区域可能会产生大量的磁盘碎片，也影响了部分磁盘空间的使用，合理的分区可以将这部分磁盘隔离开。

  2. LVM 是什么？
    Linux Virtual Machine
    Logical Volume Manager 逻辑卷管理 用于管理磁盘驱动器或其他类似的大容量存储设备。

  3. 从安全角度考虑，哪些分区应适当限制大小？

  swap

  4. 如何临时从另一个空间富于的空间借一些空间到当前分区来完成一些临时性的任务？
    所谓的挂载，就是让磁盘分区和目录建立一种关联。例如，将hda1挂载到根目录“/”下，就是所有根目录（“/”）及根目录下的所有子目录（如“/home“）等文件都将存储到分区hda1下。我们称根目录为磁盘分区hda1的挂载点。也就是说，通过进入根目录，相当于进入了hda1分区读取数据。
    同时磁盘分区也能挂载到子目录下。例如，将hda2挂载到home目录（“/boot”）下，那么boot目录及子目录下的所有文件都将存储到hda2分区下。而挂载后boot目录后，除boot目录外的其他所有目录还是处于hda1磁盘下。
    Linux系统除了允许将本机磁盘分区挂载到目录下外，还允许将移动磁盘、U盘、光盘镜像等挂接到系统目录下。甚至还可以将其他主机、服务器的目录挂载到本机目录下，类似于共享的概念。

  ## 信号机制
  Signal Name Single Value Effect
  SIGHUP 1 挂起
  SIGINT 2 键盘的中断信号
  SIGKILL 9 发出杀死信号
  SIGTERM 15 发出终止信号
  SIGSTOP 17, 19, 23 停止进程

  ### 1. 请简述 kill 命令的原理。
  命令的原理是向内核发送一个系统操作信号以及某个进程的标识号，使得内核对指定标识号的进程进行相应的操作。
  9种信号(SIGKILL)才可以无条件终止进程，其他信号进程都有权利忽略。

  ### 2. 请简述 nohup 命令的原理。
  不受终端关闭影响，继续执行指令或任务

  ### 3. 如何在 bash 脚本中处理用户的 Ctrl-C？
  发送 SIGINT 信号给前台进程组中的所有进程，强制终止程序的执行；
  trap command signal
  INT(2) 中断，通常因按下Ctrl+C组合键而引发

  * SUID 机制与 sudo

  1. 建简述 SUID 机制存在的意义。
    SUID 是 Set User ID, SGID 是 Set Group ID的意思。
    SUID的作用就是这样：让本来没有相应权限的用户运行这个程序时，可以访问他没有权限访问的资源。passwd、ping就是一个很鲜明的例子。
    简单来说就是通过设置文件的粘滞位，让二进制脚本临时获取root权限。
    setcap：用更小的粒度控制超级管理员权限，是setuid一个更安全的实现。软件开发者应该为二进制文件赋予最小权限，而不是使用强大的setuid。介绍：Capabilities
    SUID的优先级比SGID高，当一个可执行程序设置了SUID，则SGID会自动变成相应的egid。

  ### 2. sudo 的主配置文件路径是什么？应如何更新这个文件？
  /etc/sudoers
  visudo来对该文件进行修改。强烈推荐使用该命令修改 sudoers，因为它会帮你校验文件配置是否正确，如果不正确，在保存退出时就会提示你哪段配置出错的。

  3. 如果需要在 shell 脚本中通过 sudo 调用某个命令或者程序，应如何配置 sudo？
    /etc/sudoers，将Defaults requiretty，修改为 #Defaults requiretty，表示不需要控制终端，也可以在shell的脚本中通过程序直接执行sudo service。

  ### 4. 怎样将某个高权限程序一部分的功能开放给 sudo，例如能让用户改子网掩码，而不让他修改机器 IP 地址？
  ```shell
  username ALL=(root) NOPASSWD: /sbin/ifconfig
  ```
  5. 使用 sudo 执行一个程序和使用 root 用户执行一个程序有什么区别？
    通过 sudo，我们能把某些超级权限有针对性的下放，并且不需要普通用户知道 root 密码，所以 sudo 相对于权限无限制性的 su 来说，还是比较安全的，所以 sudo 也能被称为受限制的 su
    区别挺大的，但共同点，我的理解主要就一个——进程权限。linux进程权限涉及三个进程属性：real user ID、effective user ID（euid）、saved set-user-ID。一般linux里面判断进程权限都是基于euid来判断的，如果你的进程euid是0，那么你的进程就有root权限了。sudo命令做的事，就是把你自己的命令进程euid改成0，然后视情况保留一些当前用户（你）的环境变量。

  * 文件传输：scp vs rsync

  ### 1. 对比默认参数下，两种方式消耗的系统资源情况。
  增量以后rsync更快
  rsync 则以其高效的传输及压缩算法达到快传输的目的。

  ### 2. 在服务器端存在对应服务的条件下，哪种方式的传输是有加密的？
  SCP需要对数据进行加密，而nc只是简单的传输数据。

  ### 3. 请阐述在 scp 和 rsync 的具体适用场景，即在什么时候应该适用 scp 而不是 rsync，在什么时候应该适用 rsync 而不是 scp。
  rsync增量同步 只能本地到本地 或者远程到本地 或者本地到远程
  scp 远程到远程

  # 参考资料

  1. [鸟哥的Linux私房菜-基础学习篇](http://book.douban.com/subject/4889838/)
  2. [Debian Administrator's Handbook](http://debian-handbook.info/browse/stable/)
  3. [FreeBSD Handbook](http://www.freebsd.org/doc/handbook/)
  4. [TCP/IP Illustrated, Volume 1](http://book.douban.com/subject/1741925/)
  5. [Debian New Maintainers' Guide](https://www.debian.org/doc/manuals/maint-guide/)（仅供学有余力的同学参考，不做为硬性要求）
