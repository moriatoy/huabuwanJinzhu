// 我的权限数组
var arrayTitle = new Array;
var jName = getCookie('Jname');
var current = 1;
var channelName ='';
var sdate = '';
$(function($) {
	channel_trans.findMyCatalogue();
	sdate = channel_trans.getNowFormatDate();
	channel_trans.init(1);
})
var channel_trans = {
	// 默认加载
	init : function(current) {
		// 获取信息列表
		$("#thislist").html("");
		$.ajax({
			url : urlcore + "/api/channel/query/channel/summary?type=1&current=" + current
					+ "&channelName=" + channelName+"&sdate="+sdate,
			type : "get",
			dataType : 'json',
			contentType : "application/json;charset=utf-8",
			async : false,
			success : function(data) {
				if (data.success == true) {
					if(!data.data || !data.data.list){
						return;
					}
					// i表示在data中的索引位置，n表示包含的信息的对象
					$.each(data.data.list, function(i, n) {
						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
							'<td class="footable-visible">' + n.sdate + '</td>' +
							'<td class="footable-visible">' + n.channelName + '</td>' +
//							'<td class="footable-visible">' + common.nullToZero(n.h5Click) + '</td>' +
							'<td class="footable-visible">' + common.nullToZero(n.h5Register) + '</td>' +
							'<td class="footable-visible">' + common.nullToZero(n.appDown) + '</td>' +
                            '<td class="footable-visible">' + common.nullToZero(n.h5Click) + '</td>' +
                            '<td class="footable-visible">' + common.nullToZero((n.h5Register/n.h5Click*100).toFixed(2)) + '%</td>' +
                            // '<td class="footable-visible">' + common.nullToZero(n.baiscAuth) + '</td>' +
                            // '<td class="footable-visible">' + common.nullToZero(n.identityAuth) + '</td>' +
                            // '<td class="footable-visible">' + common.nullToZero(n.phoneAuth) + '</td>' +
                            // '<td class="footable-visible">' + common.nullToZero(n.bankAuth) + '</td>' +
                            '<td class="footable-visible">' + common.nullToZero(n.taobaoAuth) + '</td>' +
							'<td class="footable-visible">' + common.nullToZero(n.applys) + '</td>' +
							'<td class="footable-visible">' + common.nullToZero(n.gives) + '</td>' +
							'<td class="footable-visible">' + common.nullToZero(n.payBacks) + '</td>' +
							'</tr>';
						$('#thislist').append(thislist);
					});
                    $.each(arrayTitle, function(i,k) {
                        $('a[data="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary");
                    });
					$("#pager").pager({
						pagenumber : current,
						pagecount : data.data.pages,
						totalcount : data.data.total,
						buttonClickCallback : channel_trans.PageClick
					});
				} else if (data.code == 'OVERTIME') {
					var thisUrl = window.location.href;
					if (thisUrl.indexOf('login.html') <= -1) {
						top.window.location.href = "login.html";
					}

				} else {
					if (data.msg != '空数据') {
						alert(data.msg)
					} else {
						$('#thiscount').text(0);
					}
				}

			},
			error : function() {
				alert("error");
			}
		});
	},
	findMyCatalogue:function(){
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
	},
	//回调函数  
	PageClick:function(pageclickednumber) {  
	    channel_trans.init(pageclickednumber); 
	},
	getNowFormatDate:function(){
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
	    return currentdate;
	},
	searchList:function(){
		channelName = $('#channelName').val().trim();
		sdate = $('#gmtDatetime').val().trim();
		channel_trans.init(1);
	},
    exportFun:function() {
        channelName = $('#channelName').val().trim();
        sdate = $('#gmtDatetime').val().trim();
        window.location.href = urlcore + "/api/channel/query/channel/ef?type=1&channelName=" + channelName+"&sdate="+sdate;
        // channel_trans.init(1);
    }
}
