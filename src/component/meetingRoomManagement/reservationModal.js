import React, {Component} from 'react'
import
  {Form, message, DatePicker, Modal, Input, notification, Cascader}
from 'antd'
import moment from 'moment'

const rangeData = []
for(let i=8; i < 21; i++){
  let curData = {
    label:i+':00',
    value: (i < 10?'0':'')+i+':00',
    children:[],
  }
  for(let j=i+1; j < 22;j++){
    curData.children.push({
      label: j+':00',
      value: (j < 10?'0':'')+j+':00',
    })
  }
  rangeData.push(curData)
}

const Item = Form.Item

class ReservationModal extends Component {
  hideModal = () => {
    this.props.close()
  }

  // 开始预约
 submit = ()=>{
   this.props.form.validateFields((err, values) => {
     if (!err) {
       let startStopTime = []
       let start = moment(values.useDate.format('YYYY-MM-DD')+' '+values.startStopTime[0])
       let end = moment(values.useDate.format('YYYY-MM-DD')+' '+values.startStopTime[1])
        startStopTime[0] = start.valueOf()/1000
        startStopTime[1] = end.valueOf()/1000
        let filter = {
          ...values,
          startStopTime,
        }
        delete filter.useDate
        let postData = {
          id: this.props.id,
          ...filter,
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
            duration: 5,
            description: content,
          })
        })
        .catch(err=>{
          message.error('预约失败')
        })
      }
    })
  }
  validatePhone = (rule, value, callback) => {
      let phone=value.replace(/\s/g, "");//去除空格
      //校验手机号，号段主要有(不包括上网卡)：130~139、150~153，155~159，180~189、170~171、    176~178。14号段为上网卡专属号段
      let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
      if(value.length === 0){
          callback();
      }else{
          if(!regs.test(phone)){
              callback([new Error('手机号输入不合法')]);
          }else{
              callback();
          }
     }
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
          <Item label="使用日期">
            {getFieldDecorator('useDate',{
              rules: [{required: true, message: '请选择使用日期'}],
              initialValue: moment(this.props.useDate,),
            })(
              <DatePicker disabled={this.props.useDate}></DatePicker>
            )}
          </Item>
          <Item label="起止时间">
            {getFieldDecorator('startStopTime',{
              rules: [{required: true, message: '请选择起止时间'}],
              initialValue: this.props.startStopTime,
            })(
              <Cascader
                options={rangeData}
                expandTrigger="hover"
                placeholder='请选择起止时间'
                disabled={this.props.startStopTime}
              ></Cascader>
            )}
          </Item>
          <Item label="办公电话">
            {getFieldDecorator('bangongdianhua',{
              initialValue: this.props.data.bangongdianhua,
            })(
              <Input disabled/>
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
              rules: [
                {required: true, message: '请输入联系电话'},
                {validator: this.validatePhone},
              ]
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
export {rangeData}
