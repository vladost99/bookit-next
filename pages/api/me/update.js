import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';
import { updateUserProile } from '../../../controllers/authController';
import { isAuthenticatedUser } from '../../../middlewares/auth';
import onError from '../../../middlewares/errors'

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(updateUserProile)

export default handler;