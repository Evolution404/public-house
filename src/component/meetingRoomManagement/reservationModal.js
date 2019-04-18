import React, {Component} from 'react'
import API from '../../api'
import
  {Form, Select, Row, Col, Button, message, DatePicker, Checkbox, Modal, Input, notification, Empty}
from 'antd'

const Item = Form.Item
const {RangePicker} = DatePicker;

class ReservationModal extends Component {
  hideModal = () => {
    this.props.close()
  }

  // 开始预约
  submit = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if(values.startStopTime){
          let start = values.startStopTime[0]
          let end = values.startStopTime[1]
          let startStopTime =
            values.startStopTime.map(i=>Math.round((i.valueOf())/1000))
          values.startStopTime = startStopTime
          let postData = {
            id: this.props.id,
            ...values,
          }
          let record = this.props.data
          this.props.request(postData)
          .then(()=>{
            this.hideModal()
            if(this.props.refresh)
              this.props.refresh()
            let content = <div>
              <p>您已经预约</p>
              <p>{start.format('YYYY-MM-DD HH:mm')}
                -{end.format('YYYY-MM-DD HH:mm')}</p>
              <p>{`${record.building}${record.floor}层${record.roomNum}`}</p>
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
            {getFieldDecorator('startStopTime',{
              rules: [{required: true, message: '请选择预约时段'}]
            })(
              <RangePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                placeholder={['开始时间', '结束时间']}
              />
            )}
          </Item>
          <Item label="预约用途">
            {getFieldDecorator('reservationPurpose',{
              rules: [{required: true, message: '请输入预约用途'}]
            })(
              <Input/>
            )}
          </Item>
          <Item label="联系电话">
            {getFieldDecorator('phone',{
              rules: [{required: true, message: '请输入联系电话'}]
            })(
              <Input/>
            )}
          </Item>
        </Form>
      </Modal>
    )
  }
}

const WrappedReservationModal = Form.create({ name: 'reservation_modal' })(ReservationModal)

export default WrappedReservationModal
