import React, {Component} from 'react'
import MainContainer from '../common/mainContainer'
import API from '../../api'
import {Input, Form, Row, Col, Button, message, Spin} from 'antd'
const Item = Form.Item

class MainForm extends Component{
  state = {
    paramsList: [],
    loading: false,
  }
  componentWillMount(){
    this.setState({loading: true})
    API.getAllParams()
    .then(rs=>{
      this.setState({paramsList: rs})      
    })
    .catch(err=>{
      if(!err.response)
        message.error("加载参数信息失败")
    })
    .finally(()=>this.setState({loading: false}))
  }
  submit= id=>{
    this.props.form.validateFields((err, values)=>{
      this.setState({loading: true})
      API.setParmValue(id, values[id])
      .then((rs)=>{
        message.success('更新'+rs.canshumingcheng+'成功')
      })
      .catch(err=>{
        if(!err.response)
          message.error("更新参数值失败")
      })
      .finally(()=>this.setState({loading: false}))
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Spin spinning={this.state.loading}>
      <Form labelAlign='left'
        labelCol={{span:12}} wrapperCol={{span:12}}>
        {
          this.state.paramsList.map(i=>(
              <Row key={i.id}>
                <Col span={10}>
                  <Item label={i.canshumingcheng}>
                    {getFieldDecorator(i.id+'',{
                      initialValue: i.canshuzhi,
                    })(
                      <Input></Input>
                    )}
                  </Item>
                </Col>
                <Col offset={2} span={2}>
                  <Button style={{marginTop: '5px'}}
                    onClick={this.submit.bind(this, i.id)}
                    type="primary">确定</Button>
                </Col>
              </Row>

          ))
        }
      </Form>
      </Spin>
    )
  }
}
const WrappedForm = Form.create({ name: 'mainform' })(MainForm)

class SystemParm extends Component{
  render(){
    return <MainContainer name="参数管理">
      <WrappedForm/>
    </MainContainer>
  }
}


export default SystemParm
