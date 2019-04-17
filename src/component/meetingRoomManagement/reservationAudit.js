import React, {Component} from 'react'
import {Modal, message, notification, Form, Input, Empty} from 'antd';
import {SButton} from '../common/button'
import MainContainer from '../common/mainContainer'
import {ReservationAuditSearch} from '../common/search'
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
        this.props.onRefuse(postData)
        .finally(()=>{
          this.hideModal()
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
            {getFieldDecorator('refuseReason',{
              rules: [{required: true, message: '请输入拒绝原因'}]
            })(
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
    tableList: [],
    isSearched: false,
    tableLoading: false,
    refuseModal: {
      visible: false,
      id: 0,
    },
    filter: {},
  }
  search = (values)=>{
    this.setState({tableLoading: true, isSearched: true, filter: values})
    API.searchReservationAudit(values)
    .then(rs=>{
      this.setState({
        tableList: rs
      })
    })
    .catch(err=>{
      message.error('获取失败, 请重试')
    })
    .finally(()=>{
      this.setState({tableLoading: false})
    })
  }
  refresh = ()=>{
    return API.searchReservationAudit(this.state.filter)
    .then(rs=>{
      this.setState({
        tableList: rs
      })
    })
    .catch(err=>{
      message.error('刷新失败, 请重试')
    })
    .finally(()=>{
      this.setState({tableLoading: false})
    })

  }
  onAgree = id=>{
    API.agreeReservation(id)
    .then(()=>{
      this.refresh()
      notification.success({
        message: '同意成功',
        description: '完成审批,系统已给申请人发送了审批结果通知',
      })
    })
    .catch(err=>{
      message.error('操作失败')
    })
  }
  refuse = (data)=>{
    return API.refuseReservation(data)
    .then(()=>{
      this.refresh()
      notification.success({
        message: '拒绝成功',
        description: '已经将拒绝原因发送给申请人',
      })
    })
    .catch(err=>{
      message.error('拒绝失败')
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
  refresh = (filter)=>{
    this.setState({tableLoading: true})
    API.searchReservationAudit(this.state.filter)
    .then(rs=>{
      this.setState({
        tableList: rs
      })
    })
    .catch(err=>{
      message.error('刷新失败, 请重试')
    })
    .finally(()=>{
      this.setState({tableLoading: false})
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
        title: '预约人',
        dataIndex: 'reservationPerson',
      },
      {
        title: '联系电话',
        dataIndex: 'phone',
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
        title: '拒绝原因',
        dataIndex: 'refuseReason',
      },
      {
        title: '操作',
        render: (text, record, index)=>(
          <div>
            <div style={{display: 'inline-block', padding: '0 10px'}}>
              <SButton disable={record.reservationStatus!=='未审批'}
                onClick={this.onAgree.bind(this, record.id)} text='同意'/>
            </div>
            <div style={{display: 'inline-block', padding: '0 10px'}}>
              <SButton disable={record.reservationStatus!=='未审批'}
                onClick={this.onRefuse.bind(this, record.id)} text='拒绝'/>
            </div>
          </div>
      )
      }
    ]
    return <MainContainer name="预约审批">
      <ReservationAuditSearch onSearch={this.search}/>
      <Split />
      {
        this.state.isSearched?(
          <Table columns={columns} loading={this.state.tableLoading} data={this.state.tableList}></Table>
        ):(
          <Empty description="请先搜索"></Empty>
        )
      }
      <WrappedRefuseModal onRefuse={this.refuse} close={this.closeRefuseModal} {...this.state.refuseModal} />
    </MainContainer>
  }
}

export default ReservationAudit
