import {fetchSinToken} from '../helpers/fetch';
import {types} from '../types/types';
import Swal from 'sweetalert2';

export const startLogin = (email, password) => {
    return async(dispatch) => {
        const resp = await fetchSinToken('login', {
            email,
            password
        }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({uid: body.user._id, name: body.user.name}))
        } else {
            Swal.fire('Error en credenciales', body.msg, 'error');
        }
    }
}

export const startRegister = (name, email, password) => {
    return async(dispatch) => {
        const resp = await fetchSinToken('user', {
            name,
            email,
            password
        }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({uid: body.user._id, name: body.user.name}))
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

const login = (user) => ({type: types.authLogin, payload: user});

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout());
    }
}

const logout = () => ({type: types.authLogout})