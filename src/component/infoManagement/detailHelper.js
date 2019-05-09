import React, {Component} from 'react'
import Zmage from 'react-zmage'
import {Row, Col, Checkbox} from 'antd'
import Table from '../common/table'
import {host} from '../../api/apiConfig'
const CheckboxGroup = Checkbox.Group;

let parseAuditStatus = (status)=>{
  if(status===0||status==='0')
    return '已驳回'
  else if(status>0&&status < 5)
    return '审批中'
  else if(status===5||status==='5')
    return '已批准'
  else
    return status
}
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

class Label extends Component{
  render(){
    return (
      <Col span={8}>
        <Col span={8}>{this.props.label}</Col>
        <Col span={14} style={{fontWeight:700}}>{this.props.value}</Col>
      </Col>
    )
  }
}

class HistoryInfo extends Component{
  render(){
    const columns = [
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
            <Label label="租金类型:" value={this.props.rentType}></Label>
            <Label label="租金单价:" value={this.props.rentPrice}></Label>
            <Label label="年收入:" value={this.props.annualIncome}></Label>
          </Row>
          <Row style={{marginTop: 20}}>
            <Label label="状态:" value={this.props.status}></Label>
            <Label label="科研团队:" value={this.props.scientificTeam}></Label>
            <Label label="使用面积:" value={this.props.useArea}></Label>
          </Row>
        </div>
      ),
      (
        <div>
          <Row style={{marginTop: 20}}>
            <Label label="使用面积:" value={this.props.useArea}></Label>
            <Label label="管理者:" value={this.props.manager}></Label>
            <Label label="容纳人数:" value={this.props.galleryful}></Label>
          </Row>
        </div>
      ),
      (
        <div>
          <Row style={{marginTop: 20}}>
            <Label label="租金类型:" value={this.props.rentType}></Label>
            <Label label="租金单价:" value={this.props.rentPrice}></Label>
            <Label label="年收入:" value={this.props.annualIncome}></Label>
          </Row>
          <Row style={{marginTop: 20}}>
            <Label label="状态:" value={this.props.status}></Label>
            <Label label="承租人:" value={this.props.lessee}></Label>
            <Label label="使用面积:" value={this.props.useArea}></Label>
          </Row>
        </div>
      ),
      (
        <div>
          <Row style={{marginTop: 20}}>
            <Label label="负责人:" value={this.props.head}></Label>
            <Label label="管理者:" value={this.props.manager}></Label>
            <Label label="使用者:" value={this.props.personnel}></Label>
          </Row>
          <Row style={{marginTop: 20}}>
            <Label label="容纳人数:" value={this.props.galleryful}></Label>
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
        <div style={{marginLeft: '10%', width: '80%'}}>
          <Row style={{marginTop: 20}}>
            <Label label="所属部门:" value={this.props.dept}></Label>
            <Label label="类型:" value={this.props.type}></Label>
            <Label label="具体用途:" value={this.props.spectificPurpose}></Label>
          </Row>
          <Row style={{marginTop: 20}}>
            <Label label="楼宇:" value={this.props.building}></Label>
            <Label label="楼层:" value={this.props.floor}></Label>
            <Label label="房间号:" value={this.props.roomNum}></Label>
          </Row>
          <Row style={{marginTop: 20}}>
            <Label label="审批状态:" value={parseAuditStatus(this.props.auditStatus)}></Label>
            <Label label="原因:" value={this.props.reason||'暂无'}></Label>
          </Row>
          {
            changePart[this.props.numType-1]
          }
          <Row style={{marginTop: 20}}>
            <Col span={2}>房屋图纸:</Col>
            <Col offset={1} span={20}>
              <PicDisplay imgList={this.props.drawings?this.props.drawings.map(i=>host+i.tupianlujing):[]}></PicDisplay>
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={2}>房屋照片:</Col>
            <Col offset={1} span={20}>
              <PicDisplay imgList={this.props.housePic?this.props.housePic.map(i=>host+i.tupianlujing):[]}></PicDisplay>
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={2}>备注:</Col>
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
