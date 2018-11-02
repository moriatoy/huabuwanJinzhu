var type = 3;
$(document).ready(function () {
	//初始化文件输入框
	initMySummernote("content");
	details();
	
});

function details(){
    $.ajax({
        url: urlcore + "/api/agreement/selectOneByType?type="+type,
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success:function(data){
            if (data.success == true) {
                var da = data.data;
                $('#thisId').val(da.id);
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


function release() {
	var id = $('#thisId').val();
	var content = $('#content').summernote('code');
	var type = 3;
	if(confirm("您确认发布吗?")){
    $.ajax({
        url:  urlcore + "/api/agreement/update",
       		type: "post",
	       	data: JSON.stringify({
	            "id": id,
	            "content": content,
	          	"type":type
	        }),
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
                if (data.success == true) {
	                   location.reload();
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
}


function selectOne(type1){
	type = type1;
	details();
}

