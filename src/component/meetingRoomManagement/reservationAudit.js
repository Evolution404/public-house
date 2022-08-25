import React, {Component} from 'react'
import {Modal, message, notification, Form, Input} from 'antd';
import {SButton} from '../common/button'
import MainContainer from '../common/mainContainer'
import {ReservationAuditSearch} from '../common/search'
import Split from '../common/split'
import API from '../../api'
import Table, {TableUtil, sorterParse} from '../common/table'
import {read, write} from '../stateHelper'

const Item = Form.Item

class RefuseModal extends Component {
  hideModal = () => {
    this.props.close()
  }

  // 提交拒绝原因
 submit = ()=>{
   this.props.form.validateFields((err, values) => {
     if (!err) {
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
  componentWillMount(){
    read(this)
  }
  componentWillUnmount(){
    write(this)
  }
  search = (values)=>{
    this.setState({tableLoading: true, isSearched: true, filter: values, current: 1})
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
  tableChange = (p,s)=>{
    this.setState({tableLoading: true, page:p, current: p.current})
    API.searchReservationAudit(sorterParse(this.state.filter,s), p)
    .then(rs=>{
      this.setState({
        tableList: rs,
     })
   })
   .catch(err=>{
     message.error('加载失败')
   })
   .finally(()=>this.setState({tableLoading: false}))
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
      /*{
        title: '房屋部门',
        dataIndex: 'dept',
        sorter: true,
      },*/
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
        title: '预约人',
        dataIndex: 'reservationPerson',
        sorter: true,
      },
      {
        title: '联系电话',
        dataIndex: 'phone',
        sorter: true,
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
      <ReservationAuditSearch
        initialValue={this.state.filter}
        onSearch={this.search}/>
      <Split />
      <Table
        current={this.state.current}
        onChange={this.tableChange}
        columns={columns} loading={this.state.tableLoading} data={this.state.tableList}></Table>
      <WrappedRefuseModal onRefuse={this.refuse} close={this.closeRefuseModal} {...this.state.refuseModal} />
    </MainContainer>
  }
}

export default ReservationAudit
