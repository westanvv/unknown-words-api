import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LearningSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  word: { type: Schema.Types.ObjectId, ref: 'words', required: true },
  need_study: Boolean,
  created_by: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  date_create: Date,
});

// Strip out some field when sending object to client
LearningSchema.set('toJSON', {
  virtuals: true,
  transform(doc, obj) {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
  },
});

const LearningModel = mongoose.model('learning', LearningSchema);

// Methods
LearningModel.getWhitelistFields = () => {
  return [
    'user',
    'word',
    'need_study',
    'created_by',
    'date_create',
  ];
};

export default LearningModel;
