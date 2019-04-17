import React, {Component} from 'react'
import {Upload, Button, Icon, message, Row, Col, Form} from 'antd';
import API from '../../api'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import {UsingNatureBrief } from '../common/usingNature'

const Item = Form.Item

class Import extends Component{
  state = {
    fileList: [],
    uploading: false,
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
        message.error('上传失败');
        if(err.response)
          message.error(err.response.data.detail)
      })
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
    const {getFieldDecorator} = this.props.form
    return (
      <div style={{margin: '20px 0'}}>
        <h3>{this.props.text}</h3>
        <Form>
          <Row style={{marginTop: 15}}>
            <Col span={8}>
              <Item labelCol={{span:10}} wrapperCol={{span:10}} label='使用性质'>
                {
                  getFieldDecorator('usingNature',{
                    rules: [{required: true, message:'请选择使用性质'}]
                  })(
                    <UsingNatureBrief></UsingNatureBrief>
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
              <a download href={this.props.templateLink}>导入模板下载</a>
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
      基本信息/导入公用房信息
      <h2 style={{textAlign:'center'}}>导入公用房信息</h2>
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
