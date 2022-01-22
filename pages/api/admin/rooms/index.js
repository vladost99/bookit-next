import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect';
import { allAdminRooms } from '../../../../controllers/roomControllers';
import onError from '../../../../middlewares/errors';
import { isAuthenticatedUser, authrorizeRoles } from '../../../../middlewares/auth';

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser, authrorizeRoles('admin'))
    .get(allAdminRooms)

export default handler;