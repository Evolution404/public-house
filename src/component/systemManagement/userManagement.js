import React, {Component} from 'react'
import MainContainer from '../common/mainContainer'
import {Input, Empty, Button,Form, Row, Col, message, Modal} from 'antd'
import {SButton} from '../common/button'
import Split from '../common/split'
import Table, {TableUtil}from '../common/table'
import {RoleSelect} from '../common/select'
import API from '../../api'
const Item = Form.Item
const confirm = Modal.confirm;

class Search extends Component{
  handleSubmit = (e) => {
    let self = this
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        self.props.onSearch(values)
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
        <Row>
          <Col span={7}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="用户名称">
              {getFieldDecorator('userName',)(
                <Input/>
              )}
            </Item>
          </Col>
          <Col offset={1} span={4}>
            <div style={{marginTop:'5px'}}>
              <Button type='primary' htmlType='submit'>搜索</Button>
            </div>
          </Col>
        </Row>
      </Form>
    )
  }
}
const WrappedSearch = Form.create({ name: 'search' })(Search)

class ButtonGroup extends Component{
  render(){
    return (
      <Row style={{margin: '20px 0'}}>
        <Col span={13}>
          <Col offset={1} span={4}><Button block onClick={this.props.onAdd} type="primary">+新增</Button></Col>
          <Col offset={1} span={4}><Button block onClick={this.props.onDelete.bind(this, -1)} type="primary">X删除</Button></Col>
        </Col>
      </Row>
    )
  }
}

class DisplayTable extends Component{
  render(){
    const columns = TableUtil.mapColumns([
      '用户名称', '登录账号', '工号', '角色'
    ])
    columns.push({
      title: '操作',
      render: (text, record, index)=>(
        <div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton onClick={this.props.delete.bind(this,record)} text='X删除'/>
          </div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton onClick={this.props.change.bind(this,record)} text='修改'/>
          </div>
        </div>
      )

    })
    return <Table columns={columns} {...this.props}/>
  }
}

