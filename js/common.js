$('.btn-add-message').click(function () {
    console.log('add message');
    $(".modal-message-title").text("添加资讯");
    $('.modal-message').modal();
});
$('.btn-add-subject').click(function () {
    console.log('add subject');
    $(".modal-subject-title").text("添加课程");
    $('.modal-subject').modal();
});
// $('.btn-add-student').click(function () {
//     console.log('add subject');
//     $(".modal-add-student-title").text("添加课程");
//     $('.modal-add-student').modal();
// });


function initAdminAddTable() {  
    //先销毁表格  
    $('.add-student-table').bootstrapTable('destroy');  
    //初始化表格,动态从服务器加载数据  
    $('.add-student-table').bootstrapTable({
         // 'load': data
         url: '123.206.211.185:8080/cs/admin/students',         //请求后台的URL（*）
         dataType: "json",
         contentType: 'application/json,charset=utf-8',
         method: 'get',                      //请求方式（*）
         dataField: "data",
         //toolbar: '#toolbar',                //工具按钮用哪个容器
         striped: true,                      //是否显示行间隔色
         cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
         pagination: true,                   //是否显示分页（*）
         sortable: false,                     //是否启用排序
         sortOrder: "asc",                   //排序方式
         queryParams: function(params) {
            return {
                page: 1,
                pageSize: 10
            };
         },
         sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
         pageNumber: 1,                       //初始化加载第一页，默认第一页
         pageSize: 10,                       //每页的记录行数（*）
         pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
         search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
         strictSearch: true,
         showColumns: true,                  //是否显示所有的列
         showRefresh: true,                  //是否显示刷新按钮
         minimumCountColumns: 2,             //最少允许的列数
         clickToSelect: true,                //是否启用点击选中行
         height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
         uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
         showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
         cardView: false,                    //是否显示详细视图
         detailView: false,                   //是否显示父子表
         pagination: true,
         responseHandler: function(res) {
            console.log(res);
            if (res.data && res.data.pages>0) {
                return {
                    "total": res.data.pages,//总页数
                    "rows": res.data.list   //数据    
                };
            } else {
                return {
                    "total": 0,
                    "rows": []
                };
            }
        },
        columns: [{
             checkbox: true
         }, {
             field: 'stuId',
             title: '学号'
         }, {
             field: 'gender',
             title: '性别'
         }, {
             field: 'name',
             title: '姓名'
         }, {
             field: 'academy',
             title: '所在学院'
         }, {
             field: 'major',
             title: '专业'
         }, {
             field: 'classNum',
             title: '班级'
         }, {
             field: 'birthday',
             title: '生日'
         } ],
         onLoadSuccess: function(){  //加载成功时执行
                console.info("加载成功");
          },
          onLoadError: function(){  //加载失败时执行
                console.info("加载数据失败");
          }
     });
}  

$(document).ready(function () {          
  //调用函数，初始化表格  
  initAdminAddTable();  

  //当点击查询按钮的时候执行  
  $(".btn-student").bind("click", initAdminAddTable);  
});