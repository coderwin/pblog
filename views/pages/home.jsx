var React = require("react");
var Header = require("../components/header/header.jsx");
var Footer = require("../components/footer/footer.jsx");
var AppLeftNav = require("../components/leftNav/appLeftNav.jsx");
var Mlogo = React.createClass({
	style: {
		Mlogo: {
		 	height: "400px",
		    marginTop: "57px",
		    background: "#f25c17",
		    textAlign: "center",
		    paddingLeft: "30px",
		    paddingRight: "30px"
		},
		logo: {
			marginTop: "66px"
		},
		MlogoText: {
			color: "#fff"
		},
		gotoListp: {
			marginTop: "53px"
		},
		gotoLista:{
			color: "#00bcd4",
		    textDecoration: "none",
		    background: "#FFF",
		    padding: "8px",
		    borderRadius: "3px"
		}
	},
	render: function(){
		return(
			<div className="Mlogo" style={this.style.Mlogo}>
				<img className="MlogoImg" src="/img/M2.png" style={this.style.logo} />
				<p className="MlogoText" style={this.style.MlogoText}>
					Blog crafted by @imChenJian. Unauthorized use of any content is strictly prohibited.
				</p>
				<p className="gotoListp" style={this.style.gotoListp}>
					<a href="/#/list" className="gotoLista" style={this.style.gotoLista}>Go For Lists</a>
				</p>
			</div>
		)
	}
})
var Guide = React.createClass({
	style: {
		guideWrap: {
 			padding: "35px",
		    margin: "0 auto",
		    textAlign: "center",
		    maxWidth: "930px",
		    overflow: "hidden"		
		}
	},
	render: function(){
		return(
			<div className="guideWrap" style={this.style.guideWrap}>
				<a href="/#/about"><li className="guideabout">
					<div>About</div>
					<img src="img/get-started.svg" />
				</li></a>
				<a href="/#/post"><li className="guidepost">
					<div>Post</div>
					<img src="img/css-framework.svg" />
				</li></a>
				<a href="/#/list"><li className="guidelists">
					<div>Lists</div>
					<img src="img/components.svg" />
				</li></a>
			</div>
		)
	}
})

var Home = React.createClass({
	render: function(){
		return(
			<div>
      		<AppLeftNav />
			<div className="WBuedContainer">
				<Header />
				<Mlogo />
				<Guide />
				<Footer />
			</div>
			</div>
		)
	}
})
module.exports = Home;

