import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const WordSchema = new Schema({
  word: {
    type: String,
    unique: true,
    required: [true, 'Word is required.'],
  },
  description: String,
  transcription: String,
  examples: [String],
  language: { type: Schema.Types.ObjectId, ref: 'languages', required: true },
  created_by: { type: Schema.Types.ObjectId, ref: 'users', required: true},
  date_create: Date,
});

// Strip out some field when sending object to client
WordSchema.set('toJSON', {
  virtuals: true,
  transform(doc, obj) {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
  },
});

const WordModel = mongoose.model('words', WordSchema);

// Methods
WordModel.getWhitelistFields = () => {
  return [
    'word',
    'description',
    'transcription',
    'examples',
    'language',
    'created_by',
    'date_create',
  ];
};

export default WordModel;
