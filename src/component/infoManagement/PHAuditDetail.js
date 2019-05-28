import React, {Component} from 'react'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import API from '../../api'
import {Input, Button, Row, Col, message} from 'antd'
import DetailHelper from './detailHelper'
import {parseType} from '../common/usingNature'
import Back from '../common/back'
const { TextArea } = Input


class PHAuditDetail extends Component{
  state = {
    opinion: '',
    id: '',
    hasLoaded: false,
  }
  componentDidMount(){
    let id = this.props.match.params.id
    this.setState({id, type:parseType(id.split('-')[0])})
    API.auditDetailPH(id)
    .then(rs=>{
      this.setState({...rs,hasLoaded: true, id})
    })
    .catch(err=>{
       if(!err.resolved)
        message.error('加载失败')
    })
  }
  opinionChange = (e)=>{
    this.setState({opinion: e.target.value})
  }
  // 批准回调
  approval = ()=>{
    API.aprovalPH(this.state.id, this.state.opinion)
    .then(()=>{
      message.success('批准成功')
    })
    .catch(err=>{
       if(!err.resolved)
          message.error('批准失败, 请检查网络连接')
    })
  }
  // 驳回回调
  rejected = ()=>{
    API.rejectedPH(this.state.id, this.state.opinion)
    .then(()=>{
      message.success('驳回成功')
    })
    .catch(err=>{
       if(!err.resolved)
        message.error('驳回失败, 请检查网络连接')
    })
  }
  render(){
    return <MainContainer name="公用房审批">
      <Row>
        <Col span={2}>
          <Back></Back>
        </Col>
        <Col span={10}>
          <h2 style={{textAlign: 'right'}}>公用房审批</h2>
        </Col>
      </Row>
      <Split></Split>
      <Row>
        <Col style={{marginLeft: '10%'}}>
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
        </Col>
      </Row>
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
