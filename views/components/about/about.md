# About

经历了一周多的时间，终于这个工程就要要完成了，终于感受到了windows带来的麻烦事，windows上mangodb的环境搭建太费事了，哎！伤心事不提了，server端的日志系统也在慢慢构建。工程完成80%.

## 技术选型

* 追求前后端全部组件化的组织

服务端是Node.js;<br />
前端框架是React+jquery;<br />
CSS用的scss+webpack编译;<br />
前端UI用的是Material-ui;<br />
前端路由用的是director,后端路由自己写的;<br />
应用框架选了Express(4.x变化挺大不少中间件都废了);<br />
数据服务用的是Mongoose(基于node-mongodb开发的MongoDB nodejs驱动);<br />
模板引擎选用的是Express React Views(没选主流的Jade或ejs, 它实现了在服务端渲染React组件);<br />
打包工具用的是webpack+一些列的loader(md用的raw-loader);<br />
全站采用响应式布局，M和PC共用

## API

* 获取所有信息资源：

```javascript
http://10.252.164.175:3001/api/topics
```

* 获取指定信息详情和评论：

```javascript
http://10.252.164.175:3001/api/topics/:id(信息ID)
```

## Contact Me
QQ: 792041894<br/>
weixin: chenjian3875<br/>
Email: chenjiancj2011@outlook.com<br/>

<h3 style="color:red">Please Please Please report any bugs. This is the very initial version of the blog system. I am trying to catch as more bug as possible.</h3>

<hr/><br/><br/>
## Just Trying really hard to be a feer!


