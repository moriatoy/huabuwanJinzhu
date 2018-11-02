var currentPage = 1;
var paytime ='';
var orderExpTime='';
var status=0;
var orderNo='';//订单号
var name='';
var mobile='';
var dataend=null;
$(function($){
        recive.init();
    })
var recive = {
    
	init:function(currentPage){
	    if($.trim(currentPage) == ''){
            currentPage = 1;
        }
        $("#thislist").html("");
        $.ajax({
            url: urlcore + "/api/payment/wm",
            // url: urlcore + "/api/user/accountchecking?begin=" + begin + "&payOutMethod=" + payOutMethod + "&payOutType=" + payOutType + "&currentPage=" + currentPage,
            type: "get",
            dataType: 'json',
            data:{
                mobile:mobile,
                name:name,
                status:status,
                paytime:paytime,
                orderExpTime:orderExpTime,
                orderNo:orderNo,
                pageNum:currentPage
            },
            async:'false',
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                 dataend={
                        mobile:mobile,
                        name:name,
                        status:status,
                        paytime:paytime,
                        orderExpTime:orderExpTime,
                        orderNo:orderNo,
                        pageNum:currentPage
                    }
                if(data.success == true) {
                    $.each(data.data.list, function(i, n) {
                        var thislist =
                            '<tr class="footable-even" style="display: table-row;">' +
                            '<td class="footable-visible">' + n.id + '</td>' +
                            '<td class="footable-visible">' + n.mobile + '</td>' +
                            '<td class="footable-visible">' + n.userName + '</td>' +
                            '<td class="footable-visible">' + n.lianPayNum + '</td>' +
                            '<td class="footable-visible">' + n.bankCardNum + '</td>' +
                            '<td class="footable-visible">' + n.limitDays + '</td>' +
                            '<td class="footable-visible">' + n.borrowMoney + '</td>' +
                            '<td class="footable-visible">' + n.realMoney + '</td>' +
                            '<td class="footable-visible">' + n.wateMoney + '</td>' +
                            '<td class="footable-visible">' + n.needPayMoney+ '</td>' +
                            '<td class="footable-visible">'+  n.giveTime+ '</td>'+
                            '<td class="footable-visible">'+ n.beginTime+ '</td>'+
                            '<td class="footable-visible">'+ n.endTime+ '</td>'+
                            '<td class="footable-visible">'+ n.status+ '</td>'+
                            '<td class="footable-visible">'+ n.overdueDays+ '</td>'+
                            '<td class="footable-visible">'+ n.overdueMoney+ '</td>'+
                             '<td class="footable-visible">'+ n.check1+ '</td>'+
                            '<td class="footable-visible">'+ n.check2+ '</td>'+
                        '</tr>';
                        $('#thislist').append(thislist);
                    });
                    $('#totalMoney').text(data.data.totalMoney)
                    $("#pager").pager({
                        pagenumber: currentPage,
                        pagecount: data.data.pages,
                        totalcount: data.data.total,
                        buttonClickCallback: recive.pageClick
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
                            $("#papercount").html()
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
	    recive.init(pageclickednumber);
    },
    searchList:function(){
        status = $('#jstype').val() ? $('#jstype').val() : 0;
        name=$('#jsname').val();
        mobile=$('#jsmobile').val();
        paytime =$('#begin').val();
        orderExpTime=$("#orderend").val();
        orderNo=$('#jsorder').val();
        if(status!=dataend.status || name!=dataend.name || mobile!=dataend.mobile || paytime!=dataend.paytime || orderExpTime!=dataend.orderExpTime || orderNo!=dataend.orderNo || currentPage!=dataend.pageNum){
           recive.init(); 
        }
        
    },

    exportFile:function(){
        status = $('#jstype').val() ? $('#jstype').val() : 0;
        name=$('#jsname').val();
        mobile=$('#jsmobile').val();
        paytime =$('#begin').val();
        orderExpTime=$("#orderend").val();
        orderNo=$('#jsorder').val();
        window.location.href = urlcore + "/api/payment/wmef?paytime=" +paytime + "&orderExpTime=" + orderExpTime + "&status=" + status+"&name="+name+"&mobile="+mobile+"&orderNo="+orderNo;
    }
}