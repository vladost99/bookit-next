import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect';
import { getAdminUsers } from '../../../../controllers/authController';
import onError from '../../../../middlewares/errors';
import { isAuthenticatedUser, authrorizeRoles } from '../../../../middlewares/auth';

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser, authrorizeRoles('admin'))
    .get(getAdminUsers)

export default handler;