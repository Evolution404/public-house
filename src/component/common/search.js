import React, {Component} from 'react'
import Select from './select'
import Input from './input'
import {LButton} from './button'
class Search extends Component{
  render(){
    return (
      <div style={{width:"900px",
        padding: '30px 30px 10px 30px',
      }}>
        <div style={{paddingBottom:'20px'}}>
          <Select name="部门名称" 
            onChange={this.props.deptNameChange}/>
          <Select name="使用性质" 
            onChange={this.props.usingNatureChange}/>
          <Select name="审批状态" 
            options={['所有', '已批准', '未上报', '等待审核', '已驳回']}
            onChange={this.props.auditStatusChange}/>
          <Input name="使用者" 
            onChange={this.props.userChange}/>
        </div>
        <div>
          <Select name="楼宇名称" 
            onChange={this.props.buildingNameChange}/>
          <Input name="房间号" 
            onChange={this.props.roomNumChange}/>
          <Select name="房屋状态" 
            options={['所有', '使用中', '待分配', '暂借中']}
            onChange={this.props.houseStatusChange}/>
          <LButton onClick={this.props.search} text="搜索"/>
        </div>
      </div>
    )
  }
}
export default Search
