import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

const intialUserState = {
    currentUser: null,
    isLoading: true
};

const user_reducer = (state = intialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER: {
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        }
        case actionTypes.CLEAR_USER:
            return {
                ...intialUserState,
                isLoading: false
            }
        default: {
            return state;
        }
    }
}

const rootReducer = combineReducers({
    user: user_reducer
});

export default rootReducer;