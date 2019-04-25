import React, {Component} from 'react'
import Zmage from 'react-zmage'
import {Row, Col, Checkbox} from 'antd'
import Table from '../common/table'
import {host} from '../../api/apiConfig'
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

/*class PersonalLink extends Component{
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
}*/
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
    let changePart = [
      (
        <div>
          <Row style={{marginTop: 20}}>
            <Col span={8}>
              租金类型: {this.props.rentType}
            </Col>
            <Col span={8}>
              租金单价: {this.props.rentPrice}
            </Col>
            <Col span={8}>
              年收入: {this.props.annualIncome}
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={8}>
              状态: {this.props.status}
            </Col>
            <Col span={8}>
              科研团队: {this.props.scientificTeam}
            </Col>
          </Row>
        </div>
      ),
      (
        <div>
          <Row style={{marginTop: 20}}>
            <Col span={8}>
              使用面积: {this.props.useArea}
            </Col>
            <Col span={8}>
              管理者: {this.props.manager}
            </Col>
            <Col span={8}>
              容纳人数: {this.props.galleryful}
            </Col>
          </Row>
        </div>
      ),
      (
        <div>
          <Row style={{marginTop: 20}}>
            <Col span={8}>
              租金类型: {this.props.rentType}
            </Col>
            <Col span={8}>
              租金单价: {this.props.rentPrice}
            </Col>
            <Col span={8}>
              年收入: {this.props.annualIncome}
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={8}>
              状态: {this.props.status}
            </Col>
            <Col span={8}>
              承租人: {this.props.lessee}
            </Col>
            <Col span={8}>
              使用面积: {this.props.useArea}
            </Col>
          </Row>
        </div>
      ),
      (
        <div>
          <Row style={{marginTop: 20}}>
            <Col span={8}>
              负责人: {this.props.head}
            </Col>
            <Col span={8}>
              管理者: {this.props.manager}
            </Col>
            <Col span={8}>
              使用者: {this.props.personnel}
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={8}>
              容纳人数: {this.props.galleryful}
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={3}>设备配置:</Col>
            <Col offset={1} span={20}>
              <CheckboxGroup options={checkboxOption}
                value={this.props.deviceConfig}/>
            </Col>
          </Row>
        </div>
      ),
    ]
    return <div>
        <div style={{width: '70%'}}>
          <Row style={{marginTop: 20}}>
            <Col span={8}>
              所属部门: {this.props.dept}
            </Col>
            <Col span={8}>
              类型: {this.props.type}
            </Col>
            <Col span={8}>
              具体用途: {this.props.spectificPurpose}
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
            <Col span={8}>
              审批状态: {this.props.auditStatus}
            </Col>
            <Col span={8}>
              原因: {this.props.reason||'暂无'}
            </Col>
          </Row>
          {
            changePart[this.props.numType-1]
          }
          <Row style={{marginTop: 20}}>
            <Col span={3}>房屋图纸:</Col>
            <Col offset={1} span={20}>
              <PicDisplay imgList={this.props.drawings?this.props.drawings.map(i=>host+i.tupianlujing):[]}></PicDisplay>
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={3}>房屋照片:</Col>
            <Col offset={1} span={20}>
              <PicDisplay imgList={this.props.housePic?this.props.housePic.map(i=>host+i.tupianlujing):[]}></PicDisplay>
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={3}>备注:</Col>
            <Col offset={1} span={20}>
              <p style={{width: '100%',
                height: 'auto',
                wordWrap:'break-word',
                wordBreak:'break-all',
                overflow: 'hidden',
              }}>{this.props.note}</p>
            </Col>
          </Row>
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
/*
          <Row style={{marginTop: 20}}>
            <Col>使用面积: {this.props.useArea}</Col>
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
            <Col span={3}>设备配置:</Col>
            <Col offset={1} span={20}>
              <CheckboxGroup options={checkboxOption}
                value={this.props.equipment}/>
            </Col>
          </Row>*/
