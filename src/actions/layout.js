import customAxios from '../services/axiosConfig'
import LinkGen from '../services/url_gen'
import parser from '../services/parser'
import auth from '../services/auth';
import { parse } from 'path';
import Axios from 'axios';
export function getDataForum(forum,page) {
  let data = '';
  return dispatch => {
    customAxios.get(LinkGen.linkForum(forum, page), {
      'withCredentials': true
    }).then(response => {
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
    .catch(console.error());
  }
}

export function getDataSub(page) {
  return dispatch => {
    customAxios.get("subscription.php", {
      'withCredentials' : true
    }).then(response => {
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
    }
}

export function getDataThread(thread,page) {
  return dispatch => {
    customAxios.get(LinkGen.linkPostsInThread(thread, page), {
      'withCredentials': true
    }).then(response => {
      console.log(response);
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
    }).catch(console.error());
  }
}

export function getDataMess(page=1) {
  return async (dispatch)=>{

    let data = {};
  
    Axios.all([
      customAxios.get("/private.php", {
        "withCredentials" : true
      }),
      customAxios.get("private.php?folderid=-1", {
        "withCredentials":true
      })
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
    .catch(console.error);
  }
}

export function getMessDetail(id) {
  return async (dispatch)=>{
    try {
      const res = await customAxios.get(`/private.php?do=showpm&pmid=${id}`);
      const data = parser.extractMessageContent(res.data);
      dispatch({
        type: 'pushMessageDetail', payload: {
          id: id,
          data: data
        }
      });
    } catch (err) {
      console.log(err);
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
  return (dispatch) => {
    let formData = auth.getFormDataLogin(username, password);
    customAxios.post('/login.php?do=login', formData, {
      "withCredentials": true
    }).then(response => {
      if (response.status == 200 && response.data.includes("Thank you for logging in")) {
        console.log("Login successfully");
        dispatch({
          type : 'doLogin',
          payload: {
            login: true,
            username: username
          }
        })
      }
      else {
        console.log("Login fail");
      }
    })
      .catch(error => {
        console.log(error);
      });
  }
}