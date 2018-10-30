//
var partnerId = "";
// 请求数据
init();
function init() {
    window.onload = function(){
        loadMyEssay();
    };
}
function loadMyEssay() {
    // 获取渠道数据
    $.ajax({
        url: urlcore + "/api/partner/getPayList",
        type: "GET",
        dataType: 'json',
        async: false,
        contentType: "application/json;charset=utf-8",
        success:function(data){
            if (data.success == true) {
                $("#tishiList").html("");
                $.each(data.data, function(i, n) {
                    var tishiList =
                        "<li>" +
                        "   <label>用户：</label>" +
                        "   <span>"+n.partnerName+"</span>" +
                        "   <label>余额：</label>" +
                        "   <span>"+n.nowMoney+"</span>" +
                        "   <button class='btn btn-primary' data-toggle='modal' data-target='#Recharge' onclick='rechargeFun("+n.partnerId+")'>充值</button>" +
                        "</li>";
                    $("#tishiList").append(tishiList);
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
function rechargeFun(id) {
    $("#money").val("");
    partnerId = id;
}
function recharge() {
    if ($("#money").val().length === 0) {
        alert("请输入金额")
    } else {
        console.log(partnerId);
        console.log();
        // 充值
        $.ajax({
            url: urlcore + "/api/partner/addThirdMoney?partnerId=" + partnerId + "&payMoney=" + $("#money").val(),
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                if (data.data === "ok") {
                    alert("充值成功");
                    loadMyEssay();
                } else {
                    alert(data.msg)
                }
            },
            error: function() {
                alert('服务端错误');
            }
        });
    }
}