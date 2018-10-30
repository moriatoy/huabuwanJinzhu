var $table = $("#loadTable");


$(function () {
    initOrdersTable($table);
});


var columns = [
    {
        checkbox: true,
    }, {
        title: "序号",
        align: "center",
        width: "50px",
        formatter: function (value, row, index) {
            return (index + 1);
        }
    }, {
        field: "userName",
        title: "姓名",
        align: "center"
    }, {
        field: "idCard",
        title: "身份证号码",
        align: "center",
    }, {
        field: "score",
        title: "芝麻分",
        align: "center"
    }, {
        field: "addtime",
        title: "添加时间",
        align: "center",
        sortable: true,
        formatter: function (value, row, index) {
            var time =row.addtime;
            return formatDate(time,"yyyy-MM-dd");
        }
    }];

var queryParams = function (params) {
    var param = {
        condition: {
            userName:$("#userName").val(),
            idCard:$("#idCard").val(),
            score:$("#score").val()
        },
        offset: params.offset,
        current: params.offset / params.limit + 1,//bootstrap-table分页参数offset从0开始，计算的后端当前页参数current=(offset/limit+1)，
        size: params.limit
    };

    return param;
}

//初始化表格 tableins:表格实例 ,
function initOrdersTable(tableins) {
    tableins.bootstrapTable({
        columns: columns,
        method: "post",
        url: urlcore + "/api/userZhima/zhimaList",
        dataType: "json",
        queryParams: function (params) {
            return queryParams(params);
        },
        //返回数据预处理
        responseHandler: function (cbdata) {
            if (null != cbdata.data && null != cbdata.data.records) {
                var records = cbdata.data.records;
                var res = {
                    //如果采用server端分页，必须有rows和total这两部分数据
                    "rows": records,
                    "total": cbdata.data.total
                };
                return res;
            } else return {"rows": [], "total": 0};
        },
        cache: false,
        uniqueId: "id",
        // toolbar: '#userListToolbar',//自定义工具栏，不同表格工具栏不同，一个jQuery 选择器，指明自定义的toolbar 例如:#toolbar, .toolbar.
        pagination: true,//启用分页条
        sidePagination: "server",//分页方式client或server
        // pageNumber: 1,
        pageSize: 16,//每页大小
        pageList: [16, 32, 48, 64],//可以选择每页大小
        //showRefresh: true,//显示刷新
        sortable: true,//是否启用排序
        clickToSelect: true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
        //search: true,//默认为客户端搜索，服务器端接收params中的searchText后可以做服务器端搜索
        // searchText:"",//初始搜索文本
    });
}

//冻结 恢复

function changStatus(id,status) {
    $.ajax({
        type: "POST",
        url: urlcore + "/api/user/updateStatus",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({
            id:id,
            status:status
        }),
        success: function (data) {//data是返回的hash,key之类的值，key是定义的文件名
            if (data.success == true) {
                location.reload();
            } else {
                alert(data.msg);
            }
        },
        error: function () {
            alert("失败");
        }
    });
}

//搜索
$('#dosearch').click(function() {

    var params = $('#loadTable').bootstrapTable('getOptions');
    $('#loadTable').bootstrapTable('refresh', params);

});
