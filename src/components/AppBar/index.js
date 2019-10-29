import React, {useState,useRef} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import InputBase from '@material-ui/core/InputBase';
import CloseIcon from '@material-ui/icons/Close';

import * as actUi from '../../actions/ui';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Appbar() {
  const classes = useStyles();
  const layout =  useSelector(state => state.layout);
  const ui = useSelector(state => state.ui);
  const dispatch = useDispatch();
  const searchRef = useRef(null);

  function onClickSearch() {
    dispatch(actUi.toggleSearch(!ui.openSearch));
    if (ui.openSearch){
      //search request
    } else {
      // searchRef.current.focus();
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar + classes.root}>
          {
            ui.openSearch ?
              <IconButton
                edge="start"
                className={classes.menuButton}
                onClick={()=> dispatch(actUi.toggleSearch(!ui.openSearch))}
                color="inherit"
                aria-label="close search input"
              >
                <CloseIcon />
              </IconButton>
              :
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={()=> dispatch(actUi.toggleDrawer('left'))}
              >
                <MenuIcon />
              </IconButton>
          }
          <Typography className={classes.title} variant="h6" noWrap style={ui.openSearch ? {display: 'none'}:{}}>
            {layout.title}
          </Typography>
          <InputBase
            id = {'search-input'}
            className={classes.root}
            style={ui.openSearch ? {color: 'white'}: {color: 'white',display: 'none'}}
            placeholder="Tìm kiếm ..."
            inputProps={{ 'aria-label': 'Tim kiem' }}
            inputRef={searchRef}
          />
          <IconButton color="inherit"
                      onClick={()=> onClickSearch()}
          >
            <SearchIcon/>
          </IconButton>
          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
