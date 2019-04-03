import axios from 'axios'
import {domainName} from './urlConfig'

const businessPerformance = {
  // 商业用房绩效

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
}

const checkWorkload = {
  // 工作量查看

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
}
const classroomPerformance = {
  // 教室绩效

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
}
const dataImport = {
  // 数据导入

}
const labPerformance = {
  // 实验室绩效

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

}
const scientificPerformance = {
  // 科研单位绩效

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
}
const teachingUnitPerformance = {
  // 教学单位绩效

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

export default {
  ...businessPerformance,
  ...checkWorkload,
  ...classroomPerformance,
  ...dataImport,
  ...labPerformance,
  ...scientificPerformance,
  ...teachingUnitPerformance,
}
