var realName="";
$(function(){
	searchuser();
});


function loadMyEssay() {		
	$(document).ready(function() {
		//设置默认第1页
	    init(1);
	});
	
	//默认加载  
	function init(pageNo){
		//获取用户信息列表
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/userBank/findByPage?&pageNo="+pageNo+"&pageSize="+pageSize+"&realName="+realName,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
				if (data.success == true) {
					//i表示在data中的索引位置，n表示包含的信息的对象
					$.each(data.data.list,function(i,n){
						var thislist = '<tr>'+
'                                    <td class="footable-visible">'+n.id+'</td>'+
'                                    <td class="footable-visible">'+n.bankcardno+'</td>'+
'                                    <td class="footable-visible">'+n.name+'</td>'+
'                                    <td class="footable-visible">'+n.bankPhone+'</td>'+
'                                    <td class="footable-visible">'+n.idcardno+'</td>'+
'                                    <td class="footable-visible">'+n.gmtDatetime+'</td>'+
'                                </tr>';
						$('#thislist').append(thislist);
					});
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

//搜索
function searchuser() {
	realName = $('#realName').val().trim();
	loadMyEssay();
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

