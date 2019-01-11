import * as React from 'react';
import { showMessage } from 'Components/Message';

interface LoadingProps {
  file: any;
  fileList: any;
  dispatch: any;
}

class Loading extends React.Component<LoadingProps, any> {
  progress: any;

  constructor(props: LoadingProps) {
    super(props);
  }

  componentDidMount() {
    const { file, fileList } = this.props;
    let progress = this.progress;

    // 在这里进行文件类型的判断、拦截与相应提示
    if (file.type && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif')) {
    } else {
      showMessage({
        content: '仅支持 jpg/gif/png 格式',
        duration: 2000,
        type: 'warning'
      });
      this.props.dispatch({ type: 'CancelLoading' });
      return;
    }

    let formData = new FormData();
    formData.append('file', file);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/v1/upload');
    xhr.onprogress = (e) => {
      if (e.lengthComputable) {
        progress.style.width = (e.loaded / e.total) * 100 + '%';
      }
    };

    const delay = 400;

    xhr.onloadend = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const { id, name, url } = JSON.parse(xhr.response);
        setTimeout(() => {
          if (fileList.filter((file: any) => file.id === id).length === 0) {
            this.props.dispatch({
              type: 'AddOne',
              payload: {
                id,
                src: url,
                fileName: name
              }
            });
          } else {
            showMessage({
              content: '请不要重复上传相同的作业文件',
              duration: 2000,
              type: 'warning'
            });
          }
        }, delay + 20);
      }
      if (xhr.readyState === 4 && xhr.status === 413) {
        showMessage({
          content: '文件过大',
          duration: 2000,
          type: 'warning'
        });
      }
      setTimeout(() => {
        this.props.dispatch({ type: 'CancelLoading' });
      }, delay);
    };
    xhr.send(formData);
    // let c = 0;
    // let x = setInterval(() => {
    //   progress.style.width = c / 10 * 100 + '%';
    //   console.log('....');
    //   if (c < 10) {
    //     c++;
    //   } else {
    //     clearInterval(x);
    //     console.log(file);
    //     // this.props.addOne({
    //     //   id,
    //     //   src: url,
    //     //   fileName: name
    //     // });
    //   }
    // }, 200);
  }

  render() {
    const { file } = this.props;

    return (
      <div className='ant-upload-list-item ant-upload-list-item-uploading'>
        <div className='ant-upload-list-item-info'>
          <span>
            <div className='ant-upload-list-item-uploading-text'>Uploading...</div>
            <span className='ant-upload-list-item-name' title={ file.name }>{ file.name }</span>
          </span>
        </div>
        <i title='Remove file' className='anticon anticon-cross'></i>
        <div className='ant-upload-list-item-progress'>
          <div className='ant-progress ant-progress-line ant-progress-status-normal ant-progress-default'>
            <div>
              <div className='ant-progress-outer'>
                <div className='ant-progress-inner'>
                  <div className='ant-progress-bg' style={{ width: '0%', height: '2px' }} ref={ el => this.progress = el }></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Loading;
