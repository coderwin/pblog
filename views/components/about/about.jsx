var React = require('react');
var MarkdownElement = require('../markdown/markdownElement.jsx');
var app = typeof location!="undefined"&&location.search.indexOf("plat=app")!=-1
var About = React.createClass({
	style: {
		marginTop: app?0:"78px",
	    marginRight: app?0:"310px"
	},
	render: function() {
		var MarkdownText = require('./about.md');
		return (<div className="aboutcontainer" style={this.style}><MarkdownElement text={MarkdownText}/>

			<iframe style={{
			    width: "282px",
    			position: "absolute",
    			top: "125px",
    			right: "20px",
    			display:app?"none":"block"
			}} width="282" height="550" className="share_self"  frameBorder="0" scrolling="no" src="http://widget.weibo.com/weiboshow/index.php?language=&width=0&height=550&fansRow=1&ptype=1&speed=0&skin=1&isTitle=1&noborder=1&isWeibo=1&isFans=1&uid=2973985050&verifier=c6b767b7&dpc=1"></iframe>

			</div>);
	}
});

module.exports = About;