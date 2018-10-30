var name = "";
$(function(){
	loadMyEssay(name);
});


function loadMyEssay(name) {
	$(document).ready(function() {
		//设置默认第1页
	    init(1,name);
	});
	//默认加载  
	function init(pageNo,name){
		//获取用户信息列表
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/userZhifubao/findList?current="+pageNo+"&name="+name,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
				if (data.success == true) {
					//i表示在data中的索引位置，n表示包含的信息的对象
					$.each(data.data.records,function(i,n){
						var thislist = 
						'<tr class="footable-even" style="display: table-row;">' +
'                                    <td class="footable-visible">'+n.id+'</td>'+
'                                    <td class="footable-visible">'+n.userName+'</td>'+
'                                    <td class="footable-visible">'+n.realName+'</td>'+
'                                    <td class="footable-visible">'+n.userMobile+'</td>'+
'                                    <td class="footable-visible">'+parseFloat(n.assetsYuEbao)*0.01+'</td>'+
'                                    <td class="footable-visible">'+parseFloat(n.huabeiQuota)*0.01+'</td>'+
'                                    <td class="footable-visible">'+parseFloat(n.huabeiBalance)*0.01+'</td>'+
'                                    <td class="footable-visible">'+parseFloat(n.huabeiNextRepaymentAmount)*0.01+'</td>'+
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
	    init(pageclickednumber,""); 
	}

}

//搜索
function searchuser() {
	 name = $('#name').val();
	loadMyEssay(name);
}
	

