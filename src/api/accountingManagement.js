import axios from './apiConfig'

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
          tableData.push({slash:'定额面积(DE)', ...rs.data.tabledata['dingemianji']})
          tableData.push({slash:'实际面积(SJ)', ...rs.data.tabledata['shijimianji']})
          tableData.push({slash:'超额面积(CE)', ...rs.data.tabledata['chaoemianji']})
          resolve({dept:rs.data.bumen, tableData, totalData:rs.data.totaldata})
          return
        }
        resolve({dept:rs.data.bumen, tableData:rs.data.tabledata, totalData:rs.data.totaldata})
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  getDeptAccountingDataByInfo(type, info){
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
          tableData.push({slash:'定额面积(DE)', ...rs.data.tabledata['dingemianji']})
          tableData.push({slash:'实际面积(SJ)', ...rs.data.tabledata['shijimianji']})
          tableData.push({slash:'超额面积(CE)', ...rs.data.tabledata['chaoemianji']})
          resolve({dept:rs.data.bumen, tableData, totalData:rs.data.totaldata})
          return
        }
        resolve({dept:rs.data.bumen, tableData:rs.data.tabledata, totalData:rs.data.totaldata})
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
}
