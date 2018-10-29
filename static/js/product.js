$(function(){
//	car中删除按钮
//	$(".store").click(function(){
//				//获取当前行的index 值
//				var index = $(this).parent().index();
//				console.log(index);
//				$(".touY").css("display","block");
//				$("#ensureD").click(function(){
//					$(".store").eq(index).parent().remove();
//					$(".touY").css("display","none");				
//					
//	        		arr = $.cookie("cart") ? JSON.parse( $.cookie("cart") ): [];
//					arr.splice(index,1);
//	        		$.cookie("cart", JSON.stringify(arr), {expires:10, path:"/"});
//	        		shangpinZ();
//				})
//				$("#cancelD").click(function(){
//					$(".touY").css("display","none");
//				})
//			})
	//遍历  已经 登录的cookie
	var logins = $.cookie("logins") ? JSON.parse($.cookie("logins")) : [];
//		for(var i=0; i<logins.length; i++) {
			if (logins.length == 1) {
//				console.log("wodhi")
				$(".header_list2 .first").html("您好！");
				var _aNodeF = $("<a></a>").html(logins[0].name);
				$(".header_list2 .first").append(_aNodeF);
				$(".header_list2 li").eq(1).html("退出");
//				console.log($("#list1 li").eq(1).find("a").html())				
			}
	if ($(".header_list2 .first").find("a").html() == "登录"){
		$(".header_list2 .first").click(function(e){
			e.preventDefault();
			location.href = "login.html";
		})
	}else{
		$(".header_list2 .first").click(function(){
			window.history.go(0);
		})
	}
	
//	console.log($(".header_list2 li").eq(1).html());
	if($(".header_list2 li").eq(1).html() == "退出"){
		$(".header_list2 li").eq(1).click(function(){
			$.cookie("logins", JSON.stringify(logins), {expires:0, path:"/"});
			window.history.go(0);
		})
	}else if($(".header_list2 li").eq(1).html() == "注册"){
//		console.log($(".header_list2 li").eq(1).html());
		$(".header_list2 li").eq(1).click(function(){
			location.href = "register.html";
		})
	}
	
	//头部鼠标滑过改变样式
	$(".header_list1 li").not(".last").hover(function(){
		$(this).addClass("shoustyle");
	},function(){
		$(this).removeClass("shoustyle");
		
	})
	
	$(".header_list2 li").not(".first").hover(function(){
		$(this).addClass("shoustyle");
	},function(){
		$(this).removeClass("shoustyle");
		
	})
	//订阅邮箱的显示隐藏
	$(".header_list1 li").eq(2).hover(function(){
		$(this).find("em").css("transform", "rotate(180deg)");
		$(this).find(".mail_box").css("display","block");
	},function(){
		$(this).find("em").css("transform", "rotate(0deg)");
		$(this).find(".mail_box").css("display","none");
		
		
	})
	
	//注册的链接
//	console.log($(".header_list2").find("li").eq(1).html());
	
//	$(".header_list2").find("li").eq(1).click(function(){
//		
//		location.href = "register.html";
//	})
	$(".header_list2").find("li").eq(2).click(function(){
		
		location.href = "car.html";
	})
	$(".header_list2 li").eq(2).click(function(){
		window.open("car.html")
	})
	
	$(".logo img").hover(function(){
		$(this).css("cursor","pointer")
	},function(){
		$(this).css("cursor","none")
	})
	$(".logo img").click(function(){
		window.open("index .html")
	})
	
	
	
	//搜索框的获取焦点内的默认字消失
	$("#searchBox").focus(function(){
		console.log($(this).val());
		if($(this).val()== "请输入商品名"){
			$(this).val("");
		}else{
			$(this).val();
		}
		
//		$(this).placeholder.html("");
	})
	$("#searchBox").blur(function(){
		if($(this).val()== ""){
			$(this).val("请输入商品名");
		}else{
			$(this).val();
		}
		
//		$(this).placeholder.html("");
	})
	
	//最近浏览鼠标滑过
	$('.current_brower').hover(function(){
		$(this).css("background","#a91516");
//		$(this).find("span").css("color","#999");
		$(this).find("div").css("display","block");
	},function(){
		$(this).css("background-color","#ce1a1b");
//		$(this).find("span").css("color","#fff");
		$(this).find("div").css("display","none");
	})
	//最近浏览记录添加
    var zLL = $.cookie("zLL") ? JSON.parse($.cookie("zLL")) : [];
//	console.log(zLL);
	for(var i=0;i<zLL.length;i++){
//		console.log(zLL[i].id);
		var _lizLL = $("<li></li>").attr("class","liCurrent");
		var _divzLL = $("<div></div>").attr("class","deCurrent")
			var _imgzLL = $("<img src=" +zLL[i].img+ "/>");
			var _azLL = $("<a></a>").html(zLL[i].title);
//			var _bzLL = $("<b></b>").html("￥"+zLL.price);
			var _delzLL = $("<del></del>").html("￥"+zLL[i].pPrice);
			var _spanzLL = $("<span></span>").html(zLL[i].price);
//			var _izLL = $("<i></i>").html(objCont.num);
			
//			_spanzLL.append(_izLL);
			_divzLL.append(_azLL).append(_spanzLL).append(_delzLL);
			
			_lizLL.append(_imgzLL).append(_divzLL)

			$(".listCurrent").append(_lizLL);
	}
	//lastCurrent  清空最近浏览记录
	$(".lastCurrent").click(function(){
		$(".listCurrent li").remove();
    	zLL = $.cookie("zLL") ? JSON.parse($.cookie("zLL")) : [];
		zLL.length =0;
		$.cookie("zLL", JSON.stringify(zLL), {expires:30, path:"/"});
		
	})
	
	//  动态添加详情页面
	$.get("json/index.json",function(data){
        var id = window.location.search.replace("?id=","");
        
        //今日团
		for (var i=0;i<data.list.length;i++) {
			var objL = data.list[i];
			if(objL.id == id){
//				alert(objL.id);
				$(".smallImg img").attr("src",objL.img);
				$(".up h2").html(objL.title);
				$(".up .small").html(objL.discribe);
				$(".price h1").html(objL.price);
				$(".price del").html(objL.pPrice); 
				$(".price span").html(objL.sale);
				$(".text ul li span").html(objL.person);
				
				$(".bigImg").attr("src",objL.img);
			}
		}
		//立即抢购   结算的跳转页面
		$(".buy_btn").click(function(){	
			btnBuy();
			
		})
		$("#cBuy").click(function(){
			btnBuy();
		})
		
			function btnBuy(){
//			console.log($(".first").find("a").html());
			if($(".first").find("a").html() == "登录"){
				$(".zhezhao").css("display","block");
//				console.log($("#seeBuy").val());
				$("#seeBuy").val("先看看其他团购商品，等会再登录");
//				console.log($("#seeBuy").val());
				
				$("#seeBuy").click(function(){
//					
					location.href = "index .html";
//					$(".zhezhao").css("display","none");
				})
				$("#seeBuy").hover(function(){
					$(this).css("cursor","pointer");
				},function(){
					$(this).css("cursor","none");
				})
				
				
				$("#loginPro").click(function(){
					
					location.href = "login.html";
				})
				$("#loginPro").hover(function(){
					$(this).css("cursor","pointer");
				},function(){
					$(this).css("cursor","none");
				})
				
				
				$("#loginCan").click(function(){
//					location.href = "index .html";
					$(".zhezhao").css("display","none");
				})
				$("#loginCan").hover(function(){
					$(this).css("cursor","pointer");
				},function(){
					$(this).css("cursor","none");
				})
				
				
				
//				alert("请登录后在添加购物车");
				
			}else{
				$(".zhezhao").css("display","block");
				$(".tanChuK").find("em").html("恭喜您，您已经成功添加购物车！")
				$(".tanChuK").find("i").css("background-position","-8px -13px");
				$("#loginPro").val("去购物车结算");
				$("#seeBuy").val("再看看其他团购商品，等会再结算");
				
				$("#seeBuy").click(function(){
//					
					location.href = "index .html";
//					$(".zhezhao").css("display","none");
				})
				$("#seeBuy").hover(function(){
					$(this).css("cursor","pointer");
				},function(){
					$(this).css("cursor","none");
				})
				
				
				$("#loginPro").click(function(){
					
					location.href = "car.html?id=" + 100;
//					location.href = "car.html";
				})
				$("#loginPro").hover(function(){
					$(this).css("cursor","pointer");
				},function(){
					$(this).css("cursor","none");
				})
				
				
				$("#loginCan").click(function(){
//					location.href = "index .html";
					$(".zhezhao").css("display","none");
				})
				$("#loginCan").hover(function(){
					$(this).css("cursor","pointer");
				},function(){
					$(this).css("cursor","none");
				})
//			登录
			//  获取cookie中保存的用户信息
//			var users = $.cookie("users") ? JSON.parse($.cookie("users")) : [];
			
			//购物车
			var goodsId = id;
			var goodsImg = $(".smallImg img").attr("src");			
			var goodsName = $(".up h2").html();
			var goodsPrice = $(".price h1").html().replace("￥","");			
//			console.log(goodsPrice);
			
//			//获取之前保存在cookie中的购物车信息
					var arr = $.cookie("cart") ? JSON.parse( $.cookie("cart") ) : [];
					
					//遍历查找是否之前的购物车cookie中存在即将添加的商品
					var isExist = false; //表示是否存在该商品
					for(var i=0; i<arr.length; i++) {
						//如果存在该商品, 把数量增加
						if (goodsId == arr[i].id) {
							arr[i].num++;
							isExist = true; //表示存在该商品
						}
					}
					
					//如果不存在, 则添加一个新商品
					if (!isExist) {
						//商品对象
						var goods = {
							id: goodsId,
							src:goodsImg,
							name: goodsName,
							price: goodsPrice,
							num: 1 //商品数量
						}
						arr.push(goods);
					}
					
					//保存到cookie中
					$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
					console.log( $.cookie("cart") );
					
					//跳转到购物车
//          		window.open("car.html?id="+ 100,'_blank');
//					location.href = "car.html?id=" + 100;
				}
			}
			
	$("#price1").html($(".price").find("h1").html());
			
		})
	
	

		//即将开团详情json修改
//		for (var j=0;j<data.open_group.length;j++) {
//			var objO = data.open_group[j];
////			console.log(objO);
////			console.log(id);
////			console.log(objO.id);
//			if (objO.id == id){
//				$(".smallImg img").attr("src",objO.img);
//				$(".up h2").html(objO.title);
//				$(".up .small").html(objO.discribe);
//				$(".price h1").html(objO.price);
//				$(".price del").html(objO.pPrice); 
//				$(".price span").html(objO.sale);
//				$(".text ul li span").html(objO.person);
//				$(".buy-btn").attr("value","即将开团");
//				
//				$(".bigImg").attr("src",objO.img);
//			}
//		}

//	})
	$(".buy_btn").hover(function(){
			$(this).css("cursor", "pointer")
//			
		},function(){
			$(this).css("cursor", "none")
//			
		})
	
	
	
	
	
//	放大镜效果
		var _smallImg = $(".smallImg"); //小图
		var _smallArea = $(".smallArea"); //小区域
		var _bigImg = $(".bigImg"); //大图
		var _bigArea = $(".bigArea"); //大区域
		

        //bigImg.width / smallImg.width = bigArea.width/smallArea.width
				//smallArea.width = bigArea.width * smallImg.width / bigImg.width
				//计算小区域的宽高
				//width() == innnerWidth() == outerWidth()
				_smallArea.width( _bigArea.width() * _smallImg.width() / _bigImg.width() );
				_smallArea.height( _bigArea.height() * _smallImg.height() / _bigImg.height() );
				
				//放大系数/放大倍数
				var scale = _bigImg.width() / _smallImg.width();  
				//scale = 4
				
				
				//mousemove
				_smallImg.mousemove(function(e){
					
					
					_smallArea.show(); //显示小区域
					_bigArea.show();//显示大区域
					//clientX: 可视区域的x值
					//pageX: 距离窗口左边的x值
					var x = e.pageX - _smallImg.offset().left - _smallArea.width()/2;
					var y = e.pageY - _smallImg.offset().top - _smallArea.height()/2; 
					//console.log(e.clientX);
					//console.log(e.pageX);
					
					//控制小区域范围在小图内
					if (x <= 0) { //不超出左边
						x = 0;
					}
					else if (x >= _smallImg.width()-_smallArea.width()) { //不超出右边
						x = _smallImg.width()-_smallArea.width();
					}
					if (y <= 0) { //不超出上边
						y = 0;
					}
					else if (y >= _smallImg.height()-_smallArea.height()) { //不超出下边
						y = _smallImg.height()-_smallArea.height();
					}
					
					
					//移动小区域
					_smallArea.css({left: x, top: y});
					
					//移动大图
					_bigImg.css({left: -x*scale, top: -y*scale});
					
				})
				
				//mouseleave
				_smallImg.mouseleave(function(){
					_smallArea.hide(); //隐藏小区域
					_bigArea.hide();//隐藏大区域
				})
	
	
	//倒计时
	var date1 = new Date("2016-10-15 10:10:10");
			var now = new Date();
			
			var timeInterval = date1.getTime() - now.getTime(); 
			//秒
			var timeSec = timeInterval/1000;  
			
			//开启定时器, 开始倒计时
			setInterval(function(){
				
				timeSec--;
				var day = parseInt(timeSec/24/60/60); //天
				var hour = parseInt(timeSec/60/60) % 24; //时
				hour = hour<10?"0"+hour:hour;				
				var min = parseInt(timeSec/60) % 60; //分
				min = min<10?"0"+min:min;				
				var sec =  parseInt(timeSec % 60); //秒
				sec = sec<10?"0"+sec:sec;
//				$("#time").html("剩余"+day + "天" + hour + "时" + min + "分" + sec + "秒");
				$(".D").html(day);
				$(".H").html(hour);
				$(".M").html(min);
				$(".S").html(sec);
			},1000)
			
			
		
			
//		详情介绍的nav	的动画的指定跳转
	$("#listTop li").hover(function(){
		$(this).css("cursor","pointer")
	},function(){
		$(this).css("cursor","none")
		
	})
	$("#listTop li").click(function(){
		$("#listTop li").css({
			"background":"#fafafa",
			"color":"#666",
			});
		
		$(this).css({
			"background":"#a70000",
			"border-radius":"5px" ,
			"color":"#fff",
			});
		$("#listTop").find(".lastDisN").css("background","#fafafa");
//		console.log(0)
//		console.log($(".li_bl").length);
		$("body").animate({
		"scrollTop":$(".li_bl").eq($(this).index()).offset().top - 50
		},500)
	})
	
	
	//详情介绍的nav的固定高度的变化
//	console.log($("#listTop").offset().top)
	$(window).scroll(scrollOp);
	function scrollOp(){
//		var _liNode = $("<li></li>").addClass("_liNodeDeNav");
//			var _divNode = $("<div></div>").addClass("_divNodeDeNav");
//			var _spanNode = $("<span></span>").html("￥1499").addClass("_spanNodeDeNav");
//			var _btnNode = $("<button></button>").val("立即抢购").html("立即抢购").addClass("_btnNodeDeNav");
//			_divNode.append(_spanNode).append(_btnNode);
//			_liNode.append(_divNode);
//			$("#listTop").append(_liNode);
		var currentTop = $(this).scrollTop();
//		console.log(currentTop)
		if (currentTop >= 797){
			$("#listTop").addClass("fixed");
			$("#listTop").find(".lastDisN").css("display","block");
			
		}else{
			$("#listTop").removeClass("fixed displayD");
			$("#listTop").find(".lastDisN").css("display","none");
			
		}
		
	}

	
	//更多商品的动态添加
	 
	 //相关产品推荐
//	 <li>
//		<img src="img/product/ChMkJ1ft8-eIZRZOAABv81kKQ88AAWfGAGF_MEAAHAL415.jpg"/>
//		<p>乐视 乐Pro 3（6GB/全网通）新品限量开团！</p>
//		<b>¥2249</b><del>2499</del> <span>已售出<i>110</i></span> 
//	</li>
	$.get("json/product.json",function(data){
		for (var i=0;i<data.conetC.length;i++) {
			var objCont = data.conetC[i];
//			console.log(objCont)
			var _liConet = $("<li></li>");	
			var _imgConet = $("<img src=" +objCont.img+ "/>");
			var _pConet = $("<p></p>").html(objCont.title);
			var _bConet = $("<b></b>").html("￥"+objCont.price);
			var _delConet = $("<del></del>").html("￥"+objCont.pPrice);
			var _spanConet = $("<span></span>").html("已售出");
			var _iConet = $("<i></i>").html(objCont.num);
			
			_spanConet.append(_iConet);
			_liConet.append(_imgConet).append(_pConet).append(_bConet).append(_delConet).append(_spanConet);
			
			$(".connectCom").append(_liConet);
			
			//
//			<li>
//				<div>
//					<img src="img/product/ChMkJ1ft8-eIZRZOAABv81kKQ88AAWfGAGF_MEAAHAL415.jpg"/>
//					<div>
//					<p>乐视 乐Pro 3（6GB/全网通）新品限量开团！</p>
//					</div>
//				</div>							
//				<b>¥2249</b><del>2499</del> <span>关注数<i>32314</i></span> 
//			</li>
			var _liConetS = $("<li></li>");	
				var _divBS = $("<div></div>");
					var _imgConetS = $("<img src=" +objCont.img+ "/>");
					var _divMS = $("<div></div>");					
						var _pConetS = $("<p></p>").html(objCont.title);
				var _bConetS = $("<b></b>").html("￥"+objCont.price);
				var _delConetS = $("<del></del>").html("￥"+objCont.pPrice);
				var _spanConetS = $("<span></span>").html("关注数");
					var _iConetS = $("<i></i>").html(objCont.num);
			
			_divMS.append(_pConetS);
			_divBS.append(_imgConetS).append(_divMS);
			
			_spanConetS.append(_iConetS);
			_liConetS.append(_divBS).append(_bConetS).append(_delConetS).append(_spanConetS);
			
			$(".dajiaSeeS").append(_liConetS);
			
			
//			<li>
//							<div class="one">
//								<img src="img/product/one.jpg" alt="" />
//								<span>佳能 5D Mark IV(单机)  好评返现30元！ </span>      
//								<p>
//									<b>￥21412</b>
//									<span>已售出<i>102</i></span>
//								</p>
//								
//							</div>
//						</li>

			var _limoreGS = $("<li></li>");	
				var _divmoreGS = $("<div></div>").attr("class","one");
					var _imgmoreGS = $("<img src=" +objCont.img+ "/>");
					var _spanmoreGSS = $("<span></span>").html(objCont.title);
					var _pmoreGS = $("<p></p>");
						var _bmoreGS = $("<b></b>").html("￥"+objCont.price);
						var _spanmoreGSM = $("<span></span>").html("关注数");
							var _imoreGS = $("<i></i>").html(objCont.num);
							
			_spanmoreGSM.append(_imoreGS);
			_pmoreGS.append(_spanmoreGSM).append(_bmoreGS);
			_divmoreGS.append(_imgmoreGS).append(_spanmoreGSS).append(_pmoreGS);
			_limoreGS.append(_divmoreGS).appendTo($(".moreGS"));

		}
	})
//	
	
	 
	 
	//  右侧大家都在看什么的动态添加
	
	

	//大家都在看什么的固定
//	console.log($("#dajiaSeeTop").offset().top)
	
	$(window).scroll(scrollOp1);
	function scrollOp1(){
		var currentTop = $(this).scrollTop();
		if (currentTop >= 2900 && currentTop <= 26000){
			$("#dajiaSeeTop").addClass("fixed");
		}else{
			$("#dajiaSeeTop").removeClass("fixed");			
		}	
	}
	
	//产品口碑动态添加
	$.get("json/product.json",function(data){
		
		
		for (var i=0;i<data.prokoubei.length;i++) {
		var obj = data.prokoubei[i];
		var user = obj.user;
		var koubei = obj.koubei;
//		if(id>=1&&id<=24){
//			
//		}
		
//		<li>
//			性能给力，运行各类游戏基本无卡顿，多任务流畅，内存占比我使用中最高到达56%，内存基本用不完，不用担心多开问题
//			<span class="form" >——最高到达</span>							
//		</li>
		var _li = $('<li></li>').addClass("liKoubei").html(koubei);
		$(".listKoubei").append(_li);
		
		var _span = $('<span></span>').addClass("spanKoubei").html("——"+user);
		$(_li).append(_span);			
		}

	})
	
	
	
	
	//y意见反馈出现
	$(window).scroll(scrollOp2);
	function scrollOp2(){
		var currentTop = $(this).scrollTop();
		if (currentTop >= 2500){
			$("#yijianTop").css("display","block");
		}else{
			$("#yijianTop").css("display","none");			
		}	
	}
	//回顶部
	$("#yijianTop .up1").click(function(){
//		console.log(0);
		$("body").animate({
			"scrollTop":0
		},500)
//		$("body").animate({
//		"scrollTop":$(".li_bl").eq($(this).index()).offset().top - 40
//	},500)
	})
	
	
	
	//Z团优势轮播
	
	$.get("json/product.json",function(data){
//		console.log("ok")
		for (var i=0;i<data.Zadv.length;i++) {
			var obj = data.Zadv[i];
			var img = obj.img;
			var id = obj.id;			
			$("#Zadv").append("<li><img src="+ img +"/></li>");
			
		}
		$("#Zadv li").first().clone().appendTo("#Zadv");
		lunbo();
	})
	
	function lunbo(){
		var j=0;
		//	开启自动轮播
		var timer = setInterval(function(){
			j++;
			move();
		},5000)
		
		//		轮播中鼠标移入事件
//		$(".sXlunbozi li").hover(function(){
//			clearInterval(timer);
//			var i = $(this).index();
//			console.log(i);
//			$(this).not().removeClass("baKgC");
//			$(this).addClass("baKgC");
//			
//			$(".sXlunboimg li").not(i).animate({
//				"opacity":0
//			},300).eq(i).animate({
//				"opacity":1
//			},300);
//		},function(){
//			
//			$(this).removeClass("baKgC");
//		})
//		
		
		
//		变化样式的函数函数
		function move(){		
			if(j >= ($(".sXlunbozi li").length)){
				j=0;
			}		
			$(".sXlunbozi li").not(j).removeClass("baKgC").eq(j).addClass("baKgC");
			
			$(".sXlunbozi li").not(j).find("i").css("display","none");
			$(".sXlunbozi li").eq(j).find("i").css("display","inline-block");
	//		.removeClass("baKgC").eq(j).
			$("#Zadv li").not(j).animate({
				"opacity":0
			},300).eq(j).animate({
				"opacity":1
			},300);		
		}
	}
	

	})
	
	



