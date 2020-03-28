import * as React from 'react';
// import { Upload } from 'Components/Upload';

class Child extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className='abc'>
        Nothing!@
      </div>
    )
  }
}

function Ex0001() {
  const [d, setD] = React.useState({ name: 'old', f: false });

  return (
    <div>
      <button onClick={() => setD({ ...d, name: (d.f ? 'new' : 'old'), f: !d.f })}>
        Click Me
      </button>
      <p>{ d.name }</p>
    </div>
  )
}

function Ex() {
  const [d, setD] = React.useState([1, 2, 3]);

  return (
    <div>
      <button onClick={() => setD([...d, 1])}>
        Click Me
      </button>
      {
        d.map((e, index) => (
          <li key={ index }>{ index }: { e }</li>
        ))
      }
    </div>
  )
}

export interface Props {
}

export class PageLoadUsecase extends React.Component<Props, any> {
  // w: any;
  private w = React.createRef<HTMLDivElement>()

  constructor(props: Props) {
    super(props);
    this.state = {
    }

    // this.handleDispatch = this.handleDispatch.bind(this);
    // this.w = this.w.bind(this);
  }



  componentDidUpdate() {
    console.log(this.w);
    console.log(this.w.current);
  }

  render() {
    return (
      <div ref={ this.w }>
        <Child />
        <Child />
        <Child />
        <Ex />
        {/* <div ref={ el => this.v = el }>

        </div> */}
      </div>
    );
  }
}


export default PageLoadUsecase;
