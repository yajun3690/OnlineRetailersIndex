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
//小米8青春版固定定位、轮播图固定定位、绝对定位
	var oHomeb= document.querySelector('.homeb')
	var oMinb= document.getElementById('box')
	window.onscroll = function(){
		if(document.documentElement.scrollTop>=140){
			sssss(oHomeb,{height:65})
			oHomeb.style.display='block';
		}else{
			sssss(oHomeb,{height:0},1,function(){
			oHomeb.style.display='none';	
			})
		}
		if(document.documentElement.scrollTop<200){
			oMinb.style.position='relative';
			oMinb.style.top='30px';
			oMinb.style.left='0';	
		}else if(document.documentElement.scrollTop>=200&&document.documentElement.scrollTop<=1000){
			oMinb.style.position='fixed';
			oMinb.style.top='100px';
			oMinb.style.left='180px';
		}else if(document.documentElement.scrollTop>1000){
			oMinb.style.position='relative';
			oMinb.style.top='950px';
			oMinb.style.left='0';	
		}
	}
	
//生成轮播图
	function Lbpicture(options){
		//罗列需要的属性
		this.oBox = document.getElementById(options.id);
		this.Img = options.img;
		this.width = options.width;
		this.height = options.height;
		this.playAuto = options.playAuto;
		this.now = 0;
		this.oBox.style.width = this.width+'px';
		this.oBox.style.height = this.height+'px';
		//绑定事件
		this.addSelect();
		this.bindevent();
		//自动播放
		if(this.playAuto){
			this.auto();
		}

	}
	Lbpicture.prototype.addSelect = function(){
		//创建DOM节点
		//生成图片容器
		this.oUl = document.createElement('ul')
		//生成底部按钮容器
		this.oUl2 = document.createElement('ul');
		for(var i=0;i<this.Img.length;i++){
			var oli = document.createElement('li')
			var oimg = document.createElement('img')
			var oli2 = document.createElement('li');

			oimg.src = this.Img[i];
			oli.appendChild(oimg);
			oli.className = 'ccc'
			oli2.className = 'activeli';
			oli2.style.float = 'left';
			this.oUl.appendChild(oli);
			this.oUl2.appendChild(oli2);
		}
		//生成左右按钮
		this.oRightRow = document.createElement('span')
		this.oLeftRow = document.createElement('span')
		//给按钮绑定classNAME
		this.oRightRow.className = 'iconfont row rightrow'
		this.oLeftRow.className = 'iconfont row leftrow'
		this.oRightRow.innerHTML = '&#xe622;';
		this.oLeftRow.innerHTML = '&#xe627;';
		this.oUl2.className = 'active';
		this.oUl2.style.zIndex = '55';
		this.oUl2.style.left = '50%';
		//添加DOM节点到BOX
		this.oBox.appendChild(this.oUl);
		this.oBox.appendChild(this.oUl2);
		this.oBox.appendChild(this.oRightRow);
		this.oBox.appendChild(this.oLeftRow);
		
	}
	Lbpicture.prototype.bindevent = function(){
		var _this = this
		//绑定右按钮
		
		this.oUl2.children[0].style.borderColor = 'rgb(0,0,0,0.5)';		
		this.oRightRow.onclick = function(){
			//显示下一张
			setTimeout(function(){
				_this.now++;
				if(_this.now>3){
					_this.now = 0;
				}
				_this.tab();				
			},100)

		}
		//绑定左按钮
		this.oLeftRow.onclick = function(){
			setTimeout(function(){
				_this.now--;
				if(_this.now<0){
					_this.now = 3;
				}
				_this.tab();			
			},100)
		}
		//绑定底部按钮
		for(var i = 0;i<this.oUl2.children.length;i++){
				this.oUl2.children[i].index = i;
			this.oUl2.children[i].onclick = function(){
				_this.now = this.index;
				_this.tab();
			}
		}



	}
	Lbpicture.prototype.tab = function(){
			for(var i =0;i<this.Img.length;i++){
				this.oUl.children[i].style.zIndex = 0;
				this.oUl.children[i].style.dispaly = 'none';
				this.oUl.children[i].style.opacity = 0.4;
				this.oUl2.children[i].style.borderColor = 'rgb(0,0,0,0.2)';
			}
				this.oUl.children[this.now].style.zIndex = 50;
				this.oUl.children[this.now].style.dispaly = 'block';
				// this.oUl.children[this.now].style.opacity = 1;	
				sssss(this.oUl.children[this.now],{opacity:100})
				this.oUl2.children[this.now].style.borderColor = 'rgb(0,0,0,0.5)';

	}
	Lbpicture.prototype.auto = function(){
		var _this = this;
		var timer = 0;
		timer = setInterval(this.oRightRow.onclick,this.playAuto);
		this.oBox.onmouseover = function(){
			clearInterval(timer);
		}
		this.oBox.onmouseout = function(){
			timer = setInterval(_this.oRightRow.onclick,_this.playAuto);
		}
	}

	new Lbpicture({
		id:'box',
		img:["images/q1.jpg","images/q2.jpg","images/q3.jpg","images/q4.jpg"],
		width:560,
		height:560,
		playAuto:2000
	});	


