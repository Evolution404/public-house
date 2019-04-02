import React, {Component} from 'react'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import API from '../../api'
import Zmage from 'react-zmage'
import {Input, Button, Row, Col, message, Checkbox} from 'antd'
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input

class PicDisplay extends Component{
  render(){
    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {
          this.props.imgList&&this.props.imgList.map((item, index)=>(
            <div key={index} style={{flex: '0 0 33.3%', marginBottom: '20px'}}>
              <Zmage style={{width: '80%'}} src={item} alt="加载失败"></Zmage>
            </div>
          ))
        }
      </div>
    )
  }
}

class PHAuditDetail extends Component{
  state = {
    opinion: '',
    id: this.props.match.params.id,
    hasLoaded: false,
  }
  componentDidMount(){
    let id = this.props.match.params.id
    API.auditDetailPH(id)
    .then(rs=>{
      this.setState(rs)
      this.setState({hasLoaded: true})
    })
    .catch(err=>{
      message.error('加载失败')
    })
  }
  opinionChange = (e)=>{
    this.setState({opinion: e.target.value})
  }
  // 批准回调
  approval = ()=>{
    API.aprovalPH(this.state.id)
    .then(()=>{
      message.success('批准成功')
    })
    .catch(err=>{
      message.error('批准失败, 请检查网络连接')
    })
  }
  // 驳回回调
  rejected = ()=>{
    API.aprovalPH(this.state.id)
    .then(()=>{
      message.success('驳回成功')
    })
    .catch(err=>{
      message.error('驳回失败, 请检查网络连接')
    })
  }
  render(){
    let checkboxOption = [
      {
        label: '投影仪',
        value: '投影仪',
      },
      {
        label: '音响',
        value: '音响',
      },
      {
        label: '麦克风',
        value: '麦克风',
      },
      {
        label: '白板',
        value: '白板',
      },
      {
        label: '电脑',
        value: '电脑',
      },
    ]
    return <MainContainer name="公用房审批">
      基本信息/公用房审批
      <h2 style={{textAlign: 'center'}}>公用房审批</h2>
      <Split></Split>
      <p>审核意见</p>
      <div style={{width: '60%'}}>
        <Row>
          <Col span={18}>
            <TextArea onChange={this.opinionChange} rows={4}></TextArea>
          </Col>
          <Col offset={1} span={3}>
            <Button onClick={this.approval} type='primary' block style={{margin: '10px 0'}}>批准</Button>
            <Button onClick={this.rejected} style={{backgroundColor: 'red', color: 'white'}} block>驳回</Button>
          </Col>
        </Row>
      </div>
      {
      this.state.hasLoaded&&(

      <div>
        <div style={{width: '70%'}}>
          <Row style={{marginTop: 20}}>
            <Col span={8}>
              所属部门: {this.state.dept}
            </Col>
            <Col span={8}>
              使用性质: {this.state.usingNature}
            </Col>
            <Col span={8}>
              二级性质: {this.state.secondaryNature}
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={8}>
              楼宇: {this.state.building}
            </Col>
            <Col span={8}>
              楼层: {this.state.floor}
            </Col>
            <Col span={8}>
              房间号: {this.state.roomNum}
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col>使用面积: {this.state.usingArea}</Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col>使用者: {this.state.user&&this.state.user.join(' ')}</Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col>负责人: {this.state.head}</Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={2}>房屋图纸:</Col>
            <Col offset={1} span={21}>
              <PicDisplay imgList={this.state.drawings}></PicDisplay>
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={2}>房屋照片:</Col>
            <Col offset={1} span={21}>
              <PicDisplay imgList={this.state.housePic}></PicDisplay>
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={2}>房屋描述:</Col>
            <Col offset={1} span={21}>
              <p style={{width: '100%',
                height: 'auto',
                wordWrap:'break-word',
                wordBreak:'break-all',
                overflow: 'hidden',
              }}>{this.state.houseDesc}</p>
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={2}>设备配置:</Col>
            <Col offset={1} span={20}>
              <CheckboxGroup options={checkboxOption}
                defaultValue={this.state.equipment}/>
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={2}>批准文书:</Col>
            <Col offset={1} span={20}>
              <PicDisplay imgList={[this.state.approvalDocument]}></PicDisplay>
            </Col>
          </Row>
        </div>
      </div>
      )
      }
    </MainContainer>
  }
}

export default PHAuditDetail
