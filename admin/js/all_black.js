var userName='';
var currentPage=1;
var currentPage2=1;
var currentPage3=1;
var totalMoney = 0;
var totalPeople = 0;
var jName = getCookie('Jname');
var orderId = getvl('orderId');
//我的权限数组
var arrayTitle = new Array; 
loadMyEssay(userName);
loadMyEssay2(userName);
loadMyEssay3(userName);


function loadMyEssay(phone){
	$(document).ready(function() {
		findMyCatalogue();
		init(currentPage);
	});
	function init(pageNo) {
        $("#followList").html("");
        $.ajax({
            url: urlcore + "/api/user/roster/phoneVip/list?current="+pageNo + "&phone=" + phone,
            type: "get",
            async:'false',
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                if(data.success == true) {
                    $.each(data.data.records, function(i, n) {
                        var thislist =
                            '<tr class="footable-even" style="display: table-row;">' +
                            '	<td class="footable-visible">' + n.id + '</td>' +
                            '	<td class="footable-visible">' + n.phone + '</td>' +
                            '	<td class="footable-visible">' + timeVal(n.gmtDatetime) + " ~ " + timeVal(n.uptDatetime) + '</td>' +
                            '</tr>';
                        $('#followList').append(thislist);
                    });
                    $("#pager").pager({
                        pagenumber: pageNo,
                        pagecount: data.data.pages,
                        totalcount: data.data.total,
                        buttonClickCallback: PageClick
                    });
                }
            },
            error: function() {
                alert("error");
            }
        });
	}
	PageClick = function(pageclickednumber) {
		init(pageclickednumber);
	}
}


function loadMyEssay2(idCard){
    $(document).ready(function() {
        init2(currentPage2);
    });
    function init2(pageNo) {
        $("#followList2").html("");
        $.ajax({
            url: urlcore + "/api/user/roster/cardVip/list?current="+pageNo + "&cardNum=" + idCard,
            type: "get",
            async:'false',
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                if(data.success == true) {
                    $.each(data.data.records, function(i, n) {
                        var thislist =
                            '<tr class="footable-even" style="display: table-row;">' +
                            '	<td class="footable-visible">' + n.id + '</td>' +
                            '	<td class="footable-visible">' + n.cardNum + '</td>' +
							'	<td class="footable-visible">' + timeVal(n.gmtDatetime) + " ~ " + timeVal(n.uptDatetime) +'</td>' +
                            '</tr>';
                        $('#followList2').append(thislist);
                    });
                    $("#pager2").pager({
                        pagenumber: pageNo,
                        pagecount: data.data.pages,
                        totalcount: data.data.total,
                        buttonClickCallback: PageClick2
                    });
                }
            },
            error: function() {
                alert("error");
            }
        });
    }
    PageClick2 = function(pageclickednumber) {
        init2(pageclickednumber);
    }
}

