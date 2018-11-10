$(function () {
    var tel=false
    var pwd =false
    var picode = false
    // 账号验证
    $('#phoneNum1').blur(function () {
        if ($('#phoneNum1').val() == '') {

        }
        else {
            var re = /^1(3|4|5|7|8)\d{9}$/
            if (re.test($(this).val())) {
                // 验证正确 发起ajax请求
                tel=false
                var account = $('#phoneNum1').val()
                console.log(account)
                $.get('/chackingaccount/', {'account': account}, function (response) {
                    console.log(response)
                    if (response.status == 1) {
                        tel = true
                        // $('#phoneNum1').css({'border': '1.5px solid green', 'border-radius': '5px'})
                        $("#tipNode").find(".correct_tip").css("display", "inline-block");
                        $("#tipNode").find(".error_tip").css("display", "none")
                        $("#tipNode").find("span").html('账号可以使用').css('color', 'green')
                    }
                    else {
                        // $('#phoneNum1').css({'border': '1.5px solid red', 'border-radius': '5px'})
                        $("#tipNode").find(".error_tip").css("display", "inline-block")
                        $("#tipNode").find(".correct_tip").css("display", "none")
                        $("#tipNode").find("span").html('账号已存在').css('color', 'red')
                    }

                })
                ;

                // $('#tipNode .correct_tip').show()
                // $('#tipNode .error_tip').hide()
            }
            else {
                $('#phoneNum1').css({'border': '1.5px solid red', 'border-radius': '5px'})
                $("#tipNode").find(".error_tip").css("display", "inline-block")
                $("#tipNode").find(".correct_tip").css("display", "none")
                $("#tipNode").find("span").html('账号格式不正确').css('color', 'red')
            }
        }
    })
    // 验证码
    codeYZM();

    function codeYZM() {
        var yzm = "";
        for (var i = 0; i < 5; i++) {
            var isNum = parseInt(Math.random() * 10) % 2;    //   这里就只会输出  0 1 0 1。。。。0和1出现的几率各是一半

            if (isNum) {
                yzm += parseInt(Math.random() * 10);
            } else {
                yzm += String.fromCharCode(parseInt(Math.random() * 26 + 65));
            }
//
        }
        $("#codeOne").html(yzm);
//				console.log(yzm);
    }

    $('#codeOne').next().click(function () {
        codeYZM();
    })
//验证码和图片一致
    $("#codeYzm").blur(function () {
        picode = false
        if ($(this).val().toLocaleLowerCase() != $("#codeOne").html().toLocaleLowerCase()) {
            if ($(this).val() == "") {
                $("#tishiYzm").find(".correct_tip").css("display", "none");
                $("#tishiYzm").find(".error_tip").css("display", "inline-block");
                $("#tishiYzm").find("span").html("请输入验证码");
            } else {
                $("#tishiYzm").find(".correct_tip").css("display", "none");
                $("#tishiYzm").find(".error_tip").css("display", "inline-block");
                $("#tishiYzm").find("span").html("验证码输入错误");
            }

        } else {
            $("#tishiYzm").find(".correct_tip").css("display", "inline-block");
            $("#tishiYzm").find(".error_tip").css("display", "none");
            $("#tishiYzm").find("span").html("");
            picode = true
        }
    })
    //密码验证
    $("#mimaMm").blur(function () {
        if ($(this).val() == '')
        {
           pwd =false
        }
        else
        {
            var re = /^[a-zA-Z0-9]{4,16}$/
            if(re.test($(this).val()))
            {
                $('#tishiMm').find('.correct_tip').css('display','inline-block');
                $('#tishiMm').find('.error_tip').css('display','none')
            }
            else {
                $('#tishiMm').find('.correct_tip').css('display','none');
                $('#tishiMm').find('.error_tip').css('display','inline-block')
            }
        }
    })
    //密码重复验证
    $("#mimaMm2").blur(function () {
        pwd =false
        if ($(this).val()==$("#mimaMm").val())
        {
            console.log($("#mimaMm").val())
            $('#tishiMm2').find('.correct_tip').css('display','inline-block');
            $('#tishiMm2').find('.error_tip').css('display','none')
            $('#tishiMm2').find('span').html('')
            pwd =true

        }
        else {
            $('#tishiMm2').find('.correct_tip').css('display','none');
            $('#tishiMm2').find('.error_tip').css('display','inline-block')
            $('#tishiMm2').find('span').html('两次密码输入不一致')
        }
    })
//注册
    $('#btn').click(function () {
        console.log(tel)
        console.log(pwd)
        console.log(picode)
        if(tel&&pwd&&picode)
        {
            console.log('注册')
            $('.zhuce form').submit()
        }
        else
        {
            console.log('未注册')
        }
    })
})


