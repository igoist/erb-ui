import * as React from 'react';

const { useReducer } = React;

type StateProps = {
  state?: any;
  dispatch?: any;
}

let t: StateProps = {};

import reducer, { initState } from './reducer';

const Context = React.createContext(t);

const Provider = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      { props.children }
    </Context.Provider>
  );
};

export default { Context, Provider };
