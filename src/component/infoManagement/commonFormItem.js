import React, {Component} from 'react'
import {Row, Col, Form, Select, Input, Checkbox} from 'antd'
import {DeptSelect, BuildingSelect, FloorSelect} from '../common/select'
const {Item} = Form
const Option = Select.Option
const CheckboxGroup = Checkbox.Group

// 备注
class Note extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Item labelCol={{span:3}} wrapperCol={{span:12}} label="备注">
        {getFieldDecorator('note', {
          initialValue: this.props.initialValue,
        })(
          <Input />
        )}
      </Item>
    )
  }
}
class Dept extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Item labelCol={{span:3}} wrapperCol={{span:10}} label="所属单位">
        {getFieldDecorator('dept',{
          initialValue: this.props.initialValue,
          rules: [{required: true, message:"请选择单位"}]
        })(
          <DeptSelect></DeptSelect>
        )}
      </Item>
    )
  }
}
class SpectificPurpose extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Item labelCol={{span:3}} wrapperCol={{span:4}} label="具体用途">
        {getFieldDecorator('spectificPurpose',{
          initialValue: this.props.initialValue,
        })(
          <Input></Input>
        )}
      </Item>
    )
  }
}
class ScientificTeam extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Item labelCol={{span:3}} wrapperCol={{span:6}} label="科研团队">
        {getFieldDecorator('scientificTeam',{
          initialValue: this.props.initialValue,
        })(
          <Input></Input>
        )}
      </Item>
    )
  }
}

class Building extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Item labelCol={{span:9}} wrapperCol={{span:12}} label="楼宇">
        {getFieldDecorator('building', {
          initialValue: this.props.initialValue,
          getValueFromEvent: this.props.buildingChange,
        })(
          <BuildingSelect></BuildingSelect>
        )}
      </Item>
    )
  }
}

class Floor extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Item labelCol={{span:9}} wrapperCol={{span:12}} label="楼层">
        {getFieldDecorator('floor', {
          initialValue: this.props.initialValue,
        })(
          <FloorSelect building={this.props.building}></FloorSelect>
        )}
      </Item>
    )
  }
}
class RoomNum extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Item labelCol={{span:9}} wrapperCol={{span:12}} label="房间号">
        {getFieldDecorator('roomNum', {
          initialValue: this.props.initialValue,
        })(
          <Input placeholder="如: 南405" />
        )}
      </Item>
    )
  }
}

// 楼宇(Building)楼层(Floor)房间号(RoomNum)
class BFR extends Component{
  state = {
    building: this.props.initialValue.building,
  }
  buildingChange = building=>{
    this.setState({building})
    this.props.form.setFieldsValue({floor:''})
    return building
  }
  render(){
    return (
      <Row>
        <Col span={8}>
          <Building {...this.props}
            buildingChange={this.buildingChange}
            initialValue={this.props.initialValue.building}></Building>
        </Col>
        <Col span={8}>
          <Floor {...this.props}
            initialValue={this.props.initialValue.floor}
            building={this.state.building}></Floor>
        </Col>
        <Col span={8}>
          <RoomNum {...this.props} initialValue={this.props.initialValue.roomNum}></RoomNum>
        </Col>
      </Row>
      
    )
  }
}

class AnnualIncome extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Item labelCol={{span:9}} wrapperCol={{span:12}} label="年收入">
        {getFieldDecorator('annualIncome',{
          initialValue: this.props.initialValue,
        })(
          <Input />
        )}
      </Item>
    )
  }
}

class AuditStatus extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Item labelCol={{span:3}} wrapperCol={{span:4}} label="审批状态">
        {getFieldDecorator('auditStatus', {
          initialValue: this.props.initialValue,
          rules: [{required: true, message:'请选择审批状态'}]
        })(
          <Select>
            <Option value="已批准">已批准</Option>
            <Option value="未上报">未上报</Option>
            <Option value="等待审核">已上报</Option>
            <Option value="已驳回">已驳回</Option>
          </Select>
        )}
      </Item>
    )
  }
}
class UseArea extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Item labelCol={{span:9}} wrapperCol={{span:12}} label="使用面积">
        {getFieldDecorator('useArea',{
          initialValue: this.props.initialValue,
        })(
          <Input />
        )}
      </Item>
    )
  }
}

