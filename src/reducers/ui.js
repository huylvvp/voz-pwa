const initState = {
  openSearch : false,
  openDrawer: {
    left: false,
    right: false
  },
  loading: false,
};


const ui = (state = initState, action) => {
  switch (action.type) {
    case 'setOpenSearch':
      return {
        ...state,
        openSearch: action.payload
      };
    case 'setTitle':
      return {
        ...state,
        title: action.payload
      };
    case 'setLoading':
      return {
        ...state,
        loading: action.payload
      };
    case 'setOpenDrawer':
      return {
        ...state,
        openDrawer: action.payload
      };
    default:
      return state;
  }
};

export default ui;
