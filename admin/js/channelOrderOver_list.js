var gmtDatetime = '';
var name = '';
var phoneNumber = '';
var currentPage = 1;

loadMyEssay();

function loadMyEssay() {

	$(document).ready(function() {
		init(currentPage);
	});

	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/channel/findMyOrder?gmtDatetime=" + gmtDatetime + "&userName=" + name + "&phone=" + phoneNumber + "&pageNo=" + pageNo+ "&pageSize=10&status=6",
			type: "get",
			dataType: 'json',
			async: 'false',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					$.each(data.data.list, function(i, n) {
						var id = n.id;
                        var userName = "";
                        var phone ="";
                        if(n.user){
                            userName = n.user.userName;
                            phone = n.user.phone;
                        }
						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
							'<td class="footable-visible"><input type="checkbox" /></td>' +
							'<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible">' + n.lianPayNum + '</td>' +
							'<td class="footable-visible">' + userName + '</td>' +
							'<td class="footable-visible">' + phone + '</td>' +
							'<td class="footable-visible">' + n.limitDays + '</td>' +
							'<td class="footable-visible">' + n.borrowMoney + '</td>' +
							'<td class="footable-visible">' + n.realMoney + '</td>' +
							'<td class="footable-visible">' + n.needPayMoney + '</td>' +
							'<td class="footable-visible">' + n.gmtDatetime + '</td>' +
							'<td class="footable-visible">' + n.channelProfit + '</td>' +
							'</tr>';
						$('#thislist').append(thislist);

					});
					$("#pager").pager({
						pagenumber: pageNo,
						pagecount: data.data.pages,
						totalcount: data.data.total,
						buttonClickCallback: PageClick
					});

					if(data.code == 'OVERTIME') {
						var thisUrl = window.location.href;

						if(thisUrl.indexOf('channelLogin.html') <= -1) {
							top.window.location.href = "channelLogin.html";
						}

					} else {
						if(data.msg != '空数据') {
							//alert(data.msg)
						} else {
							$('#thiscount').text(0);
						}
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

function searchList() {

	var phoneNumber = $('#phoneNumber').val().trim();
	var userName = $('#userName').val().trim();
	var time = $('#applyTime').val().trim();
	loadMyEssay();

}
