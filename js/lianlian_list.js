var currentPage = 1;
var payOutMethod ='';
var payOutType = '';
var userName='';
var userMobile='';
var begin ='';
//我的权限数组
var jName = getCookie('Jname');
var arrayTitle = new Array;
var lianlian = {
	init:function(currentPage){
	    if($.trim(currentPage) == ''){
            currentPage = 1;
        }
        $("#thislist").html("");
        $.ajax({
            url: urlcore + "/api/or/accountchecking?begin=" + begin + "&payOutMethod=" + payOutMethod + "&payOutType=" + payOutType + "&currentPage=" + currentPage
            +"&name="+userName+"&mobile="+userMobile,
            // url: urlcore + "/api/user/accountchecking?begin=" + begin + "&payOutMethod=" + payOutMethod + "&payOutType=" + payOutType + "&currentPage=" + currentPage,
            type: "get",
            dataType: 'json',
            async:'false',
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                if(data.success == true) {
                    $.each(data.data.list, function(i, n) {
                        var payOutType;
                        if($.trim(n.payOutType) == 1){
                            payOutType = "申请";
                        }else if(n.payOutType == 2){
                            payOutType = "续借";
                        }else{
                            payOutType = n.payOutType;
                        }
                        var payOutMethod;
                        if(n.payOutMethod == 1){
                            payOutMethod = "手动";
                        }else if(n.payOutMethod == 3){
                            payOutMethod = "自动";
                        }else{
                            payOutMethod = n.payOutMethod;
                        }
                        var bank;
                        if($.trim(n.bank) == ''){
                            bank = '-'
                        }else{
                            bank = n.bank;
                        }
                        var id = n.id;
                        if(n.payOutMethod == 1){
                            var thislist =
                                '<tr class="footable-even" style="display: table-row;">' +
                                '<td class="footable-visible">' + n.id + '</td>' +
                                '<td class="footable-visible">' + n.userMobile + '</td>' +
                                '<td class="footable-visible">' + n.userName + '</td>' +
                                '<td class="footable-visible">' + n.money + '</td>' +
                                '<td class="footable-visible">' + n.realMoney + '</td>' +
                                '<td class="footable-visible">' + payOutType + '</td>' +
                                '<td class="footable-visible">' + n.beginTime + '</td>' +
                                '<td class="footable-visible">' + n.endTime + '</td>' +
                                '<td class="footable-visible">' + n.applyTime + '</td>' +
                                '<td class="footable-visible">' +  '已放款'+ '</td>' +
                                '<td class="footable-visible">' + payOutMethod + '</td>' +
                                '<td class="footable-visible">'+  n.desp+ '</td>'+
                                '<td class="footable-visible">'+ bank+ '</td>'+
                                '<td class="footable-visible">'+ n.bankNum+ '</td>'+
                                '<td class="footable-visible">'+ n.payOutTime+ '</td>'
                            '</tr>';
                        }else{
                            var thislist =
                                '<tr class="footable-even" style="display: table-row;">' +
                                '<td class="footable-visible">' + n.id + '</td>' +
                                '<td class="footable-visible">' + n.userMobile + '</td>' +
                                '<td class="footable-visible">' + n.userName + '</td>' +
                                '<td class="footable-visible">' + n.money + '</td>' +
                                '<td class="footable-visible">' + n.realMoney + '</td>' +
                                '<td class="footable-visible">' + payOutType + '</td>' +
                                '<td class="footable-visible">' + n.beginTime + '</td>' +
                                '<td class="footable-visible">' + n.endTime + '</td>' +
                                '<td class="footable-visible">' + n.applyTime + '</td>' +
                                '<td class="footable-visible">' +  '已放款'+ '</td>' +
                                '<td class="footable-visible"  style="color: red;">' + payOutMethod + '</td>' +
                                '<td class="footable-visible">'+  n.desp+ '</td>'+
                                '<td class="footable-visible">'+ bank+ '</td>'+
                                '<td class="footable-visible">'+ n.bankNum+ '</td>'+
                                '<td class="footable-visible">'+ n.payOutTime+ '</td>'
                            '</tr>';
                        }
                        $('#thislist').append(thislist);
                    });
                    $.each(arrayTitle, function(i,k) {
                        $('button[name="'+k+'"]').attr("hidden",false).attr("class","btn btn-sm btn-primary exportFile");
                    });
                    $('#totalMoney').text(data.data.totalMoney);
                    $("#pager").pager({
                        pagenumber: currentPage,
                        pagecount: data.data.pages,
                        totalcount: data.data.total,
                        buttonClickCallback: lianlian.pageClick
                    });
                    $("#papercount").html(data.data.total)
                    if(data.code == 'OVERTIME') {
                        var thisUrl = window.location.href;
                        if(thisUrl.indexOf('login.html') <= -1) {
                            top.window.location.href = "login.html";
                        }
                    } else {
                        if(data.msg != '空数据') {
                            //alert(data.msg)
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
	},
    pageClick:function(pageclickednumber){
	    lianlian.init(pageclickednumber);
    },
    searchList:function(){
        payOutMethod =$('#payOutMethod').val();
        payOutType = $('#payOutType').val();
        begin =$('#begin').val();
        userName = $('#userName').val().trim();
        userMobile = $('#userMobile').val().trim();
        lianlian.init();
    },

    exportFile:function(){
        payOutMethod =$('#payOutMethod').val();
        payOutType = $('#payOutType').val();
        begin =$('#begin').val();
        userName = $('#userName').val().trim();
        userMobile = $('#userMobile').val().trim();
        window.location.href = urlcore + "/api/or/ef?begin=" + begin + "&payOutMethod=" + payOutMethod + "&payOutType=" + payOutType;
    },
    findMyCatalogue: function() {
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
}
