;(function($){

	function search($item,options){
		this.$item = $item;
		this.options = options;
		this.$searchBtn = $item.find('.search-btn');
		this.$searchInput = $item.find('.search-input');
		this.$searchForm = $item.find('.earch-form');
		this.$searchLayer = $item.find('.search-layer')
		this.init();
		this.isLoaded = false;
		if(this.options.autocompelete){
			this.autocompelete();
		}




	}

	search.prototype = {
		constructor:search,
		init:function(){

			this.$searchBtn.on('click',$.proxy(this.submit,this));



		},
		submit:function(){
			// 阻止默认行为
			if(this.getInputVal() ==''){
				return false;
			}
			this.$searchForm.trigger('submit')

		},
		getInputVal:function(){
			return $.trim(this.$searchInput.val());
		},
		autocompelete:function(){
			this.$searchLayer.showHide(this.options);
			this.$searchInput.on('input',$.proxy(this.getData,this));
			$(document).on('click',$.proxy(this.hideLayer,this))
			this.$searchInput.on('focus',$.proxy(this.showLayer,this));
			this.$searchInput.on('click',function(ev){
				ev.stopPropagation();
			});
			this.$searchLayer.on('clik','.search-item',function(){
				
			});
		},
		getData:function(){
			console.log('will get data...')
			var inputVal = this.getInputVal();

			if(inputVal == ''){
				this.appendHtml('');
				this.hideLayer();
			    return;
			} 
			$.ajax({
				url:this.options.url+this.getInputVal(),
				dataType:'jsonp',
				jsonp:'callback'
			})
			.done(function(data){
				// console,log(data);


				// this.appendHtml(html);
				// if(html == ''){
				// 	this.hideLayer();
				// }else{
				// 	this.showLayer();
					
				// }
				this.$item.trigger('getData',[data])
			}.bind(this))
			.fail(function(err){
				this.$item.trigger('getNoData')
				// this.appendHtml('');
				// this.hideLayer();
			}.bind(this))
		},
		showLayer:function(){
			if(this.isLoaded) return
			this.$searchLayer.showHide('show');
		},
		appendHtml:function(){
			this.$searchLayer.html(html);
			this.isLoaded = !!html;
		},
		hideLayer:function(){
			this.$searchLayer.showHide('hide');
		},





	}

	search.DEFAULS = {

		autocompelete:true,
		// url:"https://suggest.taobao.com/sug?&q="
		url:"http://127.0.0.1:3001/?&q=",
		js:true,
		mode:"slideDownUp",
		getDataDelay:200

	}

	$.fn.extend({
	search:function(options,val){
		return this.each(function(){
			var $elem = $(this);
			var search = $elem.data('search');
			if(!search){
				options = $.extend({},Search.DEFAULTS,options);
				search = new Search($elem,options);
				$elem.data('search',search);				
			}
			if(typeof search[options] == 'function'){
				search[options](val);
			}
		});
	}





















})(jQuery)