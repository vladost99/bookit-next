import { 
    REGISTER_USER_REQUEST,
    REGISTER_USER_FAILED,
    REGISTER_USER_SUCCESS,
    CLEAR_ERRORS,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILED,

    UPDATE_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_RESET,
    UPDATE_USER_SUCCESS,

    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,

    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,

    ADMIN_USERS_FAILED,
    ADMIN_USERS_REQUEST,
    ADMIN_USERS_SUCCESS,

    UPDATE_AGENT_FAILED,
    UPDATE_AGENT_REQUEST,
    UPDATE_AGENT_RESET,
    UPDATE_AGENT_SUCCESS,

    USER_DETAILS_FAILED,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,

    DELETE_AGENT_FAILED,
    DELETE_AGENT_REQUEST,
    DELETE_AGENT_SUCCESS,

    } from './../constants/userConstant';
import axios from 'axios';

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch({type: REGISTER_USER_REQUEST});

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/auth/register', userData, config);
         dispatch({
             type: REGISTER_USER_SUCCESS,
         })
    }
    catch(err) {
        dispatch({
            type: REGISTER_USER_FAILED,
            payload: err.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({type: LOAD_USER_REQUEST});

        const {data} = await axios.get('/api/me');
         dispatch({
             type: LOAD_USER_SUCCESS,
             payload: data.user
         })
    }
    catch(err) {
        dispatch({
            type: LOAD_USER_FAILED,
            payload: err.response.data.message
        })
    }
}



export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_USER_REQUEST});

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.put('/api/me/update', userData, config);
         dispatch({
             type:UPDATE_USER_SUCCESS,
             payload: data.success
         })
    }
    catch(err) {
        console.log('err update', err.response.data.message)
        dispatch({
            type: UPDATE_USER_FAILED,
            payload: err.response.data.message || 'an error occurred while updating the profile'
        })
    }
}



export const forgotPassword = (email) => async (dispatch) => {

    try {
        dispatch({type: FORGOT_PASSWORD_REQUEST});

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post(`/api/password/forgot`, email, config);
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })
    }

    catch(err) {
        dispatch({
            type: FORGOT_PASSWORD_FAILED,
            payload: err.response.data.message
        })
    }
}


export const resetPassword = (token, passwords) => async (dispatch) => {

    try {
        dispatch({type: RESET_PASSWORD_REQUEST});

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.put(`/api/password/reset/${token}`, passwords, config);
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data.success
        })
    }

    catch(err) {
        dispatch({
            type: RESET_PASSWORD_FAILED,
            payload: err.response.data.message
        })
    }
}

export const getAdminUsers = () => async (dispatch) => {

    try {
        dispatch({type: ADMIN_USERS_REQUEST});

        
        const { data } = await axios.get(`/api/admin/users`);
        dispatch({
            type: ADMIN_USERS_SUCCESS,
            payload: data.users
        })
    }

    catch(err) {
        dispatch({
            type: ADMIN_USERS_FAILED,
            payload: err.response.data.message
        })
    }
}

export const getUserDetails = (id) => async dispatch => {
    try {
        dispatch({type: USER_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/admin/users/${id}`);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        })

    } catch(err) {
        dispatch({
            type: USER_DETAILS_FAILED,
            payload: err.response.data.message
        })
    }
}

export const updateUser = (id, userData) => async dispatch => {
    try {
        dispatch({type: UPDATE_AGENT_REQUEST});

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.put(`/api/admin/users/${id}`, userData, config);

        dispatch({
            type: UPDATE_AGENT_SUCCESS,
            payload: data.success
        })

    } catch(err) {
        dispatch({
            type: USER_DETAILS_FAILED,
            payload: err.response.data.message
        })
    }
}


export const deleteUser = (id) => async dispatch => {
    try {
        dispatch({type: DELETE_AGENT_REQUEST});

        const {data} = await axios.delete(`/api/admin/users/${id}`);

        dispatch({
            type: DELETE_AGENT_SUCCESS,
            payload: data.success
        })

    } catch(err) {
        dispatch({
            type: DELETE_AGENT_FAILED,
            payload: err.response.data.message
        })
    }
}






export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}