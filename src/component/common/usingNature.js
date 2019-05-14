import React, {Component} from 'react'
import {Cascader, Select} from 'antd'
const Option = Select.Option
const options = [
  {
    value: '1',
    label: '科研用房',
    children: [
      {
        value: '科研用房',
        label: '科研用房',
      },
      {
        value: '其他',
        label: '其他',
      },
    ],
  },
  {
    value: '2',
    label: '后勤保障公共用房',
    children: [
      {
        value: '值班室',
        label: '值班室',
      },
      {
        value: '储藏室',
        label: '储藏室',
      },
      {
        value: '物业及工勤人员用房',
        label: '物业及工勤人员用房',
      },
      {
        value: '开水间',
        label: '开水间',
      },
      {
        value: '卫生间',
        label: '卫生间',
      },
      {
        value: '配电室',
        label: '配电室',
      },
      {
        value: '消防监控配套用房',
        label: '消防监控配套用房',
      },
      {
        value: '警备值班用房',
        label: '警备值班用房',
      },
      {
        value: '水泵房等配套用房',
        label: '水泵房等配套用房',
      },
      {
        value: '其他后勤配套用房',
        label: '其他后勤配套用房',
      },
      {
        value: '职工（党员）活动室',
        label: '职工（党员）活动室',
      },
      {
        value: '各类学生用房',
        label: '各类学生用房',
      },
      {
        value: '报告厅',
        label: '报告厅',
      },
      {
        value: '专用教室',
        label: '专用教室',
      },
      {
        value: '多媒体办公室',
        label: '多媒体办公室',
      },
      {
        value: '教师休息室',
        label: '教师休息室',
      },
      {
        value: '展览室',
        label: '展览室',
      },
      {
        value: '其他',
        label: '其他',
      },
    ],
  },
  {
    value: '3',
    label: '产业商业用房',
    children: [
      {
        value: '商铺',
        label: '商铺',
      },
      {
        value: '厂房',
        label: '厂房',
      },
      {
        value: '宾馆用房',
        label: '宾馆用房',
      },
      {
        value: '酒店用房',
        label: '酒店用房',
      },
      {
        value: '研究用房',
        label: '研究用房',
      },
      {
        value: '其他',
        label: '其他',
      },
    ],
  },
  {
    value: '4',
    label: '学院党政机关用房',
    children: [
      {
        value: '行政办公室',
        label: '行政办公室',
      },
      {
        value: '教师工作室',
        label: '教师工作室',
      },
      {
        value: '会议室',
        label: '会议室',
      },
      {
        value: '实验室',
        label: '实验室',
      },
      {
        value: '图书资料室',
        label: '图书资料室',
      },
      {
        value: '信息网络用房',
        label: '信息网络用房',
      },
      {
        value: '各类学生用房',
        label: '各类学生用房',
      },
      {
        value: '专用教室',
        label: '专用教室',
      },
      {
        value: '接待室',
        label: '接待室',
      },
      {
        value: '档案室',
        label: '档案室',
      },
      {
        value: '机要保密室',
        label: '机要保密室',
      },
      {
        value: '文印室',
        label: '文印室',
      },
      {
        value: '展览室',
        label: '展览室',
      },
      {
        value: '职工（党员）活动室',
        label: '职工（党员）活动室',
      },
      {
        value: '报告厅',
        label: '报告厅',
      },
      {
        value: '其他',
        label: '其他',
      },
    ],
  },
]
class UsingNature extends Component{
  render(){
    let changeOnSelect = true
    if(this.props.changeOnSelect===false){
      changeOnSelect = false
    }
    let props = {
      ...this.props,
    }
    return (
      <Cascader
        placeholder=''
        options={options}
        expandTrigger="hover"
        changeOnSelect={changeOnSelect}
        {...props}
      />
    )
  }
}

class UsingNatureBrief extends Component{
  render(){
    return (
      <Select {...this.props}>
        {
          options.map(item=>(
            <Option key={item.value} value={item.value}>{item.label}</Option>
          ))
        }
      </Select>      
    )
  }
}
let parseType = (type)=>{
  if(type===1||type==='1'){
    return '科研用房'
  }else if(type===2||type==='2'){
    return '后勤保障公共用房'
  }else if(type===3||type==='3'){
    return '产业商业用房'
  }else if(type===4||type==='4'){
    return '学院党政机关用房'
  }
}
let parseId = (type)=>{
  if(type==='科研用房')
    return 1
  if(type==='后勤保障公共用房')
    return 2
  if(type==='产业商业用房')
    return 3
  if(type==='学院党政机关用房')
    return 4
}
export default UsingNature
export {UsingNatureBrief, parseType, parseId}
