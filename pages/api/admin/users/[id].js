import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect';
import { getUserDetails, updateUser, deleteUser } from '../../../../controllers/authController';
import onError from '../../../../middlewares/errors';
import { isAuthenticatedUser, authrorizeRoles } from '../../../../middlewares/auth';

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser, authrorizeRoles('admin'))
    .put(updateUser);

handler
    .use(isAuthenticatedUser, authrorizeRoles('admin'))
    .get(getUserDetails);


handler
    .use(isAuthenticatedUser, authrorizeRoles('admin'))
    .delete(deleteUser);

    

export default handler;