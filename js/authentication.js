
var id = getvl('id');
var userId = getvl('userId');
var status = getvl('status');


$(document).ready(function () {
	if (status == 1) {
		$('#changeStatusButton').attr('hidden',true).attr('class','');
		$('#changeStatusButton2').attr('hidden',true).attr('class','');
	}
	subMsg();
 	
});

//查询出被修改对象信息，填充表
function subMsg(marked){
	
    //获取商店信息
    $.ajax({
        url: urlcore + "/api/userBasicMsg/selectOneDetails?id="+id,
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success:function(data){
            if (data.success == true) {
            	var n = data.data;
            	$("#gmtDatetime").val(n.gmtDatetime);
            	$("#phone").val(n.user.phone);
            	$("#realName").val(n.user.userName);
            	$("#score").val(n.user.authScore);
            	$("#marry").val(n.marry);
            	$("#study").val(n.study);
            	$("#province").val(n.province);
            	$("#city").val(n.city);
            	$("#county").val(n.county);
            	$("#areaCode").val(n.areaCode);
            	$("#addressDetail").val(n.addressDetails);
            	$("#linkPersonNameOne").val(n.linkPersonNameOne);
            	$("#linkPersonPhoneOne").val(n.linkPersonPhoneOne);
            	$("#linkPersonRelationOne").val(n.linkPersonRelationOne);
            	$("#linkPersonNameTwo").val(n.linkPersonNameTwo);
            	$("#linkPersonPhoneTwo").val(n.linkPersonPhoneTwo);
            	$("#linkPersonRelationTwo").val(n.linkPersonRelationTwo);
                
            } else if (data.code == 'OVERTIME'){
                var thisUrl = window.location.href;
                if (thisUrl.indexOf('login.html') <= -1) {
                    top.window.location.href="login.html";
                }

            } else if(data.code == 'PARAMETER_INVALID') {
                var thisUrl = window.location.href;
                if (thisUrl.indexOf('login.html') <= -1) {
                    top.window.location.href="login.html";
                }
            }
            else {
                alert(data.msg);
            }

        },
        error:function() {
            /* Act on the event */
            alert("error");
        }
    });
}


//审核通过
function changeStatus(obj){
	if(!confirm("确定提交？")) {
		return;
	}
	$.ajax({
		url: urlcore + "/api/userBasicMsg/updateStatus?id="+id+"&status="+obj+"&userId="+userId,
		type: "get",
		dataType: 'json',		
		contentType: "application/json;charset=utf-8",
		success:function(data){
			if (data.success == true) {
				window.history.go(-1);
			} else if (data.code == 'OVERTIME'){
				var thisUrl = window.location.href;
				if (thisUrl.indexOf('login.html') <= -1) {
					top.window.location.href="login.html";
				}
			} else {
				alert(data.msg);
			}
		},
		error:function() {
			/* Act on the event */
			alert("error");
		}
	});	
	
}

