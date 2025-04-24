import { prisma } from '@/lib/prisma';// Importación modificada
import { NewTodo, TodosGrid } from "@/todos";


export const metadata = {
 title: 'Listado de Todos',
 description: 'Listado de Todos',
};

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: { description: 'asc' },
    select: {
      id: true,
      description: true,
      complete: true,
      createAt: true,
      updateAt: true
    }
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow mt-4">
        <h1 className="text-2xl font-bold text-red-500">Lista de Tareas</h1>
        <p className="text-gray-600">Administra tus tareas pendientes</p>
        <small className="text-cyan-500">server actions</small>
      </div>

      <NewTodo />
      <TodosGrid todos={todos} />
    </div>
  );
}