var phone=getvl('phone')
var currentPage = 1;

var jName = getCookie('Jname');
var orderId = getvl('orderId');
//我的权限数组
var arrayTitle = new Array; 
loadMyEssay(phone);


function loadMyEssay(phoneNumber) {

	$(document).ready(function() {
		findMyCatalogue();
		init(currentPage);
	});

	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/loanOrder/selectOrderLists?pageNo="+pageNo+"&pageSize="+pageSize+"&phone=" + phone,
			type: "get",
			async: 'false',
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					$.each(data.data.list, function(i, n) {

						var id = n.id;
						var status = '';
                        var userName = "";
                        var phone ="";
                        if(n.user){
                            userName = n.user.userName;
                            phone = n.user.phone;
                        }
						if(n.orderStatus == "3") {
							status = "待还款"
						} else if(n.orderStatus == "4") {
							status = "容限期中";
						} else if(n.orderStatus == "5") {
							status = "超出容限期中";
						} else if(n.orderStatus == "6") {
							status = "已还款";
						} else if(n.orderStatus == "8") {
							status = "坏账";
						} else if(n.orderStatus == "1") {
							status = "申请中";
						} else if(n.orderStatus == "2") {
							status = "待打款";
						} else if(n.orderStatus == "7") {
							status = "申请失败";
						}
						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
							'<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible">' + n.lianPayNum + '</td>' +
							'<td class="footable-visible">' + userName + '</td>' +
							'<td class="footable-visible">' + phone + '</td>' +
							'<td class="footable-visible">' + n.limitDays + '</td>' +
							'<td class="footable-visible">' + n.borrowMoney + '</td>' +
							'<td class="footable-visible">' + n.realMoney + '</td>' +
							'<td class="footable-visible">' + n.needPayMoney + '</td>' +
							'<td class="footable-visible">' + n.realPayMoney + '</td>' +
							'<td class="footable-visible">' + n.giveTime + '</td>' +
							'<td class="footable-visible">' + n.limitPayTime + '</td>' +
							'<td class="footable-visible">' + n.realPayTime + '</td>' +
                            '<td class="footable-visible">' + (n.auditorAdmin === null ? "-" : n.auditorAdmin.userName) +'</td>' +
                            '<td class="footable-visible">' + (n.loanAdmin === null ? "-" : n.loanAdmin.userName) +'</td>' +
                            '<td class="footable-visible">' + (n.pressMoneyManAdmin === null ? "-" : n.pressMoneyManAdmin.userName) +'</td>' +
							'<td class="footable-visible">' + status + '</td>' +
							'<td class="footable-visible footable-last-column">'+
								'<a  class="" name="查看认证信息" href="tab.html?id='+n.userId+'&userName='+escape(userName)+'&phone='+phone+ '&orderId=' +n.id +'"  >查看认证信息</a>&nbsp;'+
								'<a s class="" name="详情" href="all_loan_list_detail.html?id=' + n.id + '" >详情</a></td>'+
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

					if(data.code == 'OVERTIME') {
						var thisUrl = window.location.href;

						if(thisUrl.indexOf('login.html') <= -1) {
							top.window.location.href = "login.html";
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
