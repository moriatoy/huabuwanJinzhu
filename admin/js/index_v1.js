*
	allWateMoney();
	
$(document).ready(function () {

	$.ajax({
        url:  urlcore + "/api/cashRecord/sum",
        type: "get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success:function(data){
            if (data.success == true) {
				$('#allSum').html(data.data[0].allSum);
				$('#allSumByMonth').html(data.data[1].allSumByMonth);
				$('#allSumByDay').html(data.data[2].allSumByDay);
				$('#ordersSum').html(data.data[3].ordersSum);
				$('#ordersSumByMonth').html(data.data[4].ordersSumByMonth);
				$('#ordersSumByDay').html(data.data[5].ordersSumByDay);
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
    echart();
    //下拉框
    sumType();
    timeType();			
});

function echart(){
	var sumType=$("#sumType").val();
	var timeType=$("#timeType").val();
	//拿到总额数据
	var da='';
	$.ajax({
        url:  urlcore + "/api/cashRecord/barSum?sumType="+sumType+"&timeType="+timeType,
        type: "get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success:function(data){
            if (data.success == true) {
             da=data.data;
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
    
    var x="",y="";
    if(timeType==1){
    	 x = [GetDateStr(-6),GetDateStr(-5),GetDateStr(-4),GetDateStr(-3),GetDateStr(-2),GetDateStr(-1),GetDateStr(0)];
    	 y=[da[6].sum,da[5].sum,da[4].sum,da[3].sum,da[2].sum,da[1].sum,da[0].sum]
    }
	if(timeType==2){
		x=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
		y=[da[0].sum,da[1].sum,da[2].sum,da[3].sum,da[4].sum,da[5].sum,da[6].sum,da[7].sum,da[8].sum,da[9].sum,da[10].sum,da[11].sum];
	}
	if(timeType==3){
		x=['1季度','2季度','3季度','4季度'];
		y=[da[0].sum,da[1].sum,da[2].sum,da[3].sum];
	}
	if(timeType==4){
		x=[GetYearStr(-4),GetYearStr(-3),GetYearStr(-2),GetYearStr(-1),GetYearStr(0)];
		y=[da[4].sum,da[3].sum,da[2].sum,da[1].sum,da[0].sum];
	}
    // 路径配置
    require.config({
        paths: {
            echarts: 'http://echarts.baidu.com/build/dist'
        }
    });
    
    // 使用
    require(
        [
            'echarts',
            'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
        ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('main')); 
            
            var option = {
                tooltip: {
                    show: true
                },
                legend: {
                    data:['']
                },
                xAxis : [
                    {
                        type : 'category',
                        data : x
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        "name":"数量",
                        "type":"bar",
                        "data":y
                    }
                ]
            };
    
            // 为echarts对象加载数据 
            myChart.setOption(option); 
        }
    );
}

//获取最近一周日期
function GetDateStr(AddDayCount) { 
	var dd = new Date(); 
	dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
	var y = dd.getFullYear(); 
	var m = dd.getMonth()+1;//获取当前月份的日期 
	var d = dd.getDate(); 
	return y+"-"+m+"-"+d; 
} 

//获取最近五年
function GetYearStr(AddDayCount) { 
	var dd = new Date(); 
	dd.setFullYear(dd.getFullYear()+AddDayCount);//获取AddDayCount天后的日期 
	var y = dd.getFullYear(); 
	return y; 
} 

//下拉框
function sumType(){
    $("#sumType").change(function () {
   		echart();
	});
}

function timeType(){
    $("#timeType").change(function () {
   		echart();
	});
}

function allWateMoney(){
	alert(1);
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


