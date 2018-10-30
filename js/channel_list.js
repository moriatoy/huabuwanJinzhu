var phone="";
var status = -1;
var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array; 
$(function(){
	searchuser();
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
			url: urlcore + "/api/channel/selectList?&pageNo="+pageNo+"&pageSize=10&loginName="+phone,
			type: "get",
			acsny:false,
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
				if (data.success == true) {
					//i表示在data中的索引位置，n表示包含的信息的对象
                    if (window.sessionStorage.getItem("function") === "false") {
                        document.getElementById("toAdd").style.display = "none";
                        $.each(data.data.list,function(i,n){
                            if(n.visitorCount== null){
                                n.visitorCount=0
                            }
                            var thislist = '<tr>'+
                                '<td class="footable-visible">'+n.id+'</td>'+
                                '<td class="footable-visible">'+n.name+'</td>'+
                                '<td class="footable-visible">'+n.loginName+'</td>'+
                                '<td class="footable-visible">'+n.linkUrl+'</td>'+
                                '<td class="footable-visible">'+n.visitorCount+'</td>'+
                                '<td class="footable-visible">'+n.memberCount+'</td>'+
                                '<td class="footable-visible">'+n.proportion+'</td>'+
                                '<td class="footable-visible footable-last-column">'+
                                '  <a hidden="hidden" name="会员详情" class="" href="channel_member_list.html?channelId='+n.id+'">会员详情</a>'+
                                '  <a hidden="hidden" name="订单详情" class="" href="channel_orderList.html?channelId='+n.id+'">订单详情</a>'+
                                '  <a hidden="hidden" name="查看日统计" class="" href="adminChannelIndex_v1.html?id='+n.id+'">查看日统计</a>'+
                                '</td>'+
                                '</tr>';
                            $('#thislist').append(thislist);
                        });
                    } else {
                        $.each(data.data.list,function(i,n){
                            if(n.visitorCount== null){
                                n.visitorCount=0
                            }
                            var thislist =
								'<tr>'+
                                '	<td class="footable-visible">'+n.id+'</td>'+
                                '	<td class="footable-visible">'+n.name+'</td>'+
                                '	<td class="footable-visible">'+n.loginName+'</td>'+
                                '	<td class="footable-visible">'+n.linkUrl+'</td>'+
                                '	<td class="footable-visible" style="text-align: center">'+n.visitorCount+'</td>'+
                                '	<td class="footable-visible" style="text-align: center">'+n.memberCount+'</td>'+
                                '	<td class="footable-visible" style="text-align: center">'+n.proportion+'</td>'+
                                '	<td class="footable-visible footable-last-column" style="text-align: center">'+
                                '  		<a hidden="hidden" name="修改" class="" href="channel_add.html?id='+n.id+'">修改</a>'+
                                '  		<a hidden="hidden" name="删除" class="" onclick="detedeOne('+n.id+')">删除</a>'+
                                '  		<a hidden="hidden" name="会员详情" class="" href="channel_member_list.html?channelId='+n.id+'">会员详情</a>'+
                                '  		<a hidden="hidden" name="订单详情" class="" href="channel_orderList.html?channelId='+n.id+'">订单详情</a>'+
                                '  		<a hidden="hidden" name="查看日统计" class="" href="adminChannelIndex_v1.html?id='+n.id+'">查看日统计</a>'+
                                '	</td>'+
                                '</tr>';
                            $('#thislist').append(thislist);
                        });
					}
					$.each(arrayTitle, function(i,k) {
						$('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
                        $('a[data="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary");
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
					if (thisUrl.indexOf('channelLogin.html') <= -1) {
						top.window.location.href="channelLogin.html";
					}

				} else {
					if (data.msg != '空数据') {
						alert(data.msg)
					}else{
						$('#thiscount').text(0);
					}
				}

			},
		});
	}

	//回调函数  
	PageClick = function(pageclickednumber) {  
	    init(pageclickednumber); 
	}

}

//搜索
function searchuser() {
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


function detedeOne(id){
	if(!confirm("确定删除？")) {
		return;
	}
	$.ajax({
        url:  urlcore + "/api/channel/deleteOne?id="+id,
       		type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
                if (data.success == true) {
                	loadMyEssay();
                } else if (data.code == 'OVERTIME'){
                    var thisUrl = window.location.href;
                    if (thisUrl.indexOf('channelLogin.html') <= -1) {
                        top.window.location.href="channelLogin.html";
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
