
import { IoCheckboxOutline, IoCheckbox } from 'react-icons/io5';
import { Todo } from "@prisma/client";

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  return (
    <div className={`group flex items-center justify-between p-4 rounded-xl border ${
      todo.complete 
        ? 'border-green-100 bg-green-50' 
        : 'border-gray-200 bg-white hover:bg-gray-50'
    } transition-colors duration-200 shadow-sm`}>
      <div onClick={() => toggleTodo(todo.id, !todo.complete)} className="flex items-center gap-4">
        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
          todo.complete 
            ? 'bg-green-500 text-white' 
            : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
        } transition-colors duration-200 cursor-pointer`}>
          {todo.complete 
            ? <IoCheckbox size={24} /> 
            : <IoCheckboxOutline size={24} />
          }
        </div>
        
        <p className={`${
          todo.complete 
            ? 'text-gray-500 line-through' 
            : 'text-gray-800'
        } font-medium`}>
          {todo.description}
        </p>
      </div>
      
      <span className="text-sm text-gray-400">
        {todo.createAt.toLocaleDateString()}
      </span>
    </div>
  );
};