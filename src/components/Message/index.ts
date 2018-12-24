import Message, { MessageProps } from './Message';

const showMessage = (config: MessageProps) => {
  let { content, duration, type, extraFunc } = config;
  let message = new Message({
    content,
    duration,
    type,
    extraFunc
  });

  message.render();
  message.componentDidMount();

  return message;
}

export default Message;

export { Message, showMessage }
