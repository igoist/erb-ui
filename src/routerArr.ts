// import App from './usecase/App';
import { App } from './App';

const currentUrl = '/';

interface RouterArrProps {
  path: string;
  title: string;
  component: any;
  exact?: boolean;
  icon?: string;
}


const routerArr: Array<RouterArrProps> = [
  {
    path: currentUrl,
    title: 'Components: Modal',
    component: App,
    exact: true
  },
  {
    path: currentUrl + 'message',
    title: 'Components: Message',
    component: App
  },
];

export default routerArr;
