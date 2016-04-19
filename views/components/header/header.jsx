var $ = require("jquery");
var React = require("react");

var Nav = require("../nav/nav.jsx");
var AppLeftNav = require("../leftNav/leftNav.jsx");

var Pub = require("../../../tools/pub.js");
var Header = React.createClass({
    render: function(){
        return (
        <div className="headernav">
            <div className="header">
                <a className="logo" href="/#/home">
                    <img src="/img/M2.png" alt="" />
                </a>
                <a className="menu" onTouchTap={this.toggleNav} href="javascript:;"></a>
            </div>

            <Nav />
        </div>)
    },
    toggleNav: function(){
        Pub.fire("toggleLeftNav");
    }
});

Header.compname = "header";
module.exports = Header;