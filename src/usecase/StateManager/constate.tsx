import * as React from 'react';
import createUseContext from 'constate';

const { useState } = React;

console.log(createUseContext);

const useP = () => {
  const [p, setP] = useState({
    color: '#cccfff',
    x: 1233232,
    arr: []
  });
  const changeColorOfP = (newColor: string) => setP((prev) => ({ ...prev, color: newColor }));
  const setPBlack = () => setP((prev) => ({ ...prev, color: '#000' }));
  const toggleBlack = () => setP(prev => ({ ...prev, color: prev.color === '#000' ? '#cccfff' : '#000' }));
  const addIntoArr = () => setP(prev => ({ ...prev, arr: [...prev.arr, 1.2] }));

  // const [p, setP] = useState('#cccfff');
  // const changeColorOfP = (newColor: string) => setP((prev) => newColor);
  // const setPBlack = () => setP(() => '#000');
  // const toggleBlack = () => setP(prev => '#000');

  return { p, addIntoArr, changeColorOfP, setPBlack, toggleBlack };
};

const usePContext = createUseContext(useP);

const P = () => {
  const { p } = usePContext();

  console.log('here: ', p);
  console.log('here: ', p.color);

  return (
    <div
      style={{
        border: '1px solid #f00',
        width: '200px',
        height: '200px',
        backgroundColor: p.color
      }}
    >
      {
        p.arr.map((i, index) => {
          return (<div key={ index.toString() }>{ i }</div>);
        })
      }
    </div>
  );
};

const PButton = () => {
  const { toggleBlack } = usePContext();

  return (
    <button onClick={ toggleBlack }>
      sdsdsds
    </button>
  );
};

const PAddButton = () => {
  const { addIntoArr } = usePContext();

  return (
    <button onClick={ addIntoArr }>
      AddIntoP
    </button>
  );
};

const Box = (props: any) => {
  return (
    <div className='m-box'>
      { props.children }
    </div>
  );
};

const useC = () => {
  const [c, setC] = useState(0);
  const increment = () => setC(prev => prev + 1);
  return { c, increment };
};

const useCContext = createUseContext(useC);

const Button = () => {
  const { increment } = useCContext();
  return <button onClick={ increment }>+</button>
};

const Counter = () => {
  const { c } = useCContext();

  console.log(c);

  return <span>{ c }</span>
}

const Boxes = () => {
  return (
    <div className='m-boxes'>
      <Box>
        <useCContext.Provider>
          <Counter />
          <Button />
        </useCContext.Provider>
      </Box>
      <Box>
        <usePContext.Provider>
          <P />
          <PButton />
          <PAddButton />
        </usePContext.Provider>
      </Box>
    </div>
  );
};

export default Boxes;
