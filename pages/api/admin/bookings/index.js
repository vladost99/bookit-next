import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect';
import { allAdminBookings } from '../../../../controllers/bookingController';
import onError from '../../../../middlewares/errors';
import { isAuthenticatedUser, authrorizeRoles } from '../../../../middlewares/auth';

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser, authrorizeRoles('admin'))
    .get(allAdminBookings);

export default handler;