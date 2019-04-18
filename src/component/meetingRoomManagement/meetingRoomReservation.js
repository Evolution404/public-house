import React, {Component} from 'react'
import { Route, Link } from "react-router-dom";
import Map from '../../routerMap'
import
  {Form, Select, Row, Col, Button, message, DatePicker, Checkbox, Modal, Input, notification, Empty}
from 'antd'
import API from '../../api'
import {SButton} from '../common/button'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table from '../common/table'
import ReservationModal from './reservationModal'

const {RangePicker} = DatePicker;
const CheckboxGroup = Checkbox.Group
const Item = Form.Item
const Option = Select.Option

class MeetingRoomReservation extends Component{
  state = {
    tableList: [],
    tableLoading: false,
    isSearched: false,
    reservationModal: {
      visible: false,
      id: 0,
      data:{},
    },
  }
  openReservationModal = record=>{
    this.setState({reservationModal:{visible: true, id:record.id, data:record}})
  }
  closeReservationModal = ()=>{
    this.setState({reservationModal:{visible: false, id: 0, data:{}}})
  }
  search = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({tableLoading: true, isSearched: true})
        if(values.startStopTime){
          let startStopTime =
            values.startStopTime.map(i=>Math.round((i.valueOf())/1000))
          values.startStopTime = startStopTime
        }
        API.searchMeetingRoomReservation(values)
        .then(rs=>{
          this.setState({tableList: rs})
        })
        .catch(err=>{
          message.error('搜索失败')
        })
        .finally(()=>{
          this.setState({tableLoading: false})
        })
      }
    })
  }
  render(){
    let columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '部门',
        dataIndex: 'dept',
      },
      {
        title: '楼宇',
        dataIndex: 'building',
      },
      {
        title: '楼层',
        dataIndex: 'floor',
      },
      {
        title: '房间号',
        dataIndex: 'roomNum',
      },
      {
        title: '管理者',
        dataIndex: 'manager',
      },
      {
        title: '审批状态',
        dataIndex: 'auditStatus',
      },
      {
        title: '操作',
        render: (text, record, index)=>(
          <div>
            <div style={{display: 'inline-block', padding: '0 10px'}}>
              <Route><Link to={Map.PHDetailInfo.path.replace(':id', '4-'+record.id)}>
                  <SButton text='详细'/>
              </Link></Route>
            </div>
            <div style={{display: 'inline-block', padding: '0 10px'}}>
              <SButton onClick={this.openReservationModal.bind(this, record)} text='开始预约'/>
            </div>
          </div>
      )
      }
    ]
    const { getFieldDecorator } = this.props.form
    const options = [
      { label: '白板', value: '白板' },
      { label: '投影仪', value: '投影仪' },
      { label: '音响', value: '音响' },
      { label: '麦克风', value: '麦克风' },
      { label: '电脑', value: '电脑' },
    ]
    return <MainContainer name="效益管理">
      <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
        <Row>
          <Col span={6}>
            <Item labelCol={{span:8}} wrapperCol={{span:15}} label="人数要求">
              {getFieldDecorator('galleryful',{
                rules: [{required: true, message: '请选择人数要求'}]
              })(
                <Select>
                  <Option value="0">不限</Option>
                  <Option value="1">5人以下</Option>
                  <Option value="2">5-10人</Option>
                  <Option value="3">10-20人</Option>
                  <Option value="4">20人以上</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col span={12}>
            <Item labelCol={{span:6}} wrapperCol={{span:12}} label="使用起止时间">
              {getFieldDecorator('startStopTime',{
                rules: [
                  {required: true, message: '请选择起止时间'},
                  {validator: (rule, value, callback)=>{
                    let now = (new Date()).valueOf()
                    let startTime = value[0].valueOf()
                    if(startTime < now)
                      callback('开始时间应该在当前时间之后')
                    callback()
                  }}
                ]
              })(
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={['开始时间', '结束时间']}
                />
              )}
            </Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Item labelCol={{span:4}} wrapperCol={{span:20}} label="设备要求">
              {getFieldDecorator('deviceConfig',)(
                <CheckboxGroup options={options} />
              )}
            </Item>
          </Col>
            <Col span={3} style={{marginLeft: '-100px'}}>
              <Button type="primary" onClick={this.search}>搜索房间</Button>
            </Col>
            <Col span={4}>
              <Route>
                <Link to={Map.MyReservation.path}>
                  <Button type="primary">历史预约信息</Button>
                </Link>
              </Route>
            </Col>
        </Row>
      </Form>
      <Split/>
      {
        this.state.isSearched?(
          <Table columns={columns} loading={this.state.tableLoading} data={this.state.tableList}></Table>
        ):(
          <Empty description="请先搜索"></Empty>
        )
      }
      <ReservationModal
        request={API.startReservation}
        {...this.state.reservationModal} close={this.closeReservationModal} />
    </MainContainer>
  }
}

const WrappedMeetingRoomReservation = Form.create({ name: 'teaching_unit_performance' })(MeetingRoomReservation);

export default WrappedMeetingRoomReservation
