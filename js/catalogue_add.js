$(document).ready(function () {
	firstCatalogue();
});

function firstCatalogue(){
    $.ajax({
        url: urlcore + "/api/firstCatalogue/selectAll",
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success:function(data){
            if (data.success == true) {
            	var select1 = $("#firstCatalogue1");
            	var select2 = $("#firstCatalogue2");
            	$.each(data.data, function(i,n) {
            		if(n.id != null){
						var id = n.id;
						var t = n.title;
						select1.append("<option value='"+id+"'>"+t+"</option>");
						select2.append("<option value='"+id+"'>"+t+"</option>");
					}
            	});
            	
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


function release1() {
	if(!confirm("确认提交？")){
		return;
	}
	var firstText = $('#firstText').val().trim();
	if (firstText == "") {
		return;
	}
    $.ajax({
        url:  urlcore + "/api/firstCatalogue/add",
       		type: "post",
	       	data: JSON.stringify({
	            "title": firstText
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


function release2() {
	if(!confirm("确认提交？")){
		return;
	}
	var firstCatalogue = $('#firstCatalogue1').val();
	var secondText = $('#secondText').val().trim();
	if (secondText == "") {
		return;
	}
    $.ajax({
        url:  urlcore + "/api/secondCatalogue/add",
       		type: "post",
	       	data: JSON.stringify({
	            "title": secondText,
	            "firstId":firstCatalogue
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


function release3() {
	if(!confirm("确认提交？")){
		return;
	}
	var secondCatalogue = $('#secondCatalogue').val();
	var thirdText   = $('#thirdText').val().trim();
	if (thirdText == "") {
		return;
	}
    $.ajax({
        url:  urlcore + "/api/thirdCatalogue/add",
       		type: "post",
	       	data: JSON.stringify({
	            "title": thirdText,
	            "secondId":secondCatalogue
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



function selectOne(value){
	$("#secondCatalogue").html('<option value="-1">请选择...</option>');
	$.ajax({
        url: urlcore + "/api/secondCatalogue/selectAll?firstId="+value,
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success:function(data){
            if (data.success == true) {
            	var select1 = $("#secondCatalogue");
            	$.each(data.data, function(i,n) {
            		if(n.id != null){
						var id = n.id;
						var t = n.title;
						select1.append("<option value='"+id+"'>"+t+"</option>");
					}
            	});
            	
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
