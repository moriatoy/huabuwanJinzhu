$(function(){
    //菜单点击
    $(".J_menuItem").on('click',function(){
        var url = $(this).attr('href');
        var name = $(this).text();
        setCookie("Jname",name);
        $("#J_iframe").attr('src',url);
        window.sessionStorage.clear();
        return false;
    });
    getOneAdmin1();
});
		
/**
 * 退出登录
 */
function loginout() {
	$.ajax({
		url: urlcore + "/api/admin/logout",
		type: "GET",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success:function(data){
			if (data.success == true) {
			window.location.href="login.html";
		} else {
			alert(data.msg);
		}
  
		},
		error:function() {
			alert("error");
		}
	});
	
}



function getOneAdmin1() {
    //获取个人信息
	$.ajax({
		url: urlcore + "/api/admin/getThisLogin",
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success:function(data){
			if (data.success == true) {
				if (data.data.roleId === 1 || data.data.roleId === 25) {
					$("#statistics").css("display","block");
				}
				var userName = data.data.userName;
				$('#nick_').text(userName);
				$('#adminId').val(data.data.id);
				myJurisdiction();
				if (data.data.roleId !== 1) {
                    alertFun();
                }
			} else if (data.code == 'OVERTIME'){
				var thisUrl = window.location.href;
				if (thisUrl.indexOf('login.html') <= -1) {
					top.window.location.href="login.html";
				}

			} else if(data.code == 'PARAMETER_INVALID') {
				var thisUrl = window.location.href;
				if (thisUrl.indexOf('login.html') <= -1) {
					top.window.location.href="login.html";
				}
			}
			else {
				alert(data.msg);
			}

		},
		error:function() {
			/* Act on the event */
			alert("error");
		}
	});	
}

function alertFun() {
    // 获取余额信息
    $.ajax({
        url: urlcore + "/api/partner/getShowPop",
        type: "GET",
        dataType: 'json',
        async: false,
        contentType: "application/json;charset=utf-8",
        success:function(data){
            if (data.success == true) {
            	if (data.data === 1) {
					$("#alertNow").css("display","block");
				} else {
                    $("#alertNow").css("display","none");
				}
            } else {
                alert(data.msg);
            }
        },
        error:function() {
            alert("服务端错误");
        }
    });
}


function myJurisdiction (){
	
	$.ajax({
		url: urlcore + "/api/roleThirdCatalogue/findAllByUser",
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success:function(data){
			if (data.data.length < 2) {
            	// document.getElementById("toAdd").style.display = "none"
				window.sessionStorage.setItem("function",false)
			} else {
                window.sessionStorage.setItem("function",true)
			}
			if (data.success == true) {
				$.each(data.data, function(i,n) {
					// console.log(n.thirdCatalogue.second.title)
					$('li[name="'+n.thirdCatalogue.second.first.title+'"]').css("display","block");
					$('li[name="'+n.thirdCatalogue.second.title+'"]').css("display","block");
					if (n.thirdCatalogue.second.title === "催收统计") {
						if (n.thirdCatalogue.title === "详情") {
                            $('li[name="催收统计"]').children().attr("href","overdue_ statistics_core.html?id="+$('#adminId').val()+"&state=1");
                        }
					}
				});
//				$('li').css("display","block");
			} else if (data.code == 'OVERTIME'){
				var thisUrl = window.location.href;
				if (thisUrl.indexOf('login.html') <= -1) {
					top.window.location.href="login.html";
				}

			} else if(data.code == 'PARAMETER_INVALID') {
				var thisUrl = window.location.href;
				if (thisUrl.indexOf('login.html') <= -1) {
					top.window.location.href="login.html";
				}
			}
			else {
				alert(data.msg);
			}

		},
		error:function() {
			/* Act on the event */
			alert("error");
		}
	});	
	
}





function secondLevel(obj){
//	var name = $(obj).attr('name');
//	$.ajax({
//		url: urlcore + "/api/roleThirdCatalogue/findAllByUser?firstTitle="+name,
//		type: "GET",
//		dataType: 'json',
//		contentType: "application/json;charset=utf-8",
//		success:function(data){
//			if (data.success == true) {
//				var list= $(obj).children("ul").children('li');
//				$.each(data.data, function(m,l) {
//					$.each(list, function(i,n) {
//						if ($(n).attr("name") == l.second.title) {
//							$(n).css('display','block');
//							return;
//						}
//					});
//				});
//		} else {
//			alert(data.msg);
//		}
//
//		},
//		error:function() {
//			alert("error");
//		}
//	});
}


//

