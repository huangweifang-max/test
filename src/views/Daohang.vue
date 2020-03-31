
<template>
  <div>
    
    <el-menu  
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#F2F6FC"
    text-color="#909399"
    active-text-color="#303133"   
   >
    <el-menu-item index="1"  > 监控资源</el-menu-item>
    <template slot="title"></template>
    <el-menu-item index="2"  >4G新装详情</el-menu-item>
 

    </el-menu>
    <el-tabs v-model="activeName" @tab-click="handleClick" mode="horizontal" style="margin-top:8px">
    <el-tab-pane label="指标看板" name="first" ></el-tab-pane>
    <el-tab-pane label="告警信息" name="second"></el-tab-pane>
    <el-tab-pane label="监控列表" name="third"></el-tab-pane>
    <el-tab-pane label="告警接收规则" name="fourth"></el-tab-pane>
  </el-tabs>
        <el-button style="color:white;background-color:#409EFF" >新增监控</el-button> <i class="el-icon-s-tools"></i> 
      
     
        <el-pagination @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout=" sizes, prev, pager, next, jumper"
      :total="100"
      style="float:right"
      
        >
       </el-pagination>
     <span style="position:right;float:right;">当前网元共监控指标5个</span> 

      
    <el-table row-key="id"
    :data="tableData"
    border
    style="width: 100%;margin-top:15px;padding-top:5px"
    >
    <el-table-column
      prop="jkzhib"
      label="监控指标"
      width="200">
    </el-table-column>
    <el-table-column
      prop="jkmethon"
      label="监控方法"
      width="200">
      <template>
        <i class="el-icon-warning" style="color:#E6A23C"></i><span>周期不确定性预测</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="jktime"
      label="监控时段"
     >
    </el-table-column>
    <el-table-column
      prop="changer"
      label="修改人"
      width="180">
    </el-table-column>
    <el-table-column
      prop="chtime"
      label="修改时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="product"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button type="text" size="small" >修改</el-button>
        <el-button @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">删除</el-button>
        <el-button type="text" size="small">查看告警接收人</el-button>
      </template>
    </el-table-column>
  </el-table> 
  </div>   
</template>
<script>
      export default{
        data(){
          return {
            activeIndex: '2',
            activeIndex2: '1',
            activeName: 'third',
            currentPage4:'5',
            tableData:[{
              id:1,
            jkzhib:'内存使用率',
            //jkmethon:<i class="el-icon-location"></i><span>周期不确定性预测</span>,
            jktime:'全天',
            changer:'张三',
            chtime:'2019-06-20 09:00:00'

          },{
            id:2,
            jkzhib:'文件系统使用率',
            jkmethon:'周期不确定性预测',
            jktime:'全天',
            changer:'张三',
            chtime:'2019-06-20 09:00:00',
            children:[{
              id:21,
              jkzhib:'/opt root',
            jkmethon:'周期不确定性预测',
            jktime:'全天',
            changer:'张三',
            chtime:'2019-06-20 09:00:00'
            },{
              id:22,
              jkzhib:'/tmp root',
            jkmethon:'周期不确定性预测',
            jktime:'全天',
            changer:'张三',
            chtime:'2019-06-20 09:00:00'
          }]},{
            id:3,
            jkzhib:'内存使用率',
            jkmethon:'周期不确定性预测',
            jktime:'节假日',
            changer:'张三',
            chtime:'2019-06-20 09:00:00'

          }]
            };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
       handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        }
    }

            
        }
</script>
<style>


</style>
