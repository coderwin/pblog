# setTimeout和setImmediate以及process.nextTick的区别
>在javascript中我们了解到了setTimeout和setInterVal函数事件队列（任务队列）的相关知识，除了setTimeout和setInterval这两个方法外，Node.js还提供了另外两个与"任务队列"有关的方法：process.nextTick和setImmediate。它们可以帮助我们加深对"任务队列"的理解。

## 1 setTimeout()

首先我们看看setTimeout（setInterVal和setTimeout函数区别只是执行次数）函数，需要注意的是，setTimeout()只是将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，回调函数一定会在setTimeout()指定的时间执行。

```javascript
setTimeout(function(){console.log('0')},0);//意思是回调函数加入事件队列的队尾，主线程和事件队列的函数执行完成之后立即执行定时器的回调函数，如果定时器的定时是相同的，就按定时器回调函数的先后顺序来执行。
console.log(1);
setTimeout(function(){console.log(2);},1000);
setTimeout(function(){console.log(4);},1000);
console.log(3);
//1 3 0 2 4
```

## 2 setImmediate()

setImmediate()是将事件插入到事件队列尾部，主线程和事件队列的函数执行完成之后立即执行setImmediate指定的回调函数，和setTimeout(fn,0)的效果差不多，但是当他们同时在同一个事件循环中时，执行顺序是不定的。另外setTimeout和setImmediate也有一定的区别（还在探索...），在实际工作中我们其实她们的区别貌似不明显，请高手指出感激不尽

```javascript
console.log('1');

setImmediate(function () {
    console.log('2');
});

setTimeout(function () {
   console.log('3');
},0);

process.nextTick(function () {
    console.log('4');
});

//1 4 2 3也可能是1 4 3 2
```

## 3 process.nextTick()
process.nextTick()方法可以在当前"执行栈"的尾部-->下一次Event Loop（主线程读取"任务队列"）之前-->触发process指定的回调函数。也就是说，它指定的任务总是发生在所有异步任务之前，当前主线程的末尾。（nextTick虽然也会异步执行，但是不会给其他io事件执行的任何机会）

```javascript
process.nextTick(function A() {
  console.log(1);
  process.nextTick(function B(){console.log(2);});
});

setTimeout(function C() {
  console.log(3');
}, 0)
// 1
// 2
// 3

//这样也一样
setTimeout(function C() {
    console.log(3');
}, 0)
process.nextTick(function A() {
    console.log(1);
    process.nextTick(function B(){console.log(2);});
});
// 1
// 2
// 3

// 这样还是一样
setTimeout(function C() {
    console.log(3');
}, 0)
process.nextTick(function A() {
    process.nextTick(function B(){console.log(2);});
    console.log(1);
});
// 1
// 2
// 3
```
最后process.maxTickDepth()的缺省值是1000，如果超过会报exceed callback stack。官方认为在递归中用process.nextTick会造成饥饿event loop，因为nextTick没有给其他异步事件执行的机会，递归中推荐用setImmediate

```javascript
foo = function(bar) {
    console.log(bar);
    return process.nextTick(function() {
                return f(bar + 1);
    });
};
setImmediate(function () {
      console.log('1001');
});
foo(1);//注意这样不会输出1001，当递归执行到1000次是就会报错exceed callback stack，
/*
foo = function(bar) {
    console.log(bar);
　　 if(bar>1000){
      return;
    }
    return process.nextTick(function() {
                return f(bar + 1);
    });
};
setImmediate(function () {
      console.log('1001');
});
foo(1);
*/
```


