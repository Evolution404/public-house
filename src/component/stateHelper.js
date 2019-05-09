let read = self=>{
  let name = self.props.location.pathname
  let state = JSON.parse(sessionStorage.getItem(name))
  if(state&&state.selected)
    state.selected=[]
  sessionStorage.removeItem(name)
  if(state)
    self.setState(state)
  return state
}

let write = self=>{
  let name = self.props.location.pathname
  sessionStorage.setItem(name, JSON.stringify(self.state))
}
let stateClear = ()=>{
  sessionStorage.clear()
}

export {read, write, stateClear}