//右部选择框
	//版本选择
	var oEdition = document.querySelector('.sec-Edition')
	var oAselecter = oEdition.querySelectorAll('a')
	var oSpan = oEdition.querySelectorAll('span')
	for(var i=0;i<oAselecter.length;i++){
			 oAselecter[i].index = i;
		oAselecter[i].onclick = function(){
			for(var j=0;j<oAselecter.length;j++){
				oAselecter[j].style.borderColor = '#e0e0e0';
				oAselecter[j].style.color = 'black';
				oSpan[j].style.color = '#acacac';
			}
			this.style.borderColor = '#ff6700';
			this.style.color = '#ff6700';
			oSpan[this.index].style.color = '#6c6c6c';
		}
	}
	//颜色选择
	var oSecolor = document.querySelector('.sec-color')
	var oAsecolor = oSecolor.querySelectorAll('a')
	for(var i=0;i<oAsecolor.length;i++){
		oAsecolor[i].onclick = function(){
			for(var j=0;j<oAsecolor.length;j++){
				oAsecolor[j].style.borderColor = '#e0e0e0';
				oAsecolor[j].style.color = 'black';
			}
			this.style.borderColor = '#ff6700';
			this.style.color = '#ff6700';
		}
	}
	//定义onclick算法全局变量
	var a = 1;
	var b = 1;
	var c = 1;
	//意外
	var oYiwai = document.querySelector('.yiwai-body')
	var ol1 = document.querySelector('.li-1')
	var oRadius = document.querySelector('.radius')
	var oRightradius = document.querySelector('.right-radius')
	var oLI = oRadius.querySelector('i')
	var oRI = oRightradius.querySelector('i')

	oYiwai.onclick = function(){
		a++
		if(a%2){
			this.style.borderColor = '#e0e0e0';
			ol1.style.color = '#424448';
			oRightradius.style.borderWidth = '1px';
			oRadius.style.borderWidth = '1px';
			oRI.style.display = 'none';
			oLI.style.display = 'none';
		}else{
			this.style.borderColor = '#ff6700';
			ol1.style.color = '#ff6700';
			oRightradius.style.borderWidth = '0px';
			oRadius.style.borderWidth = '0px';
			oRI.style.display = 'block';
			oLI.style.display = 'block';
		}
	}
	//碎屏

	var oSuiPing = document.querySelector('.yiwai-body2')
	var ol2 = document.querySelector('.li-12')
	var oRadius2 = document.querySelector('.radius2')
	var oRightradius2 = document.querySelector('.right-radius2')
	var oLI2 = oRadius2.querySelector('i')
	var oRI2 = oRightradius2.querySelector('i')
	oSuiPing.onclick = function(){
		b++
		if(b%2){
			this.style.borderColor = '#e0e0e0';
			ol2.style.color = '#424448';
			oRightradius2.style.borderWidth = '1px';
			oRadius2.style.borderWidth = '1px';
			oRI2.style.display = 'none';
			oLI2.style.display = 'none';
		}else{
			this.style.borderColor = '#ff6700';
			ol2.style.color = '#ff6700';
			oRightradius2.style.borderWidth = '0px';
			oRadius2.style.borderWidth = '0px';
			oRI2.style.display = 'block';
			oLI2.style.display = 'block';
		}
	}
	//保修

	var oBaoXiu = document.querySelector('.yiwai-body3')
	var ol3 = document.querySelector('.li-13')
	var oRadius3 = document.querySelector('.radius3')
	var oRightradius3 = document.querySelector('.right-radius3')
	var oLI3 = oRadius3.querySelector('i')
	var oRI3 = oRightradius3.querySelector('i')

	oBaoXiu.onclick = function(){
		c++
		if(c%2){
			this.style.borderColor = '#e0e0e0';
			ol3.style.color = '#424448';
			oRightradius3.style.borderWidth = '1px';
			oRadius3.style.borderWidth = '1px';
			oRI3.style.display = 'none';
			oLI3.style.display = 'none';
		}else{
			this.style.borderColor = '#ff6700';
			ol3.style.color = '#ff6700';
			oRightradius3.style.borderWidth = '0px';
			oRadius3.style.borderWidth = '0px';
			oRI3.style.display = 'block';
			oLI3.style.display = 'block';
		}
	}



