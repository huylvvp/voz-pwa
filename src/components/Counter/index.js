import React from "react";
import {forumData,threadData,threadData2, inboxData,messageData,subscription, searchData} from './tmp';
import { useSelector, useDispatch } from 'react-redux';
import "./Counter.css";

import parser from '../../services/parser';
import customAxios from '../../services/requests';
import LinkGen from '../../services/url_gen';


function Index(props) {

  console.log(props);
  function onForum() {
    customAxios.get(LinkGen.linkForum(6))
      .then(res=>{
        console.log(parser.extractDataForum(res.data));
      })
  }

  function onThread() {
    console.log(parser.extractDataThread(threadData2));
  }

  function onUserID() {
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
      </div>
    </div>
  );
}

export default Index;
