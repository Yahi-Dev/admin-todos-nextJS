
import { Todo } from "@prisma/client";

export const updateTodo = async(id: string, complete: boolean):Promise<Todo> => {

    const body = {
        complete
    };

    const bdTodo = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());

    return bdTodo;

}

export const createTodo = async(description: string):Promise<Todo> => {

    const body = {
        description
    };

    const bdTodo = await fetch(`/api/todos`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());

    return bdTodo;
}

export const deleteTodosComplete = async(): Promise<boolean> => {
    await fetch('/api/todos', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return true;
}