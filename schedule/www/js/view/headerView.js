var HeaderView = Backbone.View.extend({
	
	el:'header',
	
	initialize:function(){
		//把radio变为button风格
		$('#date-btn-list').buttonset();
		
		//初始化加载后显示被选中为今天
		$('.date-btn').prop('checked',false);
		$('#date-btn-2').prop('checked',true);
			
		//现在所显示的日期
		this.date = new Date();
		
		
		
		//创建一个临时日期
		var temp = new Date();
		//把日期的时间改为昨天
		temp.setDate(temp.getDate()-1);
		
		//星期列表
		for(var i = 1;i<=5;i++){
			var ss = dateToSimple(temp);
			//在input上添加自定义属性
			$('#date-btn-'+i).attr('btn-date',ss);
			//把星期几显示在label上
			var week = weekNumberToChinese(temp.getDay());
			
			$('[for=date-btn-'+i+']').text(i==2?'今天':week);
			
			temp.setDate(temp.getDate()+1);
		}
		
		//选择日期框
		$('#date-btn-6').datepicker();
		
		this.render();
	},
	
	render:function(){
		//改变h1内容
		var dateStr = dateToString(this.date);		
		$('header h1').text(dateStr);
		//-----------------------------------
		//改变未完成的数据
		//underscore的countBy方法(每一项的个数)
		var c = this.collection.countBy(function(obj){
			if(!obj.get('complete')){
				return 'incomplete';
			}
		});
		//console.log(c);
		
		var num = c.incomplete||0;
		$('#incomplete').text(num+'项未完成');
		//----------------------------------------
		//
		$('#show-complete')
		.text(this.collection.showComplete?'隐藏已完成':'显示已完成');
	},
	
	events:{
		'click .date-btn':'changeDate',
		'change #date-btn-6':'selectDate',
		'click #show-complete':'showCompleteBtnClick'
	},
	
	showCompleteBtnClick:function(e){
		this.collection.showComplete = !this.collection.showComplete;
		this.render();
		mainView.render();
	},
	
	//通过日历选择日期(前五个input的点击事件)
	changeDate:function(e){
		//console.log($(e.target).attr('btn-date'));
		var str = $(e.target).attr('btn-date');
		
		this.date = new Date(str);//转为时间对象
		
		this.collection.date = str;
		this.collection.fetch()
		.done(function(){
			mainView.render();
			headerView.render();
		});
		
		
	},
	
	//通过日历板选择日期(最后一个input的change事件)
	selectDate:function(e){
		
		//点击 选择日期  按钮
		if(e.target.value == 'on'){
			e.preventDefault();
			return;
		}
		
		//console.log(new Date(e.target.value));
		var d = new Date(e.target.value);
		
		this.date = d;
		
		var str = dateToSimple(d);
		//console.log(str);
		
		this.collection.date = str;
		this.collection.fetch()
		.done(function(){
			mainView.render();
		});
		
		this.render();
	},
	
	
	
});
