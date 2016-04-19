var React = require("react");
var Header = require("./components/header/header.jsx");
var Footer = require("./components/footer/footer.jsx");

var Postlist = require("./components/postlist/postlist.jsx");

var AppLeftNav = require("./components/leftNav/appLeftNav.jsx");

var MPostApp = React.createClass({
	render: function(){
		var data = this.props.data;
		
		return(
			<div>
      		<AppLeftNav />
			<div className="WBuedContainer">
				<Header />
				<Postlist {...data} />
				<Footer />
			</div>
			</div>
		)
	}
});


var App = React.createClass({
	render: function(){
		var data = this.props.data;
		var datasrc = "var datasrc = " + JSON.stringify(data).replace(/script/g, 'scr"+"ipt');
		
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
	            	<script dangerouslySetInnerHTML={{__html: datasrc}} />
	            	<div id = "WBued">
	            		<MPostApp data={data} />
	            	</div>
	            	
	            	<script src="/js/list.bundle.js"></script>
	            </body>
            </html>
        );
	}
});


module.exports = App;