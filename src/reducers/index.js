import {combineReducers} from 'redux';
import test from './test';
import counter from './counter';

const rootReducer = combineReducers({
    count: counter,
    test: test
});

export default rootReducer;