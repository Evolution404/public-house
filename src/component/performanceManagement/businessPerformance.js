import React, {Component} from 'react'
import {Form, Select, Row, Col, Button, message} from 'antd'
import API from '../../api'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table from '../common/table'

const Item = Form.Item
const Option = Select.Option

class BusinessPerformance extends Component{
  state = {
    year: 0,
    deptName: '',
    tableList: [],
    totalArea: 0,
    totalRent: 0,
    avgPerformance: 0,
  }
  search = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        API.searchBusinessPerformance(values)
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
        title: '学院',
        dataIndex: 'college',
      },
      {
        title: '公用房',
        dataIndex: 'PH',
        sorter: (a, b) => a.PH - b.PH,
      },
      {
        title: '面积',
        dataIndex: 'area',
        sorter: (a, b) => a.area - b.area,
      },
      {
        title: '使用者',
        dataIndex: 'user',
        sorter: (a, b) => a.user - b.user,
      },
      {
        title: '租金单价',
        dataIndex: 'rentPrice',
        sorter: (a, b) => a.rentPrice - b.rentPrice,
      },
      {
        title: '年租金',
        dataIndex: 'annualRent',
        sorter: (a, b) => a.annualRent - b.annualRent,
      },
      {
        title: '年份',
        dataIndex: 'year',
        sorter: (a, b) => a.year - b.year,
      },
      {
        title: '米均效益',
        dataIndex: 'averagePerformance',
        sorter: (a, b) => a.averagePerformance - b.averagePerformance,
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
      <div style={{fontSize: '18px', textAlign: 'center', padding:'20px 0'}}>公用房使用效益</div>
      <div style={{display: 'flex',
        fontSize: '15px',
        fontWeight: '500',
        justifyContent: 'space-around'
      }}>
        <span>总面积: {this.state.totalArea}MM</span>
        <span>总租金: {this.state.totalRent}元</span>
        <span>米均效益: {this.state.avgPerformance}元/平米</span>
      </div>
      <Table columns={columns} data={this.state.tableList}></Table>
    </MainContainer>
  }
}

const WrappedBusinessPerformance = Form.create({ name: 'business_performance' })(BusinessPerformance);

export default WrappedBusinessPerformance
