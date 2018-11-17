var gmtDatetime='';
var name='';
var phone='';
var currentPage=1;
var totalPeople=0;
var totalMoney = 0;
var fourthBorrowMoney = 0;
var jName = getCookie('Jname');
var orderId = '';
//我的权限数组
var arrayTitle = new Array;
var orderId = getvl('orderId');
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
			url: urlcore + "/api/loanOrder/userSelectLoanOrder?gmtDatetime=" + gmtDatetime + "&name=" + name + "&phone=" + phone + "&currentPage=" + pageNo+"&status=" + 2,
			type: "get",
			dataType: 'json',
			async:'false',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
        	if(data.success == true) {
					$.each(data.data.pageDto.list, function(i, n) {					
						var juese = "新用户";
						if(n.loanId == null){
					    	dd="未分配";
					    }else{
					    	dd="已分配";
					    }
					    if($.trim(n.loaner) != ''){
					    	dd = n.loaner;
					    }
						if(n.user.isOld == 1){
							
							juese = "老用户";
						}
						var id = n.id;
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
						var style="";
						var label="";
						var style="";
						var label="";
						if(n.user.label==2){
							style="btn-success";
							label="优质用户";
							addRedColor = 'color:red';
						}else if(n.user.label==3){
							style="btn-danger";
							label="逾期用户"
						}else if(n.user.label==1){
							label="新用户"
						}
						var btnRedColor = '';
						if (n.alipayCheckStatus === 0) {
                            btnRedColor = "background: red";
						} else if (n.alipayCheckStatus === 1) {
                            btnRedColor = "";
						}
						var satus = "";
						if (n.giveStatus == 0) {
							satus = "background: #edf2fc;color:#909399"
						} else if (n.giveStatus == 1) {
                            satus = "background: #fdf6ec;color:#e6a23c"
						} else if (n.giveStatus == 2) {
                            satus = "background: #f0f9eb;color:#67c23a"
                        } else if (n.giveStatus == 3) {
                            satus = "background: #fef0f0;color:#f56c6c"
						}

						var thislist =
							'<tr class="footable-even" style="display: table-row;'+addRedColor+'">' +
							'<td class="footable-visible"><input type="checkbox" value="'+n.id+'" name="selectcheck"/></td>' +
							'<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible"><span class="btn btn-xs" style="'+satus+'">' + n.lianPayNum + '</span></td>' +
							'<td class="footable-visible">' + userName + '</td>' +
							'<td class="footable-visible">' + phone + '</td>' +
							'<td class="footable-visible">' + n.limitDays + '</td>' +
							'<td class="footable-visible">' + n.borrowMoney + '</td>' +
							'<td class="footable-visible">' + n.realMoney + '</td>' +
							'<td class="footable-visible">' + n.needPayMoney + '</td>' +
							'<td class="footable-visible">' + n.gmtDatetime + '</td>' +
							// '<td class="footable-visible">' + n.allowDays + '</td>' +
							'<td class="footable-visible">' + channelName + '</td>' +
                            '<td class="footable-visible">' + dd + '</td>' +
							'<td class="footable-visible">' + juese + '</td>' +
							'<td class="footable-visible" ><span class="btn '+ style+ '  btn-xs">' + label+ '</span></td>' +							
							'<td class="footable-visible footable-last-column">'+
								'<a hidden="hidden" class="" name="分配" href="javascript:;" data-toggle="modal" data-target="#jsfenpei" onclick="fenpeiHuangKuan('+id+')">分配</a>&nbsp;'+
								'<a hidden="hidden" name="查看认证信息" style="'+btnRedColor+'" class="" href="tab.html?id=' + n.userId + '&userName=' +escape(userName)  + '&phone=' + phone + '&orderId=' +n.id+ '" >查看认证信息</a>&nbsp;'+
								'<a hidden="hidden" name="查看老用户" class="" href="javascript:;" data-toggle="modal" data-target="#oldMsg" onclick="selectOld('+n.userId+')">查看老用户</a>&nbsp;'+
								'<a hidden="hidden" name="详情" class="" href="loan_apply_list_detail.html?id='+id+'" >详情</a>&nbsp;'+
                                '<a hidden="hidden" name="自动打款" class="" href="javascript:;"  onclick="passMoney(' + id + ',' + i + ')">富友打款</a>&nbsp;'+
								'<a hidden="hidden" name="同意" class="" href="javascript:;"  onclick="thisAgree(' + id +','+ i + ')">同意</a>&nbsp;'+
								'<a hidden="hidden" name="拒绝" class="" href="javascript:;" data-toggle="modal" data-target="#jujueMultiple" onclick="thisRefuse(' + id + ')">拒绝</a>&nbsp;'+
								'<a hidden="hidden" name="手动打款" class="" href="javascript:;"  onclick="manMoney(' + id +','+ i + ')">手动打款</a>&nbsp;'+
                            	'<a hidden="hidden" class="" name="修改额度" href="javascript:;" data-toggle="modal" data-target="#updateMoney" onclick="updateMoneyUI('+n.userId+')">修改额度</a></td>'+
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

function searchList() {
  
	var phoneNumber = $('#phoneNumber').val().trim();
	var userName = $('#userName').val().trim();
	var time = $('#applyTime').val().trim();
	loadMyEssay(time, userName, phoneNumber);
	//countPeopleMoney(time, userName, phoneNumber);
}

function checkAuthDetails(id) {

}


function manMoney(id,index) {
    if (confirm("您确定打款吗？")) {
        $("#thislist").children().eq(index).children().eq(14).children("a").eq(7).attr('disabled',"true");
        $.ajax({
            //url: urlcore + "/api/user/payOrder?id=" + id,
			url: urlcore + "/api/lianpaymanul/tradepayapi/receiveNotify?orderId=" + id,
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if ($.trim(data.ret_msg) != '') {
                    alert(data.ret_msg);
                } else if ($.trim(data.msg) != '') {
                    alert(data.msg);
                }
                loadMyEssay('', '', '');
                //countPeopleMoney('','','');
                location.reload()
            },
            error: function () {
                /* Act on the event */
                console.log(data.ret_msg);
                alert(data.ret_msg);
            }
        });
    }
}
function passMoney(id,index) {
	if(confirm("您确定富友打款吗？")) {
        $("#thislist").children().eq(index).children().eq(14).children("a").eq(4).attr('disabled',"true");
        $.ajax({
            url: urlcore + "/api/user/payFuyou?id=" + id,
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                if($.trim(data.ret_msg) != ''){
                    alert(data.ret_msg);
                }else if($.trim(data.msg) != ''){
                    alert(data.msg);
                }
                // loadMyEssay('','','');
                //countPeopleMoney('','','');
                // location.reload()
            },
            error: function() {
                alert(data.ret_msg);
            }
        });


		// $.ajax({
         //    // url: urlcore + "/api/user/payOrder?id=" + id,
         //    url: urlcore + "/api/user/payOrderChan?id=" + id,
		// 	// url: urlcore + "/api/lianpay/tradepayapi/receiveNotify?orderId=" + id,
		// 	type: "get",
		// 	dataType: 'json',
		// 	contentType: "application/json;charset=utf-8",
		// 	success: function(data) {
		// 	    if($.trim(data.ret_msg) != ''){
         //            alert(data.ret_msg);
         //        }else if($.trim(data.msg) != ''){
         //            alert(data.msg);
         //        }
		// 		loadMyEssay('','','');
		// 		//countPeopleMoney('','','');
		// 		// location.reload()
		// 	},
		// 	error: function() {
		// 		/* Act on the event */
		// 		console.log(data.ret_msg);
		// 		alert(data.ret_msg);
		// 	}
		// });
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
				//countPeopleMoney('','','');
				
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

function selectAll(o){
	var mm=document.getElementsByName("selectcheck");
	for(var i=0;i<mm.length;i++){
		mm[i].checked=o.checked;
	}
}

function countPeopleMoney(gmtDatetime,name, phoneNumber) {
	$.ajax({
		url: urlcore + "/api/loanOrder/countPeopleMoney3?gmtDatetime=" + gmtDatetime + "&name=" + name + "&phoneNumber=" + phoneNumber,
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
function updateMoneyUI(id){
    userId = id;
    // $.ajax({
    //     url: urlcore + "/api/partner/getPartner",
    //     type: "get",
    //     dataType: 'json',
    //     contentType: "application/json;charset=utf-8",
    //     success:function(data){
    //         if(data.data && data.data.fourthBorrowMoney){
    //             fourthBorrowMoney = data.data.fourthBorrowMoney
    //             $('#newMoney').val(data.data.fourthBorrowMoney);
    //         }
    //     }
    // });
    $.ajax({
        url: urlcore + "/api/paramSetting/selectOne",
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success:function(data){
            if(data.data && data.data.maxBorrowMoney){
                fourthBorrowMoney = data.data.maxBorrowMoney;
                $('#newMoney').val(data.data.maxBorrowMoney);
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
    if(Number(money) > Number(fourthBorrowMoney)){
        alert("金额不能大于"+fourthBorrowMoney);
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


function fenpeiHuangKuan(id){
    orderId = id;
    $.ajax({
        url: urlcore + "/api/loanOrder/selectAllLoanMan",
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            if(data.success == true) {
                var thislist='<option value="">请选择放款人</option>';
                $.each(data.data, function(i,n) {

                    thislist = thislist +
                        '<option value="'+n.id+'">'+n.userName+'</option>';
                });
                $("#jsfenpeiSelect").html(thislist);
            }
        },
        error: function() {
            /* Act on the event */
            alert("error");
        }
    });
}

function fenpeiFangKuan(){
    var pmId = $("#jsfenpeiSelect").val();
    $.ajax({
        url: urlcore + "/api/loanOrder/giveout?orderIds="+orderId +"&userId="+pmId,
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
        url: urlcore + "/api/loanOrder/selectAllLoanMan",
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            if(data.success == true) {
                var thislist='<option value="">请选择放款员</option>';
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
        url: urlcore + "/api/loanOrder/giveout?orderIds="+orderIds+"&userId="+userId,
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
function selectAll(o){
    var mm=document.getElementsByName("selectcheck");
    for(var i=0;i<mm.length;i++){
        mm[i].checked=o.checked;
    }
}