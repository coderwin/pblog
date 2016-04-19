/*RN APP about webview*/

var React = require('react');
var ReactDOM = require('react-dom');

var About = require("../views/components/about/about.jsx");

require("../views/components/markdown/mui-github-markdown.css");

var injectTapEventPlugin = require('react-tap-event-plugin'); injectTapEventPlugin();

ReactDOM.render(
	<div>
		<div className="WBuedContainer">
		    <About />
		</div>
	</div>,
	document.getElementById("WBued")
);