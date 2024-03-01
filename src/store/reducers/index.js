import { combineReducers } from 'redux';
import usersApi from './users';

const reducers = combineReducers({
  [usersApi.reducerPath]: usersApi.reducer,
});

export default reducers;
