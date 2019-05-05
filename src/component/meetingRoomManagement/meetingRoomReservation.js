import React, {Component} from 'react'
import { Route, Link } from "react-router-dom";
import Map from '../../routerMap'
import
  {Form, Select, Row, Col, Button, message, DatePicker, Checkbox, Empty, Cascader}
from 'antd'
import API from '../../api'
import {SButton} from '../common/button'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table, {TableUtil} from '../common/table'
import ReservationModal, {rangeData} from './reservationModal'
import moment from 'moment'

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
        this.setState({tableLoading: true, isSearched: true, current: 1})
        console.log(moment(values.useDate.format('YYYY-MM-DD')+' '+values.startStopTime[0]))
        let startStopTime = []
        startStopTime[0] = moment(values.useDate.format('YYYY-MM-DD')+' '+values.startStopTime[0]).valueOf()/1000
        startStopTime[1] = moment(values.useDate.format('YYYY-MM-DD')+' '+values.startStopTime[1]).valueOf()/1000
        let filter = {
          ...values,
          startStopTime,
        }
        delete filter.useDate
        this.setState(filter)
        API.searchMeetingRoomReservation(filter)
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
  tableChange = (p)=>{
    this.setState({tableLoading: true, page:p, current: p.current})
    API.searchMeetingRoomReservation(this.state.filter, p)
    .then(rs=>{
      this.setState({
        tableList: rs,
      })
    })
    .catch(err=>{
      console.log(err)
      message.error('加载失败')
    })
    .finally(()=>this.setState({tableLoading: false}))
  }
  render(){
    let columns = [
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
        render: text=>TableUtil.mapColor(text)
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
    return <MainContainer name="会议室预约">
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
          <Col span={5}>
            <Item labelCol={{span:12}} wrapperCol={{span:12}} label="使用日期">
              {getFieldDecorator('useDate',{
                rules: [{required: true, message: '请选择使用日期'}]
              })(
                <DatePicker></DatePicker>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="起止时间">
              {getFieldDecorator('startStopTime',{
                rules: [{required: true, message: '请选择起止时间'}]
              })(
                <Cascader
                  options={rangeData}
                  expandTrigger="hover"
                  placeholder='请选择起止时间'
                ></Cascader>
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
          <Table
            current={this.state.current}
            onChange={this.tableChange}
            columns={columns} loading={this.state.tableLoading} data={this.state.tableList}></Table>
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
