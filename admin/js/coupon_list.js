var realName="";
var status = -1;
var type = -1;
var pageNo = 1;
var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array; 
$(function(){
	searchuser();
});
 
function loadMyEssay() {
	$(document).ready(function() {
		findMyCatalogue()
		//设置默认第1页
	    init(1);
	});
	
	//默认加载  
	function init(){
		//获取用户信息列表
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/coupon/findByPage?&pageNo="+pageNo+"&pageSize="+pageSize+"&status="+status+"&realName="+realName+"&type="+type,
			type: "get",
			acsny:false,
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
				if (data.success == true) { 
					//i表示在data中的索引位置，n表示包含的信息的对象
					$.each(data.data.list,function(i,n){
						var statusTitle;
						var statusButton;
						var typeTitle;
						var getLimit;
						if (n.get_limit==0) {
							getLimit="/"
						}else {
							getLimit=n.getLimit;
						}
						if (n.couponStatus == 1) {
							statusTitle = "启用中";
							statusButton="禁用";
						}else if(n.couponStatus == 2){
							statusTitle = "禁用";
							statusButton="启用";
						}
						if(n.type == 1){
							typeTitle="新用户订单";
						}else if(n.type == 2){
							typeTitle="邀请好友奖励";
						}else if(n.type == 3){
							statusTitle="启用中";
							typeTitle="自由发放";
							statusButton="发放";
						}
						var gmtDatetime = new Date(n.gmtDatetime).pattern("yyyy-MM-dd hh:mm:ss");
						var thislist = '<tr>'+
'                                    <td class="footable-visible">'+n.id+'</td>'+
'                                    <td class="footable-visible">'+n.coupouName+'</td>'+
'                                    <td class="footable-visible">'+n.saveMoney+'</td>'+
'                                    <td class="footable-visible">'+n.validTime+'</td>'+
'                                    <td class="footable-visible">'+typeTitle+'</td>'+
'                                    <td class="footable-visible">'+statusTitle+'</td>'+
'                                    <td class="footable-visible footable-last-column">'+
'                                        <a hidden="hidden" class="" name="修改" href="coupon_add.html?id='+n.id+'" >修改</a>'+
'                                        <a hidden="hidden" class="" name="'+statusButton+'" onclick="changeStatus('+n.id+','+n.couponStatus+','+pageNo+','+n.type+')" >'+statusButton+'</a>'+
'                                    </td>'+
'                                </tr>'; 
						$('#thislist').append(thislist);
					});
					$.each(arrayTitle, function(i,k) {
						$('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
						$('a[data="'+k+'"]').attr("class","btn btn-sm btn-primary");
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
	realName = $('#name').val().trim();
	status = $('#status').val();
	type = $('#type').val();
	loadMyEssay();
}

//修改
function changeStatus(id,status,cp,type) {
	
	if (type == 3) {
		location.href="coupon_give_out_list.html?id="+id;
		return;
	}
	if (status == 1) {
		status = 2;
	}else if(status == 2){
		status = 1;
	}
	$.ajax({
		url: urlcore + "/api/coupon/updateStatus?id="+id+"&status="+status+"&type="+type,
		type: "get",
		dataType: 'json',		
		contentType: "application/json;charset=utf-8",
		success:function(data){
			if (data.success == true) {
				pageNo = cp;
				loadMyEssay();
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
