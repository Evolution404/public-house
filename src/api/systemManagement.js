import axios from 'axios'
import {MapB2F, MapF2B} from './nameMapConfig'
import {domainName} from './urlConfig'

const deptManagement = {
  // 部门管理

  searchDept(values){
    // values = {
    //    deptName, type
    // }
    // 搜索部门, type可能是bc(部处)也可能是xy(学院)
    let type = values.type
    let bumen = values.deptName
    // 部处
    if(type==='bc'){
      return new Promise((resolve, reject)=>{
        axios.get(domainName+'/tb-buchu-bumen/get/all', {params:{bumen}})
        .then(rs=>{
          let data = rs.data.map(item=>MapB2F(item))
          resolve(data)
        })
        .catch(err=>{
          reject(err)
          console.log(err)
        })
      })
      // 学院
    }else if(type==='xy'){
      return new Promise((resolve, reject)=>{
        axios.get(domainName+'/tb-xueyuan-bumen/get/all', {params:{bumen}})
        .then(rs=>{
          let data = rs.data.map(item=>MapB2F(item))
          // 处理成tableList
          // {
          //    id: 1, 序号
          //    companyName: 1, 单位名称
          //    undergraduates: 1,  本科生
          //    masterDegree: 1,  硕士
          //    doctor: 1,  博士
          //    postdoctoral: 1,  博士后   
          // }
          resolve(data)
        })
        .catch(err=>{
          reject(err)
          console.log(err)
        })
      })
    }
  },
  // 删除部门
  deleteDept({index, type}){
    if(type==='bc'){
      return new Promise((resolve, reject)=>{
        axios.delete(domainName+'/tb-buchu-bumen/delete',
                     {params:{ids:`[${index.toString()}]`}})
        .then(rs=>{
          // 不需要传参数, 这里要确保是删除成功
          resolve()
        })
        .catch(err=>{
          reject(err)
          console.log(err)
        })
      })
    }else if(type==='xy'){
      return new Promise((resolve, reject)=>{
        axios.delete(domainName+'/tb-xueyuan-bumen/delete',
                     {params:{ids:`[${index.toString()}]`}})
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
  },
  // 新增部门
  addDept(data){
    let type = data.type
    if(type==='bc'){
      let mapData = MapF2B(data)
      return new Promise((resolve, reject)=>{
        axios.post(domainName+'/tb-buchu-bumen/create', mapData)
        .then(rs=>{
          // 不需要传参数, 这里要确保是添加成功
          resolve()
        })
        .catch(err=>{
          reject(err)
          console.log(err)
        })
      })

    } else if(type==='xy'){
      let mapData = MapF2B(data)
      return new Promise((resolve, reject)=>{
        axios.post(domainName+'/tb-xueyuan-bumen/create', mapData)
        .then(rs=>{
          // 不需要传参数, 这里要确保是添加成功
          resolve()
        })
        .catch(err=>{
          reject(err)
          console.log(err)
        })
      })
    }
  },
  // 更新部门
  // {
  //    index: 1,
  //    其余信息
  // }
  updateDept(newData){
    if(newData.type==='bc'){
      return new Promise((resolve, reject)=>{
        axios.post(domainName+'/tb-buchu-bumen/update', MapF2B(newData))
        .then(rs=>{
          // 不需要传参数, 这里要确保是删除成功
          resolve()
        })
        .catch(err=>{
          reject(err)
          console.log(err)
        })
      })
    }else if(newData.type==='xy'){
      return new Promise((resolve, reject)=>{
        axios.post(domainName+'/tb-xueyuan-bumen/update', MapF2B(newData))
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
  },
}

const parmManagement = {
  // 参数管理

  // 设置地下室面积系数
  setBasementCoefficient(basementCoefficient){
    return new Promise((resolve, reject)=>{
      // 这里传入的是一个对象
      // {
      //    basementCoefficient: xxx,
      // }
      axios.post('/setBasementCoefficient', basementCoefficient)
      .then(rs=>{
        // 不需要传参数, 只需要确保成功的时候才调用
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 设置简易房面积系数
  setBunkCoefficient(bunkCoefficient){
    return new Promise((resolve, reject)=>{
      // 这里传入的是一个对象
      // {
      //    bunkCoefficient: xxx,
      // }
      axios.post('/setBasementCoefficient', bunkCoefficient)
      .then(rs=>{
        // 不需要传参数, 只需要确保成功的时候才调用
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },

}

const buildingManagement = {
  // 楼宇管理

  searchBuilding(name){
    return new Promise((resolve, reject)=>{
      axios.get(domainName+'/tb-louyu/get/all',
                {params: {louyumingcheng: name}})
      .then(rs=>{
        let mapData = rs.data.map(item=>MapB2F(item))
        // {
        //    id: xx,
        //    name: xx,
        //    buildingArea: xx,  建筑面积
        //    buildingTime: xx,  建筑年代
        //    useArea: xx,  使用面积
        // }
        resolve(mapData)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  addBuilding(data){
    return new Promise((resolve, reject)=>{
      axios.post(domainName+'/tb-louyu/create', MapF2B(data))
      .then(rs=>{
        // 成功时调用
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  deleteBuilding(indexList){
    return new Promise((resolve, reject)=>{
      axios.delete(domainName+'/tb-louyu/delete',
                 {params: {ids: `[${indexList.toString()}]`}})
      .then(rs=>{
        // 成功时调用
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  updateBuilding(data){
    return new Promise((resolve, reject)=>{
      axios.post(domainName+'/tb-louyu/update', MapF2B(data))
      .then(rs=>{
        // 成功时调用
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 导入楼宇信息
  ULBuildings(formData){
    return new Promise((resolve, reject)=>{
      axios({
        url:domainName+'/tb-louyu/import-excel',
          method: 'post',
          data: formData,
          processData: false,  // 告诉axios不要去处理发送的数据(重要参数)
          contentType: false,  // 告诉axios不要去设置Content-Type请求头
      })
      .then(rs=>{
          console.log(rs)
          // 上传成功执行
          resolve()
      })
      .catch(err=>{
        console.log(err)
        reject(err)
      })
    })
  },
}

const theUserManagement = {
  // 使用者管理
  searchPersonnel(name){
    return new Promise((resolve, reject)=>{
      axios.get('/searchPersonnel', {
        params: {
          xingming: name,
        }
      })
      .then(rs=>{
        // {
        //    id: xx,
        //    name: xx,
        //    duty: xx,  职务
        //    monad: xx,  单位
        //    guideNum: xx,  指导研究生数量
        // }
        let data = rs.data.map(item=>({
          id: item.id,
          name: item.xingming,
          duty: item.zhiwujibie,
          monad: item.bumen,
          //guideNum: 
        }))
        resolve(data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  addPersonnel(data){
    let mapData = {
      gonghao: data.workNum,
      xingming: data.name,
      zhiwujibie: data.dutyGrade,
      bumen: data.dept,
      // data.scientificResearchUnits,
      // data.category,
    }
    return new Promise((resolve, reject)=>{
      axios.post('/addPersonnel', mapData)
      .then(rs=>{
        // 成功时调用
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  deletePersonnel(indexList){
    return new Promise((resolve, reject)=>{
      axios.delete(domainName+'/tb-shiyongzhes/delete',
                   {params: {ids: `[${indexList.toString()}]`}})
      .then(rs=>{
        // 成功时调用
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  changePersonnel(data){
    return new Promise((resolve, reject)=>{
      axios.post('/changePersonnel', data)
      .then(rs=>{
        // 成功时调用
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  detailPersonnel(index){
    return new Promise((resolve, reject)=>{
      axios.post('/detailPersonnel', index)
      .then(rs=>{
        // 处理成需要的部门信息
        // {
        //    工号: workNum
        //    姓名: name
        //    职务等级: dutyGrade
        //    所属部门: dept
        //    科研单位: scientificResearchUnits
        //    类别: category
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

const userManagement = {
  // 用户管理
  addUser(data){
    let mapData = {
      dengluzhanghao: data.loginAccount,
      yonghumingcheng: data.name,
      mima: data.password,
      bumenId: data.dept,
      juseId: data.role,
    }
    return new Promise((resolve, reject)=>{
      axios.post('/addUser', mapData)
      .then(rs=>{
        // 成功时调用
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  deleteUser(indexList){
    return new Promise((resolve, reject)=>{
      axios.post('/deleteUser', {ids: indexList})
      .then(rs=>{
        // 成功时调用
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  changeUser(data){
    let mapData = {
      dengluzhanghao: data.loginAccount,
      yonghumingcheng: data.name,
      bumenId: data.dept,
      juseId: data.role,
    }
    return new Promise((resolve, reject)=>{
      axios.post('/changeUser', mapData)
      .then(rs=>{
        // 成功时调用
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  searchUser(name){
    return new Promise((resolve, reject)=>{
      axios.get('/searchUser',{
        params:{
          yonghumingcheng: name
        }
      })
      .then(rs=>{
        // 处理rs为包括如下对象的列表
        // [{
        //    id: xx,
        //    name: xx,
        //    loginAccount: xx, 登录账号
        //    dept: xx,  所属部门
        //    role: xx, 角色
        // }]
        let data = rs.data.map(item=>({
          id: item.id,
          name: item.yonghumingcheng,
          loginAccount: item.dengluzhanghao,
          dept: item.bumenId,
          role: item.juseId,
        }))
        resolve(data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
}

const SystemManagement = {
  ...deptManagement,
  ...parmManagement,
  ...buildingManagement,
  ...userManagement,
  ...theUserManagement,
}

export default SystemManagement
