$(document).ready(function() {
	init(1);
});
	
//默认加载  
function init(current){
	//获取信息列表
	$("#thislist").html("");
	$.ajax({
		url: urlcore + "/api/bankCard/selectPage?current="+current,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		async: false,
		success:function(data){
			if (data.success == true) {
				//i表示在data中的索引位置，n表示包含的信息的对象
				$.each(data.data.records,function(i,n){	
					var id = n.id;
					var thislist = 
					'	<tr>'+				
					'		<td>'+(i+1)+'</td>'+
					'		<td>'+n.bankName+'</td>'+
					'		<td>'+n.title+'</td>'+
					'		<td>'+
                    '           <a class="btn btn-primary btn-xs" href="bank_card_add.html?id='+id+'"> 修改</a>'+
 					'           <a class="btn btn-primary btn-xs" href="javascript:;" onclick="deleteeach('+n.id+')">删除</a>'+						
					'		</td>'+	
					'	</tr>';
					$('#thislist').append(thislist);														
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
	        url: urlcore + "/api/bankCard/delete?id="+id,
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

