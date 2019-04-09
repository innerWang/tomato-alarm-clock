import { createBrowserHistory  as createHistory } from 'history';

const ENV = process.env.NODE_ENV;
let publicUrl = '';
if(ENV === 'development'){
  publicUrl ='/';
}else if(ENV === 'production'){
  publicUrl = '/tomato-alarm-clock';
}

export default createHistory({
  basename: publicUrl
});