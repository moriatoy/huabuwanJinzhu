var id='';
id=getvl("id")

loadMyEssay(id);

function loadMyEssay(id) {
		
		$.ajax({
			url: urlcore + "/api/loanOrder/selectOneDetail?id=" + id,
			type: "get",
		
			dataType: 'json',
			contentType: "application/json;charset=utf-8",
			success: function(data) {
				if(data.success == true) {
					var da = data.data;
                    
					$('#id').html(da.id);
					$('#userName').html(da.user.userName);
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
					
					$('#saveMoney').html(da.saveMoney);
					
                    $('#allowDays').html(da.allowDays);
					if(data.admin!=null){
					$('#auditorName').html(da.admin.userName);
					}
					document.getElementById("btn1").href =imgPath+da.agreementUrl;
					document.getElementById("btn2").href =imgPath+da.agreementTwoUrl;

				}

			},
			error: function() {
				/* Act on the event */
				alert("error");
			}
		});

}