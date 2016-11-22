var app = angular.module('loginApp',['ngCookies']);

app.controller('loginCtrl',['$scope','$http','$cookies',function($scope,$http,$cookies){
	
	$scope.login = function(){
		$http.post('/login',$scope.denglu)
		.success(function(resData){
			if(resData.code == 'success'){
				alert(resData.msg);
				location.href = '/';
				var token = $cookies.get('token');
			}else{
				alert(resData.msg);
			}			
		})
		.error(function(){
			//请求失败
		});
	}
	
}]);
