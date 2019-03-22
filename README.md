1. 使用 history 包 以及 Router 组件控制URL 

2. 使用 axios 库，发送ajax请求

[axios](https://github.com/axios/axios)

3. 使用 classnames 库 ，提供动态css样式功能

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

4. ES6 class的取值函数(getter)和存值函数(setter)
使用 get 和 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。


5. 使用Hooks 与 setInterval的问题

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


