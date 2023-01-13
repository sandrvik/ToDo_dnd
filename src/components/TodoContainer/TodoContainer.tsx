import './TodoContainer.scss';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDrop } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Items } from '../types/types';
import { TodoContainerType, TodoType } from '../../App';
import { Input } from '../UI/Input/Input';
import useAutoFocus from '../../hooks/useAutofocus';
import { CountIcon } from '../UI/CountIcon/CountIcon';
import { Button } from '../UI/Button/Button';

type TodoContainerProps = {
  container: TodoContainerType;
  addTodo: (id: TodoContainerType['id']) => void;
  setTodoContainers: Dispatch<SetStateAction<TodoContainerType[]>>;
  children: JSX.Element[];
};

export function TodoContainer(props: TodoContainerProps): JSX.Element {
  const { container, children, addTodo, setTodoContainers } = props;

  const [containerTitle, setContainerTitle] = useState<string>(container.title);

  const [{}, drop] = useDrop(
    {
      accept: Items.TODO,
      hover: (draggedItem) => handleDrop(draggedItem),
      collect: (m) => ({
        isOver: m.isOver(),
        getItem: m.getItem(),
      }),
      canDrop: () => !container.todos.length,
    },
    [container],
  );

  const handleDrop = (draggedItem: unknown) => {
    const dragged = draggedItem as TodoType & {
      idx: number;
      containerId: string;
    };
    const { idx: index, containerId, ...plainTask } = dragged;
    if (container.todos.length === 0) {
      setTodoContainers((containers) => {
        return containers.map((c) => {
          if (c.id === container.id) {
            return {
              ...c,
              todos: [plainTask],
            };
          }
          if (c.id === containerId) {
            const listWithoutDraggedTask = c.todos.filter(
              (t) => t.id !== dragged.id,
            );
            return {
              ...c,
              todos: listWithoutDraggedTask,
            };
          }
          return c;
        });
      });
      dragged.containerId = container.id;
    }
  };

  const deactivateFocus = () => {
    setTodoContainers((containers) => {
      return containers.map((c) => {
        if (c.id === container.id) {
          return { ...c, active: false };
        }
        return c;
      });
    });
  };

  const titleRef = useAutoFocus(container.active, deactivateFocus);

  const handleSaveTitle = (id: TodoContainerType['id']) => {
    setTodoContainers((containers) => {
      return containers.map((c) => {
        if (c.id === id) {
          return { ...c, title: containerTitle };
        }
        return c;
      });
    });
  };

  const deleteContainer = (id: TodoContainerType['id']) => {
    setTodoContainers((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="todoContainer">
      <div className="todoContainer__header">
        <Input
          ref={titleRef}
          className="todoContainer__title"
          value={containerTitle}
          onChange={(e) => setContainerTitle(e.target.value)}
          onBlur={() => handleSaveTitle(container.id)}
          placeholder="Container title"
          draggable
          onDragStart={(event) => event.preventDefault()}
        />
        <div className="todoContainer__buttons">
          <CountIcon>{container.todos.length}</CountIcon>
          <Button
            className="todoContainer__delete"
            style={{ fontSize: '15px' }}
          >
            <FontAwesomeIcon
              onClick={() => deleteContainer(container.id)}
              icon={faTrashCan}
            />
          </Button>
        </div>
      </div>
      <Button
        width="100%"
        style={{ fontSize: '25px' }}
        onClick={() => addTodo(container.id)}
      >
        +
      </Button>
      <ul className="todoContainer__list" ref={drop}>
        {children}
      </ul>
    </div>
  );
}
