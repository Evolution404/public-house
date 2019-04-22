import React, {Component} from 'react'
import {Empty,Input, Button,Form, Row, Col, message, Modal, Select, InputNumber, Upload, Icon} from 'antd'
import {SButton} from '../common/button'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Table, {TableUtil}from '../common/table'
import { YearSelect } from '../common/select'
import API from '../../api'
const Item = Form.Item
const confirm = Modal.confirm;
const Option = Select.Option

class DisplayLabel extends Component{
  render(){
    return (
      <div style={{padding: '5px 0', fontWeight: '700'}}>
        <Row>
          <Col span={10}>{this.props.label}</Col>
          <Col span={10}>{this.props.value}</Col>
        </Row>
      </div>
    )
  }
}

class Search extends Component{
  handleSubmit = (e) => {
    let self = this
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        self.props.onSearch(values)
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
        <Row>
          <Col span={7}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="部门性质">
              {getFieldDecorator('type',{
                rules:[{required:true, message:'请选择部门性质'}]})(
                <Select placeholder="请选择部门性质">
                  <Option value="xy">学院</Option>
                  <Option value="bc">部处</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col span={7}>
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="部门名称">
              {getFieldDecorator('dept',)(
                <Input/>
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
const WrappedSearch = Form.create({ name: 'search' })(Search)

class ButtonGroup extends Component{
  render(){
    return (
      <Row style={{margin: '20px 0'}}>
        <Col span={13}>
          <Col offset={1} span={4}><Button block onClick={this.props.onAdd} type="primary">+新增</Button></Col>
          <Col offset={1} span={4}><Button block onClick={this.props.onDelete.bind(this, -1)} type="primary">X删除</Button></Col>
          <Col offset={1} span={4}><Button block onClick={this.props.onImport} type="primary">从文件导入</Button></Col>
        </Col>
      </Row>
    )
  }
}

class DisplayTable extends Component{
  render(){
    let type = this.props.type
    let columns = []
    if(type==='bc'){
      columns = [
        {
          title: '序号',
          dataIndex: 'id',
        },
        {
          title: '年份',
          dataIndex: 'year',
        },
        {
          title: '部门',
          dataIndex: 'dept',
        },
        {
          title: '副校级(正局级)',
          dataIndex: 'zj',
        },
        {
          title: '副校级(副局级)',
          dataIndex: 'fj',
        },
        {
          title: '正处级',
          dataIndex: 'zc',
        },
        {
          title: '副处级',
          dataIndex: 'fc',
        },
        /*{
          title: '处级以下',
          dataIndex: 'uc',
        },*/
        /*{
          title: '备注',
          dataIndex: 'note',
        },*/
      ]
    }else if(type==='xy'){
      columns = TableUtil.mapColumns([
        '序号', '年份', '部门', '本科生', '硕士', '博士', '博士后'
      ])
    }
    columns.push({
      title: '操作',
      render: (text, record, index)=>(
        <div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton onClick={this.props.delete.bind(this,index)} text='X删除'/>
          </div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton onClick={this.props.detail.bind(this,index)} text='详细'/>
          </div>
          <div style={{display: 'inline-block', padding: '0 10px'}}>
            <SButton onClick={this.props.update.bind(this,index)} text='更新'/>
          </div>
        </div>
      )

    })
    return <Table columns={columns} {...this.props}/>
  }
}

class DetailModal extends Component {
  hideModal = () => {
    this.props.close()
  }

  render() {
    let data = this.props.data
    // {
    //    dept(部门名称), zj(正局级), fj(副局级)
    //    zc(正处级), fc(副处级), uc(处级以下u-under)
    //    academician(院士), tT(高端人才, t-top T-talent)
    //    eT(优秀人才 e-excellent), zg(正高级), fg(副高级)
    //    middle(中级职称), other(其他职称), 
    //    undergraduate(本科生数), doctor(博士生数),
    //    masterDegree(硕士生数), postdoctoral(博士后数)
    // }
    let type = this.props.type
    let content=''
    if(type==='bc'){
      content = (<div>
        <Row><Col span={20} style={{textAlign: 'center'}}><h4>部处部门</h4></Col></Row>
        <Row><Col span={12}>
          <DisplayLabel label="部门名称" value={data.companyName}/>
        </Col></Row>
        <Row>
          <Col span={12}>
            <DisplayLabel label="副校级(正局级)" value={data.zj}/>
          </Col>
          <Col span={12}>
            <DisplayLabel label="副校级(副局级)" value={data.fj}/>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DisplayLabel label="正处级" value={data.zc}/>
          </Col>
          <Col span={12}>
            <DisplayLabel label="副处级" value={data.fc}/>
          </Col>
        </Row>
        <Row><Col span={12}>
          <DisplayLabel label="处级以下" value={data.uc}/>
        </Col></Row>
        <Row style={{padding: '5px 0', fontWeight: '700'}}>
          <Col span={5}>备注</Col>
          <Col span={19}>{data.note}</Col>
        </Row>
      </div>)
    }else if(type==='xy'){
      content = (<div>
        <Row><Col span={20} style={{textAlign: 'center'}}><h4>学院部门</h4></Col></Row>
        <Row>
          <Col span={12}>
            <DisplayLabel label="院士数" value={data.academician}/>
          </Col>
          <Col span={12}>
            <DisplayLabel label="高端人才" value={data.tT}/>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DisplayLabel label="优秀人才" value={data.eT}/>
          </Col>
          <Col span={12}>
            <DisplayLabel label="正高级职称" value={data.zg}/>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DisplayLabel label="副高级职称" value={data.fg}/>
          </Col>
          <Col span={12}>
            <DisplayLabel label="中级职称" value={data.middle}/>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DisplayLabel label="其他职称" value={data.other}/>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DisplayLabel label="本科生数" value={data.undergraduate}/>
          </Col>
          <Col span={12}>
            <DisplayLabel label="博士生数" value={data.doctor}/>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DisplayLabel label="硕士生数" value={data.masterDegree}/>
          </Col>
          <Col span={12}>
            <DisplayLabel label="博士后数" value={data.postdoctoral}/>
          </Col>
        </Row>

      </div>)
    }
    return (
      <Modal
        title="部门详细信息"
        width="500px"
        visible={this.props.visible}
        closable={false}
        footer={[
            <Button key='1' type="primary" onClick={this.hideModal}>确定</Button>
          ]}
      >
        {content}
      </Modal>
    )
  }
}
// {
//    dept(部门名称), zj(正局级), fj(副局级)
//    zc(正处级), fc(副处级), uc(处级以下u-under)
//    academician(院士), tT(高端人才, t-top T-talent)
//    eT(优秀人才 e-excellent), zg(正高级), fg(副高级)
//    middle(中级职称), other(其他职称), 
//    undergraduate(本科生数), doctor(博士生数),
//    masterDegree(硕士生数), postdoctoral(博士后数)
// }

class UpdateForm extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    let type = this.props.type
    let data = this.props.data
    let form = ''
    if(type==='bc'){
      form = (
        <Form labelAlign='left'>
          <Row style={{margin: '-20px 0'}}><Col>
            <Item labelCol={{span:4}} wrapperCol={{span:4}} label="年份">
              {getFieldDecorator('year',{initialValue: data.year})(
                <YearSelect></YearSelect>
              )}
            </Item>
          </Col></Row>
          <Row><Col style={{textAlign: 'center'}}>部处部门填写</Col></Row>
          <Row>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}} labelCol={{span:12}} wrapperCol={{span:12}} label="副校级(正局级)">
                {getFieldDecorator('zj',{initialValue: data.zj})(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}} labelCol={{span:12}} wrapperCol={{span:12}} label="副校级(副局级)">
                {getFieldDecorator('fj',{initialValue: data.fj})(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="正处级">
                {getFieldDecorator('zc',{initialValue: data.zc})(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="副处级">
                {getFieldDecorator('fc',{initialValue: data.fc})(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="处级以下">
                {getFieldDecorator('uc',{initialValue: data.uc})(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
          </Row>
        </Form>
      )
    }else if(type==='xy'){
      form = (
        <Form labelAlign='left'>
          <Row style={{margin: '-20px 0'}}><Col>
            <Item labelCol={{span:4}} wrapperCol={{span:4}} label="年份">
              {getFieldDecorator('year',{initialValue: data.year})(
                <YearSelect></YearSelect>
              )}
            </Item>
          </Col></Row>
          <Row><Col style={{textAlign: 'center'}}>学院部门填写</Col></Row>
          <Row>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="院士数">
                {getFieldDecorator('academician',{initialValue: data.academician})(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="高端人才">
                {getFieldDecorator('tT', {initialValue: data.tT})(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="优秀人才">
                {getFieldDecorator('eT', {initialValue: data.eT})(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="正高级职称">
                {getFieldDecorator('zg', {initialValue: data.zg})(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="副高级职称">
                {getFieldDecorator('fg', {initialValue: data.fg})(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="中级职称">
                {getFieldDecorator('middle',{initialValue: data.middle})(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="其他职称">
                {getFieldDecorator('other',{initialValue: data.other})(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="本科生数">
                {getFieldDecorator('undergraduate', {initialValue: data.undergraduate})(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="博士生数">
                {getFieldDecorator('doctor',{initialValue: data.doctor})(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="硕士生数">
                {getFieldDecorator('masterDegree', {initialValue: data.masterDegree})(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="博士后数">
                {getFieldDecorator('postdoctoral',{initialValue: data.postdoctoral})(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
          </Row>
        </Form>
      )
    }
    return form
  }
}
const WrappedUpdateForm = Form.create({ name: 'updateform' })(UpdateForm)


class UpdateModal extends Component {
  hideModal = () => {
    this.props.close()
  }
  update = ()=>{
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      console.log('Received values of form: ', values)
      let newData = {
        type: this.props.type,
        ...this.props.data,
        // other data
        ...values,
      }
      API.updateDept(newData)
      .then(()=>{
        message.success('更新成功')
        form.resetFields()
        this.hideModal()
        this.props.refresh()
      })
      .catch(err=>{
        console.log(err)
        message.error('更新失败')
      })
    })
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  render() {
    return (
      <Modal
        title="更新部门信息"
        width="600px"
        visible={this.props.visible}
        closable={false}
        onOk={this.update}
        onCancel={this.hideModal}
        okText="确定"
        cancelText="取消"
      >
        <WrappedUpdateForm
          data={this.props.data}
          type={this.props.type}
          wrappedComponentRef={this.saveFormRef}
        />
      </Modal>
    )
  }
}

class AddForm extends Component{
  render(){
    const { getFieldDecorator } = this.props.form
    let type = this.props.type
    let form = (
      <Form labelAlign='left'>
        <Row style={{margin: '-20px 0'}}><Col>
          <Item labelCol={{span:4}} wrapperCol={{span:4}} label="年份">
            {getFieldDecorator('year',{
              rules: [{required: true, message:'请选择年份'}]
            })(
              <YearSelect></YearSelect>
            )}
          </Item>
        </Col></Row>
        <Row>
          <Col offset={2} span={10}>
            <Item style={{marginBottom: '0px'}} labelCol={{span:12}} wrapperCol={{span:12}} label="部门名称">
              {getFieldDecorator('dept',{
                rules: [{required: true, message:'请输入部门名称'}]
              })(
                <Input size="small" />
              )}
            </Item>
          </Col>
          <Col offset={2} span={10}>
            <Item style={{marginBottom: '0px'}} labelCol={{span:12}} wrapperCol={{span:10}} label="部门性质">
              {getFieldDecorator('type',{
                rules: [{required: true, message:'请选择部门性质'}]
              })(
                <Select onChange={this.props.typeChange} size="small">
                  <Option value="xy">学院</Option>
                  <Option value="bc">部处</Option>
                </Select>
              )}
            </Item>
          </Col>
        </Row>
      </Form>
    )
    if(type==='bc'){
      form = (
        <Form labelAlign='left'>
        <Row style={{margin: '-20px 0'}}><Col>
          <Item labelCol={{span:4}} wrapperCol={{span:4}} label="年份">
            {getFieldDecorator('year',{
              rules: [{required: true, message:'请选择年份'}]
            })(
              <YearSelect></YearSelect>
            )}
          </Item>
        </Col></Row>
        <Row>
          <Col offset={2} span={10}>
            <Item style={{marginBottom: '0px'}} labelCol={{span:12}} wrapperCol={{span:12}} label="部门名称">
              {getFieldDecorator('dept',{
                rules: [{required: true, message:'请输入部门名称'}]
              })(
                <Input size="small" />
              )}
            </Item>
          </Col>
          <Col offset={2} span={10}>
            <Item style={{marginBottom: '0px'}} labelCol={{span:12}} wrapperCol={{span:10}} label="部门性质">
              {getFieldDecorator('type',{
                rules: [{required: true, message:'请选择部门性质'}]
              })(
                <Select onChange={this.props.typeChange} size="small">
                  <Option value="xy">学院</Option>
                  <Option value="bc">部处</Option>
                </Select>
              )}
            </Item>
          </Col>
        </Row>
          <Row><Col style={{textAlign: 'center'}}>部处部门填写</Col></Row>
          <Row>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}} labelCol={{span:12}} wrapperCol={{span:12}} label="副校级(正局级)">
                {getFieldDecorator('zj',)(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}} labelCol={{span:12}} wrapperCol={{span:12}} label="副校级(副局级)">
                {getFieldDecorator('fj',)(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="正处级">
                {getFieldDecorator('zc',)(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="副处级">
                {getFieldDecorator('fc',)(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="处级以下">
                {getFieldDecorator('uc',)(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={20}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:6}} wrapperCol={{span:18}} label="备注">
                {getFieldDecorator('note',)(
                  <Input size="small" />
                )}
              </Item>
            </Col>
          </Row>
        </Form>
      )
    }else if(type==='xy'){
      form = (
        <Form labelAlign='left'>
        <Row style={{margin: '-20px 0'}}><Col>
          <Item labelCol={{span:4}} wrapperCol={{span:4}} label="年份">
            {getFieldDecorator('year',{
              rules: [{required: true, message:'请选择年份'}]
            })(
              <YearSelect></YearSelect>
            )}
          </Item>
        </Col></Row>
        <Row>
          <Col offset={2} span={10}>
            <Item style={{marginBottom: '0px'}} labelCol={{span:12}} wrapperCol={{span:12}} label="部门名称">
              {getFieldDecorator('dept',{
                rules: [{required: true, message:'请输入部门名称'}]
              })(
                <Input size="small" />
              )}
            </Item>
          </Col>
          <Col offset={2} span={10}>
            <Item style={{marginBottom: '0px'}} labelCol={{span:12}} wrapperCol={{span:10}} label="部门性质">
              {getFieldDecorator('type',{
                rules: [{required: true, message:'请选择部门性质'}]
              })(
                <Select onChange={this.props.typeChange} size="small">
                  <Option value="xy">学院</Option>
                  <Option value="bc">部处</Option>
                </Select>
              )}
            </Item>
          </Col>
        </Row>
          <Row><Col style={{textAlign: 'center'}}>学院部门填写</Col></Row>
          <Row>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="院士数">
                {getFieldDecorator('academician',)(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="高端人才">
                {getFieldDecorator('tT',)(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="优秀人才">
                {getFieldDecorator('eT',)(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="正高级职称">
                {getFieldDecorator('zg',)(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="副高级职称">
                {getFieldDecorator('fg',)(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="中级职称">
                {getFieldDecorator('middle',)(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="其他职称">
                {getFieldDecorator('other',)(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="本科生数">
                {getFieldDecorator('undergraduate',)(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="博士生数">
                {getFieldDecorator('doctor',)(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="硕士生数">
                {getFieldDecorator('masterDegree',)(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
            <Col offset={2} span={10}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:12}} wrapperCol={{span:12}} label="博士后数">
                {getFieldDecorator('postdoctoral',)(
                  <InputNumber size="small" />
                )}
              </Item>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={20}>
              <Item style={{marginBottom: '0px'}}  labelCol={{span:6}} wrapperCol={{span:18}} label="备注">
                {getFieldDecorator('note',)(
                  <Input size="small" />
                )}
              </Item>
            </Col>
          </Row>
        </Form>
      )
    }
    return form
  }
}
const WrappedAddForm = Form.create({ name: 'addform' })(AddForm)

class AddModal extends Component {
  state = {
    type: '',
  }
  typeChange = (value)=>{
    this.setState({type: value})
  }
  hideModal = () => {
    this.setState({type: ''})
    this.formRef.props.form.resetFields()
    this.props.close()
  }
  add = ()=>{
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      console.log('Received values of form: ', values)
      API.addDept(values)
      .then(()=>{
        message.success('添加成功')
        form.resetFields()
        this.hideModal()
        this.setState({type: ''})
        this.formRef.props.form.resetFields()
      })
      .catch(err=>{
        console.log(err)
        message.error('添加失败')
      })
    })
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  render() {
    return (
      <Modal
        title="新增部门信息"
        width="600px"
        visible={this.props.visible}
        closable={false}
        onOk={this.add}
        onCancel={this.hideModal}
        okText="确定"
        cancelText="取消"
      >
        <WrappedAddForm type={this.state.type}
          typeChange={this.typeChange}
          wrappedComponentRef={this.saveFormRef}
        />
      </Modal>
    )
  }
}
class Import extends Component{
  state = {
    fileList: [],
    uploading: false,
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file);
    });

    this.setState({
      uploading: true,
    });
    this.props.uploadHelper(formData)
    .then(()=>{
      this.setState({
        fileList: [],
        uploading: false,
      });
      message.success('上传成功');
    })
    .catch(err=>{
      this.setState({
        uploading: false,
      });
      message.error('上传失败');
      if(err.response){
        message.error(err.response.data.title)
      }
    })
  }

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div style={{margin: '20px 0'}}>
        <h3>{this.props.text}</h3>
        <Row style={{marginTop: 15}}>
          <Col offset={1} span={8}>
            <Upload {...props}>
              <Button>
                <Icon type="upload" />选择文件
              </Button>
            </Upload>
          </Col>
          <Col span={8}>
            <Button
              type="primary"
              onClick={this.handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
            >
              {uploading ? '导入中' : '开始导入' }
            </Button>
          </Col>
          <Col style={{marginTop: 8}}>
            <a download href={this.props.templateLink}>导入模板下载</a>
          </Col>
        </Row>
      </div>
    );
  }
}

class ImportModal extends Component {
  state = {
    type: 'xy'
  }
  hideModal = () => {
    this.props.close()
  }
  typeChange = (type)=>{
    this.setState({type})
  }
  render() {
    let uploadInfo = {
      uploadHelper: this.state.type==='xy'?API.ULXYDept:API.ULBCDept,
      templateLink: '',
    }
    return (
      <Modal
        title="导入部门信息"
        width="600px"
        visible={this.props.visible}
        closable={false}
        onOk={this.hideModal}
        onCancel={this.hideModal}
        okText="确定"
        cancelText="取消"
      >
        <Row>
          <Col style={{marginTop: 5}} span={4}>部门性质:</Col>
          <Col span={12}>
            <Select onChange={this.typeChange} defaultValue='xy'>
              <Option value='xy'>学院</Option>
              <Option value='bc'>部处</Option>
            </Select>
          </Col>
        </Row>
        <Import {...uploadInfo}></Import>
      </Modal>
    )
  }
}

class DeptManagement extends Component{
  constructor(props){
    super(props)
    this.state = {
      dept: '',
      // xy学院,bc部处
      type: '',
      selected: [],
      tableList: [],
      tableLoading: false,
      detailmodal: {
        visible: false,
        data: {},
      },
      updatemodal: {
        visible: false,
        index: 0,
        data:{},
      },
      addmodal: {
        visible: false,
      },
      importmodal: {
        visible: false,
      },
    }
  }
  search = ({dept, type})=>{
    if(!type) // 保证type有值
      return
    this.setState({
      dept,
      type,
    })
    this.setState({tableLoading: true})
    API.searchDept({dept, type})
    .then(rs=>{
      this.setState({
        tableList: rs,
      })
    })
    .catch(err=>{
      console.log(err)
      message.error('搜索失败')
    })
    .finally(()=>this.setState({tableLoading: false}))
  }
  selectedChange = (newSelected)=>{
    this.setState({
      selected: newSelected
    })
  }
  // 删除条目处理函数
  delete = (index)=>{
    // 转换index为一个list
    // index大于等于0, 说明是删除单条记录 index不变
    // index为-1 说明是删除多条记录, 从state中取到被选中的数据
    index = index===-1?this.state.selected:[index]
    index = index.map(i=>this.state.tableList[i].id)
    let self = this
    confirm({
      title: '删除部门信息',
      content: '删除操作会造成单位信息丢失，您确定要删除单位信息吗？',
      okText:"确认",
      cancelText:"取消",
      onOk() {
        if(self.state.type.length===0)
          return
        return API.deleteDept({index, type: self.state.type})
        .then(()=>{
          message.success('删除成功')
          self.refresh()
        })
        .catch(err=>{
          console.log(err)
          message.error('删除失败')
        })
      },
      onCancel() {},
    });
  }
  closeDetailModal = ()=>{
    this.setState({detailmodal: {visible: false, data:{}}})
  }
  closeUpdateModal = ()=>{
    this.setState({updatemodal: {visible: false, index:0, data:{}}})
  }
  closeAddModal = ()=>{
    this.setState({addmodal: {visible: false}})
  }
  closeImportModal = ()=>{
    this.setState({importmodal: {visible: false}})
  }
  detail = index=>{
    this.setState({detailmodal: {visible: true, data:this.state.tableList[index]}})
  }
  update = index=>{
    let id = this.state.tableList[index].id
    this.setState({updatemodal: {visible: true, id,
                  data: this.state.tableList[index]}})
  }
  add = ()=>{
    this.setState({addmodal: {visible: true}})
  }
  openImport = ()=>{
    this.setState({importmodal: {visible: true}})
  }
  refresh = ()=>{
    this.setState({tableLoading: true})
    API.searchDept({dept:this.state.dept, type: this.state.type})
    .then(rs=>{
      this.setState({tableList: rs})
    })
    .catch(err=>{
      console.log(err)
    })
    .finally(()=>this.setState({tableLoading: false}))
  }
  render(){
    let tableHelper = {
      delete: this.delete,
      detail: this.detail,
      update: this.update,
    }
    return <MainContainer name="部门管理">
      部门管理
      <WrappedSearch onSearch={this.search}/>
      <Split/>
      <ButtonGroup onAdd={this.add} onDelete={this.delete} onImport={this.openImport}/>
      <Row>
        <Col span={22}>
          {
            this.state.type.length>0?(
              <DisplayTable
                loading={this.state.tableLoading}
                type={this.state.type}
                data={this.state.tableList}
                onSelectedChange={this.selectedChange} {...tableHelper}/>
            ):(
              <Empty description="请先搜索"></Empty>
            )
          }
        </Col>
      </Row>
      <DetailModal type={this.state.type} {...this.state.detailmodal} close={this.closeDetailModal}/>
      <UpdateModal refresh={this.refresh} type={this.state.type} {...this.state.updatemodal} close={this.closeUpdateModal}/>
      <AddModal {...this.state.addmodal} close={this.closeAddModal}/>
      <ImportModal {...this.state.importmodal} close={this.closeImportModal}/>
    </MainContainer>
  }
}

export default DeptManagement
