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
  render(){
    let routerList = []
    for (let key in RouterMap){
      let router = <Route exact key={key} path={RouterMap[key].path} component={RouterMap[key].component} />
      routerList.push(router)
    }
    return (
      <div>
        <Header name="张三"/>
        <div style={{float: "left"}}>
          <Navigation style={{float: "left"}}/>
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
  }
}
export default hot(module)(App)
