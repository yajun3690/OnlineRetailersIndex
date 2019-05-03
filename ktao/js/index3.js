;(function($){
	// 加载一次事件绑定
		function loadHtmlOnce($item,cb){
			var loadUrl = $item.data('load');
			if(!loadUrl) return;
			var isLoaded = $item.data('isLoaded');
			if(isLoaded) return;
			$.getJSON(loadUrl,function(data){
				typeof cb == 'function' && cb($item,data);
			})		
		}
	
	//获取一次数据
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

	// 懒加载共通
		function LazyLoad(options){
			var item = {},
			    totalItemNum = options.totalItemNum,
			 	totalLoadedItemNum = 0,
			 	loadFn = null,
			 	$item = options.$item,
			 	eventName = options.eventName,
			 	eventPerfix = options.eventPerfix;
			//1.开始加载
			$item.on(eventName,loadFn = function(ev,index,item){
				if(item[index] != 'loaded'){
					$item.trigger(eventPerfix+'-load',[index,item,function(){
						item[index] = 'loaded';
						totalLoadedItemNum++;
						if(totalItemNum == totalLoadedItemNum){
							$item.trigger(eventPerfix+'-loaded');
						}	
					}]);
				}
			});
			//2.执行加载
			//3.加载结束
			$item.on(eventPerfix+'-loaded',function(){
				$item.off(eventName,loadFn);
			});			
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

	//焦点区域轮播图	
		var $focusCarousel = $('.focus .carousel-wrap');

		$focusCarousel.on('carousel-load',function(ev,index,item,success){
			var $imgs = $(item).find('.carousel-img');
			$imgs.each(function(){
				var $img = $(this);
				var imgUrl = $img.data('src');
				loadImage(imgUrl,function(imgUrl){
					$img.attr('src',imgUrl);
				},function(imgUrl){
					// 正在加载
					$img.attr('src',"images/focus-carousel/placeholder.png");
				});
				success();
			});
		});
		// 加载图片
		LazyLoad({
			totalItemNum:$focusCarousel.find('.carousel-img').length,
			$item:$focusCarousel,
			eventName:'carousel-show',
			eventPerfix:'carousel'			
		});
		$focusCarousel.carousel({});

	//今日热销轮播图	
		var $todaysCarousel = $('.todays .carousel-wrap');
	
		$todaysCarousel.on('carousel-load',function(ev,index,item,success){
			var $imgs = $(item).find('.carousel-img');
			$imgs.each(function(){
				var $img = $(this);
				var imgUrl = $img.data('src');
				loadImage(imgUrl,function(imgUrl){
					$img.attr('src',imgUrl);
				},function(imgUrl){
					// 正在加载
					$img.attr('src',"images/focus-carousel/placeholder.png");
				});
				success();
			});
		});
		// 加载图片
		LazyLoad({
			totalItemNum:$todaysCarousel.find('.carousel-img').length,
			$item:$todaysCarousel,
			eventName:'carousel-show',
			eventPerfix:'carousel'			
		});	

		$todaysCarousel.carousel({});

	//楼层
		var $floor = $('.floor');

		//判断元素是否进入可视区
		var $win = $(window);
		var $doc = $(document);
	//楼层HTML加载函数
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
	// 楼层tab正在加载图片懒加载	
		$floor.on('tab-load',function(ev,index,item,success){
			var $imgs = $(item).find('.floor-img');
			$imgs.each(function(){
				var $img = $(this);
				var imgUrl = $img.data('src');
				loadImage(imgUrl,function(imgUrl){
					$img.attr('src',imgUrl);
				},function(imgUrl){
					$img.attr('src',"images/floor/placeholder.png");
				});
				success();
			});
		});	
	// 楼层HTML图片懒加载
		$doc.on('floor-load',function(ev,index,item,success){
				//1.生成HTML
				getDataOnce($doc,'data/floor/floorData.json',function(data){
					var $item = $(item);
					var html = buildFloorHtml(data[index]);
					//2.加载HTML
					$(item).html(html);
					//3.图片懒加载
					// floorImgLazyLoad($(item));
					LazyLoad({
						totalItemNum:$item.find('.floor-img').length,
						$item:$item,
						eventName:'tab-show',
						eventPerfix:'tab'			
					});	
					//4.激活选项卡
					$(item).tab({});
				});
					success();		
			});
			//3.加载结束
			$doc.on('floor-loaded',function(){
				$win.off('scroll resize',$floor.showFloorFn);
			});			
			LazyLoad({
				totalItemNum:$floor.length,
				$item:$doc,
				eventName:'floor-show',
				eventPerfix:'floor'
			});			
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
	// 电梯
		// 获取楼层号		
			function getFloorNum(){
				var num = -1;
				$floor.each(function(index,item){
					num = index;
					if($(item).offset().top>$win.scrollTop()+$win.height()/2){
						num = index -1;
						return false;
					}
				})
				return num;
			};
		// 设置电梯样式
			var $elevator = $('#elevator');
			var $elevatorItems = $elevator.find('.elevator-item');
			function setElevator(){
				var num =getFloorNum();
				if(num == -1){
					$elevator.fadeOut();
				}else{
					$elevator.fadeIn();
					$elevatorItems.removeClass('elevator-active');
					$elevatorItems.eq(num).addClass('elevator-active');

				}

			}
			// setElevator();
			$win.on('scroll resize load',function(){
				clearTimeout($elevator.showElevatorTimer);
				$elevator.showElevatorTimer = setTimeout(setElevator,4);
			});
		//点击电梯到达指定楼层
			$elevator.on('click','.elevator-item',function(){
				var num = $elevatorItems.index(this)
				$('html,body').animate({scrollTop:$floor.eq(num).offset().top})

			}) 
	// 工具条回到顶部
		$('#backToTop').on('click',function(){
				$('html,body').animate({scrollTop:0})
		})


})(jQuery);