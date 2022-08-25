import axios from './apiConfig'
import {uploadHelper} from './fileUpload'
import {MapB2F, MapF2B} from './nameMapConfig'
import {parseId} from '../component/common/usingNature'
import {pageSize} from '../component/common/table'

const PHAdd = {
  // 公用房新增
  // 新增公用房
  addPH(values){
    let leixing = parseInt(values['usingNature'][0])
    let jutiyongtu = values['usingNature'][1]
    let deviceConfig = values['deviceConfig']
    let mapValues = MapF2B(values)
    let data = {
      leixing,
      obj:{
        ...mapValues,
        jutiyongtu,
      }
    }
    if(leixing===4&&deviceConfig){
      data.obj = {
        ...data.obj,
        touyingyi: deviceConfig.indexOf(0)>-1?'是':'否',
        yinxiang: deviceConfig.indexOf(1)>-1?'是':'否',
        maikefeng: deviceConfig.indexOf(2)>-1?'是':'否',
        baiban: deviceConfig.indexOf(3)>-1?'是':'否',
        diannao: deviceConfig.indexOf(4)>-1?'是':'否',
      }
    }
    delete data.obj.photolist
    let formData = new FormData()
    formData.append('leixing', leixing)
    formData.append('obj', JSON.stringify(data.obj))
    return new Promise((resolve, reject)=>{
      axios.post('/tb-gongyongfang/create', formData)
      .then(rs=>{
        if(!values.housePic){
          resolve()
          return
        }
        // 上传房屋照片
        let imgForm = new FormData()
        imgForm.append('louceng', data.obj.louceng)
        imgForm.append('louyu', data.obj.louyu)
        imgForm.append('fangjianhao', data.obj.fangjianhao)
        imgForm.append('module', 'gongyongfang-zhaopian')
        values.housePic.forEach(item=>{
          imgForm.append('file', item)
        })
        uploadHelper(imgForm, '/tb-gongyongfang-zhaopian/upload-img')
        .then(()=>{
          resolve()
        })
        .catch(err=>{
          reject(err)
        })
      })
      .catch(err=>{
        reject(err)
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
        if(values.housePic&&values.housePic.length>0){
          let imgForm = new FormData()
          imgForm.append('id', rs.data.id)
          imgForm.append('module', 'gongyongfang-zhaopian')
          values.housePic.forEach(item=>{
            imgForm.append('file', item)
          })
          uploadHelper(imgForm, '/tb-gongyongfang-jibenxinxi-tupian/upload-img')
          .then(()=>{
            resolve()
          })
          .catch(err=>{
            reject(err)
          })
        }else{
          resolve()
        }
      })
      .catch(err=>{
        reject(err)
      })
    })
  },

}
const PHTransform = {
  transformSearch(louyu, louceng){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-gongyongfang/gaizao-chaxun', {
        params: {louyu, louceng}
      })
      .then(rs=>{
        let data = []
        for(let type in rs.data){
          let id = parseId(type)
          let item = {title: type, key:id, value:id, disabled: true}
          let children = rs.data[type].map(c=>({title: c,
            value:id+'-'+c, key:(id+'-'+c)}))
          item.children = children
          data.push(item)
        }
        resolve(data)
      })
      .catch(err=>{
        console.log(err)
        reject(err)
      })
    })
  },
  transformSubmit(stepData){
    let obj_old = {
      louyu: stepData[0].louyu,
      louceng: stepData[0].louceng,
      fangjianhao: stepData[0].fangjian.map(i=>({leixing: parseInt(i.split('-')[0]),
                                                fangjianhao: i.split('-')[1]})),
    }
    let obj = []
    let imgFormList = []
    for(let i=1;i < stepData.length;i++){
      let curData = stepData[i]
      let subValues = curData.subValues
      let jiben = {
        louyu: curData.louyu,
        louceng: curData.louceng,
        fangjianhao: curData.fangjianhao,
        shiyongmianji: curData.shiyongmianji,
        beizhu: curData.beizhu,
        shifoudixiashi: curData.areaConfig.indexOf(0)>-1?'是':'否',
        shifoujianyifang: curData.areaConfig.indexOf(1)>-1?'是':'否',
        zhuangtai: curData.zhuangtai,
      }
      let leixing = parseInt(subValues.usingNature[0])
      let jutiyongtu = subValues.usingNature[1]
      let xiangxi={
        leixing,
        obj: {
          ...MapF2B(subValues),
          jutiyongtu,
          louyu: curData.louyu,
          louceng: curData.louceng,
          fangjianhao: curData.fangjianhao,
        },
      }
      if(leixing===4){
        let deviceConfig = {
          touyingyi: '否',
          yinxiang: '否',
          maikefeng: '否',
          baiban: '否',
          diannao: '否',
        }
        if(subValues.deviceConfig&&subValues.deviceConfig.length>0)
        deviceConfig = {
          touyingyi: subValues.deviceConfig.indexOf(0)>-1?'是':'否',
          yinxiang: subValues.deviceConfig.indexOf(1)>-1?'是':'否',
          maikefeng: subValues.deviceConfig.indexOf(2)>-1?'是':'否',
          baiban: subValues.deviceConfig.indexOf(3)>-1?'是':'否',
          diannao: subValues.deviceConfig.indexOf(4)>-1?'是':'否',
        }
        xiangxi.obj = {
          ...xiangxi.obj,
          ...deviceConfig,
        }
      }
      obj.push({jiben, xiangxi})
      if(curData.housePic&&curData.housePic.length>0){
        let imgForm = new FormData()
        curData.housePic.forEach(img=>{
          let rawFile = img['originFileObj']
          imgForm.append('file', rawFile)
        })
        imgForm.append('louceng', curData.louceng)
        imgForm.append('louyu', curData.louyu)
        imgForm.append('fangjianhao', curData.fangjianhao)
        imgForm.append('module', 'gongyongfang-zhaopian')
        imgFormList.push(imgForm)
      }
    }
    let data = new FormData()
    data.append('obj_old', JSON.stringify(obj_old))
    data.append('obj', JSON.stringify(obj))
    return new Promise((resolve, reject)=>{
       axios.post('/tb-gongyongfang/gaizao', data)
       .then(rs=>{
        let uploadImgPromiseList =
          imgFormList.map(i=>uploadHelper(i, '/tb-gongyongfang-zhaopian/upload-img'))
         Promise.all(uploadImgPromiseList)
         .then(rs=>{
           resolve(rs.data)
         })
         .catch(err=>{
           reject(err)
         })
       })
       .catch(err=>{
         reject(err)
       })
    })
  },
  transformAuditSearch(value, p){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-gongyongfang/gaizao-shenpi-chaxun', {
        params: {
          ...MapF2B(value),
          leixing: value.type,
          page: p?p.current-1:0,
          size: pageSize,
        }
      })
      .then(rs=>{
        let data = {
          tableList:rs.data,
          total: rs.headers['x-total-count'],
        }
        resolve(data)
      })
      .catch(err=>{
        reject(err)
      })
    })    
  },
  transformAudit(values){
    let data = new FormData()
    data.append('leixing', values.leixing)
    data.append('id', values.id)
    data.append('shenpi', values.shenpi)
    return new Promise((resolve, reject)=>{
      axios.post('/tb-gongyongfang/gaizao-shenpi', data)
      .then(rs=>{
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
      })
    })    
  }
}

