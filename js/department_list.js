var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array;

$(function(){
	loadMyEssay();
});


function loadMyEssay() {		
	$(document).ready(function() {
        findMyCatalogue();
	    init(1);
	});
	
	//默认加载  
	function init(pageNo){
		//获取用户信息列表
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/department/findList?pageNo="+pageNo+"&pageSize="+pageSize,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
				if (data.success == true) { 
					//i表示在data中的索引位置，n表示包含的信息的对象
					$.each(data.data.list,function(i,n){
						var id=n.id;
						var thislist =
							'<tr>'+
							'	<td class="footable-visible">'+n.id+'</td>'+
							'   <td class="footable-visible">'+n.department+'</td>'+
							'	<td class="footable-visible footable-last-column">'+
							'		<a hidden="hidden" name="删除" class="" onclick="thisDelete(' + id + ')" >删除</a>'+
							'	</td>'+
							'</tr>';
						$('#thislist').append(thislist);
					});
                    $.each(arrayTitle, function(i,k) {
                    	console.log(k)
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



function departmentAdd(){
	
	var department=$("#name").val().trim();
	$.ajax({
		url: urlcore + "/api/department/add",
		type: "post",
		data: JSON.stringify({
			"id":10,
			"department": department
		}),
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success: function(data) {
			if(data.success == true) {
				
					alert('修改成功');
					window.location.href = "department_list.html";
				
			} else if(data.code == 'OVERTIME') {
				var thisUrl = window.location.href;
				if(thisUrl.indexOf('login.html') <= -1) {
					top.window.location.href = "login.html";
				}
			} else {
				alert(data.msg);
			}

		},
		error: function() {
			alert("error");
		}

	});
	
}


function thisDelete(id){
	
	if(confirm("您确定删除吗？")) {
		$.ajax({
			url: urlcore + "/api/department/deleteById?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				loadMyEssay('');
	
			},
			error: function() {
				/* Act on the event */
				alert("error");
			}
		});
	}
	
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