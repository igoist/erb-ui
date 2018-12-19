import { dom } from 'Util';

const { htmlToElement } = dom;

export interface MessageProps {
  content: string;
  type?: string;
  duration?: number;
}

export default class Message {
  props: MessageProps;
  tmpNode: any;

  constructor(props: MessageProps) {
    this.props = props;

    this.handleLeave = this.handleLeave.bind(this);
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

  handleLeave(tmpNode: any) {
    const { duration = 2000 } = this.props;
    setTimeout(() => {
      tmpNode.addEventListener('animationend', () => {
        tmpNode.parentNode.removeChild(tmpNode);
        tmpNode = null;
      });

      tmpNode.classList.add('move-up-leave');
      tmpNode.classList.add('move-up-leave-active');
    }, duration);
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
    this.handleLeave(tmpNode);

    return tmpNode;
  }
}
