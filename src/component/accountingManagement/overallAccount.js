import React, {Component} from 'react'
import ECharts from '../common/echarts'
import {
  HashRouter as Router,
  Link
} from "react-router-dom"
import {Form, Row, Col, Spin, message, Empty} from 'antd'
import MainContainer from '../common/mainContainer'
import {YearSelect} from '../common/select'
import Split from '../common/split'
import Table, {sorterParse} from '../common/table'
import {SButton} from '../common/button'
import Histogram from '../common/histogram'
import PieChart from '../common/pieChart'
import API, {wrapper} from '../../api'
import Map from '../../routerMap'
import {read, write} from '../stateHelper'
import {TButton} from '../common/button'
import download from '../common/download'

const Item = Form.Item
class DeptContrast1 extends Component {
  render(){
    let data = [
      {name: '材料科学与工程学院', value: 5005.27},
      {name: '船舶与海洋工程学院', value: 10977.79},
      {name: '海洋科学与技术学院', value: 4722.95},
      {name: '计算机科学与技术学院', value: 4088.35},
      {name: '经济管理学院', value: 1437.50},
      {name: '汽车工程学院', value: 5387.01},
      {name: '土木工程系', value: 2427.54},
      {name: '新能源学院', value: 1508.72},
      {name: '信息科学与工程学院', value: 6255.02},
      {name: '语言文学学院', value: 1672.96},
      {name: '理学院', value: 4422.53},
    ]
    return <PieChart id="DeptContrast1"
      title="各学院总面积占比扇形图"
      data={data}
      desc="部门"
      ></PieChart>
  }
}

class Reservation extends Component{
  render(){
    return (
        <ECharts id="reservation" option={{
      title: {
        text: '上周房屋预约统计',
        textStyle: {
          fontSize: 15,
        },
      },
          tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:['预约成功', '预约失败', '总预约数']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'value'
        }
    ],
    yAxis : [
        {
            type : 'category',
            axisTick : {show: false},
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    series : [
        {
            name:'预约成功',
            type:'bar',
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
            data:[20, 17, 24, 24, 20, 22, 21]
        },
        {
            name:'总预约数',
            type:'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true
                }
            },
            data:[32, 30, 34, 37, 39, 45, 42]
        },
        {
            name:'预约失败',
            type:'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'left'
                }
            },
            data:[-12, -13, -10, -13, -19, -23, -21]
        }
    ]
        }}></ECharts>
      
    )
  }
}

class TotalArea extends Component{
  render(){
    return (
        <ECharts id="TotalArea" option={{
          title: {
            text: '系统房屋总面积走势图',
            textStyle: {
              fontSize: 15,
            },
          },
          xAxis: {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [22301, 23103, 25432, 27430, 28190, 29111, 30721],
              type: 'line',
              smooth: true
          }]
        }}></ECharts>
      
    )
  }
}
class TotalNumberOfPeopel extends Component{
  render(){
    return (
        <ECharts id="TotalNumberOfPeopel" option={{
          title: {
        text: '各学院总人数走势图',
        y:70,
        left: 70,
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['材料科学与工程学院','船舶与海洋工程学院','海洋科学与技术学院','计算机科学与技术学院','经济管理学院', '汽车工程学院', '土木工程系', '新能源学院', '信息科学与工程学院', '语言文学学院', '理学院']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2013','2014','2015','2016','2017','2018','2019']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'材料科学与工程学院',
            type:'line',
            stack: '总人数',
            data:[900, 1100, 800, 1000, 1211, 999, 1000]
        },
        {
            name:'船舶与海洋工程学院',
            type:'line',
            stack: '总人数',
            data:[1200, 1300, 1200, 1100, 990, 1400, 1500]
        },
        {
            name:'海洋科学与技术学院',
            type:'line',
            stack: '总人数',
            data:[500, 600, 800, 400, 531, 501, 600]
        },
        {
            name:'计算机科学与技术学院',
            type:'line',
            stack: '总人数',
            data:[1300, 1200, 1411, 1211, 1311, 999, 1511]
        },
        {
            name:'经济管理学院',
            type:'line',
            stack: '总人数',
            data:[1221, 1111, 999, 1211, 888, 1011, 1231]
        },
        {
            name:'汽车工程学院',
            type:'line',
            stack: '总人数',
            data:[1174, 1072, 843, 918, 1021, 1199, 1174]
        },
        {
            name:'土木工程系',
            type:'line',
            stack: '总人数',
            data:[555, 666, 421, 513, 540, 444, 540]
        },
        {
            name:'新能源学院',
            type:'line',
            stack: '总人数',
            data:[0, 0, 0, 0, 0, 0, 641]
        },
        {
            name:'信息科学与工程学院',
            type:'line',
            stack: '总人数',
            data:[2222, 2344, 2400, 2533, 2677, 2400, 2500]
        },
        {
            name:'语言文学学院',
            type:'line',
            stack: '总人数',
            data:[222, 232, 333, 432, 301, 311, 333]
        },
        {
            name:'理学院',
            type:'line',
            stack: '总人数',
            data:[820, 643, 666, 510, 777, 401, 639]
        },
    ]
        }}></ECharts>
      
    )
  }
}



