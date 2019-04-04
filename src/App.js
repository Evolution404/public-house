import React, {Component} from 'react'
import { hot } from 'react-hot-loader'
import {
  HashRouter as Router,
  Route,
} from "react-router-dom";
import Header from './component/common/header'
import Navigation from './component/common/navigation'
import RouterMap from './routerMap'
import 'antd/dist/antd.css'
import './index.css'

class App extends Component{
  state = {
    isLogined: false,
    navData: [],
    userData: {},
  }
  // 设置持久化数据
  // token, userData, token
  setPersistentData = ()=>{
    localStorage.setItem('x-auth-token', this.state.userData.token)
    localStorage.setItem('navData', JSON.stringify(this.state.navData))
    localStorage.setItem('userData', JSON.stringify(this.state.userData))
  }
  getPersistentData = ()=>{
    return {
      token: localStorage.getItem('x-auth-token'),
      navData: JSON.parse(localStorage.getItem('navData')),
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  }
  clearPersistenData = ()=>{
    localStorage.removeItem('x-auth-token')
    localStorage.removeItem('navData')
    localStorage.removeItem('userData')
    this.setState({isLogined: false})
  }
  login = ({navData, userData})=>{
    this.setState({isLogined: true, navData, userData})
    this.setPersistentData()
  }
  isLoginedCheck = ()=>{
    let {token, navData, userData} = this.getPersistentData()
    // 数据不完整, 表示未登陆
    if(!(token&&navData&&userData))
      return false

    // TODO 对token进行有效性验证
    return true
  }
  componentWillMount(){
    if(this.isLoginedCheck()){
      this.setState({isLogined: true})
      let persistentData = this.getPersistentData()
      this.setState(persistentData)
    }
  }
  render(){
    if(this.state.isLogined){
      let routerList = []
      for (let key in RouterMap){
        let router =
          <Route exact key={key}
            path={RouterMap[key].path}
            component={RouterMap[key].component} />
        routerList.push(router)
      }
      return (
        <div>
          <Header getPersistentData={this.getPersistentData} clear={this.clearPersistenData}
            name={this.state.userData.userName}/>
          <div style={{float: "left"}}>
            <Navigation data={this.state.navData} style={{float: "left"}}/>
          </div>
          <div style={{float: "left",
            margin: "25px",
            width: '78%',
          }}>
            <Router>
              <div>
                {routerList}
              </div>
            </Router>
          </div>
        </div>
      )

    }else{
      let Login = RouterMap.Login.component
      return <Login login={this.login}></Login>
    }
  }
}
export default hot(module)(App)
