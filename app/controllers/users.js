import utils from '../lib/utils';
import User from '../models/user';

class UsersController {

  _populate = async (req, res, next) => {
    const { username } = req.params;

    try {
      const user = await User.findOne({ username });

      if (!user) {
        const err = new Error('User not found.');
        err.status = 404;
        return next(err);
      }

      req.user = user;
      next();
    } catch(err) {
      next(err);
    }
  };

  getAll = async (req, res, next) => {
    try {
      res.json(await User.find());
    } catch(err) {
      next(err);
    }
  };

  getUser = (req, res) => {
    const user = req.user || req.currentUser;

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  };

  create = async (req, res, next) => {
    const params = utils.filterParams(req.body, User.getWhitelistFields());

    let newUser = new User({
      ...params,
      provider: 'local',
    });

    try {
      const savedUser = await newUser.save();
      const token = savedUser.generateToken();
      res.status(201).json({ token });
    } catch(err) {
      err.status = 400;
      next(err);
    }
  };

  update = async (req, res, next) => {
    const params = utils.filterParams(req.body, User.getWhitelistFields());
    const updatedUser = await User.findByIdAndUpdate(
      req.currentUser._id,
      { $set: params },
    );

    try {
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    if (!req.currentUser) {
      return res.sendStatus(403);
    }

    try {
      await req.currentUser.remove();
      res.sendStatus(204);
    } catch(err) {
      next(err);
    }
  }
}

export default new UsersController();
