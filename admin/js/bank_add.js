$(document).ready(function () {
	//初始化文件输入框
    initFileInput("messUrl", urlcore + "/api/attachment/upload","#messUrlUrl");
    
	var id = getvl("id");
    if (id != '') {
        $.ajax({
            url: urlcore + "/api/bank/selectOne?id="+id,
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success:function(data){
                if (data.success == true) {
                    var da = data.data;
                    //旧图
                    $('#jiu_picture_div').css("display", "block");
                    var messUrlUrl = da.imgUrl;
                    var imgStr1 = '';
                    if (messUrlUrl != null && messUrlUrl != '') {
                        var imgarr = messUrlUrl.split("***");
                        $.each(imgarr,function(index,value){
                            imgStr1 += 
                            	'<div style="position:relative;width:250px;height:250px;float:left;" display="block">'+
                            	'	<span onclick="removeStrHtml(this)" style="position:absolute;top:10px;right:10px;font-size:20px;color:#f00;" class="glyphicon glyphicon-trash" aria-hidden="true">'+
                            	'	</span>'+
                            	'	<img style="padding: 5px 5px 5px 5px;" width="250px" height="250px" src="'+value+'">'+
                        		'</div>';
                        });
                    }
                    $('#messUrlUrl').html(imgStr1);
                    $('#bankName').val(da.bankName);
                    $('#secondTitle').val(da.secondTitle);
                    $('#linkUrl').val(da.linkUrl);
                    $('#progressUrl').val(da.progressUrl);
                    $('#isFirstpage').val(da.isFirstpage);
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
	var bankName = $('#bankName').val();
	var secondTitle = $('#secondTitle').val();
	var isFirstpage=$('#isFirstpage').val();
	var linkUrl=$('#linkUrl').val();
	var progressUrl=$('#progressUrl').val();
	//照片地址
	var messUrlUrl = "";
    $("#messUrlUrl img").each(function(index,item){
		messUrlUrl += $(this).attr("src")+"***";
	});
    messUrlUrl = messUrlUrl.substring(0, messUrlUrl.length-3);
    $.ajax({
        url:  urlcore + "/api/bank/add",
       		type: "post",
	       	data: JSON.stringify({
	            "id": id,
	            "bankName": bankName,
	            "secondTitle": secondTitle,
	            "imgUrl": messUrlUrl,
	            "isFirstpage": isFirstpage,
	            "linkUrl": linkUrl,
	            "progressUrl": progressUrl
	        }),
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
                if (data.success == true) {
	                if (id != null) {
	                    alert('修改成功');
	                    window.location.href = "bank_list.html";
	                }else{
	                    if (confirm("添加成功，是否继续添加？")) {
	                        //刷新
	                        location.reload();
	                    } else {
	                        //跳转列表页
	                        window.location.href = "bank_list.html";
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


