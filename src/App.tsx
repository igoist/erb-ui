import * as React from 'react';
import { ipcRenderer } from 'electron';

export interface AppProps {
  compiler: string;
  framework: string;
}

export class App extends React.Component<AppProps, any> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      t: 'aaa'
    }
  }

  componentDidMount() {
    ipcRenderer.on('mode-change', (event: any, arg: any) => {
      this.setState((state: any) => {
        console.log(state);
        return {
          t: arg
        };
      });
    });
  }

  render() {
    const { compiler, framework } = this.props;

    return (
      <h1>Hello{ this.state.t } from { compiler } and { framework }!</h1>
    );
  }
}
