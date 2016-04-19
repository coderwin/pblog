/*RN APP Detail webview*/

var React = require('react');
var ReactDOM = require('react-dom');

var Post = require("../views/components/post/post.jsx");

require("../views/components/markdown/mui-github-markdown.css");

var injectTapEventPlugin = require('react-tap-event-plugin'); injectTapEventPlugin();

ReactDOM.render(
	<div>
		<div className="WBuedContainer">
		    <div className="contentWrap">
				<Post {...datasrc} />
			</div>
		</div>
	</div>,
	document.getElementById("WBued")
);
