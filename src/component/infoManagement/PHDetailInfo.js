import React, {Component} from 'react'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import API from '../../api'
import {message, Button, Row, Col, Spin} from 'antd'
import DetailHelper from './detailHelper'
import {parseType} from '../common/usingNature'
import Back from '../common/back'
class PHDetailInfo extends Component{
  state = {
    id:'',
    detailInfo: {},
    infoLoading: true,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      let id = nextProps.match.params.id
      this.initDetailInfo(id)
    } 
  }
  componentDidMount(){
    let id = this.props.match.params.id
    this.initDetailInfo(id)
  }
  print = ()=>{
    window.document.body.innerHTML =
      window.document.getElementById('printArea').innerHTML
    window.print()
    window.location.reload()
  }
  initDetailInfo = id=>{
    if(id===':id') {
      message.error('无效的id')
      return
    }
    this.setState({id, infoLoading: true})
    API.getPHDetailInfo(id)
    .then(rs=>{
      rs.type = parseType(this.state.id.split('-')[0])
      this.setState({detailInfo: rs})
    })
    .catch(err=>{
      if(!err.resolved)
        message.error('加载信息失败')
    })
    .finally(()=>{
      this.setState({infoLoading: false})
   })
 }
 render(){
   console.log(this.state.detailInfo)
   return (
     <MainContainer name="详细信息">
       <Spin spinning={this.state.infoLoading} tip="加载中...">
          <Row style={{marginBottom: -20}}>
            <Col span={2}>
              <Back></Back>
            </Col>
            <Col span={9}>
              <h2 style={{textAlign: 'right'}}>房屋详细信息</h2>
            </Col>
            <Col offset={6} span={2}><Button onClick={this.print}
              type="primary">打印</Button></Col>
          </Row>
          <Split></Split>
          <div id='printArea'>
            <DetailHelper numType={this.state.id.split('-')[0]}
              {...this.state.detailInfo}></DetailHelper>
          </div>
        </Spin>
      </MainContainer>
    )
  }
}

export default PHDetailInfo