class AcademyHouseTable extends Component{
  render(){
    const columns = [
      {
        title: '部门',
        dataIndex: 'bumen',
      },
      {
        title: '规划面积',
          children: [
            {
              title: '宿舍面积',
              dataIndex: 'bangongyongfang_de',
            },
            {
              title: '教室面积',
              dataIndex: 'gongyongyongfang_de',
            },
            {
              title: '实验室面积',
              dataIndex: 'shiyanshixiyongfang_de',
            },
            /*{
              title: '超大设备用房补贴(CB)',
              dataIndex: 'chaodashebeiyongfangbutie_de',
            },
            {
              title: '重点实验室用房补贴(ZB)',
              dataIndex: 'zhongdianshiyanshiyongfangbutie_de',
            },
            {
              title: '调节用房(TJ)',
              dataIndex: 'tiaojieyongfang_de',
            },*/
          ]
      },
      {
        title: '总可用面积',
        dataIndex: 'shijiheji',
        sorter: true,
      },
      /*{
        title: '超额面积',
        dataIndex: 'mianji_ce',
        sorter: true,
      },*/
      {
        title: '操作',
        render: (text, record)=>{
          return <Router>
            <Link to={Map.DepartmentAccount.path.replace(':id', '2-'+record.id)}>
              <SButton text="详细"/>
            </Link>
          </Router>
        }
      }
    ]
    return (
      <div>
        <Row style={{fontSize: 16}}>
          <Col offset={1} span={10}>学生用房使用统计</Col>
          <Col style={{textAlign: 'right'}} span={12}>部门:平米</Col>
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
        title: '部门名称',
        dataIndex: 'bumen',
        sorter: true,
      },
      {
        title: '已分配面积',
        dataIndex: 'dingemianji',
        sorter: true,
      },
      {
        title: '实际可用面积',
        dataIndex: 'shijimianji',
        sorter: true,
      },
      {
        title: '面积系数差额',
        dataIndex: 'mianji_ce',
        sorter: true,
      },
      {
        title: '操作',
        render: (text, record)=>{
          return <Router>
            <Link to={Map.DepartmentAccount.path.replace(':id', '1-'+record.id)}>
              <SButton text="详细"/>
            </Link>
          </Router>
        }
      },
    ]
    return (
      <div>
        <Row style={{fontSize: 16}}>
          <Col offset={1} span={10}>教师用房使用统计</Col>
          <Col style={{textAlign: 'right'}} span={12}>部门:平米</Col>
        </Row>
        <Table columns={columns} {...this.props}/>
      </div>
    )
  }
}

