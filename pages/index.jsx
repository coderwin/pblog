var $ = require("jquery");
var React = require('react');
var ReactDOM = require('react-dom');
var Header = require("../views/components/header/header.jsx");
require("../views/components/header/header.css");

var Nav = require("../views/components/nav/nav.jsx");
require("../views/components/nav/nav.css");

var TodoApp = require("../views/components/todoapp/todoapp.jsx");
require("../views/components/todoapp/todoapp.css");

var Footer = require("../views/components/footer/footer.jsx");
require("../views/components/footer/footer.css");

var Postlist = require("../views/components/postlist/postlist.jsx");
require("../views/components/postlist/postlist.css");

var Post = require("../views/components/post/post.jsx");

var MarkdownElement = require("../views/components/markdown/markdownElement.jsx");
require("../views/components/markdown/mui-github-markdown.css");
// /*<MarkdownElement text={MarkdownText}/>*/
// var MarkdownText = require("./www/about/about.md");

var About = require("../views/components/about/about.jsx");
require("../views/components/toast/toast.css");
var Home = require("../views/pages/home.jsx");
require("../views/pages/home.css");
require("../views/components/pagination/pagination.css");
/*var Router = require("../public/js/ReactRouter.min.js").Router;
var Route = require("../public/js/ReactRouter.min.js").Route;
var browserHistory = require("../public/js/ReactRouter.min.js").browserHistory;*/

var Publish = require("../views/components/publish/publish.jsx");
var AppLeftNav = require("../views/components/leftNav/appLeftNav.jsx");

var Login = require("../views/components/login/login.jsx");

var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

var Router = require("director").Router;
var App = React.createClass({
  /*render: function(){
    React.cloneElement(this.state.app)
    var data = this.props.data;
    return (
      <div>
        <AppLeftNav />
        <div className="WBuedContainer">
          <Header />
          <TodoApp data = {data} />

          <Publish />
          <Footer />
        </div>
      </div>
      )
  },*/
  getInitialState: function() {
    var data = this.props.data;
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
    return {
      app: (<Home />)
    } 
  },
  componentDidMount: function() {
    var data = this.props.data;
    var that = this;
    var router = Router({
      '/home': {
        on: function() {
          that.setState({ app: (function(){return (<Home />) })()})
        },
      },
      '/list': {
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
      // '/tags': {
      //   "/:id": {
      //     on: function() {
      //       that.setState({ app: (function(){return ( <div>
      //         <AppLeftNav />
      //         <div className="WBuedContainer">
      //           <Header />
      //           <Postlist {...data} />
      //           <Footer />
      //         </div>
      //         </div>) 
      //       })()
      //       })
      //     },
      //   },
      // },
      '/about': {
        on: function() {
          that.setState({ app: (function(){return (<div>
            <AppLeftNav />
            <div className="WBuedContainer">
                <Header />
                <About />
                <Footer />
            </div></div>) 
          })()
          })
        }
      },
      '/detail': {
        '/:id': {
          on: function(id) {
            that.setState({ app: (function(){return (<div>
              <AppLeftNav />
              <div className="WBuedContainer">
                  <Header />
                  <div className="contentWrap">
                  <Post id={id} />
                </div>
                  <Footer />
              </div></div>) 
              })()
            })
          },
        },
      },
      "/post": {
        on: function(id) {
          that.setState({ app: (function(){
            var returnComponent = null;
            var getCookie = function(name) {
              var arr = [],
                reg=new RegExp("(^| )" + name + "=([^;]*)(;|$)");
              if (arr = document.cookie.match(reg)){
                return unescape(arr[2]);
              }
              return '';
            };
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
                  if(res.code == 0){
                    returnComponent = (<div>
                    <AppLeftNav />
                    <div className="WBuedContainer">
                      <Header />
                      <Publish />
                      <Footer />
                    </div>
                    </div>) 
                  }else{
                    returnComponent = (<div>
                    <AppLeftNav />
                    <div className="WBuedContainer">
                        <Header />
                        <Login />
                        <Footer />
                    </div></div>) 
                  }
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
          that.setState({ app: (function(){return (<div>
            <AppLeftNav />
            <div className="WBuedContainer">
                <Header />
                <Login />
                <Footer />
            </div></div>) 
            })()
          })
        },
      }
    });
    router.init();
  },
  render: function() {
    return this.state.app;
  },
})


var MainApp  = function (data, containerId) {
  var container = document.getElementById("WBued");
  ReactDOM.render(
    /*(<Router history={browserHistory}>
        <Route path="/h" component={App}>
            <Route path="/detail/:id" component={Post}/>
            <Route path="/about" component={About}/>
            <Route path="/post" component={Publish}/>
        </Route>
    </Router>),*/
    <App data={data} />,
    container
  );
};

MainApp(datasrc||{});
module.exports = MainApp;


/*前端渲染入口*/
// define(['./views/components/header/header.jsx','./views/components/nav/nav.jsx','./views/components/footer/footer.jsx',"./views/components/todoapp/todoapp.jsx"],function(Header,Nav,Footer,TodoApp){

// 	var React = require("react");
// 	var ReactDOMServer = require('react-dom/server');

// 	/*var form = [{
//         type: "todoapp",
//         name: "todoapp",
//         canNull: false
//     }];*/
//     var form = require("./views/pages/config.js")

// 	var contrComponents = {};
// 	var args = [].slice.call(arguments);
// 	for (var i = 0; i < args.length; i++) {
// 		contrComponents[args[i]["compname"]] = args[i];
// 		require("./views/components/"+args[i]["compname"]+"/"+args[i]["compname"]+".css");
// 	}
// 	/*require("./views/components/header/header.css");
// 	require("./views/components/nav/nav.css");
// 	require("./views/components/footer/footer.css");*/

// 	var FormList = React.createClass({
		
// 	    render: function(){
// 	    	var data = this.props.data;
// 	    	var components = [];
// 	    	for (var i = 0; i < form.length; i++) {
// 	    		var type = form[i]["type"];
// 	    		var Component = contrComponents[type];
// 	    		components.push(React.createElement(Component, {popts: form[i]}, {data: data}));
// 	    	};
// 	        return (
	           
// 	        	React.createElement("div", null, components)
// 	        	/*<form>{components}</form>*/
// 	        );
// 	    }
// 	});

// 	var MPostApp = React.createClass({
// 		render: function(){
// 			var Header = contrComponents["header"];
// 			var Nav = contrComponents["nav"];
// 			var Footer = contrComponents["footer"];
// 			var data = this.props.data;
// 			return(
// 				<div className="MPostAppWrap">
// 					<Header />
// 					<Nav />
// 					<FormList data={data} />
// 					<Footer />
// 				</div>
// 			)
// 		}
// 	});

// 	var MainApp  = function (data, containerId) {
// 		var ReactDOM = require('react-dom');
// 		console.log(data)
// 		var container = document.getElementById("WBued");
//   		ReactDOM.render(
//   			<div className="_container">
//     			<MPostApp data={data}/>
//     		</div>,
// 	    	container
// 	  	);
// 	};
// 	MainApp(datasrc||{});
// 	//module.exports = MPostApp;
// })