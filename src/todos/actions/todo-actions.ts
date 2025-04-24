'use server'

import { prisma } from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { revalidatePath } from 'next/cache';



export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
    try {
        const updateTodo = await prisma.todo.update({
            where: { id },
            data: { complete }
        });
        revalidatePath('/dashboard/server-todos');
        return updateTodo;
    } catch {
        throw new Error(`Error updating todo with id ${id}`);
    }
}

export const addTodo = async (description: string): Promise<Todo> => {
    try {
        const todo = await prisma.todo.create({ 
            data: { 
                description: description,
            } 
        });
        revalidatePath('/dashboard/server-todos');
        return todo;
    } catch {
        throw new Error("Error al crear el todo");
    }
}
