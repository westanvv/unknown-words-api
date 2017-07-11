import { Router } from 'express';

import DefaultController from './controllers/default';
import AuthController from './controllers/auth';
import UsersController from './controllers/users';
import LanguagesController from './controllers/languages';

import authenticate from './middleware/authenticate';
import accessControl from './middleware/access-control';
import errorHandler from './middleware/error-handler';
import validateRequest from './middleware/validate-request';

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

// Languages
routes.get('/languages', LanguagesController.getAll);
routes.get('/languages/:id', validateRequest.id, LanguagesController.getElement);
routes.post('/languages', LanguagesController.create);
routes.put('/languages/:id', validateRequest.id, LanguagesController.update);
routes.delete('/languages/:id', validateRequest.id, LanguagesController.delete);

routes.use(errorHandler);

export default routes;
