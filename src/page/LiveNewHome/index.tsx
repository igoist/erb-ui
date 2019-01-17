import * as React from 'react';
import Banner from './Banner';
import './style.css';

export interface Props {
}

export class LiveNewHome extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <>
        <div>
          <Banner />
        </div>
      </>
    );
  }
}
export default LiveNewHome;
