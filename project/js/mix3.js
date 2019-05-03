//logo
	var oLogo = document.querySelector('.header-logo')
	var oloDiv = document.querySelector('.header-logo-div')
	oLogo.onmouseenter = function(){
		oloDiv.style.marginLeft = '-50px';
	}
	oLogo.onmouseleave = function(){
		oloDiv.style.marginLeft = '0px';
	}

//购物车
	var oTcat = document.querySelector('.top-car')
	var oCat = document.querySelector('.car-a')
	var oContent = document.querySelector('.cart-content')
	var oLoder= document.querySelector('.loader')
	var oTxt= document.querySelector('.txt')
	var cattimer = 0;

	oTcat.onmouseenter = function(){
		oCat.style.color = '#ff6700';
		oCat.style.background = '#fff';
		oLoder.style.display = 'block';
		oContent.style.display = 'block';
		sssss(oContent,{height:100},1,function(){
			setTimeout(function(){
				oLoder.style.display = 'none';
				oTxt.style.display = 'block';
			},300)
		});
	}
	oTcat.onmouseleave = function(){
		oCat.style.color = '#b0b0b0';
		oCat.style.background = '#424242';
		sssss(oContent,{height:0},1,function(){
			oContent.style.display = 'none';			
		});
		oLoder.style.display = 'none';
		oTxt.style.display = 'none';
	}

//选项卡
	var oAtn = document.querySelectorAll('.header-nav-ul-li')
	var oAtn2= document.querySelector('#header-nav-ul-2')
	var oAtn4= document.querySelector('#header-nav-ul-3')
	var timer = 0;
	var timer2 = 0;
	for(var i=1;i<oAtn.length-2;i++){
		oAtn[i].index = i;
		oAtn[i].onmouseenter = function(){
			clearTimeout(timer);
			oAtn4.style.borderTop = '1px splid #ccc';
			oAtn4.innerHTML = '<div class="loader2"></div>';
			oAtn4.style.display='block';
			sssss(oAtn4,{height:230},1,function(){
				oAtn4.style.overflow = 'visible';
			});
			var _this = this;
			clearTimeout(timer2);
			timer2 = setTimeout(function(){
				loadData(_this.index);
			},300)
		}
		oAtn[i].onmouseleave = function(){
			clearTimeout(timer)
			 timer = setTimeout(function(){
				oAtn4.style.overflow = 'hidden';
				sssss(oAtn4,{height:0},1,function(){
					oAtn4.style.display='none';
					oAtn4.style.borderTop = 'none';
				});
				
			},500)
		}
	}
	oAtn4.onmouseenter = function(){
		clearTimeout(timer);
	}
	oAtn4.onmouseleave = function(){
		 timer = setTimeout(function(){
			oAtn4.style.overflow = 'hidden';
			sssss(oAtn4,{height:0},1,function(){
				oAtn4.style.display='none';
				oAtn4.style.borderTop = 'none';
			});
			
		},500)		
	}
	function loadData(index){
		var data = aAtn[index-1];
		var html = '<ul>';
		for(var i = 0;i<data.length;i++){
		html +=		'			<li class="header-nav-ul-3-li">'
		html +=		'				<a href="'+data[i].url+'" class="clearfix">'
		html +=		'					<img src="'+data[i].img+'" alt="">'
		html +=		'				</a>'
		html +=		'				<a href="#">'
		html +=		'					<p>'+data[i].name+'</p>'
		html +=		'				</a>'
		html +=		'				<span>'+data[i].price+'元起</span>'
		if(data[i].tag){
			html +=     '    			<span class="xinpin">'+data[i].tag+'</span>' 
			
		}
		html +=		'			</li>'
	
		}
		html +='</ul>';
		oAtn4.innerHTML = html;

	}
	//全部商品分类
	oAtn[0].onmouseenter=function(){
		oAtn2.style.display='block';
	}
	oAtn[0].onmouseleave=function(){
		oAtn2.style.display='none';
	}
	var oAtn2li  = oAtn2.querySelectorAll('li')
	var oAtn2liA = oAtn2.querySelectorAll('a')
	var oAtn2Content = oAtn2.querySelectorAll('div')
	for(var i = 0;i<oAtn2li.length;i++){
		oAtn2li[i].index = i;
		oAtn2li[i].onmouseenter = function(){
			for(var j = 0;j<oAtn2li.length;j++){
				oAtn2li[j].style.background = '#fff';
				oAtn2liA[j].style.color = 'black';
				oAtn2Content[j].style.display = 'none';
			}
			this.style.background = 'rgb(255,103,0)';
			oAtn2liA[this.index].style.color = '#fff';
			oAtn2Content[this.index].style.display = 'block';
			var _this = this;
			loadData2(_this.index);
		}
		oAtn2.onmouseleave = function(){
			for(var j = 0;j<oAtn2li.length;j++){
				oAtn2li[j].style.background = '#fff';
				oAtn2liA[j].style.color = 'black';
				oAtn2Content[j].style.display = 'none';
			}
		}
	}
	function loadData2(index){
		var data2 = aAtn2[index];
		var html = '<ul class="header-nav-ul-2-u">';
		for(var i = 0;i<data2.length;i++){
		html +=		'			<li class="header-nav-ul-2-u-li">'
		html +=		'				<a href="'+data2[i].url+'" class="clearfix">'
		html +=		'					<img src="'+data2[i].img+'" alt="">'
		html +=		'					<span>'+data2[i].name+'</span>'
		html +=		'				</a>'
		html +=		'			</li>'
		}
		html +='</ul>';
		oAtn2Content[index].innerHTML = html;
	}
//轮播图
		var oImg = document.querySelectorAll('.am-lb-i')
		var oLrow = document.querySelector('.left-aarow')
		var oRrow = document.querySelector('.right-aarow')
		var oArow = document.querySelector('.main-ul1-1')
		var oAarow = oArow.children;
		var neww=0;
		var timer=0;
		function aaa(){
			for(var i=0;i<oImg.length;i++){
				oImg[i].style.display='none';
				oImg[i].style.opacity=0.5;
				oAarow[i].style.borderColor='gray';
			}
			sssss(oImg[neww],{opacity:100},0);
			oImg[neww].style.display='block'
			oAarow[neww].style.borderColor='white';
		}
			oAarow[neww].style.borderColor='white';
		oLrow.onclick =function(){
			clearInterval(timer);
			neww--;
			if(neww<0){
				neww=oImg.length-1;
			}
			aaa()
		}
		oRrow.onclick =function(){
			clearInterval(timer);
			neww++;
			if(neww>=3){
				neww=0;
			}
			aaa()
		}
		for(var i=0;i<oAarow.length;i++){
			oAarow[i].index = i;
			oAarow[i].onclick=function(){
				neww = this.index;
				clearInterval(timer);
				aaa();
			}
		}
		timer = setInterval(function(){
			neww++;
			if(neww>=3){
				neww=0;
			}
			aaa()
		},3000)

//小米MIX3固定定位定位
	var oHomeb= document.querySelector('.homeb')
	window.onscroll = function(){
		if(document.documentElement.scrollTop>=140){
			sssss(oHomeb,{height:65})
			oHomeb.style.display='block';
		}else{
			sssss(oHomeb,{height:0},1,function(){
			oHomeb.style.display='none';	
			})
		}
	}
