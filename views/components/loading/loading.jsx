
var React = require('react');
var CircularProgress = require("material-ui/lib/circular-progress");
var Paper = require("material-ui/lib/paper");

var Loading = React.createClass({
	PropTypes: {
		title: React.PropTypes.string
	},
	style: {
        progress: {
            marginTop: "20%",
            marginLeft: "46%"
        }, paper:{
            height: 600
        }, text: {
			lineHeight: 1.1,
			fontWeight: "normal",
            color: "#757575",
            marginTop: 50,
            textAlign: "center"
        }
    },
	render: function() {
		return (
			<Paper zDepth={4} style={this.style.paper}>
				<br/><br/><h1 style={this.style.text}>{this.props.title}</h1>
				<CircularProgress style={this.style.progress} mode="indeterminate" size={2}/>
			</Paper>
		);
	}
});
module.exports = Loading;
