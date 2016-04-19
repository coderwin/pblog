
var React = require("react");
var $ = require("jquery");
var Toast = require("../toast/toast.js")

var Login = React.createClass({
	style: {
		wrap:{
			height:"0px",
			marginTop:"58px"
		}
	},
	render: function(){
		var height = (typeof screen!="undefined")?(screen.height-90-178+"px"):"400px";
		this.style.wrap.height = height;
		return (
			<div ref="loginWrap" className="loginWrap" style={this.style.wrap}>
			    <div className = "loginContent">

			        <p>用户：<input className="username" placeholder="用户名" /></p>
					<p>密码：<input type="password" className="password" placeholder="密码" /></p>
					<button className="login" onClick={this.gotoLogin}>登录</button>
				</div>
			</div>
		)
	},
	gotoLogin: function(e){
		var uname = $(this.refs.loginWrap).find(".username");
		var pword = $(this.refs.loginWrap).find(".password");
		$.ajax({
			url:"/userlogin",
			data:{
				uname:uname.val(),
				pword:pword.val()
			},
			success: function(res){
				console.log(res);
				if(res.code == 0){
					Toast.init("登录成功")
					if(location.hash=="#/post"){
						location.reload();
					}else{
						location.href = "/";
					}
				}else if (res.code="-1") {
					Toast.init(res.msg)
				}
			}
		})
	}
})

module.exports = Login;

