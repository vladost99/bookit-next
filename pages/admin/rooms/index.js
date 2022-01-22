import React from 'react'
import {getSession} from 'next-auth/client';
import AllRooms from '../../../components/admin/AllRooms';
import Layout from '../../../components/layout/Layout';


const AllRoomsPage = () => {
    return (
        <Layout title='All Rooms'>
         <AllRooms/>
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

export default AllRoomsPage
