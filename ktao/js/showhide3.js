;(function($){
	function init($item,hiddenCb){
		if($item.is(":hidden")){
			$item.data('status','hidden');
			typeof hiddenCb == 'function' && hiddenCb();
		}else{
			$item.data('status','shown');
		}
	}
	function show($item,cb){
		if($item.data('status') == 'shown') return;
		if($item.data('status') == 'show') return;
		$item.data('status','show').trigger('show');
		cb();
	}
	function hide($item,cb){
		if($item.data('status') == 'hidden') return;
		if($item.data('status') == 'hide') return;
		$item.data('status','hide').trigger('hide');
		cb();
	}


	var slient = {
		init:init,
		show:function($item){
			show($item,function(){
				$item.show();
				$item.trigger('shown').data('status','shown');
			})
		},

		hide:function($item){
			hide($item,function(){
				$item.hide();
				$item.trigger('hidden').data('status','hidden');			
			})
		}

	}
	var js = {
		fade:{
			init:function($item){
				js._init($item);
			},
			show:function($item){
				js._show($item,'fadeIn');
			},
			hide:function($item){
				js._hide($item,'fadeOut');
			}		
		},
		slideDownUp:{
			init:function($item){
				js._init($item);
			},
			show:function($item){
				js._show($item,'slideDown');
			},
			hide:function($item){
				js._hide($item,'slideUp');
			}			
		},
		slideLeftRight:{
			init:function($item){
				js._customInit($item,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0				
				});		
			},
			show:function($item){
				js._customShow($item)
			},
			hide:function($item){
				js._customHide($item,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0				
				});
			}
		},
		fadeSlideLeftRight:{
			init:function($item){
				js._customInit($item,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0,
					opacity:0				
				});		
			},
			show:function($item){
				js._customShow($item)
			},
			hide:function($item){
				js._customHide($item,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0,
					opacity:0				
				});
			}
		},	
	}
	js._init = function($item){
		$item.removeClass('transition');
		init($item);	
	}
	js._show = function($item,mode){
		show($item,function(){
			$item.stop()
			[mode](function(){
				$item.trigger('shown').data('status','shown');
			});				
		})	
	}
	js._hide = function($item,mode){
		hide($item,function(){
			$item.stop()
			[mode](function(){
				$item.trigger('hidden').data('status','hidden');
			});				
		})		
	}
	js._customInit = function($item,options){
		$item.removeClass('transition');
		//1.保存原始值
		var styles = {};

		for(var key in options){
			styles[key] = $item.css(key)
		}

		$item.data('styles',styles);

		//2.如果是原本是隐藏的话,把水平方向上的值改为0	
		init($item,function(){
			$item.css(options)
		});		
	}
	js._customShow = function($item){
		show($item,function(){
			$item.show();//display=block
			$item.stop()
			.animate($item.data('styles'),function(){
				$item.trigger('shown').data('status','shown');
			});		
		})	
	}
	js._customHide = function($item,options){
		hide($item,function(){
			$item.stop()
			.animate(options,function(){
				$item.hide();//display=none
				$item.trigger('hidden').data('status','hidden');
			});			
		})	
	}

	function getShowHide($item,options){
		var showHideFn = slient;
		if(options.js){
			showHideFn = js[options.mode];
		}

		showHideFn.init($item);

		return {
			show:showHideFn.show,
			hide:showHideFn.hide
		}
	}

	var DEFAULTS = {
		js:true,
		mode:'fade'
	}
	//注册插件
	$.fn.extend({
		showHide:function(options){
			//console.log(this);
			//1.隐式迭代
			return this.each(function(){
				// console.log(this) DOM对象
				var $item = $(this);
				
				var showHideObj = $item.data('showHideObj');

				if(!showHideObj){//单例模式
					options = $.extend({},DEFAULTS,options)
					showHideObj = getShowHide($item,options);
					$item.data('showHideObj',showHideObj);					
				}

				if(typeof showHideObj[options] == 'function'){
					showHideObj[options]($item);
				}
			});
		}
	});










})(jQuery);