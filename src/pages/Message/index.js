import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../../components/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InfoIcon from '@material-ui/icons/Info';
import { useSelector, useDispatch } from 'react-redux';
import ThreadCard from '../../components/ThreadCard';
import * as act from '../../actions/layout';
import { forum as fConst } from '../../constants/forum';
import Pagination from '../../components/Pagination';
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/Create';
import Create from '../../components/ThreadCard/Create';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabs:{
    flexGrow: 0.5,
    backgroundColor: theme.palette.grey['200']
  }
}));

export default function Message(props) {
  const classes = useStyles();
  const message = useSelector(state=>state.layout.data.message);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [openRep, setOpenRep] = React.useState(false);

  useEffect(()=>{
    dispatch(act.getDataMess());
  },[props.location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getMessageRow = (message)=>{
    const detail = {
      title: message.title,
      replies: '',
      views: '',
      author: message.author.name,
      lastpost: {
        date: message.date,
        time: message.time
      }
    };
    return <ThreadCard detail={detail} id={message.id} key={message.id} onClick={()=>props.history.push(`/message/${message.id}`)}/>
  };
  const sendMessage = (mess)=>{

  }
  return (
    <>
      <AppBar style={{boxShadow: 'none'}}/>
      <div className={classes.root}>
      <Tabs value={value} onChange={handleChange}>
        <Tab className={classes.tabs} label="Inbox" id={'inbox'}/>
        <Tab className={classes.tabs} label="Outbox" id={'outbox'} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {message.inbox ? message.inbox.map(mes=>(
          getMessageRow(mes)
        )):
          <div>
            <InfoIcon/>
          </div>
        }
      </TabPanel>
      <TabPanel value={value} index={1}>
        {message.outbox ? message.outbox.map(mes=>(
            getMessageRow(mes)
          )):
          <div>
            <InfoIcon/>
          </div>
        }
      </TabPanel>
        <Fab
          style={{position: 'fixed',
            bottom: 10,
            right: 2,
          }}
          color={'primary'}
          onClick={()=>setOpenRep(true)}
        >
          <CreateIcon/>
        </Fab>
        <Create title={'Text a message'} f1={'To'} f2={'Content'} open={openRep} onClose={()=>setOpenRep(false)} onSubmit={sendMessage}/>
    </div>
    </>
  );
}
