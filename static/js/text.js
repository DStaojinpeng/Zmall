$(function () {
    $("img").each(function () {
        // alert($(this).attr('src'))
        var imgpath = $(this).attr('src');
        var img_path = "{% static  '"+ imgpath +"' %}";
        $(this).attr('src', img_path);
    })
    console.log($('body').html())
})