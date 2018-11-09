
var phone = getvl('phone');
var userName = getvl('userName');
var id = getvl("id")
var orderId = getvl('orderId');


loadMyEssay(id);
loadMyEssay5(id);




function loadMyEssay(id) {

	$.ajax({
		url: urlcore + "/api/userIdentity/selectOneDetailsByUserId?id=" + id,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success: function(data) {
			if(data.success == true) {
				var da = data.data;
				var status = '';
				if(da.status == 0) {
					status = "未认证"
				} else if(da.status == 1) {
					status = "已认证"
				}
				$('#userName').html(da.userName);
				$('#qqNum').html(da.qqNum);
				$('#address').html(da.address);
				$('#addressDetails').html(da.addressDetails);
				$('#phoneNumber').html(da.user.phone);
				$('#identityNum').html(da.identityNum);
				$('#status').html(status);
				//$('#gmtDatetime').html(da.gmtDatetime);
				document.getElementById("bigidentityFront").rel = transUrl(da.identityFront);

				document.getElementById("identityFront").src = transUrl(da.identityFront);
				document.getElementById("bigidentityBack").rel =transUrl(da.identityBack);
				document.getElementById("identityBack").src = transUrl(da.identityBack);
				
				document.getElementById("bigfaceUrl").rel = transUrl(da.faceUrl);
				document.getElementById("faceUrl").src = transUrl(da.faceUrl);

			}

		},
		error: function() {
			/* Act on the event */
			alert("error");
		}
	});

}
function transUrl(url){
	if($.trim(url) == ''){
		return "";
	}
	if(url.indexOf("http") > -1){
		return url;
	}
	return imgPath+url;
}
function loadMyEssay5(id) {
	$.ajax({
		url: urlcore + "/api/userBasicMsg/selectOneDetailsByUserId?id=" + id,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success: function(data) {
			if(data.success == true) {
				var n = data.data;				
				$("#phone").html(phone);		
				$("#realName").html(userName);
				$("#gmtDatetime").html(n.gmtDatetime);
				$("#score").html(n.user.authScore);
				$("#marry").html(n.marry);
				$("#study").html(n.study);
				$("#province").html(n.province);
				$("#city").html(n.city);
				$("#county").html(n.county);
				$("#areaCode").html(n.areaCode);
				$("#addressDetail").html(n.addressDetails);
				$("#workCompany").html(n.workCompany);
				$("#workPlace").html(n.workPlace);
				$("#workMoney").html(n.workMoney);
				$("#workPhone").html(n.workPhone);												
				$("#linkPersonNameOne").html(n.linkPersonNameOne);
				$("#linkPersonPhoneOne").html(n.linkPersonPhoneOne);
				$("#linkPersonRelationOne").html(n.linkPersonRelationOne);
				$("#linkPersonNameTwo").html(n.linkPersonNameTwo);
				$("#linkPersonPhoneTwo").html(n.linkPersonPhoneTwo);
				$("#linkPersonRelationTwo").html(n.linkPersonRelationTwo);

			} else if(data.code == 'OVERTIME') {
				var thisUrl = window.location.href;
				if(thisUrl.indexOf('login.html') <= -1) {
					top.window.location.href = "login.html";
				}

			} else if(data.code == 'PARAMETER_INVALID') {
				var thisUrl = window.location.href;
				if(thisUrl.indexOf('login.html') <= -1) {
					top.window.location.href = "login.html";
				}
			} else {
				alert(data.msg);
			}

		},
		error: function() {
			/* Act on the event */
			alert("error");
		}
	});
}


//运营商
function loadMyEssay9() {
	$.ajax({
		url: urlcore + "/api/userPhone/selectOne?id=" + id,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success: function(data) {
			if(data.success == true) {
				var n = data.data;
				$("#realName3").html(n.realName);
				$("#identityCode2").html(n.identityCode);
				$("#accountBalance").html(parseFloat(n.accountBalance)*0.01);
				$("#netTime").html(n.netTime);
				$("#netAgeo").html(n.netAgeo);
				$("#mobileStatus").html(mobileStatus);
			} else if(data.code == 'OVERTIME') {
				var thisUrl = window.location.href;
				if(thisUrl.indexOf('login.html') <= -1) {
					top.window.location.href = "login.html";
				}

			} else if(data.code == 'PARAMETER_INVALID') {
				var thisUrl = window.location.href;
				if(thisUrl.indexOf('login.html') <= -1) {
					top.window.location.href = "login.html";
				}
			} else {
				alert(data.msg);
			}

		},
		error: function() {
			/* Act on the event */
			alert("error");
		}
	});
}



