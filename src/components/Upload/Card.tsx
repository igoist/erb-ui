import * as React from 'react';

interface CardProps {
  file: any;
  dispatch: any;
}

class Card extends React.Component<CardProps, any> {
  btnA: any;
  btnI: any;

  constructor(props: CardProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: any) {
    const { dispatch } = this.props;

    if (!!!dispatch && e.target !== this.btnA &&e.target !== this.btnI) {
      this.btnA.click();
    }
  }

  render() {
    const { file, dispatch } = this.props;
    const { id, fileName, src } = file;

    return (
      <div className='ant-upload-list-item ant-upload-list-item-done' onClick={ this.handleClick }>
        <div className='ant-upload-list-item-info'>
          <span>
            <a className='ant-upload-list-item-thumbnail' href={ src } target='_blank' rel='noopener noreferrer'>
              <img src={ src + '_/sq/256' } alt={ fileName } />
            </a>
            <a href={ src } target='_blank' rel='noopener noreferrer' className='ant-upload-list-item-name' title={ fileName }>{ fileName }</a>
          </span>
        </div>
        <span className='ant-upload-list-item-actions'>
          <a href={ src } target='_blank' rel='noopener noreferrer' title='Preview file' data-fancybox='gallery' ref={ el => this.btnA = el }>
            <i className='anticon anticon-eye-o' ref={ el => this.btnI = el }></i>
          </a>
          {
            dispatch && (
              <i
                className='anticon anticon-delete'
                title='Remove file'
                onClick={ () => dispatch({ type: 'DeleteOne', id })}
              ></i>
            )
          }
        </span>
      </div>
    );
  }
}

export default Card;
