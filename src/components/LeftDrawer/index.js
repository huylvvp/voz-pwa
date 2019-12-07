import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';
import Login from './Login';
import * as actUi from '../../actions/ui';
import * as act from '../../actions/layout'
import history from '../../helpers/history';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PaymentIcon from '@material-ui/icons/Payment';
import ExitToApp from '@material-ui/icons/ExitToApp';
export default function LeftDrawer() {
  const dispatch = useDispatch();
  const [val,setVal] = React.useState(17);
  const login = useSelector(state => state.layout.login);
  const logoutPath = useSelector(state => state.layout.logoutPath);
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
  function logoutClick() {
    dispatch(act.doLogout(logoutPath));
  }
  function handleClose(){
    setOpen(false);
  }
  
  function purchase() {
    if (!window.PaymentRequest) {
      // PaymentRequest API is not available.
      console.log('Payment not supported');
      return;
    }

    // Supported payment methods
     let supportedInstruments = [{
      supportedMethods: ['basic-card'],
      data: {
        supportedNetworks: [
          'visa', 'mastercard', 'amex', 'discover',
          'diners', 'jcb', 'unionpay'
        ]
      }
    }];

    // Checkout details
    let details = {
      displayItems: [{
        label: 'Donate & Remove ads from app',
        amount: { currency: 'USD', value: '3.00' }
      }, {
        label: 'Voz memver discount',
        amount: { currency: 'USD', value: '-1.00' }
      }],
      total: {
        label: 'Total',
        amount: { currency: 'USD', value : '2.00' }
      }
    };

    // 1. Create a `PaymentRequest` instance
    let request = new PaymentRequest(supportedInstruments, details);

    // 2. Show the native UI with `.show()`
    request.show()
    // 3. Process the payment
      .then(result => {
        // POST the payment information to the server
        return fetch('/pay', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(result.toJSON())
        }).then(response => {
          // 4. Display payment results
          if (response.status === 200) {
            // Payment successful
            return result.complete('success');
          } else {
            // Payment failure
            return result.complete('fail');
          }
        }).catch(() => {
          return result.complete('fail');
        });
      });
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
        {login &&
        <>
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
        </>
        }
        <ListItem button onClick={()=>setOpen(true)}>
          <ListItemIcon><CallMissedOutgoingIcon/></ListItemIcon>
          <ListItemText primary={'Chuyển tới'}/>
        </ListItem>
        {!localStorage.getItem('purchased') &&
        <ListItem button onClick={purchase}>
          <ListItemIcon><PaymentIcon/></ListItemIcon>
          <ListItemText primary={'Donate'}/>
        </ListItem>
        }
        {login &&
          <ListItem button onClick={logoutClick}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary={'Log out'}/>
          </ListItem>
        }
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
