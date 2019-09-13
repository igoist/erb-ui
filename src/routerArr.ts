import { App } from './App';
import UploadUsecase from './usecase/Upload';
import LiveNewHome from './page/LiveNewHome';
import Screenshot from './usecase/Screenshot';
import PageLoad from './usecase/PageLoad';
import CardChange from './usecase/CardChange';
import VideoPlayer from './usecase/VideoPlayer';
import StateManager from './usecase/StateManager';
import Pins from './usecase/Pins';
import TicTacToe from './usecase/TicTacToe';
import Todo from './usecase/Todo';
import Lottery from './usecase/Lottery';
import Lottery2 from './usecase/Lottery2';
import TmpScreenshot from './usecase/TmpScreenshot';
import MoodyBlues from './usecase/MoodyBlues';

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
    path: currentUrl + 'pins',
    title: 'Usecase: Pins',
    component: Pins
  },
  {
    path: currentUrl + 'moody-blues',
    title: 'Usecase: MoodyBlues',
    component: MoodyBlues
  },
  {
    path: currentUrl + 'tic-tac-toe',
    title: 'Usecase: TicTacToe',
    component: TicTacToe
  },
  {
    path: currentUrl + 'todo',
    title: 'Usecase: Todo',
    component: Todo
  },
  {
    path: currentUrl + 'lottery',
    title: 'Usecase: Lottery',
    component: Lottery
  },
  {
    path: currentUrl + 'lottery2',
    title: 'Usecase: Lottery2',
    component: Lottery2
  },
  {
    path: currentUrl + 'tmpScreenshot',
    title: 'Usecase: TmpScreenshot',
    component: TmpScreenshot
  },
  {
    path: currentUrl + 'state-manager',
    title: 'Usecase: StateManager',
    component: StateManager
  },
  {
    path: currentUrl + 'card-change',
    title: 'Usecase: CardChange',
    component: CardChange
  },
  {
    path: currentUrl + 'video-player',
    title: 'Usecase: VideoPlayer',
    component: VideoPlayer
  },
  {
    path: currentUrl + 'page-load',
    title: 'Usecase: PageLoad',
    component: PageLoad
  },
  {
    path: currentUrl + 'liveNewHome',
    title: 'Page: LiveNewHome',
    component: LiveNewHome
  },
];

export default routerArr;
