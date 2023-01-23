import { ITodoContainer} from "./../types/todo"
import { model, Schema } from "mongoose"

const todosSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: false,
        },

        text: {
            type: String,
            required: false,
        },

        done: {
            type: Boolean,
            required: true,
        },
    },
    {timestamps: true}
)

const todoContainerSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: false,
        },

        todos: {
            type: [todosSchema],
            required: false,
        },
    },
    { timestamps: true }
)

export default model<ITodoContainer>("todocontainers", todoContainerSchema)