
var id = getvl('id');
$(document).ready(function () {
	if (id != '') {
		subMsg();
	}
});

//查询出被修改对象信息，填充表
function subMsg(marked){
	
    //获取商店信息
    $.ajax({
        url: urlcore + "/api/coupon/selectOne?id="+id,
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success:function(data){
            if (data.success == true) {
            	var n = data.data;
            	$("#thisId").text(n.id);
            	$("#typeId").val(n.type);
            	$("#coupouName").val(n.coupouName);
            	$("#money").val(n.saveMoney);
            	$("#validTime").val(n.validTime);
            	$("#getLimit").val(n.getLimit);
            	$("#allMount").val(n.allMount);
            	$("#gmtDatetime").val(n.gmtDatetime);
            	$("#uptDatetime").val(n.uptDatetime);
            	$("#useMount").val(n.useMount);
            	
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


function goSubMsg() {
	
    var id = $('#thisId').text();   
    if (id=='') {
        id = null;
    }
    
    //类型
    var typeId = $("#typeId").val();
    if(typeId == -1){
    	alert("请选择类型！");
    	return false;
    }   
	//名称
    var coupouName = $('#coupouName').val();
    if(!checkIsEmpty(coupouName,"名称为空！")){
    	return false;
    }
    //金额
    var saveMoney = $('#money').val();
    if(!checkIsEmpty(saveMoney,"真实姓名为空！")){
    	return false;
    }
    //时长
    var validTime = $('#validTime').val();
    if (Number(validTime) < 0) {
    	alert("时长不正确");
    	return false;
    }
    
	if(!confirm("确认提交？")){
    	return;
    }
	
	var urlPath = urlcore + "/api/coupon/update";
	if(id == null){
		urlPath = urlcore + "/api/coupon/add";
	}
	
    $.ajax({
        url: urlPath,
        type: "post",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
            "id": id,
            "type": typeId,
            "coupouName": coupouName,
            "saveMoney": saveMoney,
            "validTime":validTime,
        }),
        dataType: "json",
        success:function(data){
            if (data.success == true) {
                if (id != null) {
                	javascript:history.back(-1)
                }else{
                    if (confirm("添加成功，是否继续添加？")) {
                        //刷新
                        location.reload();
                    } else {
                        //跳转列表页
                       javascript:history.back(-1)
                    }
                } 
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

