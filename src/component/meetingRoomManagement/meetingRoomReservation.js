import React, {Component} from 'react'
import
  {Form, Select, Row, Col, Button, message, DatePicker, Checkbox, Modal, Input, notification}
from 'antd'
import API from '../../api'
import {SButton} from '../common/button'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table from '../common/table'

const {RangePicker} = DatePicker;
const CheckboxGroup = Checkbox.Group
const Item = Form.Item
const Option = Select.Option

class ReservationModal extends Component {
  hideModal = () => {
    this.props.close()
  }

  // 开始预约
  submit = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let postData = {
          id: this.props.id,
          ...values,
        }
        API.startReservation(postData)
        .then(()=>{
          this.hideModal()
          let content = <div>
            <p>您已经预约</p>
            <p>2019-02-24 星期日</p>
            <p>上午8:00-10:00时段</p>
            <p>研究院中517会议室</p>
            <div></div>
            <p>系统已给会议室管理人员发送了通知,请耐心等候审核结果</p>
          </div>
          notification.success({
            message: '预约申请成功',
            duration: 0,
            description: content,
          })
        })
        .catch(err=>{
          message.error('预约失败')
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        title="预约登记"
        width="500px"
        visible={this.props.visible}
        closable={false}
        okText="开始预约"
        onOk={this.submit}
        cancelText="返回"
        onCancel={this.hideModal}
      >
        <Form labelCol={{span: 5}} wrapperCol={{span:14}}>
          <Item label="预约时段">
            {getFieldDecorator('time',)(
              <Input/>
            )}
          </Item>
          <Item label="预约用途">
            {getFieldDecorator('purpose',)(
              <Input/>
            )}
          </Item>
          <Item label="联系电话">
            {getFieldDecorator('phone',)(
              <Input/>
            )}
          </Item>
        </Form>
      </Modal>
    )
  }
}

const WrappedReservationModal = Form.create({ name: 'reservation_modal' })(ReservationModal)

class MeetingRoomReservation extends Component{
  state = {
    tableList: [{id:0}],
    reservationModal: {
      visible: false,
      id: 0,
    }
  }
  openReservationModal = id=>{
    this.setState({reservationModal:{visible: true, id}})
  }
  closeReservationModal = ()=>{
    this.setState({reservationModal:{visible: false, id: 0}})
  }
  search = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values.startStopTime)
          values.startStopTime[0] = Math.round(values.startStopTime[0].valueOf()/1000)
          values.startStopTime[1] = Math.round(values.startStopTime[1].valueOf()/1000)
        API.searchMeetingRoomReservation(values)
        .then(rs=>{
          this.setState({tableList: rs})
        })
        .catch(err=>{
          message.error('搜索失败')
        })
        console.log('Received values of form: ', values);
        // 转成时间字符串
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
        title: '位置',
        dataIndex: 'location',
      },
      {
        title: '使用性质',
        dataIndex: 'usingNature',
      },
      {
        title: '状态',
        dataIndex: 'state',
      },
      {
        title: '操作',
        render: (text, record, index)=>(
          <div>
            <div style={{display: 'inline-block', padding: '0 10px'}}>
              <SButton text='详细'/>
            </div>
            <div style={{display: 'inline-block', padding: '0 10px'}}>
              <SButton onClick={this.openReservationModal.bind(this, record.id)} text='开始预约'/>
            </div>
          </div>
      )
      }
    ]
    const { getFieldDecorator } = this.props.form
    const options = [
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
              {getFieldDecorator('peopleNum',)(
                <Select>
                  <Option value="不限">不限</Option>
                  <Option value="5人以下">5人以下</Option>
                  <Option value="5-10人">5-10人</Option>
                  <Option value="10-20人">10-20人</Option>
                  <Option value="20人以上">20人以上</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col span={12}>
            <Item labelCol={{span:6}} wrapperCol={{span:12}} label="使用起止时间">
              {getFieldDecorator('startStopTime',)(
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
              {getFieldDecorator('equipment',)(
                <CheckboxGroup options={options} />
              )}
            </Item>
          </Col>
            <Col span={4} style={{marginLeft: '-100px'}}>
              <Button type="primary" onClick={this.search}>搜索房间</Button>
            </Col>
            <Col span={4}>
              <Button type="primary">历史预约信息</Button>
            </Col>
        </Row>
      </Form>
      <Split/>
      <div style={{fontSize: '18px', textAlign: 'center', padding:'20px 0'}}>教室使用效益</div>
      <Row>
        <Col offset={1}>
          <p style={{fontSize: '17px'}}>总学时数: {this.state.totalSchool}</p>
        </Col>
      </Row>
      <Table columns={columns} data={this.state.tableList}></Table>
      <WrappedReservationModal {...this.state.reservationModal} close={this.closeReservationModal} />
    </MainContainer>
  }
}

const WrappedMeetingRoomReservation = Form.create({ name: 'teaching_unit_performance' })(MeetingRoomReservation);

export default WrappedMeetingRoomReservation
