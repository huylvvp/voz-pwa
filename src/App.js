import React, { useEffect } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './helpers/history';
import './App.scss';
import Pepe from './scss/Pepe.png';
import { askForPermissioToReceiveNotifications } from './pushNotification';
import { useDispatch, useSelector } from 'react-redux';
import {doLogin} from './actions/layout';

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <img src={Pepe} width={'100%'} alt={'launch'}/>
  </div>
);
const DefaultLayout = React.lazy(() => import('pages/DefaultLayout'));

function App() {
  if (!localStorage.getItem('notify_token'))
    askForPermissioToReceiveNotifications();
  const layout = useSelector(state=>state.layout);
  const dispatch = useDispatch();
  useEffect(()=>{
    if (layout.login){
      dispatch(doLogin(layout.account.username,layout.account.password));
    }
  },[]);
  return (
    <Router history={history}>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route path="/" name="Welcome counter" component={DefaultLayout} />
          {/* <Route exact path="/404" name="Page 404" component={Page404} />
        <Route exact path="/403" name="Page 403" component={Page403} />
        <Route exact path="/500" name="Page 500" component={Page500} /> */}
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;
