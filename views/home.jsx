var React = require("react");
var Home = require("./pages/home.jsx");

var MPostApp = React.createClass({
	render: function(){
		return(
			<Home />
		)
	}
});

var App = React.createClass({
	render: function(){
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
				    <link rel="stylesheet" href="/css/index.css"/>
	                
	            </head>
	            <body>
	            	<div id = "WBued">
	            		<MPostApp />
	            	</div>
	            	
	            	<script src="/js/home.bundle.js"></script>
	            </body>
            </html>
        );
	}
});


module.exports = App;