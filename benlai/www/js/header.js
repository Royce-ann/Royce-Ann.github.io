var app = angular.module('myAPP',['ngCookies'])
//登录后跳转到主页，有个登录效果
app.controller('headerCtrl',['$scope','$http','$cookies',function($scope,$http,$cookies){
	$scope.notLogin = true;
	$scope.username = '';
	var token = $cookies.get('token');
	if(token){
		$scope.notLogin = false;
		$scope.username = $cookies.get('account');	
	}else{
		$scope.notLogin = true;
	}	
	
	//退出登录
	$scope.logOut = function(){
		$http.post('/logout')
		.success(function(res){
			//console.log(res)
			location.href = '/';
		});
	}	
}])

app.controller('guangCtrl',['$scope','$http',function($scope,$http){
	var g = $http.get('json/guang.json');
	g.then(function(res){
		$scope.gArr = res.data.guangSrc;	
		//console.dir($scope.gArr)
	});
	
	//广告轮播
	$(".imgList>a:gt(0)").hide();
	setInterval(function() {
	   $('.imgList>a:first')
	.fadeOut(1000)
	.next()
	.fadeIn(1000)
	.end()
	.appendTo('.imgList');
	}, 3000);

}])

//商品分类列表
app.controller('productCtrl',['$scope','$http',function($scope,$http){
	var p = $http.get('json/product.json');
	p.then(function(res){
		$scope.pArr = res.data.data;	
	});
}])



$('.tit_list').hide();
$('.tit_all').mouseover(function(){
	$('.tit_list').show();
	$('.tit_name').mouseover(function(){
		('')
	})
})
$('.tit_all').mouseout(function(){
	$('.tit_list').hide();
})

