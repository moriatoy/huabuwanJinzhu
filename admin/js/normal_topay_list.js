var limitPayTime='';
var name='';
var phoneNumber='';
var currentPage=1;
var totalMoney = 0;
var totalPeople = 0;
var jName = getCookie('Jname');
var orderId = getvl('orderId');

var sessTime = window.sessionStorage.getItem("limitPayTime");
if (sessTime === "null" || sessTime === null) {
    limitPayTime = "";
} else {
    limitPayTime = window.sessionStorage.getItem("limitPayTime");
}
var sessName = window.sessionStorage.getItem("name");
if (sessName === "null" || sessName === null) {
    name = "";
} else {
    name = window.sessionStorage.getItem("name");
}
var sessNumber = window.sessionStorage.getItem("phoneNumber");
if (sessNumber === "null" || sessNumber === null) {
    phoneNumber = "";
} else {
    phoneNumber = window.sessionStorage.getItem("phoneNumber");
}
var sessPage = window.sessionStorage.getItem("page");
if (sessPage === "null" || sessPage === null) {
    currentPage = 1;
} else {
    currentPage = window.sessionStorage.getItem("page");
}
//我的权限数组
var arrayTitle = new Array;
loadMyEssay(limitPayTime,name,phoneNumber);


function loadMyEssay(limitPayTime,name,phoneNumber){
	$(document).ready(function() {
		findMyCatalogue();
		init(currentPage);
	});
}
function init(pageNo) {
		window.sessionStorage.setItem("limitPayTime",limitPayTime);
		document.getElementById("applyTime").value = limitPayTime;
		window.sessionStorage.setItem("name",name);
    	document.getElementById("userName").value = name;
		window.sessionStorage.setItem("phoneNumber",phoneNumber);
    	document.getElementById("phoneNumber").value = phoneNumber;
		window.sessionStorage.setItem("page",pageNo);
		$("#thislist").html("");
		$.ajax({
			url: urlcore + "/api/loanOrder/userSelectLoanOrder?limitPayTime=" + limitPayTime + "&name=" + name + "&phone=" + phoneNumber+ "&currentPage=" + pageNo+"&status=3",
			type: "get",
			async:'false',
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
        	if(data.success == true) {
					$.each(data.data.pageDto.list, function(i, n) {				    
						var id = n.id;
						var disabled = "";
						var dd ="";
					    if(n.pressMoneyMan == null && n.pressCharge == null){
					    	dd="待分配";
					    }else if(n.pressMoneyMan != null){
					    	dd="已分配";
					    	disabled ="disabled";
					    }else{
					    	dd="可分配";
					    }
					    var backHtml = "";
						if($.trim(n.pressCharge) != ''){
							backHtml ='<a hidden="hidden" class="" name="退回" href="javascript:;" onclick="reback('+n.id+')">退回</a>&nbsp;';
						}
						var thislist =
							'<tr class="footable-even" style="display: table-row;">' +
							'<td class="footable-visible"><input type="checkbox" '+disabled+' value="'+n.id+'" name="selectcheck" /></th>'+
							'<td class="footable-visible">' + n.id + '</td>' +
							'<td class="footable-visible">' + n.lianPayNum + '</td>' +
							'<td class="footable-visible">' + n.user.userName + '</td>' +
							'<td class="footable-visible">' + n.user.phone + '</td>' +
							'<td class="footable-visible">' + n.limitDays + '</td>' +
							'<td class="footable-visible">' + n.borrowMoney + '</td>' +
							'<td class="footable-visible">' + n.realMoney + '</td>' +
							'<td class="footable-visible">' + n.needPayMoney + '</td>' +
							'<td class="footable-visible">' + n.giveTime + '</td>' +
							'<td class="footable-visible">' + n.limitPayTime+ '</td>' +
							'<td class="footable-visible">' + dd+ '</td>' +
							'<td class="footable-visible">' + common.showTextFormatter(n.pressMoneyManName)+ '</td>' +
							'<td class="footable-visible footable-last-column">'+
								backHtml+
								'<a hidden="hidden" class="" name="查看认证信息" href="tab.html?id='+n.userId+'&userName='+escape(n.user.userName)+'&phone='+n.user.phone+ '&orderId=' +n.id +'" >查看认证信息</a>&nbsp;'+
								'<a hidden="hidden" class="" name="详情" href="normal_topay_list_detail.html?id='+n.id+'" >详情</a>&nbsp;'+
								'<a hidden="hidden" class="" name="记录" href="javascript:;" data-toggle="modal" data-target="#addRecord" onclick="addRecord('+id+')">记录</a>&nbsp;'+
								'<a hidden="hidden" class="" name="结清"  href="javascript:;" data-toggle="modal" data-target="#jieQing" onclick="over(' + id + ')">结清</a>&nbsp;'+
                            	// '<a hidden="hidden" class="" name="续期"  href="javascript:;"  onclick="continueDate(' + id + ')">续期七天</a>&nbsp;'+
							 	'<a hidden="hidden" class="" name="续期" href="javascript:;" data-toggle="modal" data-target="#xuqiOrder" onclick="xuqi(' + id + ')">续期</a></td>'+
							'</tr>';
						$('#thislist').append(thislist);
						
					});
					$.each(arrayTitle, function(i,k) {
						$('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
					});
					$('#totalMoney').text(data.data.borrowMoney);
					$('#totalPeople').text(data.data.pageDto.total);
					$("#pager").pager({
						pagenumber: pageNo,
						pagecount: data.data.pageDto.pages,
						totalcount: data.data.pageDto.total,
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
//	续期七天
function continueDate(id){
    if($.trim(id) == ''){
        alert("订单id为空");
        return ;
    }
    if(confirm("您确定要续期七天吗？")) {
        $.ajax({
            url: urlcore + "/api/user/xuqiOrder?id=" + id,
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                if(data.success == true) {
                    alert(data.msg);
                    location.reload();
                }
            },
            error: function() {
                alert("error");
                location.reload();
            }
        });
    }
}
function EnterSearchList() {
	var code = event.keyCode;
	if(code == 13) {
		searchList();
	}
}
function searchList() {
    currentPage = 1;
	phoneNumber = $('#phoneNumber').val();
	name = $('#userName').val();
	limitPayTime = $('#applyTime').val();
	loadMyEssay(limitPayTime, name, phoneNumber);
	//countPeopleMoney(time, userName, phoneNumber);
}
 


function sendMessage(id) {
	
		$.ajax({
			url: urlcore + "/api/loanOrder/sendMenssage?id=" + id,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
		     success: function(data) {
		     	
		     	alert("发送成功");
		     	
		     	
//				if(data.success == true) {
//					var da = data.data;
//
//					
//					$('#content').html(da.content);
				
				
			},
		
			error: function() {
				/* Act on the event */
				alert("error");
			}
		});
	
    
}


function countPeopleMoney(limitPayTime,name, phoneNumber) {
	$.ajax({
		url: urlcore + "/api/loanOrder/countPeopleMoney9?limitPayTime=" + limitPayTime + "&name=" + name + "&phoneNumber=" + phoneNumber,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success: function(data) {
			if(data.success == true) {

				$('#totalMoney').text(data.data.totalMoney);
				$('#totalPeople').text(data.data.totalPeople);

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

//
function xuqi(id) {
	$('#thisId').html(id);
}
// 续期一天
function xuqiSend() {
	var id = $('#thisId').html();
	// var days = $('#days').val();
    var days = $('#days').val();
    var money= $('#money').val();
    var money1 = $("#money1").val();
	if(confirm("您确定续期吗？")) {
		$.ajax({
			url: urlcore + "/api/user/xuqiOrder?id=" + id + "&days=" + days + "&money=" + money + "&overMoney=" + money1,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				alert(data.msg);
				location.reload()
			},
			error: function() {
				/* Act on the event */
				console.log(data.msg);
				alert(data.msg);
			}
		});
	}
}
function over(id) {
    $('#thisId2').html(id);
}
function settle() {
    var id = $('#thisId2').html();
    var money= $('#money2').val();
    var money1 = $("#money3").val();
    if(confirm("您确定结清此订单吗？")) {
    	$.ajax({
    		url: urlcore + "/api/user/repayOrder?id=" + id + "&money=" + money + "&overMoney=" + money1,
    		type: "get",
    		dataType: 'json',
    		contentType: "application/json;charset=utf-8",
    		success: function(data) {
    			alert(data.msg);
    			location.reload()
    		},
    		error: function() {
    			/* Act on the event */
    			console.log(data.msg);
    			alert(data.msg);
    		}
    	});
    }
}

var orderids=[]
//分配全选
function checkboxall(e,ordername,type){
	ordername="."+ordername;
	if($(e).prop("checked")){
		$(ordername).prop("checked",true)
				$(ordername).each(function(i,n){
				orderids.push($(this).attr('orderid'))
				})
		}else{
			$(ordername).removeAttr("checked",false)
					$(ordername).each(function(i,n){
						var _this=this
						orderids.map(function(k,j){
							if($(_this).attr('orderid')==k){
								orderids.splice(j,1)
								return 
							}
						})	
					})
		} 
	
}
//取消选择
function hidecheck(e,type){
	if($(e).prop('checked')){
		$(e).prop("checked",true);
			var orderid=$(e).attr('orderid')
			orderids.push(orderid)
	}else{
		$(e).removeAttr("checked",false);
		var orderid=$(e).attr('orderid')
		orderids.map(function(n,i){
			if(orderid==n){
				orderids.splice(i,1)
				return 
			}
		})
	}
}
//提交分配数据 
function sendcheckadd(){
	var fenpeiid=$('#fenpeilist').val()
	if(!fenpeiid){
		boot.alert({message:"请选择分配人员"})
		return 
	}
	if(orderids.length>=userids.length){
		var orderstr=orderids.join(",")
		boot.confirm({message:"确定这样分配吗？"}).on(function(e){
			$.ajax({
				url: urlcore + "/api/loanOrder/setUpPressMoneyMan",
				type: "get",
				dataType: 'json',
				data:{
					orderIds:orderstr,
					userId:fenpeiid
				},
				contentType: "application/json;charset=utf-8",
				success:function(data){
				   if(data.msg=="成功"){
					   $('.checkall').prop("checked",false)
					   init(1)
					   orderids=[]
					   boot.alert({message:"分配成功"})
				   }else{
					boot.alert({message:data.msg})
				   }	
					
				},
				error:function(data){
					boot.alert({message:data.msg})
				}
			})
		})
	}else{
		boot.alert({message:"客户数量不能小于分配人员数量"})
	}
	
}
//显示分配人员分页 
function showfenpei(){
	$("#fenpeilist").html("")
	$('.userall').prop("checked",false)
	userids=[]
	if(orderids.length>0){
		$("#checkall").modal()
		$.ajax({
		url: urlcore + "/api/loanOrder/selectAllPressMoneyMan",
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		 success: function(data) {
			if(data.success == true) {
				var thislist='<option value="">请选择催款员</option>';
                $.each(data.data, function(i,n) {
                    thislist = thislist +
                        '<option value="'+n.id+'">'+n.userName+'</option>';
                });
			}
			$("#fenpeilist").html(thislist)
		},
		error: function() {
			/* Act on the event */
			alert("error");
		}
	});
	}	
}

function exportList() {
    phoneNumber = $('#phoneNumber').val();
    name = $('#userName').val();
    limitPayTime = $('#applyTime').val();
	location.href = urlcore + "/api/loanOrder/ef?limitPayTime="+limitPayTime+"&name="+name+"&phone="+phoneNumber+"&status=3"
}

function fenpei2(id){
    orderId = id;
    $.ajax({
        url: urlcore + "/api/loanOrder/selectAllPressMoneyMan",
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            if(data.success == true) {
                var thislist='<option value="">请选择催收员</option>';
                $.each(data.data, function(i,n) {

                    thislist = thislist +
                        '<option value="'+n.id+'">'+n.userName+'</option>';

                });
                $("#jsfenPeiSelect").html(thislist);
            }
        },
        error: function() {
            /* Act on the event */
            alert("error");
        }
    });
}
function fenpeiqueren2(){
    var userId = $("#jsfenPeiSelect").val();
    if($.trim(userId) == ''){
        alert("请选择人员");
        return;
    }
    var checks = $('input[name=selectcheck]:checked');
    if(checks.length < 1){
        alert("请选择记录");
        return;
    }
    var orderIds ='';
    $.each(checks,function(i,elem){
        if($(elem).is(':checked')){
            orderIds +=$(elem).val()+",";
        }
    });
    orderIds = orderIds.slice(0,orderIds.length-1);
    $.ajax({
        url: urlcore + "/api/loanOrder/setUpPressMoneyMan?orderIds="+orderIds+"&userId="+userId,
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            location.reload()
        },
        error: function() {
            location.reload()
        }
    });
}
function selectAll(o){
    var checks = $("input[name=selectcheck]").not(":disabled");
	if(checks.length > 0){
		$.each(checks,function(i,elem){
			$(elem).prop('checked',o.checked);
		});
	}
}
/**
 * 退回
 * @param {} orderId
 */
function reback(orderId){
	if(confirm("您确定退回吗？")) {
		$.ajax({
			url: urlcore + "/api/loanOrder/reback?orderId=" + orderId,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				alert(data.msg);
				location.reload()
			},
			error: function() {
				/* Act on the event */
				console.log(data.msg);
				alert(data.msg);
			}
		});
	}
}
function addRecord(id){
	$("#content1").val("");
	textId = id;
	$.ajax({
		url: urlcore + "/api/loanOrder/selectJiLu?id=" + id,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
	     success: function(data) {
			if(data.success == true) {
				var thislist="";
				$.each(data.data, function(i,n) {
					
					thislist = thislist + 
						'<span>'+n.createTime+":&nbsp;&nbsp;&nbsp;&nbsp;"+n.text+'</span><br/>';
					
				});
				$("#recordold").html(thislist);
			}
		},
		error: function() {
			/* Act on the event */
			alert("error");
		}
	});
}
function jilubaocun(){
	var text1 = $("#content1").val();
	$.ajax({
			url: urlcore + "/api/loanOrder/jilubaocun?orderId=" + textId + "&text=" + text1,
			type: "get",
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
		     success: function(data) {
				if(data.success == true) {
					alert("保存成功");
				}
			},
			error: function() {
				/* Act on the event */
				alert("error");
			}
		});
}