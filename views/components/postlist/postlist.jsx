var $ = require("jquery");
var React = require('react');
var json4postlist = require("../../../public/post/json4postlist.json");

var Pagination = require("../pagination/pagination.jsx");
var Pub = require("../../../tools/pub.js");

var Postlist = React.createClass({
	getpostlists: function(){
		if (this.props.postlists.length) {
			return this.props.postlists
		}else{
			// return (json4postlist||[])
			return [];
		}
	},
	getInitialState: function(){
		var lists = this.getpostlists()||window.datasrc.postlists||[];
		console.log(lists);
		var curpage = 1;
		var maxlist = 20;
		var pagesnum = lists.length;
		var curlists = lists.slice(maxlist*(curpage-1),maxlist*curpage);
		return {
			lists: this.getpostlists(),
			curlists: curlists,
			curpage: 1
		};
	},
	componentDidMount: function(){},
	render: function(){
		console.log(this.state.lists);
		var maxlist = 20;
		var lists = this.state.lists;

		if (lists.length==0) {
			
			return(<div className="postlistwrap">
				<p style={{
					height:"200px",
					widrh:"100%",
					textAlign:"center",
				}}>还没有任何文章！</p>
			</div>)

			setTimeout(function(){
				Pub.fire("hideFooter");
			},10)
		}


		var curpage = this.state.curpage;

		var listsnum = lists.length;
		var pagesnum = Math.ceil(lists.length/maxlist);
		var curlists = lists.slice(maxlist*(curpage-1),maxlist*curpage);
		var curlists = this.state.curlists;
		return (
		<div className="postlistwrap">
			{curlists.map(function(item,index){
				var n = JSON.stringify(item.meta.createAt).substr(1,10);
				return (
				<div className="postlist" key={index}>
					<span className="createAt">{n}</span>
					<h3>{item.title}</h3>
					<p>{item.content}</p>
					<a href={item._id?("/#/detail/"+item._id):"/"} className="readme">Read Me</a>
					<span style={{color: "#999",fontSize: "12px",marginLeft: "10px"}}> {item.reply_count||"0"} reply / {item.visit_count||"0"} visits</span>
				</div>
				)
			})}

			<Pagination curpage={curpage} pagesnum={pagesnum} listsnum={listsnum} curlists={curlists} handleParentChangePage={this.handleParentChangePage}/>
		</div>
		)
	},
	handleParentChangePage: function(page){
		var lists = this.getpostlists()||window.datasrc.postlists||[];
		var curpage = page;
		var maxlist = 20;
		var pagesnum = lists.length;
		var curlists = lists.slice(maxlist*(curpage-1),maxlist*curpage);
		this.setState({
			curlists: curlists,
			curpage: page
		})
	}
});
module.exports = Postlist;