// $(function(){
// 			//手机号验证
// 			var flag1,flag2,flag4 ,flag5 ;
// //			yanzheng();
// //			function yanzheng(){
// 				$("input").focus(function(){
// 					$(this).css("border","#c00 solid 1px");
// 				})
// 				$('input').blur(function(){
// 					$(this).css("border","#E6E6E6 solid 1px");
//
// 				}
// 				$("#codeOne").html(yzm);
// //				console.log(yzm);
//
// 			}
//
// 			//换一张
// 			$('#codeOne').next().click(function(){
// 				codeYZM();
// 			})
// 			//验证码和图片一致
// 			$("#codeYzm").blur(function(){
// 				if($(this).val().toLocaleLowerCase() != $("#codeOne").html().toLocaleLowerCase()){
// 					if($(this).val()== ""){
// 						$("#tishiYzm").find(".correct_tip").css("display","none");
// 						$("#tishiYzm").find(".error_tip").css("display","inline-block");
// 						$("#tishiYzm").find("span").html("请输入验证码");
// 					}else{
// 						$("#tishiYzm").find(".correct_tip").css("display","none");
// 						$("#tishiYzm").find(".error_tip").css("display","inline-block");
// 						$("#tishiYzm").find("span").html("验证码输入错误");
// 					}
//
// 				}else{
// 					$("#tishiYzm").find(".correct_tip").css("display","inline-block");
// 					$("#tishiYzm").find(".error_tip").css("display","none");
// 					$("#tishiYzm").find("span").html("");
// 					flag2 = true;
// 				}
// 			})
//
// //			验证码2
//
//
//
// 			//密码设置
// 			$("#mimaMm").blur(function(){
// //				[0-9]*(([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+))+[a-zA-Z]*
// 				var regMm1 = /[0-9]*(([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+))+[a-zA-Z]*/;
// 				if($("#mimaMm").val().length == 0){
// 					$(this).next().find(".error_tip").css("display","inline-block");
// 					$(this).next().find("span").html("密码输入不能为空");
// 				}else if($("#mimaMm").val().length < 6 || $("#mimaMm").val().length > 16 ){
// 					$(this).next().find(".error_tip").css("display","inline-block");
// 					$(this).next().find("span").html("6-16位字符，可使用字母、数字或符号的组合");
// 				}else if(regMm1.test($("#mimaMm").val()) == false){
// 						$(this).next().find(".correct_tip").css("display","none");
// 						$(this).next().find(".error_tip").css("display","inline-block");
// 						$(this).next().find("span").html("不能全为数字，至少有一位字母");
//
// 				}else{
//
// 					$(this).next().find(".error_tip").css("display","none");
// 					$(this).next().find(".correct_tip").css("display","inline-block");
// 					$(this).next().find("span").html("");
// 					flag4 = true;
// 				}
// 			})
// 			//确定密码
// 			$("#mimaMm2").blur(function(){
// 				if($("#mimaMm").val() != $("#mimaMm2").val()) {
// 					$(this).next().find(".correct_tip").css("display","none");
// 					$(this).next().find(".error_tip").css("display","inline-block");
// 					$(this).next().find("span").html("两次密码输入不一致");
// 				}else{
// 					$(this).next().find(".error_tip").css("display","none");
// 					$(this).next().find(".correct_tip").css("display","inline-block");
// 					$(this).next().find("span").html("");
// 					flag5 = true;
// 				}
// 			})
// //			}
//
// 			//
//
//
// 			// 注册
// 			var check = document.getElementById("check");
// 			$("#btn").click(function(){
// //					$(this).val("正在注册...");
// 				if($("#phoneNum1").val() == "" ||$("#codeYzm").val() == "" ||$("#mimaMm").val() == "" ||$("#mimaMm2").val() == ""  ){
// 					alert("输入框不能为空");
// 				}else{
// 				if(check.checked&&flag1==true&&flag2==true&&flag4==true&&flag5==true){
//
// 				    // $.ajax({
//                     //     type:"post",
//                     //     async: true,
//                     //     url:"http://127.0.0.1:8000/register.html",
//                     //     data:{tel:$('#phoneNum1').val(),password:$('#mimaMm2').val(),type:"register"},
//                     //     success:function (res) {
//                     //          if (res == "OK")
//                     //          {
//                     //              window.location.href = 'http://127.0.0.1:8000/'
//                     //          }
//                     //     }
//                     // })
// // 						//先获取之前保存在cookie中的用户
// // 					var users = $.cookie("users") ? JSON.parse($.cookie("users")) : [];
// //
//生成图片验证码

