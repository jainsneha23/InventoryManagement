import React from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory, IndexRoute  } from 'react-router';

import App from './pages/app';
import Home from './pages/home';
import Product from './pages/product';
import Customer from './pages/customer';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

render((
   <Router history = {browserHistory}>
      <Route path = "/" component = {App}>
         <IndexRoute component = {Home} />
         <Route path = "product" component = {Product} />
         <Route path = "customer" component = {Customer} />
      </Route>
   </Router>
), document.getElementById('app'));
