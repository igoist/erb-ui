import * as React from 'react';
import Todos from '../../store/todos/';

const { useState, useContext, useEffect } = React;

console.log('11111111: ', Todos, Todos.Context);

const useNewTodoState = () => {
  const [newTodoState, setNewTodoState] = useState('');

  return {
    newTodoState,
    setNewTodoState
  };
};

const List = (props) => {
  const { state: todos, dispatch } = useContext(Todos.Context);

  const { newTodoState, setNewTodoState } = useNewTodoState();

  console.log('props in List: ', props);

  useEffect(() => {
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        dispatch({ type: 'ADD', payload: Math.random() });
      }, i * 50);
    }
  }, []);

  const handleChange = (e) => {
    setNewTodoState(e.target.value);
  };

  const handleClick = () => {
    dispatch({ type: 'ADD', payload: newTodoState });
    setNewTodoState('');
  };

  return (
    <div>
      <h1>To Do List:</h1>
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
      <input type='text' value={ newTodoState } onChange={ handleChange } />
      <button onClick={ handleClick }>Add Item</button>
    </div>
  );
};

export default List;
