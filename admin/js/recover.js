$(document).ready(function() {
	//初始化文件输入框
	initFileInput("messUrl", urlcore + "/api/attachment1/upload", "#messUrlUrl");

	var id = getvl("id");
	if(id != '') {
		$.ajax({
			url: urlcore + "/api/eachPicture/selectOne?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					var da = data.data;
					//旧图
					$('#jiu_picture_div').css("display", "block");
					var messUrlUrl = da.imgUrl;
					var imgStr1 = '';
					if(messUrlUrl != null && da.messUrlUrl != '') {
						var imgarr = messUrlUrl.split("***");
						$.each(imgarr, function(index, value) {
							imgStr1 +=
								'<div style="position:relative;width:250px;height:250px;float:left;" display="block">' +
								'	<span onclick="removeStrHtml(this)" style="position:absolute;top:10px;right:10px;font-size:20px;color:#f00;" class="glyphicon glyphicon-trash" aria-hidden="true">' +
								'	</span>' +
								'	<img style="padding: 5px 5px 5px 5px;" width="250px" height="250px" src="' + value + '">' +
								'</div>';
						});
					}
					$('#messUrlUrl').html(imgStr1);
					$('#linkUrl').val(da.linkUrl);
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
	
	var linkUrl = $("#linkUrl").val();
	//照片地址
	var messUrlUrl = "";
	$("#messUrlUrl img").each(function(index, item) {
		messUrlUrl += $(this).attr("src") + "***";
	});
	messUrlUrl = messUrlUrl.substring(0, messUrlUrl.length - 3);
	$.ajax({
		url: urlcore +"/api/backupCopy/recover?path="+messUrlUrl,
			dataType: 'json',
			type:'get',
			contentType: "application/json;charset=utf-8",
			success:function(data){
				if(data.success == true) {
					alert("还原成功！");
					window.location.href = "back_up.html";
			     
			    }
			},
			error:function() {
				alert("还原失败！");
			}
		});	
}