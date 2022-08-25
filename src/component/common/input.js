import {Input} from 'antd'
// 输入组件
// 包括一个label和一个输入框
// 传入name指定label的值

import React, {Component} from 'react'

class MyInput extends Component{
  render(){
    return (
      <div style={{display: 'inline',
        paddingRight: '30px',
      }}>
        <div style={{paddingRight: '10px',
          display: 'inline-block',
          width: '71px',
        }}>{this.props.name}</div>
        <Input style={{width: '95px',
          height: '21px',
          fontSize: '13px',
          color: '#999',
        }} type="text" onChange={this.props.onChange} />
      </div>
    )
  }
}

export default MyInput
