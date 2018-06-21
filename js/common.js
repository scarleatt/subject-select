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
         editable:true,
         // clickToSelect: true,  
         method: 'get',      
         toolbar: '#toolbar',                //工具按钮用哪个容器
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
         pageSize: 5,                       //每页的记录行数（*）
         pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
         search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
         searchOnEnterKey: true,
         queryParamsType:'limit',
         // trimOnSearch: true;
         strictSearch: true,
         showColumns: true,                  //是否显示所有的列
         showRefresh: true,                  //是否显示刷新按钮
         minimumCountColumns: 2,             //最少允许的列数
         clickToSelect: true,                //是否启用点击选中行
         height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
         uniqueId: "stuId",                     //每一行的唯一标识，一般为主键列
         showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
         cardView: false,                    //是否显示详细视图
         detailView: false,                   //是否显示父子表
         pagination: true,
         paginationPreText: "Previous",
          paginationNextText: "Next",
          paginationFirstText: "First",
          paginationLastText: "Last",
          showPaginationSwitch:true,
         responseHandler: function(res) {
            console.log(res);
            var result;
            if (res.data && res.data.pages>0) {
                result =  {
                    "total": res.data.pages,//总页数
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
             checkbox: true
         }, {
             field: 'stuId',
             title: '学号',
             // formatter: function (value, row, index) {
             //     return "<a href=\"#\" name=\"stuId\" data-type=\"text\" data-pk=\""+row.stuId+"\" data-title=\"学号\">" + value + "</a>";
             // }
         }, {
             field: 'gender',
             title: '性别',
             // formatter: function (value, row, index) {
             //     return "<a href=\"#\" name=\"gender\" data-type=\"text\" data-pk=\""+row.gender+"\" data-title=\"性别\">" + value + "</a>";
             // }
         }, {
             field: 'name',
             title: '姓名',
             // formatter: function (value, row, index) {
             //     return "<a href=\"#\" name=\"name\" data-type=\"text\" data-pk=\""+row.name+"\" data-title=\"姓名\">" + value + "</a>";
             // }
         }, {
             field: 'academy',
             title: '所在学院',
             // formatter: function (value, row, index) {
             //     return "<a href=\"#\" name=\"academy\" data-type=\"text\" data-pk=\""+row.academy+"\" data-title=\"所在学院\">" + value + "</a>";
             // }
         }, {
             field: 'major',
             title: '专业',
             // formatter: function (value, row, index) {
             //     return "<a href=\"#\" name=\"major\" data-type=\"text\" data-pk=\""+row.major+"\" data-title=\"专业\">" + value + "</a>";
             // }
         }, {
             field: 'classNum',
             title: '班级',
             // formatter: function (value, row, index) {
             //     return "<a href=\"#\" name=\"classNum\" data-type=\"text\" data-pk=\""+row.classNum+"\" data-title=\"班级\">" + value + "</a>";
             // }
         }, {
             field: 'birthday',
             title: '生日',
             // formatter: function (value, row, index) {
             //     return "<a href=\"#\" name=\"birthday\" data-type=\"text\" data-pk=\""+row.birthday+"\" data-title=\"生日\">" + value + "</a>";
             // }
         }, {
            field:"action",
            title:"操作",
            align:"center",
            formatter: function(value,row,index){  
                // console.log(index);
                // console.log(row);
                var strHtml ='<a href="javascript:void(0)" onclick="editStudentData('+ row.stuId +')"><li class="glyphicon glyphicon-pencil"></li></a>'+  
                    '<a href="javascript:void(0);" onclick="removeStudentData('+ row.stuId +')" style="margin-left:5px;"><li class="glyphicon glyphicon-remove"></li></a>';  
                return strHtml; 
            },
            edit:false},  ],
            onClickRow: function (row, $element) {
                curRow = row;
            },
            onLoadSuccess: function(){  //加载成功时执行
                console.info("加载成功");
                console.log($(".add-student-table a"));
                $(".add-student-table a").editable({
                    url: function (params) {
                        var sName = $(this).attr("name");
                        curRow[sName] = params.value;
                        $.ajax({
                            type: 'POST',
                            url: "/Editable/Edit",
                            data: curRow,
                            dataType: 'JSON',
                            success: function (data, textStatus, jqXHR) {
                                alert('保存成功！');
                            },
                            error: function () { alert("error");}
                        });
                    },
                    type: 'text'
                });
            },
            onLoadError: function(){  //加载失败时执行
                console.info("加载数据失败");
            },
            // onEditableSave: function (field, row, oldValue, $el) {
            //   $.ajax({
            //       type: "put",
            //       url: "http://123.206.211.185:8080/cs/admin/students/?",
            //       data: row,
            //       dataType: 'JSON',
            //       success: function (data, status) {
            //           if (status == "success") {
            //               layer.alert('提交数据成功', {
            //                 icon: 1
            //               });
            //           }
            //       },
            //       error: function () {
            //           layer.alert('修改失败', {
            //             icon: 2
            //           });
            //       },
            //       complete: function () {
            //         layer.alert('修改成功', {
            //             icon: 1
            //         })
            //       }

            //   });
            // }
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
                res=JSON.parse(res);
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

function editStudentData() {
    console.log('edit');

    // $.ajax({
    //     type: "put",
    //     url: `http://123.206.211.185:8080/cs/admin/students/?${stuId}&${gender}&${name}&${academy}&${major}&${classNum}&${grade}&${birthday}`,
    //     success: function success(res) {
    //         if (res.status==0) {
    //             layer.alert('修改成功', {  
    //                icon: 1  
    //             });  
    //             $('button[name="refresh"]').click();
    //         } else {
    //             console.log('failed edit student account '+stuid);
    //         }
    //     },
    //     error: function(a) {  
    //        layer.alert('修改', {  
    //            icon: 2  
    //        });  
    //    },  
    //    dataType: 'json'  
    // });
}