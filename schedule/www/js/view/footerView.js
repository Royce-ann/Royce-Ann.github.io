var FooterView = Backbone.View.extend({
	
	el:'footer',
	
	initialize:function(){
		$('#commit-btn').button();
		
		$('#input-box').css('display','none');
		
		$(window).keydown(this.keyDown);
		
		//footer接收从main里拖动过来的li
		this.$el.sortable({
			
			//让删除按钮不能拖拽
			cancel:'span',
			
			receive:function(){
				//console.dir(arguments);
				//删掉拖动到footer的li
				var id = $('footer li input').attr('id');
				var o = this.collection.find(function(obj){
					return obj.get('id') == id;
				});
				
				o.destroy({wait:true})
				.done(function(){
					headerView.render();
				})
				.fail(function(){
					alert('删除失败');
				});
				
				$('footer li').remove();
				
			}.bind(this)
			
			
		});
		
		
	},
	
	events:{
		'click #add-btn':'addBtnClick',
		'click #commit-btn':'commitBtnClick',
	},
	
	//添加任务按钮点击事件
	addBtnClick:function(){		
		$('#add-btn').fadeOut(300,function(){
			$('#input-box').fadeIn(300,function(){
				$('#text-field').focus();
			});
		});		
	},
	
	//键盘按键ESC事件
	keyDown:function(e){
		//console.log(e.keyCode);
		if(e.keyCode==27){
			$('#input-box').fadeOut(300,function(){
				$('#add-btn').fadeIn(300);
			});	
		}
		if(e.keyCode==13){
			footerView.commitBtnClick();
		}
	},
	
	//提交按钮的点击事件
	commitBtnClick:function(){
		var param = {
			content:$('#text-field').val(),
			date:this.collection.date,
			complete:false
		};		
		//创建任务
		var t = this.collection.create(param,{
			wait:true,
			success:function(){
				$('#text-field').val('');
				//console.dir(this.collection);
				//集合中数据变化后再次render列表
				mainView.render();
				headerView.render();
			},
			error:function(){
				alert('异常');
			}
		});
		
		//验证
		if(t.validationError){
			alert(t.validationError);
		}
	},
	
});