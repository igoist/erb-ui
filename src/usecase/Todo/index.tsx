import * as React from 'react';

import Provider from './store/provider';
import Header from './components/Header/';
import Footer from './components/Footer/';
import Todos from './pages/Todos';

const Todo = () => {
  return (
    <Provider>
      <Header />
      <Todos />
      <Footer />
    </Provider>
  );
};

export default Todo;
