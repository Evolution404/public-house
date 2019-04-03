import axios from 'axios'
import {domainName} from './urlConfig'

const PHAdd = {
  // 公用房新增
  
  // 新增公用房
  addPH(values){
    return new Promise((resolve, reject)=>{
      axios.post('/addPH', values)
      .then(rs=>{
        // 成功调用
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
}

const PHAddBrief = {
  // 公用房新增

  briefAddPH(values){
    return new Promise((resolve, reject)=>{
      axios.post('/briefAddPH', values)
      .then(rs=>{
        // 成功调用
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },

}

const PHAudit = {
  // 公用房审核

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
}

const PHAuditDetail = {
  // 公用房详细信息

  // 公用房审核详细界面批准接口
  aprovalPH(index){
    return new Promise((resolve, reject)=>{
      axios.post('/aprovalPH', {index})
      .then(rs=>{
        // 成功后调用
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 公用房审核详细界面拒绝接口
  rejectedPH(index){
    return new Promise((resolve, reject)=>{
      axios.post('/rejectedPH', {index})
      .then(rs=>{
        // 成功后调用
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },

  // 公用房审核详细界面的搜索接口
  auditDetailPH(index){
    return new Promise((resolve, reject)=>{
      axios.post('/auditDetailPH', {index})
      .then(rs=>{
        // 将后台传来数据转换成如下格式
        // {
        /*    dept: '计算机科学与技术学院',
              usingNature: '学院用房',
              secondaryNature: '专业实验室',
              building: '研学楼',
              floor: '6楼',
              roomNum: '604室',
              usingArea: '100.4平方米',
              user: ['张三', '李四'],
              head: '张三',
              fireHead: '张三',
              drawings: ['1.jpg', '2.jpg'],
              housePic: ['1.jpg', '2.jpg'],
              houseDesc: '这是房屋描述, 1111111',
              equipment: ['投影仪', '音响', '麦克风'],
              peopleNum: '5-10人',
              approvalDocument: '1.jpg',*/
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

const PHChange = {
  // 公用房变更

  // 公用房变更的搜索接口
  changeFilterPH(filter){
    // filter = {
    //    id: 1, id参数是跳转过来的时候传递
    //    buildingName: xxx,
    //    roomNum: xxx,
    // }
    return new Promise((resolve, reject)=>{
      axios.post('/changeFilterPH', filter)
      .then(rs=>{
        // 将后台传来数据转换成如下格式
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
}

const PHChangeBrief = {
  // 公用房变更

  // 公用房变更的搜索接口
  briefChangeFilterPH(index){
    // filter = {
    //    id: 1, id参数是跳转过来的时候传递
    //    buildingName: xxx,
    //    roomNum: xxx,
    // }
    return new Promise((resolve, reject)=>{
      axios.post('/briefChangeFilterPH', {index})
      .then(rs=>{
        // 将后台传来数据转换成如下格式
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 公用房变更的提交接口
  briefChangeSubmitPH(values){
    // filter = {
    //    id: 1, id参数是跳转过来的时候传递
    //    buildingName: xxx,
    //    roomNum: xxx,
    // }
    return new Promise((resolve, reject)=>{
      axios.post('/briefChangeSubmitPH', values)
      .then(rs=>{
        // 将后台传来数据转换成如下格式
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
}

const PHImport = {
  // 公用房导入

}

const PHList = {
  // 公用房列表

  //上报公用房记录
  reportPH(index){
    return new Promise((resolve, reject)=>{
      axios.post('/reportPH', {index})
      .then(rs=>{
        // 不需要传参数, 这里要确保是上报成功
        resolve()
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
  // 删除公用房记录
  deletePH(indexList){
    return new Promise((resolve, reject)=>{
      axios.post('/deletePH', {indexList})
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
}

const basicInfoManagement = {
  // 基础信息管理

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
}

const myPH = {
  // 我的公用房

}

export default {
  ...PHAdd,
  ...PHAddBrief,
  ...PHAudit,
  ...PHAuditDetail,
  ...PHChange,
  ...PHChangeBrief,
  ...PHImport,
  ...PHList,
  ...basicInfoManagement,
  ...myPH,
}
