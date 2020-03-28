import * as React from 'react';

import './style.css';

const delta = 38;

const arr = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const TmpScreenshot = () => {
  return (
    <div className='tss-wrap'>
      <img src='/img/01.png' style={{ top: '0px' }} />
      <img src='/img/02.png' style={{ top: '429px'}} />

      {
        arr.map(item => {
          let tmp = item < 10 ? '0' + item : item;
          return (<img src={ `/img/${tmp}.png` } style={{ top: 429 + delta * (item - 2) + 'px' }} />);
        })
      }
    </div>
  );
};

export default TmpScreenshot;