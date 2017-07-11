import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
  },
});

// Strip out some field when sending object to client
LanguageSchema.set('toJSON', {
  virtuals: true,
  transform(doc, obj) {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
  },
});

// Methods
LanguageSchema.methods = {
};

const LanguageModel = mongoose.model('languages', LanguageSchema);

// Methods
LanguageModel.getWhitelistFields = () => {
  return [
    'name',
    'code',
  ];
};

export default LanguageModel;
