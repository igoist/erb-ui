import * as React from 'react';
import useStoreStatus from 'Components/useStoreStatus';
import './style.css';

const { useState, useEffect } = React;

const n = 20;
const x = n;
const y = n;
const size = 20;


let initArr = new Array(x * y);
for (let i = 0; i < x * y; i++) {
  initArr[i] = 0;
}

const useContentStatus = () => {
  const [contentState, setContentState] = useState(initArr);

  const { storeState, pushStore, toPrevStore, toNextStore, toStart } = useStoreStatus();

  useEffect(() => {
    console.log('useContentStatus Init');
    pushStore(contentState, setContentState);
  }, []);

  const handleClick = (pointX: number, pointY: number) => {
    let tmp = contentState.slice();
    tmp[x * pointY + pointX] = tmp[x * pointY + pointX] === 0 ? 1 : 0;
    pushStore(tmp, setContentState);
  }

  const toPrevContent = () => {
    toPrevStore(setContentState);
  };

  const toNextContent = () => {
    // console.log('storeState.current: ', storeState.current);
    // console.log('storeState.storeList.length: ', storeState.storeList.length);
    if (storeState.current < storeState.storeList.length - 1) {
      toNextStore(setContentState);
      return false;
    } else {
      return true;
    }
  };

  const toContentStart = () => {
    toStart(setContentState);
  };

  return {
    contentState,
    handleClick,
    toPrevContent,
    toNextContent,
    toContentStart,
  };
};

const Content = (props) => {
  const { contentState, handleClick } = props;

  return (
    <div>
      <svg
        width={ n * size }
        height={ n * size }
      >
        {
          contentState.map((item: number, index: number) => {
            let x = index % n;
            let y = Math.floor(index / n);

            return (
              <rect
                key={ index.toString() }
                className={ item === 1? 'xx' : ''}
                x={ x * size }
                y={ y * size }
                width={ size }
                height={ size } r='0' rx='0' ry='0' fill={ item === 0 ? '#fff' : '#808080' } stroke={ item === 0 ? '#000' : '#fff' }
                style={{
                  // top: y * size + 'px',
                  // left: x * size + 'px',
                  strokeOpacity: 0.2
                }}
                // transform='matrix(1,0,0,1,0,0)'
                onClick={ () => handleClick(x, y) }
              ></rect>
            );
          })
        }
      </svg>
    </div>
  );
};

const useMoodyBluesStatus = () => {
  const [moodyBluesState, setMoodyBluesState] = useState(0);

  const handleMoodyBlues = () => {

  };

  return {
    moodyBluesState,
    handleMoodyBlues
  }
};

let flag = false;

const MoodyBlues = () => {
  // const { handleMoodyBlues } = useMoodyBluesStatus();
  const { contentState, handleClick, toPrevContent, toNextContent, toContentStart } = useContentStatus();

  const handleMoodyBlues = () => {
    toContentStart();

    // for (let i = 0; i < 20; i++) {
    //   ((x) => {
        // setTimeout(() => {
        //   console.log('ss: ', i);
        //   toNextContent();
        // }, x * 100);
    //   })(i);
    // }
    // useEffect(() => {
    //   toNextContent();
    // }, [contentState]);
    flag = true;
  };

  useEffect(() => {
    setTimeout(() => {
      if (flag) {
        let x = toNextContent();
        if (x) {
          flag = false;
        }
      }
    }, 30);
  }, [contentState]);

  return (
    <div id='MoodyBlues'>
      <Content
        contentState={ contentState }
        handleClick={ handleClick }
      />
      {/* { renderContent() } */}

      <button onClick={ () => handleMoodyBlues() }>MoodyBlues</button>
      <button onClick={ () => toPrevContent() }>Prev</button>
      <button onClick={ () => toNextContent() }>Next</button>
    </div>
  )
}

export default MoodyBlues;
