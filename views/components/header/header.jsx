var React = require("react");
var $ = require("jquery");
// var Header = React.createClass({
//     render: function(){
//         //<!-- <a class="h_btn h_postmy" href="http://m.m.58.com/" rel="nofollow">账户</a> -->
//         var data = this.props.datasrc||"北京";
//         return (
// 	        <div className="header">
// 	            <a className="logo" href="http://m.58.com/bj"><img src="http://pic2.58.com/m58/m4/index/logo_white.png" alt="中文最大生活信息门户" width="69" height="20" /></a>
// 	            <a className="city_a" href="http://m.58.com/city.html?-16=3&amp;from=click_city&amp;return=http://p.m.58.com/"><div className="city">{data}</div><div className="city_ico"></div></a>
// 	            <a className="h_btn h_regist" href="javascript:;" rel="nofollow">注册</a>
// 	            <a className="h_btn h_login" onClick={this.handleLogin} href="javascript:;" rel="nofollow">登录</a>
//                 <div ref="loginWrap" className="popWrap">
//     	            <div className = "popMask"></div>
//     	            <div className = "popContent">
//                         <span className="popClose" onClick={this.closeMask}>X</span>
//                         用户：<input className="username" placeholder="用户名" /><br />
//     					密码：<input className="password" placeholder="密码" /><br />
//     					<button className="login" onClick={this.gotoLogin}>登录</button>
//     				</div>
//                 </div>
// 	        </div>
// 	    )
// 		/*test*/
// 		/*return (
// 	        <div className="header">
// 	            header
// 	        </div>
// 	    )*/
//     },
//     handleLogin: function(e){
//     	$(this.refs.loginWrap).show();
//     },
//     closeMask: function(e){
//         $(this.refs.loginWrap).hide();
//     },
//     gotoLogin: function(e){
//     	var uname = $(this.refs.loginWrap).find(".username");
//     	var pword = $(this.refs.loginWrap).find(".password");
//     	$.ajax({
//     		url:"/login",
//     		data:{
//     			uname:uname.val(),
//     			pword:pword.val()
//     		},
//     		success: function(res){
//     			console.log(res)
//     		}
//     	})
//     }
// });

var StylePropable = require("material-ui/lib/mixins").StylePropable;
var StyleResizable = require("material-ui/lib/mixins").StyleResizable;

var Nav = require("../nav/nav.jsx");
var AppLeftNav = require("../leftNav/leftNav.jsx");

var Pub = require("../../../tools/pub.js");
var Header = React.createClass({
    /*mixins: [
        StylePropable,
        StyleResizable,
    ],
    getInitialState: function(){
        return {
            leftNavOpen: false
        }
    },*/
    render: function(){
        /*var docked = false;
        var leftNavOpen = this.state.leftNavOpen;
        if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
            docked = true;
            leftNavOpen = true;
        }*/
        return (
        <div className="headernav">
            <div className="header">
                <a className="logo" href="/#/home">
                    <img src="/img/M2.png" alt="" />
                </a>
                <a className="menu" onTouchTap={this.toggleNav} href="javascript:;"></a>
            </div>

            <Nav />
        </div>)
    },
    // handleRequestChangeList: function(){
    //     this.setState({
    //       leftNavOpen: false,
    //     });
    // },
    // handleChangeRequestLeftNav: function(open) {
    //     this.setState({
    //         leftNavOpen: open,
    //     });
    // },
    toggleNav: function(){
        // console.log(this.state.leftNavOpen);
        // this.setState({
        //     leftNavOpen: !this.state.leftNavOpen
        // })
        Pub.fire("toggleLeftNav");
    },
    toggleMenu: function(e){
        $(".nav").toggle()
    }
});

Header.compname = "header";
module.exports = Header;