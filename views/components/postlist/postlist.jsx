var React = require('react');
// var Link = require("react-router").Link;
var $ = require("jquery");
/*var Link = require("../../../public/js/ReactRouter.min.js").Link;*/
var json4postlist = require("../../../public/post/json4postlist.json");

var Pagination = require("../pagination/pagination.jsx");

var Postlist = React.createClass({
	getpostlists: function(){
		if (this.props.postlists.length) {
			return this.props.postlists
		}else{
			return (json4postlist||[])
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
	componentDidMount: function(){
		/*var that = this;
		$.ajax({
			url: "/post/json4postlist.json",
			success: function(res){
				that.setState({
					lists: res
				})
			}
		})*/
	},
	render: function(){
		var maxlist = 20;
		var lists = this.state.lists;
		var curpage = this.state.curpage;

		var listsnum = lists.length;
		var pagesnum = Math.ceil(lists.length/maxlist);
		var curlists = lists.slice(maxlist*(curpage-1),maxlist*curpage);
		console.log(lists)
		var curlists = this.state.curlists;
					//<span className="createAt">{JSON.stringify(item.meta.createAt)}</span>

		return (
		<div className="postlistwrap">
			{curlists.map(function(item,index){
				// console.log(typeof(item.meta.createAt));
				// for(var k in item.meta.createAt){
					//console.log(JSON.stringify(item.meta.createAt).substr(1,10))
				var n = JSON.stringify(item.meta.createAt).substr(1,10);
				// }
				//console.log(typeof(item.meta.createAt.format('YYYY-MM-DD HH:MM')))
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
		console.log(lists);
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
