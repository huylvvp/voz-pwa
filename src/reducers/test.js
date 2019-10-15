const test = (state = [], action) => {
    switch (action.type) {
        case 'inc':
            return state + 1;
        case 'des':
            return state - 1;
        default:
            return state;
    }
};

export default test;