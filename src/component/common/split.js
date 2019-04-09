import React, {Component} from 'react'
import { Divider } from 'antd'

class Split extends Component{
  render(){
    return (
      <Divider>{this.props.text}</Divider>
    )
  }
}

export default Split
