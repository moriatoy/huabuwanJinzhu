var phoneNo='';
var userId='';
userId= getvl('userId');


loadMyEssay(phoneNo,userId);



function loadMyEssay(phoneNo,userId) {		
	$(document).ready(function() {
		//设置默认第1页
	    init(1);
	});
	
	//默认加载  
	function init(pageNo){
		//获取用户信息列表
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/userPhoneRecord/findByUserIdPage?userId="+userId+"&pageNo="+pageNo+"&phoneNo="+phoneNo+"&pageSize="+pageSize,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
				if (data.success == true) { 
					//i表示在data中的索引位置，n表示包含的信息的对象
					$.each(data.data.list,function(i,n){
						var thislist = '<tr>'+
'                                    <td class="footable-visible">'+n.id+'</td>'+
'                                    <td class="footable-visible">'+n.phoneNo+'</td>'+
'                                    <td class="footable-visible">'+n.commPlac+'</td>'+
'                                    <td class="footable-visible">'+n.connTimes+'</td>'+
'                                    <td class="footable-visible">'+n.commFee+'</td>'+
'                                    <td class="footable-visible">'+n.commMode+'</td>'+
'                                    <td class="footable-visible">'+n.callType+'</td>'+
'                                    <td class="footable-visible">'+n.startTime+'</td>'+
'                                </tr>';
						$('#thislist').append(thislist);
					});
					$('a[name="1"]').text('详情');
					$('#thiscount').text(data.data.total);
					$("#pager").pager({
					pagenumber: pageNo, 
					pagecount:data.data.pages,
					totalcount:data.data.total,
					buttonClickCallback: PageClick
					}); 
					
				} else if (data.code == 'OVERTIME'){
					var thisUrl = window.location.href;
					if (thisUrl.indexOf('login.html') <= -1) {
						top.window.location.href="login.html";
					}

				} else {
					if (data.msg != '空数据') {
						alert(data.msg)
					}else{
						$('#thiscount').text(0);
					}
				}

			},
			error:function() {
				/* Act on the event */
				alert("error");
			}
		});
	}

	//回调函数  
	PageClick = function(pageclickednumber) {  
	    init(pageclickednumber); 
	}

}

//
function thisUpdate(id) {	
	$('#thisId_update_fail').val(id);
}



//修改
function thisStatus(id) {
	$.ajax({
		url: urlcore + "/api/userRealName/updateStatus?id="+id+"&status="+1,
		type: "get",
		dataType: 'json',		
		contentType: "application/json;charset=utf-8",
		success:function(data){
			if (data.success == true) {
				var da = data.data;				
					loadMyEssay('',0);
			} else if (data.code == 'OVERTIME'){
				var thisUrl = window.location.href;
				if (thisUrl.indexOf('login.html') <= -1) {
					top.window.location.href="login.html";
				}

			} else {
				alert(data.msg);
			}

		},
		error:function() {
			/* Act on the event */
			alert("error");
		}
	});	
}



//填写认证不通过备注并提交
function toUpdateFail() {
	var id = $('#thisId_update_fail').val();
	
	var remark = $('#remark_update_fail').val().trim();	
	$.ajax({
		url: urlcore + "/api/userRealName/updateReason?id="+id+"&reason="+remark,
		type: "get",
		dataType: 'json',		
		contentType: "application/json;charset=utf-8",
		success:function(data){
			if (data.success == true) {
				var da = data.data;				
					loadMyEssay('',0);
			} else if (data.code == 'OVERTIME'){
				var thisUrl = window.location.href;
				if (thisUrl.indexOf('login.html') <= -1) {
					top.window.location.href="login.html";
				}

			} else {
				alert(data.msg);
			}

		},
		error:function() {
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
  
	var phoneNo = $('#phoneNo').val().trim();

	loadMyEssay(phoneNo,'');
	
}