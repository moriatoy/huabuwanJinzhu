
$(function(){
    getNum();  //统计点击数

});

// 校验手机
function checkMobile(phone) { 
    var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
    return reg.test(phone)
}


function getType(){  //获得机型系统
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        return 'And';
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
        return 'iOS';
    }
}
//获取验证码
var isAjax = false;
function getCode(){
    var channelId = getQueryString("channelId");
    var partnerTag = getQueryString("partnerTag");
	if(isAjax){
	    return; //表示正在请求,不允许再次请求	
	}
    var phone= $('#phone').val();
    if(!phone || !checkMobile(phone.trim())){
        return mui.toast("手机格式不正确");
    }
    var formData = {
        phone:phone.trim(),
        code:hex_md5(phone+"rongke"),
        h5:"h5$$"+channelId
    };
    isAjax = true;
    var type = getType(); //获得手机系统类型
    $.post(urlcore + "/api/user/getPostPhoneCode?partnerTag="+partnerTag,formData,function(data){
        if (data.success == true) {
		  //获取短信验证码
			var time=30;
			$('.phone-code').addClass("disabled");
			$('.codetxt').text(time+"秒");
			var t = setInterval(function  () {
			    time--;
			    $('.codetxt').text(time+"秒");
			    if (time==0) {
				    clearInterval(t);
				    $('.codetxt').text("重新获取");
				    isAjax = false;
				    $('.phone-code').removeClass("disabled");
			    }
		    },1000)
			mui.alert("发送成功");
        }else if(data.code == 'EXISTING'){
            isAjax = false;
			mui.alert(data.msg,function(){
                // window.location.href="xiazai.html?type="+type+"&edition="+getQueryString("edition");
                window.location.href="xiazai.html?type="+type+"&partnerTag="+partnerTag+"&edition="+getQueryString("edition");
            });
        }else {
            isAjax = false;
            mui.alert(data.msg);
        }
    },"json");
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
function goRegister() { //去注册
	var phone= $('#phone').val();
    if(!phone || !checkMobile(phone.trim())){
        return mui.toast("手机格式不正确");
    }
	var code=$('#phone-code').val();
	if(!(/^[0-9]{4}$/.test(code))){
		return mui.toast('验证码必须是4位数字');
	}
	var password=$('#password').val();
	if(!password || password.length < 6 || password.length > 10){
		return mui.toast('密码必须是6-10个字符');
	}
	var type = getType(); //获得手机系统类型
    var channelId = getQueryString("channelId");
    var partnerTag = getQueryString("partnerTag");
    var url = "";
    if (channelId) {
        url = urlcore + "/api/user/register?phone="+phone+"&code="+code+"&password="+password+"&channelId="+encodeURIComponent(channelId)+"&partnerTag="+encodeURIComponent(partnerTag);
    } else {
        url = urlcore + "/api/user/register?phone="+phone+"&code="+code+"&password="+password;
    }
    $.ajax({
        url: url,
       	type: "get",
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success:function(data){
            if (data.success == true) {  
                window.location.href="xiazai.html?type="+type+"&partnerTag="+partnerTag+"&edition="+getQueryString("edition");
            } else if(data.code=='EXISTING'){
                window.location.href="xiazai.html?type="+type+"&partnerTag="+partnerTag+"&edition="+getQueryString("edition");
			}else {
                mui.alert(data.msg);
            }
        },
        error: function() {
            mui.toast("error");
        }
    });
}

//统计点击数  
function getNum(){
    var channelId = getQueryString("channelId");
    $.ajax({
        url: urlcore +"/api/channel/updateCount",
        type:"get",
        datatype : 'json' ,
        data:{
            channelId:encodeURIComponent(channelId)
        },
        contentType: "application/json;charset=utf-8",
        success:function(data){

        }
    });
    $.ajax({
        url: urlcore +"/api/channel/addChannelHit",
        type:"get",
        datatype : 'json' ,
        data:{
            channelId:encodeURIComponent(channelId)
        },
        contentType: "application/json;charset=utf-8",
        success:function(data){

        }
    })
}