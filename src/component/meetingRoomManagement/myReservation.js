import React, {Component} from 'react'
import {Form, Row, Col, Select, Input, Button, message, Empty} from 'antd'
import moment from 'moment'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table from '../common/table'
import {SButton} from '../common/button'
import {DeptSelect, BuildingSelect} from '../common/select'
import API from '../../api'

const Item = Form.Item
const Option = Select.Option

class MyReservation extends Component{
  state = {
    tableList: [],
    tableLoading: false,
    isSearched: false,
    filter: {}
  }
  search = type=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values = {
          ...values,
          type,
        }
        this.setState({tableLoading: true, isSearched: true, filter: values})
        API.searchMyReservation(values)
        .then((rs)=>{
          this.setState({tableList: rs})
        })
        .catch(err=>{
          message.error('查询失败')
        })
        .finally(()=>{
          this.setState({tableLoading: false})
        })
      }
    })
  }
  refresh = ()=>{
    this.setState({tableLoading: true})
    API.searchMyReservation(this.state.filter)
    .then((rs)=>{
      this.setState({tableList: rs})
    })
    .catch(err=>{
      message.error('刷新失败')
    })
    .finally(()=>{
      this.setState({tableLoading: false})
    })
  }
  retryReservation = id=>{
    API.retryReservation(id)
    .then(()=>{
      this.refresh()
      message.success('再次预约成功, 请等待审核')
    })
    .catch(err=>{
      message.error('再次预约失败, 请重试')
    })
  }
  cancleReservation = id=>{
    API.cancleReservation(id)
    .then(()=>{
      this.refresh()
      message.success('取消预约成功')
    })
    .catch(err=>{
      message.error('取消预约失败, 请重试')
    })
  }
  render(){
    let columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '房屋部门',
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
        title: '联系电话',
        dataIndex: 'phone',
      },
      {
        title: '开始时间',
        dataIndex: 'startTime',
        render: text=>{
          return moment(text).format('YYYY-MM-DD HH:mm')
        }
      },
      {
        title: '结束时间',
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
        dataIndex: 'reservationStatus',
      },
      {
        title: '操作',
        render: (text, record, index)=>(
          <div>
            <div style={{display: 'inline-block', padding: '0 10px'}}>
              <SButton disable={record.reservationStatus==='未审批'}
                text='再次预约'
                onClick={this.retryReservation.bind(this, record.id)}/>
            </div>
            <div style={{display: 'inline-block', padding: '0 10px'}}>
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
      <Form labelCol={{span:12}} wrapperCol={{span: 12}}>
        <Row>
          <Col span={6}>
            <Item label="部门">
              {getFieldDecorator('dept',)(
                <DeptSelect></DeptSelect>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item label="楼宇">
              {getFieldDecorator('building',)(
                <BuildingSelect></BuildingSelect>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item label="房间号">
              {getFieldDecorator('roomNum',)(
                <Input/>
              )}
            </Item>
          </Col>
          <Col span={5}>
            <Item label="预约状态">
              {getFieldDecorator('reservationStatus',)(
                <Select>
                  <Option value="">所有</Option>
                  <Option value="已审批">已审批</Option>
                  <Option value="未审批">未审批</Option>
                  <Option value="已驳回">已驳回</Option>
                </Select>
              )}
            </Item>
          </Col>
        </Row>
        <Row>
          <Col offset={1} span={2}>
            <Button type="primary"
              onClick={this.search.bind(this, 1)}>最近一周</Button>
          </Col>
          <Col span={2}>
            <Button type="primary"
            onClick={this.search.bind(this, 2)}>最近一月</Button>
          </Col>
          <Col span={2}>
            <Button type="primary"
            onClick={this.search.bind(this, 3)}>最近三月</Button>
          </Col>
          <Col span={2}>
            <Button type="primary"
            onClick={this.search.bind(this, 4)}>最近半年</Button>
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
    </MainContainer>
  }
}

const WrappedMyReservation = Form.create({ name: 'my_reservation' })(MyReservation);

export default WrappedMyReservation
