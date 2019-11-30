import React from "react";
import {forumData,threadData,threadData2, inboxData,messageData,subscription, searchData} from './tmp';
import { useSelector, useDispatch } from 'react-redux';
import "./Counter.css";

import parser from '../../services/parser';
import customAxios from '../../services/custom_axios';
import LinkGen from '../../services/url_gen';
import auth from "services/auth";
import requests from 'services/requests'

function Index(props) {
  const [data,setData] = React.useState('');
  console.log(props);
  function onForum() {
    requests.getThreadsByF('17');
  }
  
  function onThread() {
    customAxios.get(LinkGen.linkPostsInThread('7656643'), {
      'withCredentials': true
    }).then(response => {
      console.log(response);
      setData(response.data);
      console.log(parser.extractDataThread(response.data));
    })
      .catch(console.error());
  }

  function onUserID() {
    console.log(threadData);
    console.log(parser.getUserId(threadData));
  }

  function onInbox() {
    console.log(parser.extractDataInbox(inboxData));
  }
  
  function onMessage() {
    console.log(parser.extractMessageContent(messageData));
  }

  function onSubscription() {
    console.log(parser.extractSubscription(subscription));
  }
  
  function onSearch() {
    console.log(parser.extractSearchContent(searchData));
  }

  function onLogin() {
    let username = 'tralaw123';
    let password = 'nghia123';
    auth.login(username, password);
  }
  function onQuickReply() {
    console.log(data);
    let comment = "Học mỗi ngày mấy từ đã đành nhưng cũng cần áp dụng nó vào ngữ cảnh nữa thì mới lâu quên";
    let threadId = "7656643";
    requests.quickReply(threadId, comment,data);
  }
  return (
    <div className="Counter">
      Test parser
      <div>
        <button onClick={onForum}>Forum</button>
        <button onClick={onThread}>Thread</button>
        <button onClick={onUserID}>Get User ID</button>
        <button onClick={onInbox}>Inbox</button>
        <button onClick={onMessage}>Message Detail</button>
        <button onClick={onSubscription}>Subscription</button>
        <button onClick={onSearch}>Search List</button>
        <button onClick={onLogin}>Test Login</button>
        <button onClick={onQuickReply}>QuickReply</button>
      </div>
    </div>
  );
}

export default Index;
