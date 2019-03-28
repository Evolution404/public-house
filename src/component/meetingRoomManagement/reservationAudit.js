import React, {Component} from 'react'
import {Modal, message, notification, Form, Input} from 'antd';
import {SButton} from '../common/button'
import MainContainer from '../common/mainContainer'
import Search from '../common/search'
import Split from '../common/split'
import API from '../../api'
import Table from '../common/table'

const Item = Form.Item

class RefuseModal extends Component {
  hideModal = () => {
    this.props.close()
  }

  // 提交拒绝原因
  submit = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let postData = {
          id: this.props.id,
          ...values,
        }
        API.refuseReservation(postData)
        .then(()=>{
          this.hideModal()
          notification.success({
            message: '拒绝成功',
            description: '已经将拒绝原因发送给申请人',
          })
        })
        .catch(err=>{
          message.error('拒绝失败')
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        title="拒绝预约"
        width="500px"
        visible={this.props.visible}
        closable={false}
        okText="拒绝"
        onOk={this.submit}
        cancelText="取消"
        onCancel={this.hideModal}
      >
        <Form labelCol={{span: 5}} wrapperCol={{span:14}}>
          <Item label="拒绝原因">
            {getFieldDecorator('reason',)(
              <Input/>
            )}
          </Item>
        </Form>
      </Modal>
    )
  }
}

const WrappedRefuseModal = Form.create({ name: 'refuse_modal' })(RefuseModal)

class ReservationAudit extends Component{
  state = {
    tableList: [{id:1}],
    refuseModal: {
      visible: false,
      id: 0,
    }
  }
  deptNameChange = (e)=>{
    this.setState({
      buildingName: e.target.value
    })
  }
  usingNatureChange = (e)=>{
    this.setState({
      buildingName: e.target.value
    })
  }
  auditStatusChange = (e)=>{
    this.setState({
      buildingName: e.target.value
    })
  }
  userChange = (e)=>{
    this.setState({
      buildingName: e.target.value
    })
  }
  buildingNameChange = (e)=>{
    this.setState({
      buildingName: e.target.value
    })
  }
  roomNumChange = (e)=>{
    this.setState({
      roomNum: e.target.value
    })
  }
  houseStatusChange = (e)=>{
    this.setState({
      roomNum: e.target.value
    })
  }
  search = ()=>{
    let filter = {
      deptName: this.state.deptName,
      usingNature: this.state.usingNatur,
      auditStatus: this.state.auditStatus,
      user: this.state.user,
      buildingName: this.state.buildingName,
      roomNum: this.state.roomNum,
      houseStatus: this.state.houseStatus,
    }
    return API.searchReservationAudit(filter)
    .then(rs=>{
      this.setState({
        tableList: rs
      })
    })
    .catch(err=>{
      message.error('获取失败, 请重试')
    })
  }
  onAgree = id=>{
    API.agreeReservation(id)
    .then(()=>{
      notification.success({
        message: '同意成功',
        description: '完成审批,系统已给申请人发送了审批结果通知',
      })
    })
    .catch(err=>{
      message.error('操作失败')
    })
  }
  onRefuse = id=>{
    this.openRefuseModal(id)
  }
  openRefuseModal = id=>{
    this.setState({refuseModal:{visible: true, id}})
  }
  closeRefuseModal = ()=>{
    this.setState({refuseModal:{visible: false, id: 0}})
  }
  render(){
    let changeListener = {
      deptNameChange: this.deptNameChange,
      usingNatureChange: this.usingNatureChange,
      auditStatusChange: this.auditStatusChange,
      userChange: this.userChange,
      buildingNameChange: this.buildingNameChange,
      roomNumChange: this.roomNumChange,
      houseStatus: this.houseStatusChange,
      search: this.search,
    }
    let columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '时间',
        dataIndex: 'time',
      },
      {
        title: '房屋部门',
        dataIndex: 'houseDept',
      },
      {
        title: '位置',
        dataIndex: 'location',
      },
      {
        title: '预约人',
        dataIndex: 'reservationPerson',
      },
      {
        title: '联系电话',
        dataIndex: 'phoen',
      },
      {
        title: '预约用途',
        dataIndex: 'purpose',
      },
      {
        title: '操作',
        render: (text, record, index)=>(
          <div>
            <div style={{display: 'inline-block', padding: '0 10px'}}>
              <SButton onClick={this.onAgree.bind(this, record.id)} text='同意'/>
            </div>
            <div style={{display: 'inline-block', padding: '0 10px'}}>
              <SButton onClick={this.onRefuse.bind(this, record.id)} text='拒绝'/>
            </div>
          </div>
      )
      }
    ]
    return <MainContainer name="预约审批">
      <Search {...changeListener}/>
      <Split />
      <Table columns={columns} data={this.state.tableList}></Table>
      <WrappedRefuseModal close={this.closeRefuseModal} {...this.state.refuseModal} />
    </MainContainer>
  }
}

export default ReservationAudit
