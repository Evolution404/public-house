import React, {Component} from 'react'
import {Select, Button, Form, Row, Col} from 'antd'
import MainContainer from '../common/mainContainer'
import Split from '../common/split'
import Zmage from 'react-zmage'
const Item = Form.Item
const Option = Select.Option

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
            <Item labelCol={{span:10}} wrapperCol={{span:14}} label="楼宇名称">
              {getFieldDecorator('buildingName',)(
                <Select>
                  <Option value="研究院">研究院</Option>
                </Select>
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
              <Zmage style={imgStyle} src={item.src} alt="加载失败"></Zmage>
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
    imgData: [
      {
        text: '楼层1',
        src: 'https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg',
      },
      {
        text: '楼层1',
        src: 'https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg',
      },
      {
        text: '楼层1',
        src: 'https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg',
      },
      {
        text: '楼层1',
        src: 'https://ws3.sinaimg.cn/large/006tKfTcly1g1kuay0luwj30ss0hugoa.jpg',
      },
    ],
  }
  search = ({buildingName})=>{
    this.setState({
      buildingName,
    })
  }
  render(){
    return <MainContainer name="统计查询">
      <WrappedSearch onSearch={this.search}/>
      <Split/>
      <ImgDisplay data={this.state.imgData}></ImgDisplay>
    </MainContainer>
  }
}

export default BuildingQuery
