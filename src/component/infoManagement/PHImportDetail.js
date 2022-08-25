import React, {Component} from 'react'
import Map from '../../routerMap'
import {Upload, Button, Icon, message, Row, Col, Form} from 'antd';
import API from '../../api'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import {UsingNatureBrief } from '../common/usingNature'
import Back from '../common/back'
import moban from '../mobaninfo'

const Item = Form.Item

class Import extends Component{
  state = {
    fileList: [],
    uploading: false,
    leixing: '',
  }

  handleUpload = () => {
    this.props.form.validateFields((err, values)=>{
      if(err)return
      const { fileList } = this.state;
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append('file', file);
      })
      formData.append('leixing', values.usingNature)
      this.setState({
        uploading: true,
      })
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
        })
        if(!err.resolved)
          message.error('上传失败');
      })
    })
  }
  usingNatureChange = (v)=>{
    this.setState({leixing: v})
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
    const {getFieldDecorator} = this.props.form
    let a, leixing = this.state.leixing
    switch(leixing){
      case "1":
        a= <a download href={moban('keyan')}>导入模板下载</a>
        break;
      case "2":
        a= <a download href={moban('houqinbaozhanggonggong')}>导入模板下载</a>
        break;
      case "3":
        a= <a download href={moban('chanyeshangye')}>导入模板下载</a>
        break;
      case "4":
        a= <a download href={moban('xueyuandangzhengjiguan')}>导入模板下载</a>
        break;
      default:
        a= <a href={'#'+Map.PHImportDetail.path}>下载模板请先选择类型</a>
    }
    return (
      <div style={{margin: '20px 0'}}>
        <h3>{this.props.text}</h3>
        <Form>
          <Row style={{marginTop: 15}}>
            <Col span={8}>
              <Item labelCol={{span:10}} wrapperCol={{span:10}} label='房屋类型'>
                {
                  getFieldDecorator('usingNature',{
                    rules: [{required: true, message:'请选择房屋类型'}]
                  })(
                    <UsingNatureBrief onChange={this.usingNatureChange}></UsingNatureBrief>
                  )
                }
              </Item>
            </Col>
            <Col offset={1} span={4}>
              <Upload {...props}>
                <Button>
                  <Icon type="upload" />选择文件
                </Button>
              </Upload>
            </Col>
            <Col span={4}>
              <Button
                type="primary"
                onClick={this.handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
              >
                {uploading ? '导入中' : '开始导入' }
              </Button>
            </Col>
            <Col style={{marginTop: 5}}>
              {a}
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

Import = Form.create({name: 'import'})(Import)

class PHImport extends Component{
  render(){
    let uploadInfo = {
      uploadHelper: API.ULPHDetail,
      templateLink: '',
    }
    return <MainContainer name="公用房管理">
      <Row>
        <Col span={2}>
          <Back></Back>
        </Col>
        <Col span={10}>
          <h2 style={{textAlign:'right'}}>导入房屋信息</h2>
        </Col>
      </Row>
      <Split></Split>
      <Row>
        <Col>
          <Import {...uploadInfo}></Import>
        </Col>
      </Row>
    </MainContainer>
  }
}

export default PHImport
