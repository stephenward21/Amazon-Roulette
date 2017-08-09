import { combineReducers } from 'redux';
import RegisterReducer from './RegisterReducer';
import CategoryReducer from './CategoryReducer';
import OpenNavReducer from './OpenNavReducer';


const rootReducer = combineReducers({
    registerReducer: RegisterReducer,
    categoryReducer: CategoryReducer,
    openNavReducer: OpenNavReducer
});

export default rootReducer;
