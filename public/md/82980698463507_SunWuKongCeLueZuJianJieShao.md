## 孙悟空策略组件介绍

### 主要策略:

1、前置登陆；
2、电话验证；
3、身份认证；
4、发帖上限；

### 涉及业务调用方:

1、发布业务
2、个人中心业务
3、二手车发布业务

### 调用方式:

* 已经组件化的业务方才用引入模块的方式调用(post)
* 未采用组件化的业务方，我们采用将组件所用到的资源打包到一个js里面，调用方才用引入js的方式调用(个人中心)

### 调用方法:

发布将孙悟空四大策略封装在两个组件中：

* limitpost -- 前置登陆和电话验证
* paypost -- 身份认证和发帖上限

1、limitpost引入方法（前提是在初始化入口文件里引入limitpost组件）:

* 在初始化组件之前引入

```javascript
if(extMap.wkLimitPost==true) // 是否需要加入前置登陆和电话验证功能
Controller.limit = new limitpost();
```

* 在初始化组件完成后

```javascript
if(extMap.wkLimitPost==true) Controller.limit.initEventBind();
```

* 在submit组件里面新增一个code=5的处理函数

```javascript
if (data.code==5) {
	this.handleWkBeforeLogin(data);
}
```
同时为submit增加一个处理函数

```javascript
Submit.prototype.handleWkBeforeLogin = function(j){
        //电话号码需要验证
        if (j.bizCode=="phoneVerifyCode") {
            Controller.limit.initEventBind();
            Controller.limit.handleNeedYzm(j);
        }else if(j.bizCode=="userNeedBind"){
            Popwinfix.showPop( "","http://passport.58.com/swk/preLogin",680, 433, false);
            Popwinfix.fix().showLoad(false);
        }else if(j.bizCode=="checkCaptchaFail"){

        	var yzminstance = Controller.records.get("yzm");
	      	var rowContainer = yzminstance.rows.containerElem;
		  	var tipElem = rowContainer.find('.tip');
            validate.showTip(tipElem, "验证码输入错误", "error", 0);
        }else if(j.bizCode=="phoneAssociateTooManyAccounts"){

            var yzminstance = Controller.records.get("yzm");
			var phoneinstance = Controller.records.get("Phone");
			var rowContainer = phoneinstance.rows.containerElem;
			var tipElem = rowContainer.find('.tip');
            validate.showTip(tipElem, "关联账号过多", "error", 0);
        }
    };
```


2、paypost组件引入方法

* 在submit组件里面新增一个code=6的处理函数

```javascript
if (data.code==5) {
	this.handleWkBeforeLogin(data);
}
```

* 在submit组件里引入paypost组件，然后在submit里新增一个方法：

```javascript
Submit.prototype.handlePayPost = function(j){
    if (!(j.bizCode == "paymentPage")) return;
    paypost.init(j);
};
```
>⚠️：前置登陆和电话验证以及身份认证和发帖上限不能才开分别上线，只能一起上。
