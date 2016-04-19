# ajax中的setRequestHeader设置请求头
## 1、问题引发点:

前不久发现一个问题: 前端并没有设置请求头信息里面的Accept-Encoding:gzip...但是在请求头中可以明显的看到Accept-Encoding:gzip, deflate, sdch,并且我尝试修改这个请求头，发现 不 生 效；

## 2、关于setRequestHeader
XMLHttpRequest对象提供了一个设置请求头的方法:setRequestHeader，对应的jQuery可以再beforeSend回调里面设置请求头：

```javascript
$.ajax({
    type: "GET",
    url: "test.php",
    success: function(data) {
        console.log(data);
    },
    beforeSend: function(xhr) {
        xhr.setRequestHeader("User-Agent", "headertest");
    }
});
```
## 3、问题解决
后来看W3C标准文档发现，这个请求头不是什么都可以设置的，标准里面明确规定了以下请求头信息是浏览器控制，开发者不允许设置这些请求头
>Terminate these steps if header is a case-insensitive match for one of the following headers:
>
Accept-Charset
Accept-Encoding
Access-Control-Request-Headers
Access-Control-Request-Method
Connection
Content-Length
Cookie
Cookie2
Date
DNT
Expect
Host
Keep-Alive
Origin
Referer
TE
Trailer
Transfer-Encoding
Upgrade
User-Agent
Via

>… or if the start of header is a case-insensitive match for Proxy- or Sec- (including when header is just Proxy- or Sec-).

>The above headers are controlled by the user agent to let it control those aspects of transport. This guarantees data integrity to some extent. Header names starting with Sec- are not allowed to be set to allow new headers to be minted that are guaranteed not to come fromXMLHttpRequest.

## 4、例子:
testAE.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>test</title>
</head>
<script type="text/javascript" src="./jquery.1.8.1.min.js"></script>
<body>
<script type="text/javascript">
$.ajax({
    type: "GET",
    url: "./testAE.php",
    success: function(data) {
        $("body").append(data);
    },
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Accept-Encoding", "testAE");
    }
});
</script>
</body>
</html>
```
testAE.php

```php
<?php
	/*回传ACCEPT_ENCODING*/
	echo $_SERVER['HTTP_ACCEPT_ENCODING'];
?>
```
chrome

![ae](http://images2015.cnblogs.com/blog/546511/201601/546511-20160125141712801-1013443463.png)
ie
![ae](http://images2015.cnblogs.com/blog/546511/201601/546511-20160125142001332-531333232.png)
控制台
![ae](http://images2015.cnblogs.com/blog/546511/201601/546511-20160125142148895-1218488920.png)

可以看到jQuery也会提示你这样设置是不安全的。

在mozila官方论坛里面也有相应的讨论：[Ajax setRequestHeader](https://support.mozilla.org/hi-IN/questions/769409);




