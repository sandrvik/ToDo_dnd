import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { TodoContainerType, TodoType } from '../../App';
import { Input } from '../UI/Input/Input';
import { TextArea } from '../UI/Input/TextArea';
import './Todo.css';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import { Items } from '../types/types';
import useAutoFocus from '../../hooks/useAutofocus';
import { CrossIcon } from '../UI/CustomIcons/CrossIcon';
import { getIsDraggedAfterMiddle } from '../../utilities/utilities';

type TodoProps = {
  todo: TodoType;
  setTodoContainers: Dispatch<SetStateAction<TodoContainerType[]>>;
  idx: number;
  containerId: string;
  deleteTodo: (
    containerId: TodoContainerType['id'],
    todoId: TodoType['id'],
  ) => void;
};

export function Todo({
  todo,
  setTodoContainers,
  idx,
  containerId,
  deleteTodo,
}: TodoProps): JSX.Element {
  const [todoTitle, setTodoTitle] = useState<string>(todo.title);
  const [todoText, setTodoText] = useState<string>(todo.text);
  const [{ isDragging }, drag] = useDrag(
    {
      type: Items.TODO,
      item: () => ({ ...todo, idx, containerId }),
      collect: (m) => ({
        isDragging: m.isDragging(),
      }),
      isDragging: (m) => {
        return todo.id === m.getItem().id;
      },
    },
    [todo, idx, containerId],
  );
  const [{ handlerId }, drop] = useDrop(
    {
      accept: Items.TODO,
      hover: (draggedItem, monitor) => handleDrop(draggedItem, monitor),
      collect: (m) => ({
        handlerId: m.getHandlerId(),
      }),
    },
    [todo, idx, containerId],
  );

  const dndRef = useRef<HTMLDivElement | null>(null);

  const handleDrop = (draggedItem: unknown, monitor: DropTargetMonitor) => {
    const dragged = draggedItem as TodoType & {
      idx: number;
      containerId: string;
    };
    if (dragged.id === todo.id) return;

    if (dndRef.current) {
      const isDraggedAfterMiddle = getIsDraggedAfterMiddle(
        monitor.getClientOffset() as XYCoord,
        dndRef.current,
      );

      if (
        dragged.containerId === containerId &&
        dragged.idx < idx &&
        !isDraggedAfterMiddle
      )
        return;
      if (
        dragged.containerId === containerId &&
        dragged.idx > idx &&
        isDraggedAfterMiddle
      )
        return;

      const { idx: index, containerId: containerIndex, ...plainTask } = dragged;

      if (dragged.containerId === containerId) {
        setTodoContainers((containers) => {
          return containers.map((c) => {
            if (c.id === dragged.containerId) {
              const listWithoutDraggedTask = c.todos.filter(
                (t) => t.id !== dragged.id,
              );
              return {
                ...c,
                todos: [
                  ...listWithoutDraggedTask.slice(0, idx),
                  plainTask,
                  ...listWithoutDraggedTask.slice(idx),
                ],
              };
            }
            return c;
          });
        });
        dragged.idx = idx;
      }
      if (dragged.containerId !== containerId) {
        setTodoContainers((containers) => {
          return containers.map((c) => {
            if (c.id === dragged.containerId) {
              return {
                ...c,
                todos: c.todos.filter((t) => t.id !== dragged.id),
              };
            }
            if (c.id === containerId) {
              return {
                ...c,
                todos: [
                  ...c.todos.slice(0, idx + Number(isDraggedAfterMiddle)),
                  plainTask,
                  ...c.todos.slice(idx + Number(isDraggedAfterMiddle)),
                ],
              };
            }
            return c;
          });
        });
        dragged.idx = idx + Number(isDraggedAfterMiddle);
        dragged.containerId = containerId;
      }
    }
  };

  const deactivateFocus = () => {
    setTodoContainers((containers) => {
      return containers.map((c) => {
        if (c.id === containerId) {
          return {
            ...c,
            todos: c.todos.map((el) => {
              if (el.id === todo.id) {
                return { ...el, active: false };
              }
              return el;
            }),
          };
        }
        return c;
      });
    });
  };

  const inputRef = useAutoFocus(todo.active, deactivateFocus);

  const handleSaveTitle = (id: string) => {
    setTodoContainers((containers) => {
      return containers.map((c) => {
        if (c.id === containerId) {
          return {
            ...c,
            todos: c.todos.map((el) => {
              if (el.id === id) {
                return { ...el, title: todoTitle };
              }
              return el;
            }),
          };
        }
        return c;
      });
    });
  };

  const handleSaveText = (id: string) => {
    setTodoContainers((containers) => {
      return containers.map((c) => {
        if (c.id === containerId) {
          return {
            ...c,
            todos: c.todos.map((el) => {
              if (el.id === id) {
                return { ...el, text: todoText };
              }
              return el;
            }),
          };
        }
        return c;
      });
    });
  };

  drag(drop(dndRef));
  const opacity = isDragging ? 0 : 1;

  return (
    <div
      ref={dndRef}
      className="todoWrapper"
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <div className="todoInputs">
        <Input
          ref={inputRef}
          style={{ marginBottom: '5px' }}
          className="todoTitle"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          onBlur={() => handleSaveTitle(todo.id)}
          placeholder={todo.titlePlaceholder}
          draggable
          onDragStart={(event) => event.preventDefault()}
        />
        <TextArea
          className="todoText"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          onBlur={() => handleSaveText(todo.id)}
          placeholder={todo.textPlaceholder}
          draggable
          onDragStart={(event) => event.preventDefault()}
        />
        <CrossIcon
          className="todoDelete"
          size={20}
          color="#319985"
          onClick={() => deleteTodo(containerId, todo.id)}
        />
      </div>
    </div>
  );
}
