import React, {Component} from 'react'
import {Select} from 'antd'
const Option = Select.Option

// 传入options,列表类型

class MySelect extends Component{
  render(){
    let options = this.props.options
    if(!options) options = []
    return (
      <div style={{display: 'inline',
        paddingRight: '30px',
      }}>
        <div style={{paddingRight: '10px',
          display: 'inline-block',
          width: '71px',
        }}>{this.props.name}</div>
        <Select style={{width: '95px',
          height: '21px',
          fontSize: '13px',
        }} type="text"
          size='small'
          onChange={this.props.onChange}>
        {options.map((option, index)=>(
          <Option key={index} value={index}>{option}</Option>
        ))}
        </Select>
      </div>
    )
  }
}

export default MySelect
