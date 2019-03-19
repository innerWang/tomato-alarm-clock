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

