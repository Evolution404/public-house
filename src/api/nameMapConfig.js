// 前后端命名映射

const mapNameF2B = {
  id: 'id',
  year: 'nianfen',
  zj: 'fuxiaojiZhengjuji',
  fj: 'fuxiaojiFujuji',
  zc: 'zhengchuji',
  fc: 'fuchuji',
  uc: 'chujiyixia',
  note: 'beizhu',
  companyName: 'bumen',
  undergraduate: 'benkeshengshu',
  masterDegree: 'shuoshishengshu',
  doctor: 'boshishengshu',
  postdoctoral: 'boshihoushu',
  academician: 'yuanshishu',
  tT: 'gaoduanrencai',
  eT: 'youxiurencai',
  zg: 'zhenggaojizhicheng',
  fg: 'fugaojizhicheng',
  middle: 'zhongjizhicheng',
  other: 'qitazhicheng',
  buildingName: 'louyumingcheng',
  buildingArea: 'jianzhumianji',
  buildingTime: 'jianzhuniandai',
  buildingFloors: 'loucengshu',
}
let mapNameB2F = {}
for (let i in mapNameF2B){
  mapNameB2F[mapNameF2B[i]] = i
}

// F front. 2 to. B back
// 前端转后端
function MapF2B(item){
  let rs = {}
  for(let i in item){
    let mi = mapNameF2B[i]
    if(!mi) continue
    rs[mi] = item[i]
  }
  return rs
}
// 后端转前端
function MapB2F(item){
  let rs = {}
  for(let i in item){
    let mi = mapNameB2F[i]
    if(!mi) continue
    rs[mi] = item[i]
  }
  return rs
}

export {MapF2B, MapB2F}
