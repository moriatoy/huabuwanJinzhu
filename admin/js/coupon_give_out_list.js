var authStatus = '';
var phoneNumber = '';
var userName = '';
var id = getvl('id');
var allGiveOut = false;
var ids = new Array;
var currentPage = 1;
loadMyEssay(authStatus, phoneNumber, userName);

function loadMyEssay(authStatus, phoneNumber, userName) {

	$(document).ready(function() {
		init(currentPage);
	});

	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/user/selectUserList?authStatus=1&status=1&phone=" + phoneNumber + "&userName=" + userName + "&current=" + pageNo,
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
							'<td class="footable-visible"><input type="checkbox" onclick="thisSelect(this)" name="'+n.id+'"/></td>' +
							'<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible">' + n.userName + '</td>' +
							'<td class="footable-visible">' + n.phone + '</td>' +
							'<td class="footable-visible">' + new Date(n.gmtDatetime).pattern("yyyy-MM-dd hh:mm:ss") + '</td>' +
							'<td class="footable-visible">' + n.money + '</td>' +
							'<td class="footable-visible">' + n.authScore + '</td>' +
							'<td class="footable-visible">' + status + '</td>' +
							'<td class="footable-visible">' + authstatus + '</td>' +
							'</tr>';
						$('#thislist').append(thislist);
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
function searchPhoneNumber() {
	var code = event.keyCode;
	if(code == 13) {
		 searchPhoneList();
	}

}

function searchPhoneList() {
	var phoneNumber = $('#phoneNumber').val().trim();

	loadMyEssay('', phoneNumber, '');
}

function selectAuth_Status(authstatus) {
	loadMyEssay(authstatus, '', '');
}

function showMsg() {
	var code = event.keyCode;
	if(code == 13) {
		searchNameList();
	}

}

function searchNameList() {
	var userName = $('#nameSearch').val().trim();
	loadMyEssay('', '', userName);
}

function giveOut(obj) {
	var urlPath;
	if (obj == 1) {
		urlPath = urlcore + "/api/coupon/giveOut?id="+id+"&allGiveOut=true"
	}else{
		urlPath = urlcore + "/api/coupon/giveOut?id="+id+"&allGiveOut=false";
		if(ids.length == 0){
			alert("请选择用户！");
			return;
		}
	}
	var html="[";
	$.each(ids, function(i,n) {
		if(i != 0){
			html = html + ',';
		}
		html = html +n;
	});
	html+="]";
	
	if(confirm("确认发放？")){
		$.ajax({
			url: urlPath,
			type: "post",
			dataType: 'json',
			data:html,
			contentType: "application/json;charset=utf-8",
			success:function(data){
			    if (data.success == true) {
			    	window.history.go(-1)
			    }
			},
			error:function() {
				/* Act on the event */
				alert("error");
			}
		});	
	}
}

function giveOutAll(){
	
	
	
}

//选择用户
function thisSelect(object){
	if(object.checked){
		ids.push(object.name);
		alert(ids);
	}else{
		removeByValue(ids,object.name);
		alert(ids);
	}
}
