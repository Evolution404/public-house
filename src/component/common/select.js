import React, {Component} from 'react'

// 传入options,列表类型

class Select extends Component{
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
        <select style={{width: '95px',
          height: '21px',
          fontSize: '13px',
        }} type="text" onChange={this.props.onChange}>
        {options.map((option, index)=>(
          <option key={index} value={index}>{option}</option>
        ))}
        </select>
      </div>
    )
  }
}

export default Select
