import React from 'react';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import LinkIcon from '@material-ui/icons/Link';
import ImageIcon from '@material-ui/icons/Image';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {getImageLink} from '../../services/imageUpload';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(theme => ({
  toolIcon: {
    color: '#000',
    border: '1 !important',
    flexGrow: 1,
  },
}));

export default function TextEditor(props) {
  const classes = useStyles();
  const {initValue, onChange}= props;
  const [text,setText] = React.useState(initValue);
  const [image, setImage] = React.useState(undefined);
  const [uploading, setUploading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const ref = React.createRef();

  React.useEffect(()=>{
    setText(initValue);
  },[initValue]);

  function handleChange(val) {
    onChange(val);
  }

  function insertAtCursor(myField, val1,val2,valInsert='') {
    if (myField && myField.selectionStart || myField.selectionStart == '0') {
      const startPos = myField.selectionStart;
      const endPos = myField.selectionEnd;
      const sel = initValue.substring(startPos, endPos);
      handleChange(initValue.substring(0, startPos) + val1 +sel+valInsert +val2 + initValue.substring(endPos, initValue.length));
      myField.focus();
      myField.selectionEnd = endPos+val1.length;
    } else {
      handleChange(initValue+val1+val2);
    }
  }
  function bold() {
    insertAtCursor(ref.current, '[B]','[/B]');
  }
  function italic() {
    insertAtCursor(ref.current,'[I]','[/I]');
  }
  function underline() {
    insertAtCursor(ref.current, '[U]','[/U]');
  }
  function strike() {
    insertAtCursor(ref.current, '[STRIKE]','[/STRIKE]');
  }

  function insertLink() {
    insertAtCursor(ref.current,'[URL]','[/URL]');
  }

  function imageLink(val=''){
    insertAtCursor(ref.current,'[IMG]','[/IMG]',val)
  }
  function handleShowNoti(){
    setOpen(true);
    setTimeout(()=> setOpen(false),1000);
  }
  function imageAddLocalToLink(e) {
    let files = e.target.files;
    setUploading(true);
    getImageLink(files[0])
      .then(res=>{
        if (!res)
          handleShowNoti();
        else
          handleChange(initValue+'[IMG]'+res+'[/IMG]');
        setUploading(false);
      })
  }
  return (
    <>
      <TextField
        label="Reply"
        multiline
        fullWidth
        rows="10"
        inputRef={ref}
        variant="standard"
        style={{marginLeft:10,marginTop: 10}}
        value={text}
        onChange={e => handleChange(e.target.value)}
      />
      <Toolbar className={classes.toolbar}>
        <IconButton className={classes.toolIcon} onClick={bold}>
          <FormatBoldIcon/>
        </IconButton>
        <IconButton className={classes.toolIcon} onClick={italic}>
          <FormatItalicIcon/>
        </IconButton>
        <IconButton className={classes.toolIcon} onClick={underline}>
          <FormatUnderlinedIcon/>
        </IconButton>
        <IconButton className={classes.toolIcon} onClick={strike}>
          <StrikethroughSIcon/>
        </IconButton>
        {!uploading ?
          <label htmlFor="icon-button-file">
            <IconButton
              component="span"
              className={classes.toolIcon}
              size="small"
            >
              <ImageIcon/>
            </IconButton>
          </label>
          :
          <IconButton className={classes.toolIcon}>
            <CircularProgress/>
          </IconButton>
        }
        <IconButton className={classes.toolIcon} onClick={insertLink}>
          <LinkIcon/>
        </IconButton>
        <IconButton className={classes.toolIcon} onClick={imageLink}>
          <AddPhotoAlternateIcon/>
        </IconButton>
      </Toolbar>
      <input
        type="file"
        accept="image/*"
        onChange={e=>imageAddLocalToLink(e)}
        id="icon-button-file"
        style={{ display: 'none', }}
      />
      <Snackbar
        open={open}
        onClose={()=>setOpen(false)}
        message={<span id="">{'Upload thất bại'}</span>}
      />
    </>
  );
}
