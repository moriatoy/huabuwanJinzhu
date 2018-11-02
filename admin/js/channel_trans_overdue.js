// 我的权限数组
var arrayTitle = new Array;
var jName = getCookie('Jname');
var current = 1;
var channelName ='';
var sdate = '';



// 请求数据
function init(start,end) {
    window.onload = function(){
        $("#giveTime").val(start+"~"+end);
        loadMyEssay(start,end);
    };
}
function loadMyEssay(start,end) {
    // 获取渠道数据
    $.ajax({
        url: urlcore + "/api/channel/selectChannelStatistics?startTime=" + start + "&endTime=" + end,
        type: "GET",
        dataType: 'json',
        async: false,
        contentType: "application/json;charset=utf-8",
        success:function(data){
            if (data.success == true) {
                $('#dataList').html("");
                var array = [];
                var index = 0;
                var sumLoanOrder = 0;
                var firstLoanOrder = 0;
                var moreLoanOrder = 0;
                var overdueLoanOrder = 0;
                var firstOfOverdueLoanOrder = 0;
                var moreOfOverdueLoanOrder = 0;
                $.each(data.data, function(i, n) {
                    var dataList =
                        '<tr class="footable-even" style="display: table-row;">' +
                        '	<td class="footable-visible">' + n.channelName + '</td>' +
                        '	<td class="footable-visible">' + timeVal(n.limitPayTime) + '</td>' +
                        '	<td class="footable-visible" style="text-align: center">' + n.sumLoanOrder + '</td>' +
                        '	<td class="footable-visible" style="text-align: center">' + n.payLoanOrder + '</td>' +
                        '	<td class="footable-visible" style="text-align: center">' + n.overdueLoanOrder + '</td>' +
                        '	<td class="footable-visible" style="text-align: center">' + (n.sumLoanOrder === 0 ? 100 : (n.overdueLoanOrder / n.sumLoanOrder * 100).toFixed(2)) + '%</td>' +
                        '	<td class="footable-visible" style="text-align: center">' + n.firstLoanOrder + '</td>' +
                        '	<td class="footable-visible" style="text-align: center">' + n.firstOfOverdueLoanOrder + '</td>' +
                        '	<td class="footable-visible" style="text-align: center">' + (n.firstLoanOrder === 0 ? 100 : (n.firstOfOverdueLoanOrder / n.firstLoanOrder * 100).toFixed(2)) + '%</td>' +
                        '	<td class="footable-visible" style="text-align: center">' + n.moreLoanOrder + '</td>' +
                        '	<td class="footable-visible" style="text-align: center">' + n.moreOfOverdueLoanOrder + '</td>' +
                        '	<td class="footable-visible" style="text-align: center">' + (n.moreLoanOrder === 0 ? 100 : (n.moreOfOverdueLoanOrder / n.moreLoanOrder * 100).toFixed(2)) + '%</td>' +
                        '</tr>';
                    $('#dataList').append(dataList);

                    // 计算总数
                    sumLoanOrder+=n.sumLoanOrder;
                    firstLoanOrder+=n.firstLoanOrder;
                    moreLoanOrder+=n.moreLoanOrder;
                    overdueLoanOrder+=n.overdueLoanOrder;
                    firstOfOverdueLoanOrder+=n.firstOfOverdueLoanOrder;
                    moreOfOverdueLoanOrder+=n.moreOfOverdueLoanOrder;
                    //
                    n.array = [];
                    if (i > 0) {
                        if (n.channelName === data.data[i - 1].channelName) {
                            array[index].array.push(n)
                        } else {
                            array.push(n);
                            index++;
                        }
                    } else {
                        array.push(n);
                    }
                });
                $("#sumLoanOrder").text(sumLoanOrder);
                $("#firstLoanOrder").text(firstLoanOrder);
                $("#moreLoanOrder").text(moreLoanOrder);
                $("#overdueLoanOrder").text(overdueLoanOrder);
                $("#firstOfOverdueLoanOrder").text(firstOfOverdueLoanOrder);
                $("#moreOfOverdueLoanOrder").text(moreOfOverdueLoanOrder);
                $("#reBorrowingRate").text((moreLoanOrder/sumLoanOrder*100).toFixed(2)+"%");
                $("#firstLoan").text((firstLoanOrder===0?100:(firstOfOverdueLoanOrder/firstLoanOrder*100).toFixed(2))+"%");
                $("#rateOfOverdue").text((moreLoanOrder===0?100:(moreOfOverdueLoanOrder/moreLoanOrder*100).toFixed(2))+"%");

                // for (var i = 0; i < array.length; i++) {
                //     var dataList =
                //         '<tr class="footable-even" style="display: table-row;">' +
                //         '	<td class="footable-visible" rowspan="'+array[i].array.length+1+'">' + array[i].channelName + '</td>' +
                //         '	<td class="footable-visible">' + timeVal(array[i].limitPayTime) + '</td>' +
                //         '	<td class="footable-visible" style="text-align: center">' + array[i].sumLoanOrder + '</td>' +
                //         '	<td class="footable-visible" style="text-align: center">' + array[i].payLoanOrder + '</td>' +
                //         '	<td class="footable-visible" style="text-align: center">' + array[i].overdueLoanOrder + '</td>' +
                //         '	<td class="footable-visible" style="text-align: center">' + (array[i].sumLoanOrder === 0 ? 100 : (array[i].overdueLoanOrder / array[i].sumLoanOrder * 100).toFixed(2)) + '%</td>' +
                //         '	<td class="footable-visible" style="text-align: center">' + array[i].firstLoanOrder + '</td>' +
                //         '	<td class="footable-visible" style="text-align: center">' + array[i].firstOfOverdueLoanOrder + '</td>' +
                //         '	<td class="footable-visible" style="text-align: center">' + (array[i].firstLoanOrder === 0 ? 100 : (array[i].firstOfOverdueLoanOrder / array[i].firstLoanOrder * 100).toFixed(2)) + '%</td>' +
                //         '	<td class="footable-visible" style="text-align: center">' + array[i].moreLoanOrder + '</td>' +
                //         '	<td class="footable-visible" style="text-align: center">' + array[i].moreOfOverdueLoanOrder + '</td>' +
                //         '	<td class="footable-visible" style="text-align: center">' + (array[i].moreLoanOrder === 0 ? 100 : (array[i].moreOfOverdueLoanOrder / array[i].moreLoanOrder * 100).toFixed(2)) + '%</td>' +
                //         '</tr>';
                //     $('#dataList').append(dataList);
                //     for (var j = 0; j < array[i].array.length; j++) {
                //         var dataList1 =
                //             '<tr class="footable-even" style="display: table-row;">' +
                //             '	<td class="footable-visible">' + timeVal(array[i].array[j].limitPayTime) + '</td>' +
                //             '	<td class="footable-visible" style="text-align: center">' + array[i].array[j].sumLoanOrder + '</td>' +
                //             '	<td class="footable-visible" style="text-align: center">' + array[i].array[j].payLoanOrder + '</td>' +
                //             '	<td class="footable-visible" style="text-align: center">' + array[i].array[j].overdueLoanOrder + '</td>' +
                //             '	<td class="footable-visible" style="text-align: center">' + (array[i].array[j].sumLoanOrder === 0 ? 100 : (array[i].array[j].overdueLoanOrder / array[i].array[j].sumLoanOrder * 100).toFixed(2)) + '%</td>' +
                //             '	<td class="footable-visible" style="text-align: center">' + array[i].array[j].firstLoanOrder + '</td>' +
                //             '	<td class="footable-visible" style="text-align: center">' + array[i].array[j].firstOfOverdueLoanOrder + '</td>' +
                //             '	<td class="footable-visible" style="text-align: center">' + (array[i].array[j].firstLoanOrder === 0 ? 100 : (array[i].array[j].firstOfOverdueLoanOrder / array[i].array[j].firstLoanOrder * 100).toFixed(2)) + '%</td>' +
                //             '	<td class="footable-visible" style="text-align: center">' + array[i].array[j].moreLoanOrder + '</td>' +
                //             '	<td class="footable-visible" style="text-align: center">' + array[i].array[j].moreOfOverdueLoanOrder + '</td>' +
                //             '	<td class="footable-visible" style="text-align: center">' + (array[i].array[j].moreLoanOrder === 0 ? 100 : (array[i].array[j].moreOfOverdueLoanOrder / array[i].array[j].moreLoanOrder * 100).toFixed(2)) + '%</td>' +
                //             '</tr>';
                //         $('#dataList').append(dataList1);
                //     }
                // }
            } else {
                alert(data.msg);
            }
        },
        error:function() {
            alert("error");
        }
    });
}

// 一周之内
findMyCatalogue();
function findMyCatalogue() {
    var time = new Date();
    var time2 = new Date(time.getTime() - (7 * 24 * 60 * 60 * 1000));
    init(timeVal(time2),timeVal(time));
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