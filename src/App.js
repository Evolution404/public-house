import React, {Component} from 'react'
import { hot } from 'react-hot-loader'
import {
  Redirect,
  HashRouter as Router,
  Route,
} from "react-router-dom";
import {stateClear} from './component/stateHelper'
import Header from './component/common/header'
import Navigation from './component/common/navigation'
import RouterMap from './routerMap'
import { LocaleProvider, Spin } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment'
import API, {wrapper} from './api'
import 'moment/locale/zh-cn'
import 'antd/dist/antd.css'
import './index.css'
moment.locale('zh-cn')

class App extends Component{
  state = {
    isLogined: false,
    navData: [],
    userData: {},
    mobaninfo: {},
    loading: true,
  }
  // 设置持久化数据
  // token, userData, token
  setPersistentData = ()=>{
    localStorage.setItem('x-auth-token', this.state.userData.token)
    localStorage.setItem('navData', JSON.stringify(this.state.navData))
    localStorage.setItem('userData', JSON.stringify(this.state.userData))
    localStorage.setItem('mobaninfo', JSON.stringify(this.state.mobaninfo))
  }
  getPersistentData = ()=>{
    return {
      token: localStorage.getItem('x-auth-token'),
      navData: JSON.parse(localStorage.getItem('navData')),
      userData: JSON.parse(localStorage.getItem('userData')),
      mobaninfo: JSON.parse(localStorage.getItem('mobaninfo')),
    }
  }
  clearPersistenData = ()=>{
    localStorage.removeItem('x-auth-token')
    localStorage.removeItem('navData')
    localStorage.removeItem('userData')
    localStorage.removeItem('mobaninfo')
    stateClear()
    this.setState({isLogined: false})
  }
  login = (rs)=>{
    this.setState(rs,()=>{
      this.setPersistentData()
      this.setState({isLogined: true})
    })
  }
  isLoginedCheck = async ()=>{
    let {token, navData, userData, mobaninfo} = this.getPersistentData()
    // 数据不完整, 表示未登陆
    if(!(token&&navData&&userData&&mobaninfo))
      return false
    this.setState(this.getPersistentData())
    // TODO 对token进行有效性验证
    let [err] = await wrapper(API.tgetDepts('0'))
    if(err)
      return false
    return true
  }
  async componentWillMount(){
    if(await this.isLoginedCheck()){
      this.setState({isLogined: true})
      let persistentData = this.getPersistentData()
      this.setState(persistentData)
    }else{
      this.clearPersistenData()
    }
    this.setState({loading: false})
  }
  render(){
    let node
    if(this.state.isLogined){
      let routerList = []
      for (let key in RouterMap){
        let router =
          <Route exact key={key}
            path={RouterMap[key].path}
            component={RouterMap[key].component} />
        routerList.push(router)
      }
      node = (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Router>
          <div style={{flex:1}}>
            <Header getPersistentData={this.getPersistentData} clear={this.clearPersistenData}
            name={this.state.userData.userName}/>
          </div>
          <div style={{display: 'flex'}}>
            <div style={{flex:.3, maxWidth: 280}}>
              <Navigation data={this.state.navData} />
            </div>
            <div style={{
              margin: "25px 2%",
              flex:1,
            }}>
                <div>
                  <Route exact path='/'
                    render={()=>(<Redirect  to={RouterMap.MyPH.path} />)}></Route>
                  
                  {routerList}
                </div>
            </div>
          </div>
            </Router>
        </div>
      )

    }else{
      let Login = RouterMap.Login.component
      node = <Login login={this.login}></Login>
    }
    return <Spin spinning={this.state.loading} tip="加载中">{node}</Spin>
  }
}
function LocalApp(){
  return <LocaleProvider locale={zh_CN}><App /></LocaleProvider>
}
export default hot(module)(LocalApp)
