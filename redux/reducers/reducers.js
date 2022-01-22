import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailed,  newReviewReducer, checkReviewReducer,deleteReviewReducer, newRoomReducer,  roomReducer,roomReviewReducer } from './roomReducers';
import { authReducer, userDetailsReducer, userReducer, forgotPasswordReducer, resetPasswordReducer, loadUserReducer, allUsersReducer } from "./userReducer";
import { checkBookingReducer, bookedDatesReducer, myBookings, bookingDetails, bookingReducer   } from "./bookingReducers";

const reducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetailed: roomDetailed,
    room:  roomReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    loadedUser: loadUserReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    checkBooking: checkBookingReducer,
    bookedDates: bookedDatesReducer,
    bookings: myBookings,
    booking: bookingReducer,
    bookingDetails: bookingDetails,
    newReview: newReviewReducer,
    roomReviews: roomReviewReducer,
    checkReview: checkReviewReducer,
    newRoom: newRoomReducer,
    review: deleteReviewReducer
})

export default reducer