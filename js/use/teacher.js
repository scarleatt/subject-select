$('.btn-add-teacher').click(function () {
    console.log('add subject');
    $(".modal-add-teacher-title").text("教师添加");
    $('.modal-add-teacher').modal();
    $('.modal-add-teacher .btn-primary').on('click', function() {
        layer.confirm('请确认添加账号信息是否有误', {  
            btn: ['确定', '取消']   
        }, function(index) {  
            layer.close(index);  
            $.ajax({
                type: "post",
                url: `http://123.206.211.185:8080/cs/admin/teachers/`,
                contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                data: `teaId=${$('.modal-add-teacher .teaId').val()}&name=${$('.modal-add-teacher .name').val()}&aid=${$('.modal-add-teacher .aid').val()}&major=${$('.modal-add-teacher .major').val()}&position=${$('.modal-add-teacher .position').val()}&password=${$('.modal-add-teacher .password').val()}`,
                success: function success(res) {
                    console.log(res);
                    if (res.status==0) {
                        layer.alert('添加成功', {  
                           icon: 1  
                        });  
                        $('button[name="refresh"]').click();
                        console.log('add teacher account '+$('.teaId').val()+' successfully! and refresh');
                        $('.modal-add-teacher button[data-dismiss="modal"]').click();
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
        });  
    });
});

  //当点击查询按钮的时候执行  
$(".btn-teacher").bind("click", function () {  
    console.log('teacher list');
    //先销毁表格  
    $('.add-teacher-table').bootstrapTable('destroy');  
    //初始化表格,动态从服务器加载数据  
    $('.add-teacher-table').bootstrapTable({
         url: 'http://123.206.211.185:8080/cs/admin/teachers?',         //请求后台的URL（*）
         dataType: "json",
         contentType: 'application/json,charset=utf-8', 
         method: 'get',      
         toolbar: '.admin-teacher .toolbar',                //工具按钮用哪个容器
         striped: true,                      //是否显示行间隔色
         cache: true,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
         pagination: true,                   //是否显示分页（*）
         sortable: false,                     //是否启用排序
         sortOrder: "asc",                   //排序方式
         queryParams: function(params) {
            return {
                page: getTeacherNowPage(),
                pageSize: getTeacherPageSize()
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
         uniqueId: "teaId",                     //每一行的唯一标识，一般为主键列
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
             field: 'teaId',
             title: '工号',
             align: 'center'
         }, {
             field: 'name',
             title: '姓名',
             align: 'center'
         }, {
             field: 'aid',
             title: '学院代号',
             align: 'center'
         }, {
             field: 'major',
             title: '学院名称',
             align: 'center'
         }, {
             field: 'position',
             title: '职称',
             align: 'center',
             formatter: function(value, row, index) {
                if (value=='NULL') return '-';
                else return value;
             }
         }, {
            field:"action",
            title:"操作",
            align:"center",
            formatter: function(value,row,index){  
                var s=row.teaId+'';
                return '<a href="javascript:void(0);" onclick="editteacherData('+"'"+row.teaId+"'"+')" style="margin-left:5px;"><li class="glyphicon glyphicon-pencil"></li></a>'+
                '<a href="javascript:void(0);" onclick="removeteacherData('+"'"+row.teaId+"'"+')" style="margin-left:5px;"><li class="glyphicon glyphicon-remove"></li></a>';  
            },
            edit:false} ],
        onLoadSuccess: function(){  //加载成功时执行
            console.info("加载成功");
        },
        onLoadError: function(){  //加载失败时执行
            console.info("加载数据失败");
        },
     });
});  
function getTeacherSubjects(teaId) {
    $.ajax({
        type: "delete",
        url: `http://123.206.211.185:8080/cs/admin/teachers/${teaId}`,
        success: function success(res) {
            if (res.status==0) {
                layer.alert('删除成功', {  
                   icon: 1  
                });  
                $('button[name="refresh"]').click();
                console.log('delete teacher account '+teaId+' successfully! and refresh');
            } else {
                console.log('failed delete teacher account '+teaId);
            }
        },
        error: function(a) {  
           layer.alert('删除失败', {  
               icon: 2  
           });  
       },  
       dataType: 'json'  
    });
}

function removeteacherData(teaId) {
    layer.confirm('您确定要删除工号为 ' + teaId + ' 老师的账号吗?', {  
        btn: ['确定', '取消']   
    }, function(index) {  
        layer.close(index);  
        $.ajax({
            type: "delete",
            url: `http://123.206.211.185:8080/cs/admin/teachers/${teaId}`,
            success: function success(res) {
                if (res.status==0) {
                    layer.alert('删除成功', {  
                       icon: 1  
                    });  
                    $('button[name="refresh"]').click();
                    console.log('delete teacher account '+teaId+' successfully! and refresh');
                } else {
                    console.log('failed delete teacher account '+teaId);
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
function getTeacherNowPage() {
    var res;
    if ($$('.admin-teacher .pagination .active a')) {
        res = parseInt($$('.admin-teacher .pagination .active a').innerText);
    } else {
        res = 1;
    }
    console.log(res);
    return res;
}
function getTeacherPageSize() {
    var res;
    if ($$('.admin-teacher .page-size')) {
        res = parseInt($$('.admin-teacher .page-size').innerText);
    } else {
        res = 10;
    }
    console.log(res);
    return res;
}
function editteacherData(teaId) {
    $(".modal-edit-teacher-title").text("教师信息修改");
    var childLists=$$('tr[data-uniqueid="'+teaId+'"]').children;
    console.log(childLists[1].innerHTML);
    $$('.modal-edit-teacher .teaId').value=childLists[1].innerHTML;
    $$('.modal-edit-teacher .name').value=childLists[2].innerHTML;
    $$('.modal-edit-teacher .aid').value=childLists[3].innerHTML;
    $$('.modal-edit-teacher .major').value=childLists[4].innerHTML;
    $$('.modal-edit-teacher .position').value=childLists[5].innerHTML;

    $('.modal-edit-teacher').modal();
    $('.modal-edit-teacher .btn-primary').on('click', function() {
        layer.confirm('确认修改该账户信息 ？', {  
            btn: ['确定', '取消']   
        }, function(index) {  
            layer.close(index);  
            $.ajax({
                type: "put",
                url: `http://123.206.211.185:8080/cs/admin/teachers/${teaId}?teaId=${$('.modal-edit-teacher .teaId').val()}&name=${$('.modal-edit-teacher .name').val()}&aid=${$('.modal-edit-teacher .aid').val()}&major=${$('.modal-edit-teacher .major').val()}&position=${$('.modal-edit-teacher .position').val()}&password=${$('.modal-edit-teacher .password').val()}`,
                success: function success(res) {
                    console.log(res);
                    if (res.status==0) {
                        layer.alert('修改成功', {  
                           icon: 1  
                        });  
                        $('button[name="refresh"]').click();
                        console.log('edit teacher account '+teaId+' successfully! and refresh');
                        $('.modal-edit-teacher button[data-dismiss="modal"]').click();
                    } else {
                        layer.alert(res.msg, {  
                           icon: 2  
                       });  
                        console.log('failed edit teacher account '+$('.teaId').val());
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