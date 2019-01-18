import { App } from './App';
import UploadUsecase from './usecase/Upload';
import LiveNewHome from './page/LiveNewHome';
import Screenshot from './usecase/Screenshot';

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
    path: currentUrl + 'upload',
    title: 'Usecase: Upload',
    component: UploadUsecase
  },
  {
    path: currentUrl + 'screenshot',
    title: 'Usecase: Screenshot',
    component: Screenshot
  },
  {
    path: currentUrl + 'liveNewHome',
    title: 'Page: LiveNewHome',
    component: LiveNewHome
  },
];

export default routerArr;
