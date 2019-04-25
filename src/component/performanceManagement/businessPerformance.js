import React, {Component} from 'react'
import {Form, Row, Col, Button, message, Spin, Empty} from 'antd'
import API from '../../api'
import MainContainer from '../common/mainContainer'
import {DeptSelect} from '../common/select'
import Split from '../common/split'
import Table from '../common/table'
import Histogram from '../common/histogram'

const Item = Form.Item

class BusinessPerformance extends Component{
  state = {
    year: 0,
    dept: '',
    loading: false,
    hasSearched: false,
    isPrinting: false,
    tableList: [],
    graphData: {},
    totalArea: 0,
    totalRent: 0,
    avgPerformance: 0,
  }
  search = ()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({dept: values.dept, loading: true, hasSearched: true})
        API.searchBusinessPerformance(values)
        .then(rs=>{
          this.setState(rs)
        })
        .catch(err=>{
          message.error('搜索失败')
        })
        .finally(()=>this.setState({loading: false}))
        console.log('Received values of form: ', values);
      }
    })
  }
  render(){
    let columns = [
      {
        title: '部门',
        dataIndex: 'bumen',
        sorter: (a, b) => a.bumen.localeCompare(b.bumen),
      },
      {
        title: '楼宇',
        dataIndex: 'louyu',
        sorter: (a, b) => a.louyu.localeCompare(b.louyu),
      },
      {
        title: '楼层',
        dataIndex: 'louceng',
        sorter: (a, b) => a.louceng - b.louceng,
      },
      {
        title: '房间号',
        dataIndex: 'fangjianhao',
        sorter: (a, b) => a.fangjianhao - b.fangjianhao,
      },
      {
        title: '使用面积',
        dataIndex: 'shiyongmianji',
        sorter: (a, b) => a.shiyongmianji - b.shiyongmianji,
      },
      {
        title: '使用者',
        dataIndex: 'shiyongzhe',
        sorter: (a, b) => a.shiyongzhe - b.shiyongzhe,
      },
      {
        title: '租金单价',
        dataIndex: 'zujindanjia',
        sorter: (a, b) => a.zujindanjia - b.zujindanjia,
      },
      {
        title: '年租金',
        dataIndex: 'nianzujin',
        sorter: (a, b) => a.nianzujin - b.nianzujin,
      },
      {
        title: '租金类型',
        dataIndex: 'zujinleixing',
        sorter: (a, b) => a.zujinleixing.localeCompare(b.zujinleixing),
      },
      {
        title: '米均效益',
        dataIndex: 'mijunxiaoyi',
        sorter: (a, b) => a.mijunxiaoyi - b.mijunxiaoyi,
      },
    ]
    const { getFieldDecorator } = this.props.form
    return <MainContainer name="效益管理">
      <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
        <Row>
          <Col offset={1} span={5}>
            <Item labelCol={{span:7}} wrapperCol={{span:16}} label="部门名称">
              {getFieldDecorator('dept',)(
                <DeptSelect></DeptSelect>
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
      <Spin spinning={this.state.loading}>
        {
          this.state.hasSearched?(
            <div>
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
              {
                (!this.state.loading&&!this.state.isPrinting)&&(
                  <Histogram id="graph"
                    title={(this.state.dept?"本":"各")+"单位各商业用房面积、使用效益、米均效益对比情况"}
                    data={this.state.graphData}
                  ></Histogram>
                )
              }
            </div>
          ):(
            <Empty description="请先搜索"></Empty>
          )
        }
      </Spin>
    </MainContainer>
  }
}

const WrappedBusinessPerformance = Form.create({ name: 'business_performance' })(BusinessPerformance);

export default WrappedBusinessPerformance
