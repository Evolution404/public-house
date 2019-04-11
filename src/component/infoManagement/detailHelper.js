import React, {Component} from 'react'
import {
  HashRouter as Router,
  Link
} from "react-router-dom";
import Map from '../../routerMap'
import Zmage from 'react-zmage'
import {Row, Col, Checkbox} from 'antd'
import Table from '../common/table'
const CheckboxGroup = Checkbox.Group;

class PicDisplay extends Component{
  render(){
    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {
          this.props.imgList&&this.props.imgList.map((item, index)=>(
            <div key={index} style={{flex: '0 0 33.3%', marginBottom: '20px'}}>
              <Zmage style={{width: '80%'}} src={item} alt=""></Zmage>
            </div>
          ))
        }
      </div>
    )
  }
}

class PersonalLink extends Component{
  render(){
    return (
      <Router>
        <Link to={Map.MyPH.path.replace(':id', this.props.id)}>
          <span style={{marginLeft: 5}}>
            {this.props.name}
          </span>
        </Link>
      </Router>            
    )
  }
}
class HistoryInfo extends Component{
  render(){
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '房屋',
        dataIndex: 'house',
      },
      {
        title: '时间',
        dataIndex: 'time',
      },
      {
        title: '使用者',
        dataIndex: 'personnel',
      },
      {
        title: '使用性质',
        dataIndex: 'usingNature',
      },
    ]
    return (
      <div style={{marginTop: 25}}>
        <p>历史信息</p>
        <Table columns={columns} {...this.props}></Table>      
      </div>
    )
  }
}

class DetailHelper extends Component{
  render(){
    const checkboxOption = [
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
    return <div>
        <div style={{width: '70%'}}>
          <Row style={{marginTop: 20}}>
            <Col span={8}>
              所属部门: {this.props.dept}
            </Col>
            <Col span={8}>
              使用性质: {this.props.usingNature}
            </Col>
            <Col span={8}>
              二级性质: {this.props.secondaryNature}
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={8}>
              楼宇: {this.props.building}
            </Col>
            <Col span={8}>
              楼层: {this.props.floor}
            </Col>
            <Col span={8}>
              房间号: {this.props.roomNum}
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col>使用面积: {this.props.usingArea}</Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col>使用者: {this.props.personnel&&this.props.personnel.map(item=>(
              <PersonalLink {...item}></PersonalLink>
            ))}</Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col>负责人: {this.props.head&&this.props.head.map(item=>(
              <PersonalLink {...item}></PersonalLink>
            ))}</Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col>防火负责人: {this.props.fireHead&&this.props.fireHead.map(item=>(
              <PersonalLink {...item}></PersonalLink>
            ))}</Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={3}>房屋图纸:</Col>
            <Col offset={1} span={20}>
              <PicDisplay imgList={this.props.drawings}></PicDisplay>
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={3}>房屋照片:</Col>
            <Col offset={1} span={20}>
              <PicDisplay imgList={this.props.housePic}></PicDisplay>
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={3}>房屋描述:</Col>
            <Col offset={1} span={20}>
              <p style={{width: '100%',
                height: 'auto',
                wordWrap:'break-word',
                wordBreak:'break-all',
                overflow: 'hidden',
              }}>{this.props.houseDesc}</p>
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={3}>设备配置:</Col>
            <Col offset={1} span={20}>
              <CheckboxGroup options={checkboxOption}
                value={this.props.equipment}/>
            </Col>
          </Row>
          {
            this.props.approvalDocument&&(
              <Row style={{marginTop: 20}}>
                <Col span={2}>批准文书:</Col>
                <Col offset={1} span={20}>
                  <PicDisplay imgList={[this.props.approvalDocument]}></PicDisplay>
                </Col>
              </Row>
            )
          }
          {
            this.props.historyInfo&&(
              <HistoryInfo data={this.props.historyInfo}></HistoryInfo>
            )
          }
        </div>
      </div>
  }
}

export default DetailHelper
