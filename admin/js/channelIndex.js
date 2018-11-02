$(function(){
    //菜单点击
    $(".J_menuItem").on('click',function(){
        var url = $(this).attr('href');
//      var name = $(this).text();
//      setCookie("Jname",name);
        $("#J_iframe").attr('src',url);
        return false;
    });
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
			window.location.href="channelLogin.html";
		} else {
			alert(data.msg);
		}
  
		},
		error:function() {
			alert("error");
		}
	});
	
}

getOneAdmin1();
function getOneAdmin1() {
    //获取个人信息
	$.ajax({
		url: urlcore + "/api/channel/getThisLogin",
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success:function(data){
			if (data.success == true) {
				var userName = data.data.loginName;
				$('#nick_').text(userName);
				$('#adminId').val(data.data.id);
			} else if (data.code == 'OVERTIME'){
				var thisUrl = window.location.href;
				if (thisUrl.indexOf('channelLogin.html') <= -1) {
					top.window.location.href="channelLogin.html";
				}

			} else if(data.code == 'PARAMETER_INVALID') {
				var thisUrl = window.location.href;
				if (thisUrl.indexOf('channelLogin.html') <= -1) {
					top.window.location.href="channelLogin.html";
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






