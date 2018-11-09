// var urlcore = 'http://hbw.hndbtop.com:8081';
// var urlcore = 'http://47.98.225.146:8081';
// 测试环境
var urlcore = 'http://www.tth.hndbtop.com:8080';
//var urlcore = 'http://www.zhanzhao12366.com/interface';
//var urlcore = 'http://cwww8090.tunnel.2bdata.com/interface/api/json';
//var urlcore = 'http://118.31.42.175';
//设置全局ajax
$.ajaxSetup({
    xhrFields: {
    	withCredentials: true
	}
});


var pageSize = 10;
var pageNo = 1;
var nextPage = 1;

//从url中获取参数值
function getvl(name) {
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href.trim())) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
};
function getQueryString(name) {
    var r = window.location.search.substr(1);
    var index = r.indexOf('=');
    if(index!=-1){
        return r.substring(index+1);
    }
}
$(function() {
	//时间格式化
	Date.prototype.pattern=function(fmt) {
	    var o = {
	    "M+" : this.getMonth()+1, //月份         
	    "d+" : this.getDate(), //日         
	    "h+" : this.getHours(), //小时         
	    "H+" : this.getHours(), //小时         
	    "m+" : this.getMinutes(), //分         
	    "s+" : this.getSeconds(), //秒         
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
	    "S" : this.getMilliseconds() //毫秒         
	    };         
	    var week = {         
	    "0" : "/u65e5",         
	    "1" : "/u4e00",         
	    "2" : "/u4e8c",         
	    "3" : "/u4e09",         
	    "4" : "/u56db",         
	    "5" : "/u4e94",         
	    "6" : "/u516d"        
	    };         
	    if(/(y+)/.test(fmt)){         
	        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
	    }         
	    if(/(E+)/.test(fmt)){         
	        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
	    }         
	    for(var k in o){         
	        if(new RegExp("("+ k +")").test(fmt)){         
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
	        }         
	    }         
	    return fmt;         
	}
});


function typeToPayName(type){
	if(type==1){
		return "余额支付";
	}
	if(type==2){
		return "支付宝支付";
	}
	if(type==3){
		return "微信支付";
	}
	if(type==4){
		return "微信支付";
	}

}

 //初始化fileinput控件（第一次初始化）
function initFileInput(ctrlName, uploadUrl,okName,maxnNum) {    
    var control = $('#' + ctrlName); 

    control.fileinput({
        language: 'zh', //设置语言
        uploadUrl: uploadUrl, //上传的地址
        //uploadExtraData:{"id": 1, "fileName":'123.mp3'},
        uploadAsync: true, //默认异步上传
        showUpload: true, //是否显示上传按钮
        showRemove : true, //显示移除按钮
        showPreview : true, //是否显示预览
        showCaption: false,//是否显示标题
        browseClass: "btn btn-primary", //按钮样式     
        dropZoneEnabled: true,//是否显示拖拽区域
        maxFileCount: 10, //表示允许同时上传的最大文件个数
        dropZoneTitle: '拖拽文件到这里 &hellip;',
        maxFileSize:0,
        enctype: 'multipart/form-data',
        validateInitialCount:true,
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
    }).on("fileuploaded", function(event, data,key) {
        if(data.response){	
        	var okData = data.response.data;
        	for (var i = 0; i < okData.length; i++) {
        		var strHtml = 
		            	'<div style="position:relative;width:250px;height:250px;float:left;display:none" id="'+key+'">'+
		            	'	<span onclick="removeStrHtml()" style="position:absolute;top:10px;right:10px;font-size:20px;color:#f00;" class="glyphicon glyphicon-trash" aria-hidden="true">'+
		            	'	</span>'+
		            	'	<img style="padding: 5px 5px 5px 5px;" width="250px" height="250px" src="'+okData[i]+'">'+
		        		'</div>';
		        $(okName).append(strHtml);
        	}
        }
    }).on('filesuccessremove', function(event, key) { 
    	$("#"+key).remove();  
	});
}

 //初始化fileinput控件（第一次初始化）
function initVideoInput(ctrlName, uploadUrl,okName,maxnNum) {    
    var control = $('#' + ctrlName); 

    control.fileinput({
        language: 'zh', //设置语言
        uploadUrl: uploadUrl, //上传的地址
        //uploadExtraData:{"id": 1, "fileName":'123.mp3'},
        uploadAsync: true, //默认异步上传
        showUpload: true, //是否显示上传按钮
        showRemove : true, //显示移除按钮
        showPreview : true, //是否显示预览
        showCaption: false,//是否显示标题
        browseClass: "btn btn-primary", //按钮样式     
        dropZoneEnabled: true,//是否显示拖拽区域
        maxFileSize:0,
        maxFileCount: 10, //表示允许同时上传的最大文件个数
        dropZoneTitle: '拖拽文件到这里 &hellip;',
        enctype: 'multipart/form-data',
        validateInitialCount:true,
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
    }).on("fileuploaded", function(event, data,key) {
        if(data.response){	
        	var okData = data.response.data;
        	for (var i = 0; i < okData.length; i++) {
        		var strHtml = 
		            	'<div style="position:relative;width:250px;height:250px;float:left;display:none" id="'+key+'">'+
		            	'	<span onclick="removeStrHtml()" style="position:absolute;top:10px;right:10px;font-size:20px;color:#f00;" class="glyphicon glyphicon-trash" aria-hidden="true">'+
		            	'	</span>'+
		            	'	<video id="vd" width="150" height="150" controls="controls" src="'+okData[i]+'">'+
						'	</video>'+
		        		'</div>';
		        $(okName).append(strHtml);
        	}
        }
    }).on('filesuccessremove', function(event, key) { 
    	$("#"+key).remove();  
	});
}

/**
 * 移除Html代码
 */
function removeStrHtml(obj){
	$(obj).parent().remove();
}
