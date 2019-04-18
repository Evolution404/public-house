import {host} from '../../api/apiConfig'

export default (link)=>{
  let downloadElement = document.createElement('a')
  let href = host+link
  downloadElement.href = href;
  document.body.appendChild(downloadElement)
  downloadElement.click()
  document.body.removeChild(downloadElement)
}