class Status extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Item labelCol={{span:9}} wrapperCol={{span:12}} label="状态">
        {getFieldDecorator('status',{
          initialValue: this.props.initialValue,
        })(
          <Select>
            <Option value="已租">已租</Option>
            <Option value="待租">待租</Option>
          </Select>
        )}
      </Item>
    )
  }
}
class RentPrice extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Item labelCol={{span:9}} wrapperCol={{span:12}} label="租金单价">
        {getFieldDecorator('rentPrice',{
          initialValue: this.props.initialValue,
        })(
          <Input />
        )}
      </Item>
    )
  }
}
class RentType extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Item labelCol={{span:9}} wrapperCol={{span:12}} label="租金类型">
        {getFieldDecorator('rentType',{
          initialValue: this.props.initialValue,
        })(
          <Select>
            <Option value="日租金">日租金</Option>
            <Option value="月租金">月租金</Option>
            <Option value="年租金">年租金</Option>
          </Select>
        )}
      </Item>
    )
  }
}
class Manager extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Item labelCol={{span:9}} wrapperCol={{span:12}} label="管理者">
        {getFieldDecorator('manager',{
          initialValue: this.props.initialValue,
        })(
          <Input />
        )}
      </Item>
    )
  }
}

class Galleryful extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Item labelCol={{span:9}} wrapperCol={{span:12}} label="容纳人数">
        {getFieldDecorator('galleryful',{
          initialValue: this.props.initialValue,
        })(
          <Input />
        )}
      </Item>
    )
  }
}
class Lessee extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Item labelCol={{span:9}} wrapperCol={{span:12}} label="承租人">
        {getFieldDecorator('lessee',{
          initialValue: this.props.initialValue,
        })(
          <Input />
        )}
      </Item>
    )
  }
}

class DeviceConfig extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    const checkboxOption = [
      { label: '投影仪', value: 0},
      { label: '音响', value: 1},
      { label: '麦克风', value: 2},
      { label: '白板', value: 3},
      { label: '电脑', value: 4},
    ]
    return (
      <Item labelCol={{span:3}} wrapperCol={{span:20}} label="设备配置">
        {getFieldDecorator('deviceConfig', {
          initialValue: this.props.initialValue,
        })(
          <CheckboxGroup options={checkboxOption}/>
        )}
      </Item>
    )
  }
}

class Head extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Item labelCol={{span:3}} wrapperCol={{span:4}} label="负责人">
        {getFieldDecorator('head',{
          initialValue: this.props.initialValue,
        })(
          <Input />
        )}
      </Item>
    )
  }
}
class Personnel extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Item labelCol={{span:9}} wrapperCol={{span:12}} label="使用者">
        {getFieldDecorator('personnel',{
          initialValue: this.props.initialValue,
        })(
          <Input />
        )}
      </Item>
    )
  }
}


class ScientificBuilding extends Component{
  render(){
    let initialValue = {}
    if(this.props.default)
      initialValue = this.props.default
    return <div>
        <Dept {...this.props} initialValue={initialValue.dept}></Dept>
        {
          this.props.noBFR||(
            <BFR {...this.props} initialValue={{
              building: initialValue.building,
              floor: initialValue.floor,
              roomNum: initialValue.roomNum,
            }} ></BFR>
          )
        }
        <ScientificTeam {...this.props} initialValue={initialValue.scientificTeam} ></ScientificTeam>
        <Row>
          <Col span={8}>
            <UseArea {...this.props} initialValue={initialValue.useArea} ></UseArea>
          </Col>
          <Col span={8}>
            <Status {...this.props} initialValue={initialValue.status} ></Status>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <RentPrice {...this.props} initialValue={initialValue.rentPrice} ></RentPrice>
          </Col>
          <Col span={8}>
            <RentType {...this.props} initialValue={initialValue.rentType} ></RentType>
          </Col>
          <Col span={8}>
            <AnnualIncome {...this.props} initialValue={initialValue.annualIncome} ></AnnualIncome>
          </Col>
        </Row>
        <Note {...this.props} initialValue={initialValue.note} ></Note>
    </div>
  }
}

