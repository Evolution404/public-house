import axios from 'axios'
import {domainName} from './urlConfig'

const meetingRoomReservation = {
  // 会议室预约
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

}

const myReservation = {
  // 我的预约

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
}

const reservationAudit = {
  // 预约审批

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
}

const useStatistical = {
  // 使用统计

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

export default {
  ...meetingRoomReservation,
  ...myReservation,
  ...reservationAudit,
  ...useStatistical,
}
