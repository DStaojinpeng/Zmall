$(function () {
    orderstatus()
    $('#btnE').click(function () {
        $.get('//',{},function (response) {
            console.log(response)
        })
    })
    function orderstatus() {
        var countnum=0
        var countmoney = 0
        $('.godS .ulgoodlist').each(function () {
            $that = $(this)
            var status = $that.find('.store').attr('orderstatus')
            var price = parseInt($that.find('.price').attr('price').substring(1))
            var num  = parseInt($that.find('.numT').val())
            var total = price*num
            countmoney+=total
            countnum += num
            $that.find('.allPriceT').html('￥'+total)
            console.log($that)
            if(status==1)
            {
                $that.find('.store').css('color','red').html('未付款')
            }
        })
        $('.rightTotal .allNum').html(countnum)
        $('.rightTotal #tPrice').html('￥'+ countmoney)
        $('.rightT h4').html('￥'+ countmoney)
    }
})