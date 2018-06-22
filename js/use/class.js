  //当点击查询按钮的时候执行  
$(".btn-class").bind("click", function () {  
    //先销毁表格  
    var cnt=0;
    $('.add-admin-class').bootstrapTable('destroy');  
    //初始化表格,动态从服务器加载数据  
    $('.add-admin-class').bootstrapTable({
         url: `http://123.206.211.185:8080/cs/admin/jxbs?courseCode=A2050650`,         //请求后台的URL（*）
         dataType: "json",
         contentType: 'application/json,charset=utf-8', 
         method: 'get',      
         toolbar: '.admin-class .toolbar',                //工具按钮用哪个容器
         striped: true,                      //是否显示行间隔色
         cache: true,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
         pagination: true,                   //是否显示分页（*）
         sortable: false,                     //是否启用排序
         sortOrder: "asc",                   //排序方式
         queryParams: function(params) {
            return {
                page: getNowClassPage(),
                pageSize: getClassPageSize()
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
         uniqueId: "id",                     //每一行的唯一标识，一般为主键列
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
          align: 'center',
          formatter: function(value, row, index) {
            cnt++;
            return cnt;
          }
         }, {
          field: 'courseCode',
          title: '课程代号',
          align: 'center'
        }, {
              title: '上课时间',
              align: 'center',
              formatter: function(value,row,index){  
                  return row.day+""+row.lesson+" "+row.rawWeek;
              },
         }, {
          field: 'classRoom',
          title: '教室',
          align: 'center'
        }, {
          field: 'teacherId',
          title: '老师代号',
          align: 'center'
        }, {
          field: 'numLimit',
          title: '人数限制',
          align: 'center'
        }, {
          field: 'credit',
          title: '学分',
          align: 'center'
        }, {
          field: 'type',
          title: '课程类型',
          align: 'center'
        }, {
            field:"action",
            title:"操作",
            align:"center",
            formatter: function(value,row,index){  
                return '<a href="javascript:void(0);" onclick="editclassData('+row.id+')" style="margin-left:5px;"><li class="glyphicon glyphicon-pencil"></li></a>';
            },
            edit:false}, ],
          onLoadSuccess: function(){  //加载成功时执行
              console.info("加载成功");
          },
          onLoadError: function(){  //加载失败时执行
              console.info("加载数据失败");
          },
     });
});  
function getNowClassPage() {
    var res;
    if ($$('.admin-subject .pagination .active a')) {
        res = parseInt($$('.admin-subject .pagination .active a').innerText);
    } else {
        res = 1;
    }
    console.log(res);
    return res;
}
function getClassPageSize() {
    var res;
    if ($$('.admin-subject .page-size')) {
        res = parseInt($$('.admin-subject .page-size').innerText);
    } else {
        res = 10;
    }
    console.log(res);
    return res;
}
function editclassData(id) {
    $(".modal-add-class-title").text("信息修改");
    var childLists=$$('tr[data-uniqueid="'+id+'"]').children;
    console.log($$('tr[data-uniqueid="'+id+'"]'));
    $$('.modal-edit-class .courseCode').value=childLists[2].innerHTML;
    $$('.modal-edit-class .classRoom').value=childLists[4].innerHTML;
    $$('.modal-edit-class .teacherId').value=childLists[5].innerHTML;
    $$('.modal-edit-class .numLimit').value=childLists[6].innerHTML;
    $$('.modal-edit-class .credit').value=childLists[7].innerHTML;
    $$('.modal-edit-class .type').value=childLists[8].innerHTML;

    var courseCode=$('.modal-edit-class .courseCode').val(),
    hashDay=$('.modal-edit-class .hashDay').val(),
    hashLesson=$('.modal-edit-class .hashLesson').val(),
    period=$('.modal-edit-class .period').val(),
    classRoom=$('.modal-edit-class .classRoom').val(),
    teacherId=$('.modal-edit-class .teacherId').val(),
    week=$('.modal-edit-class .week').val(),
    numLimit=$('.modal-edit-class .numLimit').val(),
    credit=$('.modal-edit-class .credit').val(),
    type=$('.modal-edit-class .type').val();
    if (credit=='-') {
      credit=2;
    } else if (!credit) {
      credit=2;
    }
    console.log(credit);

    $('.modal-edit-class').modal();
    $('.modal-edit-class .btn-primary').on('click', function() {
      console.log(`http://123.206.211.185:8080/cs/admin/jxbs/${childLists[2].innerHTML}?courseCode=${courseCode}&hashDay=${hashDay}&hashLesson=${hashLesson}&period=${period}&classRoom=${classRoom}&teacherId=${teacherId}&week=${week}&credit=${credit}&type=${type}`);
        layer.confirm('确认修改该账户信息 ？', {  
            btn: ['确定', '取消']   
        }, function(index) {  
            layer.close(index);  
            $.ajax({
                type: "put",
                url: `http://123.206.211.185:8080/cs/admin/jxbs/${childLists[2].innerHTML}?courseCode=${$('.modal-edit-class .courseCode').val()}&hashDay=${$('.modal-edit-class .hashDay').val()}&hashLesson=${$('.modal-edit-class .hashLesson').val()}&period=${$('.modal-edit-class .period').val()}&classRoom=${$('.modal-edit-class .classRoom').val()}&teacherId=${$('.modal-edit-class .teacherId').val()}&week=${$('.modal-edit-class .week').val()}&numLimit=${$('.modal-edit-class .numLimit').val()}&credit=${$('.modal-edit-class .credit').val()}&type=${$('.modal-edit-class .type').val()}`,
                success: function success(res) {
                    console.log(res);
                    if (res.status==0) {
                        layer.alert('修改成功', {  
                           icon: 1  
                        });  
                        console.log('edit class account '+id+' successfully! and refresh');
                        $('.modal-edit-class button[data-dismiss="modal"]').click();
                        $('.admin-class button[name="refresh"]').click();
                    } else {
                        layer.alert(res.msg, {  
                           icon: 2  
                       });  
                        console.log('failed edit class account '+$('.stuId').val());
                    }
                },
                error: function(a) {  
                   layer.alert('修改失败', {  
                       icon: 2  
                   });  
               },  
               dataType: 'json'  
            });
        });  
    });
}