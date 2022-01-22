import React from 'react'
import {getSession} from 'next-auth/client';
import UpdateRoom from '../../../components/admin/UpdateRoom';
import Layout from '../../../components/layout/Layout';


const NewRoomPage = () => {
    return (
        <Layout title='Update Room'>
         <UpdateRoom/>
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

export default NewRoomPage
