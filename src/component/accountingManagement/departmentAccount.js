import React, {Component} from 'react'
import {Form, Select, Row, Col, Button} from 'antd'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'

const Item = Form.Item

class DepartmentAccount extends Component{
  state = {
    year: 0,
    deptName: '',
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return <MainContainer name="核算管理">
      <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
        <Row>
          <Col span={4}>
            <Item labelCol={{span:5}} wrapperCol={{span:18}} label="年份">
              {getFieldDecorator('year',)(
                <Select></Select>
              )}
            </Item>
          </Col>
          <Col offset={1} span={5}>
            <Item labelCol={{span:7}} wrapperCol={{span:16}} label="部门名称">
              {getFieldDecorator('deptName',)(
                <Select></Select>
              )}
            </Item>
          </Col>
          <Col offset={1} span={2}>
            <div style={{marginTop:'5px'}}>
              <Button type='primary'>党政机关核算</Button>
            </div>
          </Col>
          <Col offset={1} span={2}>
            <div style={{marginTop:'5px'}}>
              <Button type='primary'>教学单位核算</Button>
            </div>
          </Col>
          <Col offset={1} span={2}>
            <div style={{marginTop:'5px'}}>
              <Button type='primary'>导出到文件</Button>
            </div>
          </Col>
          <Col offset={1} span={2}>
            <div style={{marginTop:'5px'}}>
              <Button type='primary' block>打印</Button>
            </div>
          </Col>
        </Row>
      </Form>
      <Split />
    </MainContainer>
  }
}
const WrappedDepartmentAccount = Form.create({ name: 'department_account' })(DepartmentAccount);

export default WrappedDepartmentAccount
