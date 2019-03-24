import axios from 'axios'
// 引用假数据, 对接后删除
import './mock'

const API = {
  // 公用房处理
  // 搜索公用房
  // 楼宇名称: buildingName 楼层:floor 房间号: roomNum
  filterPH(filter){
    return new Promise((resolve, reject)=>{
      axios.post('/filterPH', filter)
      .then(rs=>{
        // 将后台传来数据转换成如下格式
        /*[{
          id: i,
          location: i,
          area: i,
          setUpTime: i,
          maintenancePeople: i,
        }]*/
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 公用房列表的搜索接口
  listFilterPH(filter){
    return new Promise((resolve, reject)=>{
      axios.post('/listFilterPH', filter)
      .then(rs=>{
        // 将后台传来数据转换成如下格式
        /*[{
          id: i,
          dept: i,
          location: i,
          usingNature: i,
          user: i,
          fillInTime: i,
          status: i,
          auditTime: i,
        }]*/
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 公用房审核的搜索接口
  auditFilterPH(filter){
    return new Promise((resolve, reject)=>{
      axios.post('/auditFilterPH', filter)
      .then(rs=>{
        // 将后台传来数据转换成如下格式
        /*[{
          id: i,
          dept: i,
          location: i,
          usingNature: i,
          user: i,
          fillInTime: i,
          status: i,
          auditTime: i,
        }]*/
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 删除公用房记录
  deletePH(indexList){
    return new Promise((resolve, reject)=>{
      axios.post('/deletePH', indexList)
      .then(rs=>{
        // 不需要传参数, 这里要确保是删除成功
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  }
}

export default API
