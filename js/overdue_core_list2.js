var limitPayTime = '';
var followType = '';
var days = '';
var orderNumber = '';
var phoneNumber = '';
var name = '';
var currentPage = 1;

var totalMoney = 0;
var totalPeople = 0;
var orderStatus = '';
var jName = getCookie('Jname');
var orderId = getvl('orderId');
var orderId = null;


var sessTime = window.sessionStorage.getItem("limitPayTime");
if (sessTime === "null" || sessTime === null) {
    limitPayTime = "";
} else {
    limitPayTime = window.sessionStorage.getItem("limitPayTime");
}
var sessFollowType = window.sessionStorage.getItem("followType");
if (sessFollowType === "null" || sessFollowType === null) {
    followType = "";
} else {
    followType = window.sessionStorage.getItem("followType");
}
var sessDays = window.sessionStorage.getItem("days");
if (sessDays === "null" || sessDays === null) {
    days = "";
} else {
    days = window.sessionStorage.getItem("days");
}
var sessPhone = window.sessionStorage.getItem("phoneNumber");
if (sessPhone === "null" || sessPhone === null) {
    phoneNumber = "";
} else {
    phoneNumber = window.sessionStorage.getItem("phoneNumber");
}
var sessUserName = window.sessionStorage.getItem("userName");
if (sessUserName === "null" || sessUserName === null) {
    name = "";
} else {
    name = window.sessionStorage.getItem("userName");
}
var sessGmtDatetime = window.sessionStorage.getItem("gmtDatetime");
if (sessGmtDatetime === "null" || sessGmtDatetime === null) {
    gmtDatetime = "";
} else {
    gmtDatetime = window.sessionStorage.getItem("gmtDatetime");
}
var sessPage = window.sessionStorage.getItem("page");
if (sessPage === "null" || sessPage === null) {
    currentPage = 1;
} else {
    currentPage = window.sessionStorage.getItem("page");
}


//我的权限数组
var arrayTitle = new Array;
loadMyEssay(limitPayTime, followType, days, orderNumber, phoneNumber, name, gmtDatetime);

