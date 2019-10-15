import React, { Suspense, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from 'routes';

export default () => {

  return (
    <div>
      Welcome
      <Suspense fallback="Loading...">
        <Switch>
          {routes.map(route =>
            route.component ? (
              <Route
                key={route.name}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={restProps => <route.component {...restProps} title={route.name} />}
              />
            ) : null,
          )}
        </Switch>
      </Suspense>
    </div>
  );
};
