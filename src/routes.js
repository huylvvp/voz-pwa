import Counter0 from './components/Counter';
import Forum from './pages/Forum';

const routes = [
  { path: '/test', exact: true, name: 'Counter', component: Counter0 },
  { path: '/forum', exact: true, name: 'Forum display', component: Forum },
];

export default routes;
