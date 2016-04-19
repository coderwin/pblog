/*Webapp index*/

var $ = require("jquery");
var React = require('react');
var ReactDOM = require('react-dom');

var Header = require("../views/components/header/header.jsx");
var Nav = require("../views/components/nav/nav.jsx");
var Footer = require("../views/components/footer/footer.jsx");
var Postlist = require("../views/components/postlist/postlist.jsx");
var Post = require("../views/components/post/post.jsx");
var MarkdownElement = require("../views/components/markdown/markdownElement.jsx");
var About = require("../views/components/about/about.jsx");
var Publish = require("../views/components/publish/publish.jsx");
var AppLeftNav = require("../views/components/leftNav/appLeftNav.jsx");
var Home = require("../views/pages/home.jsx");
var Login = require("../views/components/login/login.jsx");

require("../views/components/header/header.css");
require("../views/components/nav/nav.css");
require("../views/components/footer/footer.css");
require("../views/components/postlist/postlist.css");
require("../views/components/markdown/mui-github-markdown.css");
require("../views/components/toast/toast.css");
require("../views/pages/home.css");
require("../views/components/pagination/pagination.css");

var injectTapEventPlugin = require('react-tap-event-plugin'); injectTapEventPlugin();

var Router = require("director").Router;

var getCookie = function(name) {
  var arr = [],
    reg=new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)){
    return unescape(arr[2]);
  }
  return '';
};

var App = React.createClass({
  getInitialState: function() {
    var data = this.props.data;
    //标签的话直接渲染list页面
    if (data.tag) {
      return {
        app: (<div>
        <AppLeftNav />
        <div className="WBuedContainer">
          <Header />
          <Postlist {...data} />
          <Footer />
        </div>
        </div>)
      } 
    }
    /*渲染webapp首页*/
    return {
      app: (<Home />)
    }
  },
  componentDidMount: function() {
    var that = this;
    var data = this.props.data;
    /*路由控制*/
    var router = Router({
      '/home': {
        on: function() {
          that.setState({
            app: (function(){
              return (<Home />) 
            })()
          })
        },
      },
      '/list': {
        on: function() {
          that.setState({
            app: (function(){
              return (
                <div>
                  <AppLeftNav />
                  <div className="WBuedContainer">
                    <Header />
                    <Postlist {...data} />
                    <Footer />
                  </div>
                </div>)
            })()
          })
        },
      },
      /*'/tags': {
        "/:id": {
          on: function() {
            that.setState({ app: (function(){return ( <div>
              <AppLeftNav />
              <div className="WBuedContainer">
                <Header />
                <Postlist {...data} />
                <Footer />
              </div>
              </div>) 
            })()
            })
          },
        },
      },*/
      '/about': {
        on: function() {
          that.setState({
            app: (function(){
              return (
                <div>
                  <AppLeftNav />
                  <div className="WBuedContainer">
                    <Header />
                    <About />
                    <Footer />
                  </div>
                </div>) 
            })()
          })
        }
      },
      '/detail': {
        '/:id': {
          on: function(id) {
            that.setState({
              app: (function(){
                return (
                  <div>
                    <AppLeftNav />
                    <div className="WBuedContainer">
                      <Header />
                      <div className="contentWrap">
                      <Post id={id} />
                    </div>
                    <Footer />
                    </div>
                  </div>) 
              })()
            })
          },
        },
      },
      "/post": {
        on: function(id) {
          that.setState({
            app: (function(){
              var returnComponent = null;
              if (getCookie("username")&&getCookie("password")) {
                var uname = getCookie("username");
                var pword = getCookie("password");
                $.ajax({
                  async: false,
                  url:"/userlogin",
                  data:{
                    uname:uname,
                    pword:pword
                  },
                  success: function(res){
                    console.log(res);
                    //已登录
                    if(res.code == 0){
                      returnComponent = (<div>
                      <AppLeftNav />
                      <div className="WBuedContainer">
                        <Header />
                        <Publish />
                        <Footer />
                      </div>
                      </div>)
                    }/*else{
                      //未登录
                      returnComponent = (<div>
                      <AppLeftNav />
                      <div className="WBuedContainer">
                        <Header />
                        <Login />
                        <Footer />
                      </div></div>) 
                    }*/
                  }
                })
              }else{
                returnComponent = (<div>
                  <AppLeftNav />
                  <div className="WBuedContainer">
                    <Header />
                    <div>
                    <span style={{marginTop:" 58px",display: "inline-block"}}>请登录后再发布</span>
                    <Login />
                    </div>
                    <Footer />
                  </div></div>) 
              }
              return returnComponent;
            })()
          })
        },
      },
      "/login": {
        on: function(id) {
          that.setState({
            app: (function(){
              return (
                <div>
                  <AppLeftNav />
                  <div className="WBuedContainer">
                    <Header />
                    <Login />
                    <Footer />
                  </div>
                </div>) 
            })()
          })
        },
      }
    });
    //初始化路由
    router.init();
  },
  render: function() {
    return this.state.app;
  },
})

var MainApp  = function (data, containerId) {
  var container = document.getElementById("WBued");
  ReactDOM.render(
    <App data={data} />,
    container
  );
};
//全局变量datasrc
MainApp(datasrc||{});
module.exports = MainApp;
