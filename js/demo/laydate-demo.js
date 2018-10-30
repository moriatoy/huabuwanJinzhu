$(document).ready(function () {
	//外部js调用
    laydate({
        elem: '#hello', //需显示日期的元素选择器
		event: 'focus', //触发事件
		format: 'YYYY-MM-DD hh:mm:ss', //日期格式
		istime: true, //是否开启时间选择
		isclear: true, //是否显示清空
		istoday: true, //是否显示今天
		issure: true, //是否显示确认
		festival: true, //是否显示节日
		min:'1900-01-01 00:00:00',//最小日期
		max:'2099-12-31 23:59:59',//最大日期
		start:laydate.now(),    //开始日期
		key:'2017-01-17 23:22:59'
		//choose: function(dates){} //选择好日期的回调
    });        
});