class AddModal extends Component {
  state = {
    confirmDirty: false,
  }
  hideModal = () => {
    this.props.close()
  }
  add = ()=>{
    const form = this.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      console.log('Received values of form: ', values)
      API.addUser(values)
      .then(()=>{
        this.hideModal()
        this.props.refresh()
        message.success('添加成功')
      })
      .catch(err=>{
        if(err.response)
          message.error(err.response.data.title)
        else
          message.error('添加失败')
      })
    })
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        title="新增用户"
        width="500px"
        visible={this.props.visible}
        closable={false}
        onOk={this.add}
        onCancel={this.hideModal}
        okText="确定"
        cancelText="取消"
      >
        <Form labelCol={{span:8}} wrapperCol={{span:16}} labelAlign='left'>
          <Item style={{marginBottom: '0px'}} label='登录账号'>
            {getFieldDecorator('loginAccount',{
              rules:[
                {required: true, message: '请输入你的登录账号'}
              ]
            })(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='用户名称'>
            {getFieldDecorator('userName',{
              rules:[
                {required: true, message: '请输入用户名称'}
              ]
            })(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='密码'>
            {getFieldDecorator('password',{
              rules: [{
                required: true, message: '请输入你的密码',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type='password'/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='确认密码'>
            {getFieldDecorator('confirm',{
              rules: [{
                required: true, message: '请确认你的密码',
              }, {
                validator: this.compareToFirstPassword,
              }],

            })(
              <Input type='password'  onBlur={this.handleConfirmBlur}/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='工号'>
            {getFieldDecorator('workNum', {
              rules: [{required: true, message: '请输入工号'}]
            })(
              <Input></Input>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='角色'>
            {getFieldDecorator('role', {
              rules: [{required: true, message: '请选择角色'}]
            })(
              <RoleSelect></RoleSelect>
            )}
          </Item>
        </Form>
      </Modal>
    )
  }
}
const WrappedAddModal = Form.create({ name: 'addmodal' })(AddModal)


class ChangeModal extends Component {
  hideModal = () => {
    this.props.close()
  }
  change = ()=>{
    const form = this.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      console.log('Received values of form: ', values)
      let newData = {
        id: this.props.id,
        // other data
        ...this.props.data,
        ...values,
      }
      API.changeUser(newData)
      .then(()=>{
        this.props.refresh()
        this.hideModal()
        message.success('更新成功')
        form.resetFields()
      })
      .catch(err=>{
        if(err.response)
          message.error(err.response.data.title)
        else
          message.error('更新失败')
      })
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    let data = this.props.data
    return (
      <Modal
        title="修改人员"
        width="500px"
        visible={this.props.visible}
        closable={false}
        onOk={this.change}
        onCancel={this.hideModal}
        okText="确定"
        cancelText="取消"
      >
        <Form labelCol={{span:8}} wrapperCol={{span:16}} labelAlign='left'>
          <Item style={{marginBottom: '0px'}} label='登录账号'>
            {getFieldDecorator('loginAccount',{
              rules: [{required: true, message: '请输入登录账号'}],
              initialValue: data.loginAccount})(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='用户名称'>
            {getFieldDecorator('userName', {
              rules: [{required: true, message: '请输入用户名称'}],
              initialValue: data.userName})(
              <Input/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='工号'>
            {getFieldDecorator('workNum', {
              rules: [{required: true, message: '请输入工号'}],
              initialValue: data.workNum})(
              <Input></Input>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='角色'>
            {getFieldDecorator('role', {
              rules: [{required: true, message: '请选择角色'}],
              initialValue: data.role})(
              <RoleSelect></RoleSelect>
            )}
          </Item>
        </Form>
      </Modal>
    )
  }
}
const WrappedChangeModal = Form.create({ name: 'changemodal' })(ChangeModal)


class UserManagement extends Component{
  state = {
    isSearched: false,
    tableLoading: false,
    userName: '',
    tableList: [],
    selected: [],
    addmodal: {
      visible: false,
    },
    changemodal: {
      visible: false,
      id: 0,
      data: {},
    },
    current: 0,
  }
  add = ()=>{
    this.setState({addmodal: {visible: true}})
  }
  search = ({userName})=>{
    this.setState({
      userName,
      isSearched: true,
      current: 1,
    })
    this.setState({tableLoading: true})
    API.searchUser(userName)
    .then(rs=>{
      this.setState({
        tableList: rs,
      })
    })
    .catch(err=>{
      console.log(err)
      message.error('搜索失败')
    })
    .finally(()=>{
      this.setState({tableLoading: false})
    })
  }
  refresh = ()=>{
    this.setState({tableLoading: true}, this.state.page)
    API.searchUser(this.state.userName)
    .then(rs=>{
      this.setState({
        tableList: rs,
      })
    })
    .catch(err=>{
      console.log(err)
      message.error('刷新失败')
    })
    .finally(()=>{
      this.setState({tableLoading: false})
    })
  }
  selectedChange = (newSelected)=>{
    this.setState({
      selected: newSelected
    })
  }
  // 删除条目处理函数
  delete = (index)=>{
    if(index!==-1)
      index=[index.id]
    else{
      index = this.state.selected.map(i=>i.id)
    }
    let self = this
    confirm({
      title: '删除人员信息',
      content: '删除操作会造成人员信息丢失，您确定要删除人员信息吗？',
      okText:"确认",
      cancelText:"取消",
      onOk() {
        return API.deleteUser(index)
        .then(()=>{
          message.success('删除成功')
          self.refresh()
        })
        .catch(err=>{
          console.log(err)
          message.error('删除失败')
        })
      },
      onCancel() {},
    });
  }
  change = record=>{
    this.setState({changemodal: {visible: true, id:record.id,
                  data:record}})
  }
  closeAddModal = ()=>{
    this.setState({addmodal: {visible: false}})
  }
  closeChangeModal = ()=>{
    this.setState({changemodal: {visible: false, id:0, data:{}}})
  }
  tableChange = (p)=>{
    this.setState({tableLoading: true, page: p, current: p.current})
    API.searchUser(this.state.userName, p)
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
    let tableHelper = {
      delete: this.delete,
      change: this.change,
    }
    return <MainContainer name="用户管理">
      <WrappedSearch onSearch={this.search}/>
      <Split/>
      <ButtonGroup onAdd={this.add} onDelete={this.delete}/>
      <Row>
        <Col span={20}>
          {this.state.isSearched?(
            <DisplayTable
              current={this.state.current}
              onChange={this.tableChange}
              data={this.state.tableList}
              loading={this.state.tableLoading}
              onSelectedChange={this.selectedChange} {...tableHelper}/>
          ):(
            <Empty description="请先搜索"></Empty>
          )}
        </Col>
      </Row>
      <WrappedAddModal refresh={this.refresh} {...this.state.addmodal} close={this.closeAddModal}/>
      <WrappedChangeModal refresh={this.refresh} {...this.state.changemodal} close={this.closeChangeModal}/>
    </MainContainer>
  }
}

export default UserManagement
