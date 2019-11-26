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
    forum: [],
    thread: [],
  }
};

const ui = (state = initState, action) => {
  console.log(action);
  console.log(state);
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
              [action.payload.page]: action.payload.data
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
      let tmp = [...state.bookmark.forum].push(action.payload);
      return {
        ...state,
        bookmark: {
          ...state.bookmark,
          forum: tmp
        }
      };
    case 'saveThread':
      let tmp2 = [...state.bookmark.thread].push(action.payload);
      return {
        ...state,
        bookmark: {
          ...state.bookmark,
          thread: tmp
        }
      };
    default:
      return state;
  }
};

export default ui;
