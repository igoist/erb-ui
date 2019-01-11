import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import '../dist/css/main.css';

import {
  HashRouter as Router
} from 'react-router-dom';

import { Menu, Routes } from './router';

const handleMenuBtnClick = () => {
  document.body.classList.toggle('nav-opened');
};

ReactDOM.render(
  <AppContainer>
    <Router>
      <div>
        <Menu />
        <a className='menuBtn' onClick={ handleMenuBtnClick }>
          <del className='bar'></del>
          <del className='bar'></del>
          <del className='bar'></del>
        </a>
        <Routes />
      </div>
    </Router>
  </AppContainer>,
  document.getElementById('app')
);


if (module.hot) {
  module.hot.accept();
}
