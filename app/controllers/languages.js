import utils from '../lib/utils';
import Languages from '../models/language';

class LanguagesController {

  getAll = async (req, res, next) => {
    try {
      res.json(await Languages.find());
    } catch(err) {
      next(err);
    }
  };

  getElement = async (req, res, next) => {
    const language = await Languages.findById(
      req.params.id
    );
    if (!language) {
      return res.sendStatus(404);
    }

    try {
      res.json(language);
    } catch(err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    const params = utils.filterParams(req.body, Languages.getWhitelistFields());
    let newLanguage = new Languages(params);

    try {
      const savedLanguage = await newLanguage.save();
      res.status(201).json(savedLanguage);
    } catch(err) {
      err.status = 400;
      next(err);
    }
  };

  update = async (req, res, next) => {
    const params = utils.filterParams(req.body, Languages.getWhitelistFields());
    await Languages.findByIdAndUpdate(
      req.params.id,
      { $set: params },
    );

    try {
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    const language = await Languages.findById(
      req.params.id
    );
    if (!language) {
      return res.sendStatus(404);
    }

    try {
      await language.remove();
      res.sendStatus(204);
    } catch(err) {
      next(err);
    }
  };
}

export default new LanguagesController();
