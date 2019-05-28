import React, {Component} from 'react'
import {Form, Row, Col, Select, Input, message} from 'antd'
import moment from 'moment'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table, {TableUtil,sorterParse} from '../common/table'
import {SButton} from '../common/button'
import {DeptSelect, BuildingSelect} from '../common/select'
import API from '../../api'
import ReservationModal from './reservationModal'
import {read, write} from '../stateHelper'
import {TButton} from '../common/button'

const Item = Form.Item
const Option = Select.Option

class MyReservation extends Component{
  state = {
    tableList: [],
    tableLoading: false,
    isSearched: false,
    filter: {},
    reservationModal: {
      visible: false,
      id: 0,
      data:{},
    },
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
 search = type=>{
   this.props.form.validateFields((err, values) => {
     if (!err) {
       values = {
         ...values,
         type,
        }
        this.setState({tableLoading: true, isSearched: true, filter: values, current: 1})
        API.searchMyReservation(values)
        .then((rs)=>{
          this.setState({tableList: rs})
        })
        .catch(err=>{
          if(!err.resolved)
            message.error('查询失败')
        })
        .finally(()=>{
          this.setState({tableLoading: false})
        })
      }
    })
  }
  tableChange = (p,s)=>{
    this.setState({tableLoading: true, page:p, current: p.current})
    API.searchMyReservation(sorterParse(this.state.filter,s), p)
    .then(rs=>{
      this.setState({
        tableList: rs,
     })
   })
   .catch(err=>{
      if(!err.resolved)
         message.error('加载失败')
   })
   .finally(()=>this.setState({tableLoading: false}))
  }
  refresh = ()=>{
    this.setState({tableLoading: true})
    API.searchMyReservation(this.state.filter)
    .then((rs)=>{
      this.setState({tableList: rs})
    })
    .catch(err=>{
      if(!err.resolved)
        message.error('刷新失败')
    })
    .finally(()=>{
      this.setState({tableLoading: false})
    })
  }
  cancleReservation = id=>{
    API.cancleReservation(id)
    .then(()=>{
      this.refresh()
      message.success('取消预约成功')
    })
    .catch(err=>{
      if(!err.resolved)
        message.error('取消预约失败, 请重试')
    })
  }
  render(){
    let columns = [
      {
        title: '房屋单位',
        dataIndex: 'dept',
        sorter: true,
      },
      {
        title: '楼宇',
        dataIndex: 'building',
        sorter: true,
      },
      {
        title: '楼层',
        dataIndex: 'floor',
        sorter: true,
      },
      {
        title: '房间号',
        dataIndex: 'roomNum',
        sorter: true,
      },
      {
        title: '管理者办公电话',
        sorter: true,
        dataIndex: 'bangongdianhua',
      },
      {
        title: '开始时间',
        sorter: true,
        dataIndex: 'startTime',
        render: text=>{
          return moment(text).format('YYYY-MM-DD HH:mm')
        }
      },
      {
        title: '结束时间',
        sorter: true,
        dataIndex: 'stopTime',
        render: text=>{
          return moment(text).format('YYYY-MM-DD HH:mm')
        }
      },
      {
        title: '预约用途',
        dataIndex: 'reservationPurpose',
      },
      {
        title: '预约状态',
        sorter: true,
        dataIndex: 'reservationStatus',
        render: text=>TableUtil.mapColor(text)
      },
      {
        title: '操作',
        render: (text, record, index)=>(
          <div>
            <div style={{display: 'inline-block', padding: ''}}>
              <SButton disable={record.reservationStatus==='未审批'}
                text='再次预约'
                onClick={this.openReservationModal.bind(this, record)}/>
            </div>
            <div style={{display: 'inline-block', padding: ''}}>
              <SButton disable={record.reservationStatus!=='未审批'}
                text='取消预约'
                onClick={this.cancleReservation.bind(this, record.id)}/>
            </div>
          </div>
      )
      }
    ]
    const { getFieldDecorator } = this.props.form
    return <MainContainer name="我的预约">
      <Form labelCol={{span:8}} wrapperCol={{span: 12}} style={{marginTop: 50, marginBottom: 10}}>
        <Row>
          <Col span={6}>
            <Item label="单位">
              {getFieldDecorator('dept',{
                initialValue: this.state.filter.dept,
              })(
                <DeptSelect></DeptSelect>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item label="楼宇">
              {getFieldDecorator('building',{
                initialValue: this.state.filter.building,
              })(
                <BuildingSelect></BuildingSelect>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item label="房间号">
              {getFieldDecorator('roomNum',{
                initialValue: this.state.filter.roomNum,
              })(
                <Input 
                  placeholder="如:南405"
                />
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item label="预约状态">
              {getFieldDecorator('reservationStatus',{
                initialValue: this.state.filter.reservationStatus,
              })(
                <Select>
                  <Option value="">所有</Option>
                  <Option value="已审批">已审批</Option>
                  <Option value="未审批">未审批</Option>
                  <Option value="已驳回">已驳回</Option>
                  <Option value="已作废">已作废</Option>
                </Select>
              )}
            </Item>
          </Col>
        </Row>
        <Row style={{marginLeft: '20px'}}>
          <TButton.CalendarButton type="primary"
            onClick={this.search.bind(this, 1)}>最近一周</TButton.CalendarButton>
          <TButton.CalendarButton type="primary"
          onClick={this.search.bind(this, 2)}>最近一月</TButton.CalendarButton>
          <TButton.CalendarButton type="primary"
          onClick={this.search.bind(this, 3)}>最近三月</TButton.CalendarButton>
          <TButton.CalendarButton type="primary"
          onClick={this.search.bind(this, 4)}>最近半年</TButton.CalendarButton>
        </Row>
      </Form>
      <Split/>
      <Table
        current={this.state.current}
        onChange={this.tableChange}
        columns={columns} loading={this.state.tableLoading} data={this.state.tableList}></Table>
      <ReservationModal
        request={API.retryReservation}
        refresh={this.refresh}
        {...this.state.reservationModal} close={this.closeReservationModal} />
    </MainContainer>
  }
}

const WrappedMyReservation = Form.create({ name: 'my_reservation' })(MyReservation);

export default WrappedMyReservation
