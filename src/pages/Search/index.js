import React, {useState,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Pagination from '../../components/Pagination';
import ThreadCard from '../../components/ThreadCard';
import * as act from '../../actions/layout';
import AppBar from '../../components/AppBar';

export default function Search(props) {
  let where ={page: 1};
  where = {...where, ... props.match.params };
  const dispatch = useDispatch();
  const search = useSelector(state=>state.layout.search);

  useEffect(()=>{
    dispatch(act.getSearchContent(where.keyword));
    dispatch({type: 'setTitle', payload: where.keyword || 'Search results'});
  },[props.location]);

  function onChangePage(n) {
    props.history.replace(`/search/${where.keyword}/${n}`);
  }

  function refresh() {

  }

  return (
    <>
      <AppBar style={{boxShadow: 'none'}} onAdd={()=>''} onRefresh={refresh}>
        <Pagination page={where.page||1} maxPage={search ? search.last_page : where.page} onChangePage={onChangePage}/>
      </AppBar>
      <div>
        {search ? search.data.map(data =>
          <ThreadCard detail={data} key={data.id} onClick={()=>props.history.push(`/thread/${data.id}`)}/>
        ): ''}
      </div>
    </>
  )
};

