var TaskSet = Backbone.Collection.extend({
	
	model:Task,
	
	url:function(){
		return '/task/'+this.date;
	},
	
	parse:function(resData){
		return resData.data;
	}
});
