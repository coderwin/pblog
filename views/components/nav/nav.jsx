var React = require("react");
var $ = require("jquery");
// var Nav = React.createClass({
// 	render: function(){
// 		return (<div className="nav">
// 		    <div className="nav_a">
// 		        <a href="http://m.58.com/">首页</a>&gt;
// 		        <a href="http://p.m.58.com/">发布</a>&gt;
// 		        <a className="nav_nourl" href="javascript:;">选择类别</a>
// 		    </div>
// 		</div>)
// 		/*return (<div className="nav">
// 		    <div className="nav_a">
// 		    	nav
// 		    </div>
// 		</div>)*/
// 	}
// });

var Toast = require("../toast/toast.js");
var Nav = React.createClass({
	render: function(){
		return (
			<div className="nav" style={{display:"none"}}>
				<a href="/">首页</a>
				<a href="/about">关于</a>
				<a href="/login">登录</a>
				<a onClick = {this.handleLoginout} href="javascript:void(0)">退出</a>
			</div>
		)
	},
	handleLoginout: function(){
		$.ajax({
			url:"/loginout",
			success: function(res){
				console.log(res);
				if (res.code =="0") {
					Toast.init("退出成功");
				}else if(res.code = "1"){
					Toast.init("尚未登录",1000,function(){
						location.href = "/login";
					});
				}else{
					Toast.init("退出错误");
				}
			}
		})
	},
});

Nav.compname = "nav";
module.exports = Nav;