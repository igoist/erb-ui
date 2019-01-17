import * as React from 'react';
import { prefix } from 'Util';

export interface Props {
}

export class Banner extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      bannerIndex: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
  }

  handleClick() {
    const { bannerIndex } = this.state;
    console.log('here');
    this.setState({
      bannerIndex: bannerIndex + 1 > 3 ? 0 : bannerIndex + 1
    })
  }

  render() {
    const { bannerIndex } = this.state;

    let btnRows: Array<any> = [];

    [0, 1, 2, 3].map((item, index) => {
      btnRows.push(<button key={ index.toString() } className={ `${ prefix }-banner-btn ${ bannerIndex === index ? 'active' : '' }` }></button>);
    });

    return (
      <>
        <div id={ `${ prefix }-banner-wrapper` }
          onClick={ this.handleClick }
        >
          <div className={ `${ prefix }-banner-list` } style={{ transform: `translateX(${ bannerIndex * -100 + '' }%)` }}>
            {/* <div className={ `${ prefix }-banner-item` } style={{ backgroundImage: 'url(//hblive-img.b0.upaiyun.com/c33e848b1be5fbd26527330eb17ab59a3056d7a2)' }}></div>
            <div className={ `${ prefix }-banner-item` } style={{ backgroundImage: 'url(//hblive-img.b0.upaiyun.com/c33e848b1be5fbd26527330eb17ab59a3056d7a2)' }}></div>
            <div className={ `${ prefix }-banner-item` } style={{ backgroundImage: 'url(//hblive-img.b0.upaiyun.com/e49a9dc6b802d0dafa94da76c1c4327b3fdbde26)' }}></div>
            <div className={ `${ prefix }-banner-item` } style={{ backgroundImage: 'url(//hblive-img.b0.upaiyun.com/e49a9dc6b802d0dafa94da76c1c4327b3fdbde26)' }}></div>
            <div className={ `${ prefix }-banner-item` } style={{ backgroundImage: 'url(//hblive-img.b0.upaiyun.com/e49a9dc6b802d0dafa94da76c1c4327b3fdbde26)' }}></div> */}
            <div className={ `${ prefix }-banner-item` } style={{ backgroundImage: 'url(//img.hb.aicdn.com/ea2c5b86264046a20c0cc18a7d8e3bbb11b99c828e967-vRHCBB)' }}></div>
            <div className={ `${ prefix }-banner-item` } style={{ backgroundImage: 'url(//img.hb.aicdn.com/dd94ec9ca28962fef1bd5c617eb54855e50ce2b48cf19-SyspT8)' }}></div>
            <div className={ `${ prefix }-banner-item` } style={{ backgroundImage: 'url(//img.hb.aicdn.com/f28dd930f2a0b81bc3d9ed57c71c99d4bf4c7f75b25ba-0GNAJl)' }}></div>
            <div className={ `${ prefix }-banner-item` } style={{ backgroundImage: 'url(//img.hb.aicdn.com/cc8f1750bb3b8bad1605560111ca5d0700e444daab9d7-dM2PtC)' }}></div>
            {/* <div className={ `${ prefix }-banner-item` } style={{ backgroundImage: 'url(//img.hb.aicdn.com/ed916d3b4641c3b916dee507aebd080789c53cb54bb25-QcUg8S)' }}></div> */}
          </div>
          <div className={ `${ prefix }-banner-btn-group` }>
            { btnRows }
          </div>
        </div>
      </>
    );
  }
}
export default Banner;
