import React, {Component} from 'react'
import {Form, Select, Row, Col, Button, message} from 'antd'
import {SButton} from '../common/button'
import API from '../../api'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table from '../common/table'

const Item = Form.Item
const Option = Select.Option

class ScientificPerformance extends Component{
  state = {
    year: 0,
    deptName: '',
    tableList: [],
  }
  search = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        API.searchScientificPerformance(values)
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
        title: '科研单位',
        dataIndex: 'scientificUnit',
      },
      {
        title: '科研工作量',
        dataIndex: 'scientificWorkLoad',
        sorter: (a, b) => a.scientificWorkLoad - b.scientificWorkLoad,
      },
      {
        title: '规范管理分',
        dataIndex: 'specificationPoints',
        sorter: (a, b) => a.specificationPoints - b.specificationPoints,
      },
      {
        title: '公用房面积',
        dataIndex: 'PHArea',
        sorter: (a, b) => a.PHArea - b.PHArea,
      },
      {
        title: '使用效益',
        dataIndex: 'usePerformance',
        sorter: (a, b) => a.usePerformance - b.usePerformance,
      },
      {
        title: '米均效益',
        dataIndex: 'averagePerformance',
        sorter: (a, b) => a.averagePerformance - b.averagePerformance,
      },
      {
        title: '操作',
        render: (text, record, index)=>(
            <div style={{display: 'inline-block', padding: '0 10px'}}>
              <SButton onClick={this.props.delete.bind(this,index)} text='详细'/>
            </div>
        )
      },
    ]
    const { getFieldDecorator } = this.props.form
    return <MainContainer name="效益管理">
      <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
        <Row>
          <Col span={4}>
            <Item labelCol={{span:5}} wrapperCol={{span:18}} label="年份">
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
      <div style={{fontSize: '18px', textAlign: 'center', padding:'20px 0'}}>科研公用房使用效益</div>
      <Table columns={columns} data={this.state.tableList}></Table>
    </MainContainer>
  }
}

const WrappedScientificPerformance = Form.create({ name: 'seientific_performance' })(ScientificPerformance);

export default WrappedScientificPerformance
