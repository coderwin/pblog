var React = require('react');
var LeftNav = require('material-ui/lib/left-nav');
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var Divider = require('material-ui/lib/divider');

var ActionExplore = require('material-ui/lib/svg-icons/action/explore');
var ActionBuild = require('material-ui/lib/svg-icons/action/build');
var ActionHome = require('material-ui/lib/svg-icons/action/home');
var ActionLabel = require('material-ui/lib/svg-icons/action/label');
// var ActionAns = require('material-ui/lib/svg-icons/action/class');
// var ActionLock = require('material-ui/lib/svg-icons/action/fingerprint');
// var ActionFace = require('material-ui/lib/svg-icons/action/face');
// var ActionHTTP = require('material-ui/lib/svg-icons/action/http');
var HardwareComputer = require('material-ui/lib/svg-icons/hardware/computer');
// var ContentDrafts = require('material-ui/lib/svg-icons/content/drafts');
// import ContentSend from 'material-ui/lib/svg-icons/content/send';


var SelectableContainerEnhance = require('material-ui/lib/hoc/selectable-enhance').SelectableContainerEnhance;

var Colors = require("material-ui/lib/styles").Colors;
var Spacing = require("material-ui/lib/styles").Spacing;
var StylePropable = require("material-ui/lib/mixins").StylePropable;

var SelectableList = SelectableContainerEnhance(List);

var AppLeftNav = React.createClass({

  /*propTypes: {
    docked: React.PropTypes.bool.isRequired,
    history: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    onRequestChangeLeftNav: React.PropTypes.func.isRequired,
    onRequestChangeList: React.PropTypes.func.isRequired,
    open: React.PropTypes.bool.isRequired,
    style: React.PropTypes.object,
  },*/

  /*contextTypes: {
    muiTheme: React.PropTypes.object,
    router: React.PropTypes.func,
  },*/

  mixins: [
    StylePropable,
  ],

  handleRequestChangeLink: function(event, value) {
    window.location = value;
  },

  handleTouchTapHeader: function() {
    this.props.history.push('/');
    this.setState({
      leftNavOpen: false,
    });
  },

  getStyles: function() {
    return {
      logo: {
        cursor: 'pointer',
        fontSize: 24,
        lineHeight: '58px',
        backgroundColor: "#f25c17",
        paddingLeft: Spacing.desktopGutter,
        marginBottom: 8,
        display: (this.props.LARGEScreen?"none":"block")
      },
    };
  },

  render: function() {
    /*<a style={{textDecoration: "none",display:"block"}} href="http://cnblogs.com/cdwp8"><ListItem primaryText="cnblog" value="http://cnblogs.com/cdwp8" leftIcon={<ActionLabel />} /></a>*/
    var location = this.props.location,
      docked = this.props.docked,
      onRequestChangeLeftNav = this.props.onRequestChangeLeftNav,
      onRequestChangeList = this.props.onRequestChangeList,
      open = this.props.open,
      style = this.props.style;

    var styles = this.getStyles();

    return (
      <LeftNav
        width={200}
        style={style}
        docked={docked}
        open={open}
        onRequestChange={onRequestChangeLeftNav}
      >
        <div style={this.prepareStyles(styles.logo)} onTouchTap={this.handleTouchTapHeader}>
          
          <a style={{position: "relative",top: "8px"}} className="logo" href="/">
              <img width="35" height="35" src="/img/M2.png" alt="" />
          </a>

          <span style={{
              color: "#fff",
              marginLeft: "0px",
          }}>blog</span>

        </div>
        <SelectableList
          subheader="Categories"
          valueLink={{requestChange: onRequestChangeList}}
        >
          <a style={{textDecoration: "none",display:"block"}} href="/#/home"><ListItem 
            leftIcon={<ActionHome />}
            primaryText="Go Home" 
            value="/" 
          /></a>
          <a style={{textDecoration: "none",display:"block"}} href="/#/list"><ListItem
            leftIcon={<ActionExplore />}
            primaryText="All Posts"
            value="/posts/"
          /></a>
         
          <a style={{textDecoration: "none",display:"block"}} href="/#/post"><ListItem
            leftIcon={<HardwareComputer />}
            primaryText="Publish"
            value="/posts/os/"
          /></a>
          <a style={{textDecoration: "none",display:"block"}} href="/#/about"><ListItem
            leftIcon={<ActionBuild />}
            primaryText="About Me"
            value="/posts/general/"
          /></a>
          {/*<a style={{textDecoration: "none",display:"block"}} href="/#/login"><ListItem
                      leftIcon={<ActionLock />}
                      primaryText="=Password="
                      value="/login"
                    /></a>*/}
        </SelectableList>
        <Divider /><br />

        <SelectableList
          subheader="Tags"
          valueLink={{requestChange: onRequestChangeList}}
        >
          <a style={{textDecoration: "none",display:"block"}} href="/tags/javascript"><ListItem primaryText="JavaScript" value="https://github.com/coderwin" leftIcon={<ActionLabel />} /></a>
          <a style={{textDecoration: "none",display:"block"}} href="/tags/component"><ListItem primaryText="Component" value="http://cnblogs.com/cdwp8" leftIcon={<ActionLabel />} /></a>
          <a style={{textDecoration: "none",display:"block"}} href="/tags/css"><ListItem primaryText="CSS" value="http://fecom.58corp.com/" leftIcon={<ActionLabel />} /></a>
          <a style={{textDecoration: "none",display:"block"}} href="/tags/html5"><ListItem primaryText="HTML5" value="http://fecom.58corp.com/" leftIcon={<ActionLabel />} /></a>
        </SelectableList>

        <Divider /><br />
        <SelectableList
          subheader="Links"
          valueLink={{requestChange: onRequestChangeList}}
        >
          <a style={{textDecoration: "none",display:"block"}} href="https://github.com/coderwin"><ListItem primaryText="GitHub" value="https://github.com/coderwin" leftIcon={<ActionLabel />} /></a>
          {/*<a style={{textDecoration: "none",display:"block"}} href="http://fecom.58corp.com/"><ListItem primaryText="FEcomponents" value="http://fecom.58corp.com/" leftIcon={<ActionLabel />} /></a>*/}
        </SelectableList>
      </LeftNav>
    );
  }
});

module.exports = AppLeftNav;
