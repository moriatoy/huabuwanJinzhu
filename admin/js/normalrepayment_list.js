var gmtDatetime='';
var realPayTime = '';
var name = '';
var phone = '';
var currentPage = 1;
var totalMoney = 0;
var totalPeople = 0;
var jName = getCookie('Jname');
var orderId = getvl('orderId');
//我的权限数组
var arrayTitle = new Array; 
loadMyEssay(realPayTime, name, phone);
//countPeopleMoney(realPayTime, name, phone);

function loadMyEssay(realPayTime, name, phone) {
	$(document).ready(function() {
		findMyCatalogue();
		init(currentPage);
	});

	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/loanOrder/userSelectLoanOrder?realPayTime=" + realPayTime + "&name=" + name + "&phone=" + phone + "&currentPage=" + pageNo+"&payStatus=" + 1,
			type: "get",
			async: 'false',
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					$.each(data.data.pageDto.list, function(i, n) {
						var id = n.id;
                        var userName = "";
                        var phone ="";
                        if(n.user){
                            userName = n.user.userName;
                            phone = n.user.phone;
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
							'<td class="footable-visible">' + n.realPayMoney + '</td>' +
							'<td class="footable-visible">' + n.giveTime + '</td>' +
							'<td class="footable-visible">' + n.realPayTime + '</td>' +
							'<td class="footable-visible footable-last-column">'+
								'<a hidden="hidden" class="" name="查看认证信息" href="tab.html?id='+n.userId+'&userName='+escape(userName)+'&phone='+phone+ '&orderId=' +n.id +'"  >查看认证信息</a>&nbsp;'+
								'<a hidden="hidden" class="" name="详情" href="normalrepayment_list_detail.html?id=' + n.id + '" >详情</a></td>'+
							'</tr>';
						$('#thislist').append(thislist);
					});
					$.each(arrayTitle, function(i,k) {
                        $('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
                        $('a[data="'+k+'"]').attr("hidden",false).attr("class","btn btn-default search-btn");
					});
					$('#totalMoney').text(data.data.borrowMoney);
					$('#totalPeople').text(data.data.pageDto.total);
					$("#pager").pager({
						pagenumber: pageNo,
						pagecount: data.data.pageDto.pages,
						totalcount: data.data.pageDto.total,
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

function EnterSearchList() {
	var code = event.keyCode;
	if(code == 13) {
		searchList();
	}
}

function searchList() {

	var phoneNumber = $('#phoneNumber').val().trim();
	var userName = $('#userName').val().trim();
	realPayTime = $('#applyTime').val().trim();
	loadMyEssay(realPayTime, userName, phoneNumber);
	//countPeopleMoney(time, userName, phoneNumber);

}

function exportFun() {
    var phoneNumber = $('#phoneNumber').val().trim();
    var userName = $('#userName').val().trim();
    realPayTime = $('#applyTime').val().trim();
    window.location.href =  urlcore + "/api/loanOrder/ef?realPayTime=" + realPayTime + "&name=" + userName + "&phone=" + phoneNumber + "&currentPage=" + currentPage + "&payStatus=" + 1;
}

function checkAuthDetails(id) {

}

function countPeopleMoney(realPayTime,name, phoneNumber) {
	$.ajax({
		url: urlcore + "/api/loanOrder/countPeopleMoney?realPayTime=" + realPayTime + "&name=" + name + "&phoneNumber=" + phoneNumber,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success: function(data) {
			if(data.success == true) {

				$('#totalMoney').text(data.data.totalMoney);
				$('#totalPeople').text(data.data.totalPeople);

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