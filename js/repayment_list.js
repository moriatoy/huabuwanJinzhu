var currentPage = 1;
var mobile = '';
var name ='';
var orderNo='';//订单号
var type =0;//订单类型 1付款 2续期
var method=0 //支付方式 0 全部 1 支付宝 5 线下
var payTime ='';//订单支付时间
var orderEffTime ='';//订单生效时间
var payOutMethod='';//支付方式
//我的权限数组
var jName = getCookie('Jname');
var arrayTitle = new Array;


var repayment = {
	init:function(currentPage){
	    if($.trim(currentPage) == ''){
            currentPage = 1;
        }
        $("#thislist").html("");
        $.ajax({
            url: urlcore + "/api/payment/list?mobile=" + mobile + "&name=" + name + "&orderNo=" + orderNo + "&pageNum=" + currentPage+"&type="+type+"&payTime="+payTime+"&orderEffTime="+orderEffTime+"&payOutMethod="+payOutMethod+"&method="+method,
            type: "get",
            dataType: 'json',
            async:'false',
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                if(data.success == true) {
                    $.each(data.data.list, function(i, n) {
                        var thislist =
                            '<tr class="footable-even" style="display: table-row;">' +
                            '<td class="footable-visible">' + n.id + '</td>' +
                            '<td class="footable-visible">' + n.mobile + '</td>' +
                            '<td class="footable-visible">' + n.name + '</td>' +
                            '<td class="footable-visible">' + n.orderNo + '</td>' +
                            '<td class="footable-visible">' + n.amount + '</td>' +
                            '<td class="footable-visible">' + common.showTextFormatter(n.overdueMoney) + '</td>' +
                            '<td class="footable-visible">' + common.showTextFormatter(n.money) + '</td>' +
                            '<td class="footable-visible">' + common.showTextFormatter(n.extensionMoney) + '</td>' +
                            '<td class="footable-visible">' +common.showTextFormatter(n.subject)+ '</td>' +
                            '<td class="footable-visible">' + n.channel + '</td>' +
                            '<td class="footable-visible">' + n.payTime + '</td>' +
                            '<td class="footable-visible">' + n.orderEffTime + '</td>' +
                            '<td class="footable-visible">'+  n.orderExpTime+ '</td>'+
                        '</tr>';
                        $('#thislist').append(thislist);repayment
                    });
                    console.log(arrayTitle)
                    $.each(arrayTitle, function(i,k) {
                        $('button[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-sm btn-primary exportFile");
                    });
                    $('#totalMoney').text(data.data.totalMoney)
                    $("#pager").pager({
                        pagenumber: data.data.pageNum,
                        pagecount: data.data.pages,
                        totalcount: data.data.total,
                        buttonClickCallback: repayment.pageClick
                    });
                    $("#papercount").html(data.data.total)
                    if(data.code == 'OVERTIME') {
                        var thisUrl = window.location.href;
                        if(thisUrl.indexOf('login.html') <= -1) {
                            top.window.location.href = "login.html";
                        }
                    } else {
                        if(data.msg != '空数据') {
                            //alert(data.msg)
                        } else {
                            $('#thiscount').text(0);
                        }
                    }
                }
            },
            error: function() {
               alert("error");
            }
        });
	},
    pageClick:function(pageclickednumber){
	    repayment.init(pageclickednumber);
    },
    searchList:function(){
	    payTime = $('#begin').val();
        mobile = $('#jsmobile').val();
        name =$('#jsname').val();
        type = $('#jstype').val();
        method=$('#jsmethod').val();
        orderNo=$('#jsorder').val();
        // orderNo=$('#jsorderNo').val();//订单号
        // type =$('#jstype').val();//订单类型 1付款 2续期
        // payOutMethod=$('#jspayOutMethod').val();//支付方式 1银行卡，2支付宝 3线下人工
        repayment.init();
    },

    exportFile:function(){
        payTime = $('#begin').val();
        mobile = $('#jsmobile').val();
        name =$('#jsname').val();
        type = $('#jstype').val();
        method=$('#jsmethod').val();
        orderNo=$('#jsorder').val();
        // type =$('#jstype').val();//订单类型 1付款 2续期
        // payOutMethod=$('#jspayOutMethod').val();//支付方式 1银行卡，2支付宝 3线下人工
        window.location.href = urlcore + "/api/payment/ef?mobile=" + mobile + "&name=" + name + "&orderNo=" + orderNo +"&type="+type+"&payTime="+payTime+"&orderEffTime="+orderEffTime+"&payOutMethod="+payOutMethod;
    },

    findMyCatalogue:function(){
        $.ajax({
            url: urlcore + "/api/roleThirdCatalogue/findAllByUser?secondTitle="+jName,
            type: "GET",
            dataType: 'json',
            async: false,
            contentType: "application/json;charset=utf-8",
            success:function(data){
                if (data.success == true) {
                    $.each(data.data, function(i,n) {
                        arrayTitle.push(n.thirdCatalogue.title);
                    });
                } else {
                    alert(data.msg);
                }

            },
            error:function() {
                alert("error");
            }
        });
    }
}