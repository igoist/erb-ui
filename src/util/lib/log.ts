import { theme } from './theme';

interface LogProps {
  title: string;
  titleBg?: string;
  titleColor?: string;
  text: string;
  textBg?: string;
  textColor?: string;
}

export const l = (config: LogProps) => {
  const { title, titleBg, titleColor, text, textBg, textColor } = config;
  console.log(
    `%c${ title }%c: %c${ text }`,
    `${ titleBg ? 'background:' + titleBg + ';' : '' }
    ${ titleColor ? 'color:' + theme(titleColor) + ';' : 'color:' + theme('') + ';' }`,
    '',
    `${ textBg ? 'background:' + textBg + ';' : '' }
    ${ textColor ? 'color:' + theme(textColor) + ';' : '' }`
  );
};

export const dev = (config: LogProps) => {
  if (process.env.NODE_ENV === 'development') {
    l(config);
  }
}

export const prod = (config: LogProps) => {
  if (process.env.NODE_ENV === 'production') {
    l(config);
  }
}

export default l;
