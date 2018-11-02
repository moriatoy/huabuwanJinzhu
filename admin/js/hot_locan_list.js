var authStatus = '';
var phoneNumber = '';
var userName = '';
var currentPage = 1;
var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array; 
loadMyEssay(authStatus, phoneNumber, userName);

function loadMyEssay(authStatus, phoneNumber, userName) {

	$(document).ready(function() {
		findMyCatalogue()
		init(currentPage);
	});

	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/user/selectUserList?authStatus=" + authStatus + "&phone=" + phoneNumber + "&userName=" + userName + "&current=" + pageNo,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {

				if(data.success == true) {
					$.each(data.data.list, function(i, n) {
						var status = '';
						if(n.status == 1) {
							status = '正常';
						} else if(n.status == 2) {
							status = '黑名单';
						} else if(n.status == 3) {
							status = '禁用';
						}else if(n.status == 4){
                            status='被拒绝(拒绝后，一月之后可借款)';
                        }
						var authstatus = ""; //认证状态
						if(n.authStatus == 0) {
							authstatus = "未认证";
						} else if(n.authStatus == 1) {
							authstatus = "认证成功";
						}
						var id = n.id;
						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
							'	<td class="footable-visible"><input type="checkbox" /></td>' +
							'	<td class="footable-visible">' + n.id + '</td>' +
							'	<td class="footable-visible">' + n.userName + '</td>' +
							'	<td class="footable-visible">' +'<a  class="btn" href="orderList.html?phone=' + n.phone+ '">'+n.phone+ '</a></td>' +
							'	<td class="footable-visible">' + n.gmtDatetime + '</td>' +
							'	<td class="footable-visible">' + status + '</td>' +
                            '	<td class="footable-visible">' + common.showTextFormatter(n.refusalReason) + '</td>' +
							'	<td class="footable-visible">' + n.authScore + '</td>' +
							'	<td class="footable-visible">' + authstatus + '</td>' +
							'	<td class="footable-visible">' + common.showTextFormatter(n.channelName) + '</td>' +
							'	<td class="footable-visible footable-last-column">'+
							'		<a class="btn btn-primary btn-xs" href="tab.html?id='+n.id+'&userName='+escape(n.userName)+'&phone='+n.phone+ '" >查看认证详情</a>&nbsp;' +
							'		<a hidden="hidden" class="" name="拉黑" href="javascript:;" data data-toggle="modal" data-target="#jujueMultiple" onclick="thisUpdate(' + id + ')">拉黑</a>&nbsp;'+
							'		<a hidden="hidden" class="" name="禁用" href="javascript:;" data onclick="thisDelete(' + id + ')">禁用</a>&nbsp;' +
                            '		<a hidden="hidden" class="" name="修改额度" href="javascript:;" data-toggle="modal" data-target="#updateMoney" onclick="updateMoneyUI('+id+')">修改额度</a>&nbsp;'+
                            '		<a hidden="hidden" class="" name="重置密码" href="javascript:;" onclick="resetPassword('+id+')">重置密码</a>' +
                            '		<a hidden="hidden" class="" name="修改银行卡" href="javascript:;" data-toggle="modal" data-target="#bankCard" onclick="thisUpdate(' + id + ')">修改银行卡</a>' +
							'	</td>'+
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
	
	loadMyEssay('',phoneNumber,userName);


}


function selectOrdersStatus(authstatus){
	var authstatus = $('#authStatus').val();
	loadMyEssay(authstatus,'','');
	
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
function thisDelete(id) {
	if(confirm("您确定要禁用该用户吗？")){
		$.ajax({
			url: urlcore + "/api/user/GoDeleteUpdate?id="+id,
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
// 重置密码
function resetPassword(id) {
    if(confirm("您确定要重置密码吗？")){
        $.ajax({
            url: urlcore + "/api/user/resetPassword?userId="+id,
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success:function(data){
                alert("重置密码成功！")
            },
            error:function() {
                /* Act on the event */
                alert("error");
            }
        });
    }
}
// function thisUpdate(id) {
// 	if(confirm("您确定要删除该用户吗？")){
// 		$.ajax({
// 			url: urlcore + "/api/user/GoDeleteUpdate1?id="+id,
// 			type: "get",
// 			dataType: 'json',
// 			contentType: "application/json;charset=utf-8",
// 			success:function(data){
// 			     loadMyEssay('','','');
// 			},
// 			error:function() {
// 				/* Act on the event */
// 				alert("error");
// 			}
// 		});
// }
// }

function thisUpdate(id) {
    $("#userId").val(id);
    $("#reason").val("");
    $("#bankCardName").val("");
    $("#bankCardNumber").val("");
}

function jujueFun() {
    if ($("#reason").val()) {
        if(confirm("您确定要拉黑该用户吗？")) {
            $.ajax({
				url: urlcore + "/api/user/GoDeleteUpdate1?id=" + $("#userId").val() + "&refuse=" +  $("#reason").val(),
				type: "get",
				dataType: 'json',
				contentType: "application/json;charset=utf-8",
				success:function(data){
                    if (data.data) {
                        loadMyEssay('','','');
                    } else {
                        alert(data.msg)
                    }
				},
				error:function() {
					/* Act on the event */
					alert("error");
				}
			});
        }
    } else {
        alert("内容不能为空！")
    }
}

function bankCardFun() {
	if ($("#bankCardNumber").val() === "") {
		alert("请输入银行卡号")
	} else if ($("#bankCardName").val() === "") {
		alert("请输入银行卡名称")
	} else {
		var data = {
            userId: $("#userId").val(),
            bankName: $("#bankCardName").val(),
            bankNo: $("#bankCardNumber").val()
		};
        $.ajax({
            url: urlcore + "/api/userBank/newUpdate",
            type: "POST",
            dataType: 'json',
			data: JSON.stringify(data),
            async: false,
            contentType: "application/json;charset=utf-8",
            success:function(data){
                $( '#bankCard' ).modal( 'hide' );
                if (data.success == true) {
                    alert("修改成功")
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

function findMyCatalogue(){
	$.ajax({
		url: urlcore + "/api/roleThirdCatalogue/findAllByUser?secondTitle=会员列表",
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