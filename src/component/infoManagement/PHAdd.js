import React, {Component} from 'react'
import {Row, Col, Form, Button, message, Empty, Spin} from 'antd'
import MainContainer from '../common/mainContainer'
import UsingNature from '../common/usingNature'
import Split from '../common/split'
import Upload from '../common/upload'
import API from '../../api'
import {ScientificBuilding,
  LogisticsBuilding,
  BusinessBuilding,
  CollegePartyBuilding} from './commonFormItem'
const {Item} = Form


function Title(){
  return (
    <Row>
      <Col>
        <div style={{fontSize:'20px', textAlign:'center'}}>新增公用房</div>
      </Col>
    </Row>
  )
}


class MainForm extends Component{
  state = {
    type: '',
    loading: false,
  }
  setType = (props)=>{
    this.setState({type: props[0]})
    return props
  }
  staging = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
  }
  reset = ()=>{
    this.props.form.resetFields()
    this.setState({type: '1'})
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({loading: true})
        API.addPH(values)
        .then(()=>{
          message.success('添加成功')
        })
        .catch(err=>{
          message.error('添加失败')
          if(err.response){
            message.error(err.response.data.title)
          }
        })
        .finally(()=>{
          this.setState({loading: false})
        })
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    let changeForm = {
      '1':<ScientificBuilding {...this.props}></ScientificBuilding>,
      '2':<LogisticsBuilding {...this.props}></LogisticsBuilding>,
      '3':<BusinessBuilding {...this.props}></BusinessBuilding>,
      '4':<CollegePartyBuilding {...this.props}></CollegePartyBuilding>,
    }
    return (
      <Spin spinning={this.state.loading}>
        <Form onSubmit={this.handleSubmit}>
          <Item labelCol={{span:3}} wrapperCol={{span:8}} label="使用性质">
            {getFieldDecorator('usingNature', {
              getValueFromEvent: this.setType,
              rules:[{required: true, message:'请选择使用性质'}]
            })(
              <UsingNature changeOnSelect={false}></UsingNature>
            )}
          </Item>
          {
            this.state.type?(
              <div>
                {
                  changeForm[this.state.type]
                }
                <Item labelCol={{span:3}} label="房屋照片">
                  {
                    getFieldDecorator('housePic', )(
                      <Upload></Upload>
                    )
                  }
                </Item>
              </div>
            ):(
              <Row>
                <Col offset={6}>
                  <Empty style={{marginBottom: 20}} description="请先选择使用性质"></Empty>
                </Col>
              </Row>
            )
          }
          <Row>
            <Col span={4} offset={10}>
              <Button type='primary' onClick={this.staging}>暂时保存</Button>
            </Col>
            <Col span={4}>
              <Button type='primary' htmlType='submit'>提交审核</Button>
            </Col>
            <Col span={4}>
              <Button type='primary' onClick={this.reset}>重置</Button>
            </Col>
          </Row>
        </Form>
      </Spin>
    )
  }
}

const WrappedMainForm = Form.create({ name: 'main_form' })(MainForm)


class PHAdd extends Component{
  render(){
    return <MainContainer name="公用房新增">
      基本信息/新增公用房
      <Title/>
      <Split/>
      <Row>
        <Col span={15}>
          <WrappedMainForm />
        </Col>
      </Row>
    </MainContainer>
  }
}

export default PHAdd
