import { 
    ALL_ROOMS_SUCCESS,
    ALL_ROOMS_FAILED,

    CLEAR_ERRORS,

    ROOM_DETAILS_FAILED,
    ROOM_DETAILS_SUCCESS,

    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAILED,
    NEW_REVIEW_RESET,

    REVIEW_AVAILABILITY_REQUEST,
    REVIEW_AVAILABILITY_SUCCESS,
    REVIEW_AVAILABILITY_FAILED,

    ADMIN_ROOMS_FAILED,
    ADMIN_ROOMS_REQUEST,
    ADMIN_ROOMS_SUCCESS,


    NEW_ROOM_FAILED,
    NEW_ROOM_REQUEST,
    NEW_ROOM_SUCCESS,
    NEW_ROOM_RESET,

    UPDATE_ROOM_FAILED,
    UPDATE_ROOM_REQUEST,
    UPDATE_ROOM_RESET,
    UPDATE_ROOM_SUCCESS,

    DELETE_ROOM_FAILED,
    DELETE_ROOM_REQUEST,
    DELETE_ROOM_RESET,
    DELETE_ROOM_SUCCESS,

    GET_REVIEWS_FAILED,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,

    DELETE_REVIEW_FAILED,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET

     } from './../constants/roomConstant';


export const roomDetailed = (state = {room: {}}, action) => { 
    switch(action.type) {
        case ROOM_DETAILS_SUCCESS: 
            return {
                room: action.payload
            }
        case ROOM_DETAILS_FAILED:
             return {
                 error: action.payload
             }   
        default:
            return state;
    }
}


export const allRoomsReducer = (state = {rooms: []}, action) => {
    switch(action.type) {
        case ALL_ROOMS_SUCCESS:
            return {
                roomsCount: action.payload.roomsCount,
                resPerPage: action.payload.resPerPage,
                filteredRoomsCount: action.payload.filteredRoomsCount,
                rooms: action.payload.rooms
            }

        case ALL_ROOMS_FAILED:
        case ADMIN_ROOMS_FAILED:
            return {
                 error: action.payload
            }
        case ADMIN_ROOMS_REQUEST:
            return {
                loading: true,
            }        


        case ADMIN_ROOMS_SUCCESS:
            return {
                loading: false,
                rooms: action.payload
            }

        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null
            }
        }    
            
        default: 
            return state
            
    }
}


export const newReviewReducer = (state = {}, action) => {
    switch(action.type) {
        case NEW_REVIEW_RESET:
            return {
                success: false
            }
        case NEW_REVIEW_REQUEST:
            return {
                 loading: true
            }    
        case NEW_REVIEW_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
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





export const checkReviewReducer = (state = {reviewAvailable: null}, action) => {
    switch(action.type) {
        case REVIEW_AVAILABILITY_REQUEST:
            return {
                 loading: true
            }    
        case REVIEW_AVAILABILITY_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case REVIEW_AVAILABILITY_SUCCESS:
            return {
                loading: false,
                reviewAvailable: action.payload
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





export const newRoomReducer = (state = {room: {}}, action) => {
    switch(action.type) {
        case NEW_ROOM_RESET:
            return {
                success: false
            }
        case NEW_ROOM_REQUEST:
            return {
                 loading: true
            }    
        case NEW_ROOM_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case NEW_ROOM_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                room: action.payload.room
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



export const roomReducer = (state = {}, action) => {
    switch(action.type) {
        case DELETE_ROOM_FAILED:
        case UPDATE_ROOM_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        
        case DELETE_ROOM_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }
        case DELETE_ROOM_RESET:
            return {
                loading: false,
                isDeleted: false
            }    

        
        case DELETE_ROOM_REQUEST:
        case UPDATE_ROOM_REQUEST:
            return {
                 loading: true
            }    
        case UPDATE_ROOM_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload
            }
            
        case UPDATE_ROOM_RESET:
            return {
               isUpdated: false
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



export const roomReviewReducer = (state = {reviews: []}, action) => {
    switch(action.type) {
        case GET_REVIEWS_REQUEST:
            return {
                 loading: true
            }    
        case GET_REVIEWS_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case GET_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
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

export const deleteReviewReducer = (state = {reviews: []}, action) => {
    switch(action.type) {
        case DELETE_REVIEW_REQUEST:
            return {
                 loading: true
            }    
        case DELETE_REVIEW_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_REVIEW_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }
        case DELETE_REVIEW_RESET: {
            return {
                loading: false,
                isDeleted: false
            }
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



