import Counter0 from './components/Counter';
import Forum from './pages/Forum';
import Home from './pages/Home';
import Thread from './pages/Thread';
import Subscription from './pages/Subscription';
import Message from './pages/Message/index';
import MessDetail from './pages/Message/MessDetail';

const routes = [
  { path: '/home', exact: true, name: 'Home', component: Home },
  { path: '/', exact: true, name: 'Home', component: Home },
  { path: '/test', name: 'Counter', component: Counter0 },
  { path: '/forum/:forum/:page', exact: true, name: 'Forum display', component: Forum },
  { path: '/forum/:forum', exact: true, name: 'Forum display', component: Forum },
  { path: '/thread/:thread', exact: true, name: 'Thread display', component: Thread },
  { path: '/thread/:thread/:page', exact: true, name: 'Thread display', component: Thread },
  { path: '/sub/:page', exact: true, name: 'Subscription', component: Subscription },
  { path: '/sub', exact: true, name: 'Subscription', component: Subscription },
  { path: '/message', exact: true, name: 'Message', component: Message },
  { path: '/message/:detail', exact: true, name: 'Detail', component: MessDetail },
];

export default routes;
