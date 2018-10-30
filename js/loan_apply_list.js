var gmtDatetime='';
var name='';
var phone='';
var currentPage=1;
var totalPeople=0;
var totalMoney = 0;
var orderId = getvl('orderId');
var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array; 
loadMyEssay();
//countPeopleMoney(gmtDatetime, name, phone);

function loadMyEssay(){
	
	$(document).ready(function() {
		findMyCatalogue();
		init(currentPage);
	});

	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/loanOrder/userSelectLoanOrder?gmtDatetime=" + gmtDatetime + "&name=" + name + "&phone=" + phone + "&currentPage=" + pageNo+"&status=" + 1,
			type: "get",
			dataType: 'json',
			async:'false',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
        	if(data.success == true) {
					$.each(data.data.pageDto.list, function(i, n) {
						var juese = "新用户";
						if(n.auditorId == null){
					    	dd="未分配";
					    }else{
					    	dd="已分配";
					    }
					    if($.trim(n.authour) != ''){
					    	dd = n.authour;
					    }
						if(n.user && n.user.isOld == 1){
							
							juese = "老用户";
						}
						var id = n.id;
						var auditHtml = '';
                        if(n.isPass == null || n.isPass == 0){//未机审过的才能机审
                            auditHtml += '<a hidden="hidden" name="机审" class="" href="javascript:;"  onclick="thisIsPass(' + id + ')">机审</a>&nbsp;'
                        }
                        var userName = "";
                        var phone ="";
                        var channelName ='';
                        if(n.user){
                            userName = n.user.userName;
                            phone = n.user.phone;
                            channelName = n.user.channelName;
						}
						if(!channelName){
                            channelName = '/';
						}
						var addRedColor = '';
						if(channelName && channelName.indexOf('super')!=-1){
                            addRedColor = 'color:red';
						}
						var style=""
						var label=""
						if(n.user.label==2){
							style="btn-success"
							label="优质用户"
							addRedColor = 'color:red';
						}else if(n.user.label==3){
							style="btn-danger"
							label="逾期用户"
						}else if(n.user.label==1){
							label="新用户"
						}
						var thislist =
							'<tr class="footable-even" style="display: table-row;'+addRedColor+'">' +
							'<td class="footable-visible"><input type="checkbox" name="selectcheck" value="'+n.id+'"/></td>' +
							'<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible">' + n.lianPayNum + '</td>' +
							'<td class="footable-visible">' + userName + '</td>' +
							'<td class="footable-visible">' + phone + '</td>' +
							'<td class="footable-visible">' + n.limitDays + '</td>' +
							'<td class="footable-visible">' + n.borrowMoney + '</td>' +
							'<td class="footable-visible">' + n.realMoney + '</td>' +
							'<td class="footable-visible">' + n.needPayMoney + '</td>' +
							'<td class="footable-visible">' + n.gmtDatetime + '</td>' +
							'<td class="footable-visible">' + channelName + '</td>' +
							'<td class="footable-visible">' + juese + '</td>' +
							'<td class="footable-visible">' +  dd+ '</td>' +
							'<td class="footable-visible" ><span class="btn '+ style+ '  btn-xs">' + label+ '</span></td>' +							
							'<td class="footable-visible footable-last-column" style="text-align: center">'+
								'<a hidden="hidden" class="" name="分配" href="javascript:;" data-toggle="modal" data-target="#fenpei" onclick="fenpei('+id+')">分配</a>&nbsp;'+
								'<a hidden="hidden" name="查看认证信息" class="" href="tab.html?id=' + n.userId + '&userName=' +escape(userName)  + '&phone=' + phone + '&orderId=' +n.id+ '" >查看认证信息</a>&nbsp;'+
								'<a hidden="hidden" name="查看老用户" class="" href="javascript:;" data-toggle="modal" data-target="#oldMsg" onclick="selectOld('+n.userId+')">查看老用户</a>&nbsp;'+
								'<a hidden="hidden" name="详情" class="" href="loan_apply_list_detail.html?id='+id+'" >详情</a>&nbsp;'+
                            	auditHtml+
								'<a hidden="hidden" name="同意" class="" href="javascript:;"  onclick="thisAgree(' + id + ')">同意</a>&nbsp;'+
								'<a hidden="hidden" name="拒绝" class="" href="javascript:;" data-toggle="modal" data-target="#jujueMultiple" onclick="thisRefuse(' + id + ')">拒绝</a>&nbsp;'+
							    '<a hidden="hidden" name="修改额度" class=""  href="javascript:;" data-toggle="modal" data-target="#updateMoney" onclick="updateMoneyUI('+n.userId+')">修改额度</a>'+
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

function fenpei(id){
	orderId = id;
	$.ajax({
			url: urlcore + "/api/loanOrder/selectAllPassMan",
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
		     success: function(data) {
				if(data.success == true) {
					var thislist='<option value="">请选择审核人</option>';
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


function fenpeiqueren(){
	var pmId = $("#fenpeixiala").val();
	$.ajax({
			url: urlcore + "/api/loanOrder/setUpPassMan?orderIds="+orderId+"&userId="+pmId,
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


function EnterSearchList() {
	var code = event.keyCode;
	if(code == 13) {
		searchList();
	}
}
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
function searchList(){
	
	phone=$('#phoneNumber').val().trim();
	name=$('#userName').val().trim();
	gmtDatetime=$('#applyTime').val().trim();
	loadMyEssay();
	
}



function checkAuthDetails(id){
	
}

function thisAgree(id){
	
	if(confirm("您确定同意该申请吗？")) {
		$.ajax({
			url: urlcore + "/api/loanOrder/thisAgree?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					loadMyEssay('');
				}else{
					alert(data.msg);
				}			
				//countPeopleMoney('')
			},
			error: function() {
				/* Act on the event */
				alert("error");
			}
		});
	}

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
	
	


// function thisRefuse(id){
// 	totalMoney = 0;
//     totalPeople = 0;
// 	if(confirm("您确定拒绝该申请吗？")) {
// 		$.ajax({
// 			url: urlcore + "/api/loanOrder/thisRefuse?id=" + id,
// 			type: "get",
// 			dataType: 'json',
// 			contentType: "application/json;charset=utf-8",
// 			success: function(data) {
// 				loadMyEssay('');
// 			//countPeopleMoney('');
// 			},
// 			error: function() {
// 				/* Act on the event */
// 				alert("error");
// 			}
// 		});
// 	}
//
// }

function jujueList(data) {
    $("#reason").val(data);
}

function thisRefuse(id) {
    $("#userId").val(id);
    $("#reason").val("");
}

function jujueFun() {
	if ($("#reason").val()) {
        if(confirm("您确定拒绝该申请吗？")) {
            $.ajax({
                url: urlcore + "/api/loanOrder/thisRefuse?id=" + $("#userId").val() + "&refuse=" +  $("#reason").val(),
                type: "get",
                dataType: 'json',
                contentType: "application/json;charset=utf-8",
                success: function(data) {
                    if (data.data) {
                        loadMyEssay('','','');
                    } else {
                        alert(data.msg)
                    }
                },
                error: function() {
                    alert("error");
                }
            });
        }
	} else {
		alert("内容不能为空！")
	}

}

function countPeopleMoney(gmtDatetime,name, phone) {
	/*$.ajax({
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
	});*/
}

function findMyCatalogue(){
	console.log(jName)
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

function updateMoneyUI(id){
    userId = id;
    $.ajax({
        url: urlcore + "/api/user/updateMoneyUI?id="+id,
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success:function(data){
            if(data.data && data.data.money){
                $('#oldMoney').val(data.data.money);
                $('#newMoney').val('');
            }
        }
    });
}
function updateMoney(){
    var money = $("#newMoney").val();
    if($.trim(money) == ''){
        alert("金额不能为空");
        return false;
    }
    if(isNaN(money)){
        alert("金额必须为数字");
        return false;
    }
    $.ajax({
        url: urlcore + "/api/user/updateMoney?id="+userId+"&money="+money,
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

function fenpei2(id){
    orderId = id;
    $.ajax({
        url: urlcore + "/api/loanOrder/selectAllPassMan",
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            if(data.success == true) {
                var thislist='<option value="">请选择审核人</option>';
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
        url: urlcore + "/api/loanOrder/setUpPassMan?orderIds="+orderIds+"&userId="+userId,
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

function selectAll(o) {
    var mm = document.getElementsByName("selectcheck");
    for(var i = 0; i < mm.length; i++) {
        mm[i].checked = o.checked;
    }
}
function applyLoan(){
	var loanCount = $('#jsapplyInput').val();
	if($.trim(loanCount) == ''){
		alert("请填写申请订单数量");
		return false;
	}
	if(isNaN(loanCount)){
		alert("请输入数字");
		return false;
	}
	if(parseInt(loanCount) < 1){
		alert("请输入大于0的数字");
		return false;
	}
	
    if(confirm("您确定申请吗？")) {
    	$.ajax({
	        url: urlcore + "/api/loanOrder/applyLoan?loanCount="+loanCount,
	        type: "get",
	        dataType: 'json',
	        contentType: "application/json;charset=utf-8",
	        success: function(data) {
	        	if(data.success){
					alert("申请成功");  
					location.reload();
	        	}else{
	        		alert(data.msg);
	        	}
	        },
	        error: function() {
	            location.reload();
	        }
	    });
    }
}
