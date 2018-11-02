 $(function(){ 
 	//时间插件初始化
	$('.datepicker').datepicker({
		language: 'zh-CN'
	});
 init();
});
	 
//默认加载  
function init(){
	//获取信息列表
	
	var gmtDatetime =$('#gmtDatetime').val();
	$.ajax({ 
		url: urlcore + "/api/index/channelCount?gmtDatetime="+gmtDatetime,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success:function(data){
			if (data.success == true) {
				$('#channelCount1').text(data.data.channelCount1 == null ? 0 : data.data.channelCount1);
				$('#memberCount').text(data.data.channelCount5 == null ? 0 : data.data.channelCount5);
				$('#orderCount').text(data.data.channelCount6 == null ? 0 : data.data.channelCount6)				
			} else if (data.code == 'OVERTIME'){
				var thisUrl = window.location.href;
				if (thisUrl.indexOf('channelLogin.html') <= -1) {
					top.window.location.href="channelLogin.html";
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
/*//回调函数  
PageClick = function(pageclickednumber) {  
    init(pageclickednumber); 
}

function init1(){
	
	var year = $('#year').val();
	
	//获取信息列表
	$.ajax({ 
		url: urlcore + "/api/channel/findMoneyStatistics?year="+year,
		type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		async: false,
		success:function(data){
			if (data.success == true) {
				
			var outMoneys = data.data.outMoneys;
			var backMoneys = data.data.backMoneys;
			var profits = data.data.profits;
			var first = outMoneys[0];
			var second = outMoneys[1];
			var third = outMoneys[2];
			var fourth = outMoneys[3];
			var fifth = outMoneys[4];
			var sixth = outMoneys[5];
			var seventh = outMoneys[6];
			var eighth = outMoneys[7];
			var ninth = outMoneys[8];
			var tenth = outMoneys[9];
			var eleven = outMoneys[10];
			var twelve = outMoneys[11];
			
			var firsts = backMoneys[0];
			var seconds = backMoneys[1];
			var thirds = backMoneys[2];
			var fourths = backMoneys[3];
			var fifths = backMoneys[4];
			var sixths = backMoneys[5];
			var sevenths = backMoneys[6];
			var eighths = backMoneys[7];
			var ninths = backMoneys[8];
			var tenths = backMoneys[9];
			var elevens = backMoneys[10];
			var twelves = backMoneys[11];
			
			var firstp = profits[0];
			var secondp = profits[1];
			var thirdp = profits[2];
			var fourthp = profits[3];
			var fifthp = profits[4];
			var sixthp = profits[5];
			var seventhp = profits[6];
			var eighthp = profits[7];
			var ninthp = profits[8];
			var tenthp = profits[9];
			var elevenp = profits[10];
			var twelvep = profits[11];
			
			
			var myChart = echarts.init(document.getElementById('main'));
			// 指定图表的配置项和数据
		    option = {
		        tooltip : {
		            trigger: 'axis',
		            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		            }
		        }, 
		        legend: {
		            data:['月度申请额','月度放款额','月度分成利润']
		        },
		        grid: {
		            left: '3%',
		            right: '4%',
		            bottom: '3%',
		            containLabel: true
		        },
		        xAxis : [
		            {
		                type : 'category',
		                data : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
		            }
		        ],
		        yAxis : [
		            {
		                type : 'value',
//		                name:'万'
		            }
		        ],
		        series : [
		            {
		                name:'月度申请额',
		                type:'bar',
				       data:[first,second,third,fourth,fifth,sixth,seventh,eighth,ninth,tenth,eleven,twelve]
		            },
		            {
		                name:'月度放款额',
		                type:'bar',
				        data:[firsts,seconds,thirds,fourths,fifths,sixths,sevenths,eighths,ninths,tenths,elevens,twelves]
		            },
		            {
		                name:'月度分成利润',
		                type:'bar',
				        data:[firstp,secondp,thirdp,fourthp,fifthp,sixthp,seventhp,eighthp,ninthp,tenthp,elevenp,twelvep]
		            }
		        ]
		    };
		
		    // 使用刚指定的配置项和数据显示图表。
		    myChart.setOption(option);
				
				
			} else if (data.code == 'OVERTIME'){
				var thisUrl = window.location.href;
				if (thisUrl.indexOf('channelLogin.html') <= -1) {
					top.window.location.href="channelLogin.html";
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
*/
