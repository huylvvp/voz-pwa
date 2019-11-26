import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import indigo from '@material-ui/core/colors/indigo';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { AppBar, Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/core/Slider';

const useStyles1 = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#3f51b5',
    flexShrink: 0,
  },
  icon: {
    color: grey[50],
    flex: '1'
  },
  pageNumber: {
    backgroundColor: indigo[600],
    marginTop: 5,
    borderRadius: 20,
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageInput: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function Pagination(props) {
  const classes = useStyles1();
  let { page, maxPage , onChangePage } = props;
  page = parseInt(page);
  maxPage = parseInt(maxPage);
  const [val,setVal] = useState(parseInt(page));
  const [openDialog,setOpen] = useState(false);
  const handleFirstPageButtonClick = () => {
    onChangePage(1);
  };
  const handleBackButtonClick = () => {
    onChangePage(page - 1);
  };
  const handleNextButtonClick = () => {
    onChangePage(page + 1);
  };
  const handleLastPageButtonClick = () => {
    onChangePage(maxPage);
  };
  const handleOpenDialog = () => {
    setOpen(!openDialog);
  };
  const handlePageInputChange = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    if (onlyNums > maxPage)
      return setVal(val);
    setVal(parseInt(onlyNums));
  };
  const handleSliderChange = (e,value) => {
    setVal(value)
  };

  return (
    <div>
      <div className={classes.root}>
        <IconButton onClick={handleFirstPageButtonClick} size={'small'} className={classes.icon}
                    disabled={page === 1} aria-label="first page">
          <FirstPageIcon/>
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 1} className={classes.icon}
                    aria-label="previous page">
          <KeyboardArrowLeft/>
        </IconButton>
        <Button className={classes.icon +' '+ classes.pageNumber} onClick={handleOpenDialog}>
          <Typography variant={'h6'}>{`${page}/${maxPage}`}</Typography>
        </Button>
        <IconButton onClick={handleNextButtonClick} disabled={page === maxPage} className={classes.icon}
                    aria-label="next page">
          <KeyboardArrowRight/>
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick} disabled={page === maxPage} className={classes.icon}
          aria-label="last page">
          <LastPageIcon/>
        </IconButton>
      </div>
      <Dialog open={openDialog} onClose={handleOpenDialog} aria-labelledby="page-choose">
        <DialogTitle id="form-dialog-title">Enter page number</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Slider value={parseInt(val)} min={1} max={parseInt(maxPage)} onChange={handleSliderChange} aria-labelledby="page-number-slider" />
          </DialogContentText>
          <div className={classes.pageInput}>
            <TextField
              type={'number'}
              inputProps={{max: maxPage, min: 1}}
              value={val}
              margin="dense"
              id="page-number"
              onChange={handlePageInputChange}
            />
            <Typography>{`/${maxPage}`}</Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{onChangePage(val);handleOpenDialog()}} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
