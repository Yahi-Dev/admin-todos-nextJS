'use client'
import { IoCheckboxOutline, IoCheckbox } from 'react-icons/io5';
import { Todo } from "@prisma/client";
import { startTransition, useOptimistic } from 'react';

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {

  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newcompleteValue: boolean) => ({
      ...state,
      complete: newcompleteValue,
    })
  );

  const onToggleTodo = async () => {
  
    try {

      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete))
      await toggleTodo(todoOptimistic.id, !todoOptimistic.complete)

    } catch {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete))
    }
  }
  

  return (
    <div className={`group flex items-center justify-between p-4 rounded-xl border ${
      todoOptimistic.complete 
        ? 'border-green-100 bg-green-50' 
        : 'border-gray-200 bg-white hover:bg-gray-50'
    } transition-colors duration-200 shadow-sm`}>
      <div
        // onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.complete)}
        onClick={onToggleTodo}
        className="flex items-center gap-4">
        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
          todoOptimistic.complete 
            ? 'bg-green-500 text-white' 
            : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
        } transition-colors duration-200 cursor-pointer`}>
          {todoOptimistic.complete 
            ? <IoCheckbox size={24} /> 
            : <IoCheckboxOutline size={24} />
          }
        </div>
        
        <p className={`${
          todoOptimistic.complete 
            ? 'text-gray-500 line-through' 
            : 'text-gray-800'
        } font-medium`}>
          {todoOptimistic.description}
        </p>
      </div>
      
      <span className="text-sm text-gray-400">
        {todoOptimistic.createdAt.toLocaleDateString()}
      </span>
    </div>
  );
};