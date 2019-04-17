import React, {Component} from 'react'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import API from '../../api'
import {message, Button, Row, Col} from 'antd'
import DetailHelper from './detailHelper'
import {parseType} from '../common/usingNature'
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
      message.error('加载信息失败')
      if(err.response)
        message.error(err.response.data.title)
    })
    .finally(()=>{
      this.setState({infoLoading: false})
    })
  }
  render(){
    return (
      <MainContainer name="统计查询">
        <Row>
          <Col span={12}>
            <h2 style={{textAlign: 'right'}}>公用房详细信息</h2>
          </Col>
          <Col offset={4} span={2}><Button onClick={this.print}
            type="primary">打印</Button></Col>
          <Col span={2}><Button type="primary">导出到文件</Button></Col>
        </Row>
        <Split></Split>
        <div id='printArea'>
          <DetailHelper numType={this.state.id.split('-')[0]}
            {...this.state.detailInfo}></DetailHelper>
        </div>
      </MainContainer>
    )
  }
}

export default PHDetailInfo
