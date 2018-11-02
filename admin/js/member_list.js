var phoneNumber = '';
var userName = '';
var currentPage = 1;

loadMyEssay();
function loadMyEssay() {

	$(document).ready(function() {
		init(currentPage);
	});

	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/channel/findMyMember?phone=" + phoneNumber + "&userName=" + userName + "&pageNo=" + pageNo+ "&pageSize=10",
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {

				if(data.success == true) {
					$.each(data.data.list, function(i, n) {
						var id = n.id;
						var status = '';
						if(n.status == 1) {
							status = '正常';
						} else if(n.status == 2) {
							status = '黑名单';
						} else if(n.status == 3) {
							status = '禁用';
						}else if(n.status == 4){
							status='被拒绝(拒绝后，一月之后可借款)';
						}
						debugger;
						var authstatus = ""; //认证状态
						if(n.authStatus == 0) {
							authstatus = "未认证";
						} else if(n.authStatus == 1) {
							authstatus = "认证成功";
						}
						var phone =hidePhone(n.phone);
						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
							'<td class="footable-visible"><input type="checkbox" /></td>' +
							'<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible">' + n.userName + '</td>' +
							'<td class="footable-visible">'+phone+ '</td>' +
							'<td class="footable-visible">' + n.gmtDatetime + '</td>' +
							'<td class="footable-visible">' + status + '</td>' +
							'<td class="footable-visible">' + n.authScore + '</td>' +
							'<td class="footable-visible footable-last-column">'+
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


function EnterSearchList() {
	var code = event.keyCode;
	if(code == 13) {
		searchList();
	}

}

// 手机大码
function hidePhone(phone){
	return phone.substr(0,2)+"****"+phone.substr(6);
}

function searchList() {

	 phoneNumber = $('#phoneNumber').val().trim();
	 userName = $('#userName').val().trim();
	
	loadMyEssay();


}

