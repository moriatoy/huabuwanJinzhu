var id='';
id=getvl("id");
var userId = '';
var jName = getCookie('Jname');
var arrayTitle = new Array;

window.onload = function(){
    loadMyEssay(id);
    order(id);
    handle(id);
};

// 返回
function callBack(){
	window.history.go(-1);
}

// 续期订单
function xuqiSend() {
    var days = $('#days').val();
    var money= $('#money').val();
    var money1 = $("#money1").val();
    if(confirm("您确定续期吗？")) {
        $.ajax({
            url: urlcore + "/api/user/xuqiOrder?id=" + id + "&days=" + days+ "&money=" + money + "&overMoney=" + money1,
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                alert(data.msg);
                window.history.go(-1);
            },
            error: function() {
                /* Act on the event */
                alert(data.msg);
            }
        });
    }
}

// 结清订单
function over() {
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
                window.history.go(-1);
            },
            error: function() {
                /* Act on the event */
                alert(data.msg);
            }
        });
    }
}

// 个人信息
function loadMyEssay(id) {
	$.ajax({
		url: urlcore + "/api/loanOrder/selectOneDetail?id=" + id,
		type: "get",

		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success: function(data) {
		    console.log(data)
			if(data.success == true) {
				var da = data.data;
				$('#id').html(da.id);
				console.log($('#userName'))
				$('#userName').text(da.user.userName);
				$('#phoneNumber').html(da.user.phone);
				$('#orderNumber').html(da.lianPayNum);
				$('#bankName').html(da.bankName);
				$('#bankCardNum').html(da.bankCardNum);
				$('#limitDays').html(da.limitDays);
				$('#borrowMoney').html(da.borrowMoney);
				$('#realMoney').html(da.realMoney);
				$('#interestMoney').html(da.interestMoney);
				$('#placeServePercent').html(da.placeServeMoney);
				$('#msgAuthPercent').html(da.msgAuthMoney);
				$('#riskServePercent').html(da.riskServeMoney);
				$('#riskPlanPercent').html(da.riskPlanMoney);
				$('#wateMoney').html(da.wateMoney);
				$('#saveMoney').html(da.saveMoney);
				$('#needPayMoney').html(da.needPayMoney);

				$('#gmtDatetime').html(da.gmtDatetime);
				$('#passTime').html(da.passTime);
				$('#giveTime').html(da.giveTime);
				$('#limitPayTime').html(da.limitPayTime);

				$('#overDueTime').html(da.overdueTime);
				$('#overDueDays').html(da.overdueDays);
				$('#overDueMoney').html(da.overdueMoney);
				$('#allowDays').html(da.allowDays);
				$('#allowMoney').html(da.allowMoney);

                userId= da.userId;
                mailList(da.userId);

                $.each(arrayTitle, function(i,k) {
                    if (k === "保存") {
                        $('div[name="'+k+'"]').attr("hidden",false);
                    } else {
                        $('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-sm btn-primary");
                    }
                });
				// $('#auditorName').html(da.admin.userName);

			   // document.getElementById("btn1").href = imgPath+da.agreementUrl;
				// document.getElementById("btn2").href = imgPath+da.agreementTwoUrl;

			}

		},
		error: function() {
			/* Act on the event */
			alert("error");
		}
	});
}
// 通讯录
function mailList(id) {
    var innerHeight = window.innerHeight;
    $(".mailList").height(innerHeight - 209 );
    $("#btn2").css("background","#fff");
    $("#btn1").css("background","#dee5e7");
    $.ajax({
        url: urlcore + "/api/userPhoneList/findByUserPage?userId="+id+"&pageNo=1&pageSize=100000",
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            if (data.success === true) {
                $.each(data.data.list, function(i, n) {
                    var thislist =
                        '<tr class="footable-even" style="display: table-row;">' +
                        '<td class="footable-visible">'+ n.name +'</td>' +
                        '<td class="footable-visible">' + n.phone + '</td>' +
                        '</tr>';
                    $('#mailList').append(thislist);
                });
                if (data.code == 'OVERTIME') {
                    var thisUrl = window.location.href;
                    if (thisUrl.indexOf('login.html') <= -1) {
                        top.window.location.href = "login.html";
                    }
                } else {
                    if (data.msg != '空数据') {
                        // alert(data.msg)
                    } else {
                        // $('#thiscount').text(0);
                    }
                }
            }
        },
        error: function() {
            /* Act on the event */
            alert("error");
        }
    });
}

