;(function($){
	function loadHtmlOnce($item,cb){
		var loadUrl = $item.data('load');
		if(!loadUrl) return;
		var isLoaded = $item.data('isLoaded');
		if(isLoaded) return;
		$.getJSON(loadUrl,function(data){
			typeof cb == 'function' && cb($item,data);
		})		
	}
	//获取数据
		function getDataOnce($item,url,cb){
			var data = $item.data(url);
			if(!data){
				console.log('get data once ..');
				$.getJSON(url,function(resData){
					$item.data(url,resData);
					cb(resData);
				})
			}else{
				cb(data);
			}
		}	

	//加载图片
		function loadImage(imgUrl,success,error){
			var image = new Image();

			image.onload = function(){
				typeof success == 'function' && success(imgUrl);
			}
			image.onerror = function(){
				typeof error == 'function' && error(imgUrl);
			}
			//模拟网络延时
			setTimeout(function(){
				image.src = imgUrl;	
			},500)	
		}

	//顶部下拉菜单
		var $menuDropdown = $('.nav-side .dropdown');

		$menuDropdown.on('dropdown-show',function(ev){
			loadHtmlOnce($(this),buildMenuLayer);
		});
		function buildMenuLayer($item,data){
			var html = '';
			for(var i = 0;i<data.length;i++){
				html += '<li><a href="'+data[i].url+'" class="menu-item">'+data[i].name+'</a></li>'
			}
			//模拟网络延时
			setTimeout(function(){
				$item.find('.dropdown-layer').html(html);
				$item.data('isLoaded',true);
			},1000);
		}

		$menuDropdown.dropdown({
			delay:200,
		});

	//搜索框
		var $search = $('.header .search');
		$search.on('getData',function(ev,data){
			var html = getSearchLayerHtml(data,5);
			$search.search('appendHtml',html)
			if(html == ''){
				$search.search('hideLayer');
			}else{
				$search.search('showLayer');
			}
		});
		$search.on('getNoData',function(){
			$search.search('appendHtml','');
			$search.search('hideLayer');
		});	

		function getSearchLayerHtml(data,maxNum){
			var html = '';
			for(var i = 0;i<data.result.length;i++){
				if(i >= maxNum) break;
				html += '<li class="search-item">'+data.result[i][0]+'</li>'
			}
			return html;		
		}

		$search.search();

	//分类列表
		var $categoryDropdown = $('.category .dropdown');

		$categoryDropdown.on('dropdown-show',function(ev){
			loadHtmlOnce($(this),buildCategoryLayer)
		});
		function buildCategoryLayer($item,data){
			var html = '';
			for(var i = 0;i<data.length;i++){
				html += '<dl class="category-details"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">';
				for(var j = 0;j<data[i].items.length;j++){
					html += '<a href="#" class="link">'+data[i].items[j]+'</a>';
				}
				html += '</dd></dl>';
			}
			//模拟网络延时
			setTimeout(function(){
				$item.find('.dropdown-layer').html(html);
				$item.data('isLoaded',true);
			},1000);		
		}
		$categoryDropdown.dropdown({
			delay:200,
			js:true,
			mode:"fade"
		});

	//轮播图图片懒加载函数
		function carouselImgLazyLoad($item){
			var item = {};//{0:'loaded',1:'loaded'}
			var totalItemNum = $item.find('.carousel-img').length;
			var totalLoadedItemNum = 0;
			var loadFn = null;
			//1.开始加载
			$item.on('carousel-show',loadFn = function(ev,index,item){
				console.log('carousel-show trigger....');
				if(item[index] != 'loaded'){
					$item.trigger('carousel-load',[index,item])
				}
			});
			//2.执行加载
			$item.on('carousel-load',function(ev,index,item){
				console.log('will load img::',index);
				var $imgs = $(item).find('.carousel-img');
				$imgs.each(function(){
					var $img = $(this);
					var imgUrl = $img.data('src');
					loadImage(imgUrl,function(imgUrl){
						$img.attr('src',imgUrl);
					},function(imgUrl){
						$img.attr('src',"images/focus-carousel/placeholder.png");
					});
					item[index] = 'loaded';
					totalLoadedItemNum++;
					if(totalItemNum == totalLoadedItemNum){
						$item.trigger('carousel-loaded');
					}
				});

			});
			//3.加载结束
			$item.on('carousel-loaded',function(){
				$item.off('carousel-show',loadFn);
			});			
		}

	//焦点区域轮播图	
		var $focusCarousel = $('.focus .carousel-wrap');
		carouselImgLazyLoad($focusCarousel);
		$focusCarousel.carousel({});

	//今日热销域轮播图	
		var $todaysCarousel = $('.todays .carousel-wrap');
		
		carouselImgLazyLoad($todaysCarousel);
		$todaysCarousel.carousel({});

	//楼层图片懒加载函数
		function floorImgLazyLoad($item){
			var item = {};//{0:'loaded',1:'loaded'}
			var totalItemNum = $item.find('.floor-img').length;
			var totalLoadedItemNum = 0;
			var loadFn = null;
			//1.开始加载
			$item.on('tab-show',loadFn = function(ev,index,item){
				console.log('tab-show trigger....');
				if(item[index] != 'loaded'){
					$item.trigger('tab-load',[index,item])
				}
			});
			//2.执行加载
			$item.on('tab-load',function(ev,index,item){
				console.log('will load floor img::',index);
				var $imgs = $(item).find('.floor-img');
				$imgs.each(function(){
					var $img = $(this);
					var imgUrl = $img.data('src');
					loadImage(imgUrl,function(imgUrl){
						$img.attr('src',imgUrl);
					},function(imgUrl){
						$img.attr('src',"images/floor/placeholder.png");
					});
					item[index] = 'loaded';
					totalLoadedItemNum++;
					if(totalItemNum == totalLoadedItemNum){
						$item.trigger('tab-loaded');
					}
				});

			});
			//3.加载结束
			$item.on('tab-loaded',function(){
				$item.off('tab-show',loadFn);
			});			
		}	

	//楼层
		var $floor = $('.floor');

		//判断元素是否进入可视区
		var $win = $(window);
		var $doc = $(document);
		//楼层HTML懒加载函数
		function buildFloorHtml(oneFloorData){
			var html = '';
			html += '<div class="container">';
			html += buildFloorHeadHtml(oneFloorData);
			html += buildFloorBodyHtml(oneFloorData);
			html += '</div>';
			return html;
		}

		function buildFloorHeadHtml(oneFloorData){
			var html = '';
			html += '<div class="floor-hd">';
			html += '	<h2 class="floor-title fl">';
			html += '		<span class="floor-title-num">'+oneFloorData.num+'F</span>';
			html += '		<span class="floor-title-text">'+oneFloorData.text+'</span>';
			html += '	</h2>';
			html += '	<ul class="tab-item-wrap fr">';
			for(var i = 0 ;i<oneFloorData.tabs.length;i++){
				html += '	<li class="fl">';
				html += '		<a class="tab-item" href="javascript:;">'+oneFloorData.tabs[i]+'</a>';
				html += '	</li>';
				if(i != oneFloorData.tabs.length-1){
					html += '	<li class="fl tab-divider"></li>';	
				}
			}				
			html += '	</ul>';
			html += '</div>';

			return html;
		}
		function buildFloorBodyHtml(oneFloorData){
			var html = '';
			html += '<div class="floor-bd">';
			for(var i = 0;i<oneFloorData.items.length;i++){
				html += '	<ul class="tab-panel clearfix">';
				for(var j = 0;j<oneFloorData.items[i].length;j++){
					html += '		<li class="floor-item fl">';
					html += '			<p class="floor-item-pic">';
					html += '				<a href="#">';
					html += '					<img class="floor-img" src="images/floor/loading.gif" data-src="images/floor/'+oneFloorData.num+'/'+(i+1)+'/'+(j+1)+'.png" alt="">';
					html += '				</a>';
					html += '			</p>';
					html += '			<p class="floor-item-name">';
					html += '				<a class="link" href="#"> '+oneFloorData.items[i][j].name+'</a>';
					html += '			</p>';
					html += '			<p class="floor-item-price">￥'+oneFloorData.items[i][j].price+' </p>';
					html += '		</li>';
				}																				
				html += '	</ul>';
			}							
			html += '</div>';

			return html;
		}	

		function floorHtmlLazyLoad(){
			var item = {};//{0:'loaded',1:'loaded'}
			var totalItemNum = $floor.length;
			var totalLoadedItemNum = 0;
			var loadFn = null;
			//1.开始加载
			$doc.on('floor-show',loadFn = function(ev,index,item){
				console.log('floor-show trigger....');
				if(item[index] != 'loaded'){
					$doc.trigger('floor-load',[index,item])
				}
			});
			//2.执行加载
			$doc.on('floor-load',function(ev,index,item){
				console.log('will load floor html::',index);
				//加载HTML
				//1.生成HTML
				getDataOnce($doc,'data/floor/floorData.json',function(data){
					var html = buildFloorHtml(data[index]);
					//2.加载HTML
					$(item).html(html);
					//3.图片懒加载
					floorImgLazyLoad($(item));
					//4.激活选项卡
					$(item).tab({});
				});
				item[index] = 'loaded';
				totalLoadedItemNum++;
				if(totalItemNum == totalLoadedItemNum){
					$doc.trigger('floor-loaded');
				}			

			});
			//3.加载结束
			$doc.on('floor-loaded',function(){
				$doc.off('floor-show',loadFn);
			});			
		}

		floorHtmlLazyLoad();	
		
		function isVisible($item){
			return ($win.height() + $win.scrollTop() > $item.offset().top) && ($win.scrollTop() < $item.offset().top+$item.height());
		}
		function timeToShow(){
			$floor.each(function(index,item){
				if(isVisible($(item))){
					$doc.trigger('floor-show',[index,item]);
				}
			});		
		}
		$win.on('scroll resize load',function(){
			clearTimeout($floor.showFloorTimer);
			$floor.showFloorTimer = setTimeout(timeToShow,200);
		});
		//$floor.tab({});
})(jQuery);