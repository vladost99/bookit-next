import nc from 'next-connect'
import dbConnect from '../../config/dbConnect';
import { currentUserProile } from '../../controllers/authController';
import { isAuthenticatedUser } from '../../middlewares/auth';
import onError from '../../middlewares/errors'

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(currentUserProile)

export default handler;