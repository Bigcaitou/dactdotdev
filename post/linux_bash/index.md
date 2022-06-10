
[TOC]
# 2. 系统命令
## 2.1. top/htop
### 1. 如何将 `top` 的输出通过管道交给另一个进程？
top | grep 1

### 2. 如何让 top 显示每一个CPU的使用情况？
按下数字键1即可

### 3. 如何在 top 里杀进程？
top -b -n 1 | head | grep -A 1 PID | grep "^[0-9]" | cut -f1 -d" " | xargs kill
终止一个进程。系统将提示用户输入需要终止的进程PID，以及需要发送给该进程什么样的信号。一般的终止进程可以使用15信号；
如果不能正常结束那就使用信号9强制结束该进程。默认值是信号15。在安全模式中此命令被屏蔽。

### 4. top 的默认刷新时间是多少，如何修改这个默认设置？
5秒
```shell
# 每隔5秒显式所有进程的资源占用情况
top
# 每隔2秒显式所有进程的资源占用情况
top -d 2
```
### 5. top 里的 load average 是如何计算的？
系统负载，即任务队列的平均长度。三个数值分别为 1分钟、5分钟、15分钟前到现在的平均值。

### 6. top 显示的某个进程的 CPU 使用率有没有可能超过 100%，为什么？
有


### 7. 第四列的 `NI` 是什么意思？
us user 用户空间占用CPU百分比
sy system 内核空间占用CPU百分比
ni nice 用户进程空间内改变过优先级的进程占用CPU百分比
id idle空闲CPU百分比
wa wait 等待输入输出的CPU时间百分比
hi hardware irq 硬件中断
si software irq软件中断

8.假设top显示ffmpeg进程的CPU使用率为143.7%, 请具体解释这个数值是如何计算出来的.
也就是说如果你是n核cpu那么cpu最高占用率可达 143.7% ，top里显示的是把所有使用率加起来。

    ## 2.2. ssh/scp
    ### 1. 请简要叙述 ssh 连接加密的原理。
        Secure Shell（缩写为SSH），SSH为一项创建在应用层和传输层基础上的安全协议，为计算机上的Shell（壳层）提供安全的传输和使用环境。 利用SSH协议可以有效防止远程管理过程中的信息泄露问题。通过SSH可以对所有传输的数据进行加密，也能够防止DNS欺骗和IP欺骗。 SSH之另一项优点为其传输的数据可以是经过压缩的，所以可以加快传输的速度。
    
    2. 请简述 ssh agent forward 的原理。
    SSH agent forwarding 可以讓本地的 SSH Key 在遠端 Server 上進行轉送，也就是當你需要在選端 Server 上使用 SSH Key 時，就不需要將你的 key pair 手動複製到 server 上，是個暨方便又安全的作法。
    Local ---(SSH)---> Server1 ---(SSH)---> Server2
    
    3. ssh 连接时如何指定远程端口，如何设置连接超时时间？
    
    4. ssh 私钥文件默认的权限是什么？
    400 权限设置为对拥有者只读，其他用户没有任何权限
    
    5. 如何利用 ssh 来进行端口转发？
    
    6. passphrase 是什么东西，有什么作用？
    
    7. 在自己的电脑上操作，通过 ssh agent forward 先登录 A，再从 A 登录 B

## 2.3. find
### 1. find 能根据哪些条件来查找文件？

* -name
按照文件名查找文件。
在/dir目录及其子目录下面查找名字为filename的文件
```
find /dir -name filename
```
在当前目录及其子目录（用“.”表示）中查找任何扩展名为“c”的文件
```
find . -name "*.c"
```
* -perm
按照文件权限来查找文件。
find . -perm 755 –print 在当前目录下查找文件权限位为755的文件，即文件属主可以读、写、执行，其他用户可以读、执行的文件
-prune
使用这一选项可以使find命令不在当前指定的目录中查找，如果同时使用-depth选项，那么-prune将被find命令忽略。
find /apps -path "/apps/bin" -prune -o –print 在/apps目录下查找文件，但不希望在/apps/bin目录下查找
find /usr/sam -path "/usr/sam/dir1" -prune -o –print 在/usr/sam目录下查找不在dir1子目录之内的所有文件
* -user
按照文件属主来查找文件。
find ~ -user sam –print 在$HOME目录中查找文件属主为sam的文件
* -group
按照文件所属的组来查找文件。
find /apps -group gem –print 在/apps目录下查找属于gem用户组的文件
* -mtime -n +n
按照文件的更改时间来查找文件， - n表示文件更改时间距现在n天以内，+ n表示文件更改时间距现在n天以前。
find / -mtime -5 –print 在系统根目录下查找更改时间在5日以内的文件
find /var/adm -mtime +3 –print 在/var/adm目录下查找更改时间在3日以前的文件
-nogroup
查找无有效所属组的文件，即该文件所属的组在/etc/groups中不存在。
find / –nogroup -print
* -nouser
查找无有效属主的文件，即该文件的属主在/etc/passwd中不存在。
find /home -nouser –print
-newer file1 ! file2
查找更改时间比文件file1新但比文件file2旧的文件。
* -type
  查找某一类型的文件，诸如：
    * -size n：[c] 查找文件长度为n块的文件，带有c时表示文件长度以字节计。
      find . -size +1000000c –print 在当前目录下查找文件长度大于1 M字节的文件
      find /home/apache -size 100c –print 在/home/apache目录下查找文件长度恰好为100字节的文件
      find . -size +10 –print 在当前目录下查找长度超过10块的文件（一块等于512字节）
