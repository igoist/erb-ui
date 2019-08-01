import * as React from 'react';

import './style.css';

interface PinProps {
  id: number,
  top: number,
  left: number,
  height: number,
  bgColor: string,
}

// const getRandomColor = () => {
//   return '#' + Math.ceil(Math.random() * 15).toString(16) + Math.ceil(Math.random() * 15).toString(16) + Math.ceil(Math.random() * 15).toString(16);
// }

const Pin = (props: PinProps) => {
  const { id, top, left, height, bgColor } = props;

  return (
    <div className='wfc'
      style={{
        top: top + 'px',
        left: left + 'px',
        height: height + 'px',
        lineHeight: height + 'px',
        backgroundColor: bgColor
      }}
    >
      { id }
    </div>
  )
}

const o = {
  cellWidth: 236,
  cellSpace: 16,
  containerSelectorOffset: 50,
  maxCol: 0,
  minCol: 0,
  height: 0,
  hs: [0, 0, 0, 0],
}


interface WFCell {
  id: number,
  col: number,
  top: number,
  left: number,
  height: number,
  bgColor: string
}


const handlePos = (cell: WFCell) => {
  let cols = 4 - 0;
  let col = 0;
  let hs = o.hs;

  if (0) {

  } else {
    for (let i = 0; i < cols; i++) {
      if (hs[i] < hs[col]) {
        col = i;
      }
    }
  }

  let left = col * (o.cellWidth + o.cellSpace);
  let top = hs[col];

  // o.hs
  hs[col] += cell.height + o.cellSpace;

  let max = 0;
  let min = 0;

  for (let i = 0; i < cols; i++) {
    if (hs[i] < hs[min]) min = i;
    if (hs[i] > hs[max]) max = i;
  }

  o.maxCol = max;
  o.minCol = min;

  o.height = o.hs[max] + o.containerSelectorOffset;

  return {
    ...cell,
    col,
    top,
    left,
  }
}

let globalPins: Array<WFCell>;

const App = () => {
  const [state, setState] = React.useState({
    wrapHeight: 0,
    cols: 4,
    pins: []
  });

  React.useEffect(() => {
    let xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.open('GET', '/map/map-pins.json');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        globalPins = JSON.parse(xhr.response);

        console.log(globalPins);

        let tmpPins = [];
      // for (let i = 0; i < 15; i++) {
      //   tmpPins.push({
      //     id: i,
      //     col: 0,
      //     top: 0,
      //     left: 0,
      //     height: 200 + Math.ceil(Math.random() * 100)
      //   });
      // }
        tmpPins = globalPins.slice(0, 20);

        console.log('tmpPins: ', tmpPins);

        tmpPins = tmpPins.map((pin: WFCell) => {
          return handlePos(pin);
        });

        console.log('tmpPins: ', tmpPins);

        setState({
          wrapHeight: o.height,
          cols: 4,
          pins: tmpPins
        });
      }
    };
    xhr.send();
  }, []);

  const addRandomPin = () => {
    // let randomPin = {
    //   id: state.pins.length,
    //   col: 0,
    //   top: 0,
    //   left: 0,
    //   height: 200 + Math.ceil(Math.random() * 100)
    // };
    let randomPin: WFCell = globalPins[state.pins.length];
    console.log('AddRandomPin: ', state.pins.length);
    // console.log('state.pins: ', state.pins);
    console.log('state: ', state);

    randomPin = handlePos(randomPin);

    setState({
      ...state,
      wrapHeight: o.height,
      pins: [
        ...state.pins, randomPin
      ]
    });
  }

  return (
    <React.Fragment>
      <div className={ `waterfall-wrap cols-${ state.cols }` }
        style={{
          height: state.wrapHeight
        }}
      >
        {
          state.pins.map((pin, index) => {
            return (
              <Pin
                id={ pin.id }
                top={ pin.top }
                left={ pin.left }
                height={ pin.height }
                bgColor={ pin.bgColor }
                key={ index.toString() }
              />
            )
          })
        }
      </div>

      <button
        id='addPin'
        onClick={ addRandomPin }
      >AddRandomPin</button>
    </React.Fragment>

  );
}

export default App;
