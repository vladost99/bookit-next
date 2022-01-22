import React from 'react'
import {getSession} from 'next-auth/client';
import AllBookings from '../../../components/admin/AllBookings';
import Layout from '../../../components/layout/Layout';


const AllBookingsPage = () => {
    return (
        <Layout title='All Bookings'>
         <AllBookings/>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const session = await getSession({req: ctx.req});

    if(!session || session.user.role !== 'admin') {
        return {
            redirect: {
                destination: '/login',
                premanent: false
            }
        }
    }
    return {
        props: {}
    }
}

export default  AllBookingsPage
