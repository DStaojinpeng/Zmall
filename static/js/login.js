$(function(){
				$("input").focus(function(){
					$(this).css("outline-color","#c40");
					
				})
//				$('input').blur(function(){
//					$(this).css("border","#fff solid 2px");
////					$(this).css("border","#666 solid 1px");
//					
//					
//				})
				
				//点击登录按钮
				$("#btnLogin").click(function(){
					if($("#uSer").val()=="" || $("#pAssword").val() == ""){
						alert("用户名 或 密码不能为空");
					}else{
					
					//获取cookie中注册过的所有用户
					var users = $.cookie("users"); 
					if (users) {
						users = JSON.parse(users);
						
						//遍历查找是否有匹配的用户
						var isExist = false; //表示是否存在该用户
						for (var i=0; i<users.length; i++) {
							if ( $("#uSer").val() == users[i].name && $("#pAssword").val() == users[i].pwd ) {
								console.log("登录成功!");
								isExist = true; //表示存在该用户
								window.history.back()
//								location.href = "index .html";
								
								
								
								//登录用户保存
								var logins = $.cookie("logins") ? JSON.parse($.cookie("logins")) : [];
										for(var i=0; i<logins.length; i++) {
									if ( $("#uSer").val() == logins[i].name ) {
										console.log("该用户已经存在, 不能添加!");
										return;
									}
								}
								var login = {
									name:$("#uSer").val()
								}
								logins.push(login);
								$.cookie("logins", JSON.stringify(logins), {expires:null, path:"/"});
								console.log( $.cookie("logins") );
							}
						}
						
						if (!isExist) {
							alert("用户名或密码错误!");
						}
						
					}
					}
					
				})
			})