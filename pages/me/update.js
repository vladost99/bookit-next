import React from 'react'
import {getSession} from 'next-auth/client';
import Profile from '../../components/user/Profile';
import Layout from '../../components/layout/Layout';


const UpdateProfilePage = () => {
    return (
        <Layout title='Update Profile'>
         <Profile/>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const session = await getSession({req: ctx.req});

    if(!session) {
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

export default UpdateProfilePage
