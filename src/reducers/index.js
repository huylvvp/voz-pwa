import {combineReducers} from 'redux';
import layout from './layout';
import ui from './ui';

const rootReducer = combineReducers({
    ui: ui,
    layout: layout
});

export default rootReducer;
