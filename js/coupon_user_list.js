var authStatus = '';
var phoneNumber = '';
var userName = '';
var id = getvl('id');
var ids = new Array;
var currentPage = 1;
var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array; 
loadMyEssay(authStatus, phoneNumber, userName);

function loadMyEssay(authStatus, phoneNumber, userName) {

	$(document).ready(function() {
		findMyCatalogue();
		init(currentPage);
	});

	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/user/selectUserList?authStatus=" + authStatus + "&phone=" + phoneNumber + "&userName=" + userName + "&current=" + pageNo,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {

				if(data.success == true) {
					$.each(data.data.list, function(i, n) {
						var status = '';
						if(n.status == 1) {
							status = '正常';
						} else if(n.status == 2) {
							status = '黑名单';
						} else if(n.status == 3) {
							status = '禁用';
						}
						var authstatus = ""; //认证状态
						if(n.authStatus == 0) {
							authstatus = "未认证";
						} else if(n.authStatus == 1) {
							authstatus = "认证成功";
						}
						var id = n.id;
						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
							'<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible">' + n.userName + '</td>' +
							'<td class="footable-visible">' + n.phone + '</td>' +
							'<td class="footable-visible">' + n.couponAllCount + '</td>' +
							'<td class="footable-visible">' + n.couponUseCount + '</td>' +
							'<td class="footable-visible">' + n.couponPastCount + '</td>' +
							'<td class="footable-visible">' + (n.couponAllCount-n.couponUseCount-n.couponPastCount) + '</td>' +
							'<td class="footable-visible">' + status + '</td>'+
'                           <td class="footable-visible footable-last-column">'+
'                              <a hidden="hidden" class="" name="优惠券详情" href="coupon_user_details.html?id='+n.id+'" >优惠券详情</a>'+
'                           </td>'+
							'</tr>';
						$('#thislist').append(thislist);
					});
					$.each(arrayTitle, function(i,k) {
						$('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
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
