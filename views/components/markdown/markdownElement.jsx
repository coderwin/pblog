var React = require("react");
var marked = require("marked");
var PureRenderMixin = require("react-addons-pure-render-mixin");
var StylePropable = require("material-ui/lib/mixins/style-propable");

var styles = {
  root: {
    marginTop: 20,
    marginBottom: 20,
    padding: '0 10px'
  }
};

var MarkdownElement = React.createClass({
  /*propTypes: {
    style: React.PropTypes.object,
    text: React.PropTypes.string,
  },*/
  mixins: [
    PureRenderMixin
  ],
  getDefaultProps: function() {
    return {
      text: ''
    };
  },

  componentWillMount: function() {
    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: function(code, lang) {
        return require('highlight.js').highlight(lang, code).value;
      }
    });
  },

  render: function() {
    var style = this.props.style;
    var text = this.props.text;
    return (
      <div style={StylePropable.mergeStyles(styles.root, style)} className="markdown-body" dangerouslySetInnerHTML={{__html: marked(text)}} />
    );
  }
});
module.exports = MarkdownElement;
