import { Document } from "mongoose"

export interface ITodoContainer extends Document {
    title: string;
    todos: ITodo[];
};

export interface ITodo extends Document {
    title: string;
    text: string;
    done: boolean;
}