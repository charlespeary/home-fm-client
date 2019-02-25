import { createStore, combineReducers, applyMiddleware } from 'redux'
import { token, user } from "../Reducers/index"
import { initialState } from './index';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'


const loggerMiddleware = createLogger()

const app = combineReducers(
    { token, user }
);

export const store = createStore(app, initialState, applyMiddleware(thunkMiddleware, loggerMiddleware));
const unsubscribe = store.subscribe(() => console.log(store.getState()));
