import axios from './apiConfig'
import {MapF2B} from './nameMapConfig'
import {pageSize} from '../component/common/table'

const businessPerformance = {
  // 商业用房绩效

  // 搜索商业用房使用效益
  searchBusinessPerformance(info, p){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-chanye-shangye-yongfang/get/shangyeyongfangshiyongjixiao',
                 {
                   params: {
                      bumen: info.dept,
                      page: p?p.current-1:0,
                      size: pageSize,
                   },
                 })
      .then(rs=>{
        let data = {}
        data.tableList = {
          tableList:rs.data.resultlist,
          total: rs.headers['x-total-count'],
        }
        data.graphData = rs.data.zhuzhuangtu
        data.totalArea = rs.data.heji.zongmianji
        data.totalRent = rs.data.heji.zongzujin
        data.avgPerformance = rs.data.heji.zongmijunxiaoyi
        resolve(data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
}

const checkWorkload = {
  // 工作量查看

  searchWorkLoad(dept, p){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-jiaoxue-keyan-gongzuoliang/get/all', {
        params: {
          bumen: dept,
          page: p?p.current-1:0,
          size: pageSize,
        },
      })
      .then(rs=>{
        // 处理成tableList
        // {
        //    id: 1, 序号
        //    dept: xx, 部门
        //    teachingWorkLoad: xx, 教学工作量
        //    scientificWorkLoad: xx, 科研工作量
        // }
        let data = {
          tableList:rs.data,
          total: rs.headers['x-total-count'],
        }
        resolve(data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
}
const classroomPerformance = {
  // 教室绩效
  // 搜索教室
  getClassrooms(nianfen, bumen){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-jiaoshi-shiyanshi-kechengxinxi/get/jiaoshi',{
        params: {nianfen, bumen}
      })
      .then(rs=>{
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  // 搜索教室使用效益
  searchClassroomPerformance(info, p){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-jiaoshi-shiyanshi-kechengxinxi/get/jiaoshijixiao', {
        params: {
          ...MapF2B(info),
          page: p?p.current-1:0,
          size: pageSize,
        }
      })
      .then(rs=>{
        // 处理成tableList
        // {
        //    id: 1, 序号
        //    dept: xx, 部门
        //    classroom: xx, 教室
        //    courseName: xx, 课程名
        //    schoolNum: xx, 学时数
        // }
        let data = {}
        data.tableList = {
          tableList:rs.data.resultlist,
          total: rs.headers['x-total-count'],
        }
        data.totalSchool = rs.data.zongxueshishu
        data.graphData = rs.data.zhuzhuangtu
        resolve(data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
}
const dataImport = {
  // 数据导入

}
const labPerformance = {
  // 实验室绩效

  // 搜索实验室
  getLabs(nianfen, bumen){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-jiaoshi-shiyanshi-kechengxinxi/get/shiyanshi',{
        params: {nianfen, bumen}
      })
      .then(rs=>{
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  // 搜索实验室使用效益
  searchLabPerformance(info, p){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-jiaoshi-shiyanshi-kechengxinxi/get/shiyanshijixiao', {
        params: {
          ...MapF2B(info),
          page: p?p.current-1:0,
          size: pageSize,
        }
      })
      .then(rs=>{
        // 处理成tableList
        // {
        //    id: 1, 序号
        //    dept: xx, 部门
        //    lab: xx, 实验室
        //    courseName: xx, 课程名
        //    schoolNum: xx, 学时数
        // }
        let data = {}
        data.tableList = {
          tableList:rs.data.resultlist,
          total: rs.headers['x-total-count'],
        }
        data.graphData = rs.data.zhuzhuangtu
        data.totalSchool = rs.data.zongxueshishu
        resolve(data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },

}
const scientificPerformance = {
  // 科研单位绩效

  // 搜索科研公用房使用效益
  searchScientificPerformance(info, p){
    // info = {
    //    year: xx,
    //    deptName: xx,
    // }
    return new Promise((resolve, reject)=>{
      axios.get('/tb-keyantuandui-keyangongzuoliang/get/keyandanweishiyongjixiao', 
      {
        params: {
          ...MapF2B(info),
          page: p?p.current-1:0,
          size: pageSize,
        }
      })
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
        let data = {}
        data.tableList = {
          tableList:rs.data.resultlist,
          total: rs.headers['x-total-count'],
        }
        data.graphData = rs.data.zhuzhuangtu
        resolve(data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
}
const teachingUnitPerformance = {
  // 教学单位绩效

  // 搜索教学单位公用房使用效益
  searchTeachingUnitPHUsePerformance(info, p){
    // {
    //    year: xx,
    //    dept: xx,
    // }
    return new Promise((resolve, reject)=>{
      axios.get('/tb-jiaoxue-keyan-gongzuoliang/get/jiaoxuedanweishiyongjixiao',{
        params: {
          ...MapF2B(info),
          page: p?p.current-1:0,
          size: pageSize,
        }
      })
      .then(rs=>{
        let data = {}
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
        data.tableList = {
          tableList:rs.data.resultlist,
          total: rs.headers['x-total-count'],
        }
        data.graphData = rs.data.zhuzhuangtu
        resolve(data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },

}

export default {
  ...businessPerformance,
  ...checkWorkload,
  ...classroomPerformance,
  ...dataImport,
  ...labPerformance,
  ...scientificPerformance,
  ...teachingUnitPerformance,
}
