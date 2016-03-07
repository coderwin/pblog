var Log = require("../tools/logs.js");
var TodoApp = require('../models/todoapp');
var Passport = require('../models/passport');
var Publish = require('../models/publish');
var Reply = require('../models/reply');
var Pinyin = require("../tools/pinyin.js");
var fs = require("fs");
var $ = require("jquery");
module.exports = {
	/*标签*/
	tags: function(req, res){

		var tag = req.params.id;
		var initialState = {};

		Publish.findByTag(tag, function(err, items){
		    initialState.postlists = items.reverse();
		    initialState.tag = true;
		    initialState.title = "58同城"
	    	res.render('index', { data: initialState });
		})
	},
	/*回复*/
	replyup: function(req, res){

	    var infoid = req.body.infoid;
	    var content = req.body.content;
	    var replyer = req.body.replyer;
	    var connect = req.body.connect;
	    
	    console.log(infoid)
		Reply.findByInfoId(infoid, function(err, replys){
			if (err) {console.log("reply error"+err)}
			console.log(replys.length);
			//回复数＋1
			var reply_countUpdate = { $set: {reply_count: ((replys.length||"0")+1) }}
			Publish.update({_id: infoid},reply_countUpdate, {}, function(err, ifo){
				if (err) {console.log(err)}
				console.log("reply_countUpdate success!!")
			})
		})

	    var reply = new Reply({
	    	infoid: infoid,
	    	content: content,
	    	connect: connect,
	    	replyer: replyer
	    });
	    reply.save(function(err, _reply){
	    	if (err) {console.log("add reply error"+err)}
	    	res.json({code: 0, msg: "reply success", reply: _reply});
	    })
	},
	/*详情页*/
	detailAPI: function(req, res){
		var id = req.params.id;
		var prevAndAfter = [];

		Publish.findById(id, function(err, info){
			if (err) {console.log(err)}

			/*push 上一条和下一条的infoid*/
			Publish.fetch(function(err,_items){
				console.log(_items.reverse()+"------------------------")
			Publish.findPrev(id, _items, function(err, previnfo){
			if (err) {console.log(err)}
			Publish.findAfter(id, _items, function(err, afterinfo){
			if (err) {console.log(err)}

			if (previnfo) prevAndAfter[0] = previnfo;
			if (afterinfo) prevAndAfter[1] = afterinfo;

			//浏览数＋1
			var visit_countUpdate = { $set: {visit_count: ((info.visit_count||"0")+1) }}
			Publish.update({_id: id},visit_countUpdate, {}, function(err, ifo){
				if (err) {console.log(err)}
				console.log("visit_countUpdate success!!")
			})

			/*push 信息的info详情*/
			var path = "public/"+info.filePath;
			var length = __dirname.length;
			var absolutePath = __dirname.substring(0,length-6) + path;
			fs.readFile(absolutePath, "utf-8", function(err,data){
				if (err) {console.log(err)}

				Reply.fetch(function(err, items){
					console.log(items)
				})
				/*push info评论*/
				Reply.findByInfoId(id, function(err, replys){
					if (err) {console.log("reply error"+err)}
					res.json({
						code:0, 
						data: data,
						reply_count:((info.reply_count||"0")), 
						visit_count:((info.visit_count||"0")), 
						replys: replys, 
						prevAndAfter:prevAndAfter
					})
				})
				
			})

			})
			})
			})
		})
	},
	/*所有文章api*/
	topics: function(req, res){
		Publish.fetch(function(err, items){
	  		if (err) {
		      	console.log(err);
		    }
		    console.log(items);
		    var initialState = {};
		    var postlists = [];
		    for (var i = 0; i < items.length; i++) {
		    	var list = {};
		    	list["_id"] = items[i]["_id"];
		    	list["title"] = items[i]["title"];
		    	list["content"] = items[i]["content"];
		    	list["filePath"] = items[i]["filePath"];
		      	postlists.push(list);
		    };
		    initialState.data = postlists.reverse();

	    	res.json(initialState);
	  	})
	},
	/*文章api*/
	topic: function(req, res){
		var path = "public/md/"+req.params.id;
		var length = __dirname.length;
		var absolutePath = __dirname.substring(0,length-6) + path;
		fs.readFile(absolutePath, "utf-8", function(err,data){
			if (err) {console.log(err)}
			res.json({code:0, data: data})
		})
	},
	/*详情页*//*前端路由暂时弃用*/
	detail: function(req, res){
		//var id = req.query.id;
		var initialState = {
			title: '58同城',
			id: req.params.id
		};
		res.render('detail', { data: initialState });
	},
	/*关于页*//*前端路由暂时弃用*/
	about: function(req, res){

		res.render('about');
	},
	/*登录页*//*前端路由暂时弃用*/
	login: function(req, res){
		console.log(req.cookies);
		if (req.cookies&&req.cookies.username&&req.cookies.password) {
			Passport.findByName(req.query.uname, function(err,userlist){
				if(err){
					//res.redirect('/login');
					console.log("err"+err)
				}
				if (userlist&&userlist.length>0) {
					//查询到了用户
					console.log("/")
					res.redirect('/');
				}else{
					//未查询到用户
					console.log("/login")
					res.redirect('/login');
				}
			})
		}else{
			res.render('login');
		}
	},
	/*首页*/
	index: function(req, res){
	  	var lists = [];
		var postlists = [];
		var initialState = {};
		Publish.remove({_id: "56d80023dec5b5e93e397e20"}, function(err, todolist){
			if (err) {
				Log("delListError",{"code":"-2","msg":"server error"});
			}else{
				Log("delListSuccess",{"code":"0","msg":"delete success"});
			}
		})
		Publish.remove({_id: "56d7ffffdec5b5e93e397e1f"}, function(err, todolist){
			if (err) {
				Log("delListError",{"code":"-2","msg":"server error"});
			}else{
				Log("delListSuccess",{"code":"0","msg":"delete success"});
			}
		})

		Publish.remove({_id: "56d5681ecd9860eb2327ec38"}, function(err, todolist){
			if (err) {
				Log("delListError",{"code":"-2","msg":"server error"});
			}else{
				Log("delListSuccess",{"code":"0","msg":"delete success"});
			}
		})

		Publish.remove({_id: "56d568ba134623f92353df94"}, function(err, todolist){
			if (err) {
				Log("delListError",{"code":"-2","msg":"server error"});
			}else{
				Log("delListSuccess",{"code":"0","msg":"delete success"});
			}
		})

		
		TodoApp.fetch(function(err, contents) {
		    if (err) {
		      	console.log(err);
		    }
		    //console.log(contents)
		    for (var i = 0; i < contents.length; i++) {
		    	var list = {};
		    	list["_id"] = contents[i]["_id"];
		    	list["content"] = contents[i]["content"];
		      	lists.push(list)
		    };
		    initialState.items = lists;

		    Publish.fetch(function(err, items){
		  		if (err) {
			      	console.log(err);
			    }
			    console.log(items)
			    /*for (var i = 0; i < items.length; i++) {
			    	var list = {};
			    	list["_id"] = items[i]["_id"];
			    	list["title"] = items[i]["title"];
			    	list["content"] = items[i]["content"];
			    	list["filePath"] = items[i]["filePath"];
			    	list["reply_count"] = items[i]["reply_count"];
			    	list["visit_count"] = items[i]["visit_count"];
			      	postlists.push(list);
			    };*/
			    initialState.postlists = items.reverse();

			    initialState.title = "58同城"
		    	res.render('index', { data: initialState });
		  	})
	  	})
	},
	// 测试首页/*前端路由暂时弃用*/
	h: function(req, res){
	  	var lists = [];
		var postlists = [];
		var initialState = {};
		// 数据删除
		Publish.remove({_id: "56c695bb4443d5e0469acf58"}, function(err, todolist){
			if (err) {
				Log("delListError",{"code":"-2","msg":"server error"});
			}else{
				Log("delListSuccess",{"code":"0","msg":"delete success"});
			}
		})
		TodoApp.fetch(function(err, contents) {
		    if (err) {
		      	console.log(err);
		    }
		    //console.log(contents)
		    for (var i = 0; i < contents.length; i++) {
		    	var list = {};
		    	list["_id"] = contents[i]["_id"];
		    	list["content"] = contents[i]["content"];
		      	lists.push(list)
		    };
		    initialState.items = lists;

		    Publish.fetch(function(err, items){
		  		if (err) {
			      	console.log(err);
			    }
			    //console.log(items)
			    for (var i = 0; i < items.length; i++) {
			    	var list = {};
			    	list["_id"] = items[i]["_id"];
			    	list["title"] = items[i]["title"];
			    	list["content"] = items[i]["content"];
			    	list["filePath"] = items[i]["filePath"];
			      	postlists.push(list);
			    };
			    initialState.postlists = postlists;

			    initialState.title = "58同城"
		    	res.render('home', { data: initialState });
		  	})
	  	})
	},
	// 列表页/*前端路由暂时弃用*/
	list: function(req, res){
		var lists = [];
		var postlists = [];
		var initialState = {};
		Publish.remove({_id: "56c695bb4443d5e0469acf58"}, function(err, todolist){
			if (err) {
				Log("delListError",{"code":"-2","msg":"server error"});
			}else{
				Log("delListSuccess",{"code":"0","msg":"delete success"});
			}
		});
		TodoApp.fetch(function(err, contents) {
		    if (err) {
		      	console.log(err);
		    }
		    //console.log(contents)
		    for (var i = 0; i < contents.length; i++) {
		    	var list = {};
		    	list["_id"] = contents[i]["_id"];
		    	list["content"] = contents[i]["content"];
		      	lists.push(list)
		    };
		    initialState.items = lists;

		    Publish.fetch(function(err, items){
		  		if (err) {
			      	console.log(err);
			    }
			    //console.log(items)
			    for (var i = 0; i < items.length; i++) {
			    	var list = {};
			    	list["_id"] = items[i]["_id"];
			    	list["title"] = items[i]["title"];
			    	list["content"] = items[i]["content"];
			    	list["filePath"] = items[i]["filePath"];
			      	postlists.push(list);
			    };
			    initialState.postlists = postlists;

			    initialState.title = "58同城"
		    	res.render('list', { data: initialState });
		  	})
	  	})
	},
	// 发布页面/*前端路由暂时弃用*/
	post: function(req, res){

    	res.render('post');
	},
	// tododemo
	todo: function(req, res){
		TodoApp.fetch(function(err, contents) {
		    if (err) {
		      	console.log(err);
		    }
		    //console.log(contents)
		    var lists = [];
		    for (var i = 0; i < contents.length; i++) {
		    	var list = {};
		    	list["_id"] = contents[i]["_id"];
		    	list["content"] = contents[i]["content"];
		      	lists.push(list)
		    };

		    var postlists = [];

		    var initialState = {
		    	lists: postlists,
		      	items: lists,
		      	title: '58同城'
		    };
		    res.render('todoapp', { data: initialState });
	  	});
	},
	/*新增ajax*///tododemo
	add: function(req, res) {
	    console.log("add")
	    var content = req.body.content;

	    var todo = new TodoApp({
	      content: content
	    });

	    todo.save(function(err, content) {
	      	if (err) {
	        	var err = {'code':'-1','msg':'mongodb error','id':content._id};

	        	Log("addListError",err);
	        	res.status(500).send(err);
	      	}else{
	      		var success = {'code':'0','msg':'todolist save success','id':content._id};
	      		Log("addListSuccess",success);
	      		res.status(200).send(success);
	      	}
	    });
	},
	/*删除ajax*//*tododemo*/
	del: function(req, res){
		console.log("del");
		var dbid = req.query.dbid;
		if(!dbid) {
			Log("delListError4norParm",{"code":"-1","msg":"not dbid"});
			res.json({"code":"-1","msg":"not dbid"});
		}
		TodoApp.remove({_id: dbid}, function(err, todolist){
			if (err) {
				Log("delListError",{"code":"-2","msg":"server error"});
				res.json({"code":"-2","msg":"server error"});
			}else{
				Log("delListSuccess",{"code":"0","msg":"delete success", "id": dbid});
				res.json({"code":"0","msg":"delete success", "id": dbid})
			}
		})
	},
	/*login ajax*/
	userlogin: function(req,res){
		console.log("login");
		console.log(req.query.uname);
		//console.log(Passport)
		//res.json({"code":"0","msg":req.query});
		Passport.findByName(req.query.uname, function(err,userlist){
			if(err) console.log("err"+err)
			if (userlist&&userlist.length>0) {
				//查询到了用户
				if(userlist[0]["password"] == req.query.pword){
					res.cookie('username', req.query.uname, { expires: new Date(Date.now() + 900000)/*, httpOnly: true */});
					res.cookie('password', req.query.pword, { expires: new Date(Date.now() + 900000)/*, httpOnly: true */});
					res.json({"code":"0","msg":"login success", "name": userlist[0]["name"]});
					// res.redirect('/');
				}else{
					res.json({"code":"-1","msg":"login fail, 密码不正确", "name": userlist[0]["name"]})
					// res.redirect('/login');
				}
				
			}else{
				//未查询到用户
				if (req.query.uname=="admain"&&req.query.pword=="aaa111") {
					res.cookie('username', req.query.uname, { expires: new Date(Date.now() + 900000)/*, httpOnly: true */});
					res.cookie('password', req.query.pword, { expires: new Date(Date.now() + 900000)/*, httpOnly: true */});
					res.json({"code":"0","msg":"login success", "name": "admain"});
				}else{
					res.status(200).send({code:"-1",msg:"不让你发布"})
				}
				/*注册入口 暂时封存*/
				/*var user = new Passport({
			      	name: req.query.uname,
			      	password: req.query.pword,
			    });

			    user.save(function(err, user) {
			      	if (err) {
			        	var err = {'code':'-1','msg':'mongodb error','id':user._id};

			        	Log("addListError",err);
			        	res.status(500).send(err);
			      	}else{
			      		var success = {'code':'0','msg':'user save success','id':user._id};
			      		Log("addListSuccess",success);
			      		res.cookie('username', req.query.uname, { expires: new Date(Date.now() + 900000), httpOnly: true });
						res.cookie('password', req.query.pword, { expires: new Date(Date.now() + 900000), httpOnly: true });
			      		res.status(200).send(success);
			      		
			      	}
			    });*/
			}
		})
	},
	/*退出ajax*/
	loginout: function(req, res){
		console.log(req.cookies)
		if (req.cookies&&req.cookies.username&&req.cookies.password) {
			res.clearCookie("username");
			res.clearCookie("password");
			res.json({code:"0",msg:"loginout success!"});
		}else{
			res.json({code:"1",msg:"not login"});
		}
	},
	/*发布ajax*/
	publish: function(req, res){
		var title = req.body.title;
		var content = req.body.title;
		var fileVal = req.body.fileVal;
		var tag = req.body.tag || "javascript"
		console.log(req.body);
		
	 	console.log("publish")
	    var content = req.body.content;

	    var publish = new Publish({
	    	title: title,
	      	content: content,
	      	filePath: fileVal,
	      	tag: tag
	    });

	    publish.save(function(err, item) {
	      	if (err) {
	        	var err = {'code':'-1','msg':'mongodb error','id':item._id};

	        	Log("addListError",err);
	        	res.status(500).send(err);
	      	}else{
	      		var success = {'code':'0','msg':'todolist save success','id':item._id};
	      		Log("addListSuccess",success);
	      		res.status(200).send(success);
	      	}
	    });
	},
	// upload ajax
	upload: function(req, res){
		//接收前台POST过来的base64
		var imgData = req.body.upfile;
		console.log(req.body.filename);
		var filename = req.body.filename;
		if (filename.split(".")[0]=="image") {
			filename = filename.split(".")[0]+Math.random()+"."+filename.split(".")[1];
		};
		var suffix = filename.split(".").pop();
		if (suffix=="png"||suffix=="jpg"||suffix=="jpeg") {
			suffix = "img";
			//过滤data:URL
			var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
			var dataBuffer = new Buffer(base64Data, 'base64');
		}else{
			var dataBuffer = imgData;
		}

		console.log(imgData);
		console.log(typeof imgData);

		var _file = filename.split(".")[0];
		/*hash*/
		var hs = (Math.random()).toString().split(".")[1]+"_" ;
		var mixed = hs+Pinyin.getFullChars(_file);


		var path = "/public/";
		var length = __dirname.length;
		var absolutePath = __dirname.substring(0,length-6) + path;

		fs.writeFile(absolutePath+suffix+"/"+hs+filename, dataBuffer, function(err) {
			if(err){
			  res.send(err);
			}else{
			  	//res.send("保存成功！");
			  	//res.json({"code":"0","data":"/"+suffix+"/"+filename,"msg":"upload success"});
			  	/*写两遍文件 保存一次源文件名*/
			  	fs.writeFile(absolutePath+suffix+"/"+mixed+"."+suffix, dataBuffer, function(err) {
					if(err){
					  res.send(err);
					}else{
					  //res.send("保存成功！");
					  res.json({"code":"0","data":"/"+suffix+"/"+mixed+"."+suffix,"msg":"upload success"});
					}
				});
			}
		});
	}
};