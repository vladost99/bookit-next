import React, {useState, useEffect, useRef} from 'react';
import Head from 'next/head';
import {toast} from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, checkBooking, getBookedDates } from '../../redux/actions/bookingActions';
import { CHECK_BOOKING_RESET } from '../../redux/constants/bookingConstant';
import NewReview from '../review/NewReview';
import { Carousel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import RoomFeature from './RoomFeature';
import axios from 'axios';
import { useRouter } from 'next/router';
import getStripe from './../../utils/getStripe';
import ListReviews from '../review/ListReviews';


export function RoomDetails() {
    const dispatch = useDispatch();
    const router = useRouter();
    const {id} = router.query;

    const {room, error} = useSelector(state => state.roomDetailed);
    const {user} = useSelector(state => state.loadedUser);
    const {dates} = useSelector(state => state.bookedDates);
    const {available, loadig: bookingLoading} = useSelector(state => state.checkBooking);


    const [checkInDate, setCheckInDate] = useState();
    const [checkOutDate, setCheckOutDate] = useState();
    const [daysOfStay, setDaysOfStay] = useState();
    const [paymentLoading, setPaymentLoading] = useState(false);


    const excludedDates = [];
    dates.forEach(date => {
        excludedDates.push(new Date(date));
    })

    const refSlider = useRef(null);
    const refDatePicker = useRef(null);
    
    const onChange = (dates) => {

        const [checkInDate, checkOutDate] = dates;
        setCheckInDate(checkInDate);
        setCheckOutDate(checkOutDate);

        if(checkInDate && checkOutDate) {
            const days = Math.floor(((new Date(checkOutDate) - new Date(checkInDate)) / 86400000) + 1);
            setDaysOfStay(days);

            dispatch(checkBooking(id, checkInDate.toISOString(), checkOutDate.toISOString()));
        }
    }

    const bookRoom = async (id, pricePerNight) => {
        setPaymentLoading(true);

        const amount = pricePerNight * daysOfStay;

        try {
            const link = `/api/checkout_session/${id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}`;

            const {data} = await axios.get(link, {params: {amount}});

            const stripe = await getStripe();
            
            stripe.redirectToCheckout({sessionId: data.id});
            setPaymentLoading(false);
        }
        catch(err) {
            setPaymentLoading(false);
            console.log(error);
            toast.error(error);
        }  
    }


    useEffect(() => {

        dispatch(getBookedDates(id))

        toast.error(error);
        dispatch(clearErrors);

        return () => {
            dispatch({type: CHECK_BOOKING_RESET});
        }

    }, [dispatch, id]);

    return (
        <>
         <Head>
             <title>{room.name} - BookIT</title>
         </Head>
          <div className="container container-fluid">
        <h2 className='mt-5'>{room.name}</h2>
        <p>{room.address}</p>

        <div className="ratings mt-auto mb-3">
            <div className="rating-outer">
              <div className="rating-inner" style={{width: `${(room.ratings / 5) * 100}%`}}></div>
            </div>
            <span id="no_of_reviews">{room.numOfReviews} Reviews</span>
          </div>

         <Carousel ref={refSlider} hover='pause'>
            {room.images && room.images.map(image => (
                <Carousel.Item key={image.public_id}>
                    <div style={{width: '100%', height: '440px'}}>
                        <Image
                            className='d-block m-auto'
                            src={image.url}
                            alt={room.name}
                            layout='fill'
                        />
                    </div>
                </Carousel.Item>
            ))}
         </Carousel>

          <div className="row my-5">
              <div className="col-12 col-md-6 col-lg-8">
                  <h3>Description</h3>
                  <p>{room.description}</p>


                 <RoomFeature room={room}/>


              </div>

              <div className="col-12 col-md-6 col-lg-4">
                  <div className="booking-card shadow-lg p-4">
                    <p className='price-per-night'><b>${room.pricePerNight}</b> / night</p>

                    <hr/>

                    <p className='mt-5 mb-3'>
                        Pick Check In & Check Out Date
                    </p>

                    <DatePicker
                    ref={refDatePicker}
                        className='w-100'
                        selected={checkInDate}
                        onChange={onChange}
                        startDate={checkInDate}
                        endDate={checkOutDate}
                        selectsRange
                        minDate={new Date()}
                        excludeDates={excludedDates}
                        inline
                    />
                    {available === true &&
                        <div className='alert alert-success my-3 font-weight-bold'>Room is available. Book now.</div>
                    }
                     {available === false &&
                        <div className='alert alert-danger my-3 font-weight-bold'>Room not available.Try different dates.</div>
                    }
                    {available && !user &&
                        <div className='alert alert-danger my-3 font-weight-bold'>Login to book room.</div>
                    }
                    {
                      available && user && <button 
                             onClick={() => bookRoom(room._id, room.pricePerNight)}
                             className="btn btn-block py-3 booking-btn"
                             disabled={bookingLoading || paymentLoading}

                       >
                           Pay - ${daysOfStay * room.pricePerNight}
                        </button>  
                    }

                  </div>
              </div>
          </div>

         <NewReview/>
       {room.reviews &&  room.reviews.length > 0 ? <ListReviews reviews={room.reviews}/> : <p><b>No Reviews on this</b></p>}
        
    </div>
        </>
    )
}

export default RoomDetails
