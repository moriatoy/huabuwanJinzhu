var authStatus = '';
var phoneNumber = '';
var userName = '';
var currentPage = 1;
var id1=getvl("id");
var ids = new Array;
var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array; 
loadMyEssay(authStatus, phoneNumber, userName);

function loadMyEssay(authStatus, phoneNumber, userName) {

	$(document).ready(function() {
		findMyCatalogue();
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
							'<td class="footable-visible"><input type="checkbox" onclick="arrayAdd(this)" id="' + n.id + '"/></td>' +
						    '<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible">' + n.userName + '</td>' +
							'<td class="footable-visible">' + n.phone + '</td>' +
							'<td class="footable-visible">' + n.gmtDatetime + '</td>' +
							'<td class="footable-visible">' + status + '</td>' +
							'<td class="footable-visible">' + authstatus + '</td>' +
								'</tr>';
				
						$('#thislist').append(thislist);
						//setchecked(ids);
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


function selectOrdersStatus(authstatus){
	var authstatus = $('#authStatus').val();
	loadMyEssay(authstatus,'','');
	
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


function sendMessage(){
	if(confirm("您确定发送吗？")){
		$.ajax({
			url: urlcore + "/api/pushMsg/sendMsgToSome?id="+id1+ "&userId=" + ids,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
				alert("推送成功！");
				
			     loadMyEssay('','','');
			     ids = new Array;
			     location.href='punsh_msg_list.html';
			     
			},
			error:function() {
				/* Act on the event */
				alert("error");
			}
		});	
}	
}

/*
function setchecked(ids){
	for(var i=0;i<ids.length;i++){
		//document.getElementById(ids[i]).checked=true;
		$('#ids[i]').attr('checked',true);
	    
	}
	
}*/

function arrayAdd(object) {
	if(object.checked) {
		ids.push(object.id);
		
	} else {
		removeByValue(ids, object.id);
		
	}

}
