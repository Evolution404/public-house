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
