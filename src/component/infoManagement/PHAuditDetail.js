import React, {Component} from 'react'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import API from '../../api'
import {Input, Button, Row, Col, message} from 'antd'
import DetailHelper from './detailHelper'
const { TextArea } = Input


class PHAuditDetail extends Component{
  state = {
    opinion: '',
    id: '',
    hasLoaded: false,
  }
  componentDidMount(){
    let id = this.props.match.params.id
    this.setState({id})
    API.auditDetailPH(id)
    .then(rs=>{
      this.setState({...rs,hasLoaded: true, id})
    })
    .catch(err=>{
      message.error('加载失败')
    })
  }
  opinionChange = (e)=>{
    this.setState({opinion: e.target.value})
  }
  // 批准回调
  approval = ()=>{
    API.aprovalPH(this.state.id)
    .then(()=>{
      message.success('批准成功')
    })
    .catch(err=>{
      message.error('批准失败, 请检查网络连接')
    })
  }
  // 驳回回调
  rejected = ()=>{
    API.rejectedPH(this.state.id)
    .then(()=>{
      message.success('驳回成功')
    })
    .catch(err=>{
      message.error('驳回失败, 请检查网络连接')
    })
  }
  render(){
    return <MainContainer name="公用房审批">
      基本信息/公用房审批
      <h2 style={{textAlign: 'center'}}>公用房审批</h2>
      <Split></Split>
      <p>审核意见</p>
      <div style={{width: '60%'}}>
        <Row>
          <Col span={18}>
            <TextArea onChange={this.opinionChange} rows={4}></TextArea>
          </Col>
          <Col offset={1} span={3}>
            <Button onClick={this.approval} type='primary' block style={{margin: '10px 0'}}>批准</Button>
            <Button onClick={this.rejected} style={{backgroundColor: 'red', color: 'white'}} block>驳回</Button>
          </Col>
        </Row>
      </div>
      {
      this.state.hasLoaded&&(
        <DetailHelper
          numType={this.state.id.split('-')[0]}
          {...this.state}></DetailHelper>
      )
      }
    </MainContainer>
  }
}

export default PHAuditDetail
