import React, {useState,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Pagination from '../../components/Pagination';
import ThreadCard from '../../components/ThreadCard';
import * as act from '../../actions/layout';
import AppBar from '../../components/AppBar';

export default function Subscription(props) {
  let where ={page: 1};
  where = {...where, ... props.match.params };
  const dispatch = useDispatch();
  const sub = useSelector(state=>state.layout.data.sub);
  
  useEffect(()=>{
    dispatch(act.getDataSub(where.page));
  },[props.location]);

  function onChangePage(n) {
    props.history.replace(`/sub/${n}`);
  }

  return (
    <>
      <AppBar style={{boxShadow: 'none'}}>
        <Pagination page={where.page||1} maxPage={sub ? sub.last_page : where.page} onChangePage={onChangePage}/>
      </AppBar>
      <div>
        {sub ? (sub[where.page] ? sub[where.page].data.map(data =>
          <ThreadCard detail={data} key={data.id} onClick={()=>props.history.push(`/thread/${data.id}`)}/>
        ) : '' ): ''}
      </div>
    </>
  )
};

