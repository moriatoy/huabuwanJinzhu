/**
 * 审核人员统计 tuanzhou
 */
var jName = getCookie('Jname');
var sdate = "";
var pageNo = 1;
var userName = '';
// 我的权限数组
var arrayTitle = new Array;
var audit_count = {
	// 默认加载
	init : function(pageNo) {
		// 获取信息列表
		$("#thislist").html("");
		$.ajax({
			url : urlcore + "/count/auditReport?pageNo=" + pageNo
					+ "&userName=" + userName+"&sdate="+sdate,
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
					'		<td>'+n.sdate+'</td>'+
					'		<td>'+n.auditor+'</td>'+
					'		<td>'+n.applyCount+'</td>'+
					'		<td>'+n.passCount+'</td>'+
					'		<td>'+n.refuseCount+'</td>'+
					'	</tr>';
						$('#thislist').append(thislist);
					});
					$.each(arrayTitle, function(i, k) {
								$('a[name="' + k + '"]')
										.attr("hidden", false)
										.attr("class", "btn btn-primary btn-xs");
								$('a[data="' + k + '"]').attr("class",
										"btn btn-sm btn-primary");
							});
					$('#thiscount').text(data.data.total);
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
	// 回调函数
	PageClick : function(pageclickednumber) {
		audit_count.init(pageclickednumber);
	},
	findMyCatalogue : function() {
		$.ajax({
					url : urlcore
							+ "/api/roleThirdCatalogue/findAllByUser?secondTitle="
							+ jName,
					type : "GET",
					dataType : 'json',
					async : false,
					contentType : "application/json;charset=utf-8",
					success : function(data) {
						if (data.success == true) {
							$.each(data.data, function(i, n) {

										arrayTitle.push(n.thirdCatalogue.title);
									});
						} else {
							alert(data.msg);
						}

					},
					error : function() {
						alert("error");
					}
				});
	},
	searchList : function() {
		userName = $('#jsuserName').val().trim();
		sdate = $('#sdate').val().trim();
		audit_count.findMyCatalogue();
		audit_count.init(1);
	}
}