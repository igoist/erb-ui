import * as React from 'react';
import { Upload } from 'Components/Upload';


export interface Props {
  compiler: string;
  framework: string;
}

export class UploadUsecase extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fileList: [],
      isLoading: false,
      preparedFile: null,
    }

    this.handleDispatch = this.handleDispatch.bind(this);
  }

  componentDidMount() {
  }

  handleDispatch(action: any) {
    switch (action.type) {
      case 'AddOne':
        this.setState({
          fileList: [...this.state.fileList, action.payload]
        });
        break;
      case 'DeleteOne':
        this.setState({
          fileList: this.state.fileList.filter((file: any) => file.id !== action.id)
        });
        break;
      // isLoading
      case 'SetLoading':
        this.setState({
          isLoading: true
        });
        break;
      case 'CancelLoading':
        this.setState({
          isLoading: false
        });
        break;
      // preparedFile
      case 'SetPreparedFile':
        this.setState({
          preparedFile: action.payload
        });
        break;
      case 'ClearPreparedFile':
        this.setState({
          preparedFile: null
        });
        break;
    }
  }

  render() {
    const { compiler, framework } = this.props;

    return (
      <div>
        <Upload
          fileList={ [] }
          isLoading={ false }
          preparedFile={ null }
          dispatch={ this.handleDispatch }
        />
      </div>
    );
  }
}


export default UploadUsecase;
