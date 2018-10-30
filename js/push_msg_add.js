$(document).ready(function () {
	initMySummernote("content");
	
	var id = getvl("id");
    if (id != '') {
        $.ajax({
            url: urlcore + "/api/pushMsg/selectOne?id="+id,
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success:function(data){
                if (data.success == true) {
                    var da = data.data;
                    $('#title').val(da.title);
                    $('#content').summernote("code",da.content);
                } else if (data.code == 'OVERTIME'){
                    var thisUrl = window.location.href;
                    if (thisUrl.indexOf('login.html') <= -1) {
                        top.window.location.href="login.html";
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
	var id = getvl("id");
	if (id=='') {
        id = null;
    }
	var title = $('#title').val();
	var content = $('#content').summernote('code');
	var linkUrl=$('#linkUrl').val();
    $.ajax({
        url:  urlcore + "/api/pushMsg/add",
       		type: "post",
	       	data: JSON.stringify({
	            "id": id,
	            "title": title,
	            "content": content,
	            "linkUrl": linkUrl
	        }),
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
                if (data.success == true) {
	                if (id != null) {
	                    alert('修改成功');
	                    window.location.href = "punsh_msg_list.html";
	                }else{
	                    if (confirm("添加成功，是否继续添加？")) {
	                        //刷新
	                        location.reload();
	                    } else {
	                        //跳转列表页
	                        window.location.href = "punsh_msg_list.html";
	                    }
	                }         
                } else if (data.code == 'OVERTIME'){
                    var thisUrl = window.location.href;
                    if (thisUrl.indexOf('login.html') <= -1) {
                        top.window.location.href="login.html";
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


