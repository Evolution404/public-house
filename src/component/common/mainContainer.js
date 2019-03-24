import React, {Component} from 'react'
import css from '../../cssConfig'

class MainContainer extends Component{
  render(){
    return <div>
      <div style={{width: "114px",
        height: "37px",
        backgroundColor: "rgba(0, 153, 0, 1)",
        ...css.borderDeep,
        ...css.commonFontStyle,
        fontSize: "13px",
        lineHeight: "37px",
        textAlign: "center",
        marginLeft: "20px",
        boxSizing: "border-box",
      }}>{this.props.name}</div>
      <div style={{backgroundColor: "#f8fdfd",
        ...css.borderLight,
      }}>
        <div style={{paddingLeft: "20px",
          paddingTop: "10px",
          fontSize: "14px",
          fontWeight: "400",
          color: "#333",
        }}>
          {this.props.children}
        </div>
      </div>
    </div>
  }
}
export default MainContainer
