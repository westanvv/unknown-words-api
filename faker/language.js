import Language from './../app/models/language';

const mockedData = [{
  name: 'English',
  code: 'en',
}, {
  name: 'Ukrainian',
  code: 'ua',
}];

class LanguageController {
  fake = () => {
    Language.remove({})
      .then(() => {
        mockedData.forEach((element) => {
          let obj = new Language(element);
          obj.save();
        });
      });
  }
}

export default new LanguageController();
