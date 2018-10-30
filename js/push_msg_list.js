//var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array;

loadMyEssay();
//默认加载  

function loadMyEssay() {
	$(document).ready(function() {
		//设置默认第1页
		init(1);
	});

	function init(pageNo) {
		//获取信息列表
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/pushMsg/selectPage?pageNo=" + pageNo + "&pageSize=" + pageSize,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					//i表示在data中的索引位置，n表示包含的信息的对象
					$.each(data.data.list, function(i, n) {
						var id = n.id;
						
						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
							'<td class="footable-visible"><input type="checkbox" onclick="arrayAdd(this)" id="' + n.id + '"/></td>' +
							'		<td>' + id + '</td>' +
							'		<td>' + n.title + '</td>' +
							'		<td>' + n.content + '</td>' +
							'		<td>' + n.gmtDatetime + '</td>' +
							'		<td>' +
							'           <a class="btn btn-primary btn-xs"  name="推送" href="push_some_user.html?id='+n.id+'">部分推送</a>' +
							'           <a class="btn btn-primary btn-xs"  name="推送" href="javascript:;" onclick="sendMsgToAll(' + n.id + ')">全部推送</a>' +
							'           <a class="btn btn-primary btn-xs"  name="修改" href="push_msg_add.html?id=' + id + '"> 修改</a>' + '&nbsp' +
							'           <a class="btn btn-primary btn-xs"  name="删除" href="javascript:;" onclick="deleteeach(' + n.id + ')">删除</a>' + '&nbsp' +
							'		</td>' +
							'	</tr>';
						$('#thislist').append(thislist);
					});
					$.each(arrayTitle, function(i, k) {
						$('a[name="' + k + '"]').attr("hidden", false).attr("class", "btn btn-primary btn-xs");
					});
					$('#thiscount').text(data.data.total);
					$("#pager").pager({
						pagenumber:pageNo,
						pagecount: data.data.pages,
						totalcount: data.data.total,
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
	//回调函数  
	PageClick = function(pageclickednumber) {
		init(pageclickednumber);
	}
}




function deleteeach(id) {
	if(confirm("您删除这条信息吗？")){
	$.ajax({
		url: urlcore + "/api/pushMsg/deleteOne?id=" + id,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success: function(data) {
			if(data.success == true) {
				location.reload();
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
}
function sendMsgToAll(id) {
	if(confirm("您推送这条信息吗？")){
	$.ajax({
		url: urlcore + "/api/pushMsg/sendMsgToAll?id=" + id,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success: function(data) {
			if(data.success == true) {
				alert(data.msg);
				location.reload();
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
}


/*
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
} */