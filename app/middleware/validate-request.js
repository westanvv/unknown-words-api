import utils from '../lib/utils';

class MiddlewareClass {
  id = (req, res, next) => {
    if (!utils.isValidId(req.params.id)) {
      return res.sendStatus(500);
    }
    next();
  };
}

export default new MiddlewareClass();
