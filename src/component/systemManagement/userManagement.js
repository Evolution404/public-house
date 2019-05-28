import React, {Component} from 'react'
import MainContainer from '../common/mainContainer'
import {Input, Form, Row, Col, message, Modal, Checkbox} from 'antd'
import {SButton} from '../common/button'
import Split from '../common/split'
import Table, {sorterParse}from '../common/table'
import {RoleSelect} from '../common/select'
import API from '../../api'
import {read, write} from '../stateHelper'
import {TButton} from '../common/button'
const Item = Form.Item
const confirm = Modal.confirm;

class Search extends Component{
  handleSubmit = (e) => {
    let self = this
   e.preventDefault();
   this.props.form.validateFields((err, values) => {
     if (!err) {
       self.props.onSearch(values)
     }
   })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} style={{marginTop:'50px'}}>
        <Row>
          <Col span={7}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="用户名称">
              {getFieldDecorator('userName',{
                initialValue: this.props.userName,
              })(
                <Input placeholder="请输入用户名称" />
              )}
            </Item>
          </Col>
          <Col offset={1} span={4}>
            <div style={{marginTop:'5px'}}>
              <TButton.SearchButton type='primary' htmlType='submit'>搜索</TButton.SearchButton>
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
      <Row style={{margin: '20px 30px'}}>
        <TButton.AddButton onClick={this.props.onAdd} type="primary">新增</TButton.AddButton>
        <TButton.DelButton disabled={!this.props.selected||this.props.selected.length===0}
              onClick={this.props.onDelete.bind(this, -1)} type="primary">删除</TButton.DelButton>
      </Row>
    )
  }
}

class DisplayTable extends Component{
  render(){
    const columns = [
      {
        title: '用户名称',
        dataIndex: 'userName',
        sorter: true,
      },
      {
        title: '登录账号',
        dataIndex: 'loginAccount',
        sorter: true,
      },
      {
        title: '工号',
        dataIndex: 'workNum',
        sorter: true,
      },
      {
        title: '角色',
        dataIndex: 'role',
        sorter: true,
      },
    ]
    columns.push({
      title: '操作',
      width: 180,
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
     API.addUser(values)
     .then(()=>{
       this.hideModal()
        this.props.refresh()
        message.success('添加成功')
      })
      .catch(err=>{
        if(!err.resolved)
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
        if(!err.resolved)
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
    checkbox: false,
  }
  componentWillMount(){
    read(this)
  }
  componentWillUnmount(){
    write(this)
  }
  setCheckbox = e=>{
    this.setState({checkbox: e.target.checked})
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
     if(!err.resolved)
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
     if(!err.resolved)
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
    this.setState({checkbox: false})
    if(index!==-1)
      index=[index.id]
    else{
      index = this.state.selected.map(i=>i.id)
    }
    let self = this
    confirm({
      title: '删除用户信息',
      content: <div>
                <p>确定要删除用户信息吗?</p>
                <Checkbox onChange={this.setCheckbox}>是否删除关联使用者</Checkbox>
              </div>,
      okText:"确认",
      cancelText:"取消",
      onOk() {
        return API.deleteUser(index, self.state.checkbox)
        .then(()=>{
          message.success('删除成功')
         self.refresh()
       })
       .catch(err=>{
         if(!err.resolved)
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
  tableChange = (p,s)=>{
    this.setState({tableLoading: true, page: p, current: p.current})
    API.searchUser(this.state.userName, p, sorterParse({},s))
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
  render(){
    let tableHelper = {
      delete: this.delete,
      change: this.change,
    }
    return <MainContainer name="用户管理">
      <WrappedSearch userName={this.state.userName} onSearch={this.search}/>
      <Split/>
      <ButtonGroup
        selected={this.state.selected}
        onAdd={this.add} onDelete={this.delete}/>
      <DisplayTable
        current={this.state.current}
        onChange={this.tableChange}
        data={this.state.tableList}
        loading={this.state.tableLoading}
        onSelectedChange={this.selectedChange} {...tableHelper}/>
      <WrappedAddModal refresh={this.refresh} {...this.state.addmodal} close={this.closeAddModal}/>
      {
        this.state.changemodal.visible&&(
          <WrappedChangeModal refresh={this.refresh} {...this.state.changemodal} close={this.closeChangeModal}/>
        )
      }
    </MainContainer>
  }
}

export default UserManagement
