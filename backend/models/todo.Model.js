import mongoose, { model } from "mongoose";

const todoSchema = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    isCompleted:{
        type: Boolean,
        default: false,
    }

})

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;