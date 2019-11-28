import React from 'react';
import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { forum } from '../../constants/forum';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import CloseIcon from '@material-ui/icons/Close';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useDispatch, useSelector } from 'react-redux';
import * as actUi from '../../actions/ui';
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ButtonBase from '@material-ui/core/ButtonBase';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import PersonIcon from '@material-ui/core/SvgIcon/SvgIcon';
import ShortTextIcon from '@material-ui/icons/ShortText';
import history from '../../helpers/history';
import {truncate} from '../../helpers/string';

const useStyles = makeStyles(theme => ({
  root: {
    width: '80vw',
    color: theme.palette.grey[600]
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  moreIcon: {
    color: theme.palette.common.black,
  },
  panelSummary: {
    display: 'flex',
    alignItems: 'center',
    margin: 0
  },
  panelDetail: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    color: theme.palette.grey[600]
  },
  icon: {
    marginRight: 15
  },
  row: {
    display:'flex',
    justifyContent: 'flex-start',
    flexGrow: 1
  },
  pl: {
    paddingLeft: 10
  },
}));

export default function RightDrawer() {
  const classes = useStyles();
  const saved = useSelector(state=>state.layout.bookmark);
  const dispatch = useDispatch();

  function handleClickForum(id){
    dispatch(actUi.toggleDrawer('right',false));
    history.push(`/forum/${id}`)
  }

  function removeForum(id) {
    dispatch({type: 'removeForum', payload: id});
  }

  function handleClickThread(id){
    dispatch(actUi.toggleDrawer('right',false));
    history.push(`/thread/${id}`)
  }

  function removeThread(id) {
    dispatch({type: 'removeThread', payload: id});
  }

  function handleClickPost(id){
    dispatch(actUi.toggleDrawer('right',false));
    history.push(`/thread/${id}`)
  }

  function removePost(id) {
    dispatch({type: 'removeThread', payload: id});
  }

  return (
    <div className={classes.root}>
      <IconButton
        style={{position: 'absolute', left: 0}}
        edge="end"
        color="inherit"
        aria-label="close left drawer"
        onClick={()=> dispatch(actUi.toggleDrawer('right',false))}
        >
        <ArrowForwardIosIcon/>
      </IconButton>
      <div className={classes.title}>
        <Typography variant={'h6'}>{'Đánh dấu'}</Typography>
      </div>
      <Divider />
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon className={classes.moreIcon}/>}
          classes={{
            content: classes.panelSummary
          }}
        >
          <BookmarkIcon className={classes.icon}/>
          <Typography variant={'h6'}>{'Chuyên mục'}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.panelDetail}>
            {saved.forum.map(f=>(
              <div className={classes.row+' '+classes.pl} key={`saveF${f.id}`}>
                <ButtonBase
                  className={classes.row}
                  component={'div'}
                  onClick={()=>handleClickForum(f.id)}
                >
                  <QuestionAnswerIcon/>
                  <Typography className={classes.pl} variant={'subtitle1'}>{truncate(f.text, 40)}</Typography>
                </ButtonBase>
                <IconButton onClick={()=> removeForum(f.id)}>
                  <CloseIcon/>
                </IconButton>
              </div>
            ))}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon className={classes.moreIcon}/>}
          classes={{
            content: classes.panelSummary
          }}
        >
          <BookmarkIcon className={classes.icon}/>
          <Typography variant={'h6'}>{'Bài viết'}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.panelDetail}>
            {saved.thread.map(f=>(
              <div className={classes.row+' '+classes.pl} key={`saveP${f.id}`}>
                <ButtonBase
                  className={classes.row}
                  component={'div'}
                  onClick={()=>handleClickThread(f.id)}
                >
                  <ShortTextIcon/>
                  <Typography className={classes.pl} variant={'subtitle1'}>{truncate(f.text, 40)}</Typography>
                </ButtonBase>
                <IconButton onClick={()=> removeThread(f.id)}>
                  <CloseIcon/>
                </IconButton>
              </div>
            ))}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon className={classes.moreIcon}/>}
          classes={{
            content: classes.panelSummary
          }}
        >
          <BookmarkIcon className={classes.icon}/>
          <Typography variant={'h6'}>{'Bình luận'}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.panelDetail}>
            {saved.post.map(f=>(
              <div className={classes.row+' '+classes.pl} key={`saveP${f.id}`}>
                <ButtonBase
                  className={classes.row}
                  component={'div'}
                  onClick={()=>handleClickPost(f.id)}
                >
                  <ShortTextIcon/>
                  <Typography className={classes.pl} variant={'subtitle1'}>{truncate(f.text, 40)}</Typography>
                </ButtonBase>
                <IconButton onClick={()=> removePost(f.id)}>
                  <CloseIcon/>
                </IconButton>
              </div>
            ))}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
};
