import React, {Component} from 'react'
import {Button, Form, Row, Col, message, Empty, Spin} from 'antd'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import {BuildingSelect} from '../common/select'
import Zmage from 'react-zmage'
import API from '../../api'
import {host} from '../../api/apiConfig'
const Item = Form.Item

class Search extends Component{
  handleSubmit = (e) => {
    let self = this
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(err)return
      console.log('Received values of form: ', values);
      self.props.onSearch(values)
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
        <Row>
          <Col span={7}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="楼宇名称">
              {getFieldDecorator('buildingName',{
                rules: [{required: true, message: '请选择楼宇名称'}]
              })(
                <BuildingSelect></BuildingSelect>
              )}
            </Item>
          </Col>
          <Col offset={1} span={4}>
            <div style={{marginTop:'5px'}}>
              <Button type='primary' htmlType='submit'>搜索</Button>
            </div>
          </Col>
        </Row>
      </Form>
    )
  }
}

class ImgDisplay extends Component{
  render(){
    let childStyle = {
      flex: '0 0 33.3%',
      width: 100,
      padding: 20,
      backgroundClip: 'content-box',
    }
    let imgStyle = {
      width: '100%',
    }
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'start-between',
        flexFlow: 'row wrap',
      }}>
        {
          this.props.data.map((item, index)=>(
            <div key={index} style={childStyle}>
              <Zmage style={imgStyle} src={item.src} alt=""></Zmage>
              <p style={{textAlign: 'center'}}>{item.text}</p>
            </div>
          ))
        }
      </div>
    )
  }
}

const WrappedSearch = Form.create({ name: 'search' })(Search)

class BuildingQuery extends Component{
  state = {
    buildingName: '',
    imgData: [],
    loading: false,
  }
  search = ({buildingName})=>{
    this.setState({loading: true})
    API.buildingSearch(buildingName)
    .then(data=>{
      if(data.buildingName){
        this.setState({buildingName: data.buildingName})
      }
      if(data.buildingImgs){
        let imgData = []
        data.buildingImgs.forEach(floor=>{
          let text = '楼层'+floor.louceng
          imgData.push({text,src:host+floor.tupianlujing})
        })
        if(imgData.length===0)
          message.error("未获取到图片信息")
        this.setState({imgData})
      }
    })
    .catch(err=>{
      console.log(err)
      message.error('查询失败')
    })
    .finally(()=>this.setState({loading: false}))
  }
  render(){
    return <MainContainer name="楼宇查询">
      <Spin spinning={this.state.loading}>
        <WrappedSearch onSearch={this.search}/>
        <Split/>
        {this.state.imgData.length>0?(
          <div>
              <h2>{this.state.buildingName}</h2>
              <ImgDisplay data={this.state.imgData}></ImgDisplay>
          </div>
        ):(
          <Empty description="请先搜索"></Empty>
        )}
      </Spin>
    </MainContainer>
  }
}

export default BuildingQuery
