//

//1，左右悬浮栏，顶部活动窗口宽度事件
	(function(w){
			var oLeftFloor = document.querySelector('#left-floor')
			var oRightFloor = document.querySelector('#right-floor')
			var leftColor = document.querySelectorAll('#left-floor ul li')
			var leftColorA = document.querySelectorAll('#left-floor ul li a')
			var oFixedHeard = document.querySelector('#fixed-header')
			// 判断视口宽度是否大于1190px，若大于则显示，若小于则隐藏。
			// 判断高度是否大于2810px;
			window.onscroll = function(){
				if(document.documentElement.scrollTop>1100){
					oFixedHeard.style.display='block';
				}else{
					oFixedHeard.style.display='none';
				}
				if(document.documentElement.scrollTop>2800&&document.documentElement.scrollTop<=8000&&window.innerWidth>1190){
					oLeftFloor.style.display='block';
						if(document.documentElement.scrollTop>2800&&document.documentElement.scrollTop<=3200){
							leftColor[0].style.background = 'rgb(255,153,0)';
							leftColorA[0].style.color = 'white';
						}else{
							leftColor[0].style.background = 'rgb(248,248,248)';
							leftColorA[0].style.color = 'black';							
						}
						if(document.documentElement.scrollTop>3200&&document.documentElement.scrollTop<=3800){
							leftColor[1].style.background = 'rgb(255,153,0)';
							leftColorA[1].style.color = 'white';							
						}
						else{
							leftColor[1].style.background = 'rgb(248,248,248)';
							leftColorA[1].style.color = 'black';								
						}
						if(document.documentElement.scrollTop>3800&&document.documentElement.scrollTop<=4400){
							leftColor[2].style.background = 'rgb(255,153,0)';
							leftColorA[2].style.color = 'white';
						}else{
							leftColor[2].style.background = 'rgb(248,248,248)';
							leftColorA[2].style.color = 'black';							
						}
						if(document.documentElement.scrollTop>4400&&document.documentElement.scrollTop<=5000){
							leftColor[3].style.background = 'rgb(255,153,0)';
							leftColorA[3].style.color = 'white';							
						}
						else{
							leftColor[3].style.background = 'rgb(248,248,248)';
							leftColorA[3].style.color = 'black';								
						}
						if(document.documentElement.scrollTop>5000&&document.documentElement.scrollTop<=5500){
							leftColor[4].style.background = 'rgb(255,153,0)';
							leftColorA[4].style.color = 'white';
						}else{
							leftColor[4].style.background = 'rgb(248,248,248)';
							leftColorA[4].style.color = 'black';							
						}
						if(document.documentElement.scrollTop>5500&&document.documentElement.scrollTop<=6000){
							leftColor[5].style.background = 'rgb(255,153,0)';
							leftColorA[5].style.color = 'white';							
						}
						else{
							leftColor[5].style.background = 'rgb(248,248,248)';
							leftColorA[5].style.color = 'black';								
						}
						if(document.documentElement.scrollTop>6000&&document.documentElement.scrollTop<=6600){
							leftColor[6].style.background = 'rgb(255,153,0)';
							leftColorA[6].style.color = 'white';
						}else{
							leftColor[6].style.background = 'rgb(248,248,248)';
							leftColorA[6].style.color = 'black';							
						}
						if(document.documentElement.scrollTop>6600&&document.documentElement.scrollTop<=7200){
							leftColor[7].style.background = 'rgb(255,153,0)';
							leftColorA[7].style.color = 'white';							
						}
						else{
							leftColor[7].style.background = 'rgb(248,248,248)';
							leftColorA[7].style.color = 'black';								
						}
						if(document.documentElement.scrollTop>7200&&document.documentElement.scrollTop<=8000){
							leftColor[8].style.background = 'rgb(255,153,0)';
							leftColorA[8].style.color = 'white';							
						}
						else{
							leftColor[8].style.background = 'rgb(248,248,248)';
							leftColorA[8].style.color = 'black';								
						}
				}else{
					oLeftFloor.style.display='none';	
				}
			}
			setInterval(function(){
					if(window.innerWidth<1190){
						oRightFloor.style.display='none';
					}
					else{
						oRightFloor.style.display='block';
					}
			},50)
		})(window);
// 2，头部导航栏固定定位



//3，active点击事件
	(function(w){
		var oImg = document.querySelector('#top-active .top-active-imge img')
		var oBlank = document.querySelector('#blank');
		var anumber = 1;
		oBlank.onclick = function(){
			if(anumber%2!=0){
				oImg.style.height = 0+'px';
				oBlank.innerHTML = '&#xe715;';
				anumber+=1;
			}else{
				oImg.style.height = 100+'px';
				oBlank.innerHTML = '&#xe68b;';
				anumber+=1;
			}

		}
	})(window);

