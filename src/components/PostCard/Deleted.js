import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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

export default function Deleted(props) {
  const classes = useStyles();
  const {username, time, data} = props.data;

  return (
    <Card id={`post${data.id}`}>
      <div className={classes.top}>
        <Typography className={classes.smallWhite}>{time}</Typography>
      </div>
      <CardActionArea>
        <CardHeader
          className={classes.header}
          title={
            <div style={{display:'flex',alignItems:'center'}}>
              <Typography variant={'h6'} color={'primary'}>
                {username}
              </Typography>
            </div>
          }
        />
      </CardActionArea>
      <CardContent style={{paddingTop: 2}}>
        {data}
      </CardContent>
    </Card>
  );
}
