var React = require('react');

var $ = require("jquery");
var TodoList = React.createClass({
  render: function() {
    var that = this;
    var i = 0;
    var createItem = function(itemText) {
      return (
        <li className="item" key={i++} data-dbid = {itemText._id}>
          <span>{itemText.content}</span>
          <button onClick = {that.props.callParentDelete} className="delbtn">删除</button>
        </li>);
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});

var TodoApp = React.createClass({
  getInitialState: function() {
    //return this.props
    console.log(this.props.data)
    return this.props.data||{};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var that = this;
    $.ajax({
      url:"/add",
      type:"POST",
      data:{content:this.state.text},
      success: function(res){
        console.log(res);
        var nextItems = that.state.items.concat([{
          _id: res._id,
          content: that.state.text}]);
        var nextText = '';
        that.setState({items: nextItems, text: nextText});
      }
    })
  },
  dbidIndex: function(dbid){
    var items = this.state.items;
    for (var i = 0; i < items.length; i++) {
      if(items[i]["_id"] == dbid){
        return i
      }
    }
    return -1
  },
  callParentDelete: function(e){
    var that = this;
    var dbid = e.target.parentNode.getAttribute("data-dbid");
    $.ajax({
      url:"/del",
      type:"get",
      data:{dbid:dbid},
      success: function(res){
        console.log(res);
        if (res.code == 0) {
          if(that.dbidIndex(dbid)!=-1){
            that.state.items.splice(that.dbidIndex(dbid),1);
            var nextText = '';
            that.setState({items: that.state.items, text: nextText});
          }
        };
      }
    })
  },
  render: function() {
    return (
      <div className="container">
        <h3>TODO List</h3>
        
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Write task" onChange={this.onChange} value={this.state.text} />
          </div>
          
        </form>
        <TodoList items={this.state.items} callParentDelete = {this.callParentDelete} />
        <button className="submitbtn">{'Add #' + (this.state.items.length + 1)}</button>
      </div>
    );
  }
});
TodoApp.compname = "todoapp";
module.exports = TodoApp;
