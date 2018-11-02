/**
 * 校验身份证
 * @param {Object} socialNo
 */
function checkCardId(socialNo){  
  
      if(socialNo == "")  
      {  
        alert("输入身份证号码不能为空!");  
        return (false);  
      }  
  
      if (socialNo.length != 15 && socialNo.length != 18)  
      {  
        alert("输入身份证号码格式不正确!");  
        return (false);  
      }  
          
     var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};   
         
       if(area[parseInt(socialNo.substr(0,2))]==null) {  
        alert("身份证号码不正确(地区非法)!");  
            return (false);  
       }   
              
      if (socialNo.length == 15)  
      {  
         pattern= /^\d{15}$/;  
         if (pattern.exec(socialNo)==null){  
            alert("15位身份证号码必须为数字！");  
            return (false);  
        }  
        var birth = parseInt("19" + socialNo.substr(6,2));  
        var month = socialNo.substr(8,2);  
        var day = parseInt(socialNo.substr(10,2));  
        switch(month) {  
            case '01':  
            case '03':  
            case '05':  
            case '07':  
            case '08':  
            case '10':  
            case '12':  
                if(day>31) {  
                    alert('输入身份证号码不格式正确!');  
                    return false;  
                }  
                break;  
            case '04':  
            case '06':  
            case '09':  
            case '11':  
                if(day>30) {  
                    alert('输入身份证号码不格式正确!');  
                    return false;  
                }  
                break;  
            case '02':  
                if((birth % 4 == 0 && birth % 100 != 0) || birth % 400 == 0) {  
                    if(day>29) {  
                        alert('输入身份证号码不格式正确!');  
                        return false;  
                    }  
                } else {  
                    if(day>28) {  
                        alert('输入身份证号码不格式正确!');  
                        return false;  
                    }  
                }  
                break;  
            default:  
                alert('输入身份证号码不格式正确!');  
                return false;  
        }  
        var nowYear = new Date().getYear();  
        if(nowYear - parseInt(birth)<15 || nowYear - parseInt(birth)>100) {  
            alert('输入身份证号码不格式正确!');  
            return false;  
        }  
        return (true);  
      }  
        
      var Wi = new Array(  
                7,9,10,5,8,4,2,1,6,  
                3,7,9,10,5,8,4,2,1  
                );  
      var   lSum        = 0;  
      var   nNum        = 0;  
      var   nCheckSum   = 0;  
        
        for (i = 0; i < 17; ++i)  
        {  
              
  
            if ( socialNo.charAt(i) < '0' || socialNo.charAt(i) > '9' )  
            {  
                alert("输入身份证号码格式不正确!");  
                return (false);  
            }  
            else  
            {  
                nNum = socialNo.charAt(i) - '0';  
            }  
             lSum += nNum * Wi[i];  
        }  
  
        
        if( socialNo.charAt(17) == 'X' || socialNo.charAt(17) == 'x')  
        {  
            lSum += 10*Wi[17];  
        }  
        else if ( socialNo.charAt(17) < '0' || socialNo.charAt(17) > '9' )  
        {  
            alert("输入身份证号码格式不正确!");  
            return (false);  
        }  
        else  
        {  
            lSum += ( socialNo.charAt(17) - '0' ) * Wi[17];  
        }  
  
          
          
        if ( (lSum % 11) == 1 )  
        {  
            return true;  
        }  
        else  
        {  
            alert("输入身份证号码格式不正确!");  
            return (false);  
        }  
          
} 

/**
 * 判断手机格式是否正确
 * @param {Object} obj
 */
function checkMobile(phone){  
	//匹配移动手机号
	var PATTERN_CHINAMOBILE = /^1(3[4-9]|5[012789]|8[23478]|4[7]|7[8])\d{8}$/;
	// 匹配联通手机号
	var PATTERN_CHINAUNICOM =/^1(3[0-2]|5[56]|8[56]|4[5]|7[6])\d{8}$/;
	// 匹配电信手机号
	var PATTERN_CHINATELECOM =/^1(3[3])|(8[019])\d{8}$/;
    if(PATTERN_CHINAMOBILE.test(phone) || PATTERN_CHINAUNICOM.test(phone) || PATTERN_CHINATELECOM.test(phone)){  
        return true;  
    }else{  
    	alert("手机格式错误！");
        return false;  
    }  
}  


/**
 * 检测日期格式
 * @param {Object} dateStr
 */
function checkDateFormat(dateStr){
	var a = /^(\d{4})-(\d{2})-(\d{2})$/
	if (!a.test(dateStr)) { 
		return false;
	}else{
		return true ;
	}	
} 

/**
 * 检测是否为空
 * @param {Object} checkStr 检测字段
 * @param {Object} falseMsg	为空输出提示语
 */
function checkIsEmpty(checkStr,falseMsg){
	if(checkStr == null || checkStr == undefined || checkStr == ''){ 
		alert(falseMsg);
		return false;
	}else{
		return true;
	}
} 


/**
 * 乘法函数，用来得到精确的乘法结果
 * 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 * 调用：accMul(arg1,arg2)
 * 返回值：arg1乘以 arg2的精确结果
 * @param {Object} arg1
 * @param {Object} arg2
 */
function accMul(arg1,arg2){
	var m=0,s1=arg1.toString(),s2=arg2.toString();
	try{m+=s1.split(".")[1].length}catch(e){}
	try{m+=s2.split(".")[1].length}catch(e){}
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

/**
 * 加法函数，用来得到精确的加法结果
 * 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 * 调用：accAdd(arg1,arg2)
 * 返回值：arg1加上arg2的精确结果
 * @param {Object} arg1
 * @param {Object} arg2
 */
function accAdd(arg1,arg2){
	var r1,r2,m;
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
	m=Math.pow(10,Math.max(r1,r2))
	return (arg1*m+arg2*m)/m
}

/**
 * 说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
 * 调用：accSub(arg1,arg2)
 * 返回值：arg1减上arg2的精确结果 
 * @param {Object} arg1
 * @param {Object} arg2
 */
function accSub(arg1, arg2) {  
    return accAdd(arg1, -arg2);  
}