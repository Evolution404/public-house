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
  },
  // 删除部门
  deleteDept(indexList){
    return new Promise((resolve, reject)=>{
      axios.post('/deleteDept', indexList)
      .then(rs=>{
        // 不需要传参数, 这里要确保是删除成功
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 删除部门
  // {
  //    index: 1,
  //    其余信息
  // }
  updateDept(newData){
    return new Promise((resolve, reject)=>{
      axios.post('/updateDept', newData)
      .then(rs=>{
        // 不需要传参数, 这里要确保是删除成功
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  detailDept(index){
    return new Promise((resolve, reject)=>{
      axios.post('/detailDept', index)
      .then(rs=>{
        // 处理成需要的部门信息
        // {
        //    deptName(部门名称), zj(正局级), fj(副局级)
        //    zc(正处级), fc(副处级), uc(处级以下u-under)
        //    academician(院士), tT(高端人才, t-top T-talent)
        //    eT(优秀人才 e-excellent), zg(正高级), fg(副高级)
        //    middle(中级职称), other(其他职称), 
        //    undergraduate(本科生数), doctor(博士生数),
        //    masterDegree(硕士生数), postdoctoral(博士后数)
        // }
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  searchDept(deptName){
    return new Promise((resolve, reject)=>{
      axios.post('/searchDept', deptName)
      .then(rs=>{
        // 处理成tableList
        // {
        //    id: 1, 序号
        //    companyName: 1, 单位名称
        //    undergraduates: 1,  本科生
        //    masterDegree: 1,  硕士
        //    doctor: 1,  博士
        //    postdoctoral: 1,  博士后   
        // }
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
}

export default API
