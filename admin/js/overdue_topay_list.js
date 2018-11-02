var limitPayTime='';
var name='';
var phoneNumber='';
var currentPage=1;
var totalMoney = 0;
var totalPeople = 0;
var orderStatus='';
var jName = getCookie('Jname');
var orderId = getvl('orderId');
var orderId = null;


var sessTime = window.sessionStorage.getItem("limitPayTime");
if (sessTime === "null" || sessTime === null) {
    limitPayTime = "";
} else {
    limitPayTime = window.sessionStorage.getItem("limitPayTime");
}
var sessUserName = window.sessionStorage.getItem("userName");
if (sessUserName === "null" || sessUserName === null) {
    name = "";
} else {
    name = window.sessionStorage.getItem("userName");
}
var sessPhone = window.sessionStorage.getItem("phoneNumber");
if (sessPhone === "null" || sessPhone === null) {
    phoneNumber = "";
} else {
    phoneNumber = window.sessionStorage.getItem("phoneNumber");
}
var sessPage = window.sessionStorage.getItem("page");
if (sessPage === "null" || sessPage === null) {
    currentPage = 1;
} else {
    currentPage = window.sessionStorage.getItem("page");
}


//我的权限数组
var arrayTitle = new Array; 
loadMyEssay(limitPayTime,name,phoneNumber);
//countPeopleMoney(limitPayTime,name,phoneNumber,orderStatus);