* -depth：在查找文件时，首先查找当前目录中的文件，然后再在其子目录中查找。
find / -name "CON.FILE" -depth –print 它将首先匹配所有的文件然后再进入子目录中查找
* -mount：在查找文件时不跨越文件系统mount点。
find . -name "*.XC" -mount –print 从当前目录开始查找位于本文件系统中文件名以XC结尾的文件（不进入其他文件系统）
* -follow：如果find命令遇到符号链接文件，就跟踪至链接所指向的文件。

### 2. find 能否根据文件内容来搜索，为什么？
find .|xargs grep x

### 3. find 可以如何删除找到的文件，请提供三种方法。
find . -name 'file*' -size 0 -print0 | xargs -0 rm
find . -name 'file*' | xargs rm -rf
find . -name 'file*' -size 0 -delete
find . -name 'file*' -exec rm {} \;

### 4. 请简述 mtime、ctime、atime 的区别。
ctime即change time文件状态改变时间，
atime - ( access time) 访问时间 即文件被读取或者执行的时间，修改文件是不会改变access time的。网上很多资料都声称cat、more等读取文件的命令会改变atime
mtime - ( modify time) 修改时间 文件内容被修改的时间
ctime - (change time) 状态修改时间， inode上一次变动的时间 ，如通过chmod修改文件属性，ctime就会被修改。
find . –mtime n: File waslast modified n*24 hours ago.
最后一次修改发生在距离当前时间n*24小时至(n+1)*24 小时
find . –mtime +n:
最后一次修改发生在n+1天以前，距离当前时间为(n+1)*24小时或者更早
find . –mtime –n:
最后一次修改发生在n天以内，距离当前时间为n*24小时以内
find ./ -type f -mtime +29 |xargs rm -rf
#### 关闭atime
```
shell> vi /etc/fstab
LABEL=/data1 /data1 ext3 defaults,noatime 1 2
```
2.6.20 内核引入了新的方法：relatime 开关。
如果在挂载文件系统的时候使用这个开关，访问时间(access times)只有在它们比变更时间(modification time)更旧的时候才会更新。

### 5. `-type` 中有哪些常见类型？
    b - 块设备文件。
    d - 目录。
    c - 字符设备文件。
    p - 管道文件。
    l - 符号链接文件。
    f - 普通文件。
    find /etc -type d –print 在/etc目录下查找所有的目录
    find . ! -type d –print 在当前目录下查找除目录以外的所有类型的文件
    find /etc -type l –print 在/etc目录下查找所有的符号链接文件

## 2.4. grep
1. -c --count 只打印匹配的行数，不显示匹配的内容。
2. -v --revert-match 反检索，只显示不匹配的行
3. -A -A6 查找某些字符的内容,并下延伸6行
4. -B -B2 查找某些字符的内容,并上延伸2行
5. -C -C1查找某些字符的内容,并上和向下各延伸1行
6. -E --extended-regexp
7. -n --line-number 在匹配的行前面打印行号
8. -i --ignore-case 忽略大小写差别
9. -R -r, --recursive 递归的读取目录下的所有文件，包括子目录。 比如grep -R 'pattern' test会在 test 及其子目录下的所有文件中，匹配 pattern。
10. 对于 `-q`/`-o` 参数，给出具体的使用场景.
-o, --only-matching 只显示正则表达式匹配的部分。（show only the part of a line matching PATTERN）
```shell
{"aid":45,"path":"attachment/Mon_1112/2_1_5728040df3ab346.jpg"}
grep -o -E 'aid":[1-9]*' tmp.txt
aid":45
```
-q，--quiet 取消显示，只返回退出状态。
0则表示找到了匹配的行。用于if 逻辑判断很好用。grep -q "test" filename 不会输出任何信息，如果命令运行成功返回0，失败则返回非0值。一般用于条件测试。

## 2.5. ls (L iSt )

