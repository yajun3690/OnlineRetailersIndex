;(function($){

function DropDown($item,options){
	//1.罗列属性
	this.$item = $item;
	this.options = options;
	this.$layer = $item.find('.dropdown-layer');
	this.activeClass = $item.data('active')+'-active';
	this.timer = 0;
	//2.初始化
	this.init();
}
DropDown.prototype = {
	constructor:DropDown,
	init:function(){
		//1.初始化显示隐藏插件
		this.$layer.showHide(this.options)
		//2.监听显示隐藏事件
		this.$layer.on('show shown hide hidden',function(ev){
			this.$item.trigger('dropdown-'+ev.type);
		}.bind(this));
		//3.绑定事件
		if(this.options.eventName == 'click'){
			this.$item.on('click',function(ev){
				//阻止事件冒泡到document上而触发隐藏
				ev.stopPropagation();
				this.show();
			}.bind(this));
			//点击页面其它部分隐藏
			$(document).on('click',$.proxy(this.hide,this));
		}else{
			this.$item.hover($.proxy(this.show,this),$.proxy(this.hide,this))
		}
	},
	show:function(){
		//处理快速划过
		if(this.options.delay){
			this.timer = setTimeout(function(){
				this.$layer.showHide('show');
				this.$item.addClass(this.activeClass);					
			}.bind(this),this.options.delay)
		}else{
			this.$layer.showHide('show');
			this.$item.addClass(this.activeClass);			
		}
	},
	hide:function(){
		clearTimeout(this.timer);
		this.$layer.showHide('hide');
		this.$item.removeClass(this.activeClass);
	}
}
DropDown.DEFAULTS = {
	js:true,
	mode:'slideDownUp',
	delay:200,
	eventName:''
}

$.fn.extend({
	dropdown:function(options){
		return this.each(function(){
			var $item = $(this);
			var dropdown = $item.data('dropdown');
			if(!dropdown){
				options = $.extend({},DropDown.DEFAULTS,options);
				dropdown = new DropDown($item,options);
				$item.data('dropdown',dropdown);				
			}
			if(typeof dropdown[options] == 'function'){
				dropdown[options]();
			}

		});
	}
})
	
})(jQuery);