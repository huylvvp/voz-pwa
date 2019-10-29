import React from 'react';
import { useDispatch } from 'react-redux';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Login from './Login';
import * as actUi from '../../actions/ui';

export default function LeftDrawer() {
  const dispatch = useDispatch();
  return (
    <div
      style={{
        width: 'auto',
      }}
      role="presentation"
    >
      <div style={{position: 'sticky',top: 0, backgroundColor: '#FFF'}}>
        <div style={{display: 'flex'}}>
          <Login/>
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
        {['Inbox', 'Starred', 'Send email', 'Hello world day by day'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
            <ListItemText primary={text}/>
          </ListItem>
        ))}
      </List>
      <Divider/>
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
            <ListItemText primary={text}/>
          </ListItem>
        ))}
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
              <ListItemText primary={text}/>
            </ListItem>
          ))}
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
            <ListItemText primary={text}/>
          </ListItem>
        ))}
      </List>
    </div>
  )
};
