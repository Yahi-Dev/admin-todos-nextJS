import { prisma } from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({ orderBy: {description: 'asc'}});

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow mt-4">
        <h1 className="text-2xl font-bold text-gray-800">Lista de Tareas</h1>
        <p className="text-gray-600">Administra tus tareas pendientes</p>
      </div>

      <NewTodo />
     <TodosGrid todos={todos}/>
    </div>
  );
}

// import