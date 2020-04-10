<template>
<div >
  <el-row style="margin-top: 10px" type="flex">
    <el-col :span="24">
    <el-card shadow="always">
    <div style="height:30px" class="grid-content bg-purple-dark">
      <i class="el-icon-s-fold">故障处理视图</i>
        <el-button id="index1" style="float:right">自定义</el-button>
        <el-button id="index2" style="float:right" @click="ninetydate">近90天</el-button>
        <el-button id="index3" style="float:right" @click="thirdtydate">近30天</el-button>
        <el-button id="index4" style="float:right" @click="fifteendate">近15天</el-button> 
      <el-date-picker v-model="range" type="datetimerange" align="right" 
        style="float:right" :placeholder="placeholder ||'请选择时间范围'" @change="searchTime"></el-date-picker>
      <span class="demonstration" style="float:right" ><i class="el-icon-date">数据时间：</i></span>
        
    </div></el-card></el-col></el-row>

 <el-row style="margin-top: 15px"  type="flex">
   <el-col :span="13.8" style="margin-right:15px" >
      <el-card shadow="always" >
        <div  style="height:50px;width:800px;">
          <el-row style="text-align:center">
            <el-col :span="6" style="color:red;margin-right:20px;font-size:20px" class="overview-item-value"><strong>3</strong></el-col>
            <el-col :span="6" style="color:black;margin-right:20px;font-size:20px" class="overview-item-value"><strong>3</strong></el-col>
            <el-col :span="6" style="color:black;margin-right:20px;font-size:20px" class="overview-item-value"><strong>32</strong><span style="color:gray;font-size:13px">分钟</span></el-col>
          </el-row>
          <el-row class="font-medium" style="text-align:center">
            <el-col :span="6" class="overview-item-title" style="margin-right:20px">未处理完成故障数</el-col>
            <el-col :span="6" class="overview-item-title" style="margin-right:20px">故障总数</el-col>
            <el-col :span="6" class="overview-item-title" style="margin-right:20px">故障平均处理时长</el-col>
          </el-row>
        </div>
      </el-card>
  
      <el-card shadow="always" style="margin-top: 15px">
        <div id="zhext" style="height:200px;width:800px;"></div>   
      </el-card>
    </el-col>
    <el-col :span="10.2">
      <el-card shadow="always">
        <div id="zhuxt" style="height:305px;width:600px"></div>
      </el-card>
    </el-col>
  </el-row>

  <el-row style="margin-top: 15px"  type="flex">
    <el-col :span="13.8" style="margin-right:15px">
      <el-card>  
        <div id="bingt" style="height:350px;width:800px" ></div>
        <div id="overflow">
          <el-menu>
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-arrow-up">IaaS</i></template>
              <i>主机</i><el-progress :stroke-width="10" :percentage="100" :format="format" ></el-progress>
              <i>防火墙</i><el-progress :stroke-width="10" :percentage="66" :format="format"></el-progress>
              <i>交换机</i><el-progress :stroke-width="10" :percentage="33" :format="format"></el-progress>
            </el-submenu>
      
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-arrow-up">PaaS</i></template>
              <i>主机</i><el-progress :stroke-width="10" :color="paasColor" :percentage="100" :format="format" ></el-progress>
              <i>防火墙</i><el-progress :stroke-width="10" :color="paasColor" :percentage="66" :format="format" ></el-progress>
              <i>交换机</i><el-progress :stroke-width="10"  :color="paasColor" :percentage="33" :format="format"></el-progress>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"> <i class="el-icon-arrow-up">SaaS</i></template>
              <i>主机</i><el-progress :stroke-width="10" :percentage="100" :format="format" :color="saasColor"></el-progress>
              <i>防火墙</i><el-progress :stroke-width="10" :percentage="66" :format="format" :color="saasColor"></el-progress>
              <i>交换机</i><el-progress :stroke-width="10" :percentage="33" :format="format" :color="saasColor"></el-progress>
            </el-submenu>
          </el-menu>    
        </div>
      </el-card>
    </el-col>
     
    <el-col :span="10.2">
      <el-card shadow="always">
        <div id="info" style="height:350px;width:600px">
          <span>故障影响的资源 TOP5</span>
          <el-table  
          :data="tabledata">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="resname" label="资源名称" width="400"></el-table-column >
            <el-table-column prop="ifnumber" label="影响次数" ></el-table-column>
          </el-table>
        </div></el-card>
    </el-col>
  </el-row>

</div>
</template>
<script>
  import { timestamp } from '@/utils/index'
  import moment from 'moment'
  export default {
    props: {
      placeholder: null
    },
    data() {
      return {
        range: [],
        dateObj: {
          startTime: '',
          endTime: ''
        },
        oneDay: 86400

      }
    }, 
    computed: {
      nowYear() {
        return moment().get('year')
      },
      nowMonth() {
        return moment().get('month') + 1
      },
      nowDate() {
        return moment().get('date')
      },
      nowWeek() {
        return moment().format('d')
      }
    },
    methods: {
      searchTime() {
        if (this.range && this.range[0] && this.range[1]) {
          this.dateObj.startTime = timestamp(this.range[0])
          this.dateObj.endTime = timestamp(this.range[1])
        } else {
          this.dateObj = {
            startTime: '',
            endTime: ''
          }
        }
        this.submitDateRange()
      },
      ninetydate() {
         this.dateObj.startTime = timestamp(moment().month(this.nowMonth - 4).date(nowDate).hours(0).minutes(0).seconds(0)._d)                         // 本月1日
        this.dateObj.endTime = timestamp(moment()._d)
        this.submitDateRange()
      },
      thirdtydate() {
        this.dateObj.startTime = timestamp(moment().month(this.nowMonth - 2).date(nowDate).hours(0).minutes(0).seconds(0)._d)                         // 本月1日
        this.dateObj.endTime = timestamp(moment().month(this.nowMonth-1))
        this.submitDateRange()
      },
      fifteendate() {
        this.dateObj.startTime = timestamp(moment().month(this.nowMonth - 1).date(nowDate).hours(0).minutes(0).seconds(0)._d) - 1
        this.dateObj.endTime = timestamp(moment().month(this.nowMonth-1).data(nowDate-this.oneDay*15+1))
        this.submitDateRange()
      },
      exportData() {},
      submitDateRange() {
        this.$emit('dateRange', this.dateObj)
      }
    }
  }

