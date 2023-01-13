import React, { useState } from 'react';
import './App.css';
import { v4 as uuid } from 'uuid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Todo } from './components/Todo/Todo';
import { TodoContainer } from './components/TodoContainer/TodoContainer';

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

const mockedList: TodoContainerType[] = [
  {
    id: uuid(),
    title: 'Todo',
    active: false,
    todos: [
      {
        title: 'Task 1',
        titlePlaceholder: 'Todo title',
        text: 'task1task1 task1 task',
        textPlaceholder: 'Todo text',
        done: false,
        id: uuid(),
        active: false,
      },
      {
        title: 'Task 2',
        titlePlaceholder: 'Todo title',
        text: 'task1task2 task2 task\negaewagaewgaweg\nrereg\nrt\nrtn\nrtherh\nrtherh',
        textPlaceholder: 'Todo text',
        done: false,
        id: uuid(),
        active: false,
      },
      {
        title: 'Task 3',
        titlePlaceholder: 'Todo title',
        text: 'task3task3 task3 task',
        textPlaceholder: 'Todo text',
        done: false,
        id: uuid(),
        active: false,
      },
    ],
  },
  {
    id: uuid(),
    title: 'Tomorrow',
    active: false,
    todos: [
      {
        title: 'Task 1',
        titlePlaceholder: 'Todo title',
        text: 'task1task1 task1 task',
        textPlaceholder: 'Todo text',
        done: false,
        id: uuid(),
        active: false,
      },
      {
        title: 'Task 2',
        titlePlaceholder: 'Todo title',
        text: 'task1task2 task2 task',
        textPlaceholder: 'Todo text',
        done: false,
        id: uuid(),
        active: false,
      },
      {
        title: 'Task 3',
        titlePlaceholder: 'Todo title',
        text: 'task3task3 task3 task',
        textPlaceholder: 'Todo text',
        done: false,
        id: uuid(),
        active: false,
      },
    ],
  },
  {
    id: uuid(),
    title: 'Done',
    active: false,
    todos: [
      {
        title: 'Task 1',
        titlePlaceholder: 'Todo title',
        text: 'task1task1 task1 task',
        textPlaceholder: 'Todo text',
        done: false,
        id: uuid(),
        active: false,
      },
      {
        title: 'Task 2',
        titlePlaceholder: 'Todo title',
        text: 'task1task2 task2 task',
        textPlaceholder: 'Todo text',
        done: false,
        id: uuid(),
        active: false,
      },
      {
        title: 'Task 3',
        titlePlaceholder: 'Todo title',
        text: 'task3task3 task3 task',
        textPlaceholder: 'Todo text',
        done: false,
        id: uuid(),
        active: false,
      },
    ],
  },
];

function App() {
  const [todoContainers, setTodoContainers] =
    useState<TodoContainerType[]>(mockedList);

  const addTodo = (containerId: TodoContainerType['id']) => {
    const emptyTask = {
      title: '',
      titlePlaceholder: 'Todo title',
      text: '',
      textPlaceholder: 'Todo text',
      done: false,
      id: uuid(),
      active: true,
    };

    setTodoContainers((containers) =>
      containers.map((c) => {
        if (c.id === containerId) {
          return {
            ...c,
            todos: [emptyTask, ...c.todos],
          };
        }
        return c;
      }),
    );
  };

  const deleteTodo = (
    containerId: TodoContainerType['id'],
    todoId: TodoType['id'],
  ) => {
    setTodoContainers((containers) =>
      containers.map((c) => {
        if (c.id === containerId) {
          return { ...c, todos: c.todos.filter((todo) => todo.id !== todoId) };
        }
        return c;
      }),
    );
  };

  const addContainer = () => {
    const emptyContainer = {
      id: uuid(),
      title: '',
      active: true,
      todos: [],
    };
    setTodoContainers((containers) => [...containers, emptyContainer]);
  };

  const renderTodos = (
    todos: TodoType[],
    containerId: TodoContainerType['id'],
  ): JSX.Element[] => {
    return todos.map((el, idx) => (
      <Todo
        key={el.id}
        todo={el}
        deleteTodo={deleteTodo}
        setTodoContainers={setTodoContainers}
        idx={idx}
        containerId={containerId}
      />
    ));
  };

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <div className="containersWrapper">
          <button
            className="containersWrapper__addButton"
            onClick={addContainer}
          >
            +
          </button>
          {todoContainers.map((c) => {
            return (
              <TodoContainer
                key={c.id}
                container={c}
                addTodo={() => addTodo(c.id)}
                setTodoContainers={setTodoContainers}
              >
                {renderTodos(c.todos, c.id)}
              </TodoContainer>
            );
          })}
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
