import React, {Component} from 'react'
import { Route, Link } from "react-router-dom";
import Map from '../../routerMap'
import
  {Form, Select, Row, Col, Button, message, DatePicker, Checkbox, Cascader}
from 'antd'
import API from '../../api'
import {SButton} from '../common/button'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table, {TableUtil,sorterParse} from '../common/table'
import ReservationModal, {rangeData} from './reservationModal'
import moment from 'moment'
import {read, write} from '../stateHelper'
import {TButton} from '../common/button'

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
    filter: {},
    values: {},
  }
  componentWillMount(){
    read(this)
  }
  componentWillUnmount(){
    write(this)
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
       this.setState({tableLoading: true, isSearched: true, current: 1, values, useDate: values.useDate.valueOf(), startStopTime: values.startStopTime})
       let startStopTime = []
       startStopTime[0] = moment(values.useDate.format('YYYY-MM-DD')+' '+values.startStopTime[0]).valueOf()/1000
       startStopTime[1] = moment(values.useDate.format('YYYY-MM-DD')+' '+values.startStopTime[1]).valueOf()/1000
        let filter = {
          ...values,
          startStopTime,
        }
        delete filter.useDate
        this.setState({filter})
        API.searchMeetingRoomReservation(filter)
        .then(rs=>{
          this.setState({tableList: rs})
        })
        .catch(err=>{
          if(!err.resolved)
            message.error('????????????')
        })
        .finally(()=>{
          this.setState({tableLoading: false})
        })
      }
    })
  }
  tableChange = (p,s)=>{
    this.setState({tableLoading: true, page:p, current: p.current})
    API.searchMeetingRoomReservation(sorterParse(this.state.filter,s), p)
    .then(rs=>{
      this.setState({
        tableList: rs,
     })
   })
   .catch(err=>{
     message.error('????????????')
   })
   .finally(()=>this.setState({tableLoading: false}))
  }
  render(){
    let columns = [
      {
        title: '??????',
        dataIndex: 'dept',
        sorter: true,
      },
      {
        title: '??????',
        dataIndex: 'building',
        sorter: true,
      },
      {
        title: '??????',
        dataIndex: 'floor',
        sorter: true,
      },
      {
        title: '?????????',
        dataIndex: 'roomNum',
        sorter: true,
      },
      /*{
        title: '?????????',
        dataIndex: 'manager',
      },*/
      /*{
        title: '????????????',
        dataIndex: 'auditStatus',
        sorter: true,
        render: text=>TableUtil.mapColor(text)
      },*/
      {
        title: '??????',
        render: (text, record, index)=>(
          <div>
            <div style={{display: 'inline-block', padding: '0 10px'}}>
              <SButton onClick={this.openReservationModal.bind(this, record)} text='????????????'/>
            </div>
          </div>
      )
      }
    ]
    const { getFieldDecorator } = this.props.form
    const options = [
      { label: '??????', value: '??????' },
      { label: '?????????', value: '?????????' },
      { label: '??????', value: '??????' },
      { label: '?????????', value: '?????????' },
      { label: '??????', value: '??????' },
    ]
    return <MainContainer name="????????????">
      <Form onSubmit={this.handleSubmit} style={{marginTop:'50px'}}>
        <Row>
          <Col style={{minWidth: 250}} span={6}>
            <Item labelCol={{span:8}} wrapperCol={{span:15}} label="????????????">
              {getFieldDecorator('galleryful',{
                initialValue: this.state.values.galleryful||"0",
                rules: [{required: true, message: '?????????????????????'}]
              })(
                <Select>
                  <Option value="0">??????</Option>
                  <Option value="1">5?????????</Option>
                  <Option value="2">5-10???</Option>
                  <Option value="3">10-20???</Option>
                  <Option value="4">20?????????</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col style={{minWidth: 210}} span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="????????????">
              {getFieldDecorator('useDate',{
                initialValue: moment(this.state.values.useDate),
                rules: [{required: true, message: '?????????????????????'}]
              })(
                <DatePicker></DatePicker>
              )}
            </Item>
          </Col>
          <Col style={{minWidth: 210}} span={5}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="????????????">
              {getFieldDecorator('startStopTime',{
                initialValue: this.state.values.startStopTime,
                rules: [{required: true, message: '?????????????????????'}]
              })(
                <Cascader
                  options={rangeData}
                  expandTrigger="hover"
                  placeholder='?????????????????????'
                ></Cascader>
              )}
            </Item>
          </Col>
        </Row>
        <Row>
          <Col style={{minWidth: 500}} span={12}>
            <Item labelCol={{span:4}} wrapperCol={{span:20}} label="????????????">
              {getFieldDecorator('deviceConfig',{
                initialValue: this.state.values.deviceConfig,
              })(
                <CheckboxGroup options={options} />
              )}
            </Item>
          </Col>
          <Col style={{minWidth: 120}} offset={0} span={3}>
            <TButton.SearchButton type="primary" onClick={this.search}>????????????</TButton.SearchButton>
          </Col>
          <Col style={{minWidth: 130}} span={4}>
            <Route>
              <Link to={Map.MyReservation.path}>
                <Button type="primary">??????????????????</Button>
              </Link>
            </Route>
          </Col>
        </Row>
      </Form>
      <Split/>
      <Table
        current={this.state.current}
        onChange={this.tableChange}
        columns={columns} loading={this.state.tableLoading} data={this.state.tableList}></Table>
      <ReservationModal
        useDate={this.state.values.useDate}
        startStopTime={this.state.values.startStopTime}
        request={API.startReservation}
        {...this.state.reservationModal} close={this.closeReservationModal} />
    </MainContainer>
  }
}

const WrappedMeetingRoomReservation = Form.create({ name: 'teaching_unit_performance' })(MeetingRoomReservation);

export default WrappedMeetingRoomReservation