function loadMyEssay3(idCard){
    $(document).ready(function() {
        init3(currentPage3);
    });
    function init3(pageNo) {
        $("#followList3").html("");
        $.ajax({
            url: urlcore + "/api/user/roster/black/list?current="+pageNo + "&cardNum=" + idCard,
            type: "get",
            async:'false',
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                if(data.success == true) {
                    $.each(data.data.records, function(i, n) {
                    	var thislist =
						'<tr class="footable-even" style="display: table-row;">' +
						'	<td class="footable-visible">' + n.id + '</td>' +
						'	<td class="footable-visible">' + n.idCard + '</td>' +
						'</tr>';
						$('#followList3').append(thislist);
                    });
                    $("#pager3").pager({
                    	pagenumber: pageNo,
                    	pagecount: data.data.pages,
                    	totalcount: data.data.total,
                    	buttonClickCallback: PageClick3
                    });
                }
            },
            error: function() {
                alert("error");
            }
        });
    }
    PageClick3 = function(pageclickednumber) {
        init3(pageclickednumber);
    }
}
function searchList() {
    currentPage = 1;
    loadMyEssay($("#idCard").val())
}
function searchList2() {
    currentPage2 = 1;
    loadMyEssay2($("#idCard2").val())
}
function searchList3() {
    currentPage3 = 1;
    loadMyEssay3($("#idCard3").val())
}
function fileClick() {
    $("#file").click();
}
function UpladFile() {
    var fileObj = document.getElementById("file").files[0]; // js 获取文件对象
    var url =  urlcore + "/api/user/roster/phoneVip/import"; // 接收上传文件的后台地址
    var form = new FormData(); // FormData 对象
    form.append("file", fileObj); // 文件对象
    $.ajax({
        type: "POST", // 数据提交类型
        url: url, // 发送地址
        data: form, //发送数据
        async: true, // 是否异步
        processData: false, //processData 默认为false，当设置为true的时候,jquery ajax 提交的时候不会序列化 data，而是直接使用data
        contentType: false, //
        success: function(data) {
            $("#file").val("");
            if(data.success == true) {
                alert("上传手机白名单成功");
                loadMyEssay($("#idCard").val());
            } else {
                alert(data.msg);
            }
        },
        error: function() {
            $("#file").val("");
            alert("上传失败");
        }
    });
}
function fileClick2() {
    $("#file2").click();
}
function UpladFile2() {
    var fileObj = document.getElementById("file2").files[0]; // js 获取文件对象
    var url =  urlcore + "/api/user/roster/cardVip/import"; // 接收上传文件的后台地址
    var form = new FormData(); // FormData 对象
    form.append("file", fileObj); // 文件对象
    $.ajax({
        type: "POST", // 数据提交类型
        url: url, // 发送地址
        data: form, //发送数据
        async: true, // 是否异步
        processData: false, //processData 默认为false，当设置为true的时候,jquery ajax 提交的时候不会序列化 data，而是直接使用data
        contentType: false, //
        success: function(data) {
            $("#file2").val("");
            if(data.success == true) {
                alert("上传身份证白名单成功");
                loadMyEssay2($("#idCard").val());
            } else {
                alert(data.msg);
            }
        },
        error: function() {
            $("#file2").val("");
            alert("上传失败");
        }
    });
}
function fileClick3() {
    $("#file3").click();
}
function UpladFile3() {
    var fileObj = document.getElementById("file3").files[0]; // js 获取文件对象
    var url =  urlcore + "/api/user/roster/black/import"; // 接收上传文件的后台地址
    var form = new FormData(); // FormData 对象
    form.append("file", fileObj); // 文件对象
    $.ajax({
        type: "POST", // 数据提交类型
        url: url, // 发送地址
        data: form, //发送数据
        async: true, // 是否异步
        processData: false, //processData 默认为false，当设置为true的时候,jquery ajax 提交的时候不会序列化 data，而是直接使用data
        contentType: false, //
        success: function(data) {
            $("#file3").val("");
            if(data.success == true) {
                alert("上传身份证黑名单成功");
                loadMyEssay3($("#idCard").val());
            } else {
                alert(data.msg);
            }
        },
        error: function() {
            $("#file3").val("");
            alert("上传失败");
        }
    });
}
// 时间格式化
function timeVal(val) {
    if (val != null) {
        var date = new Date(val);
        // return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + r(date.getHours()) + ':' + r(date.getMinutes()) + ':' + r(date.getSeconds());
    } else {
        return "-"
    }
}
function r(item) {
    return item < 10 ? '0' + item : item;
}
// 权限
function findMyCatalogue(){
	$.ajax({
		url: urlcore + "/api/roleThirdCatalogue/findAllByUser?secondTitle="+jName,
		type: "GET",
		dataType: 'json',
		async: false,
		contentType: "application/json;charset=utf-8",
		success:function(data){
		if (data.success == true) {
			$.each(data.data, function(i,n) {
				arrayTitle.push(n.thirdCatalogue.title);
			});
		} else {
			alert(data.msg);
		}

		},
		error:function() {
			alert("error");
		}
	});
}