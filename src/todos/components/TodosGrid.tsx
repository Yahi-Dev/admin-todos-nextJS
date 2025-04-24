'use client';

import { TodoItem } from "./TodoItem";
// import * as todosApi from '@/todos/helpers/todos';
// import { useRouter } from "next/navigation";
import { FiCheckCircle } from "react-icons/fi";
import { Todo } from "@prisma/client";

import {toggleTodo} from '../actions/todo-actions'

interface Props {
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {
  // const router = useRouter();

  // const toggleTodo = async(id: string, complete: boolean) => {
  //   const updatedTodo = await todosApi.updateTodo(id, complete);
  //   console.log({updatedTodo});
  //   router.refresh();
  // }



  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <FiCheckCircle className="w-16 h-16 text-green-400 mb-4 animate-bounce" />
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">¡Todo listo!</h3>
        <p className="text-gray-500 text-lg max-w-md text-center">
          No tienes tareas pendientes en este momento.
          <br />
          <span className="text-sm text-gray-400">
            Añade una nueva tarea para comenzar
          </span>
        </p>
        <div className="mt-6">
          <div className="h-1 w-20 bg-gradient-to-r from-green-300 to-blue-300 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
}