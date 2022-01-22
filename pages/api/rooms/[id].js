import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getSingleRoom, updateRoom, deleteRoom } from '../../../controllers/roomControllers';
import onError from '../../../middlewares/errors';
import { isAuthenticatedUser, authrorizeRoles } from '../../../middlewares/auth';


const handler = nc({onError});

dbConnect();

handler.get(getSingleRoom);

handler.use(isAuthenticatedUser, authrorizeRoles('admin')).put(updateRoom);

handler.use(isAuthenticatedUser, authrorizeRoles('admin')).delete(deleteRoom);

export default handler;