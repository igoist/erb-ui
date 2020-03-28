import * as React from 'react';

interface PinProps {
  id: number,
  top: number,
  left: number,
  height: number,
  bgColor: string,
  setLayer?: (id: number) => void;
}


const Pin = (props: PinProps) => {
  const { id, top, left, height, bgColor, setLayer } = props;

  return (
    <div className='wfc'
      style={{
        top: top + 'px',
        left: left + 'px',
        height: height + 'px',
        lineHeight: height + 'px',
        backgroundColor: bgColor
      }}
      onClick={ () => setLayer(id) }
    >
      { id + 'x' }
    </div>
  );
};

const o = {
  cellWidth: 236,
  cellSpace: 16,
  containerSelectorOffset: 50,
  maxCol: 0,
  minCol: 0,
  height: 0,
};

interface WFCell {
  id: number,
  col: number,
  top: number,
  left: number,
  height: number,
  bgColor: string
}

const handlePos = (cell: WFCell, hs: Array<number>) => {
  let cols = 4 - 0;
  let col = 0;

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

  o.height = hs[max] + o.containerSelectorOffset;

  return {
    cell: {
      ...cell,
      col,
      top,
      left,
    },
    hs,
  }
};

// let globalPins: Array<WFCell>;

// (window as any).g = globalPins;

const usePageStatus = () => {
  const [pageState, setPageState] = React.useState({
    wrapHeight: 0,
    cols: 4,
    hs: [0, 0, 0, 0],
    pins: [],
    globalPins: [],
  });

  React.useEffect(() => {
    console.log('usePageStatus Init');
    let xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.open('GET', '/map/map-pins.json');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let tmpGlobalPins = JSON.parse(xhr.response);

        let tmpPins = [];

        tmpPins = tmpGlobalPins.slice(0, 20);

        let tmpHs = [0, 0, 0, 0];
        tmpPins = tmpPins.map((pin: WFCell) => {
          const { cell, hs } = handlePos(pin, tmpHs);
          tmpHs = hs;
          return cell;
        });

        setPageState({
          wrapHeight: o.height,
          cols: 4,
          hs: tmpHs,
          pins: tmpPins,
          globalPins: tmpGlobalPins,
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
    let randomPin: WFCell = pageState.globalPins[pageState.pins.length];
    console.log('AddRandomPin: ', pageState.pins.length);
    // console.log('state.pins: ', state.pins);
    // console.log('state: ', pageState);

    const { cell, hs} = handlePos(randomPin, pageState.hs);

    setPageState({
      ...pageState,
      wrapHeight: o.height,
      hs,
      pins: [
        ...pageState.pins, cell
      ]
    });
  };

  const setLayer = (id: number) => {

  };

  return {
    pageState,
    setPageState,
    addRandomPin,
  };
};

const App = () => {
  const { pageState, addRandomPin } = usePageStatus();

  return (
    <React.Fragment>
      <div className={ `waterfall-wrap cols-${ pageState.cols }` }
        style={{
          height: pageState.wrapHeight
        }}
      >
        {
          pageState.pins.map((pin, index) => {
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
      {/* <button
        id='showState'
        onClick={ addRandomPin }
      >ShowState</button> */}
    </React.Fragment>

  );
}

export default App;
