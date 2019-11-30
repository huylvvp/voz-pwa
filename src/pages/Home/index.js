import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as act from '../../actions/layout';

import {forum, category} from '../../constants/forum';
import AppBar from '../../components/AppBar';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  link: {
    textDecoration: 'none',
  },
  listText: {
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightMedium
  },
  white:{
    color: theme.palette.common.white
  },
  bgPrimary: {
     backgroundColor: theme.palette.primary.main
  },
  p0: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  divider: {
    marginTop: 1
  }
}));

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  React.useEffect(()=>{
    dispatch({type: 'setTitle', payload: 'Trang chủ'});
  },[]);

  function ListItemLink(props) {
    return (
      <Link to={props.to} className={classes.link}>
        <ListItem className={classes.p0} button>
            <ListItemText primary={<Typography variant={'h6'} className={classes.listText}>{props.text}</Typography>} />
        </ListItem>
      </Link>
    );
  }
  // function ListForum(cate){
  //   return (
  //
  //   )
  // }
  return (
    <>
      <AppBar style={{boxShadow: 'none'}}/>

      <div className={classes.root}>
        <div className={classes.divider}></div>
        {category.map((cate,index)=>(
            <ExpansionPanel defaultExpanded key={cate[0]}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon className={classes.white}/>}
                id={`cate-${index}`}
                className={classes.bgPrimary}
              >
                <Typography variant={'h5'} className={classes.white}>{cate[0]}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.p0}>
                <List className={classes.root}>
              {forum.slice(cate[1],cate[2]+1).map(fm=>(
                <ListItemLink to={`/forum/${fm[1]}`} text={`${fm[0]}`} key={'forum-' + fm[0]}/>
              ))}
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        )}
      </div>
    </>
  );
}
