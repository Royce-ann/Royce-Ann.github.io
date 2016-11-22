var app = angular.module('signUP',[]);

app.controller('ctrl',['$http','$scope',function($http,$scope){
	

	$scope.submit = function(){		
		var user = {
			account:$scope.myForm.account.$viewValue,
			psw:$scope.myForm.psw.$viewValue
		};
	
		$http.post('/signup',user)
		.success(function(data){			
			alert(data.msg);
			location.href = 'login.html';
		})
		.error(function(){
			//注册失败
		});
	}	
	
}]);

//自定义表单验证指令，用于判断两个输入的密码是否一致
app.directive("equalTo",[function(){
	return {
		restrict:"A",
		require:"ngModel",
		link:function($scope,$el,attr,mod){
			mod.$validators.equalTo = function(value){
				return value == $scope[attr.equalTo];
			}
		}
	}
}]);
