
var React = require('react');
var MarkdownElement = require("../markdown/markdownElement.jsx");
var Loading = require("../loading/loading.jsx");
var $ = require("jquery");
var Reply = require("../reply/reply.jsx");
// let MarkdownText = "Load Failed!";
var Post = React.createClass({
    /*PropTypes: {
        post: React.PropTypes.object
    },*/
    style: {
		marginTop: "78px"
	},
    getInitialState: function() {
        return {
            loaded: false,
            MarkdownText: "Failed",
            replys: "Failed"
        };
    },
    componentDidMount: function(){
        var that = this;
        var url;
        var s = that.props.id.split(".").pop();
        //if (s=="md") {

    	var mdurl = "/md/"+that.props.id;
	    $.ajax({
	        type: "GET",
	        url: "/api/detail/"+that.props.id,
	        success: function(data){
	        	console.log(data);
	            if (that.isMounted()){
	                that.setState({
                        loaded: true, 
                        MarkdownText:data.data, 
                        replys: data.replys, 
                        prevAndAfter: data.prevAndAfter,
                        visit_count:data.visit_count, 
                        reply_count: data.reply_count
                    })
                    $(document.body).on("keyup", function(e){
                        if (e.keyCode=="37") {
                            if (!data.prevAndAfter[0]) return;
                            $.ajax({
                                type: "GET",
                                url: "/api/detail/"+data.prevAndAfter[0]["_id"],
                                success: function(_data){
                                    data = _data;
                                    window.document.body.scrollTop=0;
                                    that.setState({
                                        loaded: true, 
                                        MarkdownText:_data.data, 
                                        replys: _data.replys, 
                                        prevAndAfter: _data.prevAndAfter,
                                        visit_count:_data.visit_count, 
                                        reply_count: _data.reply_count
                                    })
                                }
                            })
                        }else if(e.keyCode=="39"){
                            if (!data.prevAndAfter[1]) return;
                            $.ajax({
                                type: "GET",
                                url: "/api/detail/"+data.prevAndAfter[1]["_id"],
                                success: function(_data){
                                    data = _data;
                                    window.document.body.scrollTop=0;
                                    that.setState({
                                        loaded: true, 
                                        MarkdownText:_data.data, 
                                        replys: _data.replys, 
                                        prevAndAfter: _data.prevAndAfter,
                                        visit_count:_data.visit_count, 
                                        reply_count: _data.reply_count
                                    })
                                }
                            })
                        }
                    })
	            }
	        }
	    });

    	//}
    },
    render: function(){
    	var s = this.props.id.split(".").pop();
    	if(s=="png"||s=="jpg"||s=="jpeg"){
        	var imgurl = "/img/"+this.props.id;
        	return (<div style={this.style}>
                <img style={{
                    width:"96%",
                    height:"100%",
                    margin:"0 2%"
                }} src={imgurl} />
            </div>);
        }
        if (!this.state.loaded) {
            return(
                <Loading title="Doing Ajax! Trying hard to load!" />
            );
        }


        var prevAndAfter = this.state.prevAndAfter;

        return (<div style={this.style}>
            <MarkdownElement text={this.state.MarkdownText} />
            <div style={{
                fontSize: "12px",
                padding: "10px",
                color: "#767171"
            }}>{this.state.replys.length} replys / {this.state.visit_count} visits</div>

            <div style={{
                border: "1px solid #efefef",
                margin: "10px",
                background: "#fbfbfb",
                color:"#999",
                lineHeight:"30px",
                fontSize:"13px"
            }}>
                <div>上一篇：{prevAndAfter[0]?prevAndAfter[0]["title"]:"这是第一篇哦"}</div>
                <div>下一篇：{prevAndAfter[1]?prevAndAfter[1]["title"]:"最后一篇了哦"}</div>
            </div>
            <div style={{
                padding:"10px",
                color:"#999",
                textAlign:"center",
                marginTop:"50px"
            }}>使用键盘“←”和“→”可快速切换上下篇</div>

            <Reply infoid={this.props.id} replys = {this.state.replys} />
        </div>);
    }
});

module.exports = Post;
