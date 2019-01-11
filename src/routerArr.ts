import { App } from './App';
import UploadUsecase from './usecase/Upload';

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
];

export default routerArr;
