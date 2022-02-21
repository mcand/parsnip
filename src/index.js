import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import tasks from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  tasks,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
        </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

/*
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <Provider store={store}><NextApp /></Provider>,
      document.getElementById('root')
    );
  });

  module.hot.accecpt('./reducers', () => {
    const nextRootReducer = require('./reducers').default;
    store.replacecReducer(nextRootReducer);
  });
}
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
