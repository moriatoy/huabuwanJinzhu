$(function(){
	//登陆按钮绑定回车键
	$(document).keydown(function(event){
		if(event.keyCode==13){
			$("#login").click();
		}
	});
})
//登录
function toLogin(){
	//获取用户名和密码
	var userName = $("#userName").val().trim();
	var password = $("#password").val().trim();
	if(userName!="" && password!=""){
		$.ajax({
			url: urlcore + "/api/channel/login?userName="+userName+"&password="+password,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
				if (data.success == true) {
//					//设置cookie
					var domain_url = urlcore.split('://')[1];
					if (domain_url.indexOf(':') > -1) {
						domain_url = domain_url.split(':')[0];
					}else{
						domain_url = domain_url.split('/')[0];
					}
					document.cookie = "JSESSIONID="+data.data.token+";path=/;domain="+domain_url;
					
					window.location.href="channelIndex.html";
				} else {
					alert(data.msg);
				}
				
			},
			error:function() {
				/* Act on the event */
				alert("error");
			}
		});
	} else{
		alert("用户名或密码不能为空！");
		return ;
	}
}