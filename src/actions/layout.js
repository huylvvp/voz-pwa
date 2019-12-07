import customAxios from '../services/axiosConfig'
import LinkGen from '../services/url_gen'
import parser from '../services/parser'
import auth from '../services/auth';
import rq from '../services/requests';
import history from '../helpers/history';
import Axios from 'axios';
const config = {
  "withCredentials" : true
};
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
    customAxios.get(`/subscription.php?page=${page}`, config).then(response => {
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
      console.log(response);
      let tmp = parser.extractDataThread(response.data);
      dispatch({  
        type: 'pushThread', payload: {
          thread: thread,
          page: page,
          last_page: tmp.last_page,
          data: tmp,
          subscribed: tmp.subscribed
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
    dispatch({
      type : 'doLogin',
      payload: {
        login: false,
      }
    });
    try {
      let res = await customAxios.post("/login.php?do=login", formData, config);
      if (res.status == 200  && res.data.includes("Thank you for logging in")) {
        res = await customAxios.get('/index.php',config);
        let id = parser.getUserId(res.data);
        let logoutPath = parser.getLogoutPath(res.data);
        res = await customAxios(`/member.php?u=${id}`, config);
        let info = parser.getMemberInfo(res.data);
        dispatch({
          type : 'doLogin',
          payload: {
            login: true,
            username: info.username,
            password: password,
            avatar: info.avaSrc,
            isOnline: info.isOnline,
            level: info.level,
            logoutPath: logoutPath
          }
        })
      }
    } catch (error) {
      console.log(error);
    } finally {
      history.push('/home');
    }
  }
}

export function getSearchContent(keyword) {
  return async (dispatch)=>{
    dispatch({type: 'setLoading', payload: true});
    try {
      let res = await customAxios.get('/index.php',config);
      let formData = rq.getFormSearch(res.data,keyword);
      console.log(formData);
      res = await customAxios.post('/search.php?do=process',formData, config);
      console.log(res);
      let searchId = res.headers["x-final-url"].split("=")[1];
      res = await customAxios.get("search.php?searchid=" + searchId,config);
      console.log(res);
      let searchResult = parser.extractSearchContent(res.data);
      console.log(searchResult);
      dispatch({ type: 'search', payload: searchResult });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({type: 'setLoading', payload: false});
    }
  }
}

export function subscribeThread(thread) {
  return async (dispatch)=>{
    const tmp = await customAxios.get(`/subscription.php?do=addsubscription&t=${thread}`, config);
    let formData = rq.getFormSubscribe(thread, tmp.data);

    try {
      let res = await customAxios.post(`/subscription.php?do=doaddsubscription&threadid=${thread}`, formData, config);

      if (res.status == 200)
        console.log('Subscribe thread'+thread);
      else
        console.log('Subcribe unsuccessfully');
    } catch (error) {
      console.log(error)
    }
  }
}

export function unSubscribeThread(thread) {
  return async (dispatch)=>{
    try {
      let res = await customAxios.get(`/subscription.php?do=removesubscription&t=${thread}`, config);
      
      if (res.status == 200)
        console.log('Unsubscribe thread '+thread);
      else
        console.log('Unsubcribe unsuccessfully');
    } catch (error) {
      console.log(error)
    }
  }
}

export function doLogout(logoutPath) {
  return async (dispatch) => {
    try {
        console.log(logoutPath);
        let res = await customAxios.get(logoutPath,config);
        if (res.status == 200) {
          console.log("logout successfully");
          dispatch({
            type:'doLogout',
            payload: {
              login: false,
              account: {},
              logoutPath: ''
            }
        
          })
        } else {
          console.log("oh no, logout unsuccessfully");
        }
        
    } catch (error) {
      console.log(error);
    }
  }
}
