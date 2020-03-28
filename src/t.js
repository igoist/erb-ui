function htmlToElement(html) {
  var template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

class Modal {
  constructor(props) {
    this.props = props;

    this.handleOK = this.handleOK.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    function handleIn() {
      this.mask.classList.remove('fade-appear');
      this.mask.classList.remove('fade-appear-active');

      this.mask.removeEventListener('animationend', handleIn);
    }
    this.mask.addEventListener('animationend', handleIn);

    this.mask.classList.add('fade-appear');
    this.mask.classList.add('fade-appear-active');

    if (this.props.extraFunc) {
      this.props.extraFunc();
    }
  }

  handleOK() {
    var onOk = this.props.onOk;

    if (onOk) {
      onOk();
    }

    this.handleCancel();
  }

  handleCancel() {
    var close  = this.props.close;

    this.mask.classList.add('fade-leave');
    this.mask.classList.add('fade-leave-active');

    var handleOut = () => {
      this.mask.classList.remove('fade-leave');
      this.mask.classList.remove('fade-leave-active');

      document.body.style.overflow = null;
      this.mask.removeEventListener('animationend', handleOut);

      close();
    };

    this.mask.addEventListener('animationend', handleOut);
    this.mask.classList.add('fade-leave');
    this.mask.classList.add('fade-leave-active');
  }

  render() {
    var iconType = this.props.iconType;
    var title = this.props.title;
    var content = this.props.content;
    var okText = this.props.okText;
    var cancelText = this.props.cancelText;
    var extraNode = this.props.extraNode;

    var tmpNode =  htmlToElement("<div class='top1'><div class='modal-mask'></div><div class='modal-wrap'><div class='sp-modal confirm'><div class='modal-content'><button aria-label='Close' class='modal-close'><span class='modal-close-x'></span></button><div class='modal-body'><div class='confirm-body-wrapper'><div class='confirm-body'><i class='icon'></i><span class='confirm-title'>" + title + "</span><div class='confirm-content'>" + content + (extraNode ? extraNode : '' ) + "</div></div></div></div></div></div></div></div>");

    this.mask = tmpNode.querySelector('.modal-mask');
    this.mask.addEventListener('click', this.handleCancel, false);
    tmpNode.querySelector('.modal-wrap').addEventListener('click', this.handleCancel, false);
    tmpNode.querySelector('.modal-close').addEventListener('click', this.handleCancel, false);
    // tmpNode.querySelector('.btn.cancel').addEventListener('click', this.handleCancel, false);
    // tmpNode.querySelector('.btn.submit').addEventListener('click', this.handleOK, false);

    return tmpNode;
  }
}

function Confirm(config) {
  var div = document.createElement('div');
  document.body.appendChild(div);

  function close() {
    destroy();
  }

  function destroy() {
    if (div.parentNode) {
      div.parentNode.removeChild(div);
    }
    if (config.onCancel) {
      config.onCancel();
    }
  }

  function render(props) {
    var tmpModal = new Modal(props);
    div.appendChild(tmpModal.render());
    tmpModal.componentDidMount();
  }

  config.close = close;
  render(config);
}

app.Confirm = Confirm;
