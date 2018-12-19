import { dom, log } from 'Util';

const { htmlToElement } = dom;
const { dev } = log;

export interface SpinProps {
  text?: string;
  type: number;
}

class Spin {
  props: SpinProps;

  constructor(props: SpinProps) {
    this.props = props;
  }

  componentDidMount() {
  }

  renderToString() {
    const { type, text } = this.props;

    dev({
      title: 'Spin - renderToString',
      text: `with type ${ type }`,
    })

    switch(type) {
      case 0:
        return `
          <div class='spin loading bounceball'>
            <div class='spin-animation'></div>
            <div class='spin-text'>${ text }</div>
          </div>
        `;
      case 1:
        return `
          <div class='spin loading livelogo'>
            <div class='spin-animation'></div>
          </div>
        `;
      case 2:
        return `
          <div class='spin loading type02'>
            <div class='spin-animation'>
              <div class='arc'></div>
            </div>
            <div class='spin-text'>${ text }</div>
          </div>
        `;
    }
  }

  render() {
    let tmpNode: any = htmlToElement(this.renderToString());
    return tmpNode;
  }
}

export default Spin;
export { Spin };
