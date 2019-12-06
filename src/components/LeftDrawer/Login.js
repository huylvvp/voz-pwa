import React from 'react';
import { Avatar} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import * as act from './../../actions/layout';
export default function Login(props) {
  const layout = useSelector(state => state.layout);
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState({
    username: '',
    password: ''
  });
  const dispatch  = useDispatch();
  function handleClick() {
    setOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(act.doLogin(input.username,input.password));
    setOpen(false);
  }
  function handleChange(e) {
    const value = e.target.value;
    setInput({
      ...input,
      [e.target.name]: value
    })
  }
  return (
    <>
      <ButtonBase
        style={{
          width: '100%',
        }}
        component={'div'}
        onClick={handleClick}
      >
        { layout.login ?
          <div style={{display:'flex', flexGrow: 1}}>
              <Avatar
                alt={layout.account.username}
                style={{
                  margin: 10,
                  color: '#fff',
                  backgroundColor: '#7986cb',
                  zoom: 1.3
                }}
                src={layout.account.avatar ? `https://forums.voz.vn/${layout.account.avatar}` : undefined}
              >
                {layout.account.username.charAt(0).toUpperCase()}
              </Avatar>
              <div style={{display: 'flex',flexDirection: 'column', justifyContent: 'center'}}>
                <Typography variant={'h5'}>{layout.account.username}</Typography>
                <Typography variant={'subtitle1'}>{layout.account.level}</Typography>
              </div>
          </div>
          :
          <div style={{display:'flex', flexGrow: 1}}>
            <Avatar
              children={<PersonIcon/>}
              alt={'guest'}
              style={{
                margin: 10,
                color: '#fff',
                backgroundColor: '#7986cb',
                zoom: 1.3
              }}
            />
            <div style={{display: 'flex',flexDirection: 'column', justifyContent: 'center'}}>
              <Typography variant={'h6'}> Khách </Typography>
              <Typography variant={'subtitle1'}> ʕ•́ᴥ•̀ʔっ♡</Typography>
            </div>
          </div>
        }
      </ButtonBase>
      <Dialog open={open} onClose={()=>setOpen(false)} >
        <DialogTitle>{'Log in'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Username"
            name="username"
            type="text"
            value={input.username}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogContent>
          <TextField
            margin="dense"
            label="Password"
            name="password"
            type="password"
            value={input.password}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
};
