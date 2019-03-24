import React, {Component} from 'react'
import {Form, Select, Row, Col, Button} from 'antd'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table from '../common/table'
import {SButton} from '../common/button'
const Item = Form.Item
const Option = Select.Option

class AcademyHouseTable extends Component{
  render(){
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '部门',
        dataIndex: 'dept',
      },
      {
        title: '定额面积(DE)',
          children: [
            {
              title: '办公用房(BG)',
              dataIndex: 'BG',
            },
            {
              title: '办公用房(GY)',
              dataIndex: 'GY',
            },
            {
              title: '实验实习用房(SS)',
              dataIndex: 'SS',
            },
            {
              title: '超大设备用房补贴(CB)',
              dataIndex: 'CB',
            },
            {
              title: '重点实验室用房补贴(ZB)',
              dataIndex: 'ZB',
            },
            {
              title: '调节用房(TJ)',
              dataIndex: 'TJ',
            },
          ]
      },
      {
        title: '实际面积',
        dataIndex: 'realArea',
      },
      {
        title: '超额面积',
        dataIndex: 'excessArea',
      },
      {
        title: '操作',
        render: (text)=>{
          return <SButton text="详细"/>
        }
      }
    ]
    return (
      <div>
        <Row>
          <Col offset={1} span={10}>学院用房</Col>
          <Col style={{textAlign: 'right'}} span={12}>单位:平米</Col>
        </Row>
        <Table columns={columns} {...this.props}/>
      </div>
    )
  }
}

class PartyHouseTable extends Component{
  render(){
    const columns = [
      {
        title: '序号',
        dataIndex: 'id'
      },
      {
        title: '部门名称',
        dataIndex: 'deptName'
      },
      {
        title: '定额面积',
        dataIndex: 'fixedArea'
      },
      {
        title: '实际面积',
        dataIndex: 'realArea'
      },
      {
        title: '超额面积',
        dataIndex: 'excessArea'
      },
      {
        title: '操作',
        render: (text)=>{
          return <SButton text="详细"/>
        }
      },
    ]
    return (
      <div>
        <Row>
          <Col offset={1} span={10}>党政机关用房</Col>
          <Col style={{textAlign: 'right'}} span={12}>单位:平米</Col>
        </Row>
        <Table columns={columns} {...this.props}/>
      </div>
    )
  }
}

class OverallAccount extends Component{
  constructor(props){
    super(props)
    this.state = {
      year: '',
    }
  }
  handleYearChange = (e)=>{
    this.setState({
      year: e.target.value
    })
  }
  render(){
    let testPartyData = [{
      id:1,
      deptName:1,
      fixedArea:1,
      realArea:1,
      excessArea:1,
    }]
    return <MainContainer name="核算结果">
      <Item labelCol={{span:2}} wrapperCol={{span:4}} label='年份'>
        <Select onChange={this.handleYearChange} defaultValue="0">
          <Option value="0">--请选择年份--</Option>
        </Select>
      </Item>
      <Row>
        <Col span={12} style={{fontSize: '20px', textAlign: 'right'}}>
          全校公用房使用总体情况
        </Col>
        <Col offset={2} span={10}>
          <Button type='primary'>导出到文件</Button>
          <Button style={{marginLeft: '20px'}} type='primary'>打印</Button>
        </Col>
      </Row>      
      <Split/>
      <Row>
        <Col span={20} offset={1}>
          <PartyHouseTable data={testPartyData}/>
        </Col>
      </Row>
      <Row>
        <Col span={20} offset={1}>
          <AcademyHouseTable data={[{id:1}]}/>
        </Col>
      </Row>
    </MainContainer>
  }
}

export default OverallAccount
