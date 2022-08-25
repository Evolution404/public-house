import axios from './apiConfig'
import {pageSize} from '../component/common/table'
import {MapF2B} from './nameMapConfig'

const departmentAccount = {
  exportAcademyHouseDatailById(id, column){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-xueyuan-yongfang-shiyong-tongji/danxiang-mianji-xiangqing/export/by-id',{
        params: {
          id,
          column,
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
  exportAcademyHouseDatailByInfo(dept, year, column){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-xueyuan-yongfang-shiyong-tongji/danxiang-mianji-xiangqing/export/by-nianfen-bumen',{
        params: {
          bumen:dept, nianfen:year,
          column,
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
  getAcademyHouseDetailTableDataById(id, column, p, s){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-xueyuan-yongfang-shiyong-tongji/danxiang-mianji-xiangqing/by-id',{
        params: {
          id,
          column,
          page: p?p.current-1:0,
          size: pageSize,
          ...s,
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
  getAcademyHouseDetailTableDataByInfo(dept, year, column, p, s){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-xueyuan-yongfang-shiyong-tongji/danxiang-mianji-xiangqing/by-nianfen-bumen',{
        params: {
          bumen:dept, nianfen:year,
          column,
          page: p?p.current-1:0,
          size: pageSize,
          ...s,
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
}
const overallAccount = {
  async accountingData(year){
    // 学院核算
    let collegeDept = axios.get('/tb-xueyuan-yongfang-shiyong-tongji/hesuan', {
      params: {nianfen: year},
    })
    // 党政机关核算
    let dept = axios.get('/tb-dangzheng-jiguan-yongfang-tongji/hesuan', {
      params: {nianfen: year},
    })
    return Promise.all([collegeDept, dept])
  },
  getPartyHouseTableData(values, p){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-dangzheng-jiguan-yongfang-tongji/get/all', {
        params: {
          ...MapF2B(values),
          nianfen: values.year,
          page: p?p.current-1:0,
          size: pageSize,
        },
      })
      .then((rs)=>{
        rs.data.datalist = {
          tableList:rs.data.datalist,
          total: rs.headers['x-total-count'],
        }
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  getAcademyHouseTableData(values, p){
    return new Promise((resolve, reject)=>{
      axios.get('/tb-xueyuan-yongfang-shiyong-tongji/get/all', {
        params: {
          ...MapF2B(values),
          nianfen: values.year,
          page: p?p.current-1:0,
          size: pageSize,
        },
      })
      .then(rs=>{
        rs.data.datalist = {
          tableList:rs.data.datalist,
          total: rs.headers['x-total-count'],
        }
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  getAccountingData(year){
    // 党政机关核算
    let dept = this.getPartyHouseTableData({year})
    // 学院核算
    let collegeDept = this.getAcademyHouseTableData({year})
    return Promise.all([dept, collegeDept])
  },
  getDeptAccountingDataById(type, id, p, s){
    // 党政机关
    let url
    if(type==='1'){
      url = '/tb-dangzheng-jiguan-yongfang-tongji/get/'+id
    }else{
      url = '/tb-xueyuan-yongfang-shiyong-tongji/get/'+id
    }
    let data = {}
    if(type==='1')
      data = {
        ...data,
        ...s,
        page: p?p.current-1:0,
        size: pageSize,
      }
    return new Promise((resolve, reject)=>{
      axios.get(url, {
        params: data,
      })
      .then(rs=>{
        if(type==='2'){
          let tableData = []
          tableData.push({slash:'定额面积(DE)', ...rs.data.datalist['dingemianji']})
          tableData.push({slash:'实际面积(SJ)', ...rs.data.datalist['shijimianji']})
          tableData.push({slash:'超额面积(CE)', ...rs.data.datalist['chaoemianji']})
          let graphData = {
            pieData: rs.data.bingtu,
            hisData: rs.data.zhuzhuangtu,
          }
          resolve({dept:rs.data.bumen, tableData, totalData:rs.data.totaldata, graphData})
          return
        }
        let graphData = rs.data.zhuzhuangtu
        for(let key in graphData){
          graphData[key] = {'面积':graphData[key]}
        }
        let tableData = {
          tableList: rs.data.datalist,
          total: rs.headers['x-total-count'],
        }
        resolve({dept:rs.data.bumen, tableData,
                graphData,
                totalData:rs.data.totaldata})
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  getDeptAccountingDataByInfo(info, p, s){
    let type = info.type
    // 党政机关
    let url, data={}
    if(type==='1'){
      url = '/tb-dangzheng-jiguan-yongfang-tongji/get/bumen'
    }else{
      url = '/tb-xueyuan-yongfang-shiyong-tongji/get/xueyuan'
    }
    data = {bumen: info.dept, nianfen: info.year}
    if(type==='1')
      data = {
        ...data,
        page: p?p.current-1:0,
        size: pageSize,
      }
    if(s)
      data = {
        ...data,
        ...s,
      }
    return new Promise((resolve, reject)=>{
      axios.get(url, {
        params: data,
      })
      .then(rs=>{
        if(type==='2'){
          let tableData = []
          tableData.push({slash:'定额面积(DE)', ...rs.data.datalist['dingemianji']})
          tableData.push({slash:'实际面积(SJ)', ...rs.data.datalist['shijimianji']})
          tableData.push({slash:'超额面积(CE)', ...rs.data.datalist['chaoemianji']})
          let graphData = {
            pieData: rs.data.bingtu,
            hisData: rs.data.zhuzhuangtu,
          }
          resolve({dept:rs.data.bumen, tableData, totalData:rs.data.totaldata, graphData})
          return
        }
        let graphData = rs.data.zhuzhuangtu
        for(let key in graphData){
          graphData[key] = {'面积':graphData[key]}
        }
        let tableData = {
          tableList: rs.data.datalist,
          total: rs.headers['x-total-count'],
        }
        resolve({dept:rs.data.bumen, tableData,
                graphData,
                totalData:rs.data.totaldata})
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  exportPDeptAccountDataByInfo(dept, year, graph){
    let data = new FormData()
    data.append('bumen', dept)
    data.append('nianfen', year)
    data.append('tubiao', graph.tubiao)
    return new Promise((resolve, reject)=>{
      axios.post('/tb-dangzheng-jiguan-yongfang-tongji/xiangqing/export-excel', data)
      .then((rs)=>{
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  exportCDeptAccountDataByInfo(dept, year, graph){
    let data = new FormData()
    data.append('bumen', dept)
    data.append('nianfen', year)
    data.append('tubiao1', graph.tubiao1)
    data.append('tubiao2', graph.tubiao2)
    return new Promise((resolve, reject)=>{
      axios.post('/tb-xueyuan-yongfang-shiyong-tongji/xiangqing/export-excel', data)
      .then((rs)=>{
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  exportPDeptAccountDataById(id, graph){
    let data = new FormData()
    data.append('id', id)
    data.append('tubiao', graph.tubiao)
    return new Promise((resolve, reject)=>{
      axios.post('/tb-dangzheng-jiguan-yongfang-tongji/xiangqing/export-excel', data)
      .then((rs)=>{
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  exportCDeptAccountDataById(id, graph){
    let data = new FormData()
    data.append('id', id)
    data.append('tubiao1', graph.tubiao1)
    data.append('tubiao2', graph.tubiao2)
    return new Promise((resolve, reject)=>{
      axios.post('/tb-xueyuan-yongfang-shiyong-tongji/xiangqing/export-excel', data)
      .then((rs)=>{
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  exportOverallAccount(data){
    return new Promise((resolve, reject)=>{
      axios.post('/tb-dangzheng-jiguan-yongfang-tongji/export-excel', data)
      .then((rs)=>{
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
}

const personalAccount = {
  accountingPersonalInfo(values){
    // 不需要年份
    delete values.nianfen
    return new Promise((resolve, reject)=>{
      axios.get('/tb-geren-yongfang-tongji/hesuan', {
        params: values,
        // 两分钟
        timeout: 2*60*1000,
      })
      .then(()=>{
        resolve()
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  searchPersonnelAccountingInfo(values, p){
    // 不需要学号
    values.gonghao = values.gonghaoSearch
    delete values.gonghaoSearch
    values = {
      ...values,
      page: p?p.current-1:0,
      size: pageSize,
    }
    return new Promise((resolve, reject)=>{
      axios.get('/tb-geren-yongfang-tongji/get/all', {
        params: values,
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
}

export default {
  ...departmentAccount,
  ...overallAccount,
  ...personalAccount,
}
