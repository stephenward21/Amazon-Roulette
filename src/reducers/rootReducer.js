import { combineReducers } from 'redux';
import RegisterReducer from './RegisterReducer';
import CategoryReducer from './CategoryReducer';


const rootReducer = combineReducers({
    registerReducer: RegisterReducer,
    categoryReducer: CategoryReducer
});

export default rootReducer;
