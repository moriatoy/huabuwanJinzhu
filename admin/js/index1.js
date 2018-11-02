$(document).ready(function() {
	addYears();
	allWateMoney();
	init();
    yuQiBtn();
});
	 
//默认加载  
function init(){
	//获取信息列表
	$.ajax({ 
		url: urlcore + "/api/index/statementSelect",
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success:function(data){
			if (data.success == true) {
				$('#userAddCount').text(data.data.userAddCount == null ? 0 : data.data.userAddCount);
                $('#userAllAddCount').text(data.data.userAllAddCount == null ? 0 : data.data.userAllAddCount);
				$('#moneyOutAll').text(data.data.moneyOutAll == null ? 0 : data.data.moneyOutAll);
				$('#moneyBackAll').text(data.data.moneyBackAll == null ? 0 : data.data.moneyBackAll);
				$('#orderPassUserCount').text(data.data.orderPassUserCount == null ? 0 : data.data.orderPassUserCount);
				$('#overduePer1st').text(data.data.overduePer1st== null ? 0 : data.data.overduePer1st);
				$('#allCount').text(data.data.personRecord.allCount);
				$('#outOrderCount').text(data.data.personRecord.outOrderCount)
				$('#badOrderCount').text(data.data.personRecord.badOrderCount)
				$('#overOrderCount').text(data.data.personRecord.overOrderCount)
				$('#blackCount').text(data.data.personRecord.blackCount)
				$('#outMoney').text(data.data.personRecord.outMoney)
				$('#memberCount').text(data.data.personRecord.memberCount)
				init1();
				
			} else if (data.code == 'OVERTIME'){
				var thisUrl = window.location.href;
				if (thisUrl.indexOf('login.html') <= -1) {
					top.window.location.href="login.html";
				}

			} else {
				if (data.msg != '空数据') {
					alert(data.msg)
				}else{
					$('#thiscount').text(0);
				}
			}

		},
		error:function() {
			alert("error");
		}
	});
    //获取信息列表2
    $.ajax({
        url: urlcore + "/api/index/partner/statementSelect",
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success:function(data){
            if (data.success == true) {
				$("#totalLoan").text(dataFun(data.data.totalLoan));
				$("#daiShou").text(dataFun(data.data.daiShou));
				$("#shiShou").text(dataFun(data.data.shiShou));
				$("#todayDaiShou").text(dataFun(data.data.todayDaiShou));
				$("#threeDayDaiShou").text(dataFun(data.data.threeDayDaiShou));
				$("#overduThreeDay").text(dataFun(data.data.overduThreeDay));
				$("#overduSevenDay").text(dataFun(data.data.overduSevenDay));
				$("#overduFifteenDay").text(dataFun(data.data.overduFifteenDay));
				$("#overduOtherDay").text(dataFun(data.data.overduOtherDay));
            } else if (data.code == 'OVERTIME'){
                var thisUrl = window.location.href;
                if (thisUrl.indexOf('login.html') <= -1) {
                    top.window.location.href="login.html";
                }
            } else {
                if (data.msg != '空数据') {
                    alert(data.msg)
                }else{
                    $('#thiscount').text(0);
                }
            }
        },
        error:function() {
            alert("error");
        }
    });
}
//回调函数  
PageClick = function(pageclickednumber) {  
    init(pageclickednumber); 
}

function dataFun(data) {
	if (data) {
        return data;
	} else {
		return 0;
	}
}

function init1(){
	
	var year = $('#year').val();

}


//填充年份下拉
function addYears(){
	var myDate = new Date();
	year=myDate.getFullYear();
	var year1 = year -1;
	var year2 = year -2;
	var year3 = year -3;
	var year4 = year -4;
	var year5 = year -5;
	var html = "<option value='"+year+"'>"+year+"年</option>";
	html = html + "<option value='"+year1+"'>"+year1+"年</option>";
	html = html + "<option value='"+year2+"'>"+year2+"年</option>";
	html = html + "<option value='"+year3+"'>"+year3+"年</option>";
	html = html + "<option value='"+year4+"'>"+year4+"年</option>";
	html = html + "<option value='"+year5+"'>"+year5+"年</option>";

	$('#year').append(html);
}


function allWateMoney(){
	$.ajax({
        url:  urlcore + "/api/loanOrder/allWateMoney",
        type: "get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success:function(data){
            if (data.success == true) {
				$('#watetMoney').html(data.data);
				
            } else if (data.code == 'OVERTIME') {
                var thisUrl = window.location.href;
                if (thisUrl.indexOf('login.html') <= -1) {
                    top.window.location.href = "login.html";
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
// 新增订单首次逾期
function yuQiBtn() {
	// var overdue = $("#yuqiForm").val();
    // $.ajax({
     //    url:  urlcore + "/api/statement/overdue1stOnlyPrincipal?overduePer1st="+overdue,
     //    type: "get",
     //    contentType: "application/json;charset=utf-8",
     //    dataType: "json",
     //    success:function(data){
     //        if (data.success == true) {
    //
     //        } else if (data.code == 'OVERTIME') {
     //            var thisUrl = window.location.href;
     //            if (thisUrl.indexOf('login.html') <= -1) {
     //                top.window.location.href = "login.html";
     //            }
     //        } else {
     //            alert(data.msg);
     //        }
     //    },
     //    error: function() {
     //        alert("error");
     //    }
    // });
    $.ajax({
        url:  urlcore + "/api/statement/overdue1stOnlyPrincipal",
        type: "get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success:function(data){
            if (data.success == true) {
				$("#newOverduePer1st").text(data.data.overduePer1st == null ? 0 : data.data.overduePer1st);
            } else if (data.code == 'OVERTIME') {
                var thisUrl = window.location.href;
                if (thisUrl.indexOf('login.html') <= -1) {
                    top.window.location.href = "login.html";
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
