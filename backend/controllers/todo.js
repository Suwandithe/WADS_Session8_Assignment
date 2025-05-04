import { connectToDB } from "../utils/connection.js";
import { createError } from "../utils/error.js";
import Todo from "../models/todo.Model.js";


export async function getAllTodo(req,res, next) {
    await connectToDB();
    const todos = await Todo.find({userID: req.user.id});
    res.status(200).send(todos)
}
export async function addTodo(req,res, next) {
    // console.log(req.body);
    if (!req.body || !req.body.title) {
        return next(createError(404, "Title is required"))
    }

    await connectToDB();

    const newTodo = new Todo({ title: req.body.title, description: req.body.description, userID: req.user.id });
    await newTodo.save();
    res.status(201).json(newTodo);
    
}
export async function updateTodo(req,res, next) {
    const id = req.params.id;
    if(!req.body) return next(createError(404, "missing fields"));
    try {
        await connectToDB();
        const todo = await Todo.findById(id);
        if(todo.userID.toString() !== req.user.id){
            return next(createError("404", "not authorized"))
        }
        todo.title = req.body.title || todo.title;
        todo.description = req.body.description || todo.description

        if(req.body.isCompleted !== undefined){
            todo.isCompleted = req.body.isCompleted;
        }
        await todo.save();
        res.status(200).json({
            message: "todo updated",
            _id: todo.id,
            title: todo.title,
            description: todo.description,
        })

    } catch (error) {
        return next(createError(404, "todo not found"))
    }
}
export async function deleteTodo(req,res, next) {
    try {
        await connectToDB();
        const todo = await Todo.deleteOne({
            _id: req.params.id,
            userID: req.user.id,
        });
        if (!todo.deletedCount) return next(createError(400, "todo not found"));
        res.status(200).json({
            message:"Todo deleted",
            _id: todo.id
        })
    } catch (error) {
        return next(createError(400, "todo not found"))
    }

}

export async function getTodo(req,res, next) {
    try {
        await connectToDB();
        const todo = await Todo.findById(req.params.id);
        if(!todo) return next(createError(404, "Todo not found"));
        if (todo.userID.toString() !== req.user.id) {
            return next(createError("404", "Not authorized"));
        }
        res.status(200).send(todo);
    } catch (error) {
        next(createError(404, "Todo not found"));        
    }
}

