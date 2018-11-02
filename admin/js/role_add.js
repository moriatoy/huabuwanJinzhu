var roleId = getvl('roleId');
if (roleId != "") {
	$('#titleN').text("角色修改");
}
var roleName = getvl('roleName');
$('#roleName').val(roleName);
// $('#roleName').val("超级管理员");
var myArray = new Array;
function roleAdd(){
	var ids="[";
	$.each(myArray, function(i,n) {
		if (i != 0) {
			ids+=",";
		}
		ids+=n;
	});
	ids+="]";
	var title=$('#roleName').val();
	if (title == "" || ids == "[]") {
		if (roleId == "") {
			alert("信息不完整/功能未选择");
			return;
		}
	}
	$.ajax({
		url: urlcore + "/api/roleThirdCatalogue/addList?title="+title+"&roleId="+roleId,
		type: "post",
		data:ids,
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success:function(data){
			console.log(data)
			if (data.success == true) {
				location.href="role_jurisdiction_list.html";
			} else {
				alert(data.msg);
			}
		},
		error:function() {
			alert("error");
		}
	});
}
	
findMy()	
function findMy(){
	if (roleId == "") {
		return;
	}
	$.ajax({
		url: urlcore + "/api/roleThirdCatalogue/findByPage?pageNo=1&pageSize=999&roleId="+roleId,
		type: "post",
		dataType: 'json',
		data:JSON.stringify({
			"title":"",
			"second":{
				"title":"",
				"first":{
					"title":"",
				}
			}
		}),
		contentType: "application/json;charset=utf-8",
		success:function(data){
			if (data.success == true) {
				$.each(data.data.list, function(i,n) {
					var a = $('div[name="55"]');
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

