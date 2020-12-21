import { types } from '../types/types';

const initialState = {
    users: [],
    activeUser: null
};

export const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.userUpdated:
            return {
                ...state,
                users: state
                    .users
                    .map(e => (e._id === action.payload._id) ?
                        action.payload :
                        e)
            }

        case types.usersUpdated:
            return {
                ...state,
                users: action.payload
            }

        case types.userDeleted:
            return {
                ...state,
                users: state
                    .users
                    .filter(e => (e._id !== action.payload._id))
            }

        case types.userLoaded:
            return {
                ...state,
                users: [...action.payload]
            }

        default:
            return state;
    }

}