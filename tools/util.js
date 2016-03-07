module.exports = {
  // 存储数组的slice方法
  slice: Array.prototype.slice,
  // 存储对象的toString方法
  toSting: Object.prototype.toString,
  // 属性混合函数
  mixin: function(b, e) {
    for (var k in e) {
      e.hasOwnProperty(k) && (b[k] = e[k])
    }
    return b
  },
  // 查找数组的index
  indexOf: function(array, key) {
    if (array === null) return - 1;
    var length = array.length;
    for (var i = 0; i < length; i++) {
      if (array[i] === key) return i;
    }
    return - 1
  },
  type: function(val) {
    //undefined null
    if (val == null) {
      return String(val);
    } else {
      return this.toString.call(val).replace(/\[object |\]/g, '').toLowerCase();
    }
  },
  keys: function(obj) {
    var type = "keys";
    return this.objKeysVals(type, obj);
  },

  values: function(obj) {
    var type = "values";
    return this.objKeysVals(type, obj);
  },
  objLength: function(obj) {
    return this.keys(obj).length
  },
  objKeysVals: function(kv, obj) {
    var arr = [];
    if (this.type(obj) == 'object') {
      for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
          kv == "keys" && arr.push(k);
          kv == "values" && arr.push(obj[k]);
        }
      }
      return arr;
    } else if (this.type(obj) == 'array') return obj;
    else if (obj) return arr.push(obj);
  },
  delArrayKey: function(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) arr.splice(i, 1)
    }
  },

  log: function(title, sources) {
    console.log('%c============' + title + '============\n%c' + '' + sources, 'color:#009a61; font-size: 20px;', 'color:#000');
  }
};
