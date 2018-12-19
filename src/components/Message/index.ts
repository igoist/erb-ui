import Message, { MessageProps } from './Message';

const showMessage = (config: MessageProps) => {
  let { content, duration, type } = config;
  let message = new Message({
    content,
    duration,
    type
  });

  message.render();
  message.componentDidMount();
}

export default Message;

export { Message, showMessage }
