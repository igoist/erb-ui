import * as React from 'react';
import { ipcRenderer } from 'electron';
import { Confirm } from 'Components/Modal';
import { showMessage } from 'Components/Message';

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

  handleClick(flag: string) {
    switch (flag) {
      case 'modal':
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
        showMessage({
          content: 'Message: ...',
          duration: 2000,
          type: 'success'
        })
        break;
    }

  }

  render() {
    const { compiler, framework } = this.props;

    return (
      <div>
        <h1>Hello{ this.state.t } from { compiler } and { framework }!</h1>
        <button className='btn ok' style={{ marginRight: '12px' }} onClick={ () => this.handleClick('modal') }>Modal</button>
        <button className='btn ok' onClick={ () => this.handleClick('message') }>Message</button>
      </div>
    );
  }
}
