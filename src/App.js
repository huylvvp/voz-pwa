import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './helpers/history';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const DefaultLayout = React.lazy(() => import('pages/DefaultLayout'));

function App() {
  return (
    <Router history={history}>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route exact path="/" name="Welcome counter" component={DefaultLayout} />
          {/* <Route exact path="/404" name="Page 404" component={Page404} />
        <Route exact path="/403" name="Page 403" component={Page403} />
        <Route exact path="/500" name="Page 500" component={Page500} /> */}
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;