function loadMyEssay(limitPayTime,name,phoneNumber){
	
	$(document).ready(function() {
		findMyCatalogue();
		init(currentPage);
	});

	function init(pageNo) {
        window.sessionStorage.setItem("limitPayTime",limitPayTime);
        document.getElementById("applyTime").value = limitPayTime;
        window.sessionStorage.setItem("userName",name);
        document.getElementById("userName").value = name;
        window.sessionStorage.setItem("phoneNumber",phoneNumber);
        document.getElementById("phoneNumber").value = phoneNumber;
        window.sessionStorage.setItem("page",pageNo);
		$("#thislist").html("");
		$.ajax({
			url: urlcore +"/api/loanOrder/userSelectLoanOrder?limitPayTime=" + limitPayTime + "&name=" + name + "&phone=" + phoneNumber+ "&currentPage=" + pageNo+"&status="+(-2),
			type: "get",
			async:'false',
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
        	if(data.success == true) {
					$.each(data.data.pageDto.list, function(i, n) {
					    var dd = "";
					    var disabled = "";
					    if(n.pressMoneyMan == null && n.pressCharge == null){
					    	dd="待分配";
					    }else if(n.pressMoneyMan != null){
					    	dd="已分配";
					    	disabled ="disabled";
					    }else{
					    	dd="可分配";
					    }
					    var userName ="";
					    var phone = "";
					    if(n.user){
                            userName = n.user.userName;
                            phone = n.user.phone;
						}
						var id = n.id;
						var backHtml = "";
						if($.trim(n.pressCharge) != ''){
							backHtml ='<a hidden="hidden" class="" name="退回" href="javascript:;" onclick="reback('+n.id+')">退回</a>&nbsp;';
						}
						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
						    '<td class="footable-visible"><input type="checkbox" '+disabled+' value="'+n.id+'" name="selectcheck" /></td>' +
							'<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible">' + n.lianPayNum + '</td>' +
							'<td class="footable-visible">' + userName + '</td>' +
							'<td class="footable-visible">' + phone + '</td>' +
							'<td class="footable-visible">' + n.overdueDays + '</td>' +
							'<td class="footable-visible">' + n.limitDays + '</td>' +
							'<td class="footable-visible">' + n.borrowMoney + '</td>' +
							'<td class="footable-visible">' + n.realMoney + '</td>' +
							'<td class="footable-visible">' + n.needPayMoney + '</td>' +
							'<td class="footable-visible">' + n.giveTime + '</td>' +
							'<td class="footable-visible">' +  n.limitPayTime+ '</td>' +
							'<td class="footable-visible">' +  dd+ '</td>' +
							'<td class="footable-visible">' +  common.showTextFormatter(n.pressMoneyManName)+ '</td>' +
							'<td class="footable-visible footable-last-column">&nbsp;'+
								backHtml+
							'<a hidden="hidden" class="" name="查看认证信息" href="tab.html?id='+n.userId+'&userName='+escape(userName)+'&phone='+phone+ '&orderId=' +n.id +'"  >查看认证信息</a>&nbsp;'+
							'<a hidden="hidden" class="" name="详情" href="overdue_topay_list_detail.html?id='+n.id+'" >详情</a>&nbsp;'+
							'<a hidden="hidden" class="" name="记录" href="javascript:;" data-toggle="modal" data-target="#addRecord" onclick="addRecord('+id+')">记录</a>&nbsp;'+
							'<a hidden="hidden" class="" name="结清"  href="javascript:;" data-toggle="modal" data-target="#jieQing" onclick="over(' + id + ')">结清</a>&nbsp;'+
                            '<a hidden="hidden" class="" name="续期"  href="javascript:;" data-toggle="modal" data-target="#xuqiOrder"  onclick="xuqi(' + id + ')">续期</a>&nbsp;'+
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
function continueDate(id){
    if($.trim(id) == ''){
        alert("订单id为空");
        return ;
    }
    if(confirm("您确定续期吗？")) {
        $.ajax({
            url: urlcore + "/api/user/xuqiOrder?id=" + id,
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                if(data.success == true) {
                    alert(data.msg);
                    location.reload();
                }
            },
            error: function() {
                alert("error");
                location.reload();
            }
        });
    }
}
function fenpei(id){
	orderId = id;
	$.ajax({
			url: urlcore + "/api/loanOrder/selectAllPressMoneyMan",
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
		     success: function(data) {
				if(data.success == true) {
					var thislist='<option value="">请选择催收人</option>';
					$.each(data.data, function(i,n) {

						thislist = thislist +
							'<option value="'+n.id+'">'+n.userName+'</option>';

					});
					$("#fenpeixiala").html(thislist);
				}
			},
			error: function() {
				/* Act on the event */
				alert("error");
			}
	});
}
function fenpei2(id){
    orderId = id;
    $.ajax({
        url: urlcore + "/api/loanOrder/selectAllPressMoneyMan",
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            if(data.success == true) {
                var thislist='<option value="">请选择催收人</option>';
                $.each(data.data, function(i,n) {

                    thislist = thislist +
                        '<option value="'+n.id+'">'+n.userName+'</option>';

                });
                $("#jsfenPeiSelect").html(thislist);
            }
        },
        error: function() {
            /* Act on the event */
            alert("error");
        }
    });
}
function fenpeiqueren(){
	var userId = $("#fenpeixiala").val();
	$.ajax({
			url: urlcore + "/api/loanOrder/setUpPressMoneyMan?orderIds="+orderId+"&userId="+userId,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
		    success: function(data) {
		    	location.reload()
			},
			error: function() {
				location.reload()
			}
	});
}
function fenpeiqueren2(){
    var userId = $("#jsfenPeiSelect").val();
    if($.trim(userId) == ''){
    	alert("请选择人员");
    	return;
	}
    var checks = $('input[name=selectcheck]:checked');
    if(checks.length < 1){
    	alert("请选择记录");
    	return;
	}
	var orderIds ='';
	$.each(checks,function(i,elem){
		if($(elem).is(':checked')){
            orderIds +=$(elem).val()+",";
		}
	});
	orderIds = orderIds.slice(0,orderIds.length-1);
    $.ajax({
        url: urlcore + "/api/loanOrder/setUpPressMoneyMan?orderIds="+orderIds+"&userId="+userId,
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            location.reload()
        },
        error: function() {
            location.reload()
        }
    });
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
function searchList() {

	var phoneNumber = $('#phoneNumber').val();
	var userName = $('#userName').val();
	var time = $('#applyTime').val();
	loadMyEssay(time, userName, phoneNumber);
	//countPeopleMoney(time, userName, phoneNumber);
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
	var checks = $("input[name=selectcheck]").not(":disabled");
	if(checks.length > 0){
		$.each(checks,function(i,elem){
			$(elem).prop('checked',o.checked);
		});
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


function xuqi(id) {
	$('#thisId').html(id);
}

function xuqiSend() {
	var id = $('#thisId').html();
    // var days = $('#days').val();
    var days = $('#days').val();
    var money= $('#money').val();
    var money1 = $("#money1").val();
    if(confirm("您确定续期吗？")) {
        $.ajax({
            url: urlcore + "/api/user/xuqiOrder?id=" + id + "&days=" + days + "&money=" + money + "&overMoney=" + money1,
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                alert(data.msg);
                location.reload()
            },
            error: function() {
                /* Act on the event */
                console.log(data.msg);
                alert(data.msg);
            }
        });
    }
}

function over(id) {
    $('#thisId2').html(id);
}

function settle() {
    var id = $('#thisId2').html();
    var money= $('#money2').val();
    var money1 = $("#money3").val();
    if(confirm("您确定结清此订单吗？")) {
        $.ajax({
            url: urlcore + "/api/user/repayOrder?id=" + id + "&money=" + money + "&overMoney=" + money1,
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                alert(data.msg);
                location.reload()
            },
            error: function() {
                /* Act on the event */
                console.log(data.msg);
                alert(data.msg);
            }
        });
    }
}
/**
 * 退回
 * @param {} orderId
 */
function reback(orderId){
	if(confirm("您确定退回吗？")) {
		$.ajax({
			url: urlcore + "/api/loanOrder/reback?orderId=" + orderId,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				alert(data.msg);
				location.reload()
			},
			error: function() {
				/* Act on the event */
				console.log(data.msg);
				alert(data.msg);
			}
		});
	}
}