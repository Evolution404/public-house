import React, {Component} from 'react'
import {Form, Select, Row, Col, Button} from 'antd'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table from '../common/table'
import {SButton} from '../common/button'
import ECharts from '../common/echarts'
import Histogram from '../common/histogram'

const Item = Form.Item
const Option = Select.Option
// data = [
//  {
//    name: xx,
//    value: xx,
//  },
// ]
class DeptContrast1 extends Component {
  render(){
    let option = {
      title: {
        text: '部门情况对比1（各部门实际公用房使用面积对比图表）',
        textStyle: {
          fontSize: 15,
        },
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
      },
      series : [
          {
              name: '部门',
              type: 'pie',
              radius : '55%',
              center: ['40%', '50%'],
              data: this.props.data,
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
    }
    return <ECharts id="DeptContrast1" option={option}></ECharts>
  }
}


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
  state = {
    year: '',
    isPrinting: false,
    printData: {},
    DeptContrast1: [
      {
        name: '1',
        value: 0.1,
      },
      {
        name: '2',
        value: 0.2,
      },
      {
        name: '3',
        value: 0.3,
      },
    ],
    DeptContrast2: {
      '类别1': {
          '项目1':100,
          '项目2':200,
      },
      '类别2': {
          '项目1':100,
          '项目2':200,
      },
      '类别3': {
          '项目1':100,
          '项目2':200,
      },
      '类别4': {
          '项目1':100,
          '项目2':200,
      },
      '类别5': {
          '项目1':100,
          '项目2':200,
      },
    },
    DeptContrast3: {
      '类别1': {
          '项目1':100,
          '项目2':200,
      },
      '类别2': {
          '项目1':100,
          '项目2':200,
      },
      '类别3': {
          '项目1':100,
          '项目2':200,
      },
      '类别4': {
          '项目1':100,
          '项目2':200,
      },
      '类别5': {
          '项目1':100,
          '项目2':200,
      },
    },
    CollegeContrast4: {
      '类别1': {
          '项目1':100,
          '项目2':200,
      },
      '类别2': {
          '项目1':100,
          '项目2':200,
      },
      '类别3': {
          '项目1':100,
          '项目2':200,
      },
      '类别4': {
          '项目1':100,
          '项目2':200,
      },
      '类别5': {
          '项目1':100,
          '项目2':200,
      },
    },
  }
  handleYearChange = (e)=>{
    this.setState({
      year: e.target.value
    })
  }
  getCanvasURL = (id)=>{
    return document.querySelector(`#${id} canvas`).toDataURL()
  }
  print = ()=>{
    let printData = {
      DeptContrast1: this.getCanvasURL('DeptContrast1'),
      DeptContrast2: this.getCanvasURL('DeptContrast2'),
      DeptContrast3: this.getCanvasURL('DeptContrast3'),
      CollegeContrast4: this.getCanvasURL('CollegeContrast4'),
    }
    this.setState({isPrinting: true, printData}, ()=>{
      // 直接执行有可能图片没有加载完成
      // 使用一个interval直到找到图片才开始打印
      let interval = setInterval(()=>{
        if(document.querySelectorAll('#printArea img').length>3){
          clearInterval(interval)
          window.document.body.innerHTML =
            window.document.getElementById('printArea').innerHTML
          window.print()
          window.location.reload()
        }
      }, 100)
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
    let imgStyle = {
      width: 300,
    }
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
          <Button
            onClick={this.print}
            style={{marginLeft: '20px'}} type='primary'>打印</Button>
        </Col>
      </Row>      
      <Split/>
      <div id="printArea">
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
        <Row>
          <Col span={12}>
            {
              !this.state.isPrinting&&(
                <DeptContrast1 data={this.state.DeptContrast1}></DeptContrast1>
              )
            }
            {this.state.isPrinting&&(
              <img style={imgStyle} src={this.state.printData.DeptContrast1} alt=""/>
            )}
          </Col>
          <Col span={12}>
            {
              !this.state.isPrinting&&(
                <Histogram id="DeptContrast2"
                  title="部门情况对比2（各学院实际总面积、人均使用面积对比图表）"
                  data={this.state.DeptContrast2}></Histogram>
              )
            }
            {this.state.isPrinting&&(
              <img style={imgStyle} src={this.state.printData.DeptContrast2} alt=""/>
            )}
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            {
              !this.state.isPrinting&&(
                <Histogram id="DeptContrast3"
                  title="部门情况对比3（各部门公用房额定面积、实际使用面积对比图表）"
                  data={this.state.DeptContrast3}></Histogram>
              )
            }
            {this.state.isPrinting&&(
              <img style={imgStyle} src={this.state.printData.DeptContrast3} alt=""/>
            )}
          </Col>
          <Col span={12}>
            {
              !this.state.isPrinting&&(
                <Histogram id="CollegeContrast4"
                  title="学院情况对比4（各学院分项实际使用面积对比图表）"
                  data={this.state.CollegeContrast4}></Histogram>
              )
            }
            {this.state.isPrinting&&(
              <img style={imgStyle} src={this.state.printData.CollegeContrast4} alt=""/>
            )}
          </Col>
        </Row>
      </div>
    </MainContainer>
  }
}

export default OverallAccount
