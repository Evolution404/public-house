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
  // 搜索科研公用房使用效益
  searchScientificPerformance(info){
    // info = {
    //    year: xx,
    //    deptName: xx,
    // }
    return new Promise((resolve, reject)=>{
      axios.post('/searchScientificPerformance', info)
      .then(rs=>{
        // 处理成tableList
        // {
        //    id: 1, 序号
        //    scientificUnit: xx, 科研单位
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
  // 搜索商业用房使用效益
  searchBusinessPerformance(info){
    // info = {
    //    year: xx,
    //    deptName: xx,
    // }
    return new Promise((resolve, reject)=>{
      axios.post('/searchScientificPerformance', info)
      .then(rs=>{
        // 处理成tableList
        // {
        //    id: 1, 序号
        //    college: xx, 学院
        //    PH: xx, 公用房
        //    area: xx, 面积
        //    user: xx, 使用者
        //    rentPrice: xx, 租金单价
        //    annualRent: xx, 年租金
        //    year: xx, 年份
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
  // 搜索实验室使用效益
  searchLabPerformance(info){
    // info = {
    //    year: xx,
    //    deptName: xx,
    //    lab: xx,
    // }
    return new Promise((resolve, reject)=>{
      axios.post('/searchLabPerformance', info)
      .then(rs=>{
        // 处理成tableList
        // {
        //    id: 1, 序号
        //    dept: xx, 部门
        //    lab: xx, 实验室
        //    courseName: xx, 课程名
        //    schoolNum: xx, 学时数
        // }
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 搜索教室使用效益
  searchClassroomPerformance(info){
    // info = {
    //    year: xx,
    //    deptName: xx,
    //    lab: xx,
    // }
    return new Promise((resolve, reject)=>{
      axios.post('/searchClassroomPerformance', info)
      .then(rs=>{
        // 处理成tableList
        // {
        //    id: 1, 序号
        //    dept: xx, 部门
        //    classroom: xx, 教室
        //    courseName: xx, 课程名
        //    schoolNum: xx, 学时数
        // }
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 搜索会议室预约信息
  searchMeetingRoomReservation(info){
    // info = {
    //    peopleNum: xx, 人数要求
    //    startStopTime: xx, 使用起止时间
    //    equipment: xx, 设备要求
    // }
    return new Promise((resolve, reject)=>{
      axios.post('/searchMeetingRoomReservation', info)
      .then(rs=>{
        // 处理成tableList
        // {
        //    id: 1, 序号
        //    dept: xx, 部门
        //    location: xx, 位置
        //    usingNature: xx, 使用性质
        //    state: xx, 状态
        // }
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 开始预约
  startReservation(info){
    // info = {
    //    id: xx, 序号
    //    time: xx, 预约时段
    //    purpose: xx, 预约用途
    //    phone: xx, 联系电话
    // }
    return new Promise((resolve, reject)=>{
      axios.post('/startReservation', info)
      .then(rs=>{
        // 不需要返回结果, 确保成功调用resolve
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 搜索预约审批信息
  searchReservationAudit(info){
    // info = {
    //    deptName: xx, 部门名称
    //    usingNature: xx, 使用性质
    //    auditStatus: xx, 审批状态
    //    user: xx, 使用者
    //    buildingName: xx, 楼宇名称
    //    roomNum: xx, 房间号
    //    houseStatus: xx, 房屋状态
    // }
    return new Promise((resolve, reject)=>{
      axios.post('/searchReservationAudit', info)
      .then(rs=>{
        // 处理成tableList
        // {
        //    id: 1, 序号
        //    time: xx, 时间
        //    houseDept: xx, 房屋部门
        //    location: xx, 位置
        //    reservationPerson: xx, 预约人
        //    phone: xx, 联系电话
        //    purpose: xx, 预约用途
        // }
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 同意预约
  agreeReservation(id){
    return new Promise((resolve, reject)=>{
      axios.post('/agreeReservation', {id})
      .then(rs=>{
        // 不需要返回信息
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 拒绝预约
  refuseReservation(info){
    return new Promise((resolve, reject)=>{
      // info = {
      //   id: 1, 序号
      //   reason: xx, 拒绝原因
      // }
      axios.post('/refuseReservation', info)
      .then(rs=>{
        // 不需要返回信息
        resolve()
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 搜索我的预约
  searchMyReservation(info){
    // info = {
    //    houseDept: xx, 房屋部门名称
    //    buildingName: xx, 楼宇名称
    //    roomNum: xx, 房间号
    //    reservationStatus: xx, 预约状态
    // }
    return new Promise((resolve, reject)=>{
      axios.post('/searchMyReservation', info)
      .then(rs=>{
        // 需要的tableList结构
        // {
        //    id: 1, 序号
        //    time: xx, 时间
        //    houseDept: xx, 房屋部门
        //    location: xx, 位置
        //    reservationPerson: xx, 预约人
        //    phone: xx, 联系电话
        //    purpose: xx, 预约用途
        //    reservationStatus: xx, 预约状态
        //    type: xx, 区分最近一周 一月 三月 半年
        // }
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 再次预约
  retryReservation(id){
    return new Promise((resolve, reject)=>{
      axios.post('/retryReservation', {id})
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
  // 取消预约
  cancleReservation(id){
    return new Promise((resolve, reject)=>{
      axios.post('/cancleReservation', {id})
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
  // 搜索使用统计
  searchUseStatistical(info){
    // info = {
    //    deptName: xx, 部门名称
    //    building: xx, 楼宇
    //    roomNum: xx, 房间号
    //    startStopTime: xx, 起止时间
    // }
    return new Promise((resolve, reject)=>{
      axios.post('/searchUseStatistical', info)
      .then(rs=>{
        // 需要的tableList结构
        // {
        //    id: 1, 序号
        //    dept: xx, 部门
        //    meetingRoom: xx, 会议室
        //    totalUseTime: xx, 总使用时间
        //    avgDailyUseTime: xx, 日均使用时间
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
