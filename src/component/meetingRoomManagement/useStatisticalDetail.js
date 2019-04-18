import React, {Component} from 'react'
import API from '../../api'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import {DeptSelect} from '../common/select'
import Table from '../common/table'
import download from '../common/download'
import {Form, Row, Col, Select, Input, Button, message, DatePicker, Empty} from 'antd'
import moment from 'moment'

let render = (text)=>moment(text).format('YYYY-MM-DD HH:mm')

const Item = Form.Item
const {RangePicker} = DatePicker

class Search extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Form  labelCol={{span: 10}} wrapperCol={{span:14}}>
        <Row>
          <Col span={4}>
            <Item label="部门名称">
              {
                getFieldDecorator('dept')(
                  <DeptSelect></DeptSelect>
                )
              }
            </Item>
          </Col>
          <Col span={4}>
            <Item label="房间号">
              {
                getFieldDecorator('roomNum')(
                  <DeptSelect></DeptSelect>
                )
              }
            </Item>
          </Col>
          <Col span={9}>
            <Item labelCol={{span:6}} label="起止时间">
              {
                getFieldDecorator('startStopTime')(
                  <RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={['开始时间', '结束时间']}
                  />
                )
              }
            </Item>
          </Col>
          <Col style={{marginTop: 5}} span={2} offset={2}>
            <Button type="primary">搜索</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}
Search = Form.create({ name: 'search' })(Search)

let columns = [
  {
    title: '序号',
    dataIndex: 'id',
  },
  {
    title: '预约人',
    dataIndex: 'reservationPerson',
  },
  {
    title: '预约用途',
    dataIndex: 'reservationPurpose',
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    render,
  },
  {
    title: '结束时间',
    dataIndex: 'stopTime',
    render,
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
  }
  componentWillMount(){
    let id = this.props.match.params.id
    if(id===':id') {return}
    let [meetingRoomId, startTime, stopTime] = id.split('-')
    this.setState({isJump: true, meetingRoomId, startTime, stopTime})
    this.search(id)
  }
  search = (id)=>{
    this.setState({loading: true})
    API.useStatisticalDetail(id)
    .then((rs)=>{
      this.setState({tableList: rs})
    })
    .catch(err=>{
      message.error('搜索失败')
      if(err.response)
        message.error(err.response.data.title)
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
        <h2 style={{textAlign: 'center'}}>研究院中517会议室使用情况明细</h2>
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
