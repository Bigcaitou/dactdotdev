


> 一切都源于这个表情，后面这个表情就以不可预料的情况演化了。那时想着做一个能加苍蝇的截图工具，程序是用JAVA实现的，项目托管在GitHub [https://github.com/Bigcaitou/HEHEHEScreenshot](https://github.com/Bigcaitou/HEHEHEScreenshot)



![苍蝇表情](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/10104625_kRAQ.jpg)



| **Talk is cheap, show you the code.** |
|:---:|

## 截取屏幕
```JAVA
public RectD() {
    snapshot();
    setVisible(true);
    // setSize(d);//最大化窗口
        //用 JDialog 做一个无控制条的窗口，大小设置成满屏，把截取的这个满屏的图片贴到这个 JDiaglog 里
    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    this.addMouseListener(new MouseAdapter() {// 得到鼠标箭头初始坐标
        @Override
        public void mousePressed(MouseEvent e) {
            orgx = e.getX();
            orgy = e.getY();
        }
    });
    //鼠标圈定区域， 对圈定的区域截屏
    this.addMouseMotionListener(new MouseMotionAdapter() {
        @Override
        public void mouseDragged(MouseEvent e) {
            endx = e.getX();
            endy = e.getY();
            g = getGraphics();
            g.drawImage(tempImage, 0, 0, RectD.this);
            int x = Math.min(orgx, endx);
            int y = Math.min(orgy, endy);
            int width = Math.abs(endx - orgx) + 1;
            int height = Math.abs(endy - orgy) + 1;
            // 加上1，防止width或height为0
            g.setColor(Color.BLUE);
            g.drawRect(x - 1, y - 1, width + 1, height + 1);
            // 减1，加1都是为了防止图片将矩形框覆盖掉
            saveImage = image.getSubimage(x, y, width, height);
            g.drawImage(saveImage, x, y, RectD.this);
        }
    });
    //双击鼠标截图
    this.addMouseListener(new MouseAdapter() {
        @Override
        public void mousePressed(MouseEvent e) {
            int clickTimes = e.getClickCount();
            if (clickTimes == 2) {
                saveToFile();
            }
        }
    });
}
```
```JAVA
public void snapshot() {
    try {
        Robot robot = new Robot();
        Dimension d = Toolkit.getDefaultToolkit().getScreenSize();
        image = robot.createScreenCapture(new Rectangle(0, 0, d.width, d.height));
    } catch (AWTException e) {
        e.printStackTrace();
    }
}
```
利用Robot的createScreenCapture可以截图，但是有个问题是遇到多个屏幕，这个方法只能在默认屏幕截图。
## 添加苍蝇
```JAVA
public static void markImageByIcon(String iconPath, String srcImgPath, String targerPath, Integer degree) {
    OutputStream os = null;
    try {
        Image srcImg = ImageIO.read(new File(srcImgPath));
        BufferedImage buffImg = new BufferedImage(srcImg.getWidth(null), srcImg.getHeight(null),
                BufferedImage.TYPE_INT_RGB);
        // 得到画笔对象
        Graphics2D g = buffImg.createGraphics();
        // 设置对线段的锯齿状边缘处理
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g.drawImage(srcImg.getScaledInstance(srcImg.getWidth(null), srcImg.getHeight(null), Image.SCALE_SMOOTH), 0,
                0, null);
        if (null != degree) {
            // 设置水印旋转
            g.rotate(Math.toRadians(degree), (double) buffImg.getWidth() / 2, (double) buffImg.getHeight() / 2);
        }
        // 水印图象的路径 水印一般为gif或者png的，这样可设置透明度
        ImageIcon imgIcon = new ImageIcon(iconPath);
        // ImageIcon imgIcon = new ImageIcon(iconPath);
        // 得到Image对象。
        Image img = imgIcon.getImage();
        float alpha = 1f;
        // 透明度
        g.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP, alpha));
        // 表示水印图片的位置
        g.drawImage(img, 50, 50, null);
        g.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER));
        g.dispose();
        os = new FileOutputStream(targerPath);
        // 生成图片
        ImageIO.write(buffImg, "PNG", os);
        setClipboardImage(buffImg);
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        try {
            if (null != os)
                os.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```
苍蝇的大小要合适，太大的话太假，太小的话素材太难抠了，最后苍蝇素材是从一个苍蝇画刷工具而来的，我还找了会PS的同学帮我画上苍蝇腿。
## 截图复制到剪贴板
```JAVA
public static void setClipboardImage(final Image image) {
    Transferable trans = new Transferable() {
        public DataFlavor[] getTransferDataFlavors() {
            return new DataFlavor[] { DataFlavor.imageFlavor };
        }
        public boolean isDataFlavorSupported(DataFlavor flavor) {
            return DataFlavor.imageFlavor.equals(flavor);
        }
        public Object getTransferData(DataFlavor flavor) throws UnsupportedFlavorException, IOException {
            if (isDataFlavorSupported(flavor))
                return image;
            throw new UnsupportedFlavorException(flavor);
        }
    };
    Toolkit.getDefaultToolkit().getSystemClipboard().setContents(trans, null);
}
```
## 系统托盘
```JAVA
public static class SystemTrayDemo extends JFrame {
    private static final long serialVersionUID = 1L;
    private TrayIcon trayIcon = null;
    public SystemTrayDemo() {
        if (SystemTray.isSupported()) {
            // 检查当前系统是否支持系统托盘
            SystemTray tray = SystemTray.getSystemTray();
            // 获取表示桌面托盘区的SystemTray实例。
            Image image = this.getToolkit().getImage(this.getClass().getResource("/image/logo.png"));
            PopupMenu popupMenu = new PopupMenu();
            MenuItem exitItem = new MenuItem("退出");
            MenuItem menuItema = new MenuItem("截图");
            exitItem.addActionListener(new ActionListener() {
                public void actionPerformed(ActionEvent e) {
                    try {
                        System.exit(0);
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    }
                }
            });
            popupMenu.add(menuItema);
            popupMenu.add(exitItem);
            trayIcon = new TrayIcon(image, "呵呵呵截图", popupMenu);
            while (flag) {
                flag = false;
                menuItema.addActionListener(new ActionListener() {
                    public void actionPerformed(ActionEvent e) {
                        // 这里调用截图功能
                        RectD rd = new RectD();
                        GraphicsDevice gd = GraphicsEnvironment.getLocalGraphicsEnvironment()
                                .getDefaultScreenDevice();
                        gd.setFullScreenWindow(rd);
                    }
                });
                try {
                    tray.add(trayIcon);
                    // 将 TrayIcon 添加到 SystemTray。
                } catch (AWTException e) {
                    System.err.println(e);
                }
            }
        } else {
            System.out.println("你的系统不支持系统托盘");
        }
        try {
        } catch (Exception e) {
        }
    }
}
```
可能会遇到托盘乱码，可以参考 [《java软件托盘MenuItem 显示中文出现框框乱码、读取ini配置文件乱码》](http://blog.csdn.net/lishaman/article/details/17751727) ，来解决问题。
## 保存图片
```JAVA
public void saveToFile() {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日HH时mm分ss秒");
    String name = sdf.format(new Date());
    File path = FileSystemView.getFileSystemView().getHomeDirectory();
    // 图片保存在桌面
    String format = "png";
    File f = new File(path + File.separator + name + "." + format);
    try {
        ImageIO.write(saveImage, format, f);
        String srcImgPath = path + "\\" + name + ".png";
        String iconPath = System.getProperty("user.dir") + "\\1.png";
        // URL iconPath = this.getClass().getResource("/image/1.png");
        String targerPath = path + "\\" + name + "呵呵呵.png";
        this.dispose();
            //给图片添加水印
        HEHEHEScreenshot.markImageByIcon(iconPath, srcImgPath, targerPath, null);
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```


效果图如下所示：

![HEHEHE](https://dacaitou-1252862985.cos.ap-hongkong.myqcloud.com/10104658_oAsF.png)

## 相关链接

 |相关链接 | 
 |:-------------:|
 | [苍蝇画刷工具下载](https://mega.nz/#!bF4HSaSQ!wFtq9vbUzrqvTI6Xe0WJcZg0YZIVg4HINNQEZ3MmTOE) |
 | [项目主页](https://github.com/Bigcaitou/HEHEHEScreenshot) | 
 | [java 截图源码](http://www.cnblogs.com/superjt/archive/2012/12/19/2824426.html) |
 | [Java实现给图片添加水印](http://www.2cto.com/kf/201108/101021.html)  |
 | [java软件托盘MenuItem 显示中文出现框框乱码、读取ini配置文件乱码](http://blog.csdn.net/lishaman/article/details/17751727) |



下次再讲

> * jar的运行
> * jar→exe
> * jre精简
> * 跨平台优化



为什么要叫HEHEHEScreenshot呢，因为之前我注册过一个域名：hehehe.xyz，然后就在谷歌成立母公司Alphabet并注册域名abc.xyz之后，我才想起我的hehehe.xyz忘记续费了，结果被别人抢注了哭，本来一个很有意思的域名，呵呵呵，我现在只能翻出来之前写的用来调戏处女座的截图工具，来纪念我的hehehe.xyz