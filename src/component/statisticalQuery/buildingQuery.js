import React, {Component} from 'react'
import {
  Link
} from "react-router-dom"
import Map from '../../routerMap'
import {Button, Form, Row, Col, message, Empty, Spin, Modal} from 'antd'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import {BuildingSelect} from '../common/select'
import Zmage from 'react-zmage'
import API from '../../api'
import {host} from '../../api/apiConfig'
import {read, write} from '../stateHelper'
import {TButton} from '../common/button'
const Item = Form.Item

class Search extends Component{
  handleSubmit = (e) => {
    let self = this
   e.preventDefault();
   this.props.form.validateFields((err, values) => {
     if(err)return
     self.props.onSearch(values)
   })
 }
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} style={{marginTop:'50px'}}>
        <Row>
          <Col span={7}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="楼宇名称">
              {getFieldDecorator('buildingName',{
                initialValue: this.props.buildingName,
                rules: [{required: true, message: '请选择楼宇名称'}]
              })(
                <BuildingSelect></BuildingSelect>
              )}
            </Item>
          </Col>
          <Col offset={1} span={4}>
            <div style={{marginTop:'5px'}}>
              <TButton.SearchButton type='primary' htmlType='submit'>搜索</TButton.SearchButton>
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
      height: 200,
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
              <Row style={{marginTop: 10}}>
                <Col offset={11} span={2}>
                  <Button onClick={this.props.floorClick.bind(this, item.floor)} type="primary" size="small">{item.text}</Button>
                </Col>
              </Row>
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
    floorsLoading: false,
    modal: {
      visible: false,
      roomList:[],
      src: [],
    }
  }
  componentWillMount(){
    let state = read(this)
    if(state&&state.modal)
      state.modal.visible=false
  }
  componentWillUnmount(){
    write(this)
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
          imgData.push({floor:floor.louceng,text,src:host+floor.tupianlujing})
        })
        if(imgData.length===0)
          message.error("未获取到图片信息")
        this.setState({imgData})
     }
   })
   .catch(err=>{
     message.error('查询失败')
   })
   .finally(()=>this.setState({loading: false}))
  }
  floorClick = (floor)=>{
    let filter = {
      building: this.state.buildingName,
      floor,
    }
    this.setState({floorsLoading: true})
    API.getAllRoomNum(filter)
    .then(rs=>{
      this.setState({modal: {visible: true,
        src: (this.state.imgData.filter(i=>i.floor===floor))[0].src,
       roomList: rs}})
   })
   .catch(err=>{
     if(!err.resolved)
        message.error('加载房间号信息失败')
    })
    .finally(()=>this.setState({floorsLoading: false}))

  }
  closeModal = ()=>{
    this.setState({modal: {visible: false}})
  }
  render(){
    return <MainContainer name="楼宇查询">
      <Spin spinning={this.state.loading||this.state.floorsLoading}
        tip={this.state.loading?'加载中...':'加载楼层信息中...'}>
        <WrappedSearch
          buildingName={this.state.buildingName}
          onSearch={this.search}/>
        <Split/>
        {this.state.imgData.length>0?(
          <div>
              <h2>{this.state.buildingName}</h2>
              <ImgDisplay floorClick={this.floorClick} data={this.state.imgData}></ImgDisplay>
          </div>
        ):(
          <Empty description="请先搜索"></Empty>
        )}
      </Spin>
      {
        this.state.modal.visible&&(
        <Modal
            title="房间号查询"
            visible={this.state.modal.visible}
            onOk={this.closeModal}
            onCancel={this.closeModal}
            footer={<span></span>}
          >
            {
                <Zmage style={{width: '100%'}} src={this.state.modal.src} alt=""></Zmage>
            }
            <div style={{marginTop: 20, display: 'flex', flexWrap: 'wrap'}}>
              {
                this.state.modal.roomList.map((i,key)=>(
                  <Link style={{flex: '0 0 15%', margin: 10}} key={key} to={Map.PHDetailInfo.path.replace(':id', `${i.leixing}-${i.id}`)}>
                    <Button block type="primary">{i.fangjianhao}</Button>
                  </Link>
                ))
              }
            </div>
          </Modal>
        )
      }
    </MainContainer>
  }
}

export default BuildingQuery
