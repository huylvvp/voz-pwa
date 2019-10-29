import React from 'react';
import { Avatar} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';

export default function Login() {
  const layout = useSelector(state => state.layout);
  return (
    <div
      style={{
        width: 'auto',
      }}
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
    </div>
  )
};
