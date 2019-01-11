import * as React from 'react';
import Card from './Card';
import Loading from './Loading';

const prefixCls = '';

export interface UploadProps {
  fileList: any;
  isLoading: boolean;
  preparedFile: any;
  dispatch: any;
  // title: string;
  // content: string;
  // okText?: string;
  // cancelText?: string;
  // onOk?: (e?: MouseEvent) => void;
  // onCancel?: (e?: MouseEvent) => void;
  // close?: () => void;
  // extraNode?: string;
  // extraFuncOnDidMount?: () => void;
}

class Upload extends React.Component<UploadProps, any> {
  input: any;

  constructor(props: UploadProps) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let input = this.input;
    console.log(input);
    input.addEventListener('change', () => {
      console.log('hree');
      if (input.files.length) {
        const file = input.files[0];
        console.log('change', file);
        input.value = '';
        this.props.dispatch({ type: 'SetPreparedFile', payload: file });
        this.props.dispatch({ type: 'SetLoading' });
      }
    });
  }

  handleClick() {
    console.log('hereeee');
    console.log(this.input);
    this.input.click();
  }

  render() {
    const { fileList, isLoading, preparedFile } = this.props;
    console.log('r', preparedFile);

    const uploadBtn = (
      <div>
        <i className='anticon anticon-plus' style={{ color: '#999', fontSize: '32px' }}></i>
        <div className='upload-text' style={{ marginTop: '8px', color: '#666', userSelect: 'none' }}>上传</div>
      </div>
    );

    return (
      <div className='clearfix'>
        <div className='upload-list upload-list-picture-card'>
          {
            fileList.map((file: any, index: number) => (
              <Card
                key={ index.toString() }
                file={ file }
                dispatch={ this.props.dispatch }
              />
            ))
          }

          {
            isLoading && (
              <Loading
                file={ preparedFile }
                { ...this.props }
              />
            )
          }
        </div>
        <div className='ant-upload ant-upload-select ant-upload-select-picture-card' style={{ display: fileList.length < 8 ? null : 'none', width: '128px', height: '128px' }}>
          <span className='ant-upload' role='button' onClick={ this.handleClick }>
            <input type='file' accept='' style={{ display: 'none' }} ref={ el => this.input = el } />
            { uploadBtn }
          </span>
        </div>
      </div>
    );
  }
}


export {
  Upload
}
