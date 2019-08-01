import * as React from 'react';
import { useOvermind } from './model';

const Button = (props: any) => {
  // console.log('init btn: ', props);
  return (
    <button
      style={{
        padding: '0 10px'
      }}
      onClick={ props.onClick }
    >
      { props.children }
    </button>
  )
}

const Count = () => {
  const { state, actions } = useOvermind()

  console.log(useOvermind());

  return (
    <div>
      <Button onClick={() => actions.decreaseCount()}>-</Button>
      { state.count + 1 }
      <Button onClick={() => actions.increaseCount()}>+</Button>
      <Button onClick={() => actions.resetRandomCount()}>?</Button>
      <div>
        {
          state.pins.arr.map((i: any, index: number) => {
            return (<div key={ index.toString() }>{ i }</div>);
          })
        }
      </div>
      <Button onClick={() => actions.addPins()}>AddPins</Button>
      { state.pins.name  }
      <Button onClick={() => actions.setRandomName()}>SetRandomName</Button>
      <button
        style={{
          padding: '0 19px',
          backgroundColor: '#333',
          color: '#fff'
        }}
        onClick={() => actions.setRandomName()}
      >SetRandomName2</button>
    </div>
  )
}

export default Count;
