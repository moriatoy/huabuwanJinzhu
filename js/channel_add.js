var id = getvl("id");
var id = getvl("id");
$(document).ready(function () {
	var id = getvl("id");
    if (id != '') {
    	$('#linkUrlDiv').attr("hidden",false);
    	$('#passwdDiv').attr("hidden",true);
        $.ajax({
            url: urlcore + "/api/channel/selectOne?id="+id,
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success:function(data){
                if (data.success == true) {
                    var da = data.data;
                    // $('#name').val(da.name);
                    $('#loginName').val(da.loginName);
                    $('#linkUrl').val(da.linkUrl);
                    $('#proportion').val(da.proportion);
                } else if (data.code == 'OVERTIME'){
                    var thisUrl = window.location.href;
                    if (thisUrl.indexOf('channelLogin.html') <= -1) {
                        top.window.location.href="channelLogin.html";
                    }
                } else {
                    alert(data.msg);
                }
            },
            error:function() {
                /* Act on the event */
                alert("error");
            }
        });
    }
});

function release() {
	if (id=='') {
        id = null;
    }
	// var name = $("#name").val();
	var loginName = $('#loginName').val();
	var password = $('#password').val();
	var proportion = $('#proportion').val();
	var linkUrl = $('#linkUrl').val();

	
    $.ajax({
        url:  urlcore + "/api/channel/add",
       		type: "post",
	       	data: JSON.stringify({
	       		"id": id,
	            "loginName": loginName,
	            "password": password,
	            "proportion":proportion,
                "linkUrl":linkUrl
	        }),
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
                if (data.success == true) {
	                if (id != null) {
	                    alert('修改成功');
	                    window.location.href = "channel_list.html";
	                }else{
	                    if (confirm("添加成功，是否继续添加？")) {
	                        //刷新
	                        location.reload();
	                    } else {
	                        //跳转列表页
	                        window.location.href = "channel_list.html";
	                    }
	                }         
                } else if (data.code == 'OVERTIME'){
                    var thisUrl = window.location.href;
                    if (thisUrl.indexOf('channelLogin.html') <= -1) {
                        top.window.location.href="channelLogin.html";
                    }
                } else {
                    alert(data.msg);
                }

        },
        error: function() {
            alert("error");
        }

    });
}

