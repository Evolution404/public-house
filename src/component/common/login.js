import React, {Component} from 'react'
import {
  Form, Icon, Input, Button, Checkbox, message, Spin,
} from 'antd';
import API from '../../api'
import './login.css'

class Login extends Component {
  state = {
    loading: false,
    loginAccount: '',
    password: '',
    remember: false,
  }
  handleRemember = (remember, values)=>{
    if(remember){
      localStorage.setItem('remember', JSON.stringify(values))
    }else{
      localStorage.removeItem('remember')
    }
  }
  handleSubmit = (e) => {
   e.preventDefault();
   this.props.form.validateFields((err, values) => {
     if (!err) {
       this.handleRemember(values.remember, values)
       this.setState({loading: true})
       API.loginCheck(values)    
       .then(rs=>{
          message.success('登录成功')
          this.props.login(rs)
        })
        .catch(err=>{
          if(!err.resolved)
            message.error('登录失败')
        })
        .finally(()=>this.setState({loading: false}))
      }
    })
  }
  componentWillMount(){
    let remember = JSON.parse(localStorage.getItem('remember'))
    if(remember)
      this.setState(remember)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (<div className="login-form-container">
      <Spin spinning={this.state.loading}>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h1 style={{textAlign: 'center'}}>房屋管理系统</h1>
        <Form.Item>
          {getFieldDecorator('loginAccount', {
            initialValue: this.state.loginAccount,
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="登录账号" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            initialValue: this.state.password,
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: this.state.remember,
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          <a onClick={(e)=>{e.preventDefault();message.destroy();message.warning('请联系管理员修改密码!')}} className="login-form-forgot" href='/forget'>忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
      </Spin>
    </div>)
  }
}

const WrappedLogin = Form.create({ name: 'login' })(Login);
export default WrappedLogin
