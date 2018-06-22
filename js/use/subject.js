$('.btn-add-subject').click(function () {
    console.log('add subject');
    $(".modal-add-subject-title").text("课程添加");
    $('.modal-add-subject').modal();
    $('.modal-add-subject .btn-primary').on('click', function() {
        layer.confirm('请确认添加课程信息是否有误', {  
            btn: ['确定', '取消']   
        }, function(index) {  
            layer.close(index);  
            $.ajax({
                type: "post",
                url: `http://123.206.211.185:8080/cs/admin/cmaps/`,
                contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                data: `courseCode=${$('.modal-add-subject .courseCode').val()}&courseName=${$('.modal-add-subject .courseName').val()}`,
                success: function success(res) {
                    console.log(res);
                    if (res.status==0) {
                        layer.alert('添加成功', {  
                           icon: 1  
                        });  
                        $('button[name="refresh"]').click();
                        console.log('add subject account successfully! and refresh');
                        $('.modal-add-subject button[data-dismiss="modal"]').click();
                    } else {
                        layer.alert(res.msg, {  
                           icon: 2  
                       });  
                        console.log('failed add subject account '+$('.courseCode').val());
                    }
                },
                error: function(a) {  
                   layer.alert('添加失败', {  
                       icon: 2  
                   });  
               },  
               dataType: 'json'  
            });
        });  
    });
});
$(document).ready(function() {
    initSubjectTable();
});
//当点击查询按钮的时候执行  
$(".btn-subject").bind("click", function () {  
    //先销毁表格  
    $('.add-subject-table').bootstrapTable('destroy');  
    //初始化表格,动态从服务器加载数据  
    initSubjectTable();
}); 
$('.btn-add-class').bind('click', function() {
    console.log('clicked btn add class');
    $('.add-subject-table').bootstrapTable('destroy');  
    initSubjectTable();
})
function initSubjectTable() {
    $('.add-subject-table').bootstrapTable({
         url: 'http://123.206.211.185:8080/cs/admin/cmaps?',         //请求后台的URL（*）
         method: 'get',      
         toolbar: '.admin-subject .toolbar',                //工具按钮用哪个容器
         striped: true,                      //是否显示行间隔色
         cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
         pagination: true,                   //是否显示分页（*）
         sortable: false,                     //是否启用排序
         sortOrder: "asc",                   //排序方式
         queryParams: function(params) {
            return {
                page: getNowPage(),
                pageSize: getPageSize()
            };
         },
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
            if (res.data && res.data.pages>0) {
                result =  {
                    "total": res.data.total,//总数据条数
                    "rows": res.data.list   //数据    
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
             field: 'courseCode',
             title: '课程代号',
             align: 'center'
         }, {
             field: 'courseName',
             title: '课程名称',
             align: 'center'
         }, {
            field:"action",
            title:"操作",
            align:"center",
            formatter: function(value,row,index){ 
            // return  '<a href="javascript:void(0);" onclick="removesubjectData('+ "'"+row.courseCode+"'" +')" style="margin-left:5px;"><li class="glyphicon glyphicon-remove"></li></a>';
                return '<a href="javascript:void(0);" onclick="removesubjectData('+ "'"+row.courseCode+"'" +')" style="margin-left:5px;"><li class="glyphicon glyphicon-remove"></li></a>'+
                '<a href="javascript:void(0);" onclick="addsubjectClass('+"'"+row.courseCode+"'"+')" style="margin-left:5px;"><li class="glyphicon glyphicon-plus "></li></a>';
            },
            edit:false},  ],
            onClickRow: function (row, $element) {
                curRow = row;
                console.log(curRow);
            },
            onLoadSuccess: function(){  //加载成功时执行
                console.info("加载成功");
            },
            onLoadError: function(){  //加载失败时执行
                console.info("加载数据失败");
            },
     });
} 
function addsubjectClass(courseCode) {
    var childLists=$$('.admin-subject tr[data-uniqueid="'+courseCode+'"]').children;
    $$('.modal-add-class .courseCode').value=childLists[2].innerHTML;

    $(".modal-add-class-title").text("教学班添加");
    $('.modal-add-class').modal();
    $('.modal-add-class .btn-primary').on('click', function() {
        layer.confirm('请确认添加教学班信息是否有误', {  
            btn: ['确定', '取消']   
        }, function(index) {  
            layer.close(index);  
            $.ajax({
                type: "post",
                url: `http://123.206.211.185:8080/cs/admin/jxbs?`,
                contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                data: `courseCode=${$('.modal-add-class .courseCode').val()}&hashDay=${$('.modal-add-class .hashDay').val()}&hashLesson=${$('.modal-add-class .hashLesson').val()}&period=${$('.modal-add-class .period').val()}&classRoom=${$('.modal-add-class .classRoom').val()}&teacherId=${$('.modal-add-class .teacherId').val()}&week=${$('.modal-add-class .week').val()}&numLimit=${$('.modal-add-class .numLimit').val()}&credit=${$('.modal-add-class .credit').val()}&type=${$('.modal-add-class .type').val()}`,
                success: function success(res) {
                    console.log(res);
                    if (res.status==0) {
                        layer.alert('添加成功', {  
                           icon: 1  
                        });  
                        $('button[name="refresh"]').click();
                        console.log('add class account '+$('.stuId').val()+' successfully! and refresh');
                        $('.modal-add-class button[data-dismiss="modal"]').click();
                    } else {
                        layer.alert(res.msg, {  
                           icon: 2  
                       });  
                        console.log('failed add class account '+$('.stuId').val());
                    }
                },
                error: function(a) {  
                   layer.alert('添加失败', {  
                       icon: 2  
                   });  
               },  
               dataType: 'json'  
            });
        });  
    });
}

function removesubjectData(courseCode) {
    layer.confirm('您确定要删除课程代号为 ' + courseCode + ' 的课程吗?', {  
        btn: ['确定', '取消']   
    }, function(index) {  
        layer.close(index);  
        $.ajax({
            type: "delete",
            url: `http://123.206.211.185:8080/cs/admin/cmaps/${courseCode}`,
            success: function success(res) {
                // res=JSON.parse(res);
                if (res.status==0) {
                    layer.alert('删除成功', {  
                       icon: 1  
                    });  
                    $('button[name="refresh"]').click();
                    console.log('delete subject account '+courseCode+' successfully! and refresh');
                } else {
                    console.log('failed delete subject account '+courseCode);
                }
            },
            error: function(a) {  
               layer.alert('删除失败', {  
                   icon: 2  
               });  
           },  
           dataType: 'json'  
        });
    });  
}
function getNowPage() {
    var res;
    if ($$('.admin-subject .pagination .active a')) {
        res = parseInt($$('.admin-subject .pagination .active a').innerText);
    } else {
        res = 1;
    }
    console.log(res);
    return res;
}
function getPageSize() {
    var res;
    if ($$('.admin-subject .page-size')) {
        res = parseInt($$('.admin-subject .page-size').innerText);
    } else {
        res = 10;
    }
    console.log(res);
    return res;
}