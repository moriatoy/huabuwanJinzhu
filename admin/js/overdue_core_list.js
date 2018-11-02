var limitPayTime = '';
var followType = '';
var days = '';
var orderNumber = '';
var phoneNumber = '';
var name = '';
var gmtDatetime = "";
var currentPage = 1;

var totalMoney = 0;
var totalPeople = 0;
var orderStatus = '';
var jName = getCookie('Jname');
var orderId = getvl('orderId');
orderId = null;
var userId = '';
var personalId = '';


//我的权限数组
var arrayTitle = new Array;
loadMyEssay(limitPayTime, followType, days, orderNumber, phoneNumber, name, gmtDatetime);

// 请求主题列表数据
function loadMyEssay(limitPayTime, followType, days, orderNumber, phoneNumber, name ,gmtDatetime) {

    $(document).ready(function() {
        findMyCatalogue();
        init(currentPage);
    });
    function init(pageNo) {
        $("#thislist").html("");
        $.ajax({
            url: urlcore + "/api/loanOrder/overdueCenterLoanOrder?limitPayTime=" + limitPayTime + "&followType=" + followType + "&days=" + days + "&phoneNext=" + gmtDatetime + "&phone=" + phoneNumber + "&name=" + name  + "&currentPage=" + pageNo,
            type: "get",
            async: 'false',
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                if (data.success === true) {
                    $("#number").text("总数："+data.data.pageDto.total+"人")
                    $.each(data.data.pageDto.list, function(i, n) {
                        var disabled = "";
                        if(n.adminName == null){
                        }else if(n.adminName != null){
                            disabled ="disabled";
                        }else{
                        }
                        var thislist = "";
                        if (i === 0) {
                            thislist =
                                '<tr class="footable-even" onclick="change(this)" style="display: table-row;background: #e5f6fe">' +
                                '<td class="footable-visible"><input type="checkbox" '+disabled+' value="' + n.id + '" name="selectcheck" /></td>' +
                                '<td class="footable-visible">' + n.id + '</td>' +
                                '<td class="footable-visible" style="text-align: center">' + n.userName + '</td>' +
                                '<td class="footable-visible" style="text-align: center">' + format(n.overdueDays+"天") + '</td>' +
                                '<td class="footable-visible" style="text-align: center">' + timeDay(n.phoneTime) + '</td>' +
                                // '<td class="footable-visible" style="text-align: center">' + format(n.phoneObj) + '</td>' +
                                '<td class="footable-visible" style="text-align: center">' + format(n.phoneFinish) + '</td>' +
                                '<td class="footable-visible" style="text-align: center">' + format(n.adminName) + '</td>' +
                                '</tr>';
                                userId = n.id;
                                // 通讯录
                                personal(n.id);
                                remark(n.id);
                                record(n.id);
                        } else {
                            thislist =
                                '<tr class="footable-even" onclick="change(this)" style="display: table-row;">' +
                                '<td class="footable-visible"><input type="checkbox" '+disabled+' value="' + n.id + '" name="selectcheck" /></td>' +
                                '<td class="footable-visible">' + n.id + '</td>' +
                                '<td class="footable-visible" style="text-align: center">' + n.userName + '</td>' +
                                '<td class="footable-visible" style="text-align: center">' + format(n.overdueDays+"天") + '</td>' +
                                // '<td class="footable-visible" style="text-align: center">' + format(n.phoneObj) + '</td>' +
                                '<td class="footable-visible" style="text-align: center">' + timeDay(n.phoneTime) + '</td>' +
                                '<td class="footable-visible" style="text-align: center">' + format(n.phoneFinish) + '</td>' +
                                '<td class="footable-visible" style="text-align: center">' + format(n.adminName) + '</td>' +
                                // '<td class="footable-visible footable-last-column" style="text-align: center">' +
                                // backHtml+
                                // '<a hidden="hidden" class="" name="操作" href="overdue_list_core.html?id=' + n.id + '" >操作</a>&nbsp;' +
                                '</tr>';
                        }
                        $('#thislist').append(thislist);
                    });
                    $("#pager").pager({
                        pagenumber: pageNo,
                        pagecount: data.data.pageDto.pages,
                        totalcount: data.data.pageDto.total,
                        buttonClickCallback: PageClick
                    });
                    if (data.code == 'OVERTIME') {
                        var thisUrl = window.location.href;
                        if (thisUrl.indexOf('login.html') <= -1) {
                            top.window.location.href = "login.html";
                        }
                    } else {
                        if (data.msg != '空数据') {
                            // alert(data.msg)
                        } else {
                            $('#thiscount').text(0);
                        }
                    }
                }

            },
            error: function() {
                alert("error");
            }
        });
    }
    PageClick = function(pageclickednumber) {
        init(pageclickednumber);
    }

}

// 搜索筛选
function searchList() {
    currentPage = 1;
    var gmtDatetime = $("#gmtDatetime").val();
    var userName = $('#userName').val();
    var phoneNumber = $('#phoneNumber').val();
    var orderNumber = $("#orderNumber").val();
    var day =$("#day"). val();
    var essay = $('#orderStatus').val();
    var time = '';
    loadMyEssay(time, essay, day, orderNumber, phoneNumber, userName, gmtDatetime);
}

// 重置
function reset() {
    currentPage = 1;
    $("#gmtDatetime").val("");
    $('#userName').val("");
    $('#phoneNumber').val("");
    $("#day"). val("");
    $('#orderStatus').val("");
    loadMyEssay('', '', '', '', '', '', '');
}


// 导出
function exportFile() {
    var gmtDatetime = $("#gmtDatetime").val();
    var userName = $('#userName').val();
    var phoneNumber = $('#phoneNumber').val();
    var day =$("#day"). val();
    var essay = $('#orderStatus').val();
    var time = '';
    if(confirm("您确定导出吗？")) {
        window.location.href = urlcore + "/api/loanOrder/overdueCenterLoanOrderExport?limitPayTime=" + time + "&followType=" + essay + "&days=" + day + "&phoneNext=" + gmtDatetime + "&phone=" + phoneNumber + "&name=" + userName
    }
}

// 选择
function selectAll(o) {
    var checks = $("input[name=selectcheck]").not(":disabled");
    if (checks.length > 0) {
        $.each(checks, function(i, elem) {
            $(elem).prop('checked', o.checked);
        });
    }
}

// 时间格式化
function time(val) {
    if (val != null) {
        var date = new Date(val);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + r(date.getHours()) + ':' + r(date.getMinutes()) + ':' + r(date.getSeconds());
    } else {
        return "-"
    }
}
// 转换天数
function timeDay(val) {
    if (val != null) {
        var date = new Date().getTime();
        var date2 = new Date(val).getTime();
        var days = date - date2;
        var time = parseInt(days / (1000 * 60 * 60 * 24));
        return time+"天前";
    } else {
        return "-"
    }
}
function r(item) {
    return item < 10 ? '0' + item : item;
}
// 如果无参数数
function format(item) {
    return item ? item : '-';
}
// 切换人员
function change(data) {
    $.each(data.parentNode.childNodes, function(i,n) {
        if (n !== data) {
            n.style.background = "#fff";
        }
    });
    data.style.background = "#e5f6fe";
    userId = data.childNodes[1].textContent;
    personal(data.childNodes[1].textContent);
    remark(data.childNodes[1].textContent);
    record(data.childNodes[1].textContent);
}
// 分配人员列表
function fenpei2(id){
    orderId = id;
    $.ajax({
        url: urlcore + "/api/loanOrder/selectAllPressMoneyMan",
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            if(data.success == true) {
                var thislist='<option value="">请选择催收人</option>';
                $.each(data.data, function(i,n) {

                    thislist = thislist +
                        '<option value="'+n.id+'">'+n.userName+'</option>';

                });
                $("#jsfenPeiSelect").html(thislist);
            }
        },
        error: function() {
            /* Act on the event */
            alert("error");
        }
    });
}
function fenpeiqueren2(){
    var userId = $("#jsfenPeiSelect").val();
    if($.trim(userId) == ''){
        alert("请选择人员");
        return;
    }
    var checks = $('input[name=selectcheck]:checked');
    if(checks.length < 1){
        alert("请选择记录");
        return;
    }
    var orderIds ='';
    $.each(checks,function(i,elem){
        if($(elem).is(':checked')){
            orderIds +=$(elem).val()+",";
        }
    });
    orderIds = orderIds.slice(0,orderIds.length-1);
    $.ajax({
        url: urlcore + "/api/loanOrder/setUpPressMoneyMan?orderIds="+orderIds+"&userId="+userId,
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            location.reload()
        },
        error: function() {
            location.reload()
        }
    });
}

// 基本信息
function personal(id) {
    $.ajax({
        url: urlcore + "/api/loanOrder/selectOneDetail?id=" + id,
        type: "get",

        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            if(data.success == true) {
                var da = data.data;
                // $('#id').html(da.id);
                $('#phone').html(da.user.phone);
                // $('#orderNumber').html(da.orderNumber);
                // $('#bankName').html(da.bankName);
                // $('#bankCardNum').html(da.bankCardNum);
                // $('#limitDays').html(da.limitDays);
                // $('#borrowMoney').html(da.borrowMoney);
                // $('#realMoney').html(da.realMoney);
                // $('#interestMoney').html(da.interestMoney);
                // $('#placeServePercent').html(da.placeServeMoney);
                // $('#msgAuthPercent').html(da.msgAuthMoney);
                // $('#riskServePercent').html(da.riskServeMoney);
                // $('#riskPlanPercent').html(da.riskPlanMoney);
                // $('#wateMoney').html(da.wateMoney);
                // $('#saveMoney').html(da.saveMoney);
                // $('#needPayMoney').html(da.needPayMoney);
                //
                // $('#gmtDatetime').html(da.gmtDatetime);
                // $('#passTime').html(da.passTime);
                // $('#giveTime').html(da.giveTime);
                // $('#limitPayTime').html(da.limitPayTime);
                //
                // $('#overDueTime').html(da.overdueTime);
                // $('#overDueDays').html(da.overdueDays);
                // $('#overDueMoney').html(da.overdueMoney);
                // $('#allowDays').html(da.allowDays);
                // $('#allowMoney').html(da.allowMoney);




                // mailList(da.userId);
                personalId = da.userId;
                $("#mailBtn").show();
                $("#mail").hide();
                face(da.userId);
                urgent(da.userId);
                // $.each(arrayTitle, function(i,k) {
                //     if (k === "保存") {
                //         $('div[name="'+k+'"]').attr("hidden",false);
                //     } else {
                //         $('a[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-sm btn-primary");
                //     }
                // });
                // $('#auditorName').html(da.admin.userName);

                // document.getElementById("btn1").href = imgPath+da.agreementUrl;
                // document.getElementById("btn2").href = imgPath+da.agreementTwoUrl;

            }

        },
        error: function() {
            /* Act on the event */
            alert("error");
        }
    });
}
function transUrl(url){
    if($.trim(url) == ''){
        return "";
    }
    if(url.indexOf("http") > -1){
        return url;
    }
    return imgPath+url;
}
// 身份证信息
function face(id) {
    $.ajax({
        url: urlcore + "/api/tongdun/face/query?userId=" + id,
        type: "get",
        async: 'false',
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            $("#just").html("");
            $("#back").html("");
            $("#daily").html("");
            if (data.success === true) {
                var just = "<img src='"+transUrl(data.data.frontcard)+"' alt=''>" +
                    "<div>日期："+data.data.updateTime.split(" ")[0]+"</div>";
                var back =  "<img src='"+transUrl(data.data.backcard)+"' alt=''>" +
                    "<div>日期："+data.data.updateTime.split(" ")[0]+"</div>";
                var daily = "<img src='"+transUrl(data.data.image)+"' alt=''>" +
                    "<div>日期："+data.data.updateTime.split(" ")[0]+"</div>";
                $("#just").append(just);
                $("#back").append(back);
                $("#daily").append(daily);
                $("#name").html(data.data.name);
                $("#idNumber").html(data.data.idNumber);
            }
        },
        error: function() {
            alert("身份证信息异常");
        }
    });
}
// 紧急联系人
function urgent(id) {
    $.ajax({
        url: urlcore + "/api/userBasicMsg/selectOneDetailsByUserId?id=" + id,
        type: "get",
        async: 'false',
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            if (data.success === true) {
                // 基本信息
                $("#education").html(data.data.study);
                $("#marriage").html(data.data.marry);
                $("#address").html(data.data.province+' '+data.data.city+' '+data.data.county+' '+data.data.addressDetails);
                $("#nativePlace").html(data.data.province+' '+data.data.city+' '+data.data.county);
                // 紧急联系人
                var array = [];
                var linkOn = {};
                linkOn.name = data.data.linkPersonNameOne;
                linkOn.phone = data.data.linkPersonPhoneOne;
                linkOn.Relation = data.data.linkPersonRelationOne;
                array.push(linkOn);
                var linkTwo = {};
                linkTwo.name = data.data.linkPersonNameTwo;
                linkTwo.phone = data.data.linkPersonPhoneTwo;
                linkTwo.Relation = data.data.linkPersonRelationTwo;
                array.push(linkTwo);
                var linkThree = {};
                linkThree.name = $("#name").html();
                linkThree.phone = $('#phone').html();
                linkThree.Relation = "本人";
                array.push(linkThree);
                $('#contactsList').html("");
                $.each(array, function(i, n) {
                    var thislist =
                        '<tr class="footable-even" style="display: table-row;">' +
                            '<td class="footable-visible">' + n.name + '</td>' +
                            '<td class="footable-visible">-</td>' +
                            '<td class="footable-visible">' + n.Relation + '</td>' +
                            '<td class="footable-visible">' + n.phone + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' +
                                '<a class="btn btn-primary btn-xs" data-toggle="modal" data-target="#remarkMultiple" onclick="Initialization(1,\''+n.name+'\',\''+n.phone+'\',\''+n.Relation+'\')">催记</a>&nbsp;' +
                            '</td>' +
                        '</tr>';
                    $('#contactsList').append(thislist);
                });
                // for (var i = 0; i < $('#contactsList').children().length; i++) {
                //     // $('#contactsList').find("tr").eq(i).onclick = function(i) {
                //     //     console.log(i)
                //     // }
                //     console.log($('#contactsList').find("tr").eq(i)).
                // }

                // console.log($('#contactsList').children())
            }
        },
        error: function() {
            alert("紧急联系人");
        }
    });
}
// 通讯录
function mailList(id){
    $("#mailBtn").hide(500);
    $("#mail").show(500);
    $("#mailList").html("");
    $.ajax({
        url: urlcore + "/api/userPhoneList/findByUserPage?userId="+personalId+"&pageNo=1&pageSize=100000",
        type: "get",
        async: 'false',
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            if (data.success === true) {
                $('#mailList').html("");
                $.each(data.data.list, function(i, n) {
                    var thislist =
                        '<tr class="footable-even" style="display: table-row;">' +
                            '<td class="footable-visible">' + n.name + '</td>' +
                            '<td class="footable-visible">' + n.phone + '</td>' +
                            '<td class="footable-visible">' + n.uptDatetime + '</td>'+
                            '<td class="footable-visible">-</td>' +
                            '<td class="footable-visible">-</td>' +
                            '<td class="footable-visible" style="text-align: center">' +
                                '<a class="btn btn-primary btn-xs" data-toggle="modal" data-target="#remarkMultiple" onclick="Initialization(2,\''+n.name+'\',\''+n.phone+'\')">催记</a>&nbsp;' +
                            '</td>' +
                        '</tr>';
                    $('#mailList').append(thislist);
                });
            }
        },
        error: function() {
            alert("通讯录异常");
        }
    });
}
// 催记
function remark(id) {
    $.ajax({
        url: urlcore + "/api/loanOrder/getLoanOrderPhoneList?id=" + id,
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            if(data.success === true) {
                $("#followList").html("");
                $("#conversationList").html("");
                var length = 0;
                if (data.data.length > 0) {
                    $("#tiaoshu").html(data.data.length);
                    $.each(data.data, function(i, n) {
                        var thislist =
                            '<tr class="footable-even" style="display: table-row;">' +
                            '<td class="footable-visible">'+ n.adminName +'</td>' +
                            '<td class="footable-visible">' + n.phoneTime + '</td>' +
                            '<td class="footable-visible">' + n.phoneFinish + '</td>' +
                            '<td class="footable-visible">' + n.phoneContent + '</td>' +
                            '</tr>';
                        $('#followList').append(thislist);
                        if (n.phoneFinish === "打电话") {
                            length++;
                            var thislist =
                                '<tr class="footable-even" style="display: table-row;">' +
                                '<td class="footable-visible">'+ n.phoneName +'</td>' +
                                '<td class="footable-visible">' + n.phoneObj + '</td>' +
                                '<td class="footable-visible">' + n.phoneNumber + '</td>' +
                                '<td class="footable-visible">' + n.adminName + '</td>' +
                                '<td class="footable-visible">' + n.phoneTime + '</td>' +
                                '<td class="footable-visible">' + n.phoneContent + '</td>' +
                                '</tr>';
                            $('#conversationList').append(thislist);
                        }
                    });
                    $("#tiaoshu2").html(length);
                    if (length === 0) {
                        var thislist =
                            '<tr class="footable-even" style="display: table-row;">' +
                            '<td colspan="6" style="text-align: center"><i class="glyphicon glyphicon-info-sign"></i>&nbsp;暂无数据</td>' +
                            '</tr>';
                        $('#conversationList').append(thislist);
                    }
                } else {
                    var thislist =
                        '<tr class="footable-even" style="display: table-row;">' +
                            '<td colspan="6" style="text-align: center"><i class="glyphicon glyphicon-info-sign"></i>&nbsp;暂无数据</td>' +
                        '</tr>';
                    $('#followList').append(thislist);
                    $('#conversationList').append(thislist);
                }

            }
        },
        error: function() {
            alert("error");
        }
    });
}
// 初始化催记弹框
function Initialization(type,name,phone,relation) {
    if (type === 1) {
        $("#inputName").val(name);
        $("#inputRelation").val(relation);
        $("#inputRelation").parent().css("display","table");
        $("#inputPhone").val(phone);
        $("#inputContent").val("");
        $("#btn1").css("display","inline");
        $("#btn2").css("display","none")
    } else if (type === 2) {
        $("#inputName").val(name);
        $("#inputRelation").val("");
        $("#inputRelation").parent().css("display","table");
        $("#inputPhone").val(phone);
        $("#inputContent").val("");
        $("#btn1").css("display","inline");
        $("#btn2").css("display","none")
    } else {
        $("#inputName").val("");
        $("#inputRelation").val("");
        $("#inputRelation").parent().css("display","table");
        $("#inputPhone").val("");
        $("#inputContent").val("");
        $("#btn1").css("display","none");
        $("#btn2").css("display","inline")
        for (var i = 0; i < $("#state").find("li").length; i++) {
            $("#state").find("li").eq(i).prop("class","");
        }
        $("#inputContent2").val("")
    }
}
function state(data,index) {
    for (var i = 0; i < $("#state").find("li").length; i++) {
        $("#state").find("li").eq(i).prop("class","");
    }
    $("#state").find("li").eq(index).prop("class","ative");
}
// 增加催记
function remarkFun(type) {
    if (type === 1) {
        var phoneName = $("#inputName").val();
        var telephone = $("#inputPhone").val();
        var phoneObj = $("#inputRelation").val();
        var phoneFinish = "打电话";
        var phoneContent = $("#inputContent").val();
    } else {
        var phoneName = '';
        var telephone = '';
        var phoneObj = '';
        var phoneFinish = $(".ative").eq(0).html();
        var phoneContent = $("#inputContent2").val();
    }
    var data = {
        userId: personalId,
        loanOrderId: userId,
        phoneName: phoneName,
        phoneNumber: telephone,
        phoneObj: phoneObj,
        phoneFinish: phoneFinish,
        phoneContent: phoneContent
    };
    $.ajax({
        url: urlcore + "/api/loanOrder/setLoanOrderPhone",
        type: "get",
        data: data,
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            remark(userId);
            loadMyEssay(limitPayTime, followType, days, orderNumber, phoneNumber, name, gmtDatetime);
            $("#stateMultiple").modal('hide');
        },
        error: function() {
            /* Act on the event */
            alert("error");
        }
    });
}
// 订单记录
function record(id) {
    $.ajax({
        url: urlcore + "/api/loanOrder/getLoanOrderChangeList?id=" + id,
        type: "get",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(data) {
            if(data.success == true) {
                $('#recordList').html("");
                if (data.data.length > 0) {
                    $.each(data.data, function(i, n) {
                        var thislist =
                            '<tr class="footable-even" style="display: table-row;">' +
                            '<td class="footable-visible">'+ n.loanOrderId +'</td>' +
                            '<td class="footable-visible">'+ n.oprTime +'</td>' +
                            '<td class="footable-visible">' + n.realMoney + '</td>' +
                            '<td class="footable-visible">' + n.recordDays + '天</td>' +
                            '<td class="footable-visible">' + n.changeName + '</td>' +
                            '<td class="footable-visible">花不完现金贷</td>' +
                            '</tr>';
                        $('#recordList').append(thislist);
                    });
                } else {
                    var thislist =
                        '<tr class="footable-even" style="display: table-row;">' +
                            '<td colspan="6" style="text-align: center"><i class="glyphicon glyphicon-info-sign"></i>&nbsp;暂无数据</td>' +
                        '</tr>';
                    $('#recordList').append(thislist);
                }

            }
        },
        error: function() {
            /* Act on the event */
            alert("error");
        }
    });
}



// 权限
function findMyCatalogue(){
    $.ajax({
        url: urlcore + "/api/roleThirdCatalogue/findAllByUser?secondTitle="+jName,
        type: "GET",
        dataType: 'json',
        async: false,
        contentType: "application/json;charset=utf-8",
        success:function(data){
            if (data.success == true) {
                $.each(data.data, function(i,n) {
                    arrayTitle.push(n.thirdCatalogue.title);
                });
            } else {
                alert(data.msg);
            }

        },
        error:function() {
            alert("error");
        }
    });
}