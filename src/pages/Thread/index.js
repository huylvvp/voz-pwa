import React, { useEffect } from 'react';
import PostCard from '../../components/PostCard';
import Deleted from '../../components/PostCard/Deleted';
import { useDispatch, useSelector } from 'react-redux';
import * as act from '../../actions/layout';
import Pagination from '../../components/Pagination';
import LinkGen from '../../services/url_gen';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/Create';
import Reply from '../../components/Reply';
import HTML2BBCode from 'html2bbcode';
import AppBar from '../../components/AppBar';
import {html2text} from '../../helpers/string';

export default function Thread(props) {
  let where ={page: 1};
  where = {...where, ... props.match.params };
  const dispatch = useDispatch();
  const title = useSelector(state=>state.layout.title);
  const login = useSelector(state => state.layout.login);
  const thread = useSelector(state=>state.layout.data.thread[where.thread]);
  const [open, setOpen] = React.useState(false);
  const [openReply, setOpenReply] = React.useState(false);
  const [notify,setNoti] = React.useState('');
  const [transition,setTran] = React.useState(undefined);
  const [replyList, setReplyList] = React.useState([]);
  const [preText, setPreText] = React.useState('');
  const refs = [];
  useEffect(()=>{
    setTran(()=> TransitionUp);
    dispatch(act.getDataThread(where.thread,where.page));
    if (props.location.hash){
      console.log(props);
      let tmp;
      let t = setInterval(()=>{
        tmp = document.getElementById(props.location.hash.split('#')[1]);
        if (tmp){
          tmp.scrollIntoView({behavior: 'smooth'});
          clearInterval(t);
        }
      },1000);
    }
  },[props.location]);

  useEffect(()=>{
    setPreText(getTextReply(replyList));
  },[replyList]);

  function onChangePage(n) {
    props.history.replace(`/thread/${where.thread}/${n}`);
  }

  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }
  function handleCloseNoti() {
    setOpen(false);
  }

  function handleOpenNoti() {
    setOpen(true);
    setTimeout(handleCloseNoti,1000);
  }
  function copyLink(id,post){
    navigator.clipboard.writeText('https://forums.voz.vn'+LinkGen.linkThread(id,post));
    setNoti('Đã copy link');
    handleOpenNoti();
  }

  function repPost(post) {
    setNoti('Đã thêm quote vào trả lời');
    const tmp = [...replyList];
    if (tmp.every(dt=>dt.id !== post.id)) {
      tmp.push(post);
      setReplyList(tmp);
      handleOpenNoti();
    }
    console.log(replyList);
  }

  function handleSubmitReply(text){
    setOpenReply(false);
    console.log(text);
    console.log(getTextReply(replyList))
  }

  function getTextReply(repList) {
    let converter = new HTML2BBCode.HTML2BBCode();
    let out = '';
    repList.forEach(d=>{
      let tmp = `[QUOTE=${d.user.username};${d.id}]`;
      tmp+=converter.feed(d.data.comment);
      tmp+=`[/QUOTE]`;
      out+=tmp;
    });
    return out;
  }

  function bookmark() {
    dispatch(act.saveThread(where.thread, title))
  }

  function refresh() {

  }

  function bookmarkPost(id,text) {
    dispatch({type: 'savePost',
      payload:{
        id: `${where.thread}/${where.page}#post${id}`,
        text: html2text(text)
      }});
    setNoti('Đã đánh dấu bình luận');
    handleOpenNoti();
  }

  return (
    <>
      <AppBar style={{boxShadow: 'none'}} onAdd={bookmark} onRefresh={refresh}>
        <Pagination page={where.page||1} maxPage={thread ? thread.last_page : where.page} onChangePage={onChangePage}/>
      </AppBar>
      <div>
        {thread ? (thread[where.page] ? thread[where.page].data.map((post)=>(
          post.deleted ? <Deleted data={post} key={post.time+post.username}/> : <PostCard data={post} number={post.number} key={post.id}  id={`post${post.id}`} bookmark={()=>bookmarkPost(post.id,post.data.comment)} copyLink={()=>copyLink(where.thread, post.id)} rep={login} onRep={()=>repPost(post)}/>
        )):''):''}
      </div>
      <div style={{border: 20}}>
        <Snackbar
          open={open}
          onClose={handleCloseNoti}
          TransitionComponent={transition}
          message={<span id="message-id">{notify}</span>}
        />
      </div>
      {login ? <>
        <Fab
          style={{
            position: 'fixed',
            bottom: 10,
            right: 2,
          }}
          color={'primary'}
          onClick={() => setOpenReply(true)}
        >
          <CreateIcon/>
        </Fab>
        <Reply preText={preText} onSubmit={handleSubmitReply} onClose={()=>setOpenReply(false)} open={openReply}/>
        </>
        :''
      }
    </>
  );
}
