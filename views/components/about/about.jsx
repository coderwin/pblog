var React = require('react');
var MarkdownElement = require('../markdown/markdownElement.jsx');

var About = React.createClass({
	style: {
		marginTop: "78px"
	},
	render: function() {
		var MarkdownText = require('./about.md');
		return (<div style={this.style}><MarkdownElement text={MarkdownText}/></div>);
	}
});

module.exports = About;