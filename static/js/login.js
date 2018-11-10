$(function () {
    $("input").focus(function () {
        $(this).css("outline-color", "#c40");

    })

    //点击登录按钮
    $("#btnLogin").click(function () {
        if ($("#uSer").val() == "" || $("#pAssword").val() == "") {
            alert("用户名 或 密码不能为空");
        } else {
            var tel = $('#uSer').val()
            var password = $('#pAssword').val()
            $.get('/chack/', {'tel': tel, 'password': password}, function (response) {
                console.log(response)
                if (response.status == 1) {
                    window.open('/index/', target = '_self')
                     $('#passtip').html('')
                }
                else {
                    $('#passtip').html(response.msg).css('color','red')
                }
            })

        }

    })
})