class OverallAccount extends Component{
  state = {
    partyHouseTableList: [],
    academyHouseTableList: [],
    loading: false,
    tip: '',
    year: '',
    isPrinting: false,
    printData: {},
    DeptContrast1: [],
    DeptContrast2: {},
    DeptContrast3: {},
    CollegeContrast4: {},
  }
  componentWillMount(){
    read(this)
  }
  componentWillUnmount(){
    write(this)
  }
  setInitState = ()=>{
    this.setState({loading: false, year: '',
                  DeptContrast1: [], DeptContrast2: {}, DeptContrast3: [], CollegeContrast4: {}})
  }
  account = ()=>{
    this.props.form.validateFields(async (formerr, values)=>{
      if(formerr)
        return
      values.year='2019'
      let year = values.year
      this.setState({
        year,
      })
      // 先核算信息
      this.setState({loading: true, tip: '计算核算信息中...'})
      let [err] = await wrapper(API.accountingData(year))
      if(err){
        if(!err.resolved)
          message.error('核算信息失败')
        this.setInitState()
        return
      }
      this.setState({tip: '加载核算信息中...'})
      let [geterr, data] = await wrapper(API.getAccountingData(year))
      if(geterr){
        this.setState({loading: false, year: '',
                      DeptContrast1: [], DeptContrast2: {}, DeptContrast3: [], CollegeContrast4: {}})
        if(!geterr.response)
          message.error('加载核算信息失败')
        this.setInitState()
        return
      }
      // 处理data
      this.setState({partyHouseTableList: data[0].datalist,
                    DeptContrast1: data[0].bingtu,
                    DeptContrast3: data[0].zhuzhuangtu,
                    academyHouseTableList: data[1].datalist,
                    DeptContrast2: data[1].zhuzhuangtu[0],
                    CollegeContrast4: data[1].zhuzhuangtu[1],
                    loading: false})
    })
  }
  search = async(year)=>{
    this.props.form.validateFields( async (err, values)=>{
      if(err)
        return
      values.year='2019'
      let year = values.year
      this.setState({loading: true,tip: '加载核算信息中...', year, pcurrent: 1, acurrent: 1})
      let [geterr, data] = await wrapper(API.getAccountingData(year))
      if(geterr){
        this.setState({loading: false, year: '',
                      DeptContrast1: [], DeptContrast2: {}, DeptContrast3: [], CollegeContrast4: {}})
        if(!geterr.response)
          message.error('加载核算信息失败')
        this.setInitState()
        return
      }
      // 处理data
      this.setState({partyHouseTableList: data[0].datalist,
                    DeptContrast1: data[0].bingtu,
                    DeptContrast3: data[0].zhuzhuangtu,
                    academyHouseTableList: data[1].datalist,
                    DeptContrast2: data[1].zhuzhuangtu[0],
                    CollegeContrast4: data[1].zhuzhuangtu[1],
                    loading: false})
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
  partyHouseTableChange = (p, s)=>{
    this.setState({partyHouseTableLoading: true, page:p, pcurrent: p.current})
    API.getPartyHouseTableData(sorterParse({year: this.state.year}, s), p)
    .then(rs=>{
      this.setState({
        partyHouseTableList: rs.datalist,
     })
   })
   .catch(err=>{
     if(!err.resolved)
       message.error('加载失败')
   })
   .finally(()=>this.setState({partyHouseTableLoading: false}))
  }
  academyHouseTableChange = (p, s)=>{
    this.setState({academyHouseTableLoading: true, page:p, acurrent: p.current})
    API.getAcademyHouseTableData(sorterParse({year:this.state.year}, s), p)
    .then(rs=>{
      this.setState({
        academyHouseTableList: rs.datalist,
     })
   })
   .catch(err=>{
     if(!err.resolved)
       message.error('加载失败')
   })
   .finally(()=>this.setState({academyHouseTableLoading: false}))
  }
  export = ()=>{
    let data = new FormData()
    data.append('nianfen', this.state.year)
    data.append('tubiao1', this.getCanvasURL('DeptContrast1').split(',')[1])
    data.append('tubiao2', this.getCanvasURL('DeptContrast2').split(',')[1])
    data.append('tubiao3', this.getCanvasURL('DeptContrast3').split(',')[1])
    data.append('tubiao4', this.getCanvasURL('CollegeContrast4').split(',')[1])
    this.setState({loading: true, tip: '计算导出信息中...'})
    API.exportOverallAccount(data)
    .then(rs=>{
      download(rs)
    })
    .catch(err=>{
      if(!err.resolved)
        message.error('导出失败')
    })
    .finally(()=>this.setState({loading: false}))
  }
  render(){
    let imgStyle = {
      width: 300,
    }
    const { getFieldDecorator } = this.props.form
    return <MainContainer name="总体核算">
      <Form style={{marginTop: 50}}>
        <Row>
          <Col style={{marginTop: 5}} onClick={this.search} offset={1} span={2}>
            <TButton.SearchButton type="primary">查询结果</TButton.SearchButton>
          </Col>
          <Col style={{marginTop: 5}} onClick={this.account} offset={1} span={2}>
            <TButton.AccButton disabled type="primary">重新计算</TButton.AccButton>
          </Col>
        </Row>
      </Form>
      <Spin spinning={this.state.loading} tip={this.state.tip}>
      <Row>
        <Col span={12} style={{fontSize: '20px', textAlign: 'right'}}>
          房屋使用总体情况
        </Col>
      </Row>      
      <Split/>
      <Row style={{marginBottom: 25, marginLeft: 50}}>
          <TButton.ExButton type='primary'
            style={{width: 160}}
            disabled={!this.state.year||(this.state.partyHouseTableList.length===0
                                        &&this.state.academyHouseTableList.length===0)}
            onClick={this.export}>导出到文件</TButton.ExButton>
          <TButton.PrintButton
            onClick={this.print}
            style={{marginLeft: '20px'}}
            disabled={!this.state.year||(this.state.partyHouseTableList.length===0
                                        &&this.state.academyHouseTableList.length===0)}
            type='primary'>打印</TButton.PrintButton>
      </Row>
      {
        this.state.year?(
          <div id="printArea">
            {
              /*
            <Row>
              <Col span={22} offset={1}>
                <PartyHouseTable
                  loading={this.state.partyHouseTableLoading}
                  current={this.state.pcurrent}
                  onChange={this.partyHouseTableChange}
                  data={this.state.partyHouseTableList}/>
              </Col>
            </Row>
            <Row>
              <Col span={22} offset={1}>
                <AcademyHouseTable
                  loading={this.state.academyHouseTableLoading}
                  current={this.state.acurrent}
                  onChange={this.academyHouseTableChange}
                  data={this.state.academyHouseTableList}/>
              </Col>
            </Row>
               * */
            }
            {
              this.state.loading||(
                <div>
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
                            title="各学院总面积柱状图"
                            data={{
                              '材料科学与工程学院':{'实际总面积': 5005.27},
                              '船舶与海洋工程学院':{'实际总面积':10977.79},
                              '海洋科学与技术学院':{'实际总面积':4722.95},
                              '计算机科学与技术学院':{'实际总面积':4088.35},
                              '经济管理学院':{'实际总面积':1437.50},
                              '汽车工程学院':{'实际总面积':5387.01},
                              '土木工程系':{'实际总面积':2427.54},
                              '新能源学院':{'实际总面积':1508.72},
                              '信息科学与工程学院':{'实际总面积':6255.02},
                              '语言文学学院':{'实际总面积':1672.96},
                              '理学院':{'实际总面积':4422.53},
                            }}></Histogram>
                        )
                      }
                      {this.state.isPrinting&&(
                        <img style={imgStyle} src={this.state.printData.DeptContrast2} alt=""/>
                      )}
                    </Col>
                  </Row>
                  {
                    /*
                     <Row>
                      <Col span={12}>
                        {
                          !this.state.isPrinting&&(
                            <Histogram id="DeptContrast3"
                              title="各部门公用房定额面积、实际使用面积对比图表"
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
                              title="各学院分项实际使用面积对比图表"
                              data={this.state.CollegeContrast4}></Histogram>
                          )
                        }
                        {this.state.isPrinting&&(
                          <img style={imgStyle} src={this.state.printData.CollegeContrast4} alt=""/>
                        )}
                      </Col>
                    </Row>
                  */

                  }
                </div>
              )
            }
            <Row>
              <Col offset={4} span={16}>
                <Reservation></Reservation>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <TotalArea></TotalArea>
              </Col>
              <Col span={12}>
                <TotalNumberOfPeopel></TotalNumberOfPeopel>
              </Col>
            </Row>
          </div>

        ):(
          <Empty description="请先查询"></Empty>
        )
      }
      </Spin>
    </MainContainer>
  }
}
OverallAccount = Form.create({ name: 'OverallAccount' })(OverallAccount)
export default OverallAccount
