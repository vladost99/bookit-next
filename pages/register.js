import Layout from '../components/layout/Layout';
import {Register} from '../components/auth/Register';
import {getSession} from 'next-auth/client';

const RegisterPage = () => {
    return (
        <Layout title='Register'>
            <Register/>
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

export default RegisterPage
