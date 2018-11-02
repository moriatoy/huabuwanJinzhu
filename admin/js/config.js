//我的权限数组
var arrayTitle = new Array;
var jName = getCookie('Jname');
function qqbaocun(){
	var qqOne = $("#qqOne").val();
	var qqTwo = $("#qqTwo").val();
	var qqThree = $("#qqThree").val();
	$.ajax({ 
		url: urlcore + "/api/sysConfig/updateQQ?qqOne="+qqOne+"&qqTwo="+qqTwo+"&qqThree="+qqThree,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success:function(data){
			alert("保存成功");
		},
		error:function() {
			alert("error");
		}
	});
}


function tongdunbaocun(){
	var tongdunfenshu = $("#tongdunfenshu").val();
	$.ajax({ 
		url: urlcore + "/api/sysConfig/updateTongdun?tongdunfenshu="+tongdunfenshu,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success:function(data){
			alert("保存成功");
		},
		error:function() {
			alert("error");
		}
	});
}


function money(){
	var money = $("#money").val();
	$.ajax({ 
		url: urlcore + "/api/sysConfig/updateMoney?money="+money,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success:function(data){
			alert("保存成功");
		},
		error:function() {
			alert("error");
		}
	});
}

function zhimafen(){
	var zhimafen = $("#zhimafen").val();
	$.ajax({ 
		url: urlcore + "/api/sysConfig/updateParam?param="+zhimafen+"&type=zhimafen",
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success:function(data){
			alert("保存成功");
		},
		error:function() {
			alert("error");
		}
	});
}

function nianlin(){
	var nianlin = $("#nianlin").val();
	$.ajax({ 
		url: urlcore + "/api/sysConfig/updateParam?param="+nianlin+"&type=nianlin",
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success:function(data){
			alert("保存成功");
		},
		error:function() {
			alert("error");
		}
	});
}

function shouji(){
	var shouji = $("#shouji").val();
	$.ajax({ 
		url: urlcore + "/api/sysConfig/updateParam?param="+shouji+"&type=shouji",
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success:function(data){
			alert("保存成功");
		},
		error:function() {
			alert("error");
		}
	});
}

$(function(){ 
	$.ajax({ 
		url: urlcore + "/api/sysConfig/selectAll?",
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success:function(data){
			$.each(data.data,function(i,elem){
				if(elem.configKey =='money'){
                    $("#money").attr("value",elem.configValue);
				}else if(elem.configKey =='tongdunfenshu'){
                    $("#tongdunfenshu").attr("value",elem.configValue);
				}else if(elem.configKey =='zhimafen'){
                    $("#zhimafen").attr("value",elem.configValue);
				}else if(elem.configKey =='shouji'){
                    $("#shouji").attr("value",elem.configValue);
                }else if(elem.configKey =='nianlin'){
                    $("#nianlin").attr("value",elem.configValue);
				}
			});
		},
		error:function() {
			alert("error");
		}
	}); 

});

function loadMyEssay(gmtDatetime,name,phoneNumber){
	
	$(document).ready(function() {
		init(currentPage);
	});

	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/loanOrder/selectRefuseArea?&current=" + pageNo,
			type: "get",
			dataType: 'json',
			async:'false',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
        	if(data.success == true) {
					$.each(data.data.list, function(i, n) {
						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
							'<td class="footable-visible"><input type="checkbox" /></td>' +
							'<td class="footable-visible">' + n.areaCode + '</td>' +
							'<td class="footable-visible">' + n.areaName + '</td>' +
							'<td class="footable-visible footable-last-column">'+
								'<a  name="删除1"  href="javascript:;"  onclick="delectRefuseArea(' + n.id + ');">删除</a>'+
								'</td>' +
							'</tr>';
							//alert(n.userId);
						$('#thislist').append(thislist);
						
					});
					$.each(arrayTitle, function(i,k) {
						$('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
					});
					$("#pager1").pager({
						pagenumber: pageNo,
						pagecount: data.data.pages,
						totalcount: data.data.total,
						buttonClickCallback: PageClick
					});
				

			      if(data.code == 'OVERTIME') {
					var thisUrl = window.location.href;

					if(thisUrl.indexOf('login.html') <= -1) {
						top.window.location.href = "login.html";
					}

				} else {
					if(data.msg != '空数据') {
						//alert(data.msg)
					} else {
						$('#thiscount').text(0);
					}
				}
				
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

function delectRefuseArea(id){
	$.ajax({ 
		url: urlcore + "/api/loanOrder/deleteRefuseArea?id="+id,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success:function(data){
			window.location.reload(); 
		},
		error:function() {
			alert("error");
		}
	}); 
}
function refuseArea(){
	$("#region").val("");
	$("#number").val("");
}
function addRefuseArea(){
	if (!$("#region").val()) {
		alert("请输入地区")
	} else if (!$("#number").val()) {
		alert("请输入编号")
	} else {
        $.ajax({
            url: urlcore + "/api/loanOrder/addRefuseArea?areaName="+$("#region").val()+"&areaCode="+$("#number").val(),
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success:function(data){
                alert("保存成功");
                window.location.reload();
            },
            error:function() {
                alert("error");
            }
        });
	}
}
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

var currentPage=1;

loadMyEssay();
$(function($){
	findMyCatalogue();
})