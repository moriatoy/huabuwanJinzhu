
var id = getvl('id');


$(document).ready(function () {
	subMsg();
 	
});

//查询出被修改对象信息，填充表
function subMsg(marked){
	
    //获取商店信息
    $.ajax({
        url: urlcore + "/api/userIdentity/selectOne?id="+id,
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success:function(data){
            if (data.success == true) {
            	var n = data.data;
            	$("#gmtDatetime").val(n.gmtDatetime);
            	$("#realName").val(n.userName);
            	$("#cardNum").val(n.identityNum);
            	var url1 = imgPath+n.identityFront;
            	var url2 = imgPath+n.identityBack;
            	var url3 = imgPath+n.faceUrl;
                var imgStr1 = '';
                var imgStr2 = '';
                var imgStr3 = '';
                if (url1 != null && url1 != '') {
                	imgStr1 += "<img style='padding: 5px 5px 5px 5px;' width='250px' height='250px' src='"+url1+"'>";
                }
                if (url2 != null && url2 != '') {
                	imgStr2 += "<img style='padding: 5px 5px 5px 5px;' width='250px' height='250px' src='"+url2+"'>";
                }
                if (url3 != null && url3 != '') {
                	imgStr3 += "<img style='padding: 5px 5px 5px 5px;' width='250px' height='250px' src='"+url3+"'>";
                }
                $('#path1').html(imgStr1);
                $('#path2').html(imgStr2);
                $('#path3').html(imgStr3);
                
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

