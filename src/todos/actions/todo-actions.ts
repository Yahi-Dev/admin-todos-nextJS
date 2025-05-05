'use server'

import { getUserSessionServer } from '@/auth/actions/auth-actions';
import { prisma } from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const sleep = async (seconds: number = 0) => {

    return new Promise (resolve => {
        setTimeout(() => {
           resolve(true);
        }, seconds * 1000);
    });
}

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {

    await sleep(3);

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

export const addTodo = async (description: string, userId: string): Promise<Todo> => {
    getUserSessionServer();
    try {
        const todo = await prisma.todo.create({ 
            data: { 
                description: description,
                userId: userId
            } 
        });
        revalidatePath('/dashboard/server-todos');
        return todo;
    } catch {
        throw new Error("Error al crear el todo");
    }
}


export const deletedCompleted = async (): Promise<void> => {   
    await prisma.todo.deleteMany({ where: { complete: true } });
    revalidatePath('/dashboard/server-todos');
}