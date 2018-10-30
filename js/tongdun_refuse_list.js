var name='';
var gmtDatetime='';
var phone='';
var currentPage=1;
var totalPeople=0;
var totalMoney = 0;
var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array; 
loadMyEssay(gmtDatetime,name,phone);
//countPeopleMoney(gmtDatetime, name, phone);

function loadMyEssay(gmtDatetime,name,phone){
	
	$(document).ready(function() {
		findMyCatalogue();
		init(currentPage);
	});

	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/loanOrder/userSelectLoanOrder?gmtDatetime=" + gmtDatetime + "&name=" + name + "&phone=" + phone + "&currentPage=" + pageNo+"&status=" + 9,
			type: "get",
			dataType: 'json',
			async:'false',
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
							'<td class="footable-visible"><input type="checkbox" /></td>' +
							'<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible">' + n.orderNumber + '</td>' +
							'<td class="footable-visible">' + userName + '</td>' +
							'<td class="footable-visible">' + phone + '</td>' +
							'<td class="footable-visible">' + n.limitDays + '</td>' +
							'<td class="footable-visible">' + n.borrowMoney + '</td>' +
							'<td class="footable-visible">' + n.gmtDatetime + '</td>' +
							'<td class="footable-visible footable-last-column">'+
								'<a hidden="hidden" name="查看认证信息" class="" href="tab.html?id=' + n.userId + '&userName=' +escape(userName)  + '&phone=' + phone + '&orderId=' +n.id + '" >查看认证信息</a>&nbsp;'+
								'<a hidden="hidden" name="详情" class="" href="loan_apply_list_detail.html?id='+n.userId+'" >详情</a>&nbsp;'+
								'<a class="btn btn-primary btn-xs"  href="javascript:;" data onclick="thisRecover(' + id + ')">恢复</a>' +
								'</td>' +
							'</tr>';
							//alert(n.userId);
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
	
	var phoneNumber=$('#phoneNumber').val();
	var userName=$('#userName').val();
	var time=$('#applyTime').val();
	loadMyEssay(time,userName,phoneNumber);
	//countPeopleMoney(time, userName, phoneNumber);
	
}

function checkAuthDetails(id){
	
}


	
	
	



function countPeopleMoney(gmtDatetime,name, phone) {
	$.ajax({
		url: urlcore + "/api/loanOrder/countPeopleMoney2?gmtDatetime=" + gmtDatetime + "&name=" + name + "&phone=" + phone,
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

function thisRecover(id) {
	if(confirm("您确定要恢复该用户到待审核界面么？")){
		$.ajax({
			url: urlcore + "/api/user/thisRecover?id="+id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
			     loadMyEssay('','','');
			},
			error:function() {
				/* Act on the event */
				alert("error");
			}
		});	
	}
}
