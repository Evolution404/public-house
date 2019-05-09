import React, {Component} from 'react'
import {
  HashRouter as Router,
  Link
} from "react-router-dom"
import {Form, Row, Col, Button, Spin, message, Empty} from 'antd'
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
import download from '../common/download'

const Item = Form.Item
class DeptContrast1 extends Component {
  render(){
    return <PieChart id="DeptContrast1"
      title="各部门实际公用房使用面积对比图表"
      data={this.props.data}
      desc="部门"
      ></PieChart>
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
        title: '定额面积(DE)',
          children: [
            {
              title: '办公用房(BG)',
              dataIndex: 'bangongyongfang_de',
            },
            {
              title: '公用用房(GY)',
              dataIndex: 'gongyongyongfang_de',
            },
            {
              title: '实验实习用房(SS)',
              dataIndex: 'shiyanshixiyongfang_de',
            },
            {
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
            },
          ]
      },
      {
        title: '实际面积',
        dataIndex: 'shijiheji',
        sorter: true,
      },
      {
        title: '超额面积',
        dataIndex: 'mianji_ce',
        sorter: true,
      },
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
        title: '部门名称',
        dataIndex: 'bumen',
        sorter: true,
      },
      {
        title: '定额面积',
        dataIndex: 'dingemianji',
        sorter: true,
      },
      {
        title: '实际面积',
        dataIndex: 'shijimianji',
        sorter: true,
      },
      {
        title: '超额面积',
        dataIndex: 'mianji_ce',
        sorter: true,
      },
      {
        title: '操作',
        render: (text, record)=>{
          return <Router>
            <Link to={Map.DepartmentAccount.path.replace(':id', '1-'+record.id)}>
              <SButton disable={record.shijimianji<=0} text="详细"/>
            </Link>
          </Router>
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
      let year = values.year
      this.setState({
        year,
      })
      // 先核算信息
      this.setState({loading: true, tip: '计算核算信息中...'})
      let [err] = await wrapper(API.accountingData(year))
      if(err){
        if(!err.response)
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
     console.log(err)
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
     console.log(err)
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
      if(!err.response)
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
      <Form style={{marginTop: 20}}>
        <Row>
          <Col span={4}>
            <Item labelCol={{span:12}} wrapperCol={{span:12}} label='年份'>
              {getFieldDecorator('year',{
                initialValue:this.state.year,
                rules: [{required: true, message: '请选择年份'}]
              })(
                <YearSelect placeholder="请选择年份" size="default"></YearSelect>
              )}
            </Item>
          </Col>
          <Col style={{marginTop: 5}} onClick={this.search} offset={1} span={2}><Button type="primary">查询结果</Button></Col>
          <Col style={{marginTop: 5}} onClick={this.account} offset={1} span={2}><Button type="primary">重新核算</Button></Col>
        </Row>
      </Form>
      <Spin spinning={this.state.loading} tip={this.state.tip}>
      <Row>
        <Col span={12} style={{fontSize: '20px', textAlign: 'right'}}>
          全校公用房使用总体情况
        </Col>
        <Col offset={2} span={10}>
          <Button type='primary'
            disabled={!this.state.year||(this.state.partyHouseTableList.length===0
                                        &&this.state.academyHouseTableList.length===0)}
            onClick={this.export}>导出到文件</Button>
          <Button
            onClick={this.print}
            style={{marginLeft: '20px'}} type='primary'>打印</Button>
        </Col>
      </Row>      
      <Split/>
      {
        this.state.year?(
          <div id="printArea">
            <Row>
              <Col span={20} offset={1}>
                <PartyHouseTable
                  loading={this.state.partyHouseTableLoading}
                  current={this.state.pcurrent}
                  onChange={this.partyHouseTableChange}
                  data={this.state.partyHouseTableList}/>
              </Col>
            </Row>
            <Row>
              <Col span={20} offset={1}>
                <AcademyHouseTable
                  loading={this.state.academyHouseTableLoading}
                  current={this.state.acurrent}
                  onChange={this.academyHouseTableChange}
                  data={this.state.academyHouseTableList}/>
              </Col>
            </Row>
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
                            title="各学院实际总面积、人均使用面积对比图表"
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
                </div>
              )
            }
          </div>

        ):(
          <Empty description="请先选择年份"></Empty>
        )
      }
      </Spin>
    </MainContainer>
  }
}
OverallAccount = Form.create({ name: 'OverallAccount' })(OverallAccount)
export default OverallAccount
