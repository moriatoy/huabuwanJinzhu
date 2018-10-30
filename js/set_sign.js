$(document).ready(function () {
        $.ajax({
            url: urlcore + "/api/user/getWhat",
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success:function(data){
                if (data.success == true) {
                    var da = data.data;
                    var sign= da;
                    if(sign==true){
                    	sign=1;
                    }else{
                    	sign=0;
                    }
                    $('#type').val(sign);
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
});

function release() {
	var type = $('#type').val();
    $.ajax({
        url:  urlcore + "/api/user/judge?type="+type,
       		type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
                if (data.success == true) {
                    alert('修改成功');
                    window.location.href = "set_sign.html";        
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
