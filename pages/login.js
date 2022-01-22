import Login from '../components/auth/Login';
import Layout from '../components/layout/Layout';
import {getSession} from 'next-auth/client';

export default function LoginPage() {
    return (
        <Layout title='Login'>
            <Login/>
        </Layout>
    )
}


export async function getServerSideProps(ctx) {
    const session = await getSession({req: ctx.req});

    if(session) {
        return {
            redirect: {
                destination: '/',
                premanent: false
            }
        }
    }
    return {
        props: {}
    }
}
