import customAxios from '../services/axiosConfig'
import LinkGen from '../services/url_gen'
import parser from '../services/parser'
import auth from '../services/auth';
import Axios from 'axios';
const config = {
  "withCredentials" : true
}
export function getDataForum(forum,page) {
  let data = '';
  return dispatch => {
    dispatch({type: 'setLoading', payload: true});
    customAxios.get(LinkGen.linkForum(forum, page),config).then(response => {
      data = parser.extractDataForum(response.data);
      dispatch({
        type: 'pushForum', payload: {
          forum: forum,
          page: page,
          last_page: data.last_page,
          data: data
        }
      });
    })
    .catch(err=> console.error(err))
    .finally(()=> dispatch({type: 'setLoading', payload: false}));
  }
}

export function getDataSub(page) {
  return dispatch => {
    dispatch({type: 'setLoading', payload: true});
    customAxios.get(`/subscription.php`, config).then(response => {
      let tmp = parser.extractSubscription(response.data);
      dispatch({
        type: 'pushSubscription', payload: {
          page: page,
          last_page: tmp.last_page,
          data: tmp
        }
      });
      dispatch({ type: 'setTitle', payload: 'Subscriptions' });
    })
      .catch(err=> console.error(err))
      .finally(()=> dispatch({type: 'setLoading', payload: false}))
    }
}

export function getDataThread(thread,page) {
  return dispatch => {
    dispatch({type: 'setLoading', payload: true});
    customAxios.get(LinkGen.linkPostsInThread(thread, page), config).then(response => {
      let tmp = parser.extractDataThread(response.data);
      dispatch({  
        type: 'pushThread', payload: {
          thread: thread,
          page: page,
          last_page: tmp.last_page,
          data: tmp
        }
      });
      dispatch({ type: 'setTitle', payload: tmp.subject });
    })
      .catch(err=> console.error(err))
      .finally(()=> dispatch({type: 'setLoading', payload: false}))
  }
}

export function getDataMess(page=1) {
  return async (dispatch)=>{

    let data = {};
    dispatch({type: 'setLoading', payload: true});
    Axios.all([
      customAxios.get("/private.php", config),
      customAxios.get("private.php?folderid=-1",config)
    ]).then(responseArr => {
      data['inbox'] = parser.extractDataInbox(responseArr[0].data);
      data['outbox'] = parser.extractDataInbox(responseArr[1].data);
      dispatch({
        type: 'pushMessage', payload: {
          // page: page ||1,
          // last_page: tmp.last_page || 1,
          data: data
        }
      });
      dispatch({ type: 'setTitle', payload: 'Messages' });
    })
      .catch(err=> console.error(err))
      .finally(()=> dispatch({type: 'setLoading', payload: false}))
  }
}

export function getMessDetail(id) {
  return async (dispatch)=>{
    dispatch({type: 'setLoading', payload: true});
    try {
      const res = await customAxios.get(LinkGen.linkShowMessage(id), config);
      const data = parser.extractMessageContent(res.data);
      dispatch({
        type: 'pushMessageDetail', payload: {
          id: id,
          data: data
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({type: 'setLoading', payload: false});
    }
  }
}

export function saveForum(id) {
  return {type: 'saveForum', payload: id};
}

export function saveThread(id,text) {
  return {
    type: 'saveThread',
    payload: {
      id: id,
      text: text,
    },
  };
}

export function doLogin(username, password) {
  return async (dispatch) => {
    let formData = auth.getFormDataLogin(username, password);
    try {
      let res = await customAxios.post("/login.php?do=login", formData, config);
      if (res.status == 200  && res.data.includes("Thank you for logging in")) {
        res = await customAxios.get('/index.php',config);
        const id = parser.getUserId(res.data);
        res = await customAxios(`/member.php?u=${id}`, config);
        let info = parser.getMemberInfo(res.data);
        dispatch({
          type : 'doLogin',
          payload: {
            login: true,
            username: info.username,
            avatar: info.avaSrc,
            isOnline: info.isOnline,
            level: info.level
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
