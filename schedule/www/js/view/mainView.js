var MainView = Backbone.View.extend({
	
	el:'main',
	
	initialize:function(){
		//main中的任务可以拖动到footer中
		$('#task-list,footer').sortable({
			placeholder:'task-placeholder',
			connectWith:'.list',
			start:function(){
				//console.log('开始拖动了');
				//改变图标
				$('#add-btn').removeClass('icon-plus-sign')
				.addClass('icon-trash')
				.css('color','red');				
			},
			stop:function(){
				$('#add-btn').addClass('icon-plus-sign')
				.removeClass('icon-trash')
				.css('color','#007fff');;
			},
			
			//顺序改变
			update:function(e,o){
				
				//防止li在ul外拖动也发生顺序变化
				if(!$(o.item.context).parent().is('ul')){
					return;
				}
				
				//console.log(arguments);
				//console.dir(o.item.context);表示移动的那个li
				
				//通过选择器判断li放到什么位置
				//console.log($(o.item.context).next().is('li'));
				
				//找到拖拽的li对应的input的id和model
				var currentliid = $(o.item.context).children('input').attr('id');
				var currentModel = this.collection.find(function(obj){
					return obj.id == currentliid;
				});
				if(!$(o.item.context).next('').is('li')){
					console.log('放到最后一个了');
					//找到前一个li对应的input的id
					var prevliid = $(o.item.context).prev('li').children('input').attr('id');
					var prevModel = this.collection.find(function(obj){
						return obj.id == prevliid;
					});
					//加10
					currentModel.set('order',prevModel.get('order')+10);
					currentModel.save();
					
				}else if(!$(o.item.context).prev().is('li')){
					console.log('放到第一个了');
					var nextliid = $(o.item.context).next('li').children('input').attr('id');
					var nextModel = this.collection.find(function(obj){
						return obj.id == nextliid;
					});
					currentModel.set('order',nextModel.get('order')-10);
					currentModel.save();
					
				}else{
					console.log('放到中间了');
					var prevliid = $(o.item.context).prev('li').children('input').attr('id');
					var prevModel = this.collection.find(function(obj){
						return obj.id == prevliid;
					});
					
					var nextliid = $(o.item.context).next('li').children('input').attr('id');
					var nextModel = this.collection.find(function(obj){
						return obj.id == nextliid;
					});
					var ord = (prevModel.get('order')+nextModel.get('order'))/2;
					currentModel.set('order',ord);
					currentModel.save();
				}
				
				//让集合中的models数组里的数据也进行排序，用的原生sort
				this.collection.models.sort(function(obj1,obj2){
					return obj1.get('order')-obj2.get('order');
				});
				
			}.bind(this)
			
		});
		
		$( "#task-list" ).disableSelection();
	},
	
	events:{
		'change #task-list li input':'completeStatusChange',
	},
	
	completeStatusChange:function(e){
		
		//找到点击的那个model任务，通过模板里的id
		var m = this.collection.find(function(obj){
			return obj.id == e.target.id;
		});
		
		//console.dir(m);
		
		if(e.target.checked){
			//$(e.target).next().children('img').attr('src','img/select.png');
			m.set('complete',true);
						
		}else{
			//$(e.target).next().children('img').attr('src','img/unselect.png');
			m.set('complete',false);
		}
		m.save();
		headerView.render();
		
		this.render();
	},
	
	render:function(){
		var htmlStr = template('list-tem',this.collection);		
		$('#task-list').html(htmlStr);
	}
	
});