### 1. 对于 `ls -l` 的输出，给出每个字符的含义。
![index_files/b75be95b-a6f9-4116-8a26-3fb2820ee603.png](../../_resources/b75be95b-a6f9-4116-8a26-3fb2820ee603.png)
    ![index_files/a1c78005-15f0-40bf-ac5c-bcce44a237dc.jpg](../../_resources/a1c78005-15f0-40bf-ac5c-bcce44a237dc.jpg)
    ①文件属性：drwxr-xr-x
    其中各个字符代表的意义：
    * d表示该文件是一个目录，字母"d"，是directory(目录)的缩写
    注意：目录或者是特殊文件，这个特殊文件存放其他文件或目录的相关信息
    * l表示该文件是一个链接文件。字母"l"是link(链接)的缩写，类似于windows下的快捷方式
    链接文件分为硬链接或符号链接两种。
    文件硬链接数或目录子目录数：3 （一个空目录的该字段是2，表示该目录下有两个子目录，因为每一个目录都有一个指向它本身的子目录"." 和指向它上级目录的子目录".."）
    * b的表示块设备文件(block)，一般置于/dev目录下，设备文件是普通文件和程序访问硬件设备的入口，是 很特殊的文件。没有文件大小，只有一个主设备号和一个辅设备号。一次传输数据为一整块的被称为块设备，如硬盘、光盘等。最小数据传输单位为一个数据块(通 常一个数据块的大小为512字节)
    * c表示该文件是一个字符设备文件(character)，一般置于/dev目录下，一次传输一个字节的设备被称为字符设备，如键盘、字符终端等，传输数据的最小单位为一个字节
    * p表示该文件为命令管道文件。与shell编程有关的文件
    * s表示该文件为sock文件。与shell编程有关的文件
    * rwx：依次代表属主权限、 组权限和 其他用户权限 ，-代表无权限；r代表具有可读权限； w代表具有可写权限；x代表具有可执行权限
    ② 文件inode数量
    ③ 所有者
    ④ 所属用户组
    ⑤ 文件大小
    ⑥ 修改时间： 月 日 年（今年的话会显示时间）
    ⑦ 文件名（文件：绿色 文件夹：蓝色 压缩文件：橘红色 ）

    ### 2. 目录的大小是什么意思？
用ls命令出来的目录大小，不包括里面的文件大小，查询目录的总大小，可以试用`du`指令。
### 3. ls 默认的排序方式是什么，有哪些参数能改变这一行为？
--sort=WORD
sort by WORD instead of name: none (-U), size (-S), time (-t), version (-v), extension (-X)
-S **大写**S表示根据文件大小排序(Sort)，默认是降序排列
-rS 表示排序(R everse Sort)，升序排列
-t 表示根据修改时间(Time)排序
-h 表示 文件大小转为我们习惯的M，K等为单位的大小
-St代表先根据时间再根据大小排序

### 4. 对于 `-R`/`-i` 参数，请给出具体的使用场景。
* -R (R ecursive)递归显示子目录
* -i (Inode) 显示每个文件的inode 号

## 2.6 df/du (Disk Free/ Disk Usage )

### 1. 如何显示 inode 占用率？
```
df -i
```

### 2. 如何显示文件系统的类型？
```
df -T
```

### 3. 什么情况下用 rm 删除了一个大文件，df 显示的空余大小会没有变化？
* 创建了硬链接
* 文件还在被占用
如某日志文件已经被删除，但由于进程还在一直向此文件写入数据，空间并未释放。

### 4. 如何仅仅显示某个目录下文件的总大小？
    -a或-all 为每个指定文件显示磁盘使用情况，或者为目录中每个文件显示各自磁盘使用情况。
    -c或–total 除了显示目录或文件的大小外，同时也显示所有目录或文件的总和。
    -h或–human-readable 以K，M，G为单位，提高信息的可读性。

```shell
du -ach guokangjie
```

### 5. 请解释如何产生一个文件空洞。
写日志的时候没有关闭这个文件，而直接清空，文件头还在一个位置，但是后续的偏移值是往后加的，所以文件还是比原来更大。

## 2.7. touch
### 1. 请给出使用 touch 来修改文件修改时间的具体使用场景。
而更新文件时间通常是为了让某些软件能够正常执行。
```
touch -t 200910112200 new.txt <=== 格式 yyyyMMDDhhmm
```

### 2. touch 对目录是否有效？
有效

### 3. touch 时如何在文件不存在的情况下避免创建文件？
-c, --no-create do not create any files

## 2.8. ps
### 1. `ps auxww` 默认是按照什么进行排序的？
根据pid进行排序的
ps -ef 是用标准的格式显示进程的
ps aux 是用BSD的格式来显示
-a ：不与terminal有关的进程
-u：有效用户相关的进程
x：通常与a这个参数一起用，可以列出完整信息

STAT表明进程的状态
* S 睡眠，s进程是会话期首进程；
* R 运行；
* D 等待；
* T 停止；
* Z 僵尸；
* N 低优先级任务,nice；
* W 分页；
* +进程属于前台进程组；
* l 进程是多线程；
* <高优先级任务

### 2. 如何用 ps 来查看进程树？
ps axjf 连通部分进程树状态
f ASCII art process hierarchy (forest).
--forest ASCII art process tree.

pstree

### 3. 如何用 ps 来查看单个线程的资源使用情况？
```shell
ps -T -p <pid>
ps -eo ruser,pid,ppid,lwp,psr,args -L | grep qemu
```
### 4. `ps auxww`中的 `ww` 有什么使用场景？
-w Wide output. Use this option twice for unlimited width.
比如要显示的信息 过长，如脚本名称（带参数），使用两个ww就可以全部显示，不受终端宽度影响， 类似自动换行
-w
Use 132 columns to display information, instead of the default which is your window size. If the -w option is specified more than once, ps will use as many columns as necessary without regard for your window size. When output is not to a terminal, an unlimited number of columns are always used.





