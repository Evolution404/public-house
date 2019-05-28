import axios, {host, domainName} from './apiConfig'
import taxios from 'axios'
import {MapB2F, MapF2B} from './nameMapConfig'
import Map from '../routerMap'
import {pageSize} from '../component/common/table'

const deptManagement = {
  // 单位管理
  getDepts(type){
    let data = {}     
    if(type!=='0'){
      data.bumenleixing=type
    }
    return new Promise((resolve, reject)=>{
      axios.get('/tb-bumen/get/all/bumengmingcheng', {
        params: data,
      })
      .then(rs=>{
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  // 检测登录状态
  tgetDepts(type){
    let data = {}     
    if(type!=='0'){
      data.bumenleixing=type
    }
    let token = localStorage.getItem("x-auth-token")
    return new Promise((resolve, reject)=>{
      taxios.get(domainName+'/tb-bumen/get/all/bumengmingcheng', {
        params: data,
        headers: {
          'X-gongyongfangguanliApp-params': token,
        }
      })
      .then(rs=>{
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  searchDept(values, p){

    // 搜索单位, type可能是bc(部处)也可能是xy(学院)
    let type = values.type
    let bumen = values.dept
    delete values.type
    // 部处
    if(type==='bc'){
      return new Promise((resolve, reject)=>{
        axios.get('/tb-buchu-bumen/get/all', {
          params:{
            ...MapF2B(values),
            bumen,
            page: p?p.current-1:0,
            size: pageSize,
          }
        })
        .then(rs=>{
          let data = {
            tableList:rs.data.map(item=>MapB2F(item)),
            total: rs.headers['x-total-count'],
          }
          resolve(data)
       })
       .catch(err=>{
         reject(err)
       })
     })
     // 学院
    }else if(type==='xy'){
      return new Promise((resolve, reject)=>{
        axios.get('/tb-xueyuan-bumen/get/all', {
          params:{
            ...MapF2B(values),
            bumen,
            page: p?p.current-1:0,
            size: pageSize,
          }
        })
        .then(rs=>{
          let data = {
            tableList:rs.data.map(item=>MapB2F(item)),
            total: rs.headers['x-total-count'],
          }
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
       })
     })
   }
  },
  // 删除单位
  deleteDept({index, type}){
    if(type==='bc'){
      return new Promise((resolve, reject)=>{
        axios.delete('/tb-buchu-bumen/delete',
                     {params:{ids:`[${index.toString()}]`}})
        .then(rs=>{
          // 不需要传参数, 这里要确保是删除成功
          resolve()
       })
       .catch(err=>{
         reject(err)
       })
     })
   }else if(type==='xy'){
      return new Promise((resolve, reject)=>{
        axios.delete('/tb-xueyuan-bumen/delete',
                     {params:{ids:`[${index.toString()}]`}})
        .then(rs=>{
          // 不需要传参数, 这里要确保是删除成功
          resolve()
       })
       .catch(err=>{
         reject(err)
       })
     })
   }
  },
  // 新增单位
  addDept(data){
    let type = data.type
    if(type==='bc'){
      let mapData = MapF2B(data)
      return new Promise((resolve, reject)=>{
        axios.post('/tb-buchu-bumen/create', mapData)
        .then(rs=>{
          // 不需要传参数, 这里要确保是添加成功
          resolve()
       })
       .catch(err=>{
         reject(err)
       })
     })

    } else if(type==='xy'){
      let mapData = MapF2B(data)
      return new Promise((resolve, reject)=>{
        axios.post('/tb-xueyuan-bumen/create', mapData)
        .then(rs=>{
          // 不需要传参数, 这里要确保是添加成功
          resolve()
       })
       .catch(err=>{
         reject(err)
       })
     })
   }
  },
  // 更新单位
  // {
  //    index: 1,
  //    其余信息
  // }
  updateDept(newData){
    if(newData.type==='bc'){
      return new Promise((resolve, reject)=>{
        axios.post('/tb-buchu-bumen/update', MapF2B(newData))
        .then(rs=>{
          // 不需要传参数, 这里要确保是删除成功
          resolve()
       })
       .catch(err=>{
         reject(err)
       })
     })
   }else if(newData.type==='xy'){
      return new Promise((resolve, reject)=>{
        axios.post('/tb-xueyuan-bumen/update', MapF2B(newData))
        .then(rs=>{
          // 不需要传参数, 这里要确保是删除成功
          resolve()
       })
       .catch(err=>{
         reject(err)
       })
     })
   }
  },
}

const parmManagement = {
  // 参数管理
  getAllParams(){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-canshu-peizhi/get/all')
      .then(rs=>{
        resolve(rs.data)
     })
     .catch(err=>{
       reject(err)
     })
   })
 },
  setParmValue(id, canshuzhi){
    let data = new FormData()
    data.append('id', id)
    data.append('canshuzhi', canshuzhi)
    return new Promise((resolve, reject)=>{
      axios.post('/tb-canshu-peizhi/update', data)
      .then(rs=>{
        resolve(rs.data)
     })
     .catch(err=>{
       reject(err)
     })
   })
 },
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
     })
   })
 },
}

const buildingManagement = {
  // 楼宇管理

  getBuildings(){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-louyu/get/all/louyumingcheng')
      .then(rs=>{
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  getBuildingFloors(building){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-louyu/get/louceng', {
        params: {louyumingcheng: building},
      })
      .then(rs=>{
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  searchBuilding(name, p,s){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-louyu/get/all',{
        params: {
          ...s,
          louyumingcheng: name,
          page: p?p.current-1:0,
          size: pageSize,
        }
      })
      .then(rs=>{
        // {
        //    id: xx,
        //    name: xx,
        //    buildingArea: xx,  建筑面积
        //    buildingTime: xx,  建筑年代
        //    useArea: xx,  使用面积
        // }
        let data = {
          tableList:rs.data.map(item=>MapB2F(item)),
          total: rs.headers['x-total-count'],
        }
        resolve(data)
     })
     .catch(err=>{
       reject(err)
     })
   })
 },
  addBuilding(data){
    return new Promise((resolve, reject)=>{
      axios.post('/tb-louyu/create', MapF2B(data))
      .then(rs=>{
        // 成功时调用
        resolve()
     })
     .catch(err=>{
       reject(err)
     })
   })
 },
  deleteBuilding(indexList){
    return new Promise((resolve, reject)=>{
      axios.delete('/tb-louyu/delete',
                 {params: {ids: `[${indexList.toString()}]`}})
      .then(rs=>{
        // 成功时调用
        resolve()
     })
     .catch(err=>{
       reject(err)
     })
   })
 },
  updateBuilding(data){
    return new Promise((resolve, reject)=>{
      axios.post('/tb-louyu/update', MapF2B(data))
      .then(rs=>{
        // 成功时调用
        resolve()
     })
     .catch(err=>{
       reject(err)
     })
   })
 },
}

const theUserManagement = {
  // 人员信息管理
  searchPersonnel(name, p,s){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-shiyongzhe/get/all', {
        params: {
          ...s,
          xingming: name,
          page: p?p.current-1:0,
          size: pageSize,
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
        let data = {
          tableList:rs.data.map(item=>MapB2F(item)),
          total: rs.headers['x-total-count'],
        }
        resolve(data)
     })
     .catch(err=>{
       reject(err)
     })
   })
 },
  addPersonnel(data){
    let mapData = MapF2B(data)
    return new Promise((resolve, reject)=>{
      axios.post('/tb-shiyongzhe/create', mapData)
      .then(rs=>{
        // 成功时调用
        resolve()
     })
     .catch(err=>{
       reject(err)
     })
   })
 },
  deletePersonnel(indexList){
    return new Promise((resolve, reject)=>{
      axios.delete('/tb-shiyongzhes/delete',
                   {params: {ids: `[${indexList.toString()}]`}})
      .then(rs=>{
        // 成功时调用
        resolve()
     })
     .catch(err=>{
       reject(err)
     })
   })
 },
  changePersonnel(data){
    return new Promise((resolve, reject)=>{
      axios.post('/tb-shiyongzhe/update', MapF2B(data))
      .then(rs=>{
        // 成功时调用
        resolve()
     })
     .catch(err=>{
       reject(err)
     })
   })
 },
  detailPersonnel(index){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-shiyongzhe/get/'+index)
      .then(rs=>{
        // 处理成需要使用者信息
        // {
        //    工号: workNum
        //    姓名: name
        //    职务等级: dutyGrade
        //    所属单位: dept
        //    科研单位: scientificResearchUnits
        //    类别: category
        // }
        resolve(MapB2F(rs.data))
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
}

const userManagement = {
  // 用户管理

  // 获取所有的角色接口
  getRoles(){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-juese/get/all')
      .then(rs=>{
        // 处理成一个列表
        // 每一项包括id和juesemingcheng
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  loginCheck(values){
    const listName2Component = {
      '信息管理':{
        '基础信息管理': Map.BasicInfoManagement,
        '公用房列表': Map.PHList,
        '公用房新增': Map.PHAdd,
        '公用房变更': Map.PHChange,
        '公用房改造': Map.PHTransform,
        '公用房改造审核': Map.PHTransformAudit,
        '公用房审核': Map.PHAudit,
        '我的公用房': Map.MyPH,
      },
      '公用房查询':{
        '条件查询': Map.ConditionQuery,
        '楼宇查询': Map.BuildingQuery,
      },
      '核算管理':{
        '总体核算': Map.OverallAccount,
        '单位核算': Map.DepartmentAccount,
        '个人核算': Map.PersonalAccount,
      },
      '绩效管理':{
        '数据导入': Map.DataImport,
        '工作量查看': Map.CheckWorkload,
        '教学单位绩效': Map.TeachingUnitPerformance,
        '科研单位绩效': Map.ScientificPerformance,
        '商业用房绩效': Map.BusinessPerformance,
        '实验室绩效': Map.LabPerformance,
        '教室绩效': Map.ClassroomPerformance,
      },
      '动态监测':{
        '实时监测': Map.RealtimeMonitor,
        '监测统计': Map.MonitorStatistics,
      },
      '会议室管理':{
        '会议室预约': Map.MeetingRoomReservation,
        '预约审批': Map.ReservationAudit,
        '我的预约': Map.MyReservation,
        '使用统计': Map.UseStatistical,
      },
      '公寓管理':{
        '实时监测': Map.ARealtimeMonitor,
        '监测统计': Map.AMonitorStatistics,
      },
      '系统管理':{
        '单位管理': Map.DeptManagement,
        '参数管理': Map.ParmManagement,
        '楼宇管理': Map.BuildingManagement,
        '人员信息管理': Map.TheUserManagement,
        '用户管理': Map.UserManagement,
        '补贴面积': Map.AreaSubsidiesImport,
      },
    }
    return new Promise((resolve, reject)=>{
      let dataStr = `dengluzhanghao=${values.loginAccount}&mima=${values.password}`
      axios.post('/tb-denglu-renyuan/login', dataStr)
      .then(rs=>{
        // 成功时调用
        let returnData = {}
        let mobaninfo = {}
        for(let key in rs.data.mobaninfo)
          mobaninfo[key]=host+rs.data.mobaninfo[key]
        returnData.mobaninfo = mobaninfo
        returnData.navData = rs.data['caidanxinxi'].map(item=>{
          let rs = {} 
          rs.text = item['fucaidanmingcheng']
          rs.img = `/images/${item['fucaidanmingcheng']}.png`
          rs.list= item['zicaidan'].map(zicaidan=>{
            return listName2Component[item['fucaidanmingcheng']][zicaidan['caidanmingcheng']]
          })
          return rs
        })
        returnData.userData = {}
        returnData.userData.loginAccount = rs.data['dengluzhanghao']
        returnData.userData.dept = rs.data['dept']
        returnData.userData.role = rs.data['jueseid']
        returnData.userData.userName = rs.data['yonghumingcheng']
        returnData.userData.token = rs.data['token']
        returnData.userData.id= rs.data['id']
        returnData.userData.workNum= rs.data['gonghao']
        resolve(returnData)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  logout(){
    return new Promise((resolve, reject)=>{
      axios.get('tb-denglu-renyuan/logout')
      .then(rs=>{
        resolve()
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  addUser(data){
    return new Promise((resolve, reject)=>{
      axios.post('/tb-denglu-renyuan/create', MapF2B(data))
      .then(rs=>{
        // 成功时调用
        resolve()
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  deleteUser(indexList, deleteshiyongzhe){
    return new Promise((resolve, reject)=>{
      axios.delete('/tb-denglu-renyuan/delete',{
        params: {ids: `[${indexList.toString()}]`, deleteshiyongzhe}
      })
      .then(rs=>{
        // 成功时调用
        resolve()
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  changeUser(data){
    return new Promise((resolve, reject)=>{
      axios.post('/tb-denglu-renyuan/update', MapF2B(data))
      .then(rs=>{
        // 成功时调用
        resolve()
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  changePW(data){
    return new Promise((resolve, reject)=>{
      let dataStr =
        `dengluzhanghao=${data.loginAccount}&xinmima=${data.newPassword}&jiumima=${data.oldPassword}`
       axios.post('/tb-denglu-renyuan/update/mima', dataStr)
      .then(rs=>{
        // 成功时调用
        resolve()
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  searchUser(name, p,s){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-denglu-renyuan/get/all',{
        params:{
          ...s,
          yonghumingcheng: name,
          page: p?p.current-1:0,
          size: pageSize,
        }
      })
      .then(rs=>{
        // 处理rs为包括如下对象的列表
        // [{
        //    id: xx,
        //    name: xx,
        //    loginAccount: xx, 登录账号
        //    dept: xx,  所属单位
        //    role: xx, 角色
        // }]
        let data = {
          tableList:rs.data.map(item=>MapB2F(item)),
          total: rs.headers['x-total-count'],
        }
        resolve(data)
      })
      .catch(err=>{
        reject(err)
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
