export type TodoType = {
  title: string;
  titlePlaceholder: string;
  text: string;
  textPlaceholder: string;
  done: boolean;
  id: string;
  active: boolean;
};

export type TodoContainerType = {
  id: string;
  title: string;
  active: boolean;
  todos: TodoType[];
};
