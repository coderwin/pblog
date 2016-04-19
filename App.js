// server端入口程序
var express = require('express');
// 端口号
var port = process.env.PORT || 3000	;
// 应用框架
var app = express();
// 数库
var mongoose = require('mongoose');
// 中间件
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// 后端渲染模板
var reactViews = require('express-react-views');
// 后端路由入口
var _Route = require('./routes/route.js');
// 数据库连接
// mongoose.connect('mongodb://127.0.0.1/todoapp');
mongoose.connect('mongodb://imchenjian:159357cj@ds011321.mlab.com:11321/pblog');
app.locals.moment = require('moment');
app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine());
// app.set('views', './views/pages');

console.log(app.locals.moment().format('YYYY-MM-DD HH:MM'));
console.log(app.locals.moment().format());

app.use(cookieParser());
/*静态资源根目录*/
app.use(express.static(__dirname + '/public'));
/*上传文件大小限制*/
app.use(bodyParser.urlencoded({extended: true,limit: '500mb'}));
/*监听端口*/
app.listen(port,  function () {
  console.log('Dynamic react example listening on port ' + port);
});

/*首页*/
app.get('/', _Route.index);

/*列表页*/
app.get('/list', _Route.list);

/*详情页 暂时没用 APP用到*/
app.get('/detail/:id', _Route.detail);

app.get('/api/detail/:id', _Route.detailAPI);

/*登录页*/
app.get('/login', _Route.login);
/*关于*/
app.get('/about', _Route.about);
/*发布页*/
app.get('/post', _Route.post);
/*增加ajax*/
app.post('/add', _Route.add);
/*删除ajax*/
app.get('/del', _Route.del);

/*退出ajax*/
app.get('/loginout', _Route.loginout);

/*登录ajax*/
app.get('/userlogin', _Route.userlogin);

/*发布ajax*/
app.post('/publish', _Route.publish);

/*文件上传*/
app.post('/upload', _Route.upload);

/*标签js/css/html/component*/
app.get("/tags/:id", _Route.tags)

/*回复评论*/
app.post("/replyup", _Route.replyup)

/*topic API*/
/*对外提供的两个API*/
app.get("/api/topics", _Route.topics);
app.get("/api/topics/:id", _Route.topic);

/*截图*/
app.get("/snapshot", _Route.snapshot);
