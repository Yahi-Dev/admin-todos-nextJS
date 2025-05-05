export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { prisma } from '@/lib/prisma';// Importación modificada
import { NewTodo, TodosGrid } from "@/todos";
import { getUserSessionServer } from '@/auth/actions/auth-actions';

export default async function RestTodosPage() {

  const user = await getUserSessionServer();

  const todos = await prisma.todo.findMany({
    where: {userId: user.id},
    orderBy: { description: 'asc' },
    select: {
      id: true,
      description: true,
      complete: true,
      createdAt: true,
      updateAt: true
    }
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow mt-4">
        <h1 className="text-2xl font-bold text-gray-800">Lista de Tareas</h1>
        <p className="text-gray-600">Administra tus tareas pendientes</p>
      </div>

      <NewTodo />
      <TodosGrid todos={todos} />
    </div>
  );
}