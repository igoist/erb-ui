import { dom } from 'Util';

const { htmlToElement } = dom;

export interface MessageProps {
  content: string;
  type?: string;
  duration?: number;
}

export default class Message {
  props: MessageProps;
  counter: number;
  tmpNode: any;

  constructor(props: MessageProps) {
    this.props = props;
    this.counter = 0;

    // this.messageLeave = this.messageLeave.bind(this);
    // this.handleLeave = this.handleLeave.bind(this);
    // this.finishLoadingRequest = this.finishLoadingRequest.bind(this);
  }

  componentDidMount() {
    let handleIn = () => {
      this.tmpNode.classList.remove('move-up-enter');
      this.tmpNode.classList.remove('move-up-enter-active');

      this.tmpNode.removeEventListener('animationend', handleIn);
    };
    this.tmpNode.addEventListener('animationend', handleIn);

    this.tmpNode.classList.add('move-up-enter');
    this.tmpNode.classList.add('move-up-enter-active');
  }

  messageLeave() {
    this.tmpNode.addEventListener('animationend', () => {
      this.tmpNode.parentNode.removeChild(this.tmpNode);
      this.tmpNode = null;
    });

    this.tmpNode.classList.add('move-up-leave');
    this.tmpNode.classList.add('move-up-leave-active');
  }

  handleLeave() {
    const { duration = 2000 } = this.props;
    setTimeout(() => {
      this.messageLeave();
    }, duration);
  }

  finishLoadingRequest() {
    this.messageLeave();
  }

  render() {
    const { content, type = 'success' } = this.props;

    let tmpNode = htmlToElement(`
      <div class='message'>
        <div class='message-content'>
          <div class='message-custom-content message-${ type }'>
            <i class='icon response-${ type }'></i>
            <span>${ content }</span>
          </div>
        </div>
      </div>
    `);

    this.tmpNode = tmpNode;
    let GlobalMessage = document.querySelector('.global-message span');
    if (GlobalMessage) {
      GlobalMessage.appendChild(tmpNode);
    } else {
      let span = document.createElement('span');
      span.appendChild(tmpNode);
      let div = document.createElement('div');
      div.classList.add('global-message');
      div.appendChild(span);
      document.body.appendChild(div);
    }
    if (type !== 'loading') {
      this.handleLeave();
    }

    return tmpNode;
  }
}
