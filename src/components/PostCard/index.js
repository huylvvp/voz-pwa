import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import EventIcon from '@material-ui/icons/Event';
import CommentIcon from '@material-ui/icons/Comment';
import RoomIcon from '@material-ui/icons/Room';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import LinkIcon from '@material-ui/icons/Link';
import CallMadeIcon from '@material-ui/icons/CallMade';
import ReplyIcon from '@material-ui/icons/Reply';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles(theme => ({
  top: {
    display: 'flex',
    flex: 1,
    backgroundColor: theme.palette.primary.main,
    padding: 2,
    color: '#FFF'
  },
  header:{
    backgroundColor: theme.palette.grey['300'],
    paddingTop: 0,
    paddingBottom: 0,
    // marginBottom: 1
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  online: {
    fontSize: '0.5rem',
    color: '#8bc34a',
    marginLeft: 10
  },
  small: {
    color: theme.palette.primary.main,
    fontSize: '1rem'
  },
  smallWhite: {
    marginLeft: 10,
    color: '#FFF',
    fontSize: '1rem'
  },
  quote: {
    backgroundColor: theme.palette.grey['300'],
    padding: 2,
    marginBottom: 2
  },
  quoteBy: {
    display: 'flex',
    flex: 1,
    backgroundColor: theme.palette.grey['400'],
    color: theme.palette.primary.main,
    fontStyle: 'italic',
    marginBottom: 5
  }
}));

const Quote = (props) =>{
  const classes = useStyles();
  const {data,disableQuoteLink} = props;

  function goTo() {
    // let tmp = data.url.split('=')[1].split('#');
    // props.history.push(`/thread/${tmp[0]}`)
  }

  return (
    <div className={classes.quote}>
      {data.by ? (
        <div className={classes.quoteBy}>
          <Typography variant={'subtitle1'} style={{fontWeight: 700,fontStyle: 'italic'}}>
            {`${data.by}    `}
          </Typography>
          {/*<Typography variant={'subtitle1'}>*/}
          {/*  {'\u00a0\u00a0said\u00a0'}*/}
          {/*</Typography>*/}
          {!disableQuoteLink ?
            <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
              <IconButton size={'small'} style={{padding:0}} onClick={goTo}>
                <CallMadeIcon/>
              </IconButton>
            </div>:''
          }
        </div>
      ):''}
      <div className={'box-content'} dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  )
};

export default function PostCard(props) {
  const classes = useStyles();
  const {data,number,disableQuoteLink, copyLink, rep, onRep,bookmark} = props;

  return (
    <Card id={`post${data.id}`}>
      <div className={classes.top}>
        <BookmarkIcon fontSize={'small'} onClick={bookmark}/>
        <LinkIcon fontSize={'small'} onClick={copyLink}/>
        <Typography className={classes.smallWhite}>{data.time}</Typography>
        <div style={{display: 'flex', flexGrow:1, justifyContent: 'flex-end'}}>
          <Typography className={classes.smallWhite}>{`#${number}`}</Typography>
          {rep ? <ReplyIcon onClick={onRep}/>:''}
        </div>
      </div>
      <CardActionArea>
      <CardHeader
        className={classes.header}
        avatar={
          data.user.avatar ?
          <Avatar aria-label={`avatar_${data.user.username}`} className={classes.avatar} src={'https://forums.voz.vn/'+data.user.avatar}/>
          :
            <Avatar aria-label="recipe" className={classes.avatar}>
              {data.user.username[0].toUpperCase()}
            </Avatar>
        }
        action={
          <div style={{marginTop: 10}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
              <EventIcon color={'primary'} className={classes.small}/>
              <Typography variant={'body1'} className={classes.small}>{data.user.joinDate}</Typography>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
              <CommentIcon color={'primary'} className={classes.small}/>
              <Typography variant={'body1'} className={classes.small}>{data.user.posts}</Typography>
            </div>
            {data.user.location?
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
              <RoomIcon color={'primary'} className={classes.small}/>
              <Typography variant={'body1'} className={classes.small}>{data.user.location.length>10 ? data.user.location.substring(0, 10)+ '...' : data.user.location}</Typography>
              </div>
              :''
            }
          </div>
        }
        title={
          <div style={{display:'flex',alignItems:'center'}}>
            <Typography variant={'h6'} color={'primary'}>
              {data.user.username}
            </Typography>
            {data.user.online && <FiberManualRecordIcon className={classes.online} />}

          </div>
        }
        subheader={
          <Typography variant={'subtitle1'} className={classes.small}>
            {data.user.description}
          </Typography>
        }
      />
      </CardActionArea>
      <CardContent style={{paddingTop: 2}}>
        {data.data.quotes ? data.data.quotes.map(quote=>(
          <Quote data={quote} key={data.id + data.time + quote.url} disableQuoteLink={disableQuoteLink}/>
        )):''}
        {data.data.comment ? <div className={'box-content'} dangerouslySetInnerHTML={{ __html: data.data.comment}} style={{paddingTop: 5}}/>:''}
        <div>
          {data.signature.comment? <div dangerouslySetInnerHTML={{ __html: data.signature.comment}} style={{paddingBottom: 5}}/>:''}
          {data.signature.quotes ? data.signature.quotes.map(quote=>(
            <Quote data={quote} key={data.id +data.time+ quote.url+quote.by}/>
          )):''}
        </div>
      </CardContent>
    </Card>
  );
}
