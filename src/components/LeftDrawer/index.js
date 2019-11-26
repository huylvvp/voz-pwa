import React from 'react';
import { useDispatch } from 'react-redux';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';
import Login from './Login';
import * as actUi from '../../actions/ui';
import history from '../../helpers/history';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

export default function LeftDrawer() {
  const dispatch = useDispatch();
  const [val,setVal] = React.useState(17);
  const [openDialog, setOpen] = React.useState(false);

  function homeClick(){
    history.push('/home');
    dispatch(actUi.toggleDrawer('left',false));
  }

  function subClick(){
    history.push('/sub');
    dispatch(actUi.toggleDrawer('left',false));
  }

  function messageClick(){
    history.push('/message');
    dispatch(actUi.toggleDrawer('left',false));
  }

  function jumpTo(forum){
    history.push(`/forum/${forum}`);
    dispatch(actUi.toggleDrawer('left',false));
  }

  function handleClose(){
    setOpen(false);
  }
  return (
    <div
      style={{
        width: 'auto',
      }}
      role="presentation"
    >
      <div style={{position: 'sticky',top: 0, backgroundColor: '#FFF'}}>
        <div style={{display: 'flex'}}>
          <Login onClick={()=>dispatch(actUi.toggleDrawer('left',false))}/>
          <IconButton
            style={{position: 'absolute', right: 0}}
            edge="end"
            color="inherit"
            aria-label="close left drawer"
            onClick={()=> dispatch(actUi.toggleDrawer('left',false))}
          >
          <ArrowBackIosIcon/>
          </IconButton>
        </div>
        <div>
        <Divider style={{display: 'block'}}/>
        </div>
      </div>
      <List>
        <ListItem button style={{width: '75vw'}} onClick={homeClick}>
          <ListItemIcon><HomeIcon/></ListItemIcon>
          <ListItemText primary={'Trang chủ'}/>
        </ListItem>
        <Divider/>
        <ListItem button onClick={subClick}>
          <ListItemIcon><SubscriptionsIcon/></ListItemIcon>
          <ListItemText primary={'Đang theo dõi'}/>
        </ListItem>
        <Divider/>
        <ListItem button onClick={messageClick}>
          <ListItemIcon><ModeCommentIcon/></ListItemIcon>
          <ListItemText primary={'Tin nhắn'}/>
        </ListItem>
        <Divider/>
        <ListItem button onClick={()=>setOpen(true)}>
          <ListItemIcon><CallMissedOutgoingIcon/></ListItemIcon>
          <ListItemText primary={'Chuyển tới'}/>
        </ListItem>
        <Divider/>
      </List>
      <Dialog open={openDialog} onClose={handleClose} aria-labelledby="jump-choose">
        <DialogTitle>Enter forum code</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              type={'number'}
              inputProps={{max: 500, min: 1}}
              value={val}
              margin="dense"
              id="forum-number"
              onChange={e=>setVal(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>jumpTo(val)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};
