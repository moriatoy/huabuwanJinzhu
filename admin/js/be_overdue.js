/**
 * 逾期人员统计 tuanzhou
 */
var jName = getCookie('Jname');
var sdate = "";
var pageNo = 1;
var userName = '';
var dateTime = '';
var dateTime2 = '';
// 我的权限数组
var arrayTitle = new Array;
var audit_count = {
	// 默认加载
	init : function(pageNo,beginTimeStr,endTimeStr) {
		console.log(beginTimeStr,endTimeStr)
		var url = "";
		if (beginTimeStr) {
            url = urlcore + "/api/statement/overdues2List?beginTimeStr="+beginTimeStr+"&endTimeStr="+endTimeStr+"&pageNum="+pageNo;
		} else {
            url = urlcore + "/api/statement/overdues2List?beginTimeStr="+dateTime2+"&endTimeStr="+dateTime+"&pageNum="+pageNo;
        }
		// 获取信息列表
		$("#thislist").html("");
		$.ajax({
            url : url,
			type : "get",
			dataType : 'json',
			contentType : "application/json;charset=utf-8",
			async : false,
			success : function(data) {
				if (data.success == true) {
					// i表示在data中的索引位置，n表示包含的信息的对象
					$.each(data.data.list, function(i, n) {
						var thislist =
					'	<tr>'+
					'		<td>'+n.date+'</td>'+
					'		<td>'+n.borrowMoneyAll+'</td>'+
					'		<td>'+n.repaymentAll+'</td>'+
					'		<td>'+n.willPayMoney+'</td>'+
					'		<td>'+n.willOrderTotal+'</td>'+
					'		<td>'+n.persent+'</td>'+
					'	</tr>';
						$('#thislist').append(thislist);
					});
					$("#pager").pager({
								pagenumber : data.data.pageNum,
								pagecount : data.data.pages,
								totalcount : data.data.total,
								buttonClickCallback : audit_count.PageClick
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
    findMyCatalogue: function() {
        var time = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
        var time2 = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
        var year = time.getFullYear();
        var year2 = time2.getFullYear();
        var month = audit_count.r(time.getMonth() + 1);
        var month2 = audit_count.r(time2.getMonth() + 1);
        var date = audit_count.r(time.getDate());
        var date2 = audit_count.r(time2.getDate());
        dateTime = year.toString()+month.toString()+date.toString();
        dateTime2 = year2.toString()+month2.toString()+date2.toString();
        audit_count.init(1,dateTime2,dateTime);
	},
	r: function(item) {
		return item < 10 ? '0' + item : item;
	},
	// 回调函数
	PageClick : function(pageclickednumber) {
		audit_count.init(pageclickednumber,dateTime2,dateTime);
	}
}