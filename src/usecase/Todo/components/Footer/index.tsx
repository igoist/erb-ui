import * as React from 'react';
import Todos from '../../store/todos';

const { useContext } = React;


const Footer = () => {
  const { state: todos, dispatch } = useContext(Todos.Context);


  return (
    <div>
      Footer!!!!!!!
      <ul>
        {todos.map(item => {
          return (
            <li key={ item.id }>
              { item.text }
              <button onClick={ () => dispatch({ type: 'DELETE', payload: item }) }>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Footer;
