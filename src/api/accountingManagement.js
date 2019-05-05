import axios from './apiConfig'
import {pageSize} from '../component/common/table'

const departmentAccount = {

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
  getAccountingData(year){
    // 党政机关核算
    let dept = new Promise((resolve, reject)=>{
      axios.get('/tb-dangzheng-jiguan-yongfang-tongji/get/all', {
        params: {nianfen: year},
      })
      .then((rs)=>{
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
    // 学院核算
    let collegeDept = new Promise((resolve, reject)=>{
      axios.get('/tb-xueyuan-yongfang-shiyong-tongji/get/all', {
        params: {nianfen: year},
      })
      .then(rs=>{
        resolve(rs.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
    return Promise.all([dept, collegeDept])
  },
  getDeptAccountingDataById(type, id){
    // 党政机关
    let url
    if(type==='1'){
      url = '/tb-dangzheng-jiguan-yongfang-tongji/get/'+id
    }else{
      url = '/tb-xueyuan-yongfang-shiyong-tongji/get/'+id
    }
    return new Promise((resolve, reject)=>{
      axios.get(url)
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
        resolve({dept:rs.data.bumen, tableData:rs.data.datalist,
                graphData,
                totalData:rs.data.totaldata})
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  getDeptAccountingDataByInfo(info){
    let type = info.type
    // 党政机关
    let url, data={}
    if(type==='1'){
      url = '/tb-dangzheng-jiguan-yongfang-tongji/get/bumen'
    }else{
      url = '/tb-xueyuan-yongfang-shiyong-tongji/get/xueyuan'
    }
    data = {bumen: info.dept, nianfen: info.year}
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
        resolve({dept:rs.data.bumen, tableData:rs.data.datalist,
                graphData,
                totalData:rs.data.totaldata})
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
    // 不需要工号
    delete values.gonghao
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
