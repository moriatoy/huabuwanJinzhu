 var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array; 
findMyCatalogue()
 loadMyEssay();
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
			url: urlcore + "/api/loginRecord/selectAdminLoginRecords?pageNo="+pageNo+"&pageSize="+pageSize,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
				if (data.success == true) {
					//i表示在data中的索引位置，n表示包含的信息的对象
					$.each(data.data.list,function(i,n){
						var loginTime= new Date(n.loginTime).pattern("yyyy-MM-dd hh:mm:ss").toString();
						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
							'	<td class="footable-visible"><input type="checkbox" value="'+n.id+'" name="selectcheck" /></td>' +
							'	<td class="footable-visible">'+n.id+'</td>'+
							'	<td class="footable-visible">'+n.userName+'</td>'+
							'	<td class="footable-visible">'+n.ip+'</td>'+
							'	<td class="footable-visible">'+loginTime+'</td>'+
							'	<td class="footable-visible footable-last-column">' +
							' 		<a hidden="hidden" class="" name="删除" href="javascript:;" onclick="deleteeach(' + n.id + ')"> 删除</a>' +
							'	</td>' +
							'</tr>';
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
	    init(pageclickednumber); 
	}

}


function deleteeach(id){
		if(confirm("您确定要删除这条日志吗？")){
		$.ajax({
			url: urlcore + "/api/loginRecord/deleteOne?id="+id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
			     loadMyEssay('');
			},
			error:function() {
				/* Act on the event */
				alert("error");
			}
		});	
}
}

function findMyCatalogue(){
	$.ajax({
		url: urlcore + "/api/roleThirdCatalogue/findAllByUser?secondTitle=后台管理登录日志",
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