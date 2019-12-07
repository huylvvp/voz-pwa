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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as actUi from '../../actions/ui';
import * as act from '../../actions/layout';
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';
import { ListItemIcon } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import history from '../../helpers/history';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    boxShadow: 'none'
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

export default function Appbar(props) {
  const classes = useStyles();
  const {onRefresh, onAdd, disableMenu, subThread,unSub} = props;
  const layout =  useSelector(state => state.layout);
  const ui = useSelector(state => state.ui);
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleRefresh = () => {
    handleClose();
    onRefresh();
  };

  const handleAdd = () => {
    handleClose();
    onAdd();
  };

  const handleShow = () => {
    handleClose();
    dispatch(actUi.toggleDrawer('right', true));
  };

  const handleSubscribe = () =>{
    handleClose();
    subThread();
  };
  const handleUnSubscribe = () =>{
    handleClose();
    unSub();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function onClickSearch() {
    dispatch(actUi.toggleSearch(!ui.openSearch));
    if (ui.openSearch){
      //search request
      history.push(`/search/${searchRef.current.value}/1`)
    } else {
      searchRef.current.focus();
    }
  }
  return (
      <AppBar position="sticky" className={classes.appBar}>
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
            className={classes.root}
            style={ui.openSearch ? {color: 'white'}: {color: 'white',display: 'none'}}
            placeholder="Tìm kiếm ..."
            inputProps={{ 'aria-label': 'Tim kiem' }}
            inputRef={searchRef}
          />
          {layout.login &&
          <IconButton color="inherit"
                      onClick={() => onClickSearch()}
          >
            <SearchIcon/>
          </IconButton>
          }
          <IconButton edge="end" color="inherit" onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
            <MoreIcon />
          </IconButton>
        </Toolbar>
        <div>
          {!disableMenu ?
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleRefresh}>
                <ListItemIcon>
                  <RefreshIcon/>
                </ListItemIcon>
                {'Làm mới'}
              </MenuItem>
              <MenuItem onClick={handleAdd}>
                <ListItemIcon>
                  <AddIcon/>
                </ListItemIcon>
                {'Thêm đánh dấu '}
              </MenuItem>
              <MenuItem onClick={handleShow}>
                <ListItemIcon>
                  <StarIcon/>
                </ListItemIcon>
                {'Xem đánh dấu '}
              </MenuItem>
              { layout.login && subThread &&
                <MenuItem onClick={handleSubscribe}>
                  <ListItemIcon>
                    <SubscriptionsIcon/>
                  </ListItemIcon>
                  {'Theo dõi bài viết'}
                </MenuItem>
              }
              { layout.login && unSub &&
                <MenuItem onClick={handleUnSubscribe}>
                  <ListItemIcon>
                    <UnsubscribeIcon/>
                  </ListItemIcon>
                  {'Bỏ theo dõi bài viết'}
                </MenuItem>
              }
            </Menu>
            :''
          }
        </div>
        {props.children}
      </AppBar>
  );
}
