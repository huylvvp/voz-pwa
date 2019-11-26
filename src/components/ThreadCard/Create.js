import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import Slide from '@material-ui/core/Slide';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function Create(props) {
  const {open,onClose, onSubmit,title, f1,f2} = props;
  const classes = useStyles();
  const [thread, setThread] = React.useState({title: '', content: ''});
  const [notif, setNoti] = React.useState(false);

  function handleSubmit() {
    if (thread.title&&thread.content)
      onSubmit(thread);
    else {
      setNoti(true);
      setTimeout(()=>setNoti(false),1000);
    }
  }
  return (
    <div>
      <Dialog fullScreen open={open} onClose={onClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
            <Button color="inherit" onClick={handleSubmit}>
              <SendIcon/>
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          <TextField
            label={f1}
            multiline
            fullWidth
            rows="2"
            variant="standard"
            required
            style={{marginLeft:10,marginTop: 10}}
            onChange={(e)=>setThread({...thread, title: e.target.value})}
          />
          <TextField
            label={f2}
            multiline
            fullWidth
            rows="10"
            variant="standard"
            required
            style={{marginLeft:10,marginTop: 10}}
            onChange={(e)=>setThread({...thread, content: e.target.value})}
          />
        </div>
      </Dialog>
      <div style={{border: 20}}>
        <Snackbar
          open={notif}
          onClose={()=>setNoti(false)}
          message={<span id="message-id">Please fill out fields above</span>}
        />
      </div>
    </div>
  );
}
