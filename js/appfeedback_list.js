
var type = '';
var phoneNumber = '';
var content='';
var currentPage = 1;
loadMyEssay(type,phoneNumber);


function loadMyEssay(type,phoneNumber) {

	$(document).ready(function() {
		init(currentPage);
	});

	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/appFeedback/selectAllFeedBackList?type=" + type + "&phoneNumber=" + phoneNumber+ "&current=" + pageNo,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {

				if(data.success == true) {
					$.each(data.data.list, function(i, n) {
						content=n.content;
						
						var id = n.id;
                        var userName = "";
                        var phone ="";
                        if(n.user){
                            userName = n.user.userName;
                            phone = n.user.phone;
                        }
                        var urls;
                        if($.trim(n.imgUrl) != ''){
                        	urls = n.imgUrl.split("***");
						}
						var imgHtml ="";
						if(urls && urls.length > 0){

                        	$.each(urls,function(i,elem){
                        		if(elem.indexOf("http") > -1){
                                    imgHtml += '<img width="40px" height="40px" src="' + (elem) + '">';
								}else{
                                    imgHtml += '<img width="40px" height="40px" src="' + (imgPath+elem) + '">';
								}
							})
						}

						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
							'<td class="footable-visible"><input type="checkbox" /></td>' +
							'<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible">' + userName + '</td>' +
							'<td class="footable-visible">' + phone + '</td>' +
							'<td class="footable-visible">' + imgHtml + '</td>' +
                            '<td class="footable-visible">' + n.content + '</td>' +
							'<td class="footable-visible">' + new Date(n.gmtDatetime).pattern("yyyy-MM-dd hh:mm:ss") + '</td>' +
							'<td class="footable-visible footable-last-column"><a class="btn btn-primary btn-xs" href="javascript:;" data-toggle="modal" data-target="#contentdetails" onclick="thisDetails(\''+n.content+'\')"> 详情</a>&nbsp;<a class="btn btn-primary btn-xs" href="javascript:;" data onclick="thisUpdate(' + id + ')">删除</a></td>' +
							'</tr>';
						$('#thislist').append(thislist);
					});
					$("#pager").pager({
						pagenumber: pageNo,
						pagecount: data.data.pages,
						totalcount: data.data.total,
						buttonClickCallback: PageClick
					});

				} else if(data.code == 'OVERTIME') {
					var thisUrl = window.location.href;

					if(thisUrl.indexOf('login.html') <= -1) {
						top.window.location.href = "login.html";
					}

				} else {
					if(data.msg != '空数据') {
						alert(data.msg)
					} else {
						$('#thiscount').text(0);
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

function searchList() {
	var phoneNumber = $('#phoneNumber').val().trim();
	
	
	loadMyEssay('',phoneNumber);
}

function selectFeedBackType(type) {
	loadMyEssay( type, '');
}




function thisDetails(contentStr) {
	
  $('#content').html(contentStr);
 
}

function thisUpdate(id) {
	$.ajax({
		url: urlcore + "/api/appFeedback/deleteOneAppFeedBackList?id="+id,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success:function(data){
		     loadMyEssay('','');
		},
		error:function() {
			/* Act on the event */
			alert("error");
		}
	});	
}

