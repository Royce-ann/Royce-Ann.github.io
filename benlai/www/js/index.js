
//大图轮播
var left = $('.content_middle .btnLeft'); 
var right = $('.content_middle .btnRight'); 
var aSmall = $('.content_middle .table span');
var aLi = $('.content_middle ul li');
var iNow = 0;
// 左点击  
left.click(function() {
	iNow--;
	// 判断回流
	if(iNow < 0) {
		iNow = 4;
	}
	aLi.eq(iNow).siblings().stop().animate({
		opacity: 0
	}, 800);
	aLi.eq(iNow).stop().animate({
		opacity: 1
	}, 800);
	aSmall.eq(iNow).addClass('small_active').siblings().removeClass('small_active');
});
// 右点击切换
right.click(function() {
	iNow++;
	if(iNow > 4) {
		iNow = 0;
	}
	aLi.eq(iNow).siblings().stop().animate({
		opacity: 0
	}, 800);
	aLi.eq(iNow).stop().animate({
		opacity: 1
	}, 800);
	aSmall.eq(iNow).addClass('small_active').siblings().removeClass('small_active');

});
//手动切换
aSmall.mouseover(function() {
	var n = $(this).index();
	iNow = n;
	aLi.eq(iNow).siblings().stop().animate({
		opacity: 0
	}, 800);
	aLi.eq(iNow).stop().animate({
		opacity: 1
	}, 800);
	aSmall.eq(iNow).addClass('small_active').siblings().removeClass('small_active');
});
// 封装函数体
function move1() {
	aLi.eq(iNow).siblings().stop().animate({
		opacity: 0
	}, 800);
	aLi.eq(iNow).stop().animate({
		opacity: 1
	}, 800);
	aSmall.eq(iNow).addClass('small_active').siblings().removeClass('small_active');
}
// 定个定时器的初始值
function run2() {
	iNow++;
	if(iNow > 4) {
		iNow = 0;
	}
	move1();
}
// 定时器
timer = setInterval(run2, 2000);
//当鼠标划入，停止轮播图切换
$(".content_middle").hover(function() {
	clearInterval(timer);
	$('.content_middle .table').css('display','block');
}, function() {
	timer = setInterval(run2, 2000);
	$('.content_middle .table').css('display','none');
});


//主体部分
//新品
$('.handle-box-2').hide();
$('.handle').mouseover(function(){
	$('.handle').removeClass('active');
	$(this).addClass('active');
	$('.handle').parents('dl').find('.handle-box').hide();
	$(this).parent('dl').find('.handle-box').show();
});


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

app.controller('ggCtrl',['$scope','$http',function($scope,$http){
	var gg = $http.get('json/gg.json');
	gg.then(function(res){
		$scope.ggArr = res.data.ggSrc;	
	});
}])

app.controller('mainCtrl',['$scope','$http',function($scope,$http){
	var infor = $http.get('json/infor.json');
	infor.then(function(res){
		$scope.arrList1 = res.data.list1;	
		$scope.arrList2 = res.data.list2;	
		$scope.arrList3 = res.data.list3;
	});
	
	var infors = $http.get('json/infors.json');
	infors.then(function(res){
		$scope.arrMl1 = res.data.ml1;	
		$scope.arrMl2 = res.data.ml2;	
	});

	
}])

//右下角返回顶部按钮和隐藏
app.directive("backToTop",function(){  
  return {  
    restrict:"EA",  
    link:function($scope,$element,$attr){  
    	$element.hide();
      $(window).scroll(function(){             
        if ($(document).scrollTop()>500)        
            $element.show();
        else  
            $element.hide();  
      });  
      /*点击回到顶部*/  
      $element.click(function(){  
        $('html, body').animate({scrollTop: 0},500);  
      });  
    }  
  };  
})
//左侧栏隐藏和出现指令
app.directive("leftBackToTop",function(){  
  return {  
    restrict:"EA",  
    link:function($scope,$element,$attr){  
    	$element.hide();
      $(window).scroll(function(){             
        if ($(document).scrollTop()>850)        
            $element.show();
        else  
            $element.hide();  
      });         
    }  
  };  
})
//左侧栏点击返回顶部按钮
app.directive("goTop",function(){  
  return {  
    restrict:"EA",  
    link:function($scope,$element,$attr){     	  
      $element.click(function(){  
        $('html, body').animate({scrollTop: 0},500);  
      })  
    }  
  };  
})

//淡入淡出效果
app.directive('showCss',function(){	
	return {
		restrict:"EA",
		link:function($scope, $element, $attr){   
			$element.find('a .icon-shopping-cart').hide();
      $element.mouseover(function(){        	
        $element.css('margin','5px')
				.css('width','164px')
				.css('height','260px')
				.css('padding','10px')
				.css('border','none');  
				$element.find('a .icon-shopping-cart').show();
      });
      $element.mouseout(function(){
				$element.css('margin','0')
				.css('width','174px')
				.css('height','270px')
				.css('padding','20px')
				.css('border-right','1px solid #CCCCCC');
				$(this).find('a .icon-shopping-cart').hide();
			});
    } 
	}
})
//类
app.directive('showCon',function(){	
	return {
		restrict:"EA",
		link:function($scope,$element,$attr){   
			$element.find('a .icon-shopping-cart').hide();
      $element.mouseover(function(){        	
        $element.css('margin','5px')
				.css('width','170px')
				.css('height','267px')
				.css('padding','10px')
				.css('border','none');
				$element.find('.price')
				.css('margin','5px');
				$('.select-ct li:nth-of-type(1)')
				.css('border-left','1px solid #EEEEEE');
				$('.select-ct li:nth-of-type(6)')
				.css('border-left','1px solid #EEEEEE');
				$element.find('a .icon-shopping-cart').show();
      });
      $element.mouseout(function(){
				$element.css('margin','0')
				.css('width','180px')
				.css('height','277px')
				.css('padding','20px')
				.css('border-bottom','1px solid #EEEEEE')
				.css('border-right','1px solid #EEEEEE');
				$element.find('.price')
				.css('margin','10px');
				$element.find('a .icon-shopping-cart').hide();
			});
    } 
	}
})

//限时抢购
//倒计时
