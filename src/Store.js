import {createStore} from 'redux';

import {reducer} from './todos';

export default createStore(reducer);