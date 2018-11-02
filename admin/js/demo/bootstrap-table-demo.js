(function(document, window, $) {
    $('#exampleTableEvents').bootstrapTable({
		method: 'get',
		url: "http://127.0.0.1:8080/api/json/news/get/all",
		dataType: "jsonp",
		pageSize: 8,
		pageNumber: 1,
		pageList: [1, 2, 5, 100, 200, 500],
		search: true,
		pagination: true,
		showRefresh: true,
		showToggle: true,
		showColumns: true,
		sidePagination:'server',
		iconSize: 'outline',
		toolbar: '#exampleTableEventsToolbar',
		 queryParams: function queryParams(params) {   //设置查询参数  
		    var param = {    
		        pageNum: params.pageNumber,    
		        pageSize: params.pageSize 
		    };    
		    return param;                   
		},
	    queryParamsType : "undefined",
	    responseHandler:function(data){
			//远程数据加载之前,处理程序响应数据格式,对象包含的参数: 我们可以对返回的数据格式进行处理
			//在ajax后我们可以在这里进行一些事件的处理
			return {
	    		"rows": data.data.list,  //返回我们需要填充的数据
	    		"total": data.data.total  //数据总数
	    	};
		},
	    icons: {
	        refresh: 'glyphicon-repeat',
	        toggle: 'glyphicon-list-alt',
	        columns: 'glyphicon-list'
	     },
	     columns: [
	          {
	            field: 'state',
	            checkbox: true,
	            align: 'center',
	            valign: 'middle'
	          }, 
	          {
	            title: 'ID',
	            field: 'id',
	            align: 'center',
	            valign: 'middle'
	          },
	          {
	            field: 'newsTitle',
	            title: '标题',
	            sortable: true,
	            align: 'center'
	          }, 
	          {
	            field: 'newsType',
	            title: '名称',
	            sortable: true,
	            align: 'center'
	          },
	          {
	            field: 'operate',
	            title: '操作',
	            align: 'center',
	            formatter: operateFormatter
	          }
	        ]
	   });			    
	})(document, window, jQuery);
	
	function operateFormatter(value, row, index) {
      return [
      	'<a href="add.html?id='+row.id+'" class="btn btn-sm btn-success"><i class="fa fa-search"></i>查看 </a> ',
      	'<a href="add.html?id='+row.id+'" class="btn btn-sm btn-info"><i class="fa fa-pencil"></i> 编辑 </a> ',
        '<a href="add.html?id='+row.id+'" class="btn btn-sm btn-danger"><i class="fa fa-remove"></i> 删除 </a> '
      ].join('');
    }