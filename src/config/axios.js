/** 
 * axios 是一个基于promise的HTTP库，可以用在浏览器和 node.js中
*/
import axios from 'axios';
import history from './history';

//const appname = "innerwang";
const appID = "MNfCKaMASVLM9FtTfZhbTbDr";
const appSecret = "N1JyRcHLuuZR7MQ5Lc16Qh98";

//创建一个 axios实例
const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  headers: {
    't-app-id': appID,
    't-app-secret': appSecret
  }
})

// interceptor 拦截器 在请求或响应被 then 或 catch 处理前拦截他们
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  //token 存在 localstorage中
  // 在发送请求前做些什么
  const xToken = localStorage.getItem('x-token');
  if(xToken){
    config.headers['Authorization'] = `Bearer ${xToken}`
  }

  return config;
}, function (error) {
  console.log(error)
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  if(response.headers['x-token']){
    localStorage.setItem('x-token',response.headers['x-token'])
  }
  return response;
}, function (error) {
  console.log(error.response)
  // 响应错误处理
  if(error.response.status === 401){
    console.log('响应错误，未授权，重定向....')
    history.push('/login');
  }else if(error.response.status === 422){
    //alert('账号或密码错误')
    //history.push('/login');
  }

  return Promise.reject(error);
});

export default instance;