var $ = require("jquery");
var Toast = function(){};

Toast.prototype = {
	constructor: Toast,
	init: function(msg, time, callback){
		var that = this;
		if ($(".mainshadow").length) {
			return;
		}
		this.toastDom = $('<div class="mainshadow">' + 
			'<div class="mainSpinner">'  + 
				'<p class="loading">' + msg + '</p>' + 
			'</div>' + 
		'</div>');
		this.toastDom.appendTo('body').on('touchmove',function(event) {
		  event.preventDefault();
		});
		setTimeout(function(){
			that.hide();
			callback&&callback.call(that);
		},time||1000)
	},
	hide: function(){
		this.toastDom.remove();
	}
}

module.exports = new Toast;