var name="";
var nickName = "";
var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array; 
$(function(){
	searchuser();
});


function loadMyEssay(name,nickName) {		
	$(document).ready(function() {
		findMyCatalogue();
		//设置默认第1页
	    init(1,name,nickName);
	});
	
	//默认加载  
	function init(pageNo,name,nickName){
		//获取用户信息列表
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/userTaobao/findByPage?current="+pageNo+"&name="+name+"&nickName="+nickName,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
				if (data.success == true) {
					//i表示在data中的索引位置，n表示包含的信息的对象
					$.each(data.data.records,function(i,n){
						var thislist = '<tr>'+
'                                    <td class="footable-visible">'+n.id+'</td>'+
'                                    <td class="footable-visible">'+n.name+'</td>'+
'                                    <td class="footable-visible">'+n.gender+'</td>'+
'                                    <td class="footable-visible">'+n.mobile+'</td>'+
'                                    <td class="footable-visible">'+n.nickName+'</td>'+
'                                    <td class="footable-visible">'+n.gmtDatetime+'</td>'+
'                                    <td class="footable-visible footable-last-column">'+
'                                        <a name="详情" hidden="hidden" class="" href="user_taobao_address_list.html?userId='+n.userId+'&name='+escape(n.name)+'&phone='+n.phone+'"  >淘宝地址</a>'+
'                                        <a name="详情" hidden="hidden" class="" href="user_taobao_goods_list.html?userId='+n.userId+'"  >购买记录</a>'+
'                                    </td>'+
'                                </tr>';
						$('#thislist').append(thislist);
					});
					$.each(arrayTitle, function(i,k) {
						$('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
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
	    init(pageclickednumber,name,nickName); 
	}

}

//搜索
function searchuser() {
	name = $('#name').val().trim();
	nickName = $('#nickName').val().trim();
	loadMyEssay(name,nickName);
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
