import {
    CHECK_BOOKING_FAILED,
    CHECK_BOOKING_REQUEST,
    CHECK_BOOKING_RESET,
    CHECK_BOOKING_SUCCESS,

    BOOKED_DATES_FAILED,
    BOOKED_DATES_SUCCESS,

    MY_BOOKINGS_FAILED,
    MY_BOOKINGS_SUCCESS,

    BOOKINGS_DETAILS_SUCCESS,
    BOOKINGS_DETAILS_FAILED,

    ADMIN_BOOKINGS_FAILED,
    ADMIN_BOOKINGS_REQUEST,
    ADMIN_BOOKINGS_SUCCESS,

    DELETE_BOOKING_FAILED,
    DELETE_BOOKING_REQUEST,
    DELETE_BOOKING_RESET,
    DELETE_BOOKING_SUCCESS,

    CLEAR_ERRORS
} from '../constants/bookingConstant';


export const checkBookingReducer = (state = {available: null}, action) => {
    switch(action.type) {
        case CHECK_BOOKING_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case CHECK_BOOKING_REQUEST: {
            return {
                loading: true
            }
        }
        case CHECK_BOOKING_RESET:
            return {
                loading: false,
                available: null
            }
        case CHECK_BOOKING_SUCCESS:  
            return {
                loading: false,
                available: action.payload
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


export const bookedDatesReducer = (state = {dates: []}, action) => {
    switch(action.type) {
        case BOOKED_DATES_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case BOOKED_DATES_SUCCESS:
            return {
                loading: false,
                dates: action.payload
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


export const myBookings = (state = {bookings: []}, action) => {
    switch(action.type) {
        case ADMIN_BOOKINGS_REQUEST:
            return {
                loading: true
            }

        case MY_BOOKINGS_FAILED:
        case ADMIN_BOOKINGS_FAILED:    
            return {
                loading: false,
                error: action.payload
            }

        case MY_BOOKINGS_SUCCESS:
        case ADMIN_BOOKINGS_SUCCESS:    
            return {
                loading: false,
                bookings: action.payload
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


export const bookingDetails = (state = {booking: {}}, action) => {
    switch(action.type) {
        case BOOKINGS_DETAILS_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case BOOKINGS_DETAILS_SUCCESS:
            return {
                loading: false,
                booking: action.payload
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


export const bookingReducer = (state = {}, action) => {
    switch(action.type) {
        case DELETE_BOOKING_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_BOOKING_REQUEST: {
            return {
                loading: true
            }
        }
        case DELETE_BOOKING_RESET:
            return {
                loading: false,
                isDeleted: false
            }
        case DELETE_BOOKING_SUCCESS:  
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
