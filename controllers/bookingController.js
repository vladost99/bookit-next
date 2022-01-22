import Booking from '../models/booking';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import ErrorHandler from '../utils/errorHandler';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import next from 'next';

const moment = extendMoment(Moment)

const  newBooking = catchAsyncErrors(async (req,res) => {
    
    const {
        room,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo
    } = req.body;

    const booking = await Booking.create({
        room,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        user: req.user._id,
        paidAt: Date.now()
    })

    res.status(200).json({
        success: true,
        booking
    })
})


const checkRoomBookingAvailability = catchAsyncErrors(async (req,res) => {
    
    let {roomId, checkInDate, checkOutDate} = req.query;

    checkInDate = new Date(checkInDate);
    checkOutDate = new Date(checkOutDate);

    const bookings = await Booking.find({
        room: roomId,
        $and: [{
            checkInDate: {
                $lte: checkOutDate
            }},
            {
                checkOutDate: {
                    $gte: checkInDate
                }
            }
        ]
    })

    let isAvailable;

    if(bookings && bookings.length === 0) {
        isAvailable = true;
    }
    else {
        isAvailable = false
    }

  

    res.status(200).json({
        success: true,
        isAvailable
    })
})


const checkBookedDatesOfRoom = catchAsyncErrors(async (req, res) => {


    const {roomId} = req.query;

    const bookings = await Booking.find({room: roomId});

    let bookedDates = [];
    const timeDifference = moment().utcOffset() / 60;

    bookings.forEach(booking => {
        const checkInDate = moment(booking.checkInDate).add(timeDifference, 'hours');
        const checkOutDate = moment(booking.checkOutDate).add(timeDifference, 'hours');

        const range = moment.range(moment(checkInDate), moment(checkOutDate));

        const dates = Array.from(range.by('day'));
        bookedDates = bookedDates.concat(dates);
    })

    res.status(200).json({
        success: true,
        bookedDates
    })
        

})


const myBookings = catchAsyncErrors(async (req, res) => {
   const bookings = await Booking.find({user: req.user._id})
            .populate({
                path: 'room',
                select: 'name pricePerNight images'
            })
            .populate({
                path: 'user',
                select: 'name email'
            });
            
    res.status(200).json({
        success: true,
        bookings
    })
})

const getBookingsDetails = catchAsyncErrors(async (req, res) => {
    const booking = await Booking.findById(req.query.id)
            .populate({
                path: 'room',
                select: 'name pricePerNight images'
            })
            .populate({
                path: 'user',
                select: 'name email'
            })
     res.status(200).json({
         success: true,
         booking
     })
 })


 const allAdminBookings = catchAsyncErrors(async (req, res) => {
    const bookings = await Booking.find()
    .populate({
        path: 'room',
        select: 'name pricePerNight images'
    })
    .populate({
        path: 'user',
        select: 'name email'
    });
        
             
     res.status(200).json({
         success: true,
         bookings
     })
 })

 const deleteBooking = catchAsyncErrors(async (req, res, next) => {
    const booking = await Booking.findById(req.query.id);

    if(!booking) {
        return next(new ErrorHandler('Booking not found with this ID', 404));
    }

    await booking.remove();
        
             
     res.status(200).json({
         success: true
     })
 })






export {
    newBooking,
    checkRoomBookingAvailability,
    checkBookedDatesOfRoom,
    myBookings,
    getBookingsDetails,
    allAdminBookings,
    deleteBooking
}