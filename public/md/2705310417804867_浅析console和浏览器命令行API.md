# 浅析console和浏览器命令行API
## 一、console对象：

F12或者Control+Shift+i（Win）/ Alt+Command+i（Mac）打开浏览器自带的开发工具，选择顶部tab中的最后一项console，这样你就可以尽情的console了。

下面看看这个console对象给我们提供的各种方法。
![console](http://images.cnitblog.com/blog2015/546511/201505/011441536777123.png)
### 1.1：log()、info()、debug()格式化输出

>console.info()和console.debug()都是console.log方法的别名，用法基本一样。console.info方法会在输出信息的前面，加上一个蓝色图标。所以这三个就说说log

***
console.log方法用于在console窗口输出信息。它可以接受多个参数，将它们的结果连接起来输出。这些都是比较基本的用法，输出需要调试的对象啥的，另外我们可以发现很多网站console出很多稀奇古怪的东西，啥图片啥LOGO整起

看看莫猫：
![tmall](http://images.cnitblog.com/blog2015/546511/201505/011448365053024.png)
是不是很形象，果然是XX猫，很深动，这里看看他们是怎么实现的：

***
对于log来说他可以格式化输出，就像我们的C当中的格式化输出一样，什么%c%d换行\n啥啥啥的，当然log肯定和那个不一样咯

log提供的格式化输出主要有：

* %s 字符串
* %d 整数
* %i 整数
* %f 浮点数
* %o 对象的链接
* %c CSS格式字符串

***
OK：看看怎么输出1+1=2：

```javascript
console.log(" %s + %s ", 1, 1, "= 2")
// 1 + 1  = 2
//当然你也可以：console.log("1 + 1 = 2")
```
还可以这样

```javascript
console.log("%s\n+%s\n",1,1,"=2")
/*
1
+1
=2
*/
```
OK:再看看猫猫怎么cosole出来的：

```javascript
var e = {info: "\u55b5~ \u52a0\u5165\u6211\u4eec\u5427 http://tb.cn/iS8NBOy",logo: " ::: ::: \n" + " ::::::: ::::: \n" + "::::::::: ::::::::\n" + ":::::::::::::::::::::::::::::::::::::::::::\n" + ":::: ::: :::::::::::::::: ::: ::::\n" + "::: Smart :::::cool:::: Crazy :::\n" + "::::: ::: ::::::::::::::: ::: :::\n" + ":::::::::::::::::::::::::::::::::::::::::::"};

console.info(e.logo + "\n\n" + e.info)
```
### 1.2:css样式输出:
>对常见的富样式输出有两种：文字样式、图片输出

#### 文字样式
文字样式输出比较简单：console.log("%c歘歘歘歘","font-size:20px;color:red")这样就会输出四个红色的chua
#### 图片输出
先把效果拿出来看一下ha  Take a Photo
![](http://images.cnitblog.com/blog2015/546511/201505/011527346611970.png)
![](http://images.cnitblog.com/blog2015/546511/201505/011536206931164.png)
>其实console.log不支持直接图片输出，但是支持css样式输出，所以我们可以绕过这个限制，用背景图哈哈哈哈哈是不是很聪明。但是我们没法像平时那样直接输出背景图，又得绕一圈，

就好像上面的示例，要输出一张60*60的图片，我们用padding来把整个区域撑开到我要的大小，然后还要设置line-height才行。

* line-height的值我取图片高度
* background这个是北京图片的url啥的
* padding左右两边的值是图片宽度的一半
* padding上下两边的值是图片高度的一半-7px

OK，现在是不是可以在控制台尽情的console了哇
### 1.3: warn() error()
warn方法和error方法也是输出信息，它们与log方法的不同之处在于，warn方法输出信息时，在最前面加一个黄色三角，表示警告；error方法输出信息时，在最前面加一个红色的叉，表示出错，同时会显示错误发生的堆栈。其他用法都一样。在这儿就不详说了
### 1.4: 不太常用的命令
>table() count() dir() assert() timeline()，timelineEnd()，timeStamp() profile()，profileEnd() group()，groupend()，groupCollapsed() trace()

这些个在平时的开发调试中用的比较少然后time()，timeEnd()会用到当然最后 最后的最后，该清场了。

clear()回到原点，本想把这些都写一下的，苦逼cxy没吃饭没力气了，console差不多了
## 二、命令行API：
### 1、选择器相关
上面的那些都是ECMAScript的对象console下的方法，下面这些是浏览器命令行的API，和ECMA好像没5毛钱关系：

* $_: 返回上一个表达式的值,和上下左右不同，上下左右是得到上次输入到命令行的表达式，这个是得到上次的表达式的值。
* \$0 - \$4：控制台保存了最近5个在Elements面板选中的DOM元素，\$0代表倒数第一个，\$1代表倒数第二个，以此类推直到\$4。
* $(selector) ：返回一个集合(ArrayLike)，包括特定的CSS选择器匹配的所有DOM元素。
* $$(selector) ：返回一个集合(ArrayLike)，包括特定的CSS选择器匹配的所有DOM元素。

上面两个\$\$我理解的应该是为了和jquery或者zepto等库里面的\$冲突而设定的，在控制台中首先是去找的jq和zepto里面的$，如果没有则调命令行API

另外[谷歌开发者社区](https://developer.chrome.com/devtools/docs/commandline-api)，上说的是得到一个数组，感觉不妥
![](http://images.cnitblog.com/blog2015/546511/201505/011601363496424.png)
![](http://images.cnitblog.com/blog2015/546511/201505/011609353968939.png)

### 2、下面几个用的不多：

* $x(path)：方法返回一个数组，包含匹配特定XPath表达式的所有DOM元素。这个我没试过，感觉应该也是一个集合

* inspect(object)：方法打开相关面板，并选中相应的元素：DOM元素在Elements面板中显示，JavaScript对象在Profiles中显示。

* profile方法用于启动一个特定名称的CPU性能测试，profileEnd方法用于结束该性能测试。

* copy(object)方法复制特定DOM元素到剪贴板。

* dir(object)方法显示特定对象的所有属性，是console.dir方法的别名。

* dirxml(object)方法显示特定对象的XML形式，是console.dirxml方法的别名。

* clear()方法和console.clear()差不多

### 3、实用的几个API,可以快速帮助我们调试：

* getEventListeners(object)：获取元素节点绑定了哪些事件

* keys(object)，values(object) ：获取对象的所有key数组和value数组

* monitorEvents(object,[events]) ，unmonitorEvents(object,[events])：监听制定节点的指定事件、停止监听事件

![](http://images.cnitblog.com/blog2015/546511/201505/011625078499402.png)

![](http://images.cnitblog.com/blog2015/546511/201505/011625193964409.png)

![](http://images.cnitblog.com/blog2015/546511/201505/011628583658244.png)

![](http://images.cnitblog.com/blog2015/546511/201505/011630352715274.png)

### 4、monitorEvents允许监听同一大类的事件，
>不是我们平时所说的哪些什么click什么的。这些事件分成四个大类：

* mouse："mousedown", "mouseup", "click", "dblclick", "mousemove", "mouseover", "mouseout", "mousewheel"
* key："keydown", "keyup", "keypress", "textInput"
* touch："touchstart", "touchmove", "touchend", "touchcancel"
* control："resize", "scroll", "zoom", "focus", "blur", "select", "change", "submit", "reset"

***
更多的一些命令行API可以移步：[Google开发者文档之console](https://developers.google.com/chrome-developer-tools/docs/console-api)

