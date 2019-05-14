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
  dept: 'bumen',
  collegeDept: 'xueyuanBumen',
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
  workNum: 'gonghao',
  name: 'xingming',
  dutyGrade: 'zhiwujibie',
  proTitleLevel: 'zhichengjibie',
  loginAccount: 'dengluzhanghao',
  userName: 'yonghumingcheng',
  password: 'mima',
  oldPassword: 'jiumima',
  newPassword: 'xinmima',
  role: 'jueseId',
  buildingImgs: 'louyuTupians',
  roomNum: 'fangjianhao',
  useArea: 'shiyongmianji',
  status: 'zhuangtai',
  building: 'louyu',
  floor: 'louceng',
  deptName: 'bumenmingcheng',
  'location': '', //位置
  auditStatus: 'shenpizhuangtai',
  houseStatus: 'fangwuzhuangtai',
  spectificPurpose: 'jutiyongtu',
  scientificTeam: 'keyantuandui',
  annualIncome: 'nianshouru',
  rentPrice: 'zujinjinedanjia',
  rentType: 'zujinleixing',
  manager: 'guanlizhe',
  galleryful: 'rongnarenshu',
  lessee: 'chengzuren',
  head: 'fuzeren',
  type: 'leixing',
  secondaryNature: '', // 二级性质
  personnel: 'shiyongzhe', // 使用者
  reservationStatus: 'yuyuezhuangtai',
  reservationPerson: 'yuyueren',
  dismissReason: 'yuanyin',
  phone: 'lianxidianhua',
  reservationPurpose: 'yuyueyongtu',
  refuseReason: 'jujueyuanyin',
  startTime: 'kaishishijian',
  stopTime: 'jieshushijian',
  housePic: 'photolist',
  drawings: 'imglist',
  approvalDocument: 'pizhunwenshulist',
  totalUseTime: 'zongshiyongshijian', // 总使用时间
  avgDailyUseTime: 'rijunshiyongshijian', // 日均使用时间
  meetingRoom: 'huiyishi', // 会议室
  meetingRoomId: 'huiyishiid', // 会议室
  auditPerson: 'shenpiren', // 审批人
  auditTime: 'shenpishijian', // 审批时间
  applyTIme: 'shenqingshijian', // 申请时间
  applicant: 'shenqingren', // 申请人
  useLength: 'shiyongshichang', // 使用时长
  useTime: 'shiyongshiduan', // 使用时段
  useDate: 'shiyongriqi', // 使用日期
  createTime: 'chuangjianshijian', // 创建时间
  updateTime: 'gengxinshijian', // 更新时间
  sort: 'sort', // 排序
  zonghetiaojiexishu: 'zonghetiaojiexishu'

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

export {mapNameF2B, mapNameB2F, MapF2B, MapB2F}
