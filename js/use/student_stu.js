$(document).ready(function() {
    f();
});

//当点击查询按钮的时候执行  
$(".btn-major-class").bind("click", function () {  
    //先销毁表格  
    $('.table-major-class').bootstrapTable('destroy');  
    //初始化表格,动态从服务器加载数据  
    f();
}); 
function f() {
    $('.table-major-class').bootstrapTable({
         url: 'http://123.206.211.185:8080/cs/student/courses',         //请求后台的URL（*）
         method: 'GET',      
         // toolbar: '.admin-subject .toolbar',                //工具按钮用哪个容器
         striped: true,                      //是否显示行间隔色
         cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
         pagination: true,                   //是否显示分页（*）
         sortable: false,                     //是否启用排序
         sortOrder: "asc",                   //排序方式
         sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
         pageNumber: 1,                       //初始化加载第一页，默认第一页
         pageSize: 30,                       //每页的记录行数（*）
         pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
         search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
         searchOnEnterKey: true,
         queryParamsType:'limit',
         // trimOnSearch: true;
         strictSearch: true,
         showColumns: true,                  //是否显示所有的列
         showRefresh: true,                  //是否显示刷新按钮
         minimumCountColumns: 2,             //最少允许的列数
         // clickToSelect: true,                //是否启用点击选中行
         height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
         uniqueId: "courseCode",                     //每一行的唯一标识，一般为主键列
         showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
         cardView: false,                    //是否显示详细视图
         detailView: false,                   //是否显示父子表
         pagination: true,
         showPaginationSwitch:true,
         queryParams: function(params) {
            return {
                page: getNowStuClassPage(),
                pageSize: getStuClassPageSize()
            };
         },
         responseHandler: function(res) {
            console.log(res);
            var result;
            if (res.data && res.data.length>0) {
                result =  {
                    "total": res.data.length,//总数据条数
                    "rows": res.data   //数据    
                };
            } else {
                result = {
                    "total": 0,
                    "rows": []
                };
            }
            console.log(result);
            return result;
        },
        columns: [{
             checkbox: true,
         }, {
             field: 'id',
             title: '序号',
             align: 'center'
         }, {
             field: 'teacher',
             title: '任课教师',
             align: 'center'
         }, {
             field: 'jxbName',
             title: '课程名称',
             align: 'center'
         },  {
            field: 'classRoom',
            title: '上课地点',
            align: 'center'
         }, {
              title: '上课时间',
              align: 'center',
              formatter: function(value,row,index){  
                  return row.day+""+row.lesson+" "+row.rawWeek;
              },
         }, {
            field:"action",
            title:"操作",
            align:"center",
            formatter: function(value,row,index){  
                var s=row.teaId+'';
                return '<a href="javascript:void(0);" onclick="selectClickedCourse('+"'"+row.jxbId+"','"+row.jxbName+"'"+')" style="margin-left:5px;"><li class="glyphicon glyphicon-ok"></li></a>'+
                '<a href="javascript:void(0);" onclick="cancelClickedCourse('+"'"+row.jxbId+"','"+row.jxbName+"'"+')" style="margin-left:15px;"><li class="glyphicon glyphicon-remove"></li></a>';  
            },
            edit:false},],
        onLoadSuccess: function(){  //加载成功时执行
            console.info("加载成功");
        },
        onLoadError: function(){  //加载失败时执行
            console.info("加载数据失败");
        },
     });
}
function selectClickedCourse(jxbId, jxbName) {

    $.ajax({
        type: "POST",
        url: `http://123.206.211.185:8080/cs/student/cs.do?jxbId=${jxbId}&token=${localStorage.getItem('stuId')}`,
        success: function success(res) {
            console.log(res);
            if (res.status==0) {
                layer.alert(`你成功选上了 ${jxbName} 课程`, {  
                   icon: 1  
                });  
            } else {
                layer.alert(res.msg, {  
                   icon: 2  
               });  
                console.log('failed add teacher account ');
            }
        },
        error: function(a) {  
           layer.alert('添加失败', {  
               icon: 2  
           });  
       },  
       dataType: 'json'  
    });
}
function cancelClickedCourse(jxbId, jxbName) {
    $.ajax({
        type: "DELETE",
        url: `http://123.206.211.185:8080/cs/student/courses?jxbId=${jxbId}&token=${localStorage.getItem('stuId')}`,
        success: function success(res) {
            console.log(res);
            if (res.status==0) {
                layer.alert(`你成功取消了 ${jxbName} 课程`, {  
                   icon: 1  
                });  
            } else {
                layer.alert(res.msg, {  
                   icon: 2  
               });  
                console.log('failed add teacher account ');
            }
        },
        error: function(a) {  
           layer.alert('取消选课失败', {  
               icon: 2  
           });  
       },  
       dataType: 'json'  
    });
}
function getNowStuClassPage() {
    var res;
    if ($$('.admin-subject .pagination .active a')) {
        res = parseInt($$('.admin-subject .pagination .active a').innerText);
    } else {
        res = 1;
    }
    console.log(res);
    return res;
}
function getStuClassPageSize() {
    var res;
    if ($$('.admin-subject .page-size')) {
        res = parseInt($$('.admin-subject .page-size').innerText);
    } else {
        res = 10;
    }
    console.log(res);
    return res;
}



