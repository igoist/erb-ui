import * as React from 'react';

import './style.css';

const Arr = [
  {
    title: 'Card 1',
    imgUrl: 'http://hbimg.huabanimg.com/0b38d71315387cfdafc7b2f31831f5aca1b69f3ee89db-XgAsot'
  },
  {
    title: 'Card 2',
    imgUrl: 'http://hbimg.huabanimg.com/1c9bde57ba53e091d01efc0634e7a806d61a3b698c8bc-euEm4I'
  },
  {
    title: 'Card 3',
    imgUrl: 'http://hbimg.huabanimg.com/09cbe72f02f2be8ca4503800d07c32751ebf58727f8b5-iXQJhP'
  },
  {
    title: 'Card 4',
    imgUrl: 'http://hbimg.huabanimg.com/ea2c5b86264046a20c0cc18a7d8e3bbb11b99c828e967-vRHCBB'
  },
  {
    title: 'Card 5',
    imgUrl: 'http://hbimg.huabanimg.com/dd94ec9ca28962fef1bd5c617eb54855e50ce2b48cf19-SyspT8'
  },
  {
    title: 'Card 6',
    imgUrl: 'http://hbimg.huabanimg.com/f28dd930f2a0b81bc3d9ed57c71c99d4bf4c7f75b25ba-0GNAJl'
  },
  {
    title: 'Card 7',
    imgUrl: 'http://hbimg.huabanimg.com/45b3a9d9a9814a3e4b56537de89c8fc46a8388c48b4e4-q0cvi9'
  }
];

const trickArr = [
  6, 5, 4, 3, 2, 1, 0
];

export interface Props {
}

export class CardChange extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: Arr,
      offset: 0
    };

    this.handleDispatch = this.handleDispatch.bind(this);
  }

  componentDidMount() {
  }

  handleDispatch(action: any) {
    console.log('HANLDE DISPATCH');
    // let data = this.state.data;
    const { offset } = this.state;

    switch (action.type) {
      case 'left':
        // let tmp = data.slice(0, 1);
        // let newA = [...data.slice(1, 7), ...tmp];
        // console.log(newA);
        // this.setState({ data: newA });
        let t = offset + 1;
        t = t > 6 ? 0 : t;
        this.setState({ offset: (t < -5 ? 0 : t) });
        break;
      case 'right':
        let t2 = offset - 1;
        t2 = t2 === -7 ? 0 : t2;
        this.setState({ offset: t2 });
        break;
    }
  }

  render() {
    // const {  } = this.props;
    const { data, offset } = this.state;
    console.log('offset: ', offset);

    return (
      <div className='wrapper'>
        <div
          className='olb'
          onClick={ () => this.handleDispatch({ type: 'left'}) }
        ></div>
        <div
          className='orb'
          onClick={ () => this.handleDispatch({ type: 'right'}) }
        ></div>
        <ul className='box'>
          {
            data.map((item: any, index: number) => {
              let n = (index + offset) % 7;
              n = n < 0 ? n + 7 : n;
              console.log('old: ', (index + offset) % 7, ' new: ', n);

              return (
                <li key={ index.toString() } className={ `item item-${ trickArr[n] }` } data-index={ index }>
                  <img src={ Arr[index].imgUrl } />
                  <p>{ item.title }</p>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}


export default CardChange;
