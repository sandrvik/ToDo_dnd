import {ITodoContainer} from "../../types/todo";
import {Request, Response} from "express";
import Todo from "../../models/todo";


const getContainers = async (req: Request, res: Response): Promise<void> => {
    try {
        const containers: ITodoContainer[] = await Todo.find();
        res.status(200).json({containers})
    } catch (e) {
        throw e;
    }
}

const addContainer = async (req: Request, res: Response): Promise<void> => {
    try {
        const container: ITodoContainer = new Todo({
            title: req.body.title,
            todos: [],
        })

        const newContainer: ITodoContainer = await container.save();
        const allContainers: ITodoContainer[] = await Todo.find();

        res
            .status(201)
            .json({message:"Container added", container: newContainer, containers: allContainers})
    } catch (e) {
        throw e
    }
}

export {getContainers, addContainer};