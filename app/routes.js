import { Router } from 'express';

import DefaultController from './controllers/default';
import AuthController from './controllers/auth';
import UsersController from './controllers/users';

import authenticate from './middleware/authenticate';
import accessControl from './middleware/access-control';
import errorHandler from './middleware/error-handler';

const routes = new Router();

routes.get('/', DefaultController.index);

// Authentication
routes.post('/auth/login', AuthController.login);

// Users
routes.get('/users', UsersController.getAll);
routes.post('/users', UsersController.create);
routes.get('/users/me', authenticate, UsersController.getUser);
routes.put('/users/me', authenticate, UsersController.update);
routes.delete('/users/me', authenticate, UsersController.delete);
routes.get('/users/:username', UsersController._populate, UsersController.getUser);

// Admin
routes.get('/admin', accessControl('admin'), DefaultController.index);

routes.use(errorHandler);

export default routes;
