var limitPayTime = '';
var phoneNumber = '';
var name = '';
var currentPage = 1;
var id = getvl('id');

var totalMoney = 0;
var totalPeople = 0;
var orderStatus = '';
var jName = getCookie('Jname');
var orderId = getvl('orderId');
var orderId = null;


//我的权限数组
var arrayTitle = new Array;
loadMyEssay(id, limitPayTime, phoneNumber, name);

var state = getvl('state');

// 请求数据
function loadMyEssay(id,limitPayTime, phoneNumber, name) {

    $(document).ready(function() {
        findMyCatalogueChange();
        init(currentPage);
        if (state == "1") {
            $("#stateOne").css({"display":"block"});
            $("#stateTwo").css({"display":"none"});
        } else {
            $("#stateOne").css("display","none");
            $("#stateTwo").css("display","inline-block");
        }
    });
    function init(pageNo) {
        $("#thislist").html("");
        $.ajax({
            url: urlcore + "/api/collection/statistics/detailList?id="+id+"&gmtDatetime=" + limitPayTime + "&mobile=" + phoneNumber + "&name=" + name  + "&pageNum=" + pageNo,
            type: "get",
            async: 'false',
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                if (data.success === true) {
                    $.each(data.data.list, function(i, n) {
                        var backHtml = "";
                        var disabled = "";
                        if(n.adminName == null){
                        }else if(n.adminName != null){
                            disabled ="disabled";
                        }else{
                        }
                        if ($.trim(n.pressCharge) != '') {
                            backHtml = '<a hidden="hidden" class="" name="退回" href="javascript:;" onclick="reback(' + n.id + ')">退回</a>&nbsp;';
                        }
                        var thislist =
                            '<tr class="footable-even" style="display: table-row;">' +
                            '<td class="footable-visible">' + n.loanOrderId + '</td>' +
                            '<td class="footable-visible">' + n.name + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + n.mobile + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + n.payTime + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + n.channel + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + format(n.orderEffTime) + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + format(n.subject) + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + format(n.basicMoney) + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + format(n.overdueMoney) + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + format(n.needPayMoney) + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + format(n.amount) + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + format(n.pressName) + '</td>' +
                            '</tr>';
                        $('#thislist').append(thislist);
                    });
                    $.each(arrayTitle, function(i,k) {
                        console.log(k)
                        $('div[name="'+k+'"]').attr("hidden",false);
                    });
                    $("#pager").pager({
                        pagenumber: pageNo,
                        pagecount: data.data.pages,
                        totalcount: data.data.total,
                        buttonClickCallback: PageClick
                    });
                    if (data.code == 'OVERTIME') {
                        var thisUrl = window.location.href;
                        if (thisUrl.indexOf('login.html') <= -1) {
                            top.window.location.href = "login.html";
                        }
                    } else {
                        if (data.msg != '空数据') {
                            // alert(data.msg)
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

        // 获取总的
        $.ajax({
            url: urlcore + "/api/collection/statistics/detailOne?id=" + id + "&gmtDatetime=" + limitPayTime + "&mobile=" + phoneNumber + "&name=" + name,
            type: "GET",
            dataType: 'json',
            async: false,
            contentType: "application/json;charset=utf-8",
            success:function(data){
                console.log(data)
                if (data.success == true) {
                    $("#cuihuiOrderCount").text(data.data.cuihuiOrderCount);
                    $("#totalMoney").text(data.data.totalMoney);
                    $("#baseTotalMoney").text(data.data.baseTotalMoney);
                    $("#overduTotalMoney").text(data.data.overduTotalMoney);
                    $("#xuqiTotalMoney").text(data.data.xuqiTotalMoney);
                } else {
                    alert(data.msg);
                }
            },
            error:function() {
                alert("error");
            }
        });
    }

    PageClick = function(pageclickednumber) {
        init(pageclickednumber);
    }

}

// 返回
function callBack(){
    window.history.go(-1);
}

// 搜索
function searchList() {
    currentPage = 1;
    var userName = $('#userName').val();
    var phoneNumber = $('#phoneNumber').val();
    var time = $('#applyTime').val();
    loadMyEssay(id, time, phoneNumber, userName);
}


// 导出
function exportFile() {
    var userName = $('#userName').val();
    var phoneNumber = $('#phoneNumber').val();
    var time = $('#applyTime').val();
    if(confirm("您确定导出吗？")) {
        window.location.href = urlcore + "/api/collection/statistics/detail/ef?id="+id+"&gmtDatetime=" + time + "&mobile=" + phoneNumber + "&name=" + userName
    }
}

// 时间格式化
function time(val) {
    if (val != null) {
        var date = new Date(val);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + r(date.getHours()) + ':' + r(date.getMinutes()) + ':' + r(date.getSeconds());
    } else {
        return "-"
    }
}
function r(item) {
    return item < 10 ? '0' + item : item;
}
// 如果无参数数
function format(item) {
    return item ? item : '-';
}

// 权限
function findMyCatalogueChange(){
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