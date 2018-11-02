var id = getvl("id");
$(document).ready(function () {
	details();
	details1();
	
	var id = getvl("id");
    if (id != '') {
        $.ajax({
            url: urlcore + "/api/admin/selectOne?id="+id,
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success:function(data){
                if (data.success == true) {
                    var da = data.data;
                    console.log(da);
                    $("#departmentType").val(da.departmentId);
                    $("#roleType").val(da.roleId)
                    $('#userName').val(da.userName);
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
	if (id=='') {
        id = null;
    }
	var type1=$("#departmentType").val();
	var type = $("#roleType").val();
	var userName = $('#userName').val();
	var password = $('#password').val();
    $.ajax({
        url:  urlcore + "/api/admin/add",
       		type: "post",
	       	data: JSON.stringify({
	       		"id": id,
	            "userName": userName,
	            "password": password,
	            "roleId":type,
	            "departmentId":type1
	        }),
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
                if (data.success == true) {
	                if (id != null) {
	                    alert('修改成功');
	                    window.location.href = "admin_list.html";
	                }else{
	                    if (confirm("添加成功，是否继续添加？")) {
	                        //刷新
	                        location.reload();
	                    } else {
	                        //跳转列表页
	                        window.location.href = "admin_list.html";
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

function details(){
    $.ajax({
        url: urlcore + "/api/role/selectRoleAll",
        type: "get",
        async: false,
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success:function(data){
            if (data.success == true) {
            	var select = $("#roleType");
				$.each(data.data,function(i,n) {
					if(n.id != null){
						var id = n.id;
						var t = n.title;
						select.append("<option value='"+id+"'>"+t+"</option>");
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





function details1(){
    $.ajax({
        url: urlcore + "/api/department/selectDepartmentAll",
        type: "get",
        async: false,
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success:function(data){
            if (data.success == true) {
            	var select = $("#departmentType");
				$.each(data.data,function(i,n) {
					if(n.id != null){
						var id = n.id;
						var t = n.department;
						select.append("<option value='"+id+"'>"+t+"</option>");
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