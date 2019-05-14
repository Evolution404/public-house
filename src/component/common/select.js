import React, {Component} from 'react'
import API from '../../api'
import {Select, message, Input} from 'antd'
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
      if(!err.response)
        message.error('加载楼宇信息失败')
    })
    .finally(()=>{
      this.setState({loading: false})
    })
  }
  render(){
    return (
      <Select
        allowClear
        {...this.props} loading={this.state.loading}>
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
    value: this.props.value,
    justOne: false,
  }
  onChange = (value)=>{
    this.setState({value})
    this.props.onChange(value)
  }
  getDept = (type)=>{
    this.setState({loading: true})
    API.getDepts(type)
    .then(rs=>{
      if(rs.length===1){
        this.setState({justOne: true, value: rs[0]})
        this.props.onChange(rs[0])
      }
      this.setState({depts: rs})
    })
    .catch(err=>{
      if(!err.response)
        message.error('加载单位信息失败')
    })
    .finally(()=>{
      this.setState({loading: false})
    })
  }
  componentDidMount(){
    this.getDept(this.props.type||"0")
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.type!==this.props.type){
      this.setState({value: undefined})
      this.getDept(nextProps.type)
    }
    if(nextProps.value!==this.props.value){
      this.setState({value: nextProps.value})
    }
  }
  render(){
    let depts = this.state.depts
    return (
      <Select {...this.props}
        allowClear
        disabled={this.state.justOne}
        onChange={this.onChange}
        value={this.state.value}
        loading={this.state.loading}>
        {
          depts.map(item=>(
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
    if(this.props.value)
      this.setState({value: this.props.value})
    if(this.props.building)
      this.getFloors()
  }
  getFloors(){
    /*this.setState({loading: true})
    API.getBuildingFloors(this.props.building)
    .then(rs=>{
      this.setState({floors: rs})
    })
    .catch(err=>{
      message.error('加载楼层信息失败')
    })
    .finally(()=>{
      this.setState({loading: false})
    })*/
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
    return <Input
      placeholder="如：1或B1(地下室)"
      {...this.props}></Input>
    /*let options = []
    for(let i=0;i< this.state.floors;i++){
      options.push(
        <Option key={i} value={i+1}>{i+1}</Option>
      )
    }
    return (
      <Select {...this.props}
        allowClear
        value={this.state.value}
        onChange={this.onChange}
        placeholder={this.props.building||'请先选择楼宇'}
        loading={this.state.loading}>
        {
          options
        }
      </Select>
    )*/
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
      <Select
        allowClear
        size='small' {...this.props}>
        {
          options
        }
      </Select>
    )
  }
}
class LabSelect extends Component{
  state = {
    labs: [],
    loading: false,
    value: undefined,
  }
  componentWillMount(){
    if(this.props.year&&this.props.dept)
      this.getLabs()
  }
  getLabs(){
    if(!(this.props.year&&this.props.dept))
      return
    this.setState({loading: true})
    API.getLabs(this.props.year, this.props.dept)
    .then(rs=>{
      this.setState({labs: rs})
    })
    .catch(err=>{
      if(!err.response)
        message.error('加载实验室信息失败')
    })
    .finally(()=>{
      this.setState({loading: false})
    })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.year!==this.props.year||nextProps.dept!==this.props.dept){
      this.setState({value: undefined})
      this.setState({year: nextProps.year, dept: nextProps.dept},()=>{
        this.getLabs()
      })

    }
  }
  onChange = (value)=>{
    this.setState({value})
    this.props.onChange(value)
  }
  render(){
    return (
      <Select {...this.props}
        allowClear
        value={this.state.value}
        onChange={this.onChange}
        placeholder={(this.props.year&&this.props.dept)?
          `${this.props.year}年${this.props.dept}`:'请先选择年份和单位'}
        loading={this.state.loading}>
        {
          this.state.labs.map(item=>(
            <Option key={item} value={item}>{item}</Option>
          ))
        }
      </Select>
    )
  }
}

class ClassroomSelect extends Component{
  state = {
    classrooms: [],
    loading: false,
    value: undefined,
  }
  componentWillMount(){
    if(this.props.year&&this.props.building)
      this.getClassrooms()
  }
  getClassrooms(){
    if(!(this.props.year&&this.props.building))
      return
    this.setState({loading: true})
    API.getClassrooms(this.props.year, this.props.building)
    .then(rs=>{
      this.setState({classrooms: rs})
    })
    .catch(err=>{
      if(!err.response)
        message.error('加载教室信息失败')
    })
    .finally(()=>{
      this.setState({loading: false})
    })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.year!==this.props.year||nextProps.building!==this.props.building){
      this.setState({value: undefined})
      this.setState({year: nextProps.year, building: nextProps.building},()=>{
        this.getClassrooms()
      })

    }
  }
  onChange = (value)=>{
    this.setState({value})
    this.props.onChange(value)
  }
  render(){
    return (
      <Select {...this.props}
        allowClear
        value={this.state.value}
        onChange={this.onChange}
        placeholder={(this.props.year&&this.props.dept)?
          `${this.props.year}年${this.props.dept}`:'请先选择年份和楼宇'}
        loading={this.state.loading}>
        {
          this.state.classrooms.map(item=>(
            <Option key={item} value={item}>{item}</Option>
          ))
        }
      </Select>
    )
  }
}

class RoleSelect extends Component{
  state = {
    roles: [],
    loading: true,
    value: this.props.value||undefined,
  }
  onChange = (value)=>{
    this.setState({value})
    this.props.onChange(value)
  }
  getRoles = ()=>{
    this.setState({loading: true})
    API.getRoles()
    .then(rs=>{
      this.setState({roles: rs})
    })
    .catch(err=>{
      if(!err.response)
        message.error('加载角色信息失败')
    })
    .finally(()=>{
      this.setState({loading: false})
    })
  }
  componentDidMount(){
    this.getRoles()
  }
  componentWillReceiveProps(nextProps){
    this.setState({value: nextProps.value})
  }
  render(){
    let roles = this.state.roles
    return (
      <Select {...this.props}
        allowClear
        onChange={this.onChange}
        value={this.state.value}
        loading={this.state.loading}>
        {
          roles.map(item=>(
            <Option key={item.id} value={item.id}>{item.juesemingcheng}</Option>
          ))
        }
      </Select>
    )
  }
}

export {
  DeptSelect,
  BuildingSelect,
  FloorSelect,
  YearSelect,
  LabSelect,
  ClassroomSelect,
  RoleSelect,
}
