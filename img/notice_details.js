$(function(){
    var id = getvl("id");
    if (id != '') {
        $.ajax({
            url: urlcore + "/api/message/messageDetails?messageId="+id,
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success:function(data){
                if (data.success == true) {
                    var da = data.data;
                    
                    var messUrl = da.messUrl;
					var imgStr2 = '';
	                if (messUrl != null && messUrl != '') {
	                  var imgarr = messUrl.split("***");
	                  $.each(imgarr,function(index,value){
	                  	imgStr2 += "<img style='padding: 5px 5px 5px 5px;' width='250px' height='250px' src='"+value+"'>";
	                  });
	                }
	                $('#messUrl').html(imgStr2);                  
                    $('#title').text(da.title);
                    $('#content').html(da.content);
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

function subMsg() {
    var id = $('#thisId').text();
    window.location.href="active_add.html?id="+id;
}