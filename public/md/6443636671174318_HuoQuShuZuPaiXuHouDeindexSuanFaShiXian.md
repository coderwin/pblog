# 获取数组排序后的index算法实现
## 需求：
>一个数组var arr = [4,7,2,9],排序后的新数组var newArr = [2,4,7,9]或者[9,7,4,2]

>我们要得到的是排序后元数组的每一项在新数组中的位置所构成的数组：[2,4,7,9]对应[1,2,0,3]/[9,7,4,2]对应[2,1,3,0]

## 实现
方案一

```javascript
var afterSortIndex = function (arr) {
    var orderLength = arr.length;
    var temp, tp;
    var c = [];
    for(var l = 0; l < orderLength; l++) {
        c[l] = l;
    }
    for(var u = 0; u < orderLength; u++) {
        for (var v = 0; v < orderLength-u-1; v++){
            if (this[v] > this[v+1]) { 
                temp = this[v];
                this[v] = this[v+1];
                this[v+1] = temp;
                tp = c[v];
                c[v] = c[v+1];
                c[v+1] = tp;
            }
        }
    }
    return c;
}
var arr = [4,7,2,9];
console.log(afterSortIndex(arr));
```

方案二

```javascript
var afterSortIndex = function(arr){
	var index = [];
	var newArr = [];
	
	for (var i = 0, n = arr.length; i < n; ++i) {
	    newArr.push({
	        data: arr[i],
	        index: i
	    })
	}
	
	newArr.sort(function (a, b) {
	    return a.data - b.data;
	})
	
	for (var i = 0, n = newArr.length; i < n; ++i) {
	    index.push(newArr[i].index);
	}
	return index
};

var a = [4,7,2,9];
console.log(afterSortIndex(a));
```

