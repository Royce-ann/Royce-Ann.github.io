
var taskSet = new TaskSet();

//将date字符串赋值给集合
taskSet.date = dateToSimple(new Date());

//记录是否显示已完成的布尔值(记录到collection中)
taskSet.showComplete = false;

var headerView;
var mainView;
var footerView;

taskSet.fetch()
.done(function(){
	headerView = new HeaderView({collection:taskSet});

	mainView = new MainView({collection:taskSet});

	footerView = new FooterView({collection:taskSet});
	
	
	//console.log(taskSet);
	mainView.render();
	
	
	$('#indicator').css('display','none');
	$('#main-box').css('display','block');
	
});