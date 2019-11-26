import React from 'react';
import { Avatar} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

export default function Login(props) {
  const {onClick} = props;
  const layout = useSelector(state => state.layout);
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(true);
  }

  function handleSubmit() {
    setOpen(false);
  }
  return (
    <>
      <ButtonBase
        style={{
          width: '100%',
        }}
        onClick={handleClick}
      >
        { layout.login ?
          <div style={{display:'flex', flexGrow: 1}}>
            <Button>
            <Avatar
              alt={layout.account.username}
              style={{
                margin: 10,
                color: '#fff',
                backgroundColor: '#7986cb',
                zoom: 1.3
              }}
            >
              {'T'}
            </Avatar>
            <div style={{display: 'flex',flexDirection: 'column', justifyContent: 'center'}}>
              <Typography variant={'h5'}> Hello</Typography>
              <Typography variant={'subtitle1'}> Hello</Typography>
            </div>
            </Button>
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
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogContent>
          <TextField
            margin="dense"
            label="Password"
            type="password"
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
