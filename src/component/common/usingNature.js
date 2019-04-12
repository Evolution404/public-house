import React, {Component} from 'react'
import {Cascader} from 'antd'
const options = [
  {
    value: '0',
    label: '产业商业用房',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
    }],
  },
  {
    value: '1',
    label: '后勤保障用房',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
    }],
  },
  {
    value: '2',
    label: '公共服务用房',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
    }],
  },
  {
    value: '3',
    label: '党政机关用房',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
    }],
  },
  {
    value: '4',
    label: '学院用房',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
    }],
  },
]
class UsingNature extends Component{
  render(){
    return (
      <Cascader
        placeholder=''
        options={options}
        expandTrigger="hover"
        {...this.props}
      />
    )
  }
}
export default UsingNature
