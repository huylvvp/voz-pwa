import React, {useState,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Pagination from '../../components/Pagination';
import ThreadCard from '../../components/ThreadCard';
import * as act from '../../actions/layout';
import * as actUi from '../../actions/ui';
import {forum as fConst} from '../../constants/forum';
import CreateIcon from '@material-ui/icons/Create';
import Fab from '@material-ui/core/Fab';
import Create from '../../components/ThreadCard/Create';
import AppBar from '../../components/AppBar';

export default function Forum(props) {
  let where ={page: 1};
  where = {...where, ... props.match.params };
  const dispatch = useDispatch();
  const forum = useSelector(state=>state.layout.data.forum[where.forum]);
  const [openCreate, setOpen] = React.useState(false);

  useEffect(()=>{
    dispatch(act.getDataForum(where.forum,where.page));
    fConst.forEach((box)=>{
      if (box[1] == where.forum)
        dispatch({type: 'setTitle', payload: box[0]});
    });
  },[props.location]);

  function onChangePage(n) {
    props.history.replace(`/forum/${where.forum}/${n}`);
  }

  function handleSubmit(data) {
    console.log(data);
  }

  function bookmark() {
    dispatch(act.saveForum(where.forum))
  }

  function refresh() {

  }

  function showRightDrawer() {
    dispatch(actUi.toggleDrawer('right'));
  }

  return (
    <>
      <AppBar style={{boxShadow: 'none'}} onAdd={bookmark} onRefresh={refresh}>
        <Pagination page={where.page||1} maxPage={forum ? forum.last_page : where.page} onChangePage={onChangePage}/>
      </AppBar>
      <div>
        {forum ? (forum[where.page] ? forum[where.page].data.map(data =>
          <ThreadCard detail={data} key={data.id} onClick={()=>props.history.push(`/thread/${data.id}`)}/>
        ) : '' ): ''}
      </div>
      <Fab
        style={{position: 'fixed',
          bottom: 10,
          right: 2,
        }}
        color={'primary'}
        onClick={()=>setOpen(true)}
      >
        <CreateIcon/>
      </Fab>
      <Create title={'Create thread'} f1={'Title'} f2={'Content'} open={openCreate} onClose={()=>setOpen(false)&&console.log('hello')} onSubmit={handleSubmit}/>
    </>
  )
};

