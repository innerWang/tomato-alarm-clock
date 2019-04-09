### 1. 使用 history 包 以及 Router 组件控制URL 

react-router 在4.x版本后已经将自带的history独立成一个history 模块了.

[history](https://github.com/ReactTraining/history)
[API-history](https://reacttraining.com/react-router/core/api/history)

history会知道如何监听浏览器地址栏的变化，解析url转化为location对象，然后router使用它匹配到路由，最后可以正确地渲染对应的组件。

#### 1.1 createBrowserHistory
Browser history是由react Router创建浏览器应用推荐的history，主要使用了HTML5的history API.


### 2. 使用 axios 库，发送ajax请求

[axios](https://github.com/axios/axios)

axios是一个可用在浏览器和node.js中的基于promise的HTTP库。
#### 2.1. 特性如下：
* 在浏览器中创建 XMLHttpRequest对象
* 在node.js中创建 http请求
* 支持 Promise API
* 拦截请求和响应
* 转换请求和响应数据
* 取消请求
* 自动转换JSON数据
* 客户端支持XSRF(CSRF 跨站请求伪造)防御

#### 2.2. 使用
##### 2.2.1 `axios.create([config])`创建一个实例
```js
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```
##### 2.2.2 实例对应的方法
* `instance.request(config)`
* `instance.get(url[, config])`  /  `instance.delete(url[, config])` / `instance.head(url[, config])` / `instance.option(url[, config])`
* `instance.post(url[, data[, config]])` /`instance.put(url[, data[, config]])` / `instance.patch(url[, data[, config]])`
* `instance.getUri([config])`

##### 2.2.3 使用拦截器 Interceptors
可以在请求或响应在被then或者catch处理之前拦截他们。

```js
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
```



### 3. 使用 classnames 库 ，提供动态css样式功能

```js
  import classNames from 'classnames';

  const itemClass = classNames({
      'todoItem': true,
      'editEnable':this.props.editEnable,
      'completed': this.props.completed,
      'deleted': this.props.deleted
    });

   <div id="todoItem" className={itemClass}>xxxxx</div>
```

### 4. ES6 class的取值函数(getter)和存值函数(setter)
使用 get 和 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。


### 5. 使用Hooks 与 setInterval的问题

先看一个示例
```js
let id = setInterval(()=>console.log(1),1000);console.log('first id: '+ id);
id = setInterval(()=>console.log(2),1000);console.log('second id: '+ id);

// clearInterval(id)
```

上述代码会产生两个定时器，当调用clearInterval时，只能清掉后创建的定时器。

在函数组件中，使用useEffect时，传给这个钩子函数的函数会在组件每次render之后被调用。

```js
function App(){
  const [time, setTime] = useState(5);
  const id = setInterval(()=>{
    setTime(time-1);
  },1000)
  console.log(id)
  return (<div>{time}</div>);
}
```
上述代码中，会看到time在变，同时也在不停的打印id, 说明不停的新建了定时器，原因在于time发生了改变，然后函数组件会重新渲染，然后函数组件内部的代码会重新执行一遍，则会不停的新建定时器；

所以将这套代码放到 useEffect中，并返回清除定时器的代码，time的更新引发函数组件重新渲染，函数组件会先unmount再mount，(注意，与类组件不同，类组件不会卸载，因为类组件渲染调用的是 this.render())，unmount时会调用返回的 clearInterval，则每次页面也就只有一个定时器了。
```js
function App(){
  const [time, setTime] = useState(5);
  useEffect(()=>{
    const id = setInterval(()=>{
      setTime(time-1);
      if(time<0){
        clearInterval(id)
      }
    },1000)
    return ()=> clearInterval(id)
  })

  return (<div>{time <0 ?0 time}</div>);
}
```
但是需要注意的是，unmount再mount的次数多了，会导致时间误差较大。


### 6. lodash 

[lodash ：一个JavaScript的实用工具库](http://lodash.think2011.net/)

```js
// 安装
yarn add lodash
```
1. _.groupBy : 返回一个对象，会将传入的数组进行分组，key为iteratee的处理结果，value是产生key的元素数组。


### 7. JavaScript的日期库
1. [date-fns](https://date-fns.org/docs/Getting-Started) : 轻量级，类似日期版的lodash.

```js
// 安装
yarn add date-fns
```
使用 format 对日期进行格式化，或者其他的函数对日期进行处理。

2. Moment.js


### 8. setState的执行机制
在react的生命周期和合并事件(_processPendingState())中，react仍处于更新机制。此时无论调用多少次setState，都不会执行更新，而是将要更新的state存入 _pendingStateQueue，将要更新的组件存入dirtyComponent。

由执行机制来看，setState本身并不是异步的，而是如果在调用setState时，若react正处于更新过程，则当前更新会被暂存，等上一次更新执行后再执行，给人一种异步的假象。

根据JS的异步机制，会将异步函数先暂存，等所有的同步代码都执行完毕再执行，即若使用了setInterval，则其回调函数会在上一次更新已经执行完毕时执行，此时若在回调中调用setState，则会立刻更新结果，执行渲染。


### 9. 部署
使用 gh-pages, 部署完成后线上仓库会多出一个gh-pages分支，里面存放的是我们打包编译完成之后的静态文件。
