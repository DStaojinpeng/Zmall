$(function(){
	//遍历  已经 登录的cookie
	var logins = $.cookie("logins") ? JSON.parse($.cookie("logins")) : [];
//		for(var i=0; i<logins.length; i++) {
			if (logins.length == 1) {
//				console.log("wodhi")
//				console.log($(".first").find("a").html());
				$(".first").find("b").html("您好，");
				$(".first").find("a").html(logins[0].name);
				creatGoL();
//				退出
//				console.log($(".secode").find("b").html());
				if($(".secode").find("b").html() == "退出"){
//					console.log("00000000")
					$(".secode").click(function(){
						$.cookie("logins", JSON.stringify(logins), {expires:0, path:"/"});
						window.history.go(0);
					})
				}
				
				
			}
			
			if($(".first").find("a").html() == "登录"){
				$(".first").click(function(e){
						e.preventDefault();//阻止默认事件
						location.href = "login.html";	
				})
			}else{
//				
				$(".first").find("a").click(function(){
					window.history.go(0);
				})
//				
			}
		
	//
	//头部鼠标手型
	$(".header_list1 li").not(".last").hover(function(){
		$(this).addClass("hoverP");
	},function(){
		$(this).removeClass("hoverP");
		
	})
	$(".header_list2 li").not(".first").hover(function(){
		$(this).addClass("hoverP");
	},function(){
		$(this).removeClass("hoverP");
		
	})
	
	//logo跳转
	$(".logo img").hover(function(){
		$(this).css("cursor","pointer");
	},function(){
		$(this).css("cursor","none");
	})
	$(".logo img").click(function(){
		location.href = "index .html";
	})
	
	function creatGoL(){
				var uid = location.search;
//				console.log(uid); //?id=100
				
				//从cookie中获取购物车的所有商品
				var arr = $.cookie("cart");
				if (arr) {
					arr = JSON.parse(arr); 
					//[
					//  {"id":"100","name":"单车","price":"998RMB","num":4},
					//  {"id":"101","name":"汽车","price":"998000RMB","num":2},
					//  {"id":"102","name":"飞机","price":"99800000RMB","num":1}
					//]
					
					//遍历数组, 显示所有商品的信息
					for (var i=0; i<arr.length; i++) {
//						<ul class="ulgoodlist">
			//				<li class="goods">
			//					<img src="img/car/ChMkJlfI9bSIIka3AACuFP1e8ysAAU66QJ5cLgAAK4s597.jpg"/>
			//					<h5><a href="#">魅族MX6（32G/全网通/香槟金）</a></h5>
			//				</li>
			//				<li class="price">1499</li>
			//				<li class="classNum">
			//					<div class="classNumD">
			//						<input type="button" class="numB" id="minus" value="-" />
			//						<input type="text" id="disT" class="numT" value="1" />
			//						<input type="button" class="numB" id="plus" value="+" />
			//					</div>
			//					
			//				</li>
			//				<li class="allPrice">1499</li>
			//				<li class="store">有货</li>
			//				</ul>
						
						var _ulNode = $("<ul class='ulgoodlist'></ul>").attr("index",i);
						
						var _liNode1 = $("<li class='goods'></li>") //.attr("class","goods");
						var _imgNode = $("<img src="+ arr[i].src +"/>");
						var _h5Node = $("<h5></h5>");
						var _aNode = $("<a href='#'></a>").html(arr[i].name);
						
						
						var _liNode2 = $("<li class='price'></li>").html(arr[i].price);
					
						var _liNode3 = $("<li></li>").attr("class","classNum");
						var _divNode = $("<div></div>").attr("class","classNumD");
						var _inputNode1 = $("<button></button>").attr("class","minus").html("-");												
						if(arr[i].num == 1){
							_inputNode1.css("color","#ccc");
						}
						var _inputNode2 = $("<input />").attr("type","text").addClass("numT").val(arr[i].num);
						
						var _inputNode3 = $("<button></button>").attr("class","plus").html("+");
						
						
						var _liNode4 = $("<li></li>").attr("class","allPriceT").html("￥"+(arr[i].price)*(arr[i].num));
						var _liNode5 = $("<li></li>").attr("class","store").html("删除");
						
						_h5Node.append(_aNode);
						_liNode1.append(_imgNode).append(_h5Node);
						
						_divNode.append(_inputNode1).append(_inputNode2).append(_inputNode3);
						_liNode3.append(_divNode);
						_ulNode.append(_liNode1).append(_liNode2).append(_liNode3).append(_liNode4).append(_liNode5);
						
						$(".godS").append(_ulNode);
						
//						$(".ulgoodlist").append( "<li>" + arr[i].name + "," + arr[i].price + "," + arr[i].num + "</li>" )
//						console.log($(".allPriceT").length);
						
					}
					
					}
				
					
			shangpinZ();
		}	
//			删除操作
			$(".store").hover(function(){
				$(this).css("cursor","pointer");
			},function(){
				$(this).css("cursor","none");
			});
			$(".store").click(function(){
				$(this).parent().remove();
				//获取当前行的index 值
				var index = $(this).parent().index();
        		arr = $.cookie("cart") ? JSON.parse( $.cookie("cart") ): [];
				arr.splice(index,1);
        		$.cookie("cart", JSON.stringify(arr), {expires:10, path:"/"});
        		shangpinZ();
			})


//商品-+
	
		//商品 -
	$(".minus").click(function(){
		$coutN = parseInt($(this).next().val());
//		console.log($coutN)
		--$coutN;
//		arr[i].num
		if($coutN < 1){
			return $coutN =1;
		}
		
		$(this).next().val($coutN);
		$dan_jia = parseInt($(this).parent().parent().parent().find(".price").html());
//		console.log($dan_jia);
		$(this).parent().parent().parent().find(".allPriceT").html("￥"+($dan_jia*$coutN));
		
		//重新保存cookie
		//获取当前的行的index值
		var index = $(this).parent().parent().parent().index();
//		console.log(index);
		//重新获取cookie
        arr = $.cookie("cart") ? JSON.parse( $.cookie("cart") ): [];
//      console.log(arr);
//      修改cookie中的数量
        arr[index].num--;
        console.log(arr[index].num);
//		 重新保存
		 $.cookie("cart", JSON.stringify(arr), {expires:10, path:"/"});
		
		shangpinZ();
	})
		//商品+
		$(".plus").click(function(){
		$coutNP = parseInt($(this).prev().val());
//		console.log($coutNP)
		++$coutNP;
		$(this).prev().val($coutNP);
		
		
		
		var index = $(this).parent().parent().parent().index();
//		console.log(index);
		//重新获取cookie
        arr = $.cookie("cart") ? JSON.parse( $.cookie("cart") ): [];
//      console.log(arr);
        
        arr[index].num++;
        console.log(arr[index].num);
		 
		 $.cookie("cart", JSON.stringify(arr), {expires:10, path:"/"});
		 
		 
		 
		$dan_jia = parseInt($(this).parent().parent().parent().find(".price").html());
		$(this).parent().parent().parent().find(".allPriceT").html("￥"+($dan_jia*$coutNP));
		shangpinZ();
	})
		
	
	
	
	
	
	
	function shangpinZ(){
		//商品件数	
		var Zjianshu = 0;
		for(var i=0;i<$(".ulgoodlist").length;i++){
		 	$jianshu = parseInt($(".ulgoodlist").eq(i).find(".numT").val());
			Zjianshu += $jianshu;
		} 
		$(".allNum").html(Zjianshu);
	
	//商品总价格
		var Zongjiage = 0;
		for(var i=0;i<$(".ulgoodlist").length;i++){
		 	$jiage =parseInt($(".ulgoodlist").eq(i).find(".allPriceT").html().replace("￥",""));
			Zongjiage += $jiage;
		}
		$("#tPrice").html("￥"+Zongjiage);
		$(".rightT h4").html("￥"+Zongjiage+".00");
		
		
		
		//减号的颜色改变	
		for(var i=0;i<$(".ulgoodlist").length;i++){
			$shuliang = parseInt($(".ulgoodlist").eq(i).find(".numT").val());
//			console.log($shuliang);
			if($shuliang == 1){
				$(".ulgoodlist").eq(i).find(".minus").css("color","#ccc");
			}else{
				$(".ulgoodlist").eq(i).find(".minus").css("color","#666");
			}
		}
		
	}	
	
	$(".bottomTotal a").click(function(){
		window.history.back();
	})
		
	//	获取商品的id
	
	   //点击确定 跳转到2
	   $("#btnE").click(function(){
	   		if($(".first").find("a").html() == "登录"){
	   			alert("请登录后在结算");
	   		}else{
	   			alert("您需要支付的总金额为：    "+$("#tPrice").html());
	   		}
	   		
//	   		window.open("buyCar.html")
	   })
	   
	   
})