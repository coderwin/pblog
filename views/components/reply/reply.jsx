/*issue*/
/*
	父组件状态变化使得子组件状态改变，通过props传给子组件，同时子组件的相关操作会改变同一个状态，此时子组件的渲染应该怎么做
*/
var React = require('react');
var MarkdownElement = require("../markdown/markdownElement.jsx");
var Loading = require("../loading/loading.jsx");
var $ = require("jquery");
var Toast = require("../toast/toast.js")
// let MarkdownText = "Load Failed!";
var Reply = React.createClass({
    PropTypes: {
        replys: React.PropTypes.array
    },
    style: {
    	replyContainer: {
			marginTop: "50px",
			padding: "0 10px",
			marginBottom:"30px"
    	},
    	replyContentWrap: {
    		position: "relative",
		    border: "2px solid #f25c17",
		    borderRadius: "4px",
		    width: "100%",
		    height: "66px",
		    marginBottom: "10px",
		    marginTop:"20px"
    	},
    	replyTextareaWrap: {
    		position: "absolute",
		    left: "10px",
		    top: "10px",
		    right: "80px",
		    bottom: "10px",
    	},
    	replyContent: {
    		background: "0 0",
		    width: "100%",
		    height: "100%",
		    border: "0",
		    resize: "none",
		    fontSize: "14px",
		    overflow: "auto",
    	},
    	replyup: {
    		right: "0",
		    bottom: "0",
		    width: "80px",
		    height: "67px",
		    fontSize: "18px",
		    lineHeight: "66px",
		    borderRadius: "0 2px 2px 0",
		    position: "absolute",
		    background: "#f25c17",
		    color: "#fff",
		    textAlign: "center",
		    cursor: "pointer",
    	},
    	replyerInfo: {
    		display: "block",
		    border: "2px solid #f25c17",
		    borderRadius: "4px",
		    fontSize: "14px",
		    padding: "8px",
		    width: "250px",
		    background: "#F7FBF7",
		    color: "#4BA96A",
		    marginBottom: "10px",
    	},
    	replyUserInfo: {
    		fontSize: "12px",
    		padding: "10px",
    		color: "#767171",
    	},
    	replyMarkdown: {
		    color: "#fff",
		    borderRadius: "2px",
		    padding: "1px",
		    marginBottom: "5px",
		    background: "#ccc",
		    position:"relative"
    	}
	},
    getInitialState: function() {
    	return {
    		replys: this.props.replys
    	}
    },
    componentDidMount: function(){
    	// this.setState({
    	// 	replys: this.props.replys
    	// })
    },
    componentWillReceiveProps: function(nextprops){
    	if(nextprops.replys != this.props.replys&&this.state.replys){
    		this.setState({
    			replys: nextprops.replys
    		})
    	}
    },
    render: function(){
    	var that = this;
    	//if (this.state.replys[0]["_id"]==this.props.replys[0]["_id"]) {
		var replys = this.state.replys;
    	//}else{
    	//	var replys = this.props.replys;
    	//}
    	if (typeof replys=="object") {
        return (<div ref="replyContainer" style={this.style.replyContainer}>
        	{
        		replys.map(function(item, index){
        			return (
        				<div className="replysItem" key={index}>
        					<div style={that.style.replyUserInfo}>{item.replyer+"@"+(item.connect||"")} / {item.meta.createAt}</div>
        					<div className="replyMarkdown" style={that.style.replyMarkdown}><MarkdownElement text={item.content} /></div>
        				</div>
        			)
        		})
        	}
        	<div ref="replyform">
        		<div style={this.style.replyContentWrap}>
	        		<div style={this.style.replyTextareaWrap}><textarea onFocus={this.showReplyerInfo} style={this.style.replyContent} className="replyContent" placeholder="说点什么吧～支持markdown哦"></textarea></div>
	        		<div style={this.style.replyup} onClick={this.handleReplyup} className = "replyup">发表</div>
        		</div>
        		<li style={{marginBottom:"10px",listStyle:"none", display:"none"}}><input style={this.style.replyerInfo} placeholder="昵称" type="text" className="name" /></li>
        		<li style={{marginBottom:"10px",listStyle:"none",  display:"none"}}><input style={this.style.replyerInfo} placeholder="联系方式" type="text" className="connect" /></li>
        	</div>
        </div>);
        }else {
        	return (<div ref="replyform">
        		<div style={this.style.replyContentWrap}>
	        		<div style={this.style.replyTextareaWrap}><textarea onFocus={this.showReplyerInfo} style={this.style.replyContent} className="replyContent" placeholder="说点什么吧～支持markdown哦"></textarea></div>
	        		<div style={this.style.replyup} onClick={this.handleReplyup} className = "replyup">发表</div>
        		</div>
        		<li style={{marginBottom:"10px",listStyle:"none"}}><input style={this.style.replyerInfo} placeholder="昵称" type="text" className="name" /></li>
        		<li style={{marginBottom:"10px",listStyle:"none"}}><input style={this.style.replyerInfo} placeholder="联系方式" type="text" className="connect" /></li>
        	</div>)
        }
    },
    handleReplyup: function(){
    	var that = this;
    	var name = $(this.refs.replyform).find(".name").val();
    	var connect = $(this.refs.replyform).find(".connect").val();
    	var content = $(this.refs.replyform).find(".replyContent").val();
    	$.ajax({
    		url: "/replyup",
    		type: "post",
    		data: {
    			replyer: name,
    			content: content,
    			connect: connect,
    			infoid: this.props.infoid,
    		},
    		success: function(res){
    			console.log(res);
				if (res.code=="0") {
					Toast.init("发布成功");
					var replys = that.state.replys;
					replys.push(res.reply);
					that.setState({
						replys: replys
					});
					$(that.refs.replyform).find(".name").val("");
					$(that.refs.replyform).find(".connect").val("");
					$(that.refs.replyform).find(".replyContent").val("");
				};
    		}
    	})
    },
    showReplyerInfo: function(){
    	$(this.refs.replyform).find(".name").parent().show();
    	$(this.refs.replyform).find(".connect").parent().show();
    }
});

module.exports = Reply;