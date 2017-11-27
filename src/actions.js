import Cookies from 'js-cookie'

const parseResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  } else {
    return response.text().then((body) => {
      let error = new Error(body)
      throw error
    })
  }
}

export const login = () => fetch('/login', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Basic ' + btoa('admin' + ':' + 'admin')
  },
  credentials: 'include', //important! The tells the browser to send cookies along with the request
  body: JSON.stringify({
    username: 'admin',
    password: 'admin'
  })
})
  .then(parseResponse)
  .then(response => console.log("response", response))

export const logout = () => {
  Cookies.remove('connect.sid')
}

export const test = () => fetch('/test', {
  method: 'get',
  credentials: 'include'  //important! The tells the browser to send cookies along with the request
})
  .then(parseResponse)
  .then(response => console.log("test", response))