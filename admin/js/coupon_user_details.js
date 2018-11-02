var id = getvl('id');

loadMyEssay();

function loadMyEssay() {

	$(document).ready(function() {
		init(1);
	});

	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/userCoupon/findByUserPage?pageNo="+pageNo+"&userId="+id+"&pageSize=10",
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
 
				if(data.success == true) {
					$.each(data.data.list, function(i, n) {
						var type = '';
						if(n.coupon.type == 1) {
							type = '新用户订单';
						} else if(n.coupon.type == 2) {
							type = '邀请好友奖励';
						} else if(n.coupon.type == 3) {
							type = '自由发放';
						}
						var status = ""; //认证状态
						if(n.status == 1) {
							status = "正常";
						}else if(n.status == 2) {
							status = "已使用";
						}else if(n.status == 3) {
							status = "过期";
						}else{
							status = "不能使用";
						}
						var id = n.id;
						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
							'<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible">' + n.coupon.coupouName + '</td>' +
							'<td class="footable-visible">' + type + '</td>' +
							'<td class="footable-visible">' + n.saveMoney + '</td>' +
							'<td class="footable-visible">' + n.coupon.validTime+ '</td>' +
							'<td class="footable-visible">' + n.gmtDatetime + '</td>' +
							'<td class="footable-visible">' + n.pastDatetime + '</td>' +
							'<td class="footable-visible">' + status + '</td>' +
							'</tr>';
						$('#thislist').append(thislist);
					});
					$("#pager").pager({
						pagenumber: pageNo,
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
	PageClick = function(pageclickednumber) {
		init(pageclickednumber);
	}
}
function searchPhoneNumber() {
	var code = event.keyCode;
	if(code == 13) {
		 searchPhoneList();
	}

}

function searchPhoneList() {
	var phoneNumber = $('#phoneNumber').val().trim();

	loadMyEssay('', phoneNumber, '');
}

function selectAuth_Status(authstatus) {
	loadMyEssay(authstatus, '', '');
}

function showMsg() {
	var code = event.keyCode;
	if(code == 13) {
		searchNameList();
	}

}

function searchNameList() {
	var userName = $('#nameSearch').val().trim();
	loadMyEssay('', '', userName);
}

