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
     DELETE_AGENT_RESET

     } from './../constants/userConstant';


export const authReducer = (state = {loading: false, user: null, error: null}, action) => {
    switch(action.type) {
        case REGISTER_USER_REQUEST: 
            return {
                loading: true
            }
        case REGISTER_USER_SUCCESS:
            return {
                loading: false,
                success: true,
            }    
        case REGISTER_USER_FAILED: 
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null
                }
            }
        default:
            return state;    
    }
}

export const loadUserReducer = (state = {user: null, loading: true}, action) => {
    switch(action.type) {
        case LOAD_USER_REQUEST: 
            return {
                loading: true,
                isAuthenticated: false
            }    
        case LOAD_USER_SUCCESS:
            return {
                loading: false,
                success: true,
                isAuthenticated: true,
                user: action.payload
            }
        case LOAD_USER_FAILED: 
            return {
                user: null,
                loading: false,
                isAuthenticated: false,
                error: action.payload
            }      
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null,
                user: null,
                }
            }
        default:
            return state;    
    }
}


export const userReducer = (state = {}, action) => {
    switch(action.type) {
        case UPDATE_USER_FAILED:
        case UPDATE_AGENT_FAILED:
        case DELETE_AGENT_FAILED:       
            return {
                loading: false,
                error: action.payload
            }
        case UPDATE_USER_REQUEST:
        case UPDATE_AGENT_REQUEST:
        case DELETE_AGENT_REQUEST:        
            return {
                loading: true
            }
        
        case UPDATE_AGENT_RESET:    
        case UPDATE_USER_RESET:
            return {
                loading: false,
                isUpdated: false
            }
        case DELETE_AGENT_RESET:
            return {
                loading: false,
                isDeleted: false
            }    

        case UPDATE_AGENT_SUCCESS:    
        case UPDATE_USER_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_AGENT_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }    

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }    

        default:
            return state;
    }
}


export const forgotPasswordReducer = (state = {}, action) => {
    switch(action.type) {
        case FORGOT_PASSWORD_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case FORGOT_PASSWORD_REQUEST:
            return {
                loading: true
            }
        case FORGOT_PASSWORD_SUCCESS: 
            return {
                loading: false,
                message: action.payload
            }
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null
                }
            }        
        default:
            return state;
    }
}


export const resetPasswordReducer = (state = {}, action) => {
    switch(action.type) {
        case RESET_PASSWORD_REQUEST: 
            return {
                loading: true
            }
        case RESET_PASSWORD_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null
            }
        }
        default: {
            return state;
        }    
    }
}



export const allUsersReducer = (state = {users: []}, action) => {
    switch(action.type) {
        case ADMIN_USERS_REQUEST: 
            return {
                loading: true,
            }    
        case ADMIN_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }
        case ADMIN_USERS_FAILED: 
            return {
                loading: false,
                error: action.payload
            }      
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null,
                }
            }
        default:
            return state;    
    }
}


export const userDetailsReducer = (state = {user: {}}, action) => {
    switch(action.type) {
        case USER_DETAILS_REQUEST: 
            return {
                ...state,
                loading: true,
            }    
        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case USER_DETAILS_FAILED: 
            return {
                loading: false,
                error: action.payload
            }      
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null,
                }
            }
        default:
            return state;    
    }
}