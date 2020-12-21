import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';

export const updateUsers = (users) => {
    return async(dispatch) => {
        dispatch(usersUpdated(users));
    }
}

const usersUpdated = (users) => ({ type: types.usersUpdated, payload: users });

export const userStartUpdate = (user) => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`user/${user._id}`, user, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dispatch(userUpdated(user));
                Swal.fire('Exito', 'El usuario se guardo correctamente', 'success');
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error)
        }

    }
}

const userUpdated = (user) => ({ type: types.userUpdated, payload: user });

export const userStartDelete = (user) => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`user/${user._id}`, {}, 'DELETE');
            const body = await resp.json();
            const userUpdated = body.user

            if (body.ok) {
                dispatch(userDeleted(userUpdated));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }

    }
}

const userDeleted = (user) => ({ type: types.userDeleted, payload: user });

export const userStartLoading = () => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken('user');
            const body = await resp.json();
            const users = body.users

            const newArr = users.map(v => ({
                ...v,
                isInactive: true
            }))

            dispatch(userLoaded(newArr));
        } catch (error) {
            console.log(error)
        }
    }
}

const userLoaded = (users) => ({ type: types.userLoaded, payload: users })