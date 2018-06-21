// $('.btn-add-message').click(function () {
//     console.log('add message');
//     $(".modal-message-title").text("添加资讯");
//     $('.modal-message').modal();
// });
// $('.btn-add-subject').click(function () {
//     console.log('add subject');
//     $(".modal-subject-title").text("添加课程");
//     $('.modal-subject').modal();
// });
$('.btn-add-student').click(function () {
    console.log('add subject');
    $(".modal-add-student-title").text("学生添加");
    $('.modal-add-student').modal();
    $('.modal-add-student .btn-primary').on('click', function() {
        layer.confirm('请确认添加账号信息是否有误', {  
            btn: ['确定', '取消']   
        }, function(index) {  
            layer.close(index);  
            $.ajax({
                type: "post",
                url: `http://123.206.211.185:8080/cs/admin/students/`,
                contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                data: `stuId=${$('.modal-add-student .stuId').val()}&gender=${$('.modal-add-student .gender').val()}&name=${$('.modal-add-student .name').val()}&academy=${$('.modal-add-student .academy').val()}&major=${$('.modal-add-student .major').val()}&classNum=${$('.modal-add-student .classNum').val()}&grade=${$('.modal-add-student .grade').val()}&password=${$('.modal-add-student .password').val()}}`,
                success: function success(res) {
                    console.log(res);
                    // res=JSON.parse(res);
                    if (res.status==0) {
                        layer.alert('添加成功', {  
                           icon: 1  
                        });  
                        $('button[name="refresh"]').click();
                        console.log('add student account '+$('.stuId').val()+' successfully! and refresh');
                        $('.modal-add-student button[data-dismiss="modal"]').click();
                    } else {
                        layer.alert(res.msg, {  
                           icon: 2  
                       });  
                        console.log('failed add student account '+$('.stuId').val());
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
$(".btn-student").bind("click", function () {  
    var curRow = {};
    //先销毁表格  
    $('.add-student-table').bootstrapTable('destroy');  
    //初始化表格,动态从服务器加载数据  
    $('.add-student-table').bootstrapTable({
         url: 'http://123.206.211.185:8080/cs/admin/students?',         //请求后台的URL（*）
         dataType: "json",
         contentType: 'application/json,charset=utf-8', 
         method: 'get',      
         toolbar: '.admin-student .toolbar',                //工具按钮用哪个容器
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
         uniqueId: "stuId",                     //每一行的唯一标识，一般为主键列
         showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
         cardView: false,                    //是否显示详细视图
         detailView: false,                   //是否显示父子表
         pagination: true,
         // paginationPreText: "Previous",
         //  paginationNextText: "Next",
         //  paginationFirstText: "First",
         //  paginationLastText: "Last",
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
             field: 'stuId',
             title: '学号',
             align: 'center'
         }, {
             field: 'gender',
             title: '性别',
             align: 'center'
         }, {
             field: 'name',
             title: '姓名',
             align: 'center'
         }, {
             field: 'academy',
             title: '学院',
             align: 'center'
         }, {
             field: 'major',
             title: '专业',
             align: 'center'
         }, {
             field: 'grade',
             title: '年级',
             align: 'center'
         }, {
             field: 'classNum',
             title: '班级',
             align: 'center'
         }, {
            field:"action",
            title:"操作",
            align:"center",
            formatter: function(value,row,index){  
                return '<a href="javascript:void(0);" onclick="editStudentData('+row.stuId+')" style="margin-left:5px;"><li class="glyphicon glyphicon-pencil"></li></a>'+
                '<a href="javascript:void(0);" onclick="removeStudentData('+ row.stuId +')" style="margin-left:5px;"><li class="glyphicon glyphicon-remove"></li></a>';  
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
});  

function removeStudentData(stuid) {
    layer.confirm('您确定要删除' + stuid + '账号吗?', {  
        btn: ['确定', '取消']   
    }, function(index) {  
        layer.close(index);  
        $.ajax({
            type: "delete",
            url: `http://123.206.211.185:8080/cs/admin/students/${stuid}`,
            success: function success(res) {
                // res=JSON.parse(res);
                if (res.status==0) {
                    layer.alert('删除成功', {  
                       icon: 1  
                    });  
                    $('button[name="refresh"]').click();
                    console.log('delete student account '+stuid+' successfully! and refresh');
                } else {
                    console.log('failed delete student account '+stuid);
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
    if ($$('.admin-student .pagination .active a')) {
        res = parseInt($$('.admin-student .pagination .active a').innerText);
    } else {
        res = 1;
    }
    console.log(res);
    return res;
}
function getPageSize() {
    var res;
    if ($$('.admin-student .page-size')) {
        res = parseInt($$('.admin-student .page-size').innerText);
    } else {
        res = 10;
    }
    console.log(res);
    return res;
}
function editStudentData(stuId) {
    $(".modal-edit-student-title").text("信息修改");
    var childLists=$$('tr[data-uniqueid="'+stuId+'"]').children;
    console.log($$('tr[data-uniqueid="'+stuId+'"]'));
    $$('.modal-edit-student .stuId').value=childLists[1].innerHTML;
    $$('.modal-edit-student .gender').value=childLists[2].innerHTML;
    $$('.modal-edit-student .name').value=childLists[3].innerHTML;
    $$('.modal-edit-student .academy').value=childLists[4].innerHTML;
    $$('.modal-edit-student .grade').value=childLists[6].innerHTML;
    $$('.modal-edit-student .major').value=childLists[5].innerHTML;
    $$('.modal-edit-student .classNum').value=childLists[7].innerHTML;

    $('.modal-edit-student').modal();
    $('.modal-edit-student .btn-primary').on('click', function() {
        layer.confirm('确认修改该账户信息 ？', {  
            btn: ['确定', '取消']   
        }, function(index) {  
            layer.close(index);  
            $.ajax({
                type: "put",
                url: `http://123.206.211.185:8080/cs/admin/students/${stuId}?stuId=${$('.modal-edit-student .stuId').val()}&gender=${$('.modal-edit-student .gender').val()}&name=${$('.modal-edit-student .name').val()}&academy=${$('.modal-edit-student .academy').val()}&major=${$('.modal-edit-student .major').val()}&classNum=${$('.modal-edit-student .classNum').val()}&grade=${$('.modal-edit-student .grade').val()}&password=${$('.modal-edit-student .password').val()}`,
                success: function success(res) {
                    console.log(res);
                    if (res.status==0) {
                        layer.alert('修改成功', {  
                           icon: 1  
                        });  
                        $('button[name="refresh"]').click();
                        console.log('edit student account '+stuId+' successfully! and refresh');
                        $('.modal-edit-student button[data-dismiss="modal"]').click();
                    } else {
                        layer.alert(res.msg, {  
                           icon: 2  
                       });  
                        console.log('failed edit student account '+$('.stuId').val());
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