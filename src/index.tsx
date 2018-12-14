import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import { AppContainer } from 'react-hot-loader';
import '../dist/css/main.css';


ReactDOM.render(
  <AppContainer>
    <App compiler='aaa' framework='bb22333' />
  </AppContainer>,
  document.getElementById('app')
);


if (module.hot) {
  module.hot.accept();
}
