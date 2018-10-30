var limitPayTime = '';
var name = '';
var phoneNumber = '';
var currentPage = 1;
var totalMoney = 0;
var totalPeople = 0;
var orderId = getvl('orderId');
var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array;
loadMyEssay(limitPayTime, name, phoneNumber);
//countPeopleMoney(limitPayTime, name, phoneNumber);
outToExcelList(limitPayTime);

function loadMyEssay(limitPayTime, name, phoneNumber) {
	$(document).ready(function() {
		findMyCatalogue()
		init(currentPage);
	});

	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/loanOrder/badDebtList?limitPayTime=" + limitPayTime + "&name=" + name + "&phoneNumber=" + phoneNumber + "&current=" + pageNo,
			type: "get",
			async: 'false',
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					$.each(data.data.list, function(i, n) {

						var id = n.id;
                        var userName = "";
                        var phone ="";
                        if(n.user){
                            userName = n.user.userName;
                            phone = n.user.phone;
                        }
						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
							'<td class="footable-visible"><input type="checkbox" value="' + n.id + '" name="selectcheck" /></td>' +
							'<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible">' + n.orderNumber + '</td>' +
							'<td class="footable-visible">' + userName + '</td>' +
							'<td class="footable-visible">' + phone + '</td>' +
							'<td class="footable-visible">' + n.limitDays + '</td>' +
							'<td class="footable-visible">' + n.borrowMoney + '</td>' +
							'<td class="footable-visible">' + n.realMoney + '</td>' +
							'<td class="footable-visible">' + n.needPayMoney + '</td>' +
							'<td class="footable-visible">' + n.giveTime + '</td>' +
							'<td class="footable-visible">' + n.limitPayTime + '</td>' +
							'<td class="footable-visible footable-last-column">' +
							'<a hidden="hidden" class="" name="查看认证信息" href="tab.html?id=' + n.userId + '&userName=' + escape(userName) + '&phone=' + phone+ '&orderId=' +n.id  + '"  >查看认证信息</a>&nbsp;' +
							'<a hidden="hidden" class="" name="详情" href="bad_debt_list_detail.html?id=' + n.id + '" >详情</a></td>' +
							'</tr>';
						$('#thislist').append(thislist);

					});
					$.each(arrayTitle, function(i, k) {
						$('a[name="' + k + '"]').attr("hidden", false).attr("class", "btn btn-primary btn-xs");
					});
					$("#pager").pager({
						pagenumber: pageNo,
						pagecount: data.data.pages,
						totalcount: data.data.total,
						buttonClickCallback: PageClick
					});

					if(data.code == 'OVERTIME') {
						var thisUrl = window.location.href;

						if(thisUrl.indexOf('login.html') <= -1) {
							top.window.location.href = "login.html";
						}

					} else {
						if(data.msg != '空数据') {
							//alert(data.msg)
						} else {
							$('#thiscount').text(0);
						}
					}
				}

			},
			error: function() {
				alert("error");
			}
		});
	}
	PageClick = function(pageclickednumber) {
		init(pageclickednumber);
	}

}

function EnterSearchList() {
	var code = event.keyCode;
	if(code == 13) {
		searchList();
	}
}

function searchList() {

	var phoneNumber = $('#phoneNumber').val().trim();
	var name = $('#userName').val().trim();
	var limitPayTime = $('#applyTime').val().trim();
	loadMyEssay(limitPayTime, name, phoneNumber);
	countPeopleMoney(limitPayTime, name, phoneNumber);
	outToExcelList(limitPayTime);

}

function joinBlackList(id) {

	if(confirm("您确定拉黑该会员吗？")) {
		$.ajax({
			url: urlcore + "/api/loanOrder/joinBlackList?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				loadMyEssay('', '', '');
				countPeopleMoney('', '', '');
			},
			error: function() {
				/* Act on the event */
				alert("error");
			}
		});
	}

}

function sendMessage(id) {

	$.ajax({
		url: urlcore + "/api/loanOrder/sendMenssage?id=" + id,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success: function(data) {

			alert("发送成功");

			//				if(data.success == true) {
			//					var da = data.data;
			//
			//					
			//					$('#content').html(da.content);

		},

		error: function() {
			/* Act on the event */
			alert("error");
		}
	});

}

function countPeopleMoney(limitPayTime, name, phoneNumber) {
	/*$.ajax({
		url: urlcore + "/api/loanOrder/countPeopleMoney8?limitPayTime=" + limitPayTime + "&name=" + name + "&phoneNumber=" + phoneNumber,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success: function(data) {
			if(data.success == true) {

				$('#totalMoney').text(data.data.totalMoney);
				$('#totalPeople').text(data.data.totalPeople);

				if(data.code == 'OVERTIME') {
					var thisUrl = window.location.href;

					if(thisUrl.indexOf('login.html') <= -1) {
						top.window.location.href = "login.html";
					}

				} else {
					if(data.msg != '空数据') {
						//alert(data.msg)
					} else {
						$('#thiscount').text(0);
					}
				}
			}

		},
		error: function() {
			alert("error");
		}
	});*/
}

