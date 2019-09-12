import * as React from 'react';

// import * as T from './Tween';
import Tween from './Tween';
import './style.css';

const ns = 'lottery2'

let steps = 0;

let arr = [0, 0, 0, 0, 0, 0];

const wrapWidth = 585;
const cardWidth = 210;
const space = 12;

let currentTime = 0;
const endTime = 60 * 10;
const speed = (cardWidth + 12) / 70 * 3;
const start = Math.ceil((wrapWidth - (cardWidth * 6 + space * 5)) / 2);
const end = Math.ceil((cardWidth * 6 + space * 5 - wrapWidth) / 2 - cardWidth + wrapWidth);
const randomNumber = 1;
const variation = -1 * (cardWidth + space) * (57 + randomNumber) + speed * (11 + 9);

arr = arr.map((_, i: number) => {
  return start + i * (cardWidth + space);
});

// console.log('start end: ', start, end, arr);

let flag = true;
const App = () => {
  const [cards, setCards] = React.useState(arr);

  const nextStep = () => {
    setCards(cards.map((item: number, i: number) => {
      let tmp = item - speed < (start - cardWidth);
      if (tmp) {
        return end + (item - speed - (start - cardWidth)) + space;
      } else {
        return item - speed;
      }
    }));
  };

  const prevStep = () => {
    setCards(cards.map((item: number, i: number) => {
      let tmp = item + speed < (start - cardWidth);
      if (tmp) {
        return end + (item + speed - (start - cardWidth)) + space;
      } else {
        return item + speed;
      }
    }));
  };

  React.useEffect(() => {
    console.log('Init arr: ', arr);
    const step = () => {
      // const cards = document.querySelectorAll('.lottery .lottery-card');

      // (cards as any).map((card: any, index: number) => {
      //   card.style.left = arr[index] + 'px';
      // });

      // if (steps < 200) {
      //   steps += 1;
      //   arr = arr.map((item: number, i: number) => {
      //     let tmp = item - speed < (start - cardWidth);
      //     if (tmp) {
      //       return end + (item - speed - (start - cardWidth)) + space;
      //     } else {
      //       return item - speed;
      //     }
      //   });

      //   (window as any).requestAnimationFrame(step);
      // }
      if (!flag) {
        return
      }
      if (steps < 1000 + 13) {
        steps += 1;
        arr = arr.map((item: number, i: number) => {
          let tmp = item - speed < (start - cardWidth);
          if (tmp) {
            return end + (item - speed - (start - cardWidth)) + space;
          } else {
            return item - speed;
          }
        });

        setCards(arr);

        (window as any).requestAnimationFrame(step);
      }
    };

    // step();

    const s = () => {
      if (currentTime < endTime) {
        setCards(arr.map((item, i: number) => {
          let tmp = Tween.Cubic.easeInOut(currentTime, item, variation, endTime);

          while (tmp < (start - cardWidth)) {
            tmp += cardWidth * 6 + space * 6;
          }
          return tmp;
        }));
        currentTime += 1;
        (window as any).requestAnimationFrame(s);
      } else {
        setTimeout(() => {
          let wrap = document.querySelector(`.${ ns }-wrap`);
          wrap.classList.add('xx');
          let tmpCards = document.querySelectorAll(`.${ ns }-card`);
          tmpCards[randomNumber - 1].classList.add('flip');
        }, 600);
      }
    };

    // s();
  }, []);

  return (
    <React.Fragment>
      <div className={ `${ ns }-wrap `}>
        <div className={ ns } onClick={ () => nextStep() }>
          {/* <div className='lottery-card'>1</div>
          <div className='lottery-card'>2</div>
          <div className='lottery-card'>3</div>
          <div className='lottery-card'>4</div>
          <div className='lottery-card'>5</div>
          <div className='lottery-card'>6</div> */}
          <div className={ `${ ns }-inner `}>
            {
              cards.map((card, i) => {
                return (
                  // <div className='lottery-card' style={{ left: card + 'px' }} key={ i.toString() }>
                  //   { i + 1 }
                  // </div>
                  <div className={ `${ ns }-card` } style={{ left: card + 'px' }} key={ i.toString() }>
                    <div className='flipper'>
                      <div className='front'></div>
                      <div className='back'
                        style={{
                          backgroundImage: `url(/img/cards/c0${ i + 1 }.png)`
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })
            }
          </div>
          <div className={ `${ ns }-mascot` }></div>
        </div>
      </div>
      <div id='lotteryPrevStep' className='lottery-btn' onClick={ prevStep }>lotteryPrevStep</div>
      <div id='lotteryNextStep' className='lottery-btn' onClick={ nextStep }>lotteryNextStep</div>
    </React.Fragment>
  );
};


export default App;
