
//引入mockjs
const Mock = require('mockjs') 
Mock.mock('/api/data', (req, res) => {
    let data=[{
        "id":1,
        "jkzhib":"内存使用率",
        "jktime":"周期不确定性预测",
        "changer":"张三",
        "chtime":"2019-06-20 09:00:00"

      },{
        "id":2,
        "jkzhib":"文件系统使用率",
        "jktime":"周期不确定性预测",
        "changer":"张三",
        "chtime":"2019-06-20 09:00:00",
        "children":[{
          "id":21,
          "jkzhib":"/opt root",
        "jkmethon":"周期不确定性预测",
        "changer":"张三",
        "chtime":"2019-06-20 09:00:00"
        },{
          "id":22,
          "jkzhib":"/tmp root",
          "jkmethon":"周期不确定性预测",
          "changer":"张三",
          "chtime":"2019-06-20 09:00:00"
      }]},{
        "id":3,
        "jkzhib":"内存使用率",
        "jkmethon":"周期不确定性预测",
        "changer":"张三",
        "chtime":"2019-06-20 09:00:00"
      }
      ]
      return {
        data: data}
    })