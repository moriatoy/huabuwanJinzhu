$(document).ready(function () {
	//初始化文件输入框
    initFileInput("messUrl", urlcore + "/api/attachment/upload","#messUrlUrl");
	
	var id = getvl("id");
    if (id != '') {
        $.ajax({
            url: urlcore + "/api/bankCard/selectOne?id="+id,
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
                    $('#limitMoney').val(da.limitMoney);
                    $('#freeDays').val(da.freeDays);
                   	$('#sendPlace').val(da.sendPlace);
                   	$('#title').val(da.title);
                    $('#secondTitle').val(da.secondTitle);
                    $('#evaluateLevel').val(da.evaluateLevel);
                   	$('#linkUrl').val(da.linkUrl);
                   	$('#bankName').val(da.bankName);
                   	
                    $('#maincardMoney').val(da.importantMsg.maincardMoney);
                    $('#othercardMoney').val(da.importantMsg.othercardMoney);
                   	$('#freeInfo').val(da.importantMsg.freeInfo);
                   	$('#dayMoney').val(da.importantMsg.dayMoney);
                    $('#valiType').val(da.importantMsg.valiType);
                    $('#backMoney').val(da.importantMsg.backMoney);
                   	$('#changecardMoney').val(da.importantMsg.changecardMoney);
                    $('#losscardMoney').val(da.importantMsg.losscardMoney);
                    $('#getmoney_one').val(da.importantMsg.getmoneyOne);
                    $('#getmoney_two').val(da.importantMsg.getmoneyTwo);
                    $('#getmoney_three').val(da.importantMsg.getmoneyThree);
                    $('#getmoney_four').val(da.importantMsg.getmoneyFour);
                    $('#getmoney_five').val(da.importantMsg.getmoneyFive);
                    $('#getmoney_six').val(da.importantMsg.getmoneySix);
                    $('#limitPaymoney').val(da.importantMsg.limitPaymoney);
                    
                    $('#planpay_Type').val(da.planpayMsg.type);
                   	$('#minMoney').val(da.planpayMsg.minMoney);
                    $('#repayMsg').val(da.planpayMsg.repayMsg);
                    $('#handmoneyType').val(da.planpayMsg.handmoneyType);
                    $('#handMoney').val(da.planpayMsg.handMoney);
                    
                   	$('#point_type').val(da.pointMsg.type);
                    $('#point_limitTime').val(da.pointMsg.limitTime);
                    
                    $('#importantMsgId').val(da.importantMsg.id);
                    $('#planpayMsgId').val(da.planpayMsg.id);
                    $('#pointMsgId').val(da.pointMsg.id);
                    
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
	var title = $('#title').val();
	var secondTitle = $('#secondTitle').val();
	var limitMoney = $('#limitMoney').val();
	var freeDays = $('#freeDays').val();
	var sendPlace = $('#sendPlace').val();
	var evaluateLevel = $('#evaluateLevel').val();
	var linkUrl = $('#linkUrl').val();
	
	var maincardMoney=$('#maincardMoney').val();
	var othercardMoney=$('#othercardMoney').val();
	var freeInfo = $('#freeInfo').val();
	var dayMoney = $('#dayMoney').val();
	var valiType = $('#valiType').val();
	var backMoney = $('#backMoney').val();
	var changecardMoney = $('#changecardMoney').val();
	var losscardMoney = $('#losscardMoney').val();
	var getmoney_one = $('#getmoney_one').val();
	var getmoney_two=$('#getmoney_two').val();
	var getmoney_three=$('#getmoney_three').val();
	var getmoney_four = $('#getmoney_four').val();
	var getmoney_five = $('#getmoney_five').val();
	var getmoney_six = $('#getmoney_six').val();
	var limitPaymoney = $('#limitPaymoney').val();
	
	var planpay_Type = $('#planpay_Type').val();
	var minMoney = $('#minMoney').val();
	var repayMsg = $('#repayMsg').val();
	var handmoneyType=$('#handmoneyType').val();
	var handMoney=$('#handMoney').val();
	
	var point_type = $('#point_type').val();
	var point_limitTime = $('#point_limitTime').val();
	
	var importantMsgId = $('#importantMsgId').val();
	var planpayMsgId=$('#planpayMsgId').val();
	var pointMsgId=$('#pointMsgId').val();

	//照片地址
	var messUrlUrl = "";
    $("#messUrlUrl img").each(function(index,item){
		messUrlUrl += $(this).attr("src")+"***";
	});
    messUrlUrl = messUrlUrl.substring(0, messUrlUrl.length-3);
    $.ajax({
        url:  urlcore + "/api/bankCard/add",
       		type: "post",
	       	data: JSON.stringify({
	            "id": id,
	            "bankName": bankName,
	            "title": title,
	            "secondTitle": secondTitle,
	            "limitMoney": limitMoney,
	           	"freeDays": freeDays,
	            "sendPlace": sendPlace,
	          	"evaluateLevel": evaluateLevel,
	            "linkUrl": linkUrl,
	            "imgUrl": messUrlUrl,            
	            "importantMsg":{
	            	"id": importantMsgId,
		            "maincardMoney": maincardMoney,
		            "othercardMoney": othercardMoney,
		            "freeInfo": freeInfo,
		           	"dayMoney": dayMoney,
		            "valiType": valiType,
		          	"backMoney": backMoney,
		            "changecardMoney": changecardMoney,
		            "losscardMoney": losscardMoney,
		            "getmoneyOne": getmoney_one,
		            "getmoneyTwo": getmoney_two,
		            "getmoneyThree": getmoney_three,
		           	"getmoneyFour": getmoney_four,
		            "getmoneyFive": getmoney_five,
		          	"getmoneySix": getmoney_six,
		            "limitPaymoney": limitPaymoney
	            },
	            "planpayMsg":{
	            	"id": planpayMsgId,
	          		"type": planpay_Type,
		            "minMoney": minMoney,
		            "repayMsg": repayMsg,
		           	"handmoneyType": handmoneyType,
		            "handMoney": handMoney
	            },
	           	"pointMsg":{
	           		"id": pointMsgId,
	          		"type": point_type,
		            "limitTime": point_limitTime
	            }
	        }),
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success:function(data){
                if (data.success == true) {
	                if (id != null) {
	                    alert('修改成功');
	                    window.location.href = "bank_card_list.html";
	                }else{
	                    if (confirm("添加成功，是否继续添加？")) {
	                        //刷新
	                        location.reload();
	                    } else {
	                        //跳转列表页
	                        window.location.href = "bank_card_list.html";
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


