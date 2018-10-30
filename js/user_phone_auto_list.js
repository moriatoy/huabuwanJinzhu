var realName="";
var phone = "";
var status=-1;
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
	function init(pageNo){
		//获取用户信息列表
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/userPhone/findByPage?pageNo="+pageNo+"&pageSize="+pageSize+"&realName="+realName+"&phone="+phone+"&status="+status,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
				if (data.success == true) {
					//i表示在data中的索引位置，n表示包含的信息的对象
					$.each(data.data.list,function(i,n){
						var statusTitle;
                        var userName = "";
                        var phone ="";
                        if(n.user){
                            userName = n.user.userName;
                            phone = n.user.phone;
                        }
						if (n.status == 0) {
							statusTitle = "未认证";
						}else if(n.status == 1){
							statusTitle = "认证成功";
						}
						var thislist = '<tr>'+
'                                    <td class="footable-visible">'+n.id+'</td>'+
'                                    <td class="footable-visible">'+phone+'</td>'+
'                                    <td class="footable-visible">'+userName+'</td>'+
'                                    <td class="footable-visible">'+n.phone+'</td>'+
'                                    <td class="footable-visible">'+n.gmtDatetime+'</td>'+
'                                    <td class="footable-visible">'+statusTitle+'</td>'+
'                                    <td class="footable-visible footable-last-column">'+
'                                        <a hidden="hidden" name="通话记录" class="" href="user_phone_record_list.html?userId='+n.user.id+'" >通话记录</a>'+
'                                    </td>'+
'                                </tr>';
						$('#thislist').append(thislist);
					});
					$.each(arrayTitle, function(i,k) {
						$('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
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

//搜索
function searchuser() {
	realName = $('#realName').val().trim();
	phone = $('#phone').val().trim();
	status = $('#status').val();
	loadMyEssay();
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