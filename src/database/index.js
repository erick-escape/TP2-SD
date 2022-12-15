import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/tasks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;

export default mongoose;
