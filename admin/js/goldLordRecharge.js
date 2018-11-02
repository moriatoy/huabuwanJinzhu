//
var partnerId = "";
var currentPage=1;
var sessPage = window.sessionStorage.getItem("page");
if (sessPage === "null" || sessPage === null) {
    currentPage = 1;
} else {
    currentPage = window.sessionStorage.getItem("page");
}
// 请求数据
init();
function init() {
    window.onload = function(){
        loadMyEssay();
        initData(currentPage);
    };
}
function loadMyEssay() {
    // 获取渠道数据
    $.ajax({
        url: urlcore + "/api/partner/getThirdUseRecord",
        type: "GET",
        dataType: 'json',
        async: false,
        contentType: "application/json;charset=utf-8",
        success:function(data){
            if (data.success == true) {
                $("#notifyNumber").text(data.data[0].notifyNumber);
                $("#verificationNumber").text(data.data[0].verificationNumber);
                $("#yysNumber").text(data.data[0].yysNumber);
                $("#tbNumber").text(data.data[0].tbNumber);
                $("#faceNumber").text(data.data[0].faceNumber);
                $("#bankNumber").text(data.data[0].bankNumber);
                $("#nowMoney").text(data.data[0].nowMoney);
            } else {
                alert(data.msg);
            }
        },
        error:function() {
            alert("error");
        }
    });
}
function initData(pageNo) {
    // 获取充值记录
    window.sessionStorage.setItem("page",pageNo);
    $("#dataList").html("");
    $.ajax({
        url: urlcore + "/api/partner/getThirdPayRecord?pageSize=10&pageNo=" + pageNo,
        type: "get",
        async:'false',
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            if(data.success == true) {
                $.each(data.data.list, function(i, n) {
                    var thislist =
                        '<tr class="footable-even" style="display: table-row;">' +
                        '   <td class="footable-visible">' + n.createTime + '</td>' +
                        '   <td class="footable-visible" style="text-align: center">' + n.payMoney + '</td>' +
                        '</tr>';
                    $('#dataList').append(thislist);
                });
                $("#pager").pager({
                    pagenumber: pageNo,
                    pagecount: data.data.pages,
                    totalcount: data.data.total,
                    buttonClickCallback: PageClick
                });
            }

        },
        error: function() {
            alert("error");
        }
    });
}
PageClick = function(pageclickednumber) {
    initData(pageclickednumber);
};