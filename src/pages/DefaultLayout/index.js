import React, { Suspense} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from 'routes';
import { makeStyles } from '@material-ui/core/styles';
import {SwipeableDrawer, CircularProgress} from '@material-ui/core';

import AppBar from '../../components/AppBar';
import LeftDrawer from '../../components/LeftDrawer';
import RightDrawer from '../../components/RightDrawer';
import * as actUi from '../../actions/ui';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  appBar: {
    boxShadow: 'none'
  }
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const ui = useSelector(state => state.ui);
  const dispatch = useDispatch();

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    dispatch(actUi.toggleDrawer(side,open));
  };
  
  return (
    <>
      <div style={ui.loading ? { display: 'none' } : {display: 'block'}}>
        <Suspense
          fallback={<CircularProgress className={classes.progress} variant="determinate" value={ui.loading}/>}
        >
          <Switch>
            {routes.map(route =>
              route.component ? (
                <Route
                  key={route.name}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={restProps => <route.component {...restProps} title={route.name}/>}
                />
              ) : null,
            )}
          </Switch>
        </Suspense>
      </div>
      <div  style={!ui.loading ? {display:'none'}:{display: 'block'}} >
        <AppBar style={{boxShadow: 'none'}} disableMenu={true}/>
        <div style = {{display: 'flex', marginTop: '40vh', justifyContent: 'center'}}>
          <CircularProgress color={'secondary'}/>
        </div>
      </div>
      <SwipeableDrawer
        open={ui.openDrawer.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        <LeftDrawer/>
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor="right"
        open={ui.openDrawer.right}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        <RightDrawer/>
      </SwipeableDrawer>
    </>
  );
}

