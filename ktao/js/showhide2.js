;(function($){
//动作方式
	var slient = {
		init:function($item){
			if($item.is(":hidden")){
				$item.data('status','hidden');
			}else{
				$item.data('status','shown');

			}
		},
		show:function($item){
			if($item.data('status') == 'shown') return;
			if($item.data('status') == 'show') return;
			$item.data('status','show').trigger('show');
			$item.show(1000);
			$item.trigger('shown').data('status','shown');
		},
		hide:function($item){
			if($item.data('status') == 'hidden') return;
			if($item.data('status') == 'hide') return;
			$item.data('status','hide').trigger('hide');
			$item.hide(1000);
			$item.trigger('hiden').data('status','hidden');
		}
	}
	var js = {
			fade:{
				init:function($item){
					js._init($item);	
				},
				show:function($item){
					js._show($item,'fadeIn')
				},
				hide:function($item){
					js._hide($item,'fadeOut')			
				}
			},
			slide:{
				init:function($item){
					// $item.removeClass('transtion')
					// if($item.is(":hidden")){
					// 	$item.data('status','hidden');
					// }else{
					// 	$item.data('status','shown');
					// }
					js._init($item);
				},
				show:function($item){

					if($item.data('status') == 'shown') return;
					if($item.data('status') == 'show') return;
					$item.data('status','show').trigger('show');
					$item.stop().slideDown(function(){
						$item.trigger('shown').data('status','shown')
					})
					// js._show($item,'slideDown')
				},
				hide:function($item){

					if($item.data('status') == 'hiden') return;
					if($item.data('status') == 'hide') return;
					$item.data('status','hide').trigger('hide');
					$item.stop().slideUp(function(){
						$item.trigger('hiden').data('status','hiden');
					})
					// js._show($item,'slideUp')			
				}
			},
			animate:{
				init:function($item){
					js._customInit($item,{
						width:0,
						borderLeftWidth:0,
						borderRightWidth:0,
						paddingLeft:0,
						paddingRight:0,	
						display:'block'						
					})
				},
				show:function($item){

					js._customShow($item);
				},
				hide:function($item){
					js._customHide($item,{
						width:0,
						borderLeftWidth:0,
						borderRightWidth:0,
						paddingLeft:0,
						paddingRight:0
					});
				}
			},
			fadeAnimate:{
				init:function($item){
					js._customInit($item,{
						width:0,
						borderLeftWidth:0,
						borderRightWidth:0,
						paddingLeft:0,
						paddingRight:0,
						opacity:0,	
						display:'block'						
					})
				},
				show:function($item){

					js._customShow($item);
				},
				hide:function($item){
					js._customHide($item,{
						width:0,
						borderLeftWidth:0,
						borderRightWidth:0,
						paddingLeft:0,
						opacity:0,
						paddingRight:0
					});
				}
			},
	}
	var $item = $('#box')
// 自定义事件
	$item.on('show shown hide hiden',function(ev){
		if(ev.type == 'show'){
			console.log('show...')
		}
		else if(ev.type == 'shown'){
			console.log('shown...')
		}
		else if(ev.type == 'hide'){
			console.log('hide...')
		}
		else if(ev.type == 'hiden'){
			console.log('hiden...')
		}
	})
// 抽取共通
	js._init = function($item,hiddenCb){
		$item.removeClass('transtion')
		if($item.is(":hidden")){
			$item.data('status','hidden');
			typeof hiddenCb == 'function' && hiddenCb();
		}else{
			$item.data('status','shown');
		}
	}
	js._show = function($item,mode){

		if($item.data('status') == 'shown') return;
		if($item.data('status') == 'show') return;
		$item.data('status','show').trigger('show');
		// $item.show(1000);
		// $item.trigger('shown').data('status','shown');
		$item.stop()[mode](function(){
			$item.trigger('shown').data('status','shown')
		})
	}
	js._hide = function($item,mode){

		if($item.data('status') == 'hiden') return;
		if($item.data('status') == 'hide') return;
		$item.data('status','hide').trigger('hide');
		// $item.hide(1000);
		// $item.trigger('hiden').data('status','hidden');
		$item.stop()[mode](function(){
			$item.trigger('hiden').data('status','hiden');
		})		
	}
	js._customInit = function($item,options){
	// 获取元素样式
	var style = {};

	for(var key in options ){
		style[key] = $item.css(key)
	};
	// 储存元素样式
		$item.data('style',style);
		js._init($item,function(){
			$item.css(options)
		});		
	}
	js._customShow =function($item){
		if($item.data('status') == 'shown') return;
		if($item.data('status') == 'show') return;
		$item.data('status','show').trigger('show');
		$item.stop().animate($item.data('style'),function(){
			$item.trigger('shown').data('status','shown')
		});
	}
	js._customHide = function($item,options){

		if($item.data('status') == 'hiden') return;
		if($item.data('status') == 'hide') return;
		$item.data('status','hide').trigger('hide');
		$item.stop().animate(options,function(){
			$item.trigger('hiden').data('status','hiden')
		});
	}
// 注册插件
	// 插件接口
	function getShowHide($item,options){
		// 默认slient
		var showHideFn = slient;

		// 传参options改变方式
		if(options.js){
			// 绑定传参后执行方式
			showHideFn = js[options.mode];
		}
		// 初始化,此时每种方式均有此方法
		showHideFn.init($item);
		// console.log(showHideFn)

		//返回动作方式对象
		return  {
			show:showHideFn.show,
			hide:showHideFn.hide
		}

	}
	// 默认样式
	var DEFAULTS = {
		js:true,
		mode:'fade'
	}

	$.fn.extend({
		showHide:function(options){
		 return this.each(function(){
				var $item = $(this)
				// 生成作用对象
				var showHideObj =$item.data('showHideObj')
				// 获取$item上绑定的showHideObj,若获取不到执行下方操作
				if(!showHideObj){//单例模式 
					options = $.extend({},DEFAULTS,options)
					var showHideObj = getShowHide($item,options);
					$item.data('showHideObj',showHideObj)
				}
				// 初始化后，执行绑定操作
				if(typeof showHideObj[options] == 'function'){
					showHideObj[options]($item)
				}


			})
		}
	})
})(jQuery)