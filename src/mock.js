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
