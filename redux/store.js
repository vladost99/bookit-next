import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers/reducers';
import {HYDRATE, createWrapper} from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';



const bindMiddleware = (middleware) => {
    if(process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }

    return applyMiddleware(...middleware);
}

const reducer = (state, action) => {
    if(action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        }
        return nextState;
    }
    else {
        return reducers(state, action);
    }
    
}

const initStore = () => {
    return createStore(reducer, bindMiddleware([thunkMiddleware]));
}


export const wrapper = createWrapper(initStore);
