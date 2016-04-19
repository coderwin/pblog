var React = require("react");

var Post = require("./components/post/post.jsx");

var MPostApp = React.createClass({
	render: function(){
		var data = this.props.data;
		console.log(data)
		return(
			<div>
			<div className="WBuedContainer">
				<div className="contentWrap">
					<Post {...data} />
				</div>
			</div>
			</div>
		)
	}
});


var App = React.createClass({
	render: function(){
		var data = this.props.data;
		var datasrc = "var datasrc = " + JSON.stringify(data).replace(/script/g, 'scr"+"ipt');
		console.log(data);
		return (
            <html lang="en">
	            <head>
	                <title>Pblog</title>
	                <meta charSet="utf-8" />
				    <meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width" />
				    <meta name="format-detection" content="telephone=no" />
				    <meta name="format-detection" content="email=no" />
				    <meta name="format-detection" content="address=no;" />
				    <meta name="apple-mobile-web-app-capable" content="yes" />
				    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
				    <link rel="stylesheet" href="/css/detail.css"/>
	                
	            </head>
	            <body>
	            <script dangerouslySetInnerHTML={{__html: datasrc}} />
	            	<div id = "WBued">
	            		<MPostApp data={data} />
	            	</div>
	            	
	            	<script src="/js/detail.bundle.js"></script>
	            </body>
            </html>
        );
	}
});


module.exports = App;