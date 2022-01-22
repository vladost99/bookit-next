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
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';


export const getRooms = (req, currentPage = 1, location = '', guests, category) => async(dispatch) => {
    try {
       const { origin } =  absoluteUrl(req); 
       let link = `${origin}/api/rooms?page=${currentPage}&location=${location}`
       
      if(guests) {
          link += `&guestCapacity=${guests}`;
      }

      if(category) {
          link += `&category=${category}`;
      }

      const { data } = await axios.get(link);
      dispatch({
          type: ALL_ROOMS_SUCCESS,
          payload: data
      })
    }

    catch (err) {
        dispatch({
            type: ALL_ROOMS_FAILED,
            payload: err.response.data.message
        })
    }
}


export const getRoomDetails = (req, id) => async(dispatch) => {
    try {
       const { origin } =  absoluteUrl(req);

        let url;
        if(req) {
            url = `${origin}/api/rooms/${id}`
        }
        else {
            url = `/api/rooms/${id}`
        }

       const { data } = await axios.get(url);
      dispatch({
          type: ROOM_DETAILS_SUCCESS,
          payload: data.room
      })
    }

    catch (err) {
        dispatch({
            type: ROOM_DETAILS_FAILED,
            payload: err.response.data.message
        })
    }
}

export const checkReview = (roomId) => async (dispatch) => {
    try {

        dispatch({ type: REVIEW_AVAILABILITY_REQUEST })

        const { data } = await axios.get(`/api/reviews/check_review_availability?roomId=${roomId}`)

        dispatch({
            type: REVIEW_AVAILABILITY_SUCCESS,
            payload: data.isReviewAvailable
        })

    } catch (error) {
        dispatch({
            type: REVIEW_AVAILABILITY_FAILED,
            payload: error.response.data.message
        })
    }
}


export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/reviews`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAILED,
            payload: error.response.data.message
        })
    }
}

export const getAdminRooms = () => async (dispatch) => {
    try {
        dispatch({type: ADMIN_ROOMS_REQUEST});

        const {data} = await axios.get(`/api/admin/rooms`);

        dispatch({
            type: ADMIN_ROOMS_SUCCESS,
            payload: data.rooms
        })
    } catch(error) {
        dispatch({
            type: ADMIN_ROOMS_FAILED,
            payload: error.response.data.message
        })
    }
}


export const newRoom = (roomData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_ROOM_REQUEST })

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/rooms/`, roomData, config)

        dispatch({
            type: NEW_ROOM_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_ROOM_FAILED,
            payload: error.response.data.message
        })
    }
}

export const updateRoom = (id,roomData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ROOM_REQUEST })

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/rooms/${id}`, roomData, config)

        dispatch({
            type: UPDATE_ROOM_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ROOM_FAILED,
            payload: error.response.data.message
        })
    }
}

export const deleteRoom = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ROOM_REQUEST })

       
        const { data } = await axios.delete(`/api/rooms/${id}`);

        dispatch({
            type: DELETE_ROOM_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ROOM_FAILED,
            payload: error.response.data.message
        })
    }
}


export const getRoomReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_REVIEWS_REQUEST })

       
        const { data } = await axios.get(`/api/reviews/?id=${id}`);

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews
        })

    } catch (error) {
        dispatch({
            type:  GET_REVIEWS_FAILED,
            payload: error.response.data.message
        })
    }
}


export const deleteRoomReviews = (id, roomId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REVIEW_REQUEST })

       
        const { data } = await axios.delete(`/api/reviews/?id=${id}&roomId=${roomId}`);

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type:  DELETE_REVIEW_FAILED,
            payload: error.response.data.message
        })
    }
}






export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