//
//换一张


// //			验证码2
//
//
//
// 			//密码设置
// 			$("#mimaMm").blur(function(){
// //				[0-9]*(([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+))+[a-zA-Z]*
// 				var regMm1 = /[0-9]*(([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+))+[a-zA-Z]*/;
// 				if($("#mimaMm").val().length == 0){
// 					$(this).next().find(".error_tip").css("display","inline-block");
// 					$(this).next().find("span").html("密码输入不能为空");
// 				}else if($("#mimaMm").val().length < 6 || $("#mimaMm").val().length > 16 ){
// 					$(this).next().find(".error_tip").css("display","inline-block");
// 					$(this).next().find("span").html("6-16位字符，可使用字母、数字或符号的组合");
// 				}else if(regMm1.test($("#mimaMm").val()) == false){
// 						$(this).next().find(".correct_tip").css("display","none");
// 						$(this).next().find(".error_tip").css("display","inline-block");
// 						$(this).next().find("span").html("不能全为数字，至少有一位字母");
//
// 				}else{
//
// 					$(this).next().find(".error_tip").css("display","none");
// 					$(this).next().find(".correct_tip").css("display","inline-block");
// 					$(this).next().find("span").html("");
// 					flag4 = true;
// 				}
// 			})
// 			//确定密码
// 			$("#mimaMm2").blur(function(){
// 				if($("#mimaMm").val() != $("#mimaMm2").val()) {
// 					$(this).next().find(".correct_tip").css("display","none");
// 					$(this).next().find(".error_tip").css("display","inline-block");
// 					$(this).next().find("span").html("两次密码输入不一致");
// 				}else{
// 					$(this).next().find(".error_tip").css("display","none");
// 					$(this).next().find(".correct_tip").css("display","inline-block");
// 					$(this).next().find("span").html("");
// 					flag5 = true;
// 				}
// 			})
// //			}
//
// 			//
//
//
// 			// 注册
// 			var check = document.getElementById("check");
// 			$("#btn").click(function(){
// //					$(this).val("正在注册...");
// 				if($("#phoneNum1").val() == "" ||$("#codeYzm").val() == "" ||$("#mimaMm").val() == "" ||$("#mimaMm2").val() == ""  ){
// 					alert("输入框不能为空");
// 				}else{
// 				if(check.checked&&flag1==true&&flag2==true&&flag4==true&&flag5==true){
//
// 				    // $.ajax({
//                     //     type:"post",
//                     //     async: true,
//                     //     url:"http://127.0.0.1:8000/register.html",
//                     //     data:{tel:$('#phoneNum1').val(),password:$('#mimaMm2').val(),type:"register"},
//                     //     success:function (res) {
//                     //          if (res == "OK")
//                     //          {
//                     //              window.location.href = 'http://127.0.0.1:8000/'
//                     //          }
//                     //     }
//                     // })
// // 						//先获取之前保存在cookie中的用户
// // 					var users = $.cookie("users") ? JSON.parse($.cookie("users")) : [];
// //
// // //					//遍历users数组, 判断是否存在该用户,如果存在则不能注册
// // 					for(var i=0; i<users.length; i++) {
// // 						if ( $("#phoneNum1").val() == users[i].name ) {
// // 							alert("该用户已经存在, 不能注册!");
// // 							return;
// // 						}
// // 					}
// // //
// // //					//需要注册的用户(需要保存到cookie中的用户)
// // 					var user = {
// // 						name: $("#phoneNum1").val(), //手机号
// // 						pwd: $("#mimaMm").val() //密码
// // 					}
// // 					users.push(user); //添加新用户
// // //
// // //					//保存到cookie中
// // 					$.cookie("users", JSON.stringify(users), {expires:30, path:"/"});
// // 					console.log( $.cookie("users") );
// //
// // 					alert("注册成功")
// //
// // //登录用户保存
// // 					var logins = $.cookie("logins") ? JSON.parse($.cookie("logins")) : [];
// // 					for(var i=0; i<logins.length; i++) {
// // 					if ( $("#phoneNum1").val() == logins[i].name ) {
// // 						console.log("该用户已经存在, 不能添加!");
// // 						return;
// // 						}
// // 					}
// // 					var login = {
// // 						name:$("#phoneNum1").val()
// // 					}
// // 					logins.push(login);
// // 					$.cookie("logins", JSON.stringify(logins), {expires:null, path:"/"});
// // 					console.log( $.cookie("logins") );
// // 					window.history.back();
//  				}//else{
// // //
// // 					alert("注册失败") ;
// // 				}
// 			}
// 		})
// })


	
	
