export default (key)=>{
  return JSON.parse(localStorage.getItem('mobaninfo'))[key]
}
