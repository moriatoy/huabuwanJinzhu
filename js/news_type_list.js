
var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array; 
$(document).ready(function() {
	findMyCatalogue();
	init();
});
	
//默认加载  
function init(){
	//获取信息列表
	$("#thislist").html("");
	$.ajax({
		url: urlcore + "/api/helpCenter/selectPage1",
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		async: false,
		success:function(data){
			if (data.success == true) {
				//i表示在data中的索引位置，n表示包含的信息的对象
				$.each(data.data.records,function(i,n){	
					var thislist = 
					'	<tr>'+				
					'		<td>'+n.id+'</td>'+
					'		<td>'+n.title+'</td>'+
					'		<td>'+n.gmtDatetime+'</td>'+
					'		<td>'+
                    '           <a hidden="hidden" name="查看/修改" class="" href="news_add.html?id='+n.id+'">查看/修改</a>'+
 					'           <a hidden="hidden" name="删除" class="" href="javascript:;" onclick="deleteeach('+n.id+')">删除</a>'+						
					'		</td>'+	
					'	</tr>';
					$('#thislist').append(thislist);														
				});
				$.each(arrayTitle, function(i,k) {
					$('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
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


$(document).ready(function() {
	init1();
});
	
//默认加载  
function init1(){
	//获取信息列表
	$("#thislist1").html("");
	$.ajax({
		url: urlcore + "/api/helpCenter/selectPage2",
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		async: false,
		success:function(data){
			if (data.success == true) {
				//i表示在data中的索引位置，n表示包含的信息的对象
				$.each(data.data.records,function(i,n){	
					
					var thislist = 
					'	<tr>'+				
					'		<td>'+n.id+'</td>'+
					'		<td>'+n.title+'</td>'+
					'		<td>'+n.gmtDatetime+'</td>'+
						
					'		<td>'+
                    '           <a class="btn btn-primary btn-xs" href="news_add.html?id='+n.id+'">查看/修改</a>'+
 					'           <a class="btn btn-primary btn-xs" href="javascript:;" onclick="deleteeach('+n.id+')">删除</a>'+						
					'		</td>'+	
					'	</tr>';
					$('#thislist1').append(thislist);														
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



function deleteeach(id){
	
	 if(confirm("您确定删除吗？")) {
		$.ajax({
	        url: urlcore + "/api/helpCenter/delete?id="+id,
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
	 }


/**
 * 用户状态返回
 * @param {Object} type
 */
function typeStr(type){
	if(type==1) {
		type = '贷款攻略';
	}
	else if(type==2) {
		type = '信用生活';
	}
	else if(type==3) {
		type = '办卡攻略';
	}
	else if(type==4) {
		type = '羊毛活动';
	}
	return type;
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
