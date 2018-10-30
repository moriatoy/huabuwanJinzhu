var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array; 
loadMyEssay();

function loadMyEssay() {
	$(document).ready(function() {
		findMyCatalogue()
		
		init(1);
	});

	//默认加载  
	function init(pageNo) {
		//获取用户信息列表
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/payOrderConfirm/selectByPage?pageNo=" + pageNo + "&pageSize=" + pageSize,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					//i表示在data中的索引位置，n表示包含的信息的对象
					$.each(data.data.list, function(i, n) {
						
						var thislist = 
						    '<tr class="footable-even" style="display: table-row;">' +
							'<td class="footable-visible"><input type="checkbox" value="'+n.id+'" name="selectcheck" /></td>' +
							'    <td class="footable-visible">' + n.id + '</td>' +
							'    <td class="footable-visible">' + n.loanOrderId + '</td>' +
							'    <td class="footable-visible">' + n.noOrder + '</td>' +
							'    <td class="footable-visible">' + n.gmtDatetime + '</td>' +
							'    <td class="footable-visible">' + n.reciveName + '</td>' +
							'    <td class="footable-visible">' + n.reciveBankNum + '</td>' +
							'    <td class="footable-visible">' + n.money + '</td>' +
							'    <td class="footable-visible">' + n.code + '</td>' +
							'<td class="footable-visible footable-last-column">'+
								'<a hidden="hidden" name="打款" class="" href="javascript:;"  onclick="passMoney(' + n.id + ')">打款</a>&nbsp;'+
								'<a hidden="hidden" name="拒绝" class="" href="javascript:;"  onclick="thisRefuse(' + n.id + ')">拒绝</a>'+
							'</td>' +
							'</tr>';
						$('#thislist').append(thislist);
					});
					$.each(arrayTitle, function(i,k) {
						$('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
						$('a[data="'+k+'"]').attr("class","btn btn-sm btn-primary");
					});
					$("#pager").pager({
						pagenumber: pageNo,
						pagecount: data.data.pages,
						totalcount: data.data.total,
						buttonClickCallback: PageClick
					});

				} else if(data.code == 'OVERTIME') {
					var thisUrl = window.location.href;
					if(thisUrl.indexOf('login.html') <= -1) {
						top.window.location.href = "login.html";
					}

				} else {
					if(data.msg != '空数据') {
						alert(data.msg)
					} else {
						$('#thiscount').text(0);
					}
				}

			},
			error: function() {
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


function thisRefuse(id){

	if(confirm("您确定已打款成功吗？")) {
		$.ajax({
			url: urlcore + "/api/payOrderConfirm/refusePassMoneyAgain?id=" + id,
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


function passMoney(id){

	if(confirm("您确定再次打款吗？")) {
		$.ajax({
			url: urlcore + "/api/user/payConfirm?id=" + id,
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