const PHAudit = {
  // 公用房审核

  // 公用房审核的搜索接口
  auditFilterPH(filter, p){
    let leixing = filter.usingNature[0]
    let shiyongxingzhi = filter.usingNature[1]
    filter = MapF2B(filter)
    filter = {
      ...filter,
      leixing,
      shiyongxingzhi,
      mark: 1,
      page: p?p.current-1:0,
      size: pageSize,
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

const PHAuditDetail = {
  // 公用房详细信息

  // 公用房审核详细界面批准接口
  aprovalPH(index, opinion){
    let data = new FormData()
    data.append('leixing', index.split('-')[0])
    data.append('id', index.split('-')[1])
    let isTransform = index.split('-').length>2
    data.append('shenpizhuangtai', isTransform?1:'已批准')
    data.append('yuanyin', opinion||"")
    return new Promise((resolve, reject)=>{
      axios.post(isTransform?'/tb-gongyongfang/gaizao-shenpi':'/tb-gongyongfang/change-approval-status', data)
      .then(rs=>{
        // 成功后调用
        resolve()
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  // 公用房审核详细界面拒绝接口
  rejectedPH(index, opinion){
    let data = new FormData()
    data.append('leixing', index.split('-')[0])
    data.append('id', index.split('-')[1])
    let isTransform = index.split('-').length>2
    data.append('shenpizhuangtai', isTransform?0:'已驳回')
    data.append('yuanyin', opinion||"")
    return new Promise((resolve, reject)=>{
      axios.post(isTransform?'/tb-gongyongfang/gaizao-shenpi':'/tb-gongyongfang/change-approval-status', data)
      .then(rs=>{
        // 成功后调用
        resolve()
      })
      .catch(err=>{
        reject(err)
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
      })
    })
  },
}

const PHChange = {
  // 公用房变更
  deleteHousePic(id){
    return new Promise((resolve, reject)=>{
      axios.delete('/tb-gongyongfang-zhaopian/delete/'+id)
      .then(rs=>{
        resolve()
      })
      .catch(err=>{
        reject(err)
      })
    })

  },
  deleteApprovalDocument(id){
    return new Promise((resolve, reject)=>{
      axios.delete('/tb-gongyongfang-pizhunwenshus/delete?id='+id)
      .then(rs=>{
        resolve()
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
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
    let data = new FormData()
    let url = ''
    // 判断类型是否修改了
    // 没修改
    if(oldType===values.usingNature[0]){
      url = '/tb-gongyongfang/update'
      obj.id = oldId
      obj = {
        ...rawData,
        ...obj,
      }
      delete obj.imglist
      data.append('leixing', values.usingNature[0])
      data.append('obj', JSON.stringify(obj))
    // 修改了
    }else{
      url = '/tb-gongyongfang/change'
      delete obj.imglist
      data.append('id_old', oldId)
      data.append('leixing_old', oldType)
      data.append('leixing', values.usingNature[0])
      data.append('obj', JSON.stringify(obj))
    }
    let promiseList = []
    let formPromise = new Promise((resolve, reject)=>{
      axios.post(url, data)
      .then(rs=>{
        // 将后台传来数据转换成如下格式
        resolve()
      })
      .catch(err=>{
        reject(err)
      })
    })
    promiseList.push(formPromise)
    if(values.housePic){
      let housePicData = new FormData()
      values.housePic.forEach(i=>{
        housePicData.append('file', i)
      })
      housePicData.append('module', 'gongyongfang-zhaopian')
      housePicData.append('louyu', obj.louyu)
      housePicData.append('louceng', obj.louceng)
      housePicData.append('fangjianhao', obj.fangjianhao)
      let housePicPromise =
        uploadHelper(housePicData, '/tb-gongyongfang-zhaopian/upload-img')
      promiseList.push(housePicPromise)
    }
    if(values.approvalDocument){
      let approvalDocumentData = new FormData()
      values.approvalDocument.forEach(i=>{
        approvalDocumentData.append('file', i)
      })
      approvalDocumentData.append('module', 'gongyongfang-pizhunwenshu')
      approvalDocumentData.append('louyu', obj.louyu)
      approvalDocumentData.append('louceng', obj.louceng)
      approvalDocumentData.append('fangjianhao', obj.fangjianhao)
      let approvalDocumentPromise =
        uploadHelper(approvalDocumentData, '/tb-gongyongfang-pizhunwenshu/upload-img')
      promiseList.push(approvalDocumentPromise)
    }
    return Promise.all(promiseList)
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
          drawings: rs.data.tupianList,
          ...MapB2F(rs.data),
        }
        resolve(data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  // 删除图纸
  deleteDrawings(id){
    return new Promise((resolve, reject)=>{
      axios.delete('/tb-gongyongfang-jibenxinxi-tupian/delete?id='+id)
      .then(rs=>{
        resolve()
      })
      .catch(err=>{
        reject(err)
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
    let newValues = {
      ...MapF2B(values),
      shifoudixiashi,
      shifoujianyifang,
    }
    let promiseList = []
    let formPromise = axios.post('/tb-gongyongfang-jibenxinxi/update', newValues)
    promiseList.push(formPromise)
    if(values.drawings){
      let drawingsData = new FormData()
      // /tb-gongyongfang-jibenxinxi-tupian/upload-img
      drawingsData.append('id', values.id)
      drawingsData.append('module', 'gongyongfang-jibenxinxi-tupian')
      values.drawings.forEach(file=>{
        drawingsData.append('file', file)
      })
      let drawingsPromise = uploadHelper(drawingsData, '/tb-gongyongfang-jibenxinxi-tupian/upload-img')
      promiseList.push(drawingsPromise)
    }
    return Promise.all(promiseList)
  },
}

const PHImport = {
  // 公用房导入

}

const PHList = {
  // 部门公用房

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
      })
    })
  },
  exportConditionQuery(filter){
    filter = {
      ...MapF2B(filter),
      leixing: filter.usingNature&&filter.usingNature[0],
      shiyongxingzhi: filter.usingNature&&filter.usingNature[1],
    }
    return new Promise((resolve, reject)=>{
      axios.get('/tb-gongyongfang/get/all/export-excel', {
        params: filter,
      })
      .then(rs=>{
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  // 部门公用房的搜索接口
  listFilterPH(filter, p){
    filter = {
      ...MapF2B(filter),
      leixing: filter.usingNature&&filter.usingNature[0],
      shiyongxingzhi: filter.usingNature&&filter.usingNature[1],
      page: p?p.current-1:0,
      size: pageSize,
    }
    console.log(filter)
    return new Promise((resolve, reject)=>{
      axios.get('/tb-gongyongfang/get/all', {
        params: filter,
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
  },
  // 删除公用房记录
  deletePH(indexList, leixing){
    return new Promise((resolve, reject)=>{
      axios.delete('/tb-gongyongfang/delete', {
        params: {ids: `[${indexList.toString()}]`, leixing}
      })
      .then(rs=>{
        // 不需要传参数, 这里要确保是删除成功
        resolve()
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
}

const basicInfoManagement = {
  // 基础信息管理

  // 搜索公用房
  // 楼宇名称: buildingName 楼层:floor 房间号: roomNum
  filterPH(filter, p){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-gongyongfang-jibenxinxi/get/all', {
        params: {
          ...MapF2B(filter),
          page: p?p.current-1:0,
          size: pageSize,
        }
      })
      .then(rs=>{
        // 将后台传来数据转换成如下格式
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
  // 删除公用房记录
  deletePHBasic(indexList){
    return new Promise((resolve, reject)=>{
      axios.delete('/tb-gongyongfang-jibenxinxi/delete', {
        params: {ids: `[${indexList.toString()}]`}
      })
      .then(rs=>{
        // 不需要传参数, 这里要确保是删除成功
        resolve()
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  exportPHBasic(filter){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-gongyongfang-jibenxinxi/jibenxinxiexport-excel-xls', {
        params: MapF2B(filter),
      })
      .then(rs=>{
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
}

const myPH = {
  // 我的公用房
  myPHSearch(filter, p){
    filter = {
      ...MapF2B(filter),
      leixing: filter.usingNature&&filter.usingNature[0],
      shiyongxingzhi: filter.usingNature&&filter.usingNature[1],
      page: p?p.current-1:0,
      size: pageSize,
    }
    return new Promise((resolve, reject)=>{
      axios.get('/tb-gongyongfang/get/my', {
        params: filter,
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
  },
  // 传入用户的id
  getPersonnelInfo(id){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-shiyongzhe/get/gonghao',{
        params: {gonghao: id},
      })
      .then(rs=>{
        resolve(MapB2F(rs.data))
      })
      .catch(err=>{
        reject(err)
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
      })
    })
  },
}

export default {
  ...PHTransform,
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
