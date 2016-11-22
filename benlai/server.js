var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");

var app = express();
app.use(cookieParser());
app.use(express.static("www"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/shop");

var db = mongoose.connection;

db.on("open",function(){
	console.log("数据库连接成功");
});

db.on("error",function(){
	console.log("数据库连接失败");
});

var userSchema = mongoose.Schema({
	account:String,
	psw:String
});

var User = mongoose.model("users",userSchema);

//登录接口
app.post('/login',function(req,res){
	function makeToken(){
		var sourceStr = '1234567890qwertyuiopasdfghjklzxcvbnm';
		var token = '';
		for(var i=0;i<10;i++){
			var index = Math.floor(Math.random()*sourceStr.length);
			token += sourceStr[index];	
		}
		return token;
	}
			
	User.find({account:req.body.account,psw:req.body.psw})
	.count()
	.exec(function(err,num){		
		if(num>0){
			var token = makeToken();
			req.body.token = token;
			res.cookie('account',req.body.account)
			res.cookie("token",token);
			res.json({code:'success',err:0,msg:'登录成功',cookie:req.body.token});
		}else{
			res.json({code:'fail',msg:'账号或密码错误'})
		}
	});	
	
	
});

//注册接口
app.post('/signup',function(req,res){
	//console.dir(req.body);
	User.find({account:req.body.account})
	.count()
	.exec(function(err,num){
		if(num>0){
			res.json({err:1,msg:'账号已存在'});
		}else{
			var user = new User(req.body);
			user.save(function(){
				res.json({err:0,msg:'注册成功'});
			});
		}	
	});
	
});


//退出登录
app.post('/logout',function(req,res){
//	console.log(req.cookies)
	res.cookie('token','null',{maxAge:0}); 
	res.send('退出登录')
});





app.listen(8080,function(){
	console.log('服务器已开启');
});
