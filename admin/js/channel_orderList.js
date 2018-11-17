var gmtDatetime = '';
var name = '';
var phoneNumber = '';
var currentPage = 1;
var temp=0;
var totalMoney = 0;
var totalPeople = 0;
var status=-1;
var channelId = getvl('channelId');
//var jName = getCookie('Jname');

//我的权限数组
var arrayTitle = new Array;
loadMyEssay();

function loadMyEssay() {
	$(document).ready(function() {
//		findMyCatalogue();
		init(currentPage);
	});

	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/loanOrder/channelSelectLoanOrder?gmtDatetime=" + gmtDatetime + "&userName=" + name + "&phone=" + phoneNumber + "&currentPage=" + pageNo+"&status="+status+"&channelId="+channelId,
			type: "get",
			async: 'false',
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					$.each(data.data.pageDto.list, function(i, n) {
						var id = n.id;
						var statusTitle;
                        var userName = "";
                        var phone ="";
                        if(n.user){
                            userName = n.user.userName;
                            phone = n.user.phone;
                        }
						if (n.orderStatus == 1) {
							statusTitle='审核中';
						}else if(n.orderStatus == 2){
							statusTitle='待打款';
						}else if(n.orderStatus == 2){
							statusTitle='待还款';
						}else if(n.orderStatus == 3){
							statusTitle='待还款';
						}else if(n.orderStatus == 6){
							statusTitle='已还款';
						}else if(n.orderStatus == 7){
							statusTitle='审核失败';
						}else if(n.orderStatus == 8){
							statusTitle='坏账';
						}else if(n.orderStatus == 9){
							statusTitle='机审拒绝';
						}else if(n.orderStatus == 4){
							statusTitle='逾期';
						}else if(n.orderStatus == 5){
							statusTitle='逾期';
						}

						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
							'<td class="footable-visible"><input type="checkbox" value="'+n.id+'" name="selectcheck" /></td>' +
							'<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible">' + n.lianPayNum + '</td>' +
							'<td class="footable-visible">' + userName + '</td>' +
							// '<td class="footable-visible">' + phone + '</td>' +
							// '<td class="footable-visible">' + n.limitDays + '</td>' +
							// '<td class="footable-visible">' + n.borrowMoney + '</td>' +
							// '<td class="footable-visible">' + n.realMoney + '</td>' +
							// '<td class="footable-visible">' + n.needPayMoney + '</td>' +
							// '<td class="footable-visible">' + "李浩" + '</td>' +
							'<td class="footable-visible">' +n.gmtDatetime + '</td>' +
							'<td class="footable-visible">' +n.user.channel.name + '</td>' +
							'<td class="footable-visible">' +n.channelProfit + '</td>' +
							'<td class="footable-visible">' +statusTitle + '</td>' +
							'<td class="footable-visible footable-last-column">'+
							'</td>'+
							'</tr>';
						$('#thislist').append(thislist);
						temp+=1;
					});
					$.each(arrayTitle, function(i,k) {
						$('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
						$('a[data="'+k+'"]').attr("class","btn btn-sm btn-primary");
					});
					$('#totalPeople').text(data.data.pageDto.total);
					$('#channelProfit').text(data.data.channelProfit);
					$('#totalMoney').text(data.data.borrowMoney);
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
	phoneNumber = $('#phoneNumber').val().trim();
	name = $('#userName').val().trim();
	gmtDatetime = $('#applyTime').val().trim();
	status = $('#status').val();
	loadMyEssay();
}

//审核通过
function agreeOrder(id) {
	if(confirm("确认提交?")) {
		$.ajax({
			url: urlcore + "/api/loanOrder/updateStatusById?id=" + id+"&status=2",
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				loadMyEssay();
			}
		});
	}
}


//打款
function passMoney(id) {
	if(confirm("您确定打款吗？")) {
		$.ajax({
			url: urlcore + "/api/loanOrder/payOrder?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				alert(data.msg);
				loadMyEssay();
			},
			error: function() {
				/* Act on the event */
				console.log(data.msg);
				alert(data.msg);
			}
		});
	}
}


function passSelected(){

	if(temp==0) {
		alert("当前无未打款订单！")
	} else {
		 if(confirm("您确定一键全部打款吗？")) {
			var obj = document.getElementsByName("selectcheck");
			for(var k in obj){
				if(obj[k].checked){

					passMoney1(obj[k].value);
				}
		}
			loadMyEssay('','','');
 }
}

}

function passMoney1(id) {
		$.ajax({
			url: urlcore + "/api/loanOrder/passMoney?id=" + id,
			type: "get",
			async: 'false',
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				countPeopleMoney('','','');

			},
			error: function() {
				/* Act on the event */
				alert("error");
			}
		});
}

//
//function passAllMoney() {
//	totalMoney = 0;
//  totalPeople = 0;
//	if(temp==0) {
//		alert("当前无未打款订单！")
//	} else {
//		if(confirm("您确定一键全部打款吗？")) {
//			var obj = document.getElementsByName("selectcheck");
//			for(var k in obj){
//				if(obj[k].checked){
//					
//				}
//			}
//			
//		$.ajax({
//			url: urlcore + "/api/loanOrder/passAllMoney",
//			type: "get",
//			dataType: 'json',
//			contentType: "application/json;charset=utf-8",
//			success: function(data) {
//				alert("打款成功!")
//				loadMyEssay('','','');
//			},
//			error: function() {
//				/* Act on the event */
//				alert("error");
//			}
//		});
//	}
// }
//}

function thisRefuse(id) {

	if(confirm("您确定拒绝该申请吗？")) {
		$.ajax({
			url: urlcore + "/api/loanOrder/thisRefuse?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				loadMyEssay('','','');
				countPeopleMoney('','','');

			},
			error: function() {
				/* Act on the event */
				alert("error");
			}
		});
	}

}

function selectAll(o){
	var mm=document.getElementsByName("selectcheck");
	for(var i=0;i<mm.length;i++){
		mm[i].checked=o.checked;
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
