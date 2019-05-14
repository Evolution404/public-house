import React, {Component} from 'react'
import API from '../../api'
import MainContainer from '../common/mainContainer'
import Table from '../common/table'
import download from '../common/download'
import {Row, Col, Button, message} from 'antd'
import moment from 'moment'

let render = (text)=>moment(text).format('YYYY-MM-DD HH:mm')



let columns = [
  {
    title: '申请人',
    dataIndex: 'applicant',
  },
  {
    title: '使用时长(小时)',
    dataIndex: 'useLength',
  },
  {
    title: '使用日期',
    dataIndex: 'useDate',
  },
  {
    title: '使用时段',
    dataIndex: 'useTime',
  },
  {
    title: '申请时间',
    dataIndex: 'applyTIme',
  },
  {
    title: '审批人',
    dataIndex: 'auditPerson',
  },
  {
    title: '审批时间',
    dataIndex: 'auditTime',
    render,
  },
]

class UseStatisticalDetail extends Component{
  state = {
    hasSearched: false,
    loading: false,
    tableList: [],
    building: '',
  }
  componentWillMount(){
    let id = this.props.match.params.id
    if(id===':id') {return}
    let [meetingRoomId, startTime, stopTime] = id.split('-')
    this.setState({meetingRoomId, startTime, stopTime})
    this.search(id)
  }
  search = (id)=>{
    this.setState({loading: true})
    API.useStatisticalDetail(id)
    .then((rs)=>{
      const {tableList, building} = rs
      this.setState({tableList, building})
    })
    .catch(err=>{
      if(!err.response)
        message.error('搜索失败')
    })
    .finally(()=>this.setState({loading: false, hasSearched: true}))
  }
  export = ()=>{
    let info = {
      meetingRoomId: this.state.meetingRoomId,
      startTime: this.state.startTime,
      stopTime: this.state.stopTime,
    }
    API.exportUseStatisticalDetail(info)
    .then(rs=>{
      download(rs)
    })
    .catch(err=>{
      message.error('导出失败')
    })
  }
  print = ()=>{
    window.document.body.innerHTML =
      window.document.getElementById('printArea').innerHTML
    window.print()
    window.location.reload()
  }
  render(){
    return (
      <MainContainer name="预约管理">
        <h2 style={{textAlign: 'center'}}>{this.state.building}会议室使用情况明细</h2>
        <Row style={{marginBottom: 25}}>
          <Col offset={17} span={2}><Button onClick={this.export} type="primary">导出到文件</Button></Col>
          <Col offset={1} span={2}><Button onClick={this.print} type="primary">打印</Button></Col>
        </Row>
        <div id="printArea">
          <Table columns={columns}
            data={this.state.tableList}
            loading={this.state.loading}
          ></Table>
        </div>
      </MainContainer>
    )
  }
}

export default UseStatisticalDetail