</script>

<script >
 //import axios from 'axios';  
  export default { 
    data () {
      return {
        btdatalist:[{value:12, name:'Iaas',itemStyle:{color:'blue'}},
                {value:12, name:'Paas',itemStyle:{color:'#E6A23C'}},
                {value:8, name:'SaaS',itemStyle:{color:'#E8C940'}}],
        zxtdatalist:[]  ,
        paasColor: '#E6A23C',
        saasColor: '#E8C940',
        tabledata:[{resname:'【服务】服开轮询接受接口',ifnumber:'10'},
        {resname:'【KEEPER集群】134.332.24.31|KEEPER_CR...',ifnumber:'7'},
        {resname:'【MYSQL集群】134.332.24.31|MYSQL_CRM...',ifnumber:'5'},
        {resname:'【主机】BO_134.233.78.35',ifnumber:'2'},
        {resname:'【主机】BO_134.178.67.1',ifnumber:'1'}]          
      }
    },
    mounted() {
      this.drawLine();
      this.drawLine1();
      this.drawLine2();
    },
    methods: {
      format(percentage){
        if(percentage ==100){
          return percentage==100 ? '6' :`${percentage}%` ;} 
        else if(percentage ==66){
          return percentage==66 ? '4' :`${percentage}%` ;}
        else if(percentage==33){
          return percentage==33 ? '2' :`${percentage}%` ;}
      },
      drawLine(){
        let myChart = this.$echarts.init(document.getElementById('zhext')) 
        // 绘制图表
        myChart.setOption({
          title: {
          text: '故障趋势图'
          },
          tooltip:{},
          xAxis:{
            splitLine:{show: true,
            lineStyle:{
              type:'dashed',
              color:'#DCDCDC'
            }},
              data:["17/10","18/10","19/10","20/10"],
              axisLine:{
                lineStyle:{
                color:'#DCDCDC'
                }
              }
          },
          yAxis:{
            splitLine:{show: true,
            lineStyle:{
              type:'dashed',
              color:'#DCDCDC'
            }},
            axisLine:{
              lineStyle:{
                
                color:'#DCDCDC'//轴线颜色
                 }
            },
            max: 10,
            min: 0,
            splitNumber : 2,//间隔几个
          boundaryGap: [0, '50%'],
          type:'value'
		      
        },
        series:[{
            name:'故障数',
            type:'line',
            areaStyle: {
                normal: {}
            },
            color:{
              type:'linear',
              x:0,
              y:0,
              x2:0,
              y2:1,
              colorStops:[
                {
                offset: 0,
                color: '#409EFF', // 0% 处的颜色
                  }, 
                {
                  offset: 1, 
                color: '#DAECFE' // 100% 处的颜色
                            },
                        ],
                        globalCoord: false // 缺省为 false
                    },
            data:[10,3,5,8]
        }]
      })
      },

      drawLine1(){
        // 基于准备好的dom，初始化echarts实例
        let myChart1 = this.$echarts.init(document.getElementById('zhuxt'))
        // 绘制图表
        myChart1.setOption({
            title: { text: '按故障等级统计数量' },
            tooltip: {},
            xAxis: {
              data:["一级故障","二级故障","三级故障","四级故障"],
              axisLine:{
                lineStyle:{
                  color:'#DCDCDC'}},
              axisLabel: {
                textStyle: {
                  color: 'black'}}
            },
            yAxis: {
              nameLocation:'middle',
              splitNumber:2,
              fontSize : 30,
              axisLine:{
                lineStyle:{
                color:'#DCDCDC'
                 }}
            },
            series: [{
              type: 'bar',
              data: [10,8,3,5 ],
              barWidth:30,//柱子宽度
              label: {
      	        normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#409EFF'}}},
              color:'#409EFF'
            }]
        });
      },
      drawLine2(){
        // 基于准备好的dom，初始化echarts实例
        let btlist=this.btdatalist
        let total =0
        const target=new Map();
       /*  btlist.forEach((item) => {
          // 计算value的和，用来算百分比
                    total += item.value
                    // 组成 map {A:1212} ,用来下面获取 value
                    target.set(item.name, item.value)
        }); */
        let myChart2 = this.$echarts.init(document.getElementById('bingt'))
        // 绘制图表
        myChart2.setOption({
          title : {
            text: '各故障类型对比',
            x:'left'},
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"},
          legend: {
            orient: 'vertical',
            left: '30%',
            y:'center',
            icon: 'square'},
          series : [{
            name: '故障类型',
            type: 'pie',
            radius : '55%',
            center: ['15%', '50%'],
            label:{
              normal:{
                show:false}
              },
            data: btlist,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'}}
           }]
        });
      }
    }
  }
</script>


<style>
#overflow {
width: 300px;
height: 300px;
overflow: scroll ;
position: absolute;
left: 500px;
top: 50px;

}


</style>