var userId = getvl('userId');
var name = getvl('name');
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
			url: urlcore + "/api/userTaobaoAddress/findByAddressPage?pageNo="+pageNo+"&pageSize="+pageSize+"&userId="+userId,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
				if (data.success == true) {
					//i表示在data中的索引位置，n表示包含的信息的对象
					$.each(data.data.list,function(i,n){
						var thislist = 
						'<tr class="footable-even" style="display: table-row;">' +
'                                    <td class="footable-visible">'+n.id+'</td>'+
'                                    <td class="footable-visible">'+name+'</td>'+
'                                    <td class="footable-visible">'+n.address+'</td>'+
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
	loadMyEssay();
}
	

