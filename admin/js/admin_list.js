var jName = getCookie('Jname');
var userName ='';
//我的权限数组
var arrayTitle = new Array; 
$(document).ready(function() {
	findMyCatalogue()
	init(1);
});
	
//默认加载  
function init(current){
	//获取信息列表
	$("#thislist").html("");
	$.ajax({
		url: urlcore + "/api/admin/selectPage?current="+current+"&userName="+userName,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		async: false,
		success:function(data){
			if (data.success == true) {
				//i表示在data中的索引位置，n表示包含的信息的对象
				$.each(data.data.records,function(i,n){	
					var id = n.id;
					var title = '';
					if(n.role!=null){
						title = n.role.title;
					}
					var thislist = 
					'	<tr>'+				
					'		<td>'+id+'</td>'+
					'		<td>'+n.userName+'</td>'+
					'		<td>'+n.department.department+'</td>'+
					'		<td>'+title+'</td>'+
					'		<td>'+
                    '           <a hidden="hidden" class="" name="修改" href="admin_add.html?id='+id+'">修改</a>'+
 					'           <a hidden="hidden" class="" name="删除" href="javascript:;" onclick="deleteeach('+n.id+')">删除</a>'+
					'		</td>'+	
					'	</tr>';
					$('#thislist').append(thislist);														
				});
				$.each(arrayTitle, function(i,k) {
					$('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
					$('a[data="'+k+'"]').attr("class","btn btn-sm btn-primary");
				});
				$('#thiscount').text(data.data.total);
				$("#pager").pager({
					pagenumber: current, 
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
			alert("error");
		}
	});
}
//回调函数  
PageClick = function(pageclickednumber) {  
    init(pageclickednumber); 
}

function deleteeach(id){
		$.ajax({
	        url: urlcore + "/api/admin/deleteOne?id="+id,
	        type: "get",
	        dataType: 'json',
	        contentType: "application/json;charset=utf-8",
	        success:function(data){
	            if (data.success == true) {
	            	location.reload();
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


function searchList() {
    userName=$('#jsuserName').val().trim();
    findMyCatalogue();
    init(1);
}