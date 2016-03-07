var Util = require("./util.js");
var Observe = {
	// 添加事件监听
	// 类似jq bind传data, 在回调函数evt.data拿到data
	add: function (key, listener, data) {
	  this._events || (this._events = {});
	  this._events[key] || (this._events[key] = []);
	  if (Util.indexOf(this._events[key], listener) === -1 
	    && typeof listener === "function") {
	    data ? this._events[key].push({
	      listener: listener,
	      data: data
	    }) : this._events[key].push(listener)
	  }
	  // 返回this可以继续执行组件对象的方法，实现链式调用
	  return this
	},
	// 事件触发器
	fire: function (key) {
	  if (!this._events || !this._events[key]) {
	    return;
	  }
	  var args = [].slice.call(arguments, 1) || [];

	  var listeners = this._events[key];
	  var l = listeners.length;
	  for (var i = 0; i < l; i++) {
	    var data = listeners[i]['data']
	    data ? (function (i) {
	      args.unshift(data);
	      listeners[i]['listener'].apply(this, args)
	    })(i) : listeners[i].apply(this, args)
	  }
	  return this
	},

	//解绑事件(取消监听)
	off: function (key, listener) {
	  //不传任何参数直接解绑所有监听事件和执行函数
	  if (!key && !listener) {
	    this._events = {}
	  }
	  //不传具体执行函数,解绑该事件
	  if (key && !listener) {
	    delete this._events[key]
	  }
	  //都存在时，只解绑当前绑定事件的处理函数
	  if (key && listener) {
	    var listenerfn = this._events[key];
	    var index = Util.indexOf(listenerfn, listener);
	    (index > -1) && listenerfn.splice(index, 1);
	  }
	  return this
	},
	//异步执行的实现
	//Observe.queue([a, b],function(){//TODO})
	queue: function (queue, callback) {
	  var self = this;
	  var eventName = '', index = 0, data = [], task = null;
	  //+-!~()
	  (function () {
	    var callee = arguments.callee;
	    while ((task = queue.shift()) != undefined) {
	      eventName = 'queueEvent' + index++;
	      self.add(eventName, function (val) {
	        data.push(val);
	        callee()
	      })
	      task.call(self, function (val) {
	        val = val || null;
	        self.fire(eventName, val);
	      });
	    }
	    callback.call(null, data);
	  } ())
	}
};
module.exports = Observe;
