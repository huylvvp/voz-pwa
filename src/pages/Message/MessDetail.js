import React, { useEffect } from 'react';
import PostCard from '../../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import * as act from '../../actions/layout';
import Pagination from '../../components/Pagination';
import AppBar from '../../components/AppBar';

export default function MessDetail(props) {
  let id = props.match.params.id;
  const dispatch = useDispatch();
  const mess = useSelector(state=>state.layout.data.message[id]);

  useEffect(()=>{
    dispatch(act.getMessDetail(id));
    dispatch({type: 'setTitle', payload: 'Message details'})
  },[props.location]);

  return (
    <>
      <AppBar style={{boxShadow: 'none'}}/>
      <div>
        {mess ?
          <PostCard data={mess} number={mess.number} disableQuoteLink={true}/> :''
        }
      </div>
    </>
  );
}
