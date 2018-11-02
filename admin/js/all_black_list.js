
var userName='';
var phoneNumber='';
var currentPage=1;
var totalMoney = 0;
var totalPeople = 0;
var jName = getCookie('Jname');
var orderId = getvl('orderId');
//我的权限数组
var arrayTitle = new Array; 
loadMyEssay(userName,phoneNumber);
//countPeopleMoney(userName, phoneNumber);


function loadMyEssay(userName,phoneNumber){
	
	$(document).ready(function() {
		findMyCatalogue();
		init(currentPage);
	});

	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/user/selectAllBlackList?userName=" + userName + "&phoneNumber=" + phoneNumber + "&current=" + pageNo,
			type: "get",
			async:'false',
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
        	if(data.success == true) {
					$.each(data.data.list, function(i, n) {
					    
						var id = n.user.id;
                        var userName = "";
                        var phone ="";
                        if(n.user){
                            userName = n.user.userName;
                            phone = n.user.phone;
                        }
					    var paymoney='';
					    if(n.realPayMoney!=0){
					    	paymoney="已还清"
					    	 }else{
					    	 paymoney=n.needPayMoney;	
					    	 }
					    
					    
						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
						    '<td class="footable-visible"><input type="checkbox" value="'+n.id+'" name="selectcheck" /></td>' +
						
							'<td class="footable-visible">' + n.user.id + '</td>' +
							'<td class="footable-visible">' + n.lianPayNum + '</td>' +
							'<td class="footable-visible">' + userName + '</td>' +
							'<td class="footable-visible">' + phone + '</td>' +
							'<td class="footable-visible">' + n.limitDays + '</td>' +
							'<td class="footable-visible">' + n.borrowMoney + '</td>' +
							'<td class="footable-visible">' + n.realMoney + '</td>' +
							'<td class="footable-visible">' + paymoney + '</td>' +
						
							'<td class="footable-visible">' + n.giveTime + '</td>' +
							'<td class="footable-visible">' + n.limitPayTime + '</td>' +
							
							'<td class="footable-visible footable-last-column">'+
								'<a hidden="hidden" class="" name="移出黑名单"  data-toggle="modal"  onclick="moveOutBlackList(' + id + ')">移出黑名单</a>&nbsp;'+
								'<a hidden="hidden" class="" name="查看认证信息" href="tab.html?id='+n.userId+'&userName='+escape(userName)+'&phone='+phone+ '&orderId=' +n.id +'"  >查看认证信息</a>&nbsp;'+
								'<a hidden="hidden" class="" name="详情" href="all_black_list_detail.html?id='+n.id+'" >详情</a></td>' +
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
function EnterSearchList() {
	var code = event.keyCode;
	if(code == 13) {
		searchList();
	}
}
function searchList(){
    
	var phoneNumber=$('#phoneNumber').val().trim();
	var userName=$('#userName').val().trim();
	loadMyEssay(userName,phoneNumber);
	countPeopleMoney(userName, phoneNumber) 
	
	
	
}

function moveOutBlackList(id){
	if(confirm("您确定要将他移出黑名单吗？")){
		$.ajax({
			url: urlcore + "/api/user/moveOutBlackList?id="+id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
				alert("恭喜您!已成功将他移出黑名单!");
			     loadMyEssay('','');
			     countPeopleMoney('','');
			},
			error:function() {
				/* Act on the event */
				alert("error");
			}
		});	
}
	
}


function countPeopleMoney(userName, phoneNumber) {
	// $.ajax({
	// 	url: urlcore + "/api/loanOrder/countPeopleMoney5?userName=" + userName + "&phoneNumber=" + phoneNumber,
	// 	type: "get",
	// 	dataType: 'json',
	// 	contentType: "application/json;charset=utf-8",
	// 	success: function(data) {
	// 		if(data.success == true) {
    //
	// 			$('#totalMoney').text(data.data.totalMoney);
	// 			$('#totalPeople').text(data.data.totalPeople);
    //
	// 			if(data.code == 'OVERTIME') {
	// 				var thisUrl = window.location.href;
    //
	// 				if(thisUrl.indexOf('login.html') <= -1) {
	// 					top.window.location.href = "login.html";
	// 				}
    //
	// 			} else {
	// 				if(data.msg != '空数据') {
	// 					//alert(data.msg)
	// 				} else {
	// 					$('#thiscount').text(0);
	// 				}
	// 			}
	// 		}
    //
	// 	},
	// 	error: function() {
	// 		alert("error");
	// 	}
	// });
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