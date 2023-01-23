import { TodoType } from '@components/todo';

export type TodoContainerType = {
  id: string;
  title: string;
  active: boolean;
  todos: TodoType[];
};
