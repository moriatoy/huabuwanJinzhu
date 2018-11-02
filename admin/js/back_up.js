
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

	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/backupCopy/selectBackupFile?pageNo=" + pageNo + "&pageSize=" + pageSize,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {

				if(data.success == true) {
					$.each(data.data.list, function(i, n) {
						var id = n.id;

						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
							'<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible">' + n.name + '</td>' +
							'<td class="footable-visible">' + n.gmtDatetime + '</td>' +
							'<td class="footable-visible footable-last-column">' +
							'<a  name="下载" class="" href="' + n.address + '">下载</a>&nbsp;&nbsp;' +
							'<a  name="删除" class="" href="" onclick="deleteOne(' + n.id + ')"> 删除</a>' + '</td>' + '</tr>';
						$('#thislist').append(thislist);
					});
					$.each(arrayTitle, function(i,k) {
						$('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
						$('a[data="'+k+'"]').attr("class","btn btn-sm btn-primary");
					});
				$("#pager").pager({
					pagenumber: pageNo, 
					pagecount:data.data.pages,
					totalcount:data.data.total,
					buttonClickCallback: PageClick
					}); 
				} else if(data.code == 'OVERTIME') {
					var thisUrl = window.location.href;

					if(thisUrl.indexOf('login.html') <= -1) {
						top.window.location.href = "login.html";
					}

				} else {
					if(data.msg != '空数据') {
						alert(data.msg)
					} else {
						$('#thiscount').text(0);
					}
				}

			},
			error: function() {
				alert("error");
			}
		});
	}
	PageClick = function(pageclickednumber) {
		init(pageclickednumber);
	}
}

function backup() {
	if(confirm("您确定备份吗 ？")) {
		$.ajax({
			url: urlcore + "/api/backupCopy/backup",
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					alert("备份成功！");

					loadMyEssay('');
				}
			},
			error: function() {

				alert("备份失败");
			}
		});
	}
}

function deleteOne(id) {
	if(confirm("您确定删除吗 ？")) {
		$.ajax({
			url: urlcore + "/api/backupCopy/deleteOne?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					alert("删除成功！");

					loadMyEssay('');
				}
			},
			error: function() {

				alert("删除失败");
			}
		});
	}

}
	


function getPath() {

	// var filePath =  $('#path').value;
	var filePath = document.getElementById("path").value;
	alert(filePath);
	if(confirm("您还原数据库吗 ？")) {
		$.ajax({
			url: urlcore + "/api/backupCopy/recover?path=" + filePath,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					alert("还原成功！");

					loadMyEssay('');
				}
			},
			error: function() {
				alert("还原失败！");
			}
		});
	}

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
