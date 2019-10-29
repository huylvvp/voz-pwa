const initState = {
  title : 'Voz-PWA',
  location: 'home',
  login: false,
  account: {}
};


const ui = (state = initState, action) => {
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
    default:
      return state;
  }
};

export default ui;
