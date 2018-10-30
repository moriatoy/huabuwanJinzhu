var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array; 
loadMyEssay();
var currentPage = 1;
var orderId = getvl('orderId');
function loadMyEssay() {
	$(document).ready(function() {
		findMyCatalogue()
		//设置默认第1页
		init(currentPage);
	});

	//默认加载  
	function init(pageNo) {
		//获取用户信息列表
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/loanOrder/findPassFailPage?current=" + pageNo,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					//i表示在data中的索引位置，n表示包含的信息的对象
					
					$.each(data.data.list, function(i, n) {
						var userName = "";
						var phone ="";
						if(n.user){
                            userName = n.user.userName;
                            phone = n.user.phone;
						}
						var id = n.id;
						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
							'<td class="footable-visible"><input type="checkbox" value="'+n.id+'" name="selectcheck" /></td>' +
							'<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible">' + n.orderNumber + '</td>' +
							'<td class="footable-visible">' + n.lianPayNum + '</td>' +
							'<td class="footable-visible">' + userName + '</td>' +
							'<td class="footable-visible">' + phone + '</td>' +
							'<td class="footable-visible">' + n.limitDays + '</td>' +
							'<td class="footable-visible">' + n.borrowMoney + '</td>' +
							'<td class="footable-visible">' + n.realMoney + '</td>' +
							'<td class="footable-visible">' + n.needPayMoney + '</td>' +
							'<td class="footable-visible">' + "李浩" + '</td>' +
							'<td class="footable-visible">' +n.gmtDatetime + '</td>' +
							'<td class="footable-visible footable-last-column">'+
								'<a hidden="hidden" name="查看认证信息" class="" href="tab.html?id='+n.userId+'&userName='+userName+'&phone='+phone+ '&orderId=' +n.id +'" >查看认证信息</a>&nbsp;'+
								'<a hidden="hidden" name="详情" class=""href="to_passmoney_list_detail.html?id=' + n.id + '">详情</a>&nbsp;'+
								'<a hidden="hidden" name="打款" class="" href="javascript:;"  onclick="passMoney(' + id + ')">打款</a>&nbsp;'+
								'<a hidden="hidden" name="拒绝" class="" href="javascript:;"  onclick="thisRefuse(' + id + ')">拒绝</a>'+
							'</td>' +
							'</tr>';
						$('#thislist').append(thislist);
					});
					$.each(arrayTitle, function(i,k) {
						$('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
						$('a[data="'+k+'"]').attr("class","btn btn-sm btn-primary");
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
				/* Act on the event */
				alert("error");
			}
		});
	}

	PageClick = function(pageclickednumber) {
		init(pageclickednumber);
	}

}


function passMoney(id){

	if(confirm("您确定再次打款吗？")) {
		$.ajax({
			url: urlcore + "/api/user/payOrder?id=" + id,
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


function thisRefuse(id){

	if(confirm("您确定拒绝打款吗？")) {
		$.ajax({
			url: urlcore + "/api/loanOrder/refusePassMoney?id=" + id,
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