function loadMyEssay7() {
	$.ajax({
		url: urlcore + "/api/userBank/selectByUserId?id=" + id,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success: function(data) {
			if(data.success == true) {
				var n = data.data;
				$("#bankcardno").html(n.bankcardno);
				$("#name").html(n.name);
				$("#idcardno").html(n.idcardno);
				$("#bankPhone").html(n.bankPhone);

			} else if(data.code == 'OVERTIME') {
				var thisUrl = window.location.href;
				if(thisUrl.indexOf('login.html') <= -1) {
					top.window.location.href = "login.html";
				}

			} else if(data.code == 'PARAMETER_INVALID') {
				var thisUrl = window.location.href;
				if(thisUrl.indexOf('login.html') <= -1) {
					top.window.location.href = "login.html";
				}
			} else {
				alert(data.msg);
			}

		},
		error: function() {
			/* Act on the event */
			alert("error");
		}
	});
}





function loadMyEssay1() {
	$(document).ready(function() {
		//设置默认第1页
		init(1);
	});

	//默认加载  
	function init(pageNo) {
		//获取用户信息列表
		$("#thislist1").html("");
		$.ajax({
			url: urlcore + "/api/userTaobaoAddress/findByAddressPage?pageNo=" + pageNo + "&pageSize=" + pageSize + "&userId=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					//i表示在data中的索引位置，n表示包含的信息的对象
					$.each(data.data.list, function(i, n) {
						var thislist1 = '<tr>' +
							'<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible">' + phone + '</td>' +
							'<td class="footable-visible">' + userName + '</td>' +
							'<td class="footable-visible">' + n.address + '</td>' +
							'</tr>';
						$('#thislist1').append(thislist1);
					});

					$("#pager1").pager({
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

//function loadMyEssay2() {
//	$(document).ready(function() {
//		//设置默认第1页
//		init(1);
//	});
//
//	//默认加载  
//	function init(pageNo) {
//		//获取用户信息列表
//		$("#thislist2").html("");
//		$.ajax({
//			url: urlcore + "/api/userJindongAddress/findByAddressPage?pageNo=" + pageNo + "&pageSize=" + pageSize + "&userId=" + id,
//			type: "get",
//			dataType: 'json',
//			contentType: "application/json;charset=utf-8",
//			success: function(data) {
//				if(data.success == true) {
//					//i表示在data中的索引位置，n表示包含的信息的对象
//					$.each(data.data.list, function(i, n) {
//						var thislist2 = '<tr>' +
//							'                                    <td class="footable-visible">' + n.id + '</td>' +
//							'                                    <td class="footable-visible">' + phone + '</td>' +
//							'                                    <td class="footable-visible">' + userName + '</td>' +
//							'                                    <td class="footable-visible">' + n.orderAddress + '</td>' +
//							'                                </tr>';
//						$('#thislist2').append(thislist2);
//					});
//
//					$("#pager2").pager({
//						pagenumber: pageNo,
//						pagecount: data.data.pages,
//						totalcount: data.data.total,
//						buttonClickCallback: PageClick
//					});
//
//				} else if(data.code == 'OVERTIME') {
//					var thisUrl = window.location.href;
//					if(thisUrl.indexOf('login.html') <= -1) {
//						top.window.location.href = "login.html";
//					}
//
//				} else {
//					if(data.msg != '空数据') {
//						alert(data.msg)
//					} else {
//						$('#thiscount').text(0);
//					}
//				}
//
//			},
//			error: function() {
//				/* Act on the event */
//				alert("error");
//			}
//		});
//	}
//
//	//回调函数  
//	PageClick = function(pageclickednumber) {
//		init(pageclickednumber);
//	}
//
//}

function loadMyEssay3() {
	$(document).ready(function() {
		//设置默认第1页
		init(1);
	});

	//默认加载  
	function init(pageNo) {
		//获取用户信息列表
		$("#thislist3").html("");
		$.ajax({
			url: urlcore + "/api/userPhoneList/findByUserPage?userId=" + id + "&pageNo=" + pageNo + "&pageSize=" + pageSize,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					//i表示在data中的索引位置，n表示包含的信息的对象
					$.each(data.data.list, function(i, n) {
						var thislist3 =
							'<tr>' +
							'	<td class="footable-visible">' + n.name + '</td>' +
							'	<td class="footable-visible">' + n.phone + '</td>' +
							'	<td class="footable-visible">' + n.link + '</td>' +
							'</tr>';
						$('#thislist3').append(thislist3);
					});

					$("#pager3").pager({
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

function loadMyEssay4() {

	var taskId = "";
	// var userName = "";
	var new_window = window.open("","","width=1000,height=800");
    $.ajax({
    	url: urlcore + "/api/user/selectYYSResult?userId=" + id ,
    	type: "get",
    	dataType: 'json',
    	contentType: "application/json;charset=utf-8",
    	success: function(data) {
    		taskId = data.data.taskId;
    		// userName = data.data.mobile;
            $.ajax({
                url: urlcore + "/api/user/getTongdunToken",
                type: "get",
                dataType: 'json',
                contentType: "application/json;charset=utf-8",
                success: function(data) {
                    var token = data.data;
                    new_window .location = "https://report.shujumohe.com/report/"+taskId+"/"+token;
                },
                error: function() {
                    alert("error");
                }
            });
    	},
    	error: function() {

    		alert("error");
    	}
    });

}

function loadMyEssay0() {
    var taskId = "";
    $.ajax({
        url: urlcore + "/api/userTaobao/select?userId=" + id,
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
        	if (data.data !== null) {
				$("#email2").text(data.data.email);
                $("#huabei").text(data.data.huabei / 100);
                $("#jiebei").text(data.data.jiebei / 100);
                $("#mobiles").text(data.data.mobiles);
                $("#zhima").text(data.data.zhima);
			} else {
        		alert("未认证")
			}
        },
        error: function() {
            alert("error");
        }
    });
}

function loadMyEssay6() {
	$(document).ready(function() {
		//设置默认第1页
		init(1);
	});

	//默认加载  
	function init(pageNo) {
		//获取用户信息列表
		$("#thislist6").html("");
		$.ajax({
			url: urlcore + "/api/userTaobaoZhifubao/findByUserPage?userId=" + id + "&pageNo=" + pageNo + "&pageSize=" + pageSize,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					//i表示在data中的索引位置，n表示包含的信息的对象
					$.each(data.data.list, function(i, n) {
						var thislist3 = '<tr>' +
							'                                    <td class="footable-visible">' + n.id + '</td>' +
							'                                    <td class="footable-visible">' + userName + '</td>' +
							'                                    <td class="footable-visible">' + n.huabeiCanUseMoney + '</td>' +
							'                                    <td class="footable-visible">' + n.huabeiTotalAmount + '</td>' +
							'                                    <td class="footable-visible">' + n.alipayRemainingAmount + '</td>' +
						
							'                                </tr>';
						$('#thislist6').append(thislist3);
					});

					$("#pager6").pager({
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
				
				alert("error");
			}
		});
	}

	//回调函数  
	PageClick = function(pageclickednumber) {
		init(pageclickednumber);
	}

}






//function test(){
//             
//			var  td_data= null;
//			
//
//     		var  person_info= null;
//     		
//     		$.ajax({
//			url: urlcore + "/api/mobileAuthentication/query?userId ="+id,
//			type: "get",
//			dataType: 'json',
//			contentType: "application/json;charset=utf-8",
//			success: function(data) {
//				if(data.success == true) {
//					
//					td_data = data.data.td_data;
//					person_info = data.data.person_info;
//					
//
//			},
//			error: function() {
//				/* Act on the event */
//				alert("error");
//			}
//			});
//     		alert(td_data);
//     		alert(person_info);
//     		$.showTDReport(td_data,person_info)
//}
        
        function test()
        {
             
			var  td_data= null;

       		var  person_info=null;
       		$.ajax({
				url: urlcore + "/api/mobileAuthentication/query?userId="+id,
				type: "get",
				dataType: 'json',
				contentType: "application/json;charset=utf-8",
				success: function(data) {
					if(data.success == true) {
						
						td_data = data.data.td_data1;
						person_info = data.data.person_info1;
       					$.showTDReport(td_data,person_info)
					}
				},
				error: function() {
					/* Act on the event */
					alert("error");
				}
				});
			
       		
        }
        
        (function(){
            if(typeof jQuery == "undefined"){
                var  jq_script = document.createElement('script');
                jq_script.type = "text/javascript";
                jq_script.src =  "http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js";
                jq_script.onload = loadPreloanLib;
                document.getElementsByTagName('head')[0].appendChild(jq_script);
            } else {
                loadPreloanLib();
            }
         
         
            function loadPreloanLib(){
                var td_script = document.createElement('script');
                td_script.type = "text/javascript";
                td_script.src = "http://cdnjs.tongdun.cn/preloan/tdreport.1.4.min.js?r=" + (new Date()).getTime();
                document.getElementsByTagName('head')[0].appendChild(td_script);
            }
		})();
		
//支付宝
function loadMyEssay8() {
	$.ajax({
		url: urlcore + "/api/userZhifubao/validZhiFuBao?orderId=" + orderId,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success: function(data) {
			if(data.success == true) {
				var n = data.data;
				if(n.verified==1){
					n.verified = "是";
				}else{
					n.verified = "否";
				}
				$("#userName2").html(n.account);
                $("#userPassword").html(n.password);
				/*$("#realName2").html(n.realName);
				$("#userMobile").html(n.userMobile);
				$("#identityCode").html(n.identityCode);
				$("#verified").html(n.verified);
				$("#assetsYuEbao").html(parseFloat(n.assetsYuEbao)*0.01);
				$("#huabeiQuota").html(parseFloat(n.huabeiQuota)*0.01);
				$("#huabeiBalance").html(parseFloat(n.huabeiBalance)*0.01);
				$("#huabeiNextRepaymentAmount").html(parseFloat(n.huabeiNextRepaymentAmount)*0.01);
				$("#email").html(n.email);*/
			} else if(data.code == 'OVERTIME') {
				var thisUrl = window.location.href;
				if(thisUrl.indexOf('login.html') <= -1) {
					top.window.location.href = "login.html";
				}

			} else if(data.code == 'PARAMETER_INVALID') {
				var thisUrl = window.location.href;
				if(thisUrl.indexOf('login.html') <= -1) {
					top.window.location.href = "login.html";
				}
			} else {
				alert(data.msg);
			}

		},
		error: function() {
			/* Act on the event */
			alert("error");
		}
	});
	

}

function loadMyEssay12(){
	$.ajax({
		url: urlcore + "/api/tongdun/face/query?userId=" + id,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success: function(data) {
			if(data.success == true) {
				$("#jsname").html(data.data.name);
				$("#jsidNumber").html(data.data.idNumber);
				$("#jssimilarity").html(data.data.similarity);
				$('#jsimage').attr('src',transUrl(data.data.image));
                $('#frontcard').attr('src',transUrl(data.data.frontcard));
                $('#backcard').attr('src',transUrl(data.data.backcard));
			} else if(data.code == 'OVERTIME') {
				var thisUrl = window.location.href;
				if(thisUrl.indexOf('login.html') <= -1) {
					top.window.location.href = "login.html";
				}
			} else if(data.code == 'PARAMETER_INVALID') {
				var thisUrl = window.location.href;
				if(thisUrl.indexOf('login.html') <= -1) {
					top.window.location.href = "login.html";
				}
			} else {
				alert(data.msg);
			}

		},
		error: function() {
			/* Act on the event */
			alert("error");
		}
	});
}
function loadMyEssay11() {
	$(document).ready(function() {
		//设置默认第1页
		init(1);
	});

	//默认加载  
	function init(pageNo) {
		//获取用户信息列表
		$("#thislist11").html("");
		$.ajax({
			url: urlcore + "/api/userTongdunfen/findByUserPage?userId=" + id + "&pageNo=" + pageNo + "&pageSize=" + pageSize,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					//i表示在data中的索引位置，n表示包含的信息的对象
					$.each(data.data.list, function(i, n) {
						var thislist11 = '<tr>' +
							'                                    <td class="footable-visible">' + n.id + '</td>' +
							'                                    <td class="footable-visible">' + n.riskName + '</td>' +
							'                                    <td class="footable-visible">' + n.score + '</td>' +
							'                                    <td class="footable-visible">' + n.lianPayNum + '</td>' +
							'                                    <td class="footable-visible">' + n.gmtDatetime + '</td>' +		
							'                                </tr>';
						$('#thislist11').append(thislist11);
					});

					$("#pager11").pager({
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
				
				alert("error");
			}
		});
	}

	//回调函数  
	PageClick = function(pageclickednumber) {
		init(pageclickednumber);
	}

}


        