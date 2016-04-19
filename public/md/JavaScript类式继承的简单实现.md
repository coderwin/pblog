# JavaScript类式继承的简单实现
## 1、首先看个大类库实现的类式继承:
在各大库的源码中都有对应的实现，比如jq里面$.extend()实现浅拷贝和深拷贝，prototype.js里面的Object.extend的实现，以及Ext.extend等，他们的实现各不相同，在这里简单的看看prototype.js的extend实现方案：

```javascript
//Prptotype库的extend,为Object类添加静态方法,
Object.extend=function(destination,source) {
    for(property in source) {
        destination[property]=source[property];
    }
    return destination;
}
//通过Object类,为每个对象,添加方法
Object.prototype.extend = function(object) {
	return Object.extend.apply(this, [this, object]);
}
```
分析：

		第一个函数Object.extend,可以简单的理解为对象复制.目标对象将拥有源对象的所有属性和方法
		第二个函数Object.prototype.extend,在prototype对象实例化对象中加上一个extend函数,
		其中精华语句Object.extend.apply(this, [this, object]); 将Object对象中的extend作为静态方法调用,
		第一个参数this,指向调用对象本身,第二个参数,为一个数组,为调用对象本身和传递进来的对象参数object(一般为方法,下面有例子)
		这个方法有一些不好的地方，比如污染Object对象的属性，比如不可以(new father()).extend({},{});不可以扩展多个对象
		

jquery的实现见jquery源码分析
## 2、简单的类式继承实现
```javascript
var Klass = function () {
  var _mixin = function (b, e) {
    for (var k in e) {
      e.hasOwnProperty(k) && (b[k] = e[k])
    }
  };
  // 模拟extend继承方式
  var _extend = function () {
    // 开关,为了在继承的时候不调用父类的init方法渲染，而把渲染放在子类
    this.TODOinit = false;
    //原型赋值
    var proto = new this;
    this.TODOinit = true;

    var args = [].slice.call(arguments);
    var len = args.length;

    // for循环是为了实现多个继承,例如Base.extend(events,com)
    for (var i = 0; i < len; i++) {
      _mixin(proto, args[i].prototype || args[i])
    }

    // 继承后返回的子类
    var SubKlass = function () {

      var isNew = this instanceof arguments.callee, isInit;
      if (!isNew) {
        throw new Error("please use new!");
      } else {
        isInit = (SubKlass.TODOinit && this.init)
        if (isInit) {
          this.init.apply(this, arguments)
          return this
        }
      }
    };
    // 继承静态方法
    _mixin(SubKlass, this);
    // 把混入之后的属性和方法赋值给子类完成继承
    SubKlass.prototype = proto;
    SubKlass.prototype.constructor = SubKlass;
    // 给子类页也添加继承方法,子类也可以继续继承
    SubKlass.extend = arguments.callee;
    return SubKlass
  };
  var Klass = function () { };
  Klass.extend = _extend;
  return Klass
} ();
```
### 2.1、主要API
1、Klass.extend
2、链式调用

```javascript
var Base = Klass.extend({
	init: function(option){
		this.initOptions()
		this.initEvents();
	},
	initOptions: function(){},
	initEvents: function(){}
});
var MyComponent = Base.extend({
	init: function(){};
	//...
});
```
3、实例化

```javascript
var MyInstance = new MyComponent(opts);
var MyInstance = MyComponent(opts);
```
## 3、项目应用
58M端发布页基于Klass－Base实现的类式继承实现组件化

## 4、Contact Me
weibo: [@imChenJian](http://weibo.com/2973985050)<br/>
zhihu: [@imChenJian](https://www.zhihu.com/people/imchenjian)<br/>
Email: [@imChenJian](chenjiancj2011@outlook.com)<br/>
weixin: chenjian3875<br/>
QQ: 792041894<br/>


