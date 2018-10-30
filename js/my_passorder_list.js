var limitPayTime='';
var name='';
var phoneNumber='';
var currentPage=1;
var totalMoney = 0;
var totalPeople = 0;
var orderStatus='';
var orderId = getvl('orderId');
var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array; 
loadMyEssay(limitPayTime,name,phoneNumber,orderStatus);
//countPeopleMoney(limitPayTime,name,phoneNumber,orderStatus);

function loadMyEssay(limitPayTime,name,phoneNumber,orderStatus){
	
	$(document).ready(function() {
		findMyCatalogue();
		init(currentPage);
	});

	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/loanOrder/myOverDueToPayList?limitPayTime=" + limitPayTime + "&name=" + name + "&phoneNumber=" + phoneNumber+ "&orderStatus=" + orderStatus + "&current=" + pageNo+ "&type=" + 1,
			type: "get",
			async:'false',
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
        	if(data.success == true) {
					$.each(data.data.list, function(i, n) {				    
						var id = n.id;
						var auditHtml ='';
                        var userName = "";
                        var phone ="";
                        if(n.user){
                            userName = n.user.userName;
                            phone = n.user.phone;
                        }
                        if(n.isPass == null || n.isPass == 0){//未机审过的才能机审
                            auditHtml += '<a hidden="hidden" name="机审" class="" href="javascript:;"  onclick="thisIsPass(' + id + ')">机审</a>&nbsp;'
                        }
						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
						    '<td class="footable-visible"><input type="checkbox" value="'+n.id+'" name="selectcheck" /></td>' +
							'<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible">' + n.orderNumber + '</td>' +
							'<td class="footable-visible">' + userName + '</td>' +
							'<td class="footable-visible">' + phone + '</td>' +
							'<td class="footable-visible">' + n.overdueDays + '</td>' +
							'<td class="footable-visible">' + n.limitDays + '</td>' +
							'<td class="footable-visible">' + n.borrowMoney + '</td>' +
								'<td class="footable-visible">' + n.realMoney + '</td>' +
							'<td class="footable-visible">' + n.needPayMoney + '</td>' +
							'<td class="footable-visible">' + n.giveTime + '</td>' +
							'<td class="footable-visible">' +  n.limitPayTime+ '</td>' +
							'<td class="footable-visible footable-last-column">&nbsp;'+
								'<a hidden="hidden" name="查看认证信息" class="" href="tab.html?id=' + n.userId + '&userName=' +escape(userName)  + '&phone=' + phone+ '&orderId=' +n.id  + '" >查看认证信息</a>&nbsp;'+
								'<a hidden="hidden" name="查看老用户" class="" href="javascript:;" data-toggle="modal" data-target="#oldMsg" onclick="selectOld('+n.userId+')">查看老用户</a>&nbsp;'+
								'<a hidden="hidden" name="详情" class="" href="loan_apply_list_detail.html?id='+id+'" >详情</a>&nbsp;'+
                           	 	auditHtml+
								'<a hidden="hidden" name="同意" class="" href="javascript:;"  onclick="thisAgree(' + id + ')">同意</a>&nbsp;'+
								'<a hidden="hidden" name="拒绝" class="" href="javascript:;"  onclick="thisRefuse(' + id + ')">拒绝</a></td>'+
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
var textId = "";
function addRecord(id){
	$("#content1").val("");
	textId = id;
	$.ajax({
			url: urlcore + "/api/loanOrder/selectJiLu?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
		     success: function(data) {
				if(data.success == true) {
					var thislist="";
					$.each(data.data, function(i,n) {
						
						thislist = thislist + 
							'<span>'+n.createTime+":&nbsp;&nbsp;&nbsp;&nbsp;"+n.text+'</span><br/>';
						
					});
					$("#recordold").html(thislist);
				}
			},
			error: function() {
				/* Act on the event */
				alert("error");
			}
		});
}
function EnterSearchList() {
	var code = event.keyCode;
	if(code == 13) {
		searchList();
	}
}
function searchList(){
   var phoneNumber=$('#phoneNumber').val().trim();
	var name=$('#userName').val().trim();
	var limitPayTime=$('#applyTime').val().trim();
	loadMyEssay(limitPayTime,name,phoneNumber,'');
	//countPeopleMoney(limitPayTime, name, phoneNumber,'')
}



function sendMessage(id) {
	
		alert(id);
		$.ajax({
			url: urlcore + "/api/loanOrder/sendMenssage?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
		     success: function(data) {
				if(data.success == true) {
					var da = data.data;

					
					$('#content').html(da.content);
				}
			},
			error: function() {
				/* Act on the event */
				alert("error");
			}
		});
  
 
}
function selectOrdersStatus(orderStatus) {
	
	loadMyEssay('', '', '', orderStatus);
	//countPeopleMoney('', '', '', orderStatus);
}

function selectAll(o){
	var mm=document.getElementsByName("selectcheck");
	for(var i=0;i<mm.length;i++){
		mm[i].checked=o.checked;
	}
}

function sendSelected(){

	if(temp==0) {
		
	} else {
		 if(confirm("您确定全部发送短信吗？")) {
			var obj = document.getElementsByName("selectcheck");
			for(var k in obj){
				if(obj[k].checked){
					
					sendMessage1(obj[k].value);
				}
		}
 }
}
}
function jilubaocun(){
	var text1 = $("#content1").val();
	$.ajax({
			url: urlcore + "/api/loanOrder/jilubaocun?orderId=" + textId + "&text=" + text1,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
		     success: function(data) {
				if(data.success == true) {
					alert("保存成功");
				}
			},
			error: function() {
				/* Act on the event */
				alert("error");
			}
		});
}
/**
 * 
 * @param {Object} id
 * 群发催款信息
 */
function sendMessage1(id) {
	
		$.ajax({
			url: urlcore + "/api/loanOrder/sendMenssage?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
		     success: function(data) {
				if(data.success == true) {
					var da = data.data;

					
					$('#content').html(da.content);
				}
			},
			error: function() {
				/* Act on the event */
				alert("error");
			}
		});
  
 
}


function countPeopleMoney(limitPayTime, name, phoneNumber, orderStatus) {
	$.ajax({
		url: urlcore + "/api/loanOrder/countPeopleMoney6?limitPayTime=" + limitPayTime + "&orderStatus=" + orderStatus + "&name=" + name + "&phoneNumber=" + phoneNumber,
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

var orderId = null;
function xieshanghuankuan(id){
	orderId = id;
}

function bufenhuankuan(){
	var money = $('#xieshangM').val();
	if(confirm("您确定部分还款吗？")) {
		$.ajax({
		url: urlcore + "/api/loanOrder/bufenhuankuan?orderId="+orderId+"&money="+money,
		type: "GET",
		dataType: 'json',
		async: false,
		contentType: "application/json;charset=utf-8",
		success:function(data){
		if (data.success == true) {
			alert("部分还款成功！");
			
		} else {
			alert(data.msg);
		}

		},
		error:function() {
			alert("error");
		}
	});
	}
}
function jieqinhuankuan(){
	var money = $('#xieshangM').val();
	if(confirm("您确定结清还款吗？")) {
		$.ajax({
			url: urlcore + "/api/loanOrder/jieqinhuankuan?orderId="+orderId+"&money="+money,
			type: "GET",
			dataType: 'json',
			async: false,
			contentType: "application/json;charset=utf-8",
			success:function(data){
			if (data.success == true) {
				alert("结清成功！")
			} else {
				alert(data.msg);
			}
		},
		error:function() {
			alert("error");
		}
	});
	}
}

function thisAgree(id){
	
	if(confirm("您确定同意该申请吗？")) {
		$.ajax({
			url: urlcore + "/api/loanOrder/thisAgree?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				loadMyEssay('');
				//countPeopleMoney('')
			},
			error: function() {
				/* Act on the event */
				alert("error");
			}
		});
	}

}
	
	
	


function thisRefuse(id){
	totalMoney = 0;
    totalPeople = 0;
	if(confirm("您确定拒绝该申请吗？")) {
		$.ajax({
			url: urlcore + "/api/loanOrder/thisRefuse?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				loadMyEssay('');
			//countPeopleMoney('');
			},
			error: function() {
				/* Act on the event */
				alert("error");
			}
		});
	}
	
}
//查看老用户
function selectOld(userId){
	$.ajax({
			url: urlcore + "/api/loanOrder/selectOldOrder?userId=" + userId,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				$("#zdyuqi").html(data.data.zdyuqi);
				$("#yuqics").html(data.data.yuqics);
				$("#cghuankuan").html(data.data.cghuankuan);
				$("#xqcishu").html(data.data.xqcishu);
			},
			error: function() {
				/* Act on the event */
				alert("error");
			}
	});
}

function thisIsPass(id){
	if(confirm("您确定机审么？")) {
		$.ajax({
			url: urlcore + "/api/loanOrder/isPassOrder?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					loadMyEssay('');
				}else{
					alert(data.msg);
				}	
			},
			error: function() {
				/* Act on the event */
				alert("error");
			}
		});
	}
	
}

