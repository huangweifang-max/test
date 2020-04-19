<template>
    <div class="container">
        <div class="head" >  
           <i class="el-icon-s-fold" >故障处理视图</i>
          <el-button id="index1" style="float:right">自定义</el-button>
          <el-button id="index2" style="float:right" onclick="ninetydate()">近90天</el-button>
          <el-button id="index3" style="float:right" @click="thirdtydate">近30天</el-button>
          <el-button id="index4" style="float:right" @click="fifteendate">近15天</el-button> 
          <el-date-picker  
           v-model="value1" 
           type="daterange" 
           range-separator="~" 
           format="yyyy-MM-dd"
           style="float:right" 
           unlink-panels
           start-placeholder="开始日期" 
           end-placeholder="结束日期"
           :picker-options="pickerOptions">
          </el-date-picker>
          <span class="demonstration" style="float:right" ><i class="el-icon-date">数据时间：</i></span>
        </div>

        <div class="main">
            <div class="left-1">
                <div class="left-11">
                    <div style="height:50px;width:800px;padding:20px">
                    <el-row style="text-align:center">
                      <el-col :span="6" style="color:red;margin-right:20px;font-size:20px" class="overview-item-value"><strong>3</strong></el-col>
                      <el-col :span="6" style="color:black;margin-right:20px;font-size:20px" class="overview-item-value"><strong>3</strong></el-col>
                      <el-col :span="6" style="color:black;margin-right:20px;font-size:20px" class="overview-item-value"><strong>32</strong><span style="color:gray;font-size:13px">分钟</span></el-col>
                    </el-row>
                    <el-row class="font-medium" style="text-align:center">
                      <el-col :span="6" class="overview-item-title" style="margin-right:20px">未处理完成故障数</el-col>
                      <el-col :span="6" class="overview-item-title" style="margin-right:20px">故障总数</el-col>
                      <el-col :span="6" class="overview-item-title" style="margin-right:20px">故障平均处理时长</el-col>
                    </el-row></div>
                </div>
                <div id="zhext" class="left-12">
                </div>
                <div class="left-13">
                    <div id="piet" style="width:750px;height:370px">
                    </div>
                    <div id="overflow">
                      <el-menu>
                        <el-submenu index="1">
                        <template slot="title"><i class="el-icon-arrow-up">IaaS</i></template>
                          <div id="el-1">
                            <span>主机</span><el-progress  :stroke-width="10" :percentage="100" :format="format" ></el-progress></div>
                          <div id="el-1">
                            <span>防火墙</span><el-progress  :stroke-width="10" :percentage="66" :format="format"></el-progress></div>
                          <div id="el-1">
                            <span>交换机</span><el-progress :stroke-width="10" :percentage="33" :format="format"></el-progress></div>            
                        </el-submenu>
                        <el-submenu index="2">
                        <template slot="title"><i class="el-icon-arrow-up">PaaS</i></template>
                          <div id="el-1">
                            <span>Mysql</span><el-progress :stroke-width="10" :color="paasColor" :percentage="100" :format="format" ></el-progress></div>
                          <div id="el-1">
                            <span>DBProxy</span><el-progress :stroke-width="10" :color="paasColor" :percentage="66" :format="format" ></el-progress></div>
                          <div id="el-1">
                            <span>Geteway</span><el-progress :stroke-width="10"  :color="paasColor" :percentage="33" :format="format"></el-progress></div>
                        </el-submenu>
                        <el-submenu index="3">
                        <template slot="title"> <i class="el-icon-arrow-up">SaaS</i></template>
                          <div id="el-1">
                            <span>应用</span><el-progress :stroke-width="10" :percentage="100" :format="format" :color="saasColor"></el-progress></div>
                          <div id="el-1">
                            <span>场景</span><el-progress :stroke-width="10" :percentage="66" :format="format" :color="saasColor"></el-progress></div>
                          <div id="el-1">
                            <span>服务</span><el-progress :stroke-width="10" :percentage="33" :format="format" :color="saasColor"></el-progress></div>
                        </el-submenu>
                      </el-menu>    
                    </div>
                </div>
            </div>
            <div class="right-1"> 
                <div id="zhuxt" class="right-11">
                </div>
                <div id="info" class="right-12">
                   <span style="font-size:20px"><strong>故障影响的资源 TOP5</strong></span>
                   <el-table  :data="tabledata">
                      <el-table-column type="index" width="50"></el-table-column>
                      <el-table-column prop="resname" label="资源名称" width="400"></el-table-column >
                      <el-table-column prop="ifnumber" label="影响次数" ></el-table-column>
                    </el-table>
                </div>  
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    data () {
      return {
        btdatalist:[{value:12, name:'Iaas',percentage:"37.5%",itemStyle:{color:'blue'}},
                {value:12, name:'Paas',percentage:"37.5%",itemStyle:{color:'#E6A23C'}},
                {value:8, name:'SaaS',percentage:"25%",itemStyle:{color:'#E8C940'}}],
        zxtdatalist:[]  ,
        paasColor: '#E6A23C',
        saasColor: '#E8C940',
        tabledata:[{resname:'【服务】服开轮询接受接口',ifnumber:'10'},
        {resname:'【KEEPER集群】134.332.24.31|KEEPER_CR...',ifnumber:'7'},
        {resname:'【MYSQL集群】134.332.24.31|MYSQL_CRM...',ifnumber:'5'},
        {resname:'【主机】BO_134.233.78.35',ifnumber:'2'},
        {resname:'【主机】BO_134.178.67.1',ifnumber:'1'}] ,
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
            data:["20200401","20200402","20200403", "20200404", "20200405","20200406","20200407","20200408","20200409","20200410","20200411","20200412","20200413","20200414","20200415","20200416"],
            splitLine:{show: true,
            lineStyle:{
              type:'dashed',
              color:'#DCDCDC'
            }},
            
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
            data:[2, 4, 3,6,7,8,9,2, 4, 3,4,6,7,8,9]
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
        let myChart2 = this.$echarts.init(document.getElementById('piet'))
        // 绘制图表
        myChart2.setOption({
          title : {
            text: '各故障类型对比',
            x:'left'},
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"},
          legend: {
            formatter:function(name){
                let pieLegendVale= {};
                btlist.filter((item,index)=>{
                    if (item.name==name){
                        pieLegendVale=item;
                    }
                });
                    return pieLegendVale.name+ "  "+pieLegendVale.value + "  "+pieLegendVale.percentage;
            } ,             
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
.container{
    margin: 0;
    padding: 0;
    background-color:#F0F0F0;
}
.head{
    width: 1505px;
    height: 50px;
    margin: 0 auto;
    background-color:white ;
}
.main{
    width: 1505px;
    height: 710px;
    margin: 15px 0;
    background-color:#F0F0F0;
}
.left-1{
    width: 800px;
    height: 700px;
    float: left;
}
.left-11{
    width: 800px;
    height: 100px;
    background-color: white;
}
.left-12{
    width: 800px;
    height: 200px;
    margin: 15px 0;
    background-color: white;
}
.left-13{
    width: 800px;
    height: 370px;
    float: left;
    background-color: white;
}
.right-1{
    width: 690px;
    height: 700px;
    float: right;
}

.right-11{
    width: 690px;
    height: 315px;
    background-color: white;
}
.right-12{
    width: 690px;
    height: 370px;
    margin: 15px 0;
    background-color: white;
}
#overflow{
  overflow-y:auto;
  position: absolute;
  top: 410px;
  left: 500px;
  width: 300px;
  height: 350px;
  display: inline-block;
}
.el-progress{
  width: 220px;
}
#overflow::-webkit-scrollbar{
  display: none;
}
#el-1{
  display:flex;
  float: right;
}

</style>