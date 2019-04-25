import axios from './apiConfig'
import {MapB2F, MapF2B} from './nameMapConfig'


const meetingRoomReservation = {
  // 会议室预约
  // 搜索会议室预约信息
  searchMeetingRoomReservation(info){
    // info = {
    //    peopleNum: xx, 人数要求
    //    startStopTime: xx, 使用起止时间
    //    equipment: xx, 设备要求
    // }
    let newInfo = MapF2B(info)
    let deviceConfig = info.deviceConfig
    newInfo.touyingyi = ''
    newInfo.yinxiang = ''
    newInfo.maikefeng = ''
    newInfo.diannao = ''
    newInfo.baiban = ''
    if(deviceConfig){
      newInfo.touyingyi = deviceConfig.indexOf('投影仪')>-1?'是':''
      newInfo.yinxiang = deviceConfig.indexOf('音响')>-1?'是':''
      newInfo.maikefeng = deviceConfig.indexOf('麦克风')>-1?'是':''
      newInfo.diannao = deviceConfig.indexOf('电脑')>-1?'是':''
      newInfo.baiban = deviceConfig.indexOf('白板')>-1?'是':''
    }
    newInfo.kaishishijian = info.startStopTime[0]
    newInfo.jieshushijian = info.startStopTime[1]
    return new Promise((resolve, reject)=>{
      axios.get('/tb-xueyuan-dangzhengjiguan-yongfang/get/screen', {
        params: newInfo,
      })
      .then(rs=>{
        // 处理成tableList
        // {
        //    id: 1, 序号
        //    dept: xx, 部门
        //    location: xx, 位置
        //    usingNature: xx, 使用性质
        //    state: xx, 状态
        // }
        let data = rs.data.map(item=>MapB2F(item))
        resolve(data)
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
    let data = MapF2B(info)
    data.huiyishiid = info.id
    data.kaishishijian = info.startStopTime[0]
    data.jieshushijian = info.startStopTime[1]
    delete data.id
    let formData = new FormData()
    Object.keys(data).forEach(key=>{
      formData.append(key, data[key])
    })
    return new Promise((resolve, reject)=>{
      axios.post('/tb-huiyishi-yuyue/order', formData)
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
    let data = MapF2B(info)
    data.time = data.leixing
    return new Promise((resolve, reject)=>{
      axios.get('/tb-huiyishi-yuyue/get/myreservation', {
        params: data,
      })
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
        let data = rs.data.map(item=>MapB2F(item))
        resolve(data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 再次预约
  retryReservation(info){
    let formData = new FormData()
    formData.append('huiyishiyuyueid', info.id)
    formData.append('lianxidianhua', info.phone)
    formData.append('yuyueyongtu', info.reservationPurpose)
    formData.append('kaishishijian', info.startStopTime[0])
    formData.append('jieshushijian', info.startStopTime[1])
    return new Promise((resolve, reject)=>{
      axios.post('/tb-huiyishi-yuyue/orderagain', formData)
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
      axios.delete('/tb-huiyishi-yuyue/cancel', {
        params: {id},
      })
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
    let newInfo = MapF2B(info)
    return new Promise((resolve, reject)=>{
      axios.get('/tb-huiyishi-yuyue/get/all', {
        params: newInfo,
      })
      .then(rs=>{
        // 处理成tableList
        // {
        //    id: 1, 序号
        //    time: xx, 时间
        //    dept: xx, 房屋部门
        //    building: xx, 楼宇
        //    floor: xx, 楼层
        //    roomNum: xx, 房间号
        //    location: xx, 位置
        //    reservationPerson: xx, 预约人
        //    phone: xx, 联系电话
        //    reservationPurpose: xx, 预约用途
        // }
        let data = rs.data.map(item=>MapB2F(item))
        resolve(data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 同意预约
  agreeReservation(id){
    let data = new FormData()
    data.append('id', id)
    return new Promise((resolve, reject)=>{
      axios.post('/tb-huiyishi-yuyue/agree', data)
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
    let data = new FormData()
    data.append('id', info.id)
    data.append('jujueyuanyin', info.refuseReason)
    return new Promise((resolve, reject)=>{
      // info = {
      //   id: 1, 序号
      //   reason: xx, 拒绝原因
      // }
      axios.post('/tb-huiyishi-yuyue/disagree', data)
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
    let data = MapF2B(info)
    data.kaishishijian = info.startStopTime[0]
    data.jieshushijian = info.startStopTime[1]
    return new Promise((resolve, reject)=>{
      axios.get('/tb-huiyishi-yuyue/get/allhuiyishi', {
        params: data,
      })
      .then(rs=>{
        // 需要的tableList结构
        // {
        //    id: 1, 序号
        //    dept: xx, 部门
        //    meetingRoom: xx, 会议室
        //    totalUseTime: xx, 总使用时间
        //    avgDailyUseTime: xx, 日均使用时间
        // }
        let parseGraphData = (data)=>{
          let rs = {}
          data.huiyishiDATA.forEach((meetingRoom, id)=>{
            let subRs = {
              '总使用时间': data.zongshiyongshijianDATA[id],
              '日均使用时间': data.rijunshiyongshijianDATA[id],
            }
            rs[meetingRoom] = subRs
          })
          return rs
        }
        let data = {}
        data.tableList = rs.data.resultlist.map(i=>MapB2F(i))
        data.graphData = parseGraphData(rs.data)
        resolve(data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 使用统计导出
  exportUseStatistical(info){
    let formData = new FormData()
    formData.append('tubiao', info.graph.split(',')[1])
    formData.append('bumen', info.dept)
    formData.append('kaishishijian', info.startStopTime[0])
    formData.append('jieshushijian',info.startStopTime[1])
    return new Promise((resolve, reject)=>{
      axios.post('/tb-huiyishi-yuyue/export-excel-xls', formData)
      .then(rs=>{
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 单个会议室使用详细信息
  useStatisticalDetail(id){
    let [huiyishiid, kaishishijian, jieshushijian] = id.split('-')
    let data = {
      huiyishiid,
      kaishishijian,
      jieshushijian,
    }
    return new Promise((resolve, reject)=>{
      axios.get('/tb-huiyishi-yuyue/get/singlehuiyishi', {
        params: data
      })
      .then(rs=>{
        let data = {}
        data.building = rs.data.huiyishimingcheng
        data.tableList = rs.data.resultlist.map(i=>MapB2F(i))
        resolve(data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 导出单个会议室使用详细信息
  exportUseStatisticalDetail(info){
    let data = MapF2B(info)
    return new Promise((resolve, reject)=>{
      axios.get('/tb-huiyishi-yuyue/singleexport-excel-xls', {
        params: data,
      })
      .then(rs=>{
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
