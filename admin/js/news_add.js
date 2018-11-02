var type0 = '';

$(document).ready(function() {
	//初始化文件输入框
	initMySummernote("content");

	var id = getvl("id");

	if(id != '') {
		$.ajax({
			url: urlcore + "/api/helpCenter/selectOne?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					var da = data.data;
					$('#newsTitle').val(da.title);
					$("#type").val(da.type);
					$('#content').summernote("code", da.content);
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
				/* Act on the event */
				alert("error");
			}
		});
	}
});

function release() {
	var id = getvl("id");
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var gmtDatetime = date.getFullYear() + seperator1 + month + seperator1 + strDate +
		" " + date.getHours() + seperator2 + date.getMinutes() +
		seperator2 + date.getSeconds();

	var title = $('#newsTitle').val();
	if(title == '') {
		alert("标题不能为空！");
		return false;
	}
	var type = $("#type").val();
	if(type == '') {
		alert("请选择类型！");
		return false;
	}
	var content = $('#content').summernote('code');

	if($('#content').summernote('isEmpty')) {
		alert('内容不能为空！');
		return false;
	}
	var url = "";
	if(id !== "") {
		url = "/api/helpCenter/update";
	} else {
		url = "/api/helpCenter/add";
	}

	$.ajax({
		url: urlcore + url,
		type: "post",
		data: JSON.stringify({
			"id": id,
			"title": title,
			"content": content,
			"type": type,
			"gmtDatetime": gmtDatetime
		}),
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success: function(data) {
			if(data.success == true) {
				if(id != "") {
					alert('修改成功');
					window.location.href = "news_type_list.html";
				} else {
					if(confirm("添加成功，是否继续添加？")) {
						//刷新
						location.reload();
					} else {
						//跳转列表页
						window.location.href = "news_type_list.html";
					}
				}
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