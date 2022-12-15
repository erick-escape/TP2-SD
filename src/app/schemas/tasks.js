import mongoose from '@/database';

const tasksSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  done: {
    type: String,
    default: 0,
  },
});

export default mongoose.model('tasks', tasksSchema);
