
"use strict";

/*汉字和拼音的映射资源*/
var source = require("./source.js");

/*属性mix*/
var _extend = function(dst, src){
    for(var property in src){
        dst[property] = src[property];
    }
    return dst;
};

/*constructor*/
var ToPinyin = function(config){
	this.default = {
		singleLine: false,
		spaceToLine: true,
		inline: false
	};
	this.config = _extend(this.default, config)
};

/*prototype*/
ToPinyin.prototype = {
	constructor: ToPinyin,
	/*设置转换的配置*/
	setConfig: function(config){
		this.config = _extend(this.config, config);
		return this;
	},
	/*驼峰式拼音*/
	toPinyinCamel: function(str){
		return this.toPinyin(str, true);
	},
	/*全拼*/
	toPinyinFull: function(str){
		return this.toPinyin(str, false);
	},
	/*转换方法*/
	toPinyin: function(str,camel){
		var length = str.length, pinyinCamel = "", curVal = "",
			curPinyinVal = null, reg = new RegExp('[a-zA-Z0-9\- ]');
        for (var i = 0; i < length; i++) {
            curVal = str.substr(i, 1);
            curPinyinVal = this._hashSearch(curVal, source);
            /*是否需要驼峰式*/
            if(camel&&camel==true&&curPinyinVal!==false) {
            	curPinyinVal = this._ucfirst(curPinyinVal);
            }
            if (reg.test(curVal)) {
                pinyinCamel += curVal;
            } else if (curPinyinVal !== false) {
            	if (this.config.inline&&pinyinCamel!="") {
            		pinyinCamel = pinyinCamel+"-"+curPinyinVal;
            	}else{
            		pinyinCamel += curPinyinVal;
            	}
            }
        }
        /*空格转横线*/
        if (this.config.spaceToLine) {
        	pinyinCamel = pinyinCamel.replace(/ /g, '-');
        }

        /*单横线*/
        if (this.config.singleLine) {
	        while (pinyinCamel.indexOf('--') > 0) {
	            pinyinCamel = pinyinCamel.replace('--', '-');
	        }
        }
        return pinyinCamel;
	},
	/*hash 搜索*/
	_hashSearch: function(str, objt){
		for (var key in objt) {
	        if (objt[key].indexOf(str) != -1) {
	        	return key
	        }
	    }
	    return false;
	},
	/*首字母大写*/
	_ucfirst: function(pinyin) {

	    if (pinyin.length == 0) return "";

        var first = pinyin.substr(0, 1).toUpperCase();
        var spare = pinyin.substr(1, pinyin.length);
       	return first + spare;
	}
};

module.exports = new ToPinyin();;
