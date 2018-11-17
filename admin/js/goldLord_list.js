var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array;

$(function(){
    loadMyEssay();
});


function loadMyEssay() {
    $(document).ready(function() {
        findMyCatalogue();
        init(1);
    });
    //默认加载
    function init(pageNo){
        //获取用户信息列表
        $("#thislist").html("");
        $.ajax({
            url: urlcore + "/api/partner/getPartnerList",
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success:function(data){
                if (data.success == true) {
                    //i表示在data中的索引位置，n表示包含的信息的对象
                    $.each(data.data,function(i,n){
                        var id=n.id;
                        var thislist =
                            '<tr>'+
                            '	<td class="footable-visible">'+n.id+'</td>'+
                            '   <td class="footable-visible">'+n.partnerName+'</td>'+
                            // '	<td class="footable-visible footable-last-column">'+
                            // '		<a class="btn btn-primary btn-xs" onclick="configure(' + id + ')" >配置</a>'+
                            // '	</td>'+
                            '</tr>';
                        $('#thislist').append(thislist);
                    });
                    $.each(arrayTitle, function(i,k) {
                        $('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
                        $('a[data="'+k+'"]').attr("class","btn btn-sm btn-primary");
                    });
                } else if (data.code == 'OVERTIME'){
                    var thisUrl = window.location.href;
                    if (thisUrl.indexOf('login.html') <= -1) {
                        top.window.location.href="login.html";
                    }

                } else {
                    if (data.msg != '空数据') {
                        alert(data.msg)
                    }else{
                        $('#thiscount').text(0);
                    }
                }

            },
            error:function() {
                /* Act on the event */
                alert("error");
            }
        });
    }
    //回调函数
    PageClick = function(pageclickednumber) {
        init(pageclickednumber);
    }

}
function departmentAdd(){
    var limitDays = $('#limitDays').val();
    if(limitDays==''){
        alert("贷款期限不能为空！");
        return false;
    }
    var minBorrowMoney = $('#minBorrowMoney').val();
    if(minBorrowMoney==''){
        alert("最小贷款金额不能为空！");
        return false;
    }
    var maxBorrowMoney = $('#maxBorrowMoney').val();
    if(maxBorrowMoney==''){
        alert("最大贷款金额不能为空！");
        return false;
    }
    var interestPercent = $('#interestPercent').val();
    if(interestPercent==''){
        alert("利息不能为空！");
        return false;
    }
    var placeServePercent = $('#placeServePercent').val();
    if(placeServePercent==''){
        alert("平台服务费不能为空！");
        return false;
    }
    var msgAuthPercent = $('#msgAuthPercent').val();
    if(msgAuthPercent==''){
        alert("信息认证费不能为空！");
        return false;
    }
    var riskServePercent = $('#riskServePercent').val();
    if(riskServePercent==''){
        alert("风控服务费不能为空！");
        return false;
    }
    var riskPlanPercent = $('#riskPlanPercent').val();
    if(riskPlanPercent==''){
        alert("风险准备金不能为空！");
        return false;
    }
    var allowDays = $('#allowDays').val();
    if(allowDays==''){
        alert("容限期不能为空！");
        return false;
    }
    var allowPercent = $('#allowPercent').val();
    if(allowPercent==''){
        alert("容限期日利率不能为空！");
        return false;
    }
    var overduePercent = $('#overduePercent').val();
    if(overduePercent==''){
        alert("逾期日利率不能为空！");
        return false;
    }
    // 时间
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var gmtDatetime = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    var notifyUnitMoney = $('#notifyUnitMoney').val();
    if(notifyUnitMoney==''){
        alert("云片通知短信不能为空！");
        return false;
    }
    var verificationUnitMoney = $('#verificationUnitMoney').val();
    if(verificationUnitMoney==''){
        alert("云片验证码不能为空！");
        return false;
    }
    var yysUnitMoney = $('#yysUnitMoney').val();
    if(yysUnitMoney==''){
        alert("网盾运营商不能为空！");
        return false;
    }
    var tbUnitMoney = $('#tbUnitMoney').val();
    if(tbUnitMoney==''){
        alert("网盾淘宝不能为空！");
        return false;
    }
    var faceUnitMoney = $('#faceUnitMoney').val();
    if(faceUnitMoney==''){
        alert("有盾活体不能为空！");
        return false;
    }
    var bankUnitMoney = $('#bankUnitMoney').val();
    if(bankUnitMoney==''){
        alert("有盾银行卡不能为空！");
        return false;
    }



    var firstBorrowMoney = $('#firstBorrowMoney').val();
    if(firstBorrowMoney==''){
        alert("最低档不能为空！");
        return false;
    }
    var secondBorrowMoney = $('#secondBorrowMoney').val();
    if(secondBorrowMoney==''){
        alert("二档不能为空！");
        return false;
    }
    var thirdBorrowMoney = $('#thirdBorrowMoney').val();
    if(thirdBorrowMoney==''){
        alert("三档不能为空！");
        return false;
    }
    var fourthBorrowMoney = $('#fourthBorrowMoney').val();
    if(fourthBorrowMoney==''){
        alert("最高档不能为空！");
        return false;
    }
    var userEdu = $('#userEdu').val();
    if(userEdu==''){
        alert("提额不能为空！");
        return false;
    }
    var vipEdu = $('#vipEdu').val();
    if(vipEdu==''){
        alert("白名单用户初始额度不能为空！");
        return false;
    }
    var phone = $("#phone").val();
    var wx = $("#wx").val();

    var partnerName = $('#partnerName').val();
    if(partnerName==''){
        alert("账号昵称不能为空！");
        return false;
    }
    var adminName = $('#adminName').val();
    if(adminName==''){
        alert("后台账号不能为空！");
        return false;
    }
    var password = $('#password').val();
    if(password==''){
        alert("密码不能为空！");
        return false;
    }
    $.ajax({
        url: urlcore + "/api/partner/addPartner?partnerName="+partnerName+"&notifyUnitMoney="+notifyUnitMoney+"&verificationUnitMoney="+verificationUnitMoney+"&yysUnitMoney="+yysUnitMoney+"&tbUnitMoney="+tbUnitMoney+"&faceUnitMoney="+faceUnitMoney+"&bankUnitMoney="+bankUnitMoney+"&firstBorrowMoney="+firstBorrowMoney+"&secondBorrowMoney="+secondBorrowMoney+"&thirdBorrowMoney="+thirdBorrowMoney+"&fourthBorrowMoney="+fourthBorrowMoney+"&userEdu="+userEdu+"&phone="+phone+"&wx="+wx+"&vipEdu="+vipEdu+"&adminName="+adminName+"&password="+password,
        type: "post",
        data: JSON.stringify({
            "limitDays": limitDays,
            "minBorrowMoney": minBorrowMoney,
            "maxBorrowMoney": maxBorrowMoney,
            "interestPercent": interestPercent,
            "placeServePercent": placeServePercent,
            "msgAuthPercent": msgAuthPercent,
            "riskServePercent": riskServePercent,
            "riskPlanPercent": riskPlanPercent,
            "allowDays": allowDays,
            "allowPercent": allowPercent,
            "overduePercent": overduePercent,
            "gmtDatetime": gmtDatetime
        }),
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            if(data.success == true) {
                alert('新增成功');
                loadMyEssay();
            } else if(data.code == 'OVERTIME') {
                var thisUrl = window.location.href;
                if(thisUrl.indexOf('login.html') <= -1) {
                    top.window.location.href = "login.html";
                }
            } else {
                alert(data.msg);
            }
        },
        error: function() {
            alert("error");
        }

    });

}
function configure (id){
    $('#minBorrowMoney').val("1000");
    $('#maxBorrowMoney').val("2500");
    $('#interestPercent').val("20");
    $('#placeServePercent').val("6");
    $('#msgAuthPercent').val("6");
    $('#riskServePercent').val("6");
    $('#riskPlanPercent').val("5");
    $('#allowDays').val("3");
    $('#allowPercent').val("0");
    $('#overduePercent').val("0");
    $('#notifyUnitMoney').val("0.05");
    $('#verificationUnitMoney').val("0.05");
    $('#yysUnitMoney').val("0.15");
    $('#tbUnitMoney').val("0.3");
    $('#faceUnitMoney').val("0.3");
    $('#bankUnitMoney').val("0.5");
    $('#firstBorrowMoney').val("800");
    $('#secondBorrowMoney').val("1000");
    $('#thirdBorrowMoney').val("1200");
    $('#fourthBorrowMoney').val("1500");
    $('#userEdu').val("100");
    $('#vipEdu').val("1500");
    $('#partnerName').val("");
    $('#adminName').val("");
    $('#password').val("");
}

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