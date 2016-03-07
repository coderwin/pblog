var React = require("react");
var $ = require("jquery");
var Pagination = React.createClass({
	style: {},
	render: function(){
		var curpage = this.props.curpage;
		var listsnum = this.props.listsnum;
		var pagesnum = this.props.pagesnum;
		var curlists = this.props.curlists;
		var arr = [];
		for (var i = 0; i < pagesnum; i++) {
			arr.push(i)
		};
		return(
			<ul ref="pagination"style={{display:((listsnum<30)?"none":"block")}} className="pagination">
				<li ref="prev" className="disabled" onClick={this.handlePrev}>
					<span className="material-icons">&lt;</span>
				</li>
				<li className="active"><span>1</span></li>
				<li><span>2</span></li>
				<li><span>3</span></li>
				<li ref="more" className="more"><span>...</span></li>
				<li><span>{pagesnum}</span></li>
				<li ref="next" onClick={this.handleNext}>
					<span className="material-icons">&gt;</span>
				</li>
				<select style={this.style.select} onChange={this.handleChangePage} value={curpage}>
				{
					arr.map(function(elem,index) {
						return (<option key={index+1} value={index+1}>{index+1}</option>)
					})
				}
				</select>
			</ul>
		)
	},
	handleChangePage: function(e){
		var curpage = e.target.value;
		this.handleActive(curpage);
		this.prevNextDisabled(curpage);
		this.props.handleParentChangePage(curpage);
	},
	handleActive: function(curpage){
		$(this.refs.pagination).find('.active').removeClass("active");

		if (curpage>3&&curpage<this.props.pagesnum) {
			$(this.refs.more).addClass('active');
		}else if(curpage==this.props.pagesnum){
			$(this.refs.next).prev().addClass('active');
		}else{
			$(this.refs.pagination).children().eq(curpage).addClass('active');
		}
		this.prevNextActive(curpage)
	},
	prevNextDisabled: function(curpage){
		if (curpage==1) {
			$(this.refs.prev).addClass('disabled')
		}
		if (curpage==this.props.pagesnum) {
			$(this.refs.next).addClass('disabled')
		}
	},
	prevNextActive: function(curpage){
		if (curpage>1) {
			$(this.refs.prev).removeClass('disabled')
		}
		if (curpage<this.props.pagesnum) {
			$(this.refs.next).removeClass('disabled')
		}
	},
	handlePrev: function(){
		var curpage = this.props.curpage;
		if (curpage > 1) {
			this.props.handleParentChangePage(curpage-1);
			this.handleActive(curpage-1);
			this.prevNextDisabled(curpage-1);
		}
	},
	handleNext: function(){
		var curpage = this.props.curpage;
		if (curpage < this.props.pagesnum) {
			this.props.handleParentChangePage(curpage+1);
			this.handleActive(curpage+1);
			this.prevNextDisabled(curpage+1);
		}
	}
})

module.exports = Pagination;