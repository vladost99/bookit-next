import React from 'react'
import {getSession} from 'next-auth/client';
import Layout from '../../components/layout/Layout';
import {wrapper} from '../../redux/store';
import { getBookingDetails} from '../../redux/actions/bookingActions';
import BookingDetails from './../../components/bookings/BookingDetails';

const BookingPage = () => {
    return (
        <Layout title='Booking Details'>
         <BookingDetails/>
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ req, params, store }) => {
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    await store.dispatch(getBookingDetails(req.headers.cookie, req, params.id))

})

export default BookingPage
