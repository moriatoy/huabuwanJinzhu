var gmtDatetime='';
var realPayTime='';
var name='';
var status='';
var phone='';
var currentPage=1;
var totalMoney = 0;
var totalPeople = 0;
var jName = getCookie('Jname');
var orderId = getvl('orderId');
//我的权限数组
var arrayTitle = new Array; 
loadMyEssay(realPayTime,name,phone,status);
//countPeopleMoney(realPayTime,name,phone,status);

function loadMyEssay(realPayTime,name,phone,status){
	
	$(document).ready(function() {
		findMyCatalogue();
		init(currentPage);
	});

	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/loanOrder/userSelectLoanOrder?gmtDatetime=" + gmtDatetime + "&name=" + name + "&phone=" + phone + "&currentPage=" + pageNo+"&payStatus=" + 2,
			type: "get",
			async:'false',
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
        	if(data.success == true) {
					$.each(data.data.pageDto.list, function(i, n) {
					    console.log(n.pressMoneyManName)
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
							'<td class="footable-visible">' + n.orderNumber + '</td>' +
							'<td class="footable-visible">' + userName + '</td>' +
							'<td class="footable-visible">' + phone + '</td>' +
							'<td class="footable-visible">' + n.limitDays + '</td>' +
							'<td class="footable-visible">' + n.borrowMoney + '</td>' +
							'<td class="footable-visible">' + n.realMoney + '</td>' +
							'<td class="footable-visible">' + n.needPayMoney + '</td>' +
						
							'<td class="footable-visible">' + n.giveTime+ '</td>' +
							'<td class="footable-visible">' + n.limitPayTime + '</td>' +
							'<td class="footable-visible">' + n.realPayTime + '</td>' +
							'<td class="footable-visible">' + n.overdueDays + '</td>' +
							'<td class="footable-visible">' + n.pressMoneyManName + '</td>' +
							'<td class="footable-visible footable-last-column">'+
								'<a hidden="hidden" class="" name="禁用" style="padding-left:3px;" onclick="stopUse(' + n.userId + ')" >禁用</a>&nbsp;'+
								'<a hidden="hidden" class="" name="拉黑" style="padding-left:3px;" onclick="joinBlackList(' + id + ')" >拉黑</a>&nbsp;'+
								'<a hidden="hidden" class="" name="查看认证信息" href="tab.html?id='+n.userId+'&userName='+escape(userName)+'&phone='+phone+ '&orderId=' +n.id +'"  >查看认证信息</a>&nbsp;'+
								'<a hidden="hidden" class="" name="详情" href="overdue_payment_list_detail.html?id='+n.id+'" >详情</a></td>'+
							'</tr>';
						$('#thislist').append(thislist);
						
					});
					$.each(arrayTitle, function(i,k) {
						$('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
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
function searchList(){
 
	var phoneNumber=$('#phoneNumber').val().trim();
	var userName=$('#userName').val().trim();
	var time=$('#applyTime').val().trim();
	loadMyEssay(time,userName,phoneNumber,'');
	countPeopleMoney(time, userName, phoneNumber,'')
	
	
}
function selectOrdersStatus(status){
	
	loadMyEssay('','','',status);
	countPeopleMoney('','','',status);
	
}


function joinBlackList(id){
	
		if(confirm("您确定拉黑该会员吗？")) {
		$.ajax({
			url: urlcore + "/api/loanOrder/joinBlackList?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				loadMyEssay('','','','');
				//countPeopleMoney('','','','');
			},
			error: function() {
				/* Act on the event */
				alert("error");
			}
		});
	}
		
	
	
}

function sendMessage(id) {
	
		$.ajax({
			url: urlcore + "/api/loanOrder/sendMenssage?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
		     success: function(data) {
		     	
		     	alert("发送成功");
		     	
		     	
//				if(data.success == true) {
//					var da = data.data;
//
//					
//					$('#content').html(da.content);
				
				
			},
		
			error: function() {
				/* Act on the event */
				alert("error");
			}
		});
	
    
}



function stopUse(id){
	if(confirm("您确定禁用该会员吗？")) {
		$.ajax({
			url: urlcore + "/api/loanOrder/stopUse?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				loadMyEssay('','','','');
				//countPeopleMoney('','','','');
			},
			error: function() {
				/* Act on the event */
				alert("error");
			}
		});
	}
}

function countPeopleMoney(realPayTime, name, phoneNumber, status) {
	$.ajax({
		url: urlcore + "/api/loanOrder/countPeopleMoney7?realPayTime=" + realPayTime + "&status=" + status + "&name=" + name + "&phoneNumber=" + phoneNumber,
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