// 后勤保障用房
class LogisticsBuilding extends Component{
   render(){
    let initialValue = {}
    if(this.props.default)
      initialValue = this.props.default
     return ( <div>
        <Dept {...this.props} initialValue={initialValue.dept} ></Dept>
        {
          this.props.noBFR||(
            <BFR {...this.props} initialValue={{
              building: initialValue.building,
              floor: initialValue.floor,
              roomNum: initialValue.roomNum,
            }} ></BFR>
          )
        }
        <Row>
          <Col span={8}>
            <UseArea {...this.props}
              initialValue={initialValue.useArea} ></UseArea>
          </Col>
          <Col span={8}>
            <Manager {...this.props} initialValue={initialValue.manager} ></Manager>
          </Col>
          <Col span={8}>
            <Galleryful {...this.props}
              initialValue={initialValue.galleryful} ></Galleryful>
          </Col>
        </Row>
        <Note {...this.props}
          initialValue={initialValue.note} ></Note>
      </div>       
     )
   }
}

// 产业商业用房
class BusinessBuilding extends Component{
   render(){
    let initialValue = {}
    if(this.props.default)
      initialValue = this.props.default
     return ( <div>
        <Dept {...this.props} initialValue={initialValue.dept} ></Dept>
        {
          this.props.noBFR||(
            <BFR {...this.props} initialValue={{
              building: initialValue.building,
              floor: initialValue.floor,
              roomNum: initialValue.roomNum,
            }} ></BFR>
          )
        }
        <Row>
          <Col span={8}>
            <UseArea {...this.props} initialValue={initialValue.useArea} ></UseArea>
          </Col>
          <Col span={8}>
            <Lessee {...this.props} initialValue={initialValue.lessee} ></Lessee>
          </Col>
          <Col span={8}>
            <Status {...this.props} initialValue={initialValue.status} ></Status>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <RentPrice {...this.props} initialValue={initialValue.rentPrice} ></RentPrice>
          </Col>
          <Col span={8}>
            <RentType {...this.props} initialValue={initialValue.rentType} ></RentType>
          </Col>
          <Col span={8}>
            <AnnualIncome {...this.props} initialValue={initialValue.annualIncome} ></AnnualIncome>
          </Col>
        </Row>
        <Note {...this.props} initialValue={initialValue.note} ></Note>
      </div>       
     )
   }
}

// 学院党政机关用房
class CollegePartyBuilding extends Component{
  render(){
    let initialValue = {}
    if(this.props.default)
      initialValue = this.props.default
    return <div>
      <Dept {...this.props} initialValue={initialValue.dept} ></Dept>
      {
        this.props.noBFR||(
          <BFR {...this.props} initialValue={{
            building: initialValue.building,
            floor: initialValue.floor,
            roomNum: initialValue.roomNum,
          }} ></BFR>
        )
      }
      <Head {...this.props} initialValue={initialValue.head} ></Head>
      <Row>
        <Col span={8}>
          <Manager {...this.props} initialValue={initialValue.manager} ></Manager>
        </Col>
        <Col span={8}>
          <Galleryful {...this.props} initialValue={initialValue.galleryful} ></Galleryful>
        </Col>
        <Col span={8}>
          <Personnel {...this.props} initialValue={initialValue.personnel} ></Personnel>
        </Col>
      </Row>
      <DeviceConfig {...this.props} initialValue={initialValue.deviceConfig} ></DeviceConfig>
      <Note {...this.props} initialValue={initialValue.note} ></Note>
    </div>
  }
}

export {
  Note,
  Dept,
  SpectificPurpose,
  ScientificTeam,
  Building,
  Floor,
  RoomNum,
  BFR,
  AnnualIncome,
  AuditStatus,
  UseArea,
  Status,
  RentPrice,
  RentType,
  Manager,
  Galleryful,
  Lessee,
  DeviceConfig,
  Head,
  Personnel,
  ScientificBuilding,
  LogisticsBuilding,
  BusinessBuilding,
  CollegePartyBuilding,
}
