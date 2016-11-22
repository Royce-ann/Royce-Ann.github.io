//根据一个日期对象，返回描述日期的字符串
function dateToString(date){
	var y = date.getFullYear();	
	var m = date.getMonth()+1;
	var d = date.getDate();	
	var w = date.getDay(); 
	
	return y+'年'+m+'月'+d+'日 '+ weekNumberToChinese(w);
}

//根据阿拉伯数字返回星期的汉字
function weekNumberToChinese(n){
	var wa = ['周日','周一','周二','周三','周四','周五','周六'];
	return wa[n];
}

//根据日期，返回日期的简易数字格式字符串
//yyyy-m-d
function dateToSimple(date){
	var y = date.getFullYear();	
	var m = date.getMonth()+1;
	var d = date.getDate();	
	
	return y+'-'+m+'-'+d;
}