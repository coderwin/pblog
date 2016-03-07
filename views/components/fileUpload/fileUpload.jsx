var React = require("react");
var $ = require("jquery");
var Toast = require("../toast/toast.js")

var EXIF = require("./exif.js");
var BinaryFile = require("./binaryFile.js");

var FileUpload = React.createClass({
	render: function(){

		return (
			<form method="post" action="/upload" encType="multipart/form-data">
			    <input type="file" name="upfile" className="upfile" ref="upfile" multiple/>
			    <input style={{display:"none"}} type="submit" className="upload" onClick={this.fileUpload} value="upload" />
			    <div ref="imgwrap"></div>
			</form>
		)
	},
	fileUpload: function(){

	},
	componentDidMount: function(){
		var that = this;
		$(this.refs.upfile).on('change', function(event) {
			event.preventDefault();
			var _tar = this.files ? this.files : null;
            if(!_tar){
                return false;
            }
            //本地判断上传文件是否复合要求
            var rReg = /\.(jpg)|(jpeg)|(gif)|(png)$/i;
            var maxSize = 20*1024*1024;
            var err = '';
            var file = _tar[0];
            if(file&&file.size > maxSize){
                err = "图片超过尺寸限制！";
            }
            /*else if(!rReg.test(file.name)){
                err = "请上传 jpg/jpeg/gif/png格式的图片！";
            }*/

            if(err){
                alert(err)
                return false;
            }
             /*这里获取上传之前的开始压缩时间戳*/

            var beforeZipSize = file.size;

            that.zipImg({
                files: _tar,
                scale: 1,
                callback: function(tar){
                    if(tar.constructor != Array){
                        tar = [tar];
                    }
                    //触发上传函数
                    that.submit(tar);
                }
            });
		});
	},
	zipImg: function(cfg){
		var _this = this;
     	var options = cfg;
     	var rReg = /\.(jpg)|(jpeg)|(gif)|(png)$/i;
        [].forEach.call(options.files, function(v, k){
        	console.log(v);
        	_this.curUploadFileName = v.name;
            var fr = new FileReader();

            if(rReg.test(v.name)){
                fr.readAsBinaryString(v);
            }else{
                fr.readAsText(v);
            }
            fr.onload= function(e) {
            	if (rReg.test(v.name)) {

	                var oExif = EXIF.readFromBinaryFile(new BinaryFile(e.target.result)) || {};
	                var $img = document.createElement('img');
	                $img.onload = function(){
	                    _this.fixDirect().fix($img, oExif, options.callback,options.scale);
	                };
	                if(typeof(window.URL) != 'undefined'){
	                    $img.src = window.URL.createObjectURL(v);
	                }else{
	                    //$img.src = e.target.result;
	                    $img.src = window.webkitURL.createObjectURL(v);
	                }
            	}else{
            		_this.submit(e.target.result);
            	}
            };
            //fr.readAsDataURL(v);
        });
	},
	//调整图片方向
    fixDirect: function(){
        var r = {};
        r.fix = function(img, a, callback,scale) {
            var n = img.naturalHeight,
                i = img.naturalWidth,
                c = 102410241024,
                o = document.createElement("canvas"),
                s = o.getContext("2d");
            a = a || {};
            //o.width = o.height = c;
            //debugger;
            if(n > c || i > c){
                o.width = o.height = c;
            }else{
                o.width = i;
                o.height = n;
            }
            a.Orientation = a.Orientation || 1;
            r.detectSubSampling(img) && (i /= 2, n /= 2);
            var d, h;
            i > n ? (d = c, h = Math.ceil(n / i * c)) : (h = c, d = Math.ceil(i / n * c));
            // var g = c / 2,
            var g = Math.max(o.width,o.height)/2,
                l = document.createElement("canvas");
            if(n > c || i > c){
                l.width = g, l.height = g;
            }else{
                l.width = i;
                l.height = n;
                d = i;
                h =n;
            }
            //l.width = g, l.height = g;
            var m = l.getContext("2d"), u = r.detect(img, n) || 1;
            s.save();
            r.transformCoordinate(o, d, h, a.Orientation);
            var isUC = navigator.userAgent.match(/UCBrowser[\/]?([\d.]+)/i);
            if (isUC && $.os.android){
                s.drawImage(img, 0, 0, d, h);
            }else{
                for (var f = g * d / i, w = g * h / n / u, I = 0, b = 0; n > I; ) {
                    for (var x = 0, C = 0; i > x; )
                        m.clearRect(0, 0, g, g), m.drawImage(img, -x, -I), s.drawImage(l, 0, 0, g, g, C, b, f, w), x += g, C += f;
                    I += g, b += w
                }
            }
            s.restore();
            a.Orientation = 1;
            img = document.createElement("img");
            img.onload = function(){
                a.PixelXDimension = img.width;
                a.PixelYDimension = img.height;
                //e(img, a);
            };

            callback && callback(o.toDataURL("image/jpeg", scale).substring(22));//压缩图片
        };
        r.detect = function(img, a) {
            var e = document.createElement("canvas");
            e.width = 1;
            e.height = a;
            var r = e.getContext("2d");
            r.drawImage(img, 0, 0);
            for(var n = r.getImageData(0, 0, 1, a).data, i = 0, c = a, o = a; o > i; ) {
                var s = n[4 * (o - 1) + 3];
                0 === s ? c = o : i = o, o = c + i >> 1
            }
            var d = o / a;
            return 0 === d ? 1 : d
        };
        r.detectSubSampling = function(img) {
            var a = img.naturalWidth, e = img.naturalHeight;
            if (a * e > 1048576) {
                var r = document.createElement("canvas");
                r.width = r.height = 1;
                var n = r.getContext("2d");
                return n.drawImage(img, -a + 1, 0), 0 === n.getImageData(0, 0, 1, 1).data[3]
            }
            return !1;
        };
        r.transformCoordinate = function(img, a, e, r) {
            switch (r) {
                case 5:
                case 6:
                case 7:
                case 8:
                    img.width = e, img.height = a;
                    break;
                default:
                    img.width = a, img.height = e
            }
            var n = img.getContext("2d");
            switch (r) {
                case 2:
                    n.translate(a, 0), n.scale(-1, 1);
                    break;
                case 3:
                    n.translate(a, e), n.rotate(Math.PI);
                    break;
                case 4:
                    n.translate(0, e), n.scale(1, -1);
                    break;
                case 5:
                    n.rotate(.5 * Math.PI), n.scale(1, -1);
                    break;
                case 6:
                    n.rotate(.5 * Math.PI), n.translate(0, -e);
                    break;
                case 7:
                    n.rotate(.5 * Math.PI), n.translate(a, -e), n.scale(-1, 1);
                    break;
                case 8:
                    n.rotate(-.5 * Math.PI), n.translate(-a, 0)
            }
        };
        return r;
    },
	submit: function(files){
		var fileUploadCallback = this.props.fileUploadCallback;
		var _this = this;
		if ($.isArray(files)) {
			var file = files[0];
		}else{
			var file = files
		}
        
     	var paramObj ={'filename':this.curUploadFileName};
        paramObj["upfile"] = file;
        if(file == ''){
            alert('请升级浏览器或选择其他浏览器');
        }else{

            $.ajax({
                url: "/upload"+'?codetype=base64&random='+Math.random(),
                type: 'POST',
                data: paramObj,
                success: function (res) {
                    console.log(res);
                    /*var img = $("<img style='width:100px;height:100px' src="+res.img+">");
                    $(_this.refs.imgwrap).append(img);*/
                    Toast.init("上传成功");
                    fileUploadCallback(res.data);
                }
            });
        }
    }
});

module.exports = FileUpload;