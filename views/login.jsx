var React = require("react");
var Header = require("./components/header/header.jsx");
var Nav = require("./components/nav/nav.jsx");
var Footer = require("./components/footer/footer.jsx");
var Login = require("./components/login/login.jsx");
var AppLeftNav = require("./components/leftNav/appLeftNav.jsx");

var MPostApp = React.createClass({
	render: function(){

		return(
			<div>
      		<AppLeftNav />
			<div className="WBuedContainer">
				<Header />
				<Login />
				<Footer />
			</div>
			</div>
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
	            	<script src="/js/login.bundle.js"></script>
	            </body>
            </html>
        );
	}
});


module.exports = App;