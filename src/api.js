import axios from 'axios'
// 引用假数据, 对接后删除
import './mock'

const FileUploadAPI = {
  // 上传教学单位工作量
  ULTeachingUnitWorkLoad(formData){
    return new Promise((resolve, reject)=>{
      axios({
        url:'/upload',
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
  // 上传科研单位工作量
  ULScientificUnitWorkLoad(formData){
    return new Promise((resolve, reject)=>{
      axios({
        url:'/upload',
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
  // 上传规范分
  ULSpecificationPoints(formData){
    return new Promise((resolve, reject)=>{
      axios({
        url:'/upload',
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
  // 上传商业用房数据
  ULBusiness(formData){
    return new Promise((resolve, reject)=>{
      axios({
        url:'/upload',
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
  // 上传教室承担课程信息
  ULClassroom(formData){
    return new Promise((resolve, reject)=>{
      axios({
        url:'/upload',
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

const API = {
  ...FileUploadAPI,
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
  // 新增部门
  addDept(data){
    return new Promise((resolve, reject)=>{
      axios.post('/addDept', data)
      .then(rs=>{
        // 不需要传参数, 这里要确保是添加成功
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 更新部门
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
  searchBuilding(name){
    return new Promise((resolve, reject)=>{
      axios.post('/searchBuilding', {name})
      .then(rs=>{
        // {
        //    id: xx,
        //    name: xx,
        //    buildingArea: xx,  建筑面积
        //    buildingTime: xx,  建筑年代
        //    useArea: xx,  使用面积
        // }
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  addBuilding(data){
    return new Promise((resolve, reject)=>{
      axios.post('/addBuilding', data)
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
      axios.post('/deleteBuilding', indexList)
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
      axios.post('/updateBuilding', data)
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
  searchPersonnel(name){
    return new Promise((resolve, reject)=>{
      axios.post('/searchPersonnel', {name})
      .then(rs=>{
        // {
        //    id: xx,
        //    name: xx,
        //    duty: xx,  职务
        //    monad: xx,  单位
        //    guideNum: xx,  指导研究生数量
        // }
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  addPersonnel(data){
    return new Promise((resolve, reject)=>{
      axios.post('/addPersonnel', data)
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
      axios.post('/deletePersonnel', {indexList})
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
  searchUser(name){
    return new Promise((resolve, reject)=>{
      axios.post('/searchUser', {name})
      .then(rs=>{
        // 处理rs为包括如下对象的列表
        // [{
        //    id: xx,
        //    name: xx,
        //    loginAccount: xx, 登录账号
        //    dept: xx,  所属部门
        //    role: xx, 角色
        // }]
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  addUser(data){
    return new Promise((resolve, reject)=>{
      axios.post('/addUser', data)
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
      axios.post('/deleteUser', {indexList})
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
    return new Promise((resolve, reject)=>{
      axios.post('/changeUser', data)
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
  searchWorkLoad(deptName){
    return new Promise((resolve, reject)=>{
      axios.post('/searchWorkLoad', deptName)
      .then(rs=>{
        // 处理成tableList
        // {
        //    id: 1, 序号
        //    dept: xx, 部门
        //    teachingWorkLoad: xx, 教学工作量
        //    scientificWorkLoad: xx, 科研工作量
        // }
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 搜索教学单位公用房使用效益
  searchTeachingUnitPHUsePerformance(info){
    // {
    //    year: xx,
    //    deptName: xx,
    // }
    return new Promise((resolve, reject)=>{
      axios.post('/searchTeachingUnitPHUsePerformance', info)
      .then(rs=>{
        // 处理成tableList
        // {
        //    id: 1, 序号
        //    college: xx, 学院
        //    teachingWorkLoad: xx, 教学工作量
        //    scientificWorkLoad: xx, 科研工作量
        //    specificationPoints: xx, 规范管理分
        //    PHArea: xx, 公用房面积
        //    usePerformance: xx, 使用效益
        //    averagePerformance: xx, 米均效益
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