// 4，nav-list列表变色

	// (function(w){
	// 	var oNavLL = document.querySelectorAll('#nav-list>ul>li');
	// 	var oNavLA = document.querySelectorAll('#nav-list>ul>li>a');
	// 		 console.log(oNavLL);
	// 		 console.log(oNavLA);
	// })(window);



// 5，轮播图
	(function(w){

		var oImg = document.querySelectorAll('#model-lb ul li')
		var oLrow = document.querySelector('#first-lb-left-arow')
		var oRrow = document.querySelector('#first-lb-right-arow')
		var oArow = document.querySelector('#first-lb-buttom-arow ul')
		var oAarow = oArow.children;
		var neww=0;
		var timer=0;
		function aaa(){
			for(var i=0;i<oImg.length;i++){
				oImg[i].style.display='none';
				oImg[i].style.opacity=0.5;
				oAarow[i].style.borderColor='rgb(218,218,230)';
				oAarow[i].style.background='rgb(218,218,230)';
			}
			sssss(oImg[neww],{opacity:100},0);
			oImg[neww].style.display='block'
			oAarow[neww].style.borderColor='rgb(242,145,7)';
			oAarow[neww].style.background='rgb(242,145,7)';
		}
			oAarow[neww].style.background='rgb(242,145,7)';
			oAarow[neww].style.borderColor='rgb(242,145,7)';
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
			if(neww>=8){
				neww=0;
			}
			aaa()
		}
		for(var i=0;i<oAarow.length;i++){
			oAarow[i].index = i;
			oAarow[i].onmouseenter=function(){
				neww = this.index;
				clearInterval(timer);
				aaa();
			}
		}
		timer = setInterval(function(){
			neww++;
			if(neww>=8){
				neww=0;
			}
			aaa()
		},3000)	

	})(window);


//6，右侧滚动图



//7，轮播图底部广告



// 8，倒计时
	(function(w){
		var oHtime = document.getElementById('hourTime')
		var oMtime = document.getElementById('minuteTime')
		var oStime = document.getElementById('secondsTime')
		var bbb=0;
			function inTime(){
				var newwww=new Date();
				var endTim=new Date('2019-2-22 19:00:00')
				var endAltime=endTim-newwww;
				var iAsecond=endAltime/1000;
				var iHours=parseInt(iAsecond/3600),iMinute=parseInt(iAsecond%3600/60),iSecond=parseInt(iAsecond%3600%60);
				function sole(num){
					return num<10?'0'+num:''+num;
				}
				oHtime.innerHTML = sole(iHours);
				oMtime.innerHTML = sole(iMinute);
				oStime.innerHTML = sole(iSecond);
				if(endAltime<=0){
					endAltime=0;
					clearInterval(bbb);
				}
			}
		bbb = setInterval(inTime,500);
		inTime();

	})(window);


// 9，限时抢购选项卡
	(function(w){
		var oMoveul = document.getElementById('qg1')
		var oRightarow = document.getElementById('first-qg-left-arow');
		var oLeftarow = document.getElementById('first-qg-right-arow');
		var b=1;
		oRightarow.onclick =function(){
			oMoveul.style.left = b*'-1000'+'px';
		}
		oLeftarow.onclick =function(){
			oMoveul.style.left = '0'+'px';
		}
	})(window);
	(function(w){
		var oBtn1 = document.querySelectorAll('.xs-floor-xx');
		var oBtn2 = document.querySelectorAll('.xs-floor-content-ul')
		console.log(oBtn1);
		console.log(oBtn2);
		for(var i=0;i<oBtn1.length;i++){
			oBtn1[i].index = i;
			oBtn1[i].onclick=function(){
			 for(var j=0;j<oBtn1.length;j++){
				// oBtn1[j].className = '';
				oBtn2[j].style.display = 'none';			 	
			 }
				oBtn2[this.index].style.display='block';
			}
		}
	})(window);

// 10，内容获取

//11,苏宁特色放大镜
	(function(w){
		var oBbox = document.getElementById('bigbox')
		var oBboximg = document.querySelector('#bigbox img')
		var oSelect = document.querySelectorAll('#select li')
		for(var i=0;i<oSelect.length;i++){
				oSelect[i].index = i;
			oSelect[i].onmouseover  = function(){
				oBboximg.src = "images/b"+(this.index+1)+".png";
			}
		}
	})(window);		

// 12，右侧悬浮球扩展

// 13，猜你喜欢获取数据

// 14，顶部扩展

// 15，搜索扩展

// 16，全部商品分类

