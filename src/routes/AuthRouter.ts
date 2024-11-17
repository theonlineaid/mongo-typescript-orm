import { Router } from 'express';
import { errorHandler } from '../utils/errorHandler';
import authCtrl from '../controllers/AuthCtrl';
const AuthRouter: Router = Router();

AuthRouter.post('/register', errorHandler(authCtrl.register));

export default AuthRouter;