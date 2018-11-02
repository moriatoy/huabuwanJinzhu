var id='';

function subMsg(){
	
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
            
            
            
     $.ajax({
        url:  urlcore +"/api/paramSetting/add",
        type: "post",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
            "id": id,
            "limitDays":limitDays,
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
        dataType: "json",
        success:function(data){
            if (data.success == true) {
                
                    alert("新增成功！");
                    //跳转列表页
                    window.location.href = "param_setting_list.html";
                  } else if (data.code == 'OVERTIME') {
                var thisUrl = window.location.href;
                if (thisUrl.indexOf('login.html') <= -1) {
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
