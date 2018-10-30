/**
 * add by wuqiang
 * @type {{showTextFormatter: common.showTextFormatter}}
 */
var common = {
	/**
	 * 把空的value转换成 '-' 输出
	 * @param {} value
	 * @return {String}
	 */
	showTextFormatter : function(value) {
		if ($.trim(value) == '') {
			return "-";
		}
		return value;
	},
	/**
	 * 把空的value转换成 '0' 输出
	 * @param {} value
	 */
	nullToZero : function(value) {
		if ($.trim(value) === '' || $.trim(value) === "NaN") {
			return '0';
		}
		return value;
	},
	/**
	 * 数组去重
	 * @param {} arr
	 * @return {}
	 */
	distinct : function(arr) {
		if(arr == null || arr.length < 1){
			return '';
		}
		var i;
		var j;
		var len = arr.length;
		for (i = 0; i < len; i++) {
			for (j = i + 1; j < len; j++) {
				if (arr[i] == arr[j]) {
					arr.splice(j, 1);
					len--;
					j--;
				}
			}
		}
		return arr;
	},
	date_init:function(id){
		// 初始化日期范围插件
		$('#'+id).daterangepicker({
			"showDropdowns": true,
			"autoApply": false,
			// "dateLimit": {
			//     "days": 365 * 100
			// },
			"linkedCalendars": false,
			"opens": 'right',
			"ranges": {
				"一周内": [
					moment().subtract(6, 'days'),
					moment()
				],
				"一月内": [
					moment().subtract(29, 'days'),
					moment()
				],
				"本月内": [
					moment().startOf('month'),
					moment().endOf('month')
				],
				"上个月": [
					moment().subtract(1, 'month').startOf('month'),
					moment().subtract(1, 'month').endOf('month')
				]
			},
			autoUpdateInput: false,
			locale: {
				format: 'YYYY-MM-DD',
				separator: ' - ',
				applyLabel: '确定',
				cancelLabel: '取消',
				fromLabel: '从',
				toLabel: '到',
				customRangeLabel: '日期范围',
				daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
				monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
				firstDay: 1
			},
			"minDate": "YYYY-MM-DD",
			"maxDate": "YYYY-MM-DD"
		}, function(start, end, label) {
			console.log("New date range selected: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + " (predefined range: " + label + ")");
		});

		$('#'+id).on('apply.daterangepicker', function(ev, picker) {
			$(this).val(picker.startDate.format('YYYY-MM-DD') + '~' + picker.endDate.format('YYYY-MM-DD'));
		});

		$('#'+id).on('cancel.daterangepicker', function(ev, picker) {
			$(this).val('');
		});
	}
}