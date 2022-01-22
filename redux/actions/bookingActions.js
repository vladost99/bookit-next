import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import {
    BOOKED_DATES_FAILED,
    BOOKED_DATES_SUCCESS,
    CHECK_BOOKING_FAILED,
    CHECK_BOOKING_REQUEST,
    CHECK_BOOKING_RESET,
    CHECK_BOOKING_SUCCESS,


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




export const checkBooking = (roomId, checkInDate, checkOutDay) => async (dispatch) => {
    try {
        dispatch({type: CHECK_BOOKING_REQUEST});
        let link = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDay}`
        
        const {data} = await axios.get(link);

        dispatch({
            type: CHECK_BOOKING_SUCCESS,
            payload: data.isAvailable
        })

    } catch(err) {
        dispatch({
            type: CHECK_BOOKING_FAILED,
            payload: err.response.data.message
        })
    }
}



export const getBookedDates = (id) => async (dispatch) => {
    try {
       
        const {data} = await axios.get(`/api//bookings/check_booked_dates?roomId=${id}`);

        dispatch({
            type: BOOKED_DATES_SUCCESS,
            payload: data.bookedDates
        })

    } catch(err) {
        dispatch({
            type: BOOKED_DATES_FAILED,
            payload: err.response.data.message
        })
    }
}



export const getMyBookings = (authCookie,req) => async (dispatch) => {
    try {
        const config = {
            headers: {cookie: authCookie},
        };
        let {origin} = absoluteUrl(req);
        const {data} = await axios.get(`${origin}/api/bookings/me`, config);

        dispatch({
            type: MY_BOOKINGS_SUCCESS,
            payload: data.bookings
        })

    } catch(err) {
        dispatch({
            type: MY_BOOKINGS_FAILED,
            payload: err.response.data.message
        })
    }
}


export const getBookingDetails = (authCookie,req, id) => async (dispatch) => {
    try {
        const config = {
            headers: {cookie: authCookie},
        };
        let {origin} = absoluteUrl(req);
        const {data} = await axios.get(`${origin}/api/bookings/${id}`, config);

        dispatch({
            type: BOOKINGS_DETAILS_SUCCESS,
            payload: data.booking
        })

    } catch(err) {
        dispatch({
            type: BOOKINGS_DETAILS_FAILED,
            payload: err.response.data.message
        })
    }
}



export const getAdminBookings = () => async (dispatch) => {
    try {
        dispatch({type: ADMIN_BOOKINGS_REQUEST})
        const {data} = await axios.get(`/api/admin/bookings`);

        dispatch({
            type: ADMIN_BOOKINGS_SUCCESS,
            payload: data.bookings
        })

    } catch(err) {
        dispatch({
            type: ADMIN_BOOKINGS_FAILED,
            payload: err.response.data.message
        })
    }
}


export const deleteBooking = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_BOOKING_REQUEST})
        const {data} = await axios.delete(`/api/admin/bookings/${id}`);

        dispatch({
            type: DELETE_BOOKING_SUCCESS,
            payload: data.success
        })

    } catch(err) {
        dispatch({
            type: DELETE_BOOKING_FAILED,
            payload: err.response.data.message
        })
    }
}






export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}