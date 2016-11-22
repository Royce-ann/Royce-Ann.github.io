var Task = Backbone.Model.extend({
	
	defaults:{
		content:'',
		date:'',
		complete:false,
		order:0
	},
	
	//验证数据
	validate:function(value){
		if(!value.content){
			return '内容不能为空';
		}
	},
	
	urlRoot:'/task',
	
//	parse:function(resData){
//		if(typeof resData.err == 'number'){
//			return resData.data;
//		}else{
//			return resData;
//		}
//	}
	
});