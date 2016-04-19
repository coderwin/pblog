var React = require("react");
var $ = require("jquery");
var Toast = require("../toast/toast.js")
var FileUpload = require("../fileUpload/fileUpload.jsx");
var Publish = React.createClass({
	
	fileUploadCallback: function(val){
		this.fileVal = val;
	},
	publish: function(){
		var wrap$ = $(this.refs.publish);
		var title = wrap$.find('.title').val();
		var content = wrap$.find('.content').val();
		var fileVal = this.fileVal;
		var tag = wrap$.find(".tag").val()||"javascript";
		var publishData = {
			title: title,
			content: content,
			fileVal: fileVal,
			tag: tag
		};
		$.ajax({
			url: "/publish",
			data: publishData,
			type:"POST",
			success: function(res){
				console.log(res);
				if (res.code=="0") {
					Toast.init("发布成功");
					location.reload();
				};
			}
		})
	},
	render: function(){
		return (
			<div ref ="publish" style={{margin:"15px"}}>
	          	<h4>Post</h4>
	          	<p><span>Title</span><br /><input className="title" type="text" /></p>
	          	<p><span>Tag</span><br /><input className="tag" type="text" /></p>
	          	<p><span>Content</span><br /><textarea className="content"></textarea></p>
	          	<FileUpload fileUploadCallback={this.fileUploadCallback} />
	          	<p><input onClick={this.publish} type="button" value="发布"/></p>
	        </div>
		)
	},
});

module.exports = Publish;