// 请求数据
function loadMyEssay(limitPayTime, followType, days, orderNumber, phoneNumber, name ,gmtDatetime) {

    $(document).ready(function() {
        findMyCatalogue();
        init(currentPage);
    });
    function init(pageNo) {
        window.sessionStorage.setItem("limitPayTime",limitPayTime);
        document.getElementById("applyTime").value = limitPayTime;
        window.sessionStorage.setItem("followType",followType);
        document.getElementById("orderStatus").value = followType;
        window.sessionStorage.setItem("days",days);
        document.getElementById("day").value = days;
        window.sessionStorage.setItem("phoneNumber",phoneNumber);
        document.getElementById("phoneNumber").value = phoneNumber;
        window.sessionStorage.setItem("userName",name);
        document.getElementById("userName").value = name;
        window.sessionStorage.setItem("gmtDatetime",gmtDatetime);
        document.getElementById("gmtDatetime").value = gmtDatetime;
        window.sessionStorage.setItem("page",pageNo);
        $("#thislist").html("");
        $.ajax({
            url: urlcore + "/api/loanOrder/overdueCenterLoanOrder?limitPayTime=" + limitPayTime + "&followType=" + followType + "&days=" + days + "&phoneNext=" + gmtDatetime + "&phone=" + phoneNumber + "&name=" + name  + "&currentPage=" + pageNo,
            type: "get",
            async: 'false',
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                if (data.success === true) {
                    $("#number").text("总数："+data.data.pageDto.total+"人")
                    $.each(data.data.pageDto.list, function(i, n) {
                        var id = n.id;
                        var backHtml = "";
                        var disabled = "";
                        if(n.adminName == null){
                        }else if(n.adminName != null){
                            disabled ="disabled";
                        }else{
                        }
                        if(n.adminName){
                            backHtml ='<a hidden="" class="btn btn-primary btn-xs" name="退回" href="javascript:;" onclick="reback('+n.id+')">退回</a>&nbsp;';
                        }
                        var thislist =
                            '<tr class="footable-even" style="display: table-row;">' +
                            '<td class="footable-visible"><input type="checkbox" '+disabled+' value="' + n.id + '" name="selectcheck" /></td>' +
                            '<td class="footable-visible">' + n.id + '</td>' +
                            '<td class="footable-visible">' + n.phone + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + n.userName + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + time(n.limitPayTime) + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + n.needPayMoney + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + format(n.overdueDays) + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + format(n.phoneObj) + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + format(n.phoneFinish) + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + time(n.phoneTime) + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + n.phoneCount + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + n.phoneNext + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + format(n.adminName) + '</td>' +
                            '<td class="footable-visible footable-last-column" style="text-align: center">' +
                            backHtml+
                            // '<a hidden="hidden" class="" name="详情" href="overdue_topay_list_detail.html?id='+n.id+'" >操作</a>&nbsp;'+
                            '<a hidden="hidden" class="" name="操作" href="overdue_list_core.html?id=' + n.id + '" >操作</a>&nbsp;' +
                            '</tr>';
                        $('#thislist').append(thislist);
                    });
                    $.each(arrayTitle, function(i,k) {
                        if (k === "操作") {
                            $('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
                        } else {
                            $('div[name="'+k+'"]').attr("hidden",false);
                        }
                    });
                    $("#pager").pager({
                        pagenumber: pageNo,
                        pagecount: data.data.pageDto.pages,
                        totalcount: data.data.pageDto.total,
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
    }

    PageClick = function(pageclickednumber) {
        init(pageclickednumber);
    }

}

// 搜索
function searchList() {
    currentPage = 1;
    var gmtDatetime = $("#gmtDatetime").val();
    var userName = $('#userName').val();
    var phoneNumber = $('#phoneNumber').val();
    var orderNumber = $("#orderNumber").val();
    var day =$("#day"). val();
    var essay = $('#orderStatus').val();
    var time = $('#applyTime').val();
    loadMyEssay(time, essay, day, orderNumber, phoneNumber, userName, gmtDatetime);
}


// 导出
function exportFile() {
    var gmtDatetime = $("#gmtDatetime").val();
    var userName = $('#userName').val();
    var phoneNumber = $('#phoneNumber').val();
    var day =$("#day"). val();
    var essay = $('#orderStatus').val();
    var time = $('#applyTime').val();
    if(confirm("您确定导出吗？")) {
        window.location.href = urlcore + "/api/loanOrder/overdueCenterLoanOrderExport?limitPayTime=" + time + "&followType=" + essay + "&days=" + day + "&phoneNext=" + gmtDatetime + "&phone=" + phoneNumber + "&name=" + userName
    }
}
// 状态选择
// function selectOrdersStatus(orderStatus) {
//     loadMyEssay('', orderStatus, '', '', '', '' );
// }

// 选择
function selectAll(o) {
    var checks = $("input[name=selectcheck]").not(":disabled");
    if (checks.length > 0) {
        $.each(checks, function(i, elem) {
            $(elem).prop('checked', o.checked);
        });
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

// 分配人员列表
function fenpei2(id){
    orderId = id;
    $.ajax({
        url: urlcore + "/api/loanOrder/selectAllPressMoneyMan",
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            if(data.success == true) {
                var thislist='<option value="">请选择催收人</option>';
                $.each(data.data, function(i,n) {

                    thislist = thislist +
                        '<option value="'+n.id+'">'+n.userName+'</option>';

                });
                $("#jsfenPeiSelect").html(thislist);
            }
        },
        error: function() {
            /* Act on the event */
            alert("error");
        }
    });
}
function fenpeiqueren2(){
    var userId = $("#jsfenPeiSelect").val();
    if($.trim(userId) == ''){
        alert("请选择人员");
        return;
    }
    var checks = $('input[name=selectcheck]:checked');
    if(checks.length < 1){
        alert("请选择记录");
        return;
    }
    var orderIds ='';
    $.each(checks,function(i,elem){
        if($(elem).is(':checked')){
            orderIds +=$(elem).val()+",";
        }
    });
    orderIds = orderIds.slice(0,orderIds.length-1);
    $.ajax({
        url: urlcore + "/api/loanOrder/setUpPressMoneyMan?orderIds="+orderIds+"&userId="+userId,
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            location.reload()
        },
        error: function() {
            location.reload()
        }
    });
}

// 权限
function findMyCatalogue(){
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


/**
 * 退回
 * @param {} orderId
 */
function reback(orderId) {
    if (confirm("您确定退回吗？")) {
        $.ajax({
            url: urlcore + "/api/loanOrder/reback?orderId=" + orderId,
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                alert(data.msg);
                location.reload()
            },
            error: function() {
                /* Act on the event */
                console.log(data.msg);
                alert(data.msg);
            }
        });
    }
}