var gmtDatetime='';
var name='';
var phone='';
var currentPage=1;
var totalPeople=0;
var totalMoney = 0;
var orderId = getvl('orderId');
var jName = getCookie('Jname');


var sessTime = window.sessionStorage.getItem("gmtDatetime");
if (sessTime === "null" || sessTime === null) {
    gmtDatetime = "";
} else {
    gmtDatetime = window.sessionStorage.getItem("gmtDatetime");
}
var sessName = window.sessionStorage.getItem("name");
if (sessName === "null" || sessName === null) {
    name = "";
} else {
    name = window.sessionStorage.getItem("name");
}
var sessNumber = window.sessionStorage.getItem("phone");
if (sessNumber === "null" || sessNumber === null) {
    phone = "";
} else {
    phone = window.sessionStorage.getItem("phone");
}
var sessPage = window.sessionStorage.getItem("page");
if (sessPage === "null" || sessPage === null) {
    currentPage = 1;
} else {
    currentPage = window.sessionStorage.getItem("page");
}


//我的权限数组
var arrayTitle = new Array; 
loadMyEssay();
//countPeopleMoney(gmtDatetime, name, phone);

function loadMyEssay(){
	
	$(document).ready(function() {
		findMyCatalogue();
		init(currentPage);
	});

	function init(pageNo) {

        window.sessionStorage.setItem("gmtDatetime",gmtDatetime);
        document.getElementById("applyTime").value = gmtDatetime;
        window.sessionStorage.setItem("name",name);
        document.getElementById("userName").value = name;
        window.sessionStorage.setItem("phone",phone);
        document.getElementById("phoneNumber").value = phone;
        window.sessionStorage.setItem("page",pageNo);
        currentPage = pageNo;

		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/loanOrder/userSelectLoanOrder?gmtDatetime=" + gmtDatetime + "&name=" + name + "&phone=" + phone + "&currentPage=" + pageNo+"&status=" + 7,
			type: "get",
			dataType: 'json',
			async:'false',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
        	if(data.success == true) {
					$.each(data.data.pageDto.list, function(i, n) {
					
						var juese = "新用户";
						if(n.auditorId == null){
					    	dd="未分配";
					    }else{
					    	dd="已分配";
					    }
						if(n.user && n.user.isOld == 1){
							
							juese = "老用户";
						}
						var fengkong = "";
						if (n.isFengkong == 1) {
                            fengkong = "是"
						} else {
                            fengkong = "否"
						}
                        var userName = "";
                        var phone ="";
                        if(n.user){
                            userName = n.user.userName;
                            phone = n.user.phone;
                        }
						var id = n.id;
						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
							'<td class="footable-visible"><input type="checkbox" /></td>' +
							'<td class="footable-visible">' + n.id + '</td>' +
                            '<td class="footable-visible">' + n.user.channelName + '</td>' +
							'<td class="footable-visible">' + n.lianPayNum + '</td>' +
							'<td class="footable-visible">' + userName + '</td>' +
							'<td class="footable-visible">' + phone + '</td>' +
							'<td class="footable-visible">' + n.limitDays + '</td>' +
							'<td class="footable-visible">' + n.borrowMoney + '</td>' +
							'<td class="footable-visible">' + n.realMoney + '</td>' +
							'<td class="footable-visible">' + n.needPayMoney + '</td>' +
							'<td class="footable-visible">' + n.gmtDatetime + '</td>' +
							// '<td class="footable-visible">' + n.allowDays + '</td>' +
							// '<td class="footable-visible">' + juese + '</td>' +
                            '<td class="footable-visible">' + n.noAgree + '</td>' +
                            '<td class="footable-visible">' + fengkong + '</td>' +
							'<td class="footable-visible footable-last-column" style="text-align: center">'+
								'<a hidden="hidden" name="查看认证信息" class="" href="tab.html?id=' + n.userId + '&userName=' +escape(userName)  + '&phone=' + phone+ '&orderId=' +n.id  + '" >查看认证信息</a>&nbsp;'+
								'<a hidden="hidden" name="详情" class="" href="loan_apply_list_detail.html?id='+id+'" >详情</a>&nbsp;'+
								'<a hidden="hidden" name="恢复" class=""  href="javascript:;" data onclick="thisRecover(' + id + ')">恢复</a>' +
								'</td>' +
							'</tr>';
							//alert(n.userId);
						$('#thislist').append(thislist);
						
					});
					$.each(arrayTitle, function(i,k) {
						$('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
					});
					$('#totalMoney').text(data.data.borrowMoney);
					$('#totalPeople').text(data.data.pageDto.total);
					$("#pager").pager({
						pagenumber: pageNo,
						pagecount: data.data.pageDto.pages,
						totalcount: data.data.pageDto.total,
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

	phone = $('#phoneNumber').val().trim();
	name = $('#userName').val().trim();
	gmtDatetime = $('#applyTime').val().trim();
	loadMyEssay();


}

function countPeopleMoney() {
	$.ajax({
		url: urlcore + "/api/loanOrder/countPeopleMoney1?gmtDatetime=" + gmtDatetime + "&name=" + name + "&phoneNumber=" + phoneNumber,
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
	});
}

function findMyCatalogue() {
	$.ajax({
		url: urlcore + "/api/roleThirdCatalogue/findAllByUser?secondTitle=" + jName,
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
		error: function() {
			alert("error");
		}
	});
}

function thisRecover(id) {
	if(confirm("您确定要恢复该用户到待审核界面么？")){

		$.ajax({
			url: urlcore + "/api/user/thisRecover?id="+id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
                loadMyEssay();
			},
			error:function() {
				/* Act on the event */
				alert("error");
			}
		});
	}
}

/*function myBrowser() {
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	var isOpera = userAgent.indexOf("Opera") > -1;
	if(isOpera) {
		return "Opera"
	}; //判断是否Opera浏览器
	if(userAgent.indexOf("Firefox") > -1) {
		return "FF";
	} //判断是否Firefox浏览器
	if(userAgent.indexOf("Chrome") > -1) {
		return "Chrome";
	}
	if(userAgent.indexOf("Safari") > -1) {
		return "Safari";
	} //判断是否Safari浏览器
	if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
		return "IE";
	}; //判断是否IE浏览器
}
//以下是调用上面的函数
var mb = myBrowser();
if("IE" == mb) {
	alert("我是 IE");
}
if("FF" == mb) {
	alert("我是 Firefox");
}
if("Chrome" == mb) {
	alert("我是 Chrome");
}
if("Opera" == mb) {
	alert("我是 Opera");
}
if("Safari" == mb) {
	alert("我是 Safari");
}*/