import React, {Component} from 'react'
import {Form, Select, Row, Col, Button, message} from 'antd'
import API from '../../api'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table from '../common/table'

const Item = Form.Item
const Option = Select.Option

class ClassroomPerformance extends Component{
  state = {
    year: 0,
    deptName: '',
    tableList: [],
    totalSchool: 0,
  }
  search = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        API.searchClassroomPerformance(values)
        .then(rs=>{
          this.setState({tableList: rs})
        })
        .catch(err=>{
          message.error('搜索失败')
        })
        console.log('Received values of form: ', values);
      }
    })
  }
  render(){
    let columns = [
      {
        title: '序号',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: '部门',
        dataIndex: 'dept',
      },
      {
        title: '教室',
        dataIndex: 'lab',
        sorter: (a, b) => a.lab - b.lab,
      },
      {
        title: '课程名',
        dataIndex: 'courseName',
        sorter: (a, b) => a.courseName - b.courseName,
      },
      {
        title: '学时数',
        dataIndex: 'schoolNum',
        sorter: (a, b) => a.schoolNum - b.schoolNum,
      },
    ]
    const { getFieldDecorator } = this.props.form
    return <MainContainer name="效益管理">
      <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
        <Row>
          <Col span={3}>
            <Item labelCol={{span:8}} wrapperCol={{span:15}} label="年份">
              {getFieldDecorator('year',)(
                <Select>
                  <Option value="2019">2019</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col offset={1} span={5}>
            <Item labelCol={{span:7}} wrapperCol={{span:16}} label="部门名称">
              {getFieldDecorator('deptName',)(
                <Select>
                  <Option value="部门1">部门1</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col offset={1} span={4}>
            <Item labelCol={{span:7}} wrapperCol={{span:16}} label="教室">
              {getFieldDecorator('deptName',)(
                <Select>
                  <Option value="教室1">教室1</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col offset={1} span={2}>
            <div style={{marginTop:'5px'}}>
              <Button block type='primary' onClick={this.search}>搜索</Button>
            </div>
          </Col>
          <Col offset={1} span={2}>
            <div style={{marginTop:'5px'}}>
              <Button type='primary'>导出到文件</Button>
            </div>
          </Col>
          <Col offset={1} span={2}>
            <div style={{marginTop:'5px'}}>
              <Button block type='primary'>打印</Button>
            </div>
          </Col>
        </Row>
      </Form>
      <Split/>
      <div style={{fontSize: '18px', textAlign: 'center', padding:'20px 0'}}>教室使用效益</div>
      <Row>
        <Col offset={1}>
          <p style={{fontSize: '17px'}}>总学时数: {this.state.totalSchool}</p>
        </Col>
      </Row>
      <Table columns={columns} data={this.state.tableList}></Table>
    </MainContainer>
  }
}

const WrappedClassroomPerformance = Form.create({ name: 'classroom_performance' })(ClassroomPerformance);

export default WrappedClassroomPerformance
