import React, {Component} from 'react'
import { Modal, message ,Form, Input, Avatar} from 'antd'
import css from '../../cssConfig.js'
import API from '../../api'
import headerPic from './images/header.png'
import changePw from './images/changepw.png'
import exit from './images/exit.png'
import {createHashHistory} from 'history'
const history = createHashHistory()

const confirm = Modal.confirm
const Item = Form.Item

const commonFontStyle=css.commonFontStyle
function Welcome(props){
  return <span style={{...commonFontStyle, padding:"10px"}}>欢迎: <Avatar style={{
    width: 30, height: 30, lineHeight:'30px', margin: '0 5px',
    backgroundColor: '#efbe65'
    }} icon="user" />{props.name}</span>
}

class ChangePwModal extends Component {
  state = {
    confirmDirty: false,
  }
  hideModal = () => {
    this.props.close()
  }
  changePW = ()=>{
    const form = this.props.form
    form.validateFields((err, values) => {
     if (err) {
       return
     }
     let loginAccount = this.props.getPersistentData().userData.loginAccount
     values.loginAccount = loginAccount
     API.changePW(values)
      .then(()=>{
        this.hideModal()
        message.success('密码修改成功')
        // 清除数据, 返回登录界面
        this.props.clear()
      })
      .catch(err=>{
        if(!err.response)
          message.error('修改失败')
      })
    })
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
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
        title="修改密码"
        width="500px"
        visible={this.props.visible}
        closable={false}
        onOk={this.changePW}
        onCancel={this.hideModal}
        okText="确定"
        cancelText="取消"
      >
        <Form labelCol={{span:8}} wrapperCol={{span:16}} labelAlign='left'>
          <Item style={{marginBottom: '0px'}}  label='旧密码'>
            {getFieldDecorator('oldPassword',{
              rules: [{
                required: true, message: '请输入你的旧密码',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type='password'/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='新密码'>
            {getFieldDecorator('newPassword',{
              rules: [{
                required: true, message: '请输入你的新密码',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type='password'/>
            )}
          </Item>
          <Item style={{marginBottom: '0px'}}  label='确认新密码'>
            {getFieldDecorator('confirm',{
              rules: [{
                required: true, message: '请确认你的新密码',
              }, {
                validator: this.compareToFirstPassword,
              }],

            })(
              <Input type='password'  onBlur={this.handleConfirmBlur}/>
            )}
          </Item>
        </Form>
      </Modal>
    )
  }
}
const WrappedChangePwModal = Form.create({ name: 'changePWmodal' })(ChangePwModal)

class ChangePW extends Component{
  state = {
    modalVisible: false,
  }
  showModal = ()=>{
    this.setState({modalVisible: true})
  }
  closeModal = ()=>{
    this.setState({modalVisible: false})
  }
  render(){
    return (
    <div style={{display: 'inline'}}>
      <span
        onClick={this.showModal}
        style={{...commonFontStyle,
          cursor: 'pointer', padding:"10px"}}>
          <img src={changePw} style={{width: 30, height: 30}} alt=""/>
          修改密码</span>

        <WrappedChangePwModal
          {...this.props}
          visible={this.state.modalVisible} close={this.closeModal}/>
    </div>
    )
  }
}
class Exit extends Component{
  exit = ()=>{
    let self = this
    confirm({
      title: '确定要退出登录吗?',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        API.logout()
        .finally(()=>{
          self.props.clear()
          history.push('/')
        })
      },
      onCancel() {
      },
    })
  }
  render(){
    return <span onClick={this.exit} style={{...commonFontStyle, cursor: 'pointer',padding:"10px"}}>
      <img style={{width: 30, height: 30, marginRight: 5}} src={exit} alt=""/>
    退出登录</span>
  }
}
class RightInfo extends Component{
  constructor(props){
    super(props)
    this.state = {name: props.name}
  }
  render(){
    return (
      <div>
        <Welcome name={this.state.name}/>
        <ChangePW {...this.props}/>
        <Exit {...this.props}/>
      </div>
    )
  }
}
class Header extends Component{
  constructor(props){
    super(props)
    this.state = {name: props.name}
  }
  render(){
    let styleDiv = {
      backgroundColor: '#5a9dd0',
      height: "76px",
      border: '1px solid #40bdf7',
    }
    let fontStyle = {
      fontSize: "23px",
      fontWeight: 700,
      color: "white",
      position: "absolute",
      left: "280px",
      top: "25px",
    }
    let rightStyle = {
      position: "absolute",
      right: "100px",
      top: "33px",
    }
    return (
      <div style={{...styleDiv,
      }}>
        <img style={{height: "47px", 
          marginTop: "15px",
          marginLeft: 10,
        }} src={headerPic} alt="" />
        <span style={fontStyle}>学校公用房管理系统</span>
        <div style={rightStyle}>
          <RightInfo {...this.props} name={this.state.name}/>
        </div>
      </div>
    )
  }
}

export default Header
