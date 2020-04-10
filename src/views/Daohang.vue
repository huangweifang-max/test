
<template>
  <div>
    
    <el-breadcrumb separator-class="el-icon-arrow-right" 
    style="background-color:#EBEEF5;padding:10px 0px;"

     
   >
    <el-breadcrumb-item > 监控资源</el-breadcrumb-item> 
    <el-breadcrumb-item >4G新装详情</el-breadcrumb-item>
    </el-breadcrumb>
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
    :data="tabledata"
    border
    style="width: 100%;margin-top:15px;padding-top:5px"
    >
    <el-table-column prop="jkzhib" label="监控指标" width="200" ></el-table-column>
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
     import axios from 'axios';    //vue2.x的引入axios进行前后端交互
      export default{
        data(){
          return {
            activeName: 'third',
            currentPage4:5,
            data:[]
            };
    },
    mounted:function() {
        axios.get('/api/data').then(res => {//get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致
          this.data = res.data.data;
          console.log(res.data);//在console中看到数据
        }).catch(res => {
          alert('wrong');
        })
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
      },
    mounted:function(){
      axios.get('/api/data').then(res=>{
        this.tabledata = res.tabledata;
        //console.log(tabledata)
      })
    }}
   

            
        
</script>
<style>


</style>