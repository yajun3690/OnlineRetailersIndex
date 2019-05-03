;(function($){
	function init($item){
		this.$item = $item;
		this.currentX = parseFloat(this.$item.css('left'));
		this.currentY = parseFloat(this.$item.css('top'));		
	}
	function to(x,y,cb){
		//处理参数为了x和y的方法
		x = (typeof x == 'number') ? x : this.currentX;
		y = (typeof y == 'number') ? y : this.currentY;
		//防止到达目标后继续执行
		if(this.currentX == x && this.currentY == y) return;
		
		this.$item.trigger('move');

		typeof cb == 'function' && cb();

		this.currentX = x;
		this.currentY = y;		
	}


	function Slient($item){
		init.call(this,$item);
	}

	Slient.prototype = {
		constructor:Slient,
		to:function(x,y){
			to.call(this,x,y,function(){
				this.$item.css({
					left:x,
					top:y
				});
				this.$item.trigger('moved');				
			}.bind(this));
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y)
		}

	}


	function Js($item){
		init.call(this,$item);
	}

	Js.prototype = {
		constructor:Js,
		to:function(x,y){
			to.call(this,x,y,function(){
				this.$item
				.stop()
				.animate({
					left:x,
					top:y				
				},function(){
					this.$item.trigger('moved');
				}.bind(this));
			}.bind(this));
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y)
		}
	}
	function getMove($item,options){
		var move = null;
		if(options.js){
			move = new Js($item);
		}else{
			move = new Slient($item);
		}
		//return move;
		/*
		return {
			to:move.to.bind(move),
			x:move.x.bind(move),
			y:move.y.bind(move)
		}
		*/
		return {
			to:$.proxy(move.to,move),
			x:$.proxy(move.x,move),
			y:$.proxy(move.y,move)
		}	
	}


	var DEFAULTS = {
		js:true
	}
	//注册插件
	$.fn.extend({
		move:function(options,n1,n2){
			return this.each(function(){
				var $item = $(this);
				var moveObj = $item.data('moveObj');

				if(!moveObj){//单例模式
					options = $.extend({},DEFAULTS,options)
					moveObj = getMove($item,options);
					$item.data('moveObj',moveObj);					
				}
				if(typeof moveObj[options] == 'function'){
					moveObj[options](n1,n2);
				}
			});
		}
	});

})(jQuery);