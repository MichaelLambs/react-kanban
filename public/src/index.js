import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';

import { Router } from 'react-router-dom'
import history from './history'

import registerServiceWorker from './registerServiceWorker';

import store from './store'

ReactDOM.render(
    <Provider store={store}>
            <App />
    </Provider>,
document.getElementById('root'));
registerServiceWorker();