// 订单记录
function order(id) {
    $.ajax({
        url: urlcore + "/api/loanOrder/getLoanOrderChangeList?id=" + id,
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            if(data.success == true) {
                $("#orderlist").html("");
                $.each(data.data, function(i, n) {
                    var thislist =
                        '<tr class="footable-even" style="display: table-row;">' +
                            '<td class="footable-visible">'+ n.oprTime +'</td>' +
                            '<td class="footable-visible">' + n.changeName + '</td>' +
                            '<td class="footable-visible">' + n.recordDays + '</td>' +
                            '<td class="footable-visible">' + n.realMoney + '</td>' +
                        '</tr>';
                    $('#orderlist').append(thislist);
                });
                if (data.code == 'OVERTIME') {
                    var thisUrl = window.location.href;
                    if (thisUrl.indexOf('login.html') <= -1) {
                        top.window.location.href = "login.html";
                    }
                } else {
                    if (data.msg != '空数据') {
                        // alert(data.msg)
                    } else {
                        // $('#thiscount').text(0);
                    }
                }
            }
        },
        error: function() {
            /* Act on the event */
            alert("error");
        }
    });
}

// 权限
findMyCatalogue();
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

// 催收处理记录
function handle(id) {
    $.ajax({
        url: urlcore + "//api/loanOrder/getLoanOrderPhoneList?id=" + id,
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            if(data.success === true) {
                $("#collectionList").html("");
                $.each(data.data, function(i, n) {
                    var thislist =
                        '<tr class="footable-even" style="display: table-row;">' +
                        '<td class="footable-visible">'+ n.phoneTime +'</td>' +
                        '<td class="footable-visible">' + n.phoneNumber + '</td>' +
                        '<td class="footable-visible">' + n.phoneObj + '</td>' +
                        '<td class="footable-visible">' + n.phoneFinish + '</td>' +
                        '<td class="footable-visible">' + n.phoneContent + '</td>' +
                        '<td class="footable-visible">' + n.adminName + '</td>' +
                        '</tr>';
                    $('#collectionList').append(thislist);
                });
                if (data.code == 'OVERTIME') {
                    var thisUrl = window.location.href;
                    if (thisUrl.indexOf('login.html') <= -1) {
                        top.window.location.href = "login.html";
                    }
                } else {
                    if (data.msg != '空数据') {
                        // alert(data.msg)
                    } else {
                        // $('#thiscount').text(0);
                    }
                }
            }

        },
        error: function() {
            /* Act on the event */
            alert("error");
        }
    });
}
// 切换按钮
function changeBtn(item) {
	if (item === 1) {
        $("#btn2").css("background","#fff");
        $("#btn1").css("background","#dee5e7");
        $(".mailList").css("display","none");
        $(".personal").css("display","block");
	} else {
        $("#btn1").css("background","#fff");
        $("#btn2").css("background","#dee5e7");
        $(".mailList").css("display","block");
        $(".personal").css("display","none");
	}
}

// 催收保存
function collection(id) {
	var telephone = $("#telephone").val();
	var dateTime = $("#dateTime").val();
	var phoneObj = $("#object").val();
	var phoneFinish = $("#result").val();
	if (telephone === "") {
		alert("手机号为空");
	} else if (telephone.search(/^1[34578]\d{9}$/)) {
        alert("请填写正确的手机号");
	} else if (dateTime === "") {
        alert("请选择下次跟进时间");
	} else if (phoneObj === "") {
        alert("请选择催款对象");
    } else if (phoneFinish === "") {
        alert("请选择催款结果");
	}else {
        var data = {
            userId: userId,
            loanOrderId: Number(id),
            phoneNumber: telephone,
            phoneNext: dateTime,
            phoneObj: phoneObj,
            phoneFinish: phoneFinish,
            phoneContent: $("#content").val()
        };
        $.ajax({
            url: urlcore + "/api/loanOrder/setLoanOrderPhone",
            type: "get",
            data: data,
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                handle(id);
            },
            error: function() {
                /* Act on the event */
                alert("error");
            }
        });
	}

}

















