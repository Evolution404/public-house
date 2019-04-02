import Mock from 'mockjs'

let data = [{
  id: 1,
  location: 1,
  area: 1,
  setUpTime: 1,
  maintenancePeople: 1,
}]
Mock.mock('/filterPH', 'post', data)
Mock.mock('/deletePH', 'post', {code: 200})
Mock.mock('/listFilterPH', 'post', [
  {
    id: 1,
    dept: 1,
    location: 1,
    usingNature: 1,
    user: 1,
    fillInTime: 1,
    status: 1,
    auditTime: 1,
  },
  {
    id: 1,
    dept: 1,
    location: 1,
    usingNature: 1,
    user: 1,
    fillInTime: 1,
    status: 0,
    auditTime: 1,
  },
  {
    id: 1,
    dept: 1,
    location: 1,
    usingNature: 1,
    user: 1,
    fillInTime: 1,
    status: 2,
    auditTime: 1,
  },
])
Mock.mock('/detailDept', 'post', {
  deptName: '计算机与软件学院',
  zj: 100,
  fj: 100,
  zc: 100,
  fc: 100,
  uc: 100,
  academician: 100,
  tT: 100,
  eT: 100,
  zg: 100,
  fg: 100,
  middle: 100,
  other: 100,
  undergraduate: 100,
  doctor: 100,
  masterDegree: 100,
  postdoctoral: 100,
})
Mock.mock('/updateDept', 'post', {code: 200})
Mock.mock('/searchBuilding', 'post', [{
  id: 1,
  name: 1,
  buildingArea: 1,
  buildingTime: 1,
  useArea: 1,
}])
Mock.mock('/searchPersonnel', 'post', [{
  id: 'xx',
  name: 'xx',
  duty: 'xx',
  monad: 'xx',
  guideNum: 'xx',
}])
Mock.mock('/detailPersonnel', 'post', {
  workNum: 'xx',
  name: 'xx',
  dutyGrade: 'xx',
  dept: 'xx',
  scientificResearchUnits: 'xx',
  category: 'xx',
})
Mock.mock('/searchUser', 'post', [{
  id: 'xx',
  name: 'xx',
  loginAccount: 'xx',
  dept: 'xx',
  role: 'xx',
}])
Mock.mock('/startReservation', 'post', {})
Mock.mock('/agreeReservation', 'post', {})
let defaultFileList = [{
    uid: '1',
    name: 'xxx.png',
    status: 'done',
    response: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/xxx.png',
  }, {
    uid: '2',
    name: 'yyy.png',
    status: 'done',
    url: 'http://www.baidu.com/yyy.png',
  }, {
    uid: '3',
    name: 'zzz.png',
    status: 'error',
    response: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/zzz.png',
}]
Mock.mock('/changeFilterPH', 'post', {usingArea:24, peopleNum: "1", housePic:defaultFileList})
Mock.mock('/auditFilterPH', 'post', [{id:1}])
Mock.mock('/auditDetailPH', 'post', {
  dept: '计算机科学与技术学院',
  usingNature: '学院用房',
  secondaryNature: '专业实验室',
  building: '研学楼',
  floor: '6楼',
  roomNum: '604室',
  usingArea: '100.4平方米',
  user: ['张三', '李四'],
  head: '张三',
  fireHead: '张三',
  drawings: ['https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg', 'https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg', 'https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg', 'https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg'],
  housePic: ['https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg', 'https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg', 'https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg', 'https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg'],
  houseDesc: 'this is houseDesc',
  equipment: ['投影仪', '音响', '麦克风'],
  peopleNum: '5-10人',
  approvalDocument: '1.jpg',
})
Mock.mock('/briefChangeFilterPH', 'post', {
  drawings: [{
    uid: '1',
    name: 'xxx.png',
    status: 'done',
    response: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/xxx.png',
  }],
})
Mock.mock('/searchUser', 'get', [{id: 1}])
Mock.mock('/searchPersonnel', 'get', [{id:1}])
