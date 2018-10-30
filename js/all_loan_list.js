var gmtDatetime='';
var giveTime ='';
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
	var index = 0;
	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/loanOrder/userSelectLoanOrder?gmtDatetime=" + gmtDatetime + "&name=" + name + "&phone=" + phone + "&currentPage=" + pageNo+"&status=" + (-3)+ "&giveTime=" + giveTime,
			type: "get",
			dataType: 'json',
			async:'false',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
                if (data.success == true) {
                    $.each(data.data.pageDto.list, function(i, n) {
                        var juese = "新用户";
                        if (n.auditorId == null) {
                            dd = "未分配";
                        } else {
                            dd = "已分配";
                        }
                        var userName = "";
                        var phone = "";
                        if (n.user) {
                            userName = n.user.userName;
                            phone = n.user.phone;
                        }
                        var id = n.id;
                        if (n.user && n.user.isOld == 1) {
                            juese = "老用户";
                        }

                        var style = "";
                        var label = "";
                        if (n.user.label == 2) {
                            style = "btn-success"
                            label = "优质用户"
                        } else if (n.user.label == 3) {
                            style = "btn-danger"
                            label = "逾期用户"
                        } else if (n.user.label == 1) {
                            label = "新用户"
                        }
                        var thislist =
                            '<tr class="footable-even" style="display: table-row;">' +
                            '	<td class="footable-visible">' + n.id + '</td>' +
                            '	<td class="footable-visible">' + n.lianPayNum + '</td>' +
                            '	<td class="footable-visible">' + userName + '</td>' +
                            '	<td class="footable-visible">' + phone + '</td>' +
                            '	<td class="footable-visible">' + n.limitDays + '</td>' +
                            '	<td class="footable-visible">' + n.borrowMoney + '</td>' +
                            '	<td class="footable-visible">' + n.realMoney + '</td>' +
                            '	<td class="footable-visible">' + n.needPayMoney + '</td>' +
                            '	<td class="footable-visible">' + n.giveTime + '</td>' +
                            '	<td class="footable-visible">' + n.limitPayTime + '</td>' +
                            // '<td class="footable-visible">' + juese + '</td>' +
                            '	<td class="footable-visible">' + dd + '</td>' +
                            '	<td class="footable-visible" ><span class="btn ' + style + '  btn-xs">' + label + '</span></td>' +
                            '	<td class="footable-visible footable-last-column">' +
                            '		<a hidden="hidden" name="分配" class="" href="javascript:;" data-toggle="modal" data-target="#fenpei" onclick="fenpei(' + id + ')">分配</a>&nbsp;' +
                            '		<a hidden="hidden" name="查看认证信息" class="" href="tab.html?id=' + n.userId + '&userName=' + escape(userName) + '&phone=' + phone + '&orderId=' + n.id + '" >查看认证信息</a>&nbsp;' +
                            '		<a hidden="hidden" name="查看老用户" class="" href="javascript:;" data-toggle="modal" data-target="#oldMsg" onclick="selectOld(' + n.userId + ')">查看老用户</a>&nbsp;' +
                            '		<a hidden="hidden" name="详情" class="" href="loan_apply_list_detail.html?id=' + id + '" >详情</a>&nbsp;' +
                            '		<a hidden="hidden" name="同意" class="" href="javascript:;"  onclick="thisAgree(' + id + ')">同意</a>&nbsp;' +
                            '		<a hidden="hidden" name="拒绝" class="" href="javascript:;"  onclick="thisRefuse(' + id + ')">拒绝</a>';
							if (n.orderStatus != 6) {
								thislist += '<a hidden="hidden" name="结清" class=""  href="javascript:;"  onclick="over(' + id + ')">结清</a>&nbsp;';
								thislist += '<a hidden="hidden" name="续期" class=""  href="javascript:;"  onclick="continueDate(' + id + ')">续期</a>&nbsp;';
							}
                        	'	</td>' +
                        	'</tr>';
                        //alert(n.userId);
                        $('#thislist').append(thislist);
					});
                    $.each(arrayTitle, function(i, k) {

                        $('a[name="' + k + '"]').attr("hidden", false).attr("class", "btn btn-primary btn-xs");
                        $('a[data="' + k + '"]').attr("hidden", false).attr("class", "btn btn-default search-btn");
                    });
                    $('#totalMoney').text(data.data.borrowMoney);
                    $('#totalPeople').text(data.data.pageDto.total);
                    $("#pager").pager({
                        pagenumber: pageNo,
                        pagecount: data.data.pageDto.pages,
                        totalcount: data.data.pageDto.total,
                        buttonClickCallback: PageClick
                    });

                    if (data.code == 'OVERTIME') {
                        var thisUrl = window.location.href;
                        if (thisUrl.indexOf('login.html') <= -1) {
                            top.window.location.href = "login.html";
                        }
                    } else {
                        if (data.msg != '空数据') {
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

	phone = $('#phoneNumber').val().trim();
	name = $('#userName').val().trim();
	gmtDatetime = $('#applyTime').val().trim();
	giveTime = $('#giveTime').val().trim();

	loadMyEssay();
//	countPeopleMoney(time, userName, phoneNumber,'');

}

function exportFun() {
	window.location.href = urlcore + "/api/loanOrder/ef?gmtDatetime=" + gmtDatetime + "&name=" + name + "&phone=" + phone + "&status=" + (-3)+ "&giveTime=" + giveTime
}

function checkAuthDetails(id) {

}

function selectOrdersStatus(orderStatus) {
	loadMyEssay();
//	countPeopleMoney('', '', '', orderStatus);
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
function countPeopleMoney(gmtDatetime, name, phoneNumber, orderStatus) {
	$.ajax({
		url: urlcore + "/api/loanOrder/countPeopleMoney4?gmtDatetime=" + gmtDatetime + "&orderStatus=" + orderStatus + "&name=" + name + "&phoneNumber=" + phoneNumber,
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

function over(id) {
	if(confirm("您确定结清此订单吗？")) {
		$.ajax({
			url: urlcore + "/api/user/repayOrder?id=" + id,
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

function xuqi(id) {
	alert(id);
	$('#thisId').html(id);
}

function xuqiSend() {
	var id = $('#thisId').html();
	var days = $('#days').val();
	var money= $('#money').val();
	alert(id);
	if(confirm("您确定续期吗？")) {
		$.ajax({
			url: urlcore + "/api/user/xuqiOrder?id=" + id+ "&days=" + days+ "&money=" + money,
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