var limitPayTime = '';
var currentPage = 1;

var totalMoney = 0;
var totalPeople = 0;
var orderStatus = '';
var jName = getCookie('Jname');
var orderId = getvl('orderId');
var orderId = null;


var sessTime = window.sessionStorage.getItem("limitPayTime");
if (sessTime === "null" || sessTime === null) {
    limitPayTime = findMyCatalogue();
} else {
    limitPayTime = window.sessionStorage.getItem("limitPayTime");
}
var sessPage = window.sessionStorage.getItem("page");
if (sessPage === "null" || sessPage === null) {
    currentPage = 1;
} else {
    currentPage = window.sessionStorage.getItem("page");
}


//我的权限数组
var arrayTitle = new Array;
loadMyEssay(limitPayTime);

// 请求数据
function loadMyEssay(limitPayTime) {
    $(document).ready(function() {
        findMyCatalogueChange();
        init(currentPage);
    });
    function init(pageNo) {
        window.sessionStorage.setItem("limitPayTime",limitPayTime);
        document.getElementById("applyTime").value = limitPayTime;
        window.sessionStorage.setItem("page",pageNo);
        $("#thislist").html("");
        $.ajax({
            url: urlcore + "/api/audit/statistics/list?gmtDatetime=" + limitPayTime,
            type: "get",
            async: 'false',
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                if (data.success === true) {
                    $.each(data.data, function(i, n) {
                        var thislist =
                            '<tr class="footable-even" onclick="change(\''+i+'\')" style="display: table-row;">' +
                            '<td hidden>' + n.loanId + '</td>' +
                            '<td class="footable-visible">' + n.startTime.split(" ")[0] + ' ~ ' + n.endTime.split(" ")[0] + '</td>' +
                            '<td class="footable-visible">' + n.loanName + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + n.distributionCount + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + n.loanCount + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + n.rfuseCount + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + n.overDuCount + '</td>' +
                            '<td class="footable-visible" style="text-align: center">' + n.overduRate*100 + '%</td>' +
                            '<td class="footable-visible footable-last-column" style="text-align: center">' +
                            '   <span class="glyphicon glyphicon-triangle-top"></span>' +
                            '</td>' +
                            '</tr>';
                        $('#thislist').append(thislist);
                    });
                    $.each(arrayTitle, function(i,k) {
                        if (k === "操作") {
                            $('a[data="'+k+'"]').attr("hidden",false).attr("class","btn btn-primary btn-xs");
                        } else {
                            $('div[data="'+k+'"]').attr("hidden",false);
                        }
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
        // 获取总的
        $.ajax({
            url: urlcore + "/api/audit/statistics/total?gmtDatetime=" + limitPayTime,
            type: "GET",
            dataType: 'json',
            async: false,
            contentType: "application/json;charset=utf-8",
            success:function(data){
                if (data.success == true) {
                    $("#totalDistribution").text(data.data.totalDistribution);
                    $("#totalLoan").text(data.data.totalLoan);
                    $("#overduRate").text(data.data.overduRate+"%");
                } else {
                    alert(data.msg);
                }
            },
            error:function() {
                alert("error");
            }
        });
    }
    PageClick = function(pageclickednumber) {
        init(pageclickednumber);
    }

}

// 一周之内
function findMyCatalogue() {
    var time = new Date();
    var time2 = new Date(time.getTime() - (7 * 24 * 60 * 60 * 1000));
    return timeVal(time2)+"~"+timeVal(time)
}

// 搜索
function searchList() {
    currentPage = 1;
    var time = $('#applyTime').val();
    loadMyEssay(time);
}

// 获取详细信息
var clicktag = 0;
function change(index) {
    if ($("#thislist").children(".footable-even").eq(index).children().eq(8).children("span").attr("class") === "glyphicon glyphicon-triangle-top") {
        if (clicktag == 0) {
            clicktag = 1;
            setTimeout(function() {
                clicktag = 0
            }, 500);
            $.ajax({
                url: urlcore + "/api/audit/statistics/listOne?id=" + $("#thislist").children(".footable-even").eq(index).children().eq(0).text(),
                type: "get",
                async: 'false',
                dataType: 'json',
                contentType: "application/json;charset=utf-8",
                success: function(data) {
                    $("#thislist").children(".footable-even").eq(index).children().eq(8).children("span").attr("class","glyphicon glyphicon-triangle-bottom");
                    let thislist =
                        '<tr>' +
                        '   <td colspan="12" style="padding: 0;">' +
                        '       <table class="table table-bordered toggle-arrow-tiny" style="margin-bottom: 35px;">' +
                        '           <thead style="visibility: hidden">' +
                        '               <tr>' +
                        '                   <th style="width: 200px;">时间</th>' +
                        '                   <th>审核人员</th>' +
                        '                   <th style="text-align: center">分配的单数</th>' +
                        '                   <th style="text-align: center">放款的单数</th>' +
                        '                   <th style="text-align: center">拒绝的单数</th>' +
                        '                   <th style="text-align: center">逾期未还</th>' +
                        '                   <th style="text-align: center">逾期未还率</th>' +
                        '                   <th style="text-align: center; width:60px"></th>' +
                        '               </tr>' +
                        '           </thead>' +
                        '           <tbody></tbody>' +
                        '       </table>' +
                        '   </td>' +
                        '</tr>';
                    $("#thislist").children(".footable-even").eq(index).after(thislist);
                    $.each(data.data, function(i, n) {
                        var list =
                            '<tr class="footable-even active" style="display:table-row;">' +
                            '   <td class="footable-visible">' + n.startTime + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>' +
                            '   <td class="footable-visible">' + n.loanName + '</td>' +
                            '   <td class="footable-visible" style="text-align: center">' + n.distributionCount + '</td>' +
                            '   <td class="footable-visible" style="text-align: center">' + n.loanCount + '</td>' +
                            '   <td class="footable-visible" style="text-align: center">' + n.rfuseCount + '</td>' +
                            '   <td class="footable-visible" style="text-align: center">' + n.overDuCount + '</td>' +
                            '   <td class="footable-visible" style="text-align: center">' + n.overduRate*100 + '%</td>' +
                            '   <td class="footable-visible footable-last-column" style="text-align: center">' +
                            '   </td>' +
                            '</tr>';
                        $("#thislist").children(".footable-even").eq(index).next().children().children().children("tbody").append(list);
                    });
                },
                error: function() {
                    alert("error");
                }
            });
        }
    } else {
        $("#thislist").children(".footable-even").eq(index).children().eq(8).children("span").attr("class","glyphicon glyphicon-triangle-top");
        $("#thislist").children(".footable-even").eq(index).next().remove();
    }

    // var tr = document.createElement("tr");
    // var td = document.createElement("td");
    // td.colSpan = 10;
    // td.innerText = "aaa";
    // tr.appendChild(td);
    // This.after(tr)


    // This.appendChild((data))
}

// 导出
function exportFile() {
    var time = $('#applyTime').val();
    if(confirm("您确定导出吗？")) {
        window.location.href = urlcore + "/api/collection/statistics/ef?gmtDatetime=" + time
    }
}
// 状态选择
// function selectOrdersStatus(orderStatus) {
//     loadMyEssay('', orderStatus, '', '', '', '' );
// }

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
function timeVal(val) {
    if (val != null) {
        var date = new Date(val);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        // return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + r(date.getHours()) + ':' + r(date.getMinutes()) + ':' + r(date.getSeconds());
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

// 权限
function findMyCatalogueChange(){
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

// 分配人员列表
// function fenpei2(id){
//     orderId = id;
//     $.ajax({
//         url: urlcore + "/api/loanOrder/selectAllPressMoneyMan",
//         type: "get",
//         dataType: 'json',
//         contentType: "application/json;charset=utf-8",
//         success: function(data) {
//             if(data.success == true) {
//                 var thislist='<option value="">请选择催收人</option>';
//                 $.each(data.data, function(i,n) {
//
//                     thislist = thislist +
//                         '<option value="'+n.id+'">'+n.userName+'</option>';
//
//                 });
//                 $("#jsfenPeiSelect").html(thislist);
//             }
//         },
//         error: function() {
//             /* Act on the event */
//             alert("error");
//         }
//     });
// }

// function fenpeiqueren2(){
//     var userId = $("#jsfenPeiSelect").val();
//     if($.trim(userId) == ''){
//         alert("请选择人员");
//         return;
//     }
//     var checks = $('input[name=selectcheck]:checked');
//     if(checks.length < 1){
//         alert("请选择记录");
//         return;
//     }
//     var orderIds ='';
//     $.each(checks,function(i,elem){
//         if($(elem).is(':checked')){
//             orderIds +=$(elem).val()+",";
//         }
//     });
//     orderIds = orderIds.slice(0,orderIds.length-1);
//     $.ajax({
//         url: urlcore + "/api/loanOrder/setUpPressMoneyMan?orderIds="+orderIds+"&userId="+userId,
//         type: "get",
//         dataType: 'json',
//         contentType: "application/json;charset=utf-8",
//         success: function(data) {
//             location.reload()
//         },
//         error: function() {
//             location.reload()
//         }
//     });
// }

// function reback(orderId) {
//     if (confirm("您确定退回吗？")) {
//         $.ajax({
//             url: urlcore + "/api/loanOrder/reback?orderId=" + orderId,
//             type: "get",
//             dataType: 'json',
//             contentType: "application/json;charset=utf-8",
//             success: function(data) {
//                 alert(data.msg);
//                 location.reload()
//             },
//             error: function() {
//                 /* Act on the event */
//                 console.log(data.msg);
//                 alert(data.msg);
//             }
//         });
//     }
// }