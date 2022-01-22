import React from 'react'
import {getSession} from 'next-auth/client';
import Mybookings from '../../components/bookings/Mybookings';
import Layout from '../../components/layout/Layout';
import {wrapper} from '../../redux/store';
import { getMyBookings } from '../../redux/actions/bookingActions';

const MybookingsPage = () => {
    return (
        <Layout title='My bookings'>
         <Mybookings/>
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ req, store }) => {
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    await store.dispatch(getMyBookings(req.headers.cookie, req))

})

export default MybookingsPage
