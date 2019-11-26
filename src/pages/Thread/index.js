import React, { useEffect } from 'react';
import PostCard from '../../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import * as act from '../../actions/layout';
import Pagination from '../../components/Pagination';
import LinkGen from '../../services/url_gen';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/Create';
import Reply from '../../components/PostCard/Reply';
import HTML2BBCode from 'html2bbcode';
import AppBar from '../../components/AppBar';

export default function Thread(props) {
  let where ={page: 1};
  where = {...where, ... props.match.params };
  const dispatch = useDispatch();
  const login = useSelector(state => !state.layout.login);
  const thread = useSelector(state=>state.layout.data.thread[where.thread]);
  const [open, setOpen] = React.useState(false);
  const [openReply, setOpenReply] = React.useState(false);
  const [notify,setNoti] = React.useState('');
  const [transition,setTran] = React.useState(undefined);
  const [replyList, setReplyList] = React.useState([]);
  const [preText, setPreText] = React.useState('');

  useEffect(()=>{
    console.log(HTML2BBCode);
    setTran(()=> TransitionUp);
    dispatch(act.getDataThread(where.thread,where.page));
  },[props.location]);

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
    setNoti('Copied link to clipboard');
    handleOpenNoti();
  }

  function repPost(post) {
    setNoti('Added to quote');
    handleOpenNoti();
    const tmp = [...replyList];
    if (tmp.every(dt=>dt.id !== post.id)) {
      tmp.push(post)
      setReplyList(tmp);
    }
    setPreText(getTextReply(replyList));
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
  return (
    <>
      <AppBar style={{boxShadow: 'none'}}>
        <Pagination page={where.page||1} maxPage={thread ? thread.last_page : where.page} onChangePage={onChangePage}/>
      </AppBar>
      <div>
        {thread ? (thread[where.page] ? thread[where.page].data.map((post)=>(
          <PostCard data={post} number={post.number} key={post.id}  id={`post${post.id}`} copyLink={()=>copyLink(where.thread, post.id)} rep={login} onRep={()=>repPost(post)}/>
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
      <Fab
        style={{position: 'fixed',
          bottom: 10,
          right: 2,
         }}
        color={'primary'}
        onClick={()=>setOpenReply(true)}
      >
        <CreateIcon/>
      </Fab>
      <Reply preText={preText} onSubmit={handleSubmitReply} onClose={()=>setOpenReply(false)} open={openReply}/>
    </>
  );
}
