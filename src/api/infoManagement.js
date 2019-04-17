import axios from './apiConfig'
import {MapB2F, MapF2B} from './nameMapConfig'

const PHAdd = {
  // 公用房新增
  
  // 新增公用房
  addPH(values){
    return new Promise((resolve, reject)=>{
      let leixing = parseInt(values['usingNature'][0])
      let jutiyongtu = values['usingNature'][1]
      let deviceConfig = values['deviceConfig']
      values = MapF2B(values)
      let data = {
        leixing,
        obj:{
          ...values,
          jutiyongtu,
        }
      }
      if(leixing==='4'&&deviceConfig){
        data.obj = {
          ...data.obj,
          touyingyi: deviceConfig.indexOf(0)>-1,
          yinxiang: deviceConfig.indexOf(1)>-1,
          maikefeng: deviceConfig.indexOf(2)>-1,
          baiban: deviceConfig.indexOf(3)>-1,
          diannao: deviceConfig.indexOf(4)>-1,
        }
      }
      let formData = new FormData()
      formData.append('leixing', leixing)
      formData.append('obj', JSON.stringify(data.obj))
      axios.post('/tb-gongyongfang/create', formData)
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
      let areaConfig = values['areaConfig']
      let shifoudixiashi = '否'
      let shifoujianyifang = '否'
      if(areaConfig){
        shifoudixiashi = values['areaConfig'].indexOf(0)>-1?'是':'否'
        shifoujianyifang = values['areaConfig'].indexOf(1)>-1?'是':'否'
      }
      let data = {
        shifoudixiashi,
        shifoujianyifang,
        ...MapF2B(values)
      }
      axios.post('/tb-gongyongfang-jibenxinxi/create', data)
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
    let leixing = filter.usingNature[0]
    let shiyongxingzhi = filter.usingNature[1]
    filter = MapF2B(filter)
    filter = {
      ...filter,
      leixing,
      shiyongxingzhi,
    }
    return new Promise((resolve, reject)=>{
      axios.get('/tb-gongyongfang/get/all',{
        params: filter,
      })
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
        let data = rs.data.map(item=>MapB2F(item))
        resolve(data)
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
  auditDetailPH(id){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-gongyongfang/get', {
        params: {
          leixing: id.split('-')[0],
          id: id.split('-')[1],
        }
      })
      .then(rs=>{
        let deviceConfig = []
        if(rs.data.touyingyi==='是')
          deviceConfig.push('投影仪')
        if(rs.data.yinxiang==='是')
          deviceConfig.push('音响')
        if(rs.data.maikefeng==='是')
          deviceConfig.push('麦克风')
        if(rs.data.baiban==='是')
          deviceConfig.push('白板')
        if(rs.data.diannao==='是')
          deviceConfig.push('电脑')
        let data = MapB2F(rs.data)
        data.deviceConfig = deviceConfig
        resolve(data)
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
    let data = {}
    let deviceConfigToArray = (data)=>{
      let rs = []
      if(data.touyingyi==='是')
        rs.push(0)
      if(data.yinxiang==='是')
        rs.push(1)
      if(data.maikefeng==='是')
        rs.push(2)
      if(data.baiban==='是')
        rs.push(3)
      if(data.diannao==='是')
        rs.push(4)
      return rs
    }
    let usingNatureToArray = (data)=>{
      let rs = []
      if(filter.id){
        rs.push(filter.id.split('-')[0])
      }else if(filter.type){
        rs.push(filter.type)
      }
      rs.push(data.jutiyongtu)
      return rs
    }
    if(filter.id){
      data.leixing=filter.id.split('-')[0]
      data.id=filter.id.split('-')[1]
      return new Promise((resolve, reject)=>{
        axios.get('/tb-gongyongfang/get', {
          params: data,
        })
        .then(rs=>{
          // 将后台传来数据转换成如下格式
          let data = {
            ...MapB2F(rs.data),
            deviceConfig: deviceConfigToArray(rs.data),
            usingNature: usingNatureToArray(rs.data),
            rawData: rs.data,
          }
          resolve(data)
        })
        .catch(err=>{
          reject(err)
          console.log(err)
        })
      })
    }else{
      data = MapF2B(filter)
      return new Promise((resolve, reject)=>{
        axios.get('/tb-gongyongfang/getbylouyuloucengfangjianhao', {
          params: data,
        })
        .then(rs=>{
          // 将后台传来数据转换成如下格式
          let data = {
            ...MapB2F(rs.data),
            deviceConfig: deviceConfigToArray(rs.data),
            usingNature: usingNatureToArray(rs.data),
            rawData: rs.data,
          }
          resolve(data)
        })
        .catch(err=>{
          reject(err)
          console.log(err)
        })
      })
    }
  },
  PHChangeSubmit(values, oldType, oldId, rawData){
    let obj = MapF2B(values)
    if(values.deviceConfig){
      let deviceConfig = values.deviceConfig
      obj.touyingyi = deviceConfig.indexOf(0)>-1?'是':'否'
      obj.yinxiang = deviceConfig.indexOf(1)>-1?'是':'否'
      obj.maikefeng = deviceConfig.indexOf(2)>-1?'是':'否'
      obj.baiban = deviceConfig.indexOf(3)>-1?'是':'否'
      obj.diannao = deviceConfig.indexOf(4)>-1?'是':'否'
    }
    obj.jutiyongtu = values.usingNature[1]
    // 判断类型是否修改了
    // 没修改
    if(oldType===values.usingNature[0]){
      obj.id = oldId
      obj = {
        ...rawData,
        ...obj,
      }
      let data = new FormData();
      data.append('leixing', values.usingNature[0])
      data.append('obj', JSON.stringify(obj))
      return new Promise((resolve, reject)=>{
        axios.post('/tb-gongyongfang/update',data)
        .then(rs=>{
          // 将后台传来数据转换成如下格式
          resolve()
        })
        .catch(err=>{
          reject(err)
          console.log(err)
        })
      })

    // 修改了
    }else{
      obj = {
        ...rawData,
        ...obj,
      }
      let data = new FormData();
      data.append('id_old', oldId)
      data.append('leixing_old', oldType)
      data.append('leixing', values.usingNature[0])
      data.append('obj', JSON.stringify(obj))
      return new Promise((resolve, reject)=>{
        axios.post('/tb-gongyongfang/change',data)
        .then(rs=>{
          // 将后台传来数据转换成如下格式
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
      axios.get('/tb-gongyongfang-jibenxinxi/get/'+index)
      .then(rs=>{
        // 将后台传来数据转换成如下格式
        let areaConfig = []
        if(rs.data.shifoudixiashi==='是')
          areaConfig.push(0)
        if(rs.data.shifoujianyifang==='是')
          areaConfig.push(1)
        let data = {
          areaConfig,
          ...MapB2F(rs.data),
        }
        resolve(data)
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
    let shifoudixiashi = '否'
    let shifoujianyifang = '否'
    if(values.areaConfig){
      if(values.areaConfig.indexOf(0)>-1)
        shifoudixiashi = '是'
      if(values.areaConfig.indexOf(1)>-1)
        shifoujianyifang = '是'
    }
    values = {
      ...MapF2B(values),
      shifoudixiashi,
      shifoujianyifang,
    }
    return new Promise((resolve, reject)=>{
      axios.post('/tb-gongyongfang-jibenxinxi/update', values)
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
  reportPH(data){
    data = MapF2B(data)
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    })
    formData.append('yuanyin', "")
    return new Promise((resolve, reject)=>{
      axios.post('/tb-gongyongfang/change-approval-status',formData)
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
    filter = {
      ...MapF2B(filter),
      leixing: filter.usingNature&&filter.usingNature[0],
      shiyongxingzhi: filter.usingNature&&filter.usingNature[1],
    }
    return new Promise((resolve, reject)=>{
      axios.get('/tb-gongyongfang/get/all', {
        params: filter,
      })
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
        let data = rs.data.map(item=>MapB2F(item))
        resolve(data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 删除公用房记录
  deletePH(indexList, leixing){
    return new Promise((resolve, reject)=>{
      // TODO delete拼写错误
      axios.delete('/tb-gongyongfang/delete', {
        params: {ids: `[${indexList.toString()}]`, leixing}
      })
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
      axios.get('/tb-gongyongfang-jibenxinxi/get/all', {
        params: MapF2B(filter),
      })
      .then(rs=>{
        // 将后台传来数据转换成如下格式
        /*[{
          id: i,
          location: i,
          area: i,
          setUpTime: i,
          maintenancePeople: i,
        }]*/
        let data = rs.data.map(item=>MapB2F(item))
        resolve(data)
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
  myPHSearch(filter){
    filter = {
      ...MapF2B(filter),
      leixing: filter.usingNature&&filter.usingNature[0],
      shiyongxingzhi: filter.usingNature&&filter.usingNature[1],
    }
    return new Promise((resolve, reject)=>{
      axios.get('/tb-gongyongfang/get/my', {
        params: filter,
      })
      .then(rs=>{
        let data = rs.data.map(item=>MapB2F(item))
        resolve(data)
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
  // 传入用户的id
  getPersonnelInfo(id){
    // TODO 确认我的公用房用户详细信息的接口
    return new Promise((resolve, reject)=>{
      axios.get('/tb-shiyongzhe/get/gonghao',{
        params: {gonghao: id},
      })
      .then(rs=>{
        resolve(MapB2F(rs.data))
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
    })
  },
}

const PHDetailInfo = {
  getPHDetailInfo(id){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-gongyongfang/get', {
        params: {
          leixing: id.split('-')[0],
          id: id.split('-')[1],
        }
      })
      .then(rs=>{
        let deviceConfig = []
        if(rs.data.touyingyi==='是')
          deviceConfig.push('投影仪')
        if(rs.data.yinxiang==='是')
          deviceConfig.push('音响')
        if(rs.data.maikefeng==='是')
          deviceConfig.push('麦克风')
        if(rs.data.baiban==='是')
          deviceConfig.push('白板')
        if(rs.data.diannao==='是')
          deviceConfig.push('电脑')
        let data = MapB2F(rs.data)
        data.deviceConfig = deviceConfig
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
  ...PHDetailInfo,
}
