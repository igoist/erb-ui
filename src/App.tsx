import * as React from 'react';
import { ipcRenderer } from 'electron';
import { Confirm } from 'Components/Modal';
import { showMessage } from 'Components/Message';
import { Loading } from 'Components/Loading';

export interface AppProps {
  compiler: string;
  framework: string;
}

const loading01 = new Loading({
  text: 'loading01',
  type: 2
});

let message: any;

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

  handleClick(flag: string) {
    switch (flag) {
      case 'modal':
        console.log('modal');
        Confirm({
          title: '删除作业',
          content: '删除作业后无法恢复，确认删除吗？',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            console.log('init Modal ok');
          },
          onCancel () {
            console.log('cancel Modal');
          },
        });
        break;
      case 'message':
        console.log('message');
        message = showMessage({
          content: 'Message: ...',
          duration: 2000 * 1000,
          type: 'loading',
          extraFunc: () => {
            showMessage({
              content: 'Message: success',
              duration: 2000,
              type: 'success',
            });
          }
        });
        break;
      case 'loadingRequest':
        console.log('loadingRequest');
        loading01.loadingRequest();
        break;
      case 'loadingFinish':
        loading01.finishLoadingRequest();
        message && message.finishLoadingRequest();
        break;
    }

  }

  render() {
    const { compiler, framework } = this.props;

    return (
      <div>
        <h1>Hello{ this.state.t } from { compiler } and { framework }!</h1>
        <button className='btn bounce ok' style={{ marginRight: '12px' }} onClick={ () => this.handleClick('modal') }>Modal</button>
        <button className='btn bounce ok' style={{ marginRight: '12px' }} onClick={ () => this.handleClick('message') }>Message</button>
        <button className='btn bounce ok' style={{ marginRight: '12px' }} onClick={ () => this.handleClick('loadingRequest') }>loadingRequest</button>
        <button className='btn bounce cancel' onClick={ () => this.handleClick('loadingFinish') }>loadingFinish</button>
      </div>
    );
  }
}
