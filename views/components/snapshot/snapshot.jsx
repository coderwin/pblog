var React = require("react");
var $ = require("jquery")
var Snapshot = React.createClass({
	toQueryString:function(obj) {
	    return Object.keys(obj).sort().map(function (key) {
	        var val = obj[key];
	        if (Array.isArray(val)) {
	            return val.sort().map(function (val2) {
	                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
	            }).join('&');
	        }
	        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
	    }).join('&');
	},
	ajaxget:function(url, data, callback){
		var that = this;
		var xhr = new XMLHttpRequest();
		xhr.open("get", url+this.toQueryString(data),true);
		xhr.onreadystatechange = function(){
			if(xhr.readyState==4&&xhr.status==200){
				var res = JSON.parse(xhr.responseText);
				callback.call(that, res);
			}
		}
		xhr.send(null);
	},
	handleSnapshot:function(){
		var that = this;
		var data = {
			clientWidth: screen.width,
			imgurl:location.href, 
		};
		//loading
		var li = document.createElement("span");
		li.setAttribute("id","waiting");
		li.setAttribute("class","waiting");
		li.innerHTML = "正在生成图片，请等待...";
		$(that.refs.snapshotbutton).after(li);

		if (typeof fetch=="undefined") {

			this.ajaxget("/snapshot/?", data, function(res){
				var loading = document.getElementById("waiting");
				loading.innerHTML="<a target='_blank' href="+res.imgurl+">"+res.imgname+"</a>";
				var img = document.createElement("img");
				img.style.width = "100%";
				img.style.height = "100%";
				img.src = res.imgurl;
				//that.refs.container.appendChild(img);
			})
		}else{

			fetch("/snapshot/?"+this.toQueryString(data)).then(function(response) {
				return response.json();
			}).then(function(res) {
				console.log(res);
				document.getElementById("waiting").innerHTML="<a target='_blank' href="+res.imgurl+">"+res.imgname+"</a>";
				var img = document.createElement("img");
				img.style.width = "100%";
				img.style.height = "100%";
				img.src = res.imgurl;
				//that.refs.container.appendChild(img);
			})
		}
	},
	render:function(){
		return(
			<div className="snapshot">
				{/*<h1>{"Hello"+this.state.name}</h1>
					<li><span>需要截成长图的URL地址</span></li>
					<li><input ref="imgurl" id="urlval" type="text" /></li>*/
				}
				<div ref="container" id="snapshot" style={{textAlign:"center",fontSize:"14px",verticalAlign: "middle"}}><button ref="snapshotbutton" onClick={this.handleSnapshot}>生成图片</button><div style={{marginTop:"20px",
    				fontSize: "12px",
    				color: "#f00"}}>tips: 截图宽度默认以你当前窗口宽度，如果想截小图，请调整视窗大小。</div></div>
				<br />
			</div>
		)
	}
})

module.exports = Snapshot;