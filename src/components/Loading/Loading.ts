import { dom, log } from '../../util/';
import Spin from '../Spin';

const { htmlToElement } = dom;
const { dev } = log;

/**
 * 由于一开始就考虑到多文件上传，于是用到了计数器 counter
 * 当然文件上传进度又是另一回事
 * 后面会将其中 Spin 部分单独拆分，然后可以根据 type 参数进行配置
 */

export interface LoadingProps {
  target?: HTMLElement;
  text: string;
  type: number;
}

export default class Loading {
  props: LoadingProps;
  counter: number;
  domNode: any;

  constructor(props: LoadingProps) {
    this.props = props;
    this.counter = 0;
  }

  loadingRequest() {
    this.counter += 1;

    dev({
      title: 'Loading - loadingRequest',
      text: '' + this.counter
    });

    this.checkRender();
  }

  finishLoadingRequest() {
    if (this.counter > 0) {
      this.counter -= 1;
    }

    if (this.domNode && this.counter === 0) {
      document.body.classList.remove('body-loading');
      this.domNode.parentNode.removeChild(this.domNode);
      this.domNode = null;
    }

    dev({
      title: 'Loading - finishLoadingRequest',
      text: '' + this.counter
    });
  }

  checkRender() {
    if (!this.domNode) {
      this.render();
      dev({
        title: 'Loading - checkRender',
        text: 'no dom'
      });
    } else {
      dev({
        title: 'Loading - checkRender',
        text: 'yo dom'
      });
    }
  }

  render() {
    const { target } = this.props;
    let spin = new Spin(this.props);

    let tmpNode: any = htmlToElement(`
      <div class='wrap-loading'>
        ${ spin.renderToString() }
      </div>
    `);

    if (target) {
      target.appendChild(tmpNode);
    } else {
      document.body.appendChild(tmpNode);
    }
    document.body.classList.add('body-loading');

    this.domNode = tmpNode;
  }
}