$('.btn-class').bind("click", function () {  
    console.log('test');
    $('.student-subject-list').bootstrapTable('destroy');
    $('.student-subject-list').bootstrapTable({
         url: `http://123.206.211.185:8080/cs/student/courses/20150000`,         //请求后台的URL（*）
         method: 'get',      
         // toolbar: '.admin-subject .toolbar',                //工具按钮用哪个容器
         striped: true,                      //是否显示行间隔色
         cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
         pagination: true,                   //是否显示分页（*）
         sortable: false,                     //是否启用排序
         sortOrder: "asc",                   //排序方式
         // queryParams: function(params) {
         //    return {
         //        page: getNowPage(),
         //        pageSize: getPageSize()
         //    };
         // },
         sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
         pageNumber: 1,                       //初始化加载第一页，默认第一页
         pageSize: 10,                       //每页的记录行数（*）
         pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
         search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
         searchOnEnterKey: true,
         queryParamsType:'limit',
         // trimOnSearch: true;
         strictSearch: true,
         showColumns: true,                  //是否显示所有的列
         showRefresh: true,                  //是否显示刷新按钮
         minimumCountColumns: 2,             //最少允许的列数
         // clickToSelect: true,                //是否启用点击选中行
         height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
         uniqueId: "courseCode",                     //每一行的唯一标识，一般为主键列
         showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
         cardView: false,                    //是否显示详细视图
         detailView: false,                   //是否显示父子表
         pagination: true,
         showPaginationSwitch:true,
         responseHandler: function(res) {
            console.log(res);
            var result;
            if (res.data && res.data.length>0) {
                result =  {
                    "total": res.data.length,//总数据条数
                    "rows": res.data   //数据    
                };
            } else {
                result = {
                    "total": 0,
                    "rows": []
                };
            }
            console.log(result);
            return result;
        },
        columns: [{
             checkbox: true,
         }, {
             field: 'id',
             title: '序号',
             align: 'center'
         }, {
             field: 'teacher',
             title: '任课教师',
             align: 'center'
         }, {
             field: 'jxbName',
             title: '课程名称',
             align: 'center'
         },  {
            field: 'classRoom',
            title: '上课地点',
            align: 'center'
         }, {
              title: '上课时间',
              align: 'center',
              formatter: function(value,row,index){  
                  return row.day+""+row.lesson+" "+row.rawWeek;
              },
         }, {
             field: 'type',
             title: '课程类别',
             align: 'center'
         }],
        onLoadSuccess: function(){  //加载成功时执行
            console.info("加载成功");
        },
        onLoadError: function(){  //加载失败时执行
            console.info("加载数据失败");
        },
     });

});
