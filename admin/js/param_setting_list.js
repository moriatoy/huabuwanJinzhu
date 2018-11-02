var status = '';
var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array; 
loadMyEssay(status);
function loadMyEssay(status) {
	findMyCatalogue();
	$("#thislist").html("");
	$.ajax({
		url: urlcore + "/api/paramSetting/selectAllType?status=" + status,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success: function(data) {
 
			if(data.success == true) {
				$.each(data.data.list, function(i, n) {
					var id = n.id;
					var status = "";

					if(n.status == 1) {
						status = "可用";
					} else if(n.status == 2) {
						status = "已禁用";
					}
					var thislist =
						'<tr class="footable-even" style="display: table-row;">' +
						'<td class="footable-visible">' + n.id + '</td>' +
						'<td class="footable-visible">' + n.limitDays + '</td>' +
						'<td class="footable-visible">' + n.interestPercent + '</td>' +
						'<td class="footable-visible">' + n.placeServePercent + '</td>' +
						'<td class="footable-visible">' + n.msgAuthPercent + '</td>' +
						'<td class="footable-visible">' + n.riskServePercent + '</td>' +
						'<td class="footable-visible">' + n.riskPlanPercent + '</td>' +
						'<td class="footable-visible">' + n.allowDays + '</td>' +
						'<td class="footable-visible">' + n.allowPercent + '</td>' +
						'<td class="footable-visible">' + n.overduePercent + '</td>' +
						'<td class="footable-visible">' + new Date(n.gmtDatetime).pattern("yyyy-MM-dd hh:mm:ss") + '</td>' +
						'<td class="footable-visible">' + status + '</td>' +
						'<td class="footable-visible footable-last-column">'+
							'<a hidden="hidden" class="" name="修改" href="modify_param_setting.html?id='+n.id+'">修改</a>&nbsp;'+
							'<a hidden="hidden" class="" name="禁用" href="javascript:;" onclick="thisStopUsing(' + id + ')">禁用</a>&nbsp;'+
							'<a hidden="hidden" class="" name="删除" href="javascript:;" onclick="thisDelete(' + id + ')">删除</a></td>' +
						'</tr>';
					$('#thislist').append(thislist);

				});
				$.each(arrayTitle, function(i,k) {
					$('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
					$('a[data="'+k+'"]').attr("class","btn btn-sm btn-primary");
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

function thisDelete(id) {
	if(confirm("您确定要删除该贷款类型吗？")) {
		$.ajax({
			url: urlcore + "/api/paramSetting/GoDeleteUpdate?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				loadMyEssay('');
			},
			error: function() {
				/* Act on the event */
				alert("error");
			}
		});
	}

}

function selectStatus(status) {
	loadMyEssay(status);
}
//function modify(id){
//	$.ajax({
//		url: urlcore + "/api/param_setting/selectOne?id=" + id,
//		type: "get",
//		dataType: 'json',
//		contentType: "application/json;charset=utf-8",
//		success: function(data) {
//			if(data.success == true) {
//				var da = data.data;
//
//				var status = "";
//               	if(n.status == 1) {
//						status = "可用";
//					} else if(n.status == 2) {
//						status = "已禁用";
//					}
//
//
//				$('#id').html(da.id);
//				$('#limitDays').html(da.limitDays);
//
//				$('#minBorrowMoney').html(da.minBorrowMoney);
//				$('#maxBorrowMoney').html(da.maxBorrowMoney);
//				$('#interestPercent').html(da.interestPercent);
//				$('#placeServePercent').html(da.placeServePercent);
//				$('#msgAuthPercent').html(da.msgAuthPercent);
//				$('#riskServePercent').html(da.riskServePercent);
//				$('#riskPlanPercent').html(da.riskPlanPercent);
//				$('#allowDays').html(da.allowDays);
//				$('#allowPercent').html(allowPercent);
//				$('#overduePercent').html(da.overduePercent);
//				$('#gmtDatetime').html(da.gmtDatetime);
//
//			}
//
//		},
//		error: function() {
//			/* Act on the event */
//			alert("error");
//		}
//	});
//}
	

function getNowFormatDate() {
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
     currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();

}
	

function thisStopUsing(id) {
	if(confirm("您确定要停用该贷款类型吗？")) {
		$.ajax({
			url: urlcore + "/api/paramSetting/stopUsing?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				loadMyEssay('', '');
			},
			error: function() {
				/* Act on the event */
				alert("error");
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