import React, {useEffect} from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors } from '../../redux/actions/bookingActions';
import easyinvoice from 'easyinvoice';
import {MDBDataTable} from 'mdbreact';

const Mybookings = () => {

    const dispatch =  useDispatch();
    const {bookings, error} = useSelector(state => state.bookings);
    useEffect(() => {
       if(error) {
           toast.error(error);
           dispatch(clearErrors());
       }
    }, [dispatch]);

    const setBookings = () => {
        const data = {
            columns: [
                {
                    label: 'Booking ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Check In',
                    field: 'checkIn',
                    sort: 'asc'
                },
                {
                    label: 'Check Out',
                    field: 'checkOut',
                    sort: 'asc'
                },
                {
                    label: 'Amount Paid',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
        ],
            rows: []
        }

        bookings && bookings.forEach(booking => {
            data.rows.push({
                id: booking._id,
                checkIn: new Date(booking.checkInDate).toLocaleString('en-US'),
                checkOut: new Date(booking.checkOutDate).toLocaleString('en-US'),
                amount: `$${booking.amountPaid}`,
                actions:
                  <div className='col-6 col-md-12 col-sm-12 d-flex justify-content-center align-items-center'>
                    <Link href={`/bookings/${booking._id}`}>
                        <a className='btn btn-primary'>
                            <i className='fa fa-eye'></i>
                        </a>
                    </Link>
                    <button onClick={() => downloadInvoice(booking)} className='btn btn-success mx-2'>
                        <i className='fa fa-download'></i>
                    </button>
                  </div>
            })
        })
        return data;
    }

    const downloadInvoice = async (booking) => {
      const  data = {
        "documentTitle": "Booking INVOICE", //Defaults to INVOICE
        "currency": "USD",
        "taxNotation": "vat", //or gst
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "logo": "https://res.cloudinary.com/bookit/image/upload/v1617904918/bookit/bookit_logo_cbgjzv.png",
        "sender": {
            "company": "Book IT",
            "address": "13th Street. 47 W 13th St",
            "zip": "10001",
            "city": "New York",
            "country": "United States"
        },
        "client": {
            "company": `${booking.user.name}`,
            "address": `${booking.user.email}`,
            "zip": "",
            "city": `Check In: ${new Date(booking.checkInDate).toLocaleString('en-US')}`,
            "country": `Check In: ${new Date(booking.checkOutDate).toLocaleString('en-US')}`
        },
        "invoiceNumber": `${booking._id}`,
        "invoiceDate": `${new Date(Date.now()).toLocaleString('en-US')}`,
        "products": [
            {
                "quantity": `${booking.daysOfStay}`,
                "description": `${booking.room.name}`,
                "tax": 0,
                "price": booking.room.pricePerNight
            }
        ],
        "bottomNotice": "This is auto generated Invoice of your booking on Book IT."
        };

        const result = await easyinvoice.createInvoice(data);
        easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf);
    }

    return (
        <div className='container-fluid'>
            <h1 className='my-5'>My Bookings</h1>
            <MDBDataTable
                data={setBookings()}
                className='px-3'
                responsive
                bordered
                striped
                hover
            />
        </div>
    )
}

export default Mybookings
