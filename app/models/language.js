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
    required: [true, 'Username is required.'],
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
  getWhitelistFields() {
    return [
      'name',
      'code',
    ];
  },
};

const LanguageModel = mongoose.model('languages', LanguageSchema);

export default LanguageModel;