function selectAll(o) {
	var mm = document.getElementsByName("selectcheck");
	for(var i = 0; i < mm.length; i++) {
		mm[i].checked = o.checked;
	}
}

function outToExcelList(limitPayTime) {
	$("#thislist1").html("");
	$.ajax({
		url: urlcore + "/api/loanOrder/excelbadDebtList?limitPayTime=" + limitPayTime,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success: function(data) {
			if(data.success == true) {
				$.each(data.data.list, function(i, n) {
                    var userName = "";
                    var phone ="";
                    if(n.user){
                        userName = n.user.userName;
                        phone = n.user.phone;
                    }
					var thislist1 =
						'<tr class="footable-even" style="display: table-row;">' +
						'<td class="footable-visible">' + n.id + '</td>' +
						'<td class="footable-visible">' + n.orderNumber + '</td>' +
						'<td class="footable-visible">' + userName + '</td>' +
						'<td class="footable-visible">' + phone + '</td>' +
						'<td class="footable-visible">' + n.bankName + '</td>' +
						'<td class="footable-visible">' + n.bankCardNum + '</td>' +
						'<td class="footable-visible">' + n.limitDays + '</td>' +
						'<td class="footable-visible">' + n.borrowMoney + '</td>' +
						'<td class="footable-visible">' + n.realMoney + '</td>' +
						'<td class="footable-visible">' + n.interestMoney + '</td>' +
						'<td class="footable-visible">' + n.placeServeMoney + '</td>' +
						'<td class="footable-visible">' + n.msgAuthMoney + '</td>' +
						'<td class="footable-visible">' + n.riskServeMoney + '</td>' +
						'<td class="footable-visible">' + n.riskPlanMoney + '</td>' +
						'<td class="footable-visible">' + n.wateMoney + '</td>' +
						'<td class="footable-visible">' + n.saveMoney + '</td>' +
						'<td class="footable-visible">' + n.needPayMoney + '</td>' +
						'<td class="footable-visible">' + n.gmtDatetime + '</td>' +
						'<td class="footable-visible">' + n.passTime + '</td>' +
						'<td class="footable-visible">' + n.giveTime + '</td>' +
						'<td class="footable-visible">' + n.limitPayTime + '</td>' +
						'<td class="footable-visible">' + n.overdueTime + '</td>' +
						'<td class="footable-visible">' + n.overdueDays + '</td>' +
						'<td class="footable-visible">' + n.overdueMoney + '</td>' +
						'<td class="footable-visible">' + n.allowDays + '</td>' +
						'<td class="footable-visible">' + n.allowMoney + '</td>' +
						//'<td class="footable-visible">' + n.admin.userName + '</td>' +
						'</tr>';
					$('#thislist1').append(thislist1);
				});
			}
		},
	});
}

var idTmr;

function getExplorer() {
	var explorer = window.navigator.userAgent;
	//ie  
	if(explorer.indexOf("MSIE") >= 0) {
		return 'ie';
	}
	//firefox  
	else if(explorer.indexOf("Firefox") >= 0) {
		return 'Firefox';
	}
	//Chrome  
	else if(explorer.indexOf("Chrome") >= 0) {
		return 'Chrome';
	}
	//Opera  
	else if(explorer.indexOf("Opera") >= 0) {
		return 'Opera';
	}
	//Safari  
	else if(explorer.indexOf("Safari") >= 0) {
		return 'Safari';
	}
}


function method5(tableid) {
	if(getExplorer() == 'ie') {
		var curTbl = document.getElementById(tableid);
		var oXL = new ActiveXObject("Excel.Application");
		var oWB = oXL.Workbooks.Add();
		var xlsheet = oWB.Worksheets(1);
		var sel = document.body.createTextRange();
		sel.moveToElementText(curTbl);
		sel.select();
		sel.execCommand("Copy");
		xlsheet.Paste();
		oXL.Visible = true;
		try {
			var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
		} catch(e) {
			print("Nested catch caught " + e);
		} finally {
			oWB.SaveAs(fname);
			oWB.Close(savechanges = false);
			oXL.Quit();
			oXL = null;
			idTmr = window.setInterval("Cleanup();", 1);
		}

	} else {
		tableToExcel(tableid)
	}
}

function Cleanup() {
	window.clearInterval(idTmr);
	CollectGarbage();
}
var tableToExcel = (function() {
	var uri = 'data:application/vnd.ms-excel;base64,',
		template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
		base64 = function(s) {
			return window.btoa(unescape(encodeURIComponent(s)))
		},
		format = function(s, c) {
			return s.replace(/{(\w+)}/g,
				function(m, p) {
					return c[p];
				})
		}
	return function(table, name) {
		if(!table.nodeType) table = document.getElementById(table)
		var ctx = {
			worksheet: name || 'Worksheet',
			table: table.innerHTML
		}
		window.location.href = uri + base64(format(template, ctx))
	}
})

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