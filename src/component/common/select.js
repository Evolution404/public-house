import React, {Component} from 'react'
import API from '../../api'
import {Select, message} from 'antd'
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


class BuildingSelect extends Component{
  state = {
    building: [],
    loading: true,
  }
  componentDidMount(){
    API.getBuildings()
    .then(rs=>{
      this.setState({building: rs})
    })
    .catch(err=>{
      message.error('加载楼宇信息失败')
    })
    .finally(()=>{
      this.setState({loading: false})
    })
  }
  render(){
    return (
      <Select {...this.props} loading={this.state.loading}>
        {
          this.state.building.map(item=>(
            <Option key={item} value={item}>{item}</Option>
          ))
        }
      </Select>
    )
  }
}

class DeptSelect extends Component{
  state = {
    depts: [],
    loading: true,
    value: undefined,
  }
  onChange = (value)=>{
    this.setState({value})
    this.props.onChange(value)
  }
  getDept = (type)=>{
    this.setState({loading: true})
    API.getDepts(type)
    .then(rs=>{
      this.setState({depts: rs})
    })
    .catch(err=>{
      message.error('加载部门信息失败')
    })
    .finally(()=>{
      this.setState({loading: false})
    })
  }
  componentDidMount(){
    this.getDept("0")
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.type!==this.props.type){
      this.setState({value: undefined})
      this.getDept(nextProps.type)
    }
  }
  render(){
    return (
      <Select {...this.props}
        onChange={this.onChange}
        value={this.state.value}
        loading={this.state.loading}>
        {
          this.state.depts.map(item=>(
            <Option key={item} value={item}>{item}</Option>
          ))
        }
      </Select>
    )
  }
}

class FloorSelect extends Component{
  state = {
    floors: '',
    loading: false,
    value: undefined,
  }
  componentWillMount(){
    if(this.props.building)
      this.getFloors()
  }
  getFloors(){
    this.setState({loading: true})
    API.getBuildingFloors(this.props.building)
    .then(rs=>{
      this.setState({floors: rs})
    })
    .catch(err=>{
      message.error('加载楼层信息失败')
    })
    .finally(()=>{
      this.setState({loading: false})
    })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.building!==this.props.building){
      this.setState({value: undefined})
      this.setState({building: nextProps.building},()=>{
        this.getFloors()
      })

    }
  }
  onChange = (value)=>{
    this.setState({value})
    this.props.onChange(value)
  }
  render(){
    let options = []
    for(let i=0;i< this.state.floors;i++){
      options.push(
        <Option key={i} value={i+1}>{i+1}</Option>
      )
    }
    return (
      <Select {...this.props}
        value={this.state.value}
        onChange={this.onChange}
        placeholder={this.props.building||'请先选择楼宇'}
        loading={this.state.loading}>
        {
          options
        }
      </Select>
    )
  }
}
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

export {DeptSelect, BuildingSelect, FloorSelect, YearSelect}
