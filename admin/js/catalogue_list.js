
var title1="";
var title2="";
var title3="";
var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array; 
$(function(){
	loadMyEssay();
});


function loadMyEssay() {		
	$(document).ready(function() {
		findMyCatalogue();
		//设置默认第1页
	    init(1);
	});
	
	//默认加载  
	function init(pageNo){
		//获取用户信息列表
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/thirdCatalogue/findByPage?pageNo="+pageNo+"&pageSize="+pageSize,
			type: "post",
			data:JSON.stringify({
				"title":title3,
				"second":{
					"title":title2,
					"first":{
						"title":title1,
					}
				}
			}),
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
				if (data.success == true) { 
					//i表示在data中的索引位置，n表示包含的信息的对象
					$.each(data.data.list,function(i,n){
						var thislist = '<tr>'+
'									 <td class="footable-visible">'+n.id+'</td>'+
'                                    <td class="footable-visible">'+n.second.first.title+'</td>'+
'                                    <td class="footable-visible">'+n.second.title+'</td>'+
'                                    <td class="footable-visible">'+n.title+'</td>'+
'                                    <td class="footable-visible footable-last-column">'+
'                                        <a hidden="hidden" name="删除" class="" href="#" >删除</a>'+
'                                    </td>'+
'                                </tr>';
						$('#thislist').append(thislist);
					});
					$('#thiscount').text(data.data.total);
					$.each(arrayTitle, function(i,k) {
						$('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
					});
					$('a[data="topButton"]').attr("class","btn btn-sm btn-primary");
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


function searchList(){
	title1=$('#title1').val().trim();
	title2=$('#title2').val().trim();
	title3=$('#title3').val().trim();
	
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