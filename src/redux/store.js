import {applyMiddleware, createStore, compose} from 'redux';
import * as reduxLoop from 'redux-loop';

import middleware from './middleware';
import reducer from './reducer';

const enhancer = compose(
  applyMiddleware(...middleware),
  reduxLoop.install()
);

// create the store
// TIP: a module can return a function or it can return an object.
// When say module A exports an object and modules B and C import (require) A, 
// they both have a reference to the same object
// TIP: It is kind of creating a globle singlton object after import this file
const store = createStore(
  reducer,
  null,
  enhancer
);

export default store;
