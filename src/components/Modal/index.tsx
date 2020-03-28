import * as React from 'react';
import * as ReactDOM from 'react-dom';

const Prefix = 'sp';

export interface ModalProps {
  title: string;
  content: string;
  okText?: string;
  cancelText?: string;
  onOk?: (e?: MouseEvent) => void;
  onCancel?: (e?: MouseEvent) => void;
  close?: () => void;
  extraNode?: string;
  extraFuncOnDidMount?: () => void;
}

export interface ConfirmProps extends ModalProps {}


class Modal extends React.Component {
  props: ModalProps;
  mask: HTMLElement;
  modalWrap: HTMLElement;
  modal: HTMLElement;

  constructor(props: ModalProps) {
    super(props);

    this.handleOK = this.handleOK.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    let handleIn = () => {
      this.mask.classList.remove('fade-appear');
      this.mask.classList.remove('fade-appear-active');

      this.mask.removeEventListener('animationend', handleIn);
    };
    this.mask.addEventListener('animationend', handleIn);

    this.mask.classList.add('fade-appear');
    this.mask.classList.add('fade-appear-active');

    this.modalWrap.addEventListener('click', this.handleCancel);
  }

  handleOK() {
    const { onOk } = this.props;

    if (onOk) {
      onOk();
    }

    this.handleCancel();
  }

  handleCancel() {
    const { close } = this.props;

    this.mask.classList.add('fade-leave');
    this.mask.classList.add('fade-leave-active');

    let handleOut = () => {
      if (this.mask) {
        this.mask.classList.remove('fade-leave');
        this.mask.classList.remove('fade-leave-active');

        document.body.style.overflow = null;
        this.mask.removeEventListener('animationend', handleOut);

        close();
      }
    };

    this.mask.addEventListener('animationend', handleOut);
    this.mask.classList.add('fade-leave');
    this.mask.classList.add('fade-leave-active');
  }

  render() {
    const { title, content, okText, cancelText } = this.props;

    return (
      <div className='top1'>
        <div className={ `${ Prefix }-modal-mask` } ref={ el => this.mask = el }></div>
        <div className={ `${ Prefix }-modal-wrap` } ref={ el => this.modalWrap = el }>
          <div className={ `${ Prefix }-modal ${ Prefix }-confirm` } ref={ el => this.modal = el }>
            <div className={ `${ Prefix }-modal-content` }>
              <button aria-label='Close' className={ `${ Prefix }-modal-close` } onClick={ this.handleCancel }>
                <span className={ `${ Prefix }-modal-close-x` }></span>
              </button>
              <div className={ `${ Prefix }-modal-body` }>
                <div className={ `${ Prefix }-confirm-body-wrapper` }>
                  <div className={ `${ Prefix }-confirm-body` }>
                    <i className='icon icon-question-circle'></i>
                    <span className={ `${ Prefix }-confirm-title` }>{ title }</span>
                    <div className={ `${ Prefix }-confirm-content` }>{ content }</div>
                    <div className={ `${ Prefix }-confirm-btns` }>
                      <button className='btn bounce cancel' onClick={ this.handleCancel } style={{ display: cancelText ? null : 'none', marginRight: '12px' }}>
                        <span>{ cancelText }</span>
                      </button>
                      <button className='btn bounce theme-confirm submit' onClick={ this.handleOK }>
                        <span>{ okText }</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Confirm(config: ConfirmProps) {
  let div = document.createElement('div');
  document.body.appendChild(div);

  function close(...args: Array<any>) {
    destroy(...args);
  }

  function destroy(...args: Array<any>) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    if (config.onCancel) {
      config.onCancel(...args);
    }
  }

  function render(props: ConfirmProps) {
    ReactDOM.render(<Modal { ...props } />, div);
  }

  config.close = close;
  render(config);
}


export default Modal;

export { Modal, Confirm };
