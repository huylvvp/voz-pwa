import {forum} from '../constants/forum'

const initState = {
  title : 'Voz-PWA',
  location: '0-0',
  login: false,
  account: {},
  data: {
    forum: {},
    thread: {},
    sub: {},
    message: {},
  },
  bookmark:{
    forum: [
      {
        id: 17,
        text: 'Chuyện trò linh tinh™'
      },
      {
        id: 33,
        text: 'Điểm báo'
      },
    ],
    thread: [
      {
        id: 4289698,
        text: '[Chia sẻ] Góc tâm sự, than thở hằng ngày'
      }
    ],
    post: [
      {
        id: '4289698/4#post148759524',
        text: 'Thuyvan dạo này ăn chơi trác táng nơi đâu? Mà để gió đệ lộng hành thế nhỉ '
      }
    ]
  },
  search: {
    data: []
  }
};

const ui = (state = initState, action) => {
  console.log(action);
  console.log(state);
  let tmp, tmp2;
  switch (action.type) {
    case 'setTitle':
      return {
        ...state,
        title: action.payload
      };
    case 'setLocation':
      return {
        ...state,
        location: action.payload
      };
    case 'pushForum':
      return {
        ...state,
        data:{
          ...state.data,
          forum: {
            ...state.data.forum,
            [action.payload.forum]: {
              last_page: action.payload.last_page,
              [action.payload.page]: action.payload.data
            }
          }
        }
      };
    case 'pushSubscription':
      return {
        ...state,
        data:{
          ...state.data,
          sub: {
            ...state.data.sub,
            last_page: action.payload.last_page,
            [action.payload.page]: action.payload.data
          }
        }
      };
    case 'pushThread':
      return {
        ...state,
        data:{
          ...state.data,
          thread: {
            ...state.data.thread,
            [action.payload.thread] : {
              last_page: action.payload.last_page,
              [action.payload.page]: action.payload.data,
              subscribed: action.payload.subscribed
            }
          }
        }
      };
    case 'pushMessage':
      return {
        ...state,
        data:{
          ...state.data,
          message:{
            ...state.data.message,
            ...action.payload.data,
          }
        }
      };
    case 'pushMessageDetail':
      return {
        ...state,
        data:{
          ...state.data,
          message: {
            ...state.data.message,
            [action.payload.id]: action.payload.data
          }
        }
      };
    case 'saveForum':
      tmp = [...state.bookmark.forum];
      if (tmp.every(value => value.id != action.payload))
        forum.forEach(val=>{
          if (val[1] == action.payload) {
            tmp.push({
              id: action.payload,
              text: val[0]
            });
          }
        });
      return {
        ...state,
        bookmark: {
          ...state.bookmark,
          forum: tmp
        }
      };
    case 'saveThread':
      tmp = [...state.bookmark.thread];
      if (tmp.every(value => value.id != action.payload.id))
        tmp.push({
          id: action.payload.id,
          text: action.payload.text
        });
      return {
        ...state,
        bookmark: {
          ...state.bookmark,
          thread: tmp
        }
      };
    case 'savePost':
      tmp = [...state.bookmark.post];
      if (tmp.every(value => value.id != action.payload.id))
        tmp.push({
          id: action.payload.id,
          text: action.payload.text
        });
      return {
        ...state,
        bookmark: {
          ...state.bookmark,
          post: tmp
        }
      };
    case 'removeForum':
      tmp2 = state.bookmark.forum.filter((value,index)=>{
        if (value.id === action.payload)
          return false;
        return true;
      });
      return {
        ...state,
        bookmark: {
          ...state.bookmark,
          forum: tmp2
        }
      };
    case 'removeThread':
      tmp2 = state.bookmark.thread.filter((value)=>{
        if (value.id === action.payload)
          return false;
        return true;
      });
      return {
        ...state,
        bookmark: {
          ...state.bookmark,
          thread: tmp2
        }
      };
    case 'removePost':
      tmp2 = state.bookmark.post.filter((value)=>{
        if (value.id === action.payload)
          return false;
        return true;
      });
      return {
        ...state,
        bookmark: {
          ...state.bookmark,
          post: tmp2
        }
      };
    case 'doLogin':
      return {
        ...state,
        data: {
          ...state.data,
          sub: {},
          message: {},
        },
        login: action.payload.login,
        account: {
          username: action.payload.username||'',
          password: action.payload.password||'',
          level: action.payload.level||'',
          avatar: action.payload.avatar||''
        }
      };
    case 'search':
      return {
        ...state,
        search: action.payload
      };
    default:
      return state;
  }
};

export default ui;
