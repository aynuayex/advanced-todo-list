import React, { useEffect, useRef, useState } from "react";
import Todo from "../types";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index:number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus();
}, [edit]);

  function handleDone(id: number) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

const handleEdit = (e:React.FormEvent,id:number) => {
  e.preventDefault();
  setTodos(todos.map((todo) => todo.id===id?{...todo,todo:editTodo}:todo));
  setEdit(!edit)
}

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided,snapshot) => (

    <form ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`todo ${snapshot.isDragging?'drag':''}`} onSubmit={(e) => handleEdit(e,todo.id)}>
      {edit ? (
        <input type='text' ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className="todo-text" />
      ) : todo.isDone ? (
        <s className="todo-text">{todo.todo}</s>
      ) : (
        <span className="todo-text">{todo.todo}</span>
      )}

      <div>
        <span className="icon">
          <AiFillEdit
            onClick={() => (!edit && !todo.isDone ? setEdit(!edit) : edit)}
          />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
