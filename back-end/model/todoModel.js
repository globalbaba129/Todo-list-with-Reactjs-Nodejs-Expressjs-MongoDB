import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
});

const TaskData = mongoose.model('TaskData', TodoSchema);

export default TaskData;
