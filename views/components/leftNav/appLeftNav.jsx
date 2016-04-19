var React = require('react');
var StylePropable = require("material-ui/lib/mixins").StylePropable;
var StyleResizable = require("material-ui/lib/mixins").StyleResizable;

var Pub = require("../../../tools/pub.js");

var LeftNav = require("./leftNav.jsx");
var AppLeftNav = React.createClass({
  mixins: [
      StylePropable,
      StyleResizable,
  ],
  getInitialState: function(){
      return {
          leftNavOpen: false
      }
  },
  componentDidMount: function(){
  	var that = this;
  	Pub.add("toggleLeftNav",function(){
      if (that.isMounted()) {
  		that.setState({
          leftNavOpen: !that.state.leftNavOpen
      })
      }
  	})
  },
  render: function(){
    var docked = false;
    var leftNavOpen = this.state.leftNavOpen;
    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
    	console.log(StyleResizable.statics.Sizes.LARGE);
        docked = true;
        leftNavOpen = true;
        var LARGEScreen = true;
    }

    return(<LeftNav 
        docked={docked} 
        onRequestChangeLeftNav={this.handleChangeRequestLeftNav}
        onRequestChangeList={this.handleRequestChangeList}
        open={leftNavOpen}
        LARGEScreen={LARGEScreen}
    />)
  },
  handleRequestChangeList: function(){
      this.setState({
        leftNavOpen: false,
      });
  },
  handleChangeRequestLeftNav: function(open) {
      this.setState({
          leftNavOpen: open,
      });
  }
});

module.exports = AppLeftNav;