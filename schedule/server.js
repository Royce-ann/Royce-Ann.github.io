var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static('www'));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/richeng')
mongoose.connection
.on('open',function(){
	console.log('数据库连接成功');
})
.on('error',function(){
	console.log('数据库连接失败');
});

var taskSchema = mongoose.Schema({
	content:String,
	date:String,
	complete:Boolean,
	order:Number
});

var Task = mongoose.model('tasks',taskSchema);

//查找所有任务接口
app.get('/task/:date',function(req,res){
	//查，并且按升序排序
	Task.find(req.params)
	.sort({order:1})
	.exec(function(err,data){
		var arr = [];
		data.forEach(function(obj){
			var o = {
				content:obj.content,
				date:obj.date,
				complete:obj.complete,
				id:obj._id,
				order:obj.order
			};
			arr.push(o);
		});		
		res.json({err:0,data:arr});
	});
	
});

//提交任务接口
app.post('/task',function(req,res){
	
	//查出某天的任务，找到最大order的那个任务的order
	Task.find({date:req.body.date})
	.sort({order:-1})
	.limit(1)
	.exec(function(err,data){
		//获取order+10
		req.body.order = data[0]?data[0].order:0;
		req.body.order+=10;
		//增
		var t = new Task(req.body);
		t.save(function(err,data){
			res.json({id:data._id,order:req.body.order});
		});	
	});
	
});

//修改任务状态上传接口
app.put('/task/:id',function(req,res){
	
	Task.update({_id:req.params.id},{
		complete:req.body.complete,
		order:req.body.order
	})
	.exec(function(err){
		res.json({});
	});
	
});

app.delete('/task/:id',function(req,res){
	
	Task.remove({_id:req.params.id})
	.exec(function(err){
		res.json({});
	})
});


app.listen(8080,function(){
	console.log('服务器已开启');
});
