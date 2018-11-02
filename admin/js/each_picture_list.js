
var jName = getCookie('Jname');
//我的权限数组
var arrayTitle = new Array; 
var id='';
var currentPage = 1;
loadMyEssay(id);

function loadMyEssay(id) {

	$(document).ready(function() {
		findMyCatalogue()
		init(currentPage);
	});

	function init(pageNo) {
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/eachPicture/selectAll?id=" + id + "&current=" + pageNo,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {

				if(data.success == true) {
					$.each(data.data.list, function(i, n) {
						var id = n.id;
						var imgarr = n.imgUrl.split("***");
						var imgarr1 = imgarr[0];
						if(n.linkUrl == undefined || n.linkUrl == null) {
							n.linkUrl = " ";
				}
						var status="";
						if(n.status==0){
							status="未发布";
						}else if(n.status==1){
							status="展示中";
						}else{
							status="已下架";
						}
						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
							'<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible"><img width="40px" height="40px" src="' + n.imgUrl + '"></td>' +
							'<td class="footable-visible">' + n.linkUrl + '</td>' +
							'<td class="footable-visible footable-last-column">' + 
								'<a hidden="hidden" class="" name="修改" href="each_picture_add.html?id=' + id + '"> 修改</a>&nbsp;&nbsp;'+
								'<a hidden="hidden" class="" name="删除" href="javascript:;" onclick="deleteeach(' + n.id + ')"> 删除</a>' + '</td>' +'</tr>';
						$('#thislist').append(thislist);
					});
					
					$.each(arrayTitle, function(i,k) {
						$('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
						$('a[data="'+k+'"]').attr("class","btn btn-sm btn-primary");
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
function deleteeach(id){
		if(confirm("您确定要删除这条广告吗？")){
		$.ajax({
			url: urlcore + "/api/eachPicture/deleteOne?id="+id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
			     loadMyEssay('');
			},
			error:function() {
				/* Act on the event */
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