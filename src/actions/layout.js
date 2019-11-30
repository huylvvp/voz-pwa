import customAxios from '../services/custom_axios'
import LinkGen from '../services/url_gen'
import parser from '../services/parser'
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
    const tmp = {
      inbox: [{"id":"16834872","date":"03-09-2018","title":"[Mời][Shopee]Shop đồ da chính hãng nam/nữ: Ví, dây lưng, túi xách, túi cầm tay,...","time":"20:34","author":{"id":"1563469';","name":"hoahongthuytinhpt"}},{"id":"16834868","date":"03-09-2018","title":"[Mời][Shopee]Shop đồ da chính hãng nam/nữ: Ví, dây lưng, túi xách, túi cầm tay,...","time":"20:33","author":{"id":"1563469';","name":"hoahongthuytinhpt"}},{"id":"16795389","date":"26-07-2018","title":"MMO VOZ","time":"17:00","author":{"id":"1172990';","name":"VietNamOi_fr"}},{"id":"16652029","date":"09-05-2018","title":"Kindle ppw","time":"18:20","author":{"id":"1170169';","name":"KoDoThey"}},{"id":"16571429","date":"15-04-2018","title":"kindle","time":"21:50","author":{"id":"141183';","name":"wgl"}},{"id":"16338757","date":"06-03-2018","title":"[QC] Bán nick VozForums joindate 2006, 2007 giá rẻ","time":"23:34","author":{"id":"3250';","name":"HBTshop"}},{"id":"16153569","date":"17-01-2018","title":"Re: Hi thím","time":"20:29","author":{"id":"1565970';","name":"shiphangnhat"}},{"id":"16153253","date":"17-01-2018","title":"Re: Hi thím","time":"18:44","author":{"id":"1565970';","name":"shiphangnhat"}},{"id":"15994301","date":"10-12-2017","title":"mgg lazada","time":"19:19","author":{"id":"1636385';","name":"hanggiatot_japan"}}],
      outbox: [{"id":"16834872","date":"03-09-2018","title":"[Mời][Shopee]Shop đồ da chính hãng nam/nữ: Ví, dây lưng, túi xách, túi cầm tay,...","time":"20:34","author":{"id":"1563469';","name":"hoahongthuytinhpt"}},{"id":"16834868","date":"03-09-2018","title":"[Mời][Shopee]Shop đồ da chính hãng nam/nữ: Ví, dây lưng, túi xách, túi cầm tay,...","time":"20:33","author":{"id":"1563469';","name":"hoahongthuytinhpt"}},{"id":"16795389","date":"26-07-2018","title":"MMO VOZ","time":"17:00","author":{"id":"1172990';","name":"VietNamOi_fr"}},{"id":"16652029","date":"09-05-2018","title":"Kindle ppw","time":"18:20","author":{"id":"1170169';","name":"KoDoThey"}},{"id":"16571429","date":"15-04-2018","title":"kindle","time":"21:50","author":{"id":"141183';","name":"wgl"}},{"id":"16338757","date":"06-03-2018","title":"[QC] Bán nick VozForums joindate 2006, 2007 giá rẻ","time":"23:34","author":{"id":"3250';","name":"HBTshop"}},{"id":"16153569","date":"17-01-2018","title":"Re: Hi thím","time":"20:29","author":{"id":"1565970';","name":"shiphangnhat"}},{"id":"16153253","date":"17-01-2018","title":"Re: Hi thím","time":"18:44","author":{"id":"1565970';","name":"shiphangnhat"}},{"id":"15994301","date":"10-12-2017","title":"mgg lazada","time":"19:19","author":{"id":"1636385';","name":"hanggiatot_japan"}}]
    };
    dispatch({type:'pushMessage',payload: {
        // page: page ||1,
        // last_page: tmp.last_page || 1,
        data: tmp
      }});
    dispatch({type: 'setTitle', payload: 'Messages'});
  }
}

export function getMessDetail(id) {
  return async (dispatch)=>{
    const tmp = {"number":"","time":"17-01-2018, 18:44","user":{"username":"shiphangnhat","id":"1565970","avatar":"customavatars/avatar1565970_2.gif","description":"Senior Member","joinDate":"09-2016","location":"7 continents 5 oceans","posts":"2,964","online":false},"data":{"quotes":[{"by":"tralaw123","content":"Th&#xED;m &#x1A1;i. <img src=\"https://forums.voz.vn/images/smilies/Off/adore.gif\" border=\"0\" alt title=\"Adore\" class=\"inlineimg\"> Em m&#x1EA1;nh d&#x1EA1;n h&#x1ECF;i th&#xED;m bi&#x1EBF;t c&#xE1;i bug &#x1EDF; freebitco.in share nh&#x1EB9; cho em &#x111;&#x1B0;&#x1EE3;c kh&#xF4;ng? Em h&#x1EE9;a s&#x1EBD; b&#xED; m&#x1EAD;t v&#xE0; v&#xEC; em kh&#xE1; r&#x1EA3;nh n&#xEA;n em c&#xF3; th&#x1EC3; c&#xE0;y &#x111;&#x1B0;&#x1EE3;c th&#xEA;m cho th&#xED;m. <img src=\"https://forums.voz.vn/images/smilies/Off/burn_joss_stick.gif\" border=\"0\" alt title=\"Burn Joss Stick\" class=\"inlineimg\"> Y&#xEA;u th&#xED;m."}],"comment":"C&#xE1;i n&#xE0;y ko ph&#x1EA3;i bug m&#xE0; ch&#x1EC9; l&#xE0; m&#x1ED9;t b&#xED; quy&#x1EBF;t ch&#x1A1;i bet n&#xEA;n b&#xE1;c ph&#x1EA3;i c&#xF3; s&#x1ED1; d&#x1B0; &#x111;&#x1EE7; l&#x1EDB;n (kho&#x1EA3;ng 100k satoshi) th&#xEC; m&#x1EDB;i &#xE1;p d&#x1EE5;ng &#x111;&#x1B0;&#x1EE3;c c&#xF2;n &#x111;i t&#x1EEB; con s&#x1ED1; 0 th&#xEC; ko th&#x1EC3;.<br>\n<br>\n&#x110;&#x1EC3; &#x111;&#x1EA3;m b&#x1EA3;o b&#x1ECB; lan truy&#x1EC1;n r&#x1ED9;ng r&#xE3;i c&#x169;ng nh&#x1B0; &#x111;&#x1EC3; tr&#x1EA3; cho ng&#x1B0;&#x1EDD;i t&#xEC;m ra n&#xF3; n&#xEA;n s&#x1EBD; ko share free m&#xE0; b&#xE1;c c&#x1EA7;n tr&#x1EA3; m&#x1ED9;t kho&#x1EA3;n t&#x1B0;&#x1A1;ng &#x111;&#x1B0;&#x1A1;ng 0.x btc (x&lt;4)"},"signature":{}};
    dispatch({type:'pushMessageDetail',payload: {
        id: id,
        data: tmp
      }});
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
