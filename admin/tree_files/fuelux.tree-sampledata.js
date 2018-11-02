var DataSourceTree = function(options) {
	this._data 	= options.data;
	this._delay = options.delay;
}

DataSourceTree.prototype.data = function(options, callback) {
	var self = this;
	var $data = null;

	if(!("name" in options) && !("type" in options)){
		$data = this._data;//the root tree
		callback({ data: $data });
		return;
	}
	else if("type" in options && options.type == "folder") {
		if("additionalParameters" in options && "children" in options.additionalParameters)
			$data = options.additionalParameters.children;
		else $data = {}//no data
	}
	
	if($data != null)//this setTimeout is only for mimicking some random delay
		setTimeout(function(){callback({ data: $data });} , parseInt(Math.random() * 500) + 200);

	//we have used static data here
	//but you can retrieve your data dynamically from a server using ajax call
	//checkout examples/treeview.html and examples/treeview.js for more info
};

var tree_data = {
	'系统设置与角色管理' : {name: '系统设置与角色管理', type: 'folder'},
	'渠道商管理' : {name: '渠道商管理', type: 'folder'}	,
	'会员管理' : {name: '会员管理', type: 'folder'}	,
	'审核管理' : {name: '审核管理', type: 'folder'}	,
	'催款管理' : {name: '催款管理', type: 'folder'}	,
	'数据统计' : {name: '数据统计', type: 'folder'}	,
    '充值管理' : {name: '充值管理', type: 'folder'}	,
	'数据修复' : {name: '数据修复', type: 'folder'},
	'黑白名单查询': {name: '黑白名单查询', type: 'folder'}
}
tree_data['系统设置与角色管理']['additionalParameters'] = {
	'children' : {
        '参数设置' : {name: '参数设置', type: 'folder'},
		'利率设置' : {name: '利率设置', type: 'folder'},
        '系统管理员' : {name: '系统管理员', type: 'folder'},
        '角色列表' : {name: '角色列表', type: 'folder'},
        '部门列表' : {name: '部门列表', type: 'folder'},
        '金主列表' : {name: '金主列表', type: 'folder'},
        '登录日志' : {name: '登录日志', type: 'folder'}
	}
}
tree_data['渠道商管理']['additionalParameters'] = {
    'children' : {
        '渠道商列表' : {name: '渠道商列表', type: 'folder'},
        '渠道转换率详情' : {name: '渠道转换率详情', type: 'folder'},
        '渠道转换率汇总' : {name: '渠道转换率汇总', type: 'folder'},
        '渠道逾期明细' : {name: '渠道逾期明细', type: 'folder'}
    }
}
tree_data['会员管理']['additionalParameters'] = {
	'children' : {
		'会员列表' : {name: '会员列表', type: 'folder'}
	}
}
tree_data['审核管理']['additionalParameters'] = {
	'children' : {
        '待放款管理' : {name: '待放款管理', type: 'folder'},
        '风控拒绝' : {name: '风控拒绝', type: 'folder'},
        '放款记录' : {name: '放款记录', type: 'folder'},
        '正常还款' : {name: '正常还款', type: 'folder'},
        '审核统计' : {name: '审核统计', type: 'folder'},
        '恢复名单' : {name: '恢复名单', type: 'folder'},
	}
}
tree_data['催款管理']['additionalParameters'] = {
    'children' : {
        '正常待还款客户' : {name: '正常待还款客户', type: 'folder'},
        '逾期待催款客户' : {name: '逾期待催款客户', type: 'folder'},
        '我的催收列表' : {name: '我的催收列表', type: 'folder'},
        '催收中心' : {name: '催收中心', type: 'folder'},
        '催收统计' : {name: '催收统计', type: 'folder'},
        '黑名单' : {name: '黑名单', type: 'folder'}
    }
}
tree_data['数据统计']['additionalParameters'] = {
    'children' : {
        '统计报表' : {name: '统计报表', type: 'folder'},
        '放款对账' : {name: '放款对账', type: 'folder'},
        '还款统计' : {name: '还款统计', type: 'folder'}
    }
}
tree_data['数据修复']['additionalParameters'] = {
    'children' : {
        '数据修复详情' : {name: '数据修复详情', type: 'folder'}
    }
}

tree_data['充值管理']['additionalParameters'] = {
    'children' : {
        '金主充值' : {name: '金主充值', type: 'folder'},
        '超级管理员充值' : {name: '超级管理员充值', type: 'folder'}
    }
}
tree_data['黑白名单查询']['additionalParameters'] = {
    'children' : {
        '黑白名单列表' : {name: '黑白名单列表', type: 'folder'}
    }
}

findAll();
function findAll(){
	$.ajax({
		url: urlcore + "/api/thirdCatalogue/findAll?roleId="+roleId,
		type: "GET",
		async: false,
		dataType: 'json',
		contentType: "application/json;charset=utf-8",
		success:function(data){
			if (data.success == true) {
				$.each(data.data, function(i,n) {
					var html = '{"children":{';
					$.each(n.first.second.third, function(m,l) {
						if (m != 0) {
							html+=",";
						}
						if (l.select == 1) {
							myArray.push(l.data);
						}
						html+='"'+l.title+'":{"name":"'+l.title+'","type": "item","data":'+l.data+',"selected":'+l.select+'}';
					});
					html+="}}";
					// console.log(html);
					html = jQuery.parseJSON(html);
					tree_data[''+n.first.title+'']['additionalParameters']['children'][''+n.first.second.title+'']['additionalParameters']=html
				});
				//去重
				common.distinct(myArray);
			} else {
				alert(data.msg);
			}
 
		},
		error:function() {
			alert("error");
		}
	});
}

var treeDataSource = new DataSourceTree({data: tree_data});
