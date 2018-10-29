
$(function(){
	//遍历  已经 登录的cookie
	var logins = $.cookie("logins") ? JSON.parse($.cookie("logins")) : [];
//		for(var i=0; i<logins.length; i++) {
			if (logins.length == 1) {
//				console.log("wodhi")
				$("#list1 li").eq(0).find("a").html("您好！"+logins[0].name);
				$("#list1 li").eq(1).find("a").html("退出");
//				console.log($("#list1 li").eq(1).find("a").html())
				
			}
			
			
			if($("#list1 li").eq(0).find("a").html() == "请登录"){
				$("#list1 li").eq(0).click(function(e){
						e.preventDefault();//阻止默认事件
						location.href = "login.html";	
				})
			}else{
				$("#list1 li").eq(0).click(function(){
					window.history.go(0);
				})
			}
			
			//免费注册/退出的跳转
			if($("#list1 li").eq(1).find("a").html() == "退出") {
					$("#list1 li").eq(1).find("a").click(function(){
//						history.href == ""
						$.cookie("logins", JSON.stringify(logins), {expires:0, path:"/"});
						window.history.go(0);
					})
				}else if($("#list1 li").eq(1).find("a").html() == "免费注册"){
//					console.log("000000000")
					$("#list1 li").eq(1).click(function(e){
						
						e.preventDefault();//阻止默认事件
//						console.log("000000000")
//						window.open("register.html");
						location.href = "register.html";						
					})
				}
			
//			}
//		var login = {
//			name:$("#uSer").val()
//		}
//		logins.push(login);
//		$.cookie("logins", JSON.stringify(logins), {expires:30, path:"/"});
//		console.log( $.cookie("logins") );
	
	
	
	//头部动画效果  显示/隐藏      /反转
	$("#list1 li").eq(3).hover(function(){
		$(this).find("span").css("transform","rotate(180deg)");
		$(this).find("div").css("display","block");
	},function(){
		$(this).find("span").css("transform","rotate(0deg)");		
		$(this).find("div").css("display","none");
	});
	$("#list1 li").eq(4).hover(function(){
		$(this).find("span").css("transform","rotate(180deg)");	
		$(this).find("div").css("display","block");
		
	},function(){
		$(this).find("span").css("transform","rotate(0deg)");
		$(this).find("div").css("display","none");
		
	});
	
	
	
	//搜索框的获取焦点内的默认字消失
	$(".searchBoxI").focus(function(){
//		console.log($(".searchBoxI").val());
		if($(this).val() == "游戏本"){
			$(this).val("");
		}else{
			$(this).val();
		}
	})
	$(".searchBoxI").blur(function(){
		if($(this).val()== ""){
			$(this).val("游戏本");

		}else{
			$(this).val();
		}
	})
	
	
	
	
	
	
	//导航栏:鼠标进入，块颜色改变
	
	$('.list_nav').children().mouseenter(function(){
		$('.list_nav').children().removeClass('color_li');
		$(this).addClass('color_li');
		
		
	})

	$('.list_nav').children().mouseleave(function(){
		$('.list_nav').children().removeClass('color_li');
	})
	
	
	//分类列表 :鼠标进入，块颜色改变
	$('.list_class').find('li').mouseenter(function(){
		$('.list_class').find('li').siblings().removeClass('color_li');
		$(this).addClass('color_li');
	})
	$('.list_class').find('li').mouseleave(function(){
		$('.list_class').find('li').removeClass('color_li');
	})
	
	//======================


	//获取json数据
	$.get("json/index.json",function(data){
		//将数据显示页面上
			//遍历 获取相对应的数据		
			//轮播
			for (var i=0;i<data.lunbo.length;i++) {				
				var obj1 = data.lunbo[i];
				var img1 = obj1.img;
				var id1= obj1.id;
				
				//创建li节点  ，并添加到列表上
				$(".lunbo_list").append("<li><img src="+img1+"></img></li>");
				$(".lunbo_list2_tip").append( "<li id="+id1+"></li>");
				if (i == 0) {
				$(".lunbo_list2_tip li").addClass("active");
				}	
			}
			lunbo();
			
			
			
		//今日团    列表动态添加
		for (var i=0;i<data.list.length;i++) {
			var obj2 = data.list[i];
			var src2 = obj2.img;
			var id2 = obj2.id;
//			console.log(id2);
			
			var title2 = obj2.title;
			var discribe2 = obj2.discribe;
			var price2 = obj2.price;
			var pPrice2 = obj2.pPrice;
			var sale2 = obj2.sale;
			
			var person2 = obj2.person;
			
			
			
			
			/*
			 * <li class="example">
				<div class="goods_describe">
					<img src="img/example/exampl.jpg"/>
					//倒计时
					<div class="open_show_time">	
						<div class="layer"></div>
						<p></p>
						<span class = person_att></span>
					</div>
					
					<div class="text_describe">
						<h3><a href="#">魅族 MX6（32G/全网通）限时抢！</a></h3>
						<em>4G+ 32G 大内存，十核全网通！，</em>
						<p>
							<span>￥1569.00</span><del>￥1999</del><i>7.8折</i>
							<input class="im_buy" type="button" value="马上抢" />
						</p>
					</div>
				</div>
			</li>
			 * 
			 * 
			*/
			var _p = $("<p></p>");
			var _span = $("<span></span>").html(price2);
			var _del = $("<del></del>").html(pPrice2);
			var _i = $("<i></i>").html(sale2);
			var _btn = $("<input type='button' value='马上抢' class='im_buy' />");
			_p.append(_span).append(_del).append(_i).append(_btn);
			
			var _em = $("<em></em>").html(discribe2);
			
			var _h3 = $("<h3></h3>");
			var _a  =$("<a></a>").html(title2);
			
			_h3.append(_a);
			
			var _div = $("<div class='text_describe'></div>");
			_div.append(_h3).append(_em).append(_p);
			
//			添加倒计时
			/*
			 * <div class="open_show_time">	
						<div class="layer"></div>
						<p></p>
					</div>
			 */
			var _div_ = $("<div></div>").attr("class","layer");
			var _p_ = $("<p></p>");
			var _span_ = $("<span></span>").attr("class","person_att").html( person2 + "人关注");
			var _div2 = $("<div></div>").attr("class","open_show_time");			
			_div2.append(_div_).append(_p_).append(_span_);
			
			
			var _img = $("<img src="+src2+" />");		
			
			var _big_div = $("<div class='goods_describe' id="+id2+"></div>");
//			console.log(id2)
			_big_div.append(_img).append(_div).append(_div2);	
			
			
			var _li = $("<li class='example'></li>");
			_li.append(_big_div);
			if(i%3==2){
				_li.removeClass("example");
				_li.addClass("example_3");
			}
			_li.appendTo($(".goods_list"));
		}
		boderC();
		//跳到链接地址
//		console.log($(".goods_describe").attr("id"));
        $(".goods_list li").click(function(){
        	var flag = true;
        	var zLL = $.cookie("zLL") ? JSON.parse($.cookie("zLL")) : [];
			for(var i=0; i<zLL.length; i++) {
        	
        	if($(".goods_describe").attr("id") == zLL[i].id ) {
        		
					console.log("该记录已经存在, 不能添加!");
					flag = false;
					
			}
        }
			if(flag){
				var zjLl = {
	        		id:$(this).find(".goods_describe").attr("id"),
	        		img:$(this).find("img").attr("src"),
	        		title:$(this).find("em").html(),
	        		price:$(this).find("span").html(),
	        		pPrice:$(this).find("del").html(),
	        	}
				console.log(zjLl);
	        	
	        	zLL.push(zjLl);
				$.cookie("zLL", JSON.stringify(zLL), {expires:30, path:"/"});
			}
        	
        	
//		console.log($(this).find(".goods_describe").attr("id"));
            window.open("product.html?id="+$(this).find(".goods_describe").attr("id"),'_blank')
			
        })
        

		
		//  即将开团商品列表动态添加
		for (var i=0;i<data.open_group.length;i++) {
			var obj3 = data.open_group[i];
			var src3 = obj3.img;
			var id3 = obj3.id;
			var title3  = obj3.title;
			var discribe3 = obj3.discribe;
			var price3 = obj3.price;
			var pPrice3 = obj3.pPrice;
			var sale3 = obj3.sale;
			
			var person3 = obj3.person;
			
			/*
			 * <li class="open_first">
				<div class="open_describe">
					<img src="img/example/exampl.jpg"/>
					<div class="open_text_describe">
						<h3><a href="#">魅族 MX6（32G/全网通）限时抢！</a></h3>
						<em>4G+ 32G 大内存，十核全网通！，</em>
						<p>
							<span>￥1569.00</span><del>￥1999</del><i>7.8折</i>
							<input class="see_see" type="button" value="去看看" />
						</p>
					</div>
				</div>
			</li>
			 */
			
			var _p = $("<p></p>");
			var _span = $("<span></span>").html(price3);
			var _del = $("<del></del>").html(pPrice3);
			var _i = $("<i></i>").html(sale3);
			var _btn = $("<input type='button' value='去看看' class='see_see' />");
			_p.append(_span).append(_del).append(_i).append(_btn);
			
			var _em = $("<em></em>").html(discribe3);
			
			var _h3 = $("<h3></h3>");
			var _a  =$("<a></a>").html(title3);
			
			_h3.append(_a);
			
			var _div = $("<div class='open_text_describe'></div>");
			_div.append(_h3).append(_em).append(_p);
			
//			添加倒计时
			/*
			 * <div class="open_show_time">	
						<div class="layer"></div>
						<p></p>
					</div>
			 */
			var o_div_ = $("<div></div>").attr("class","olayer");
			var o_p_ = $("<p></p>");
			var o_span_ = $("<span></span>").attr("class","operson_att").html( person3 + "人关注");
			var o_div2 = $("<div></div>").attr("class","oopen_show_time");			
			o_div2.append(o_div_).append(o_p_).append(o_span_);
			
			
			var _img = $("<img src="+src3+" />");		
			
			var _big_div = $("<div class='open_describe' id="+ id3+"></div>");
			_big_div.append(_img).append(_div).append(o_div2);	
			
			
			var _li = $("<li class='open_first'></li>");
			_li.append(_big_div);
			
			_li.appendTo($(".open_goup_list"));
		}
		
		boderC();
		
//		$(".open_goup_list li").click(function(){
//      	console.log(0)
//          window.open("product.html?id="+$(this).find(".open_describe").attr("id"),'_blank')
//      	
//      })
	
	})
//	轮播
		function lunbo(){
		var _list1 = $(".lunbo_list");
		var _li1 = $(".lunbo_list li");
		var _list2 = $(".lunbo_list2_tip");
		var _li2 = $(".lunbo_list2_tip li")
		
		_li1.first().clone().appendTo(_list1);				
					
		var size = $(".lunbo_list li").length;
		
		var i = 0;
		
		
		var timer = setInterval(function(){
			i++;
			move();
		}, 3000);
		
		
		function move(){
			if(i<0){
				_list1.css('left',-(size-1)*($('.lunbo').outerWidth()));
				i = size - 2;
			}
			if(i>=size){
				_list1.css('left',0);
				i=1;
			}
			
			_list1.stop().animate({left: -i*($('.lunbo').outerWidth())}, 500);
			
			_li2.removeClass().eq(i).addClass("active");
				if (i == size-1) {
				_li2.removeClass().eq(0).addClass("active");
			}
		}
		//上一页
		$(".left_pre").click(function(){
			i--;
			move();
		});	
		//下一页
		$(".right_next").click(function(){
			i++;
			move();
		})	
		//按钮的移入事件
		_li2.mouseenter(function(){
			i = $(this).index();
			move();
		})
		
		
		$(".lunbo").hover(
			
			function(){ //mouseenter
				$(this).find('div').addClass('show');//		鼠标进入轮播区域，上一页，下一页箭头出现
	
				clearInterval(timer); //停止定时器
						},
			function(){ //mouseleave
				$(this).find('div').removeClass('show');
				clearInterval(timer);
				timer = setInterval(function(){
				i++;
				move();
				}, 3000)
							
			})
	}
	
	
	
	//   倒计时
	
//		function time(){
	//在某个时间点开始抢: 2016-10-01 10:10:10
			//让上面的时间和现在的时间比较, 得到一个时间差
			// 
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
				$(".show_time").find("p").html(day + "天" + hour + "时" + min + "分" + sec + "秒");
				$(".open_show_time").find("p").html("剩余 ： "+day + "天" + hour + "时" + min + "分" + sec + "秒");
				$(".oopen_show_time").find("p").html("距开团 ： "+day + "天" + hour + "时" + min + "分" + sec + "秒");
				
			}, 1000);
	
	
//		}
	
	
	//
	
	
	
	
	
	//今日团，当当滚动条的距离大于200px 小于4500px时今日购固定在顶端
//	获取距离
//	console.log($("#todayGTop").offset());
//	console.log($("#scTop").offset().top + $("#todayGTop").offsetHeight);
//	console.log($("#opScTop").offset().top);
	
	
	
	$(window).scroll(scrollOp);
	function scrollOp(){
		var currentTop = $(this).scrollTop();
//		console.log(currentTop);
		if (currentTop >= 898 && currentTop <= 4500){
			$(".scroll_top").addClass("fixtTop");
		}else{
			$(".scroll_top").removeClass("fixtTop");			
		}	
	}
	//进入品牌团列表 ，边框颜色改变 
	//左
	$(".left_img").hover(function(){
		$(this).addClass("cursor");
	},function(){
		$(this).removeClass("cursor");
		
	})
	//右
	$(".right_img").hover(function(){
		$(this).addClass("cursor");
	},function(){
		$(this).removeClass("cursor");
		
	})
	
	
	//  进入今日团列表 ，边框颜色改变 
	function boderC(){
	$(".example,.example_3,.open_first").hover(function(){

		$(this).css({
			"border":"1px solid red",
//			"cursor":"pointer"
		})
		$(this).find(".im_buy").css("cursor","pointer");
		$(".goods_describe").find("img").css("cursor","pointer");
		$(this).find("a").css({
			"color":"#C40000",
			"text-decoration":"underline",
			"cursor":"pointer"
			
			})

	},function(){
		$(this).css({
			"border":"1px solid #ededed",
//			"cursor":"none"
		});
		$(this).find(".im_buy").css("cursor","none");
		$(".goods_describe").find("img").css("cursor","none");
		
		$(this).find("a").css({
			"color":"#666",
			"text-decoration":"none",
			"cursor":"none"
		})
		
	})
	
	}

	//右侧固定 意见
	//显示/隐藏
	$(window).scroll(scrollTop);
	
	function scrollTop(){
		var currentTop = $(this).scrollTop();
//		console.log(currentTop);
		if (currentTop >= 898){
			$("#right_fixed").css("display","block");
		}else{
			$("#right_fixed").css("display","none");			
		}	
	}
	//点击滚动上去
$("#right_fixed ul li").eq(2).click(function(){
		$("body").animate({
			"scrollTop":0
		},500);
	});
//	console.log()
	//鼠标滑过
	$("#right_fixed ul li").hover(function(){
		$(this).addClass("cOlor");
	},function(){
		$(this).removeClass("cOlor");
	})
})
