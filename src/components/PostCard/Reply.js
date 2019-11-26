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

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function Reply(props) {
  const {open,onClose, onSubmit, preText} = props;
  const classes = useStyles();
  const [text, setText] = React.useState(preText);

  React.useEffect(()=>{
    setText(preText);
  },[preText]);
  return (
    <div>
      <Dialog fullScreen open={open} onClose={onClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Reply post
            </Typography>
            <Button color="inherit" onClick={()=>onSubmit(text)}>
              <SendIcon/>
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          <TextField
            id="reply-form"
            label="Reply"
            multiline
            fullWidth
            rows="10"
            variant="standard"
            style={{marginLeft:10,marginTop: 10}}
            value={text}
            onChange={(e)=>setText(e.target.value)}
          />
        </div>
      </Dialog>
    </div>
  );
}
