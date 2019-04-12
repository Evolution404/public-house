import React, {Component} from 'react'
import {Select} from 'antd'
const Option = Select.Option

class YearSelect extends Component{
  render(){
    let options = []
    let currentYear = (new Date()).getFullYear()
    for(let i=0;i < 5;i++){
      options.push((
        <Option key={i} value={currentYear-i}>{currentYear-i}</Option>
      ))
    }
    return (
      <Select size='small' {...this.props}>
        {
          options
        }
      </Select>
    )
  }
}

export default YearSelect
