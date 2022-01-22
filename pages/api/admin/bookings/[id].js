import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect';
import { deleteBooking} from '../../../../controllers/bookingController';
import onError from '../../../../middlewares/errors';
import { isAuthenticatedUser, authrorizeRoles } from '../../../../middlewares/auth';

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser, authrorizeRoles('admin'))
    .delete(deleteBooking);

export default handler;