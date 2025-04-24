"use client";

import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
// import * as todosApi from "@/todos/helpers/todos";
// import { useRouter } from "next/navigation";
import { addTodo } from "../actions/todo-actions";


export const NewTodo = () => {
  const [description, setDescription] = useState("");

  // const router = useRouter();

  const obSumit = async (e: FormEvent) => {
    e.preventDefault();

    if (description.trim().length === 0) {
      return;
    }

    const createTodo = await addTodo(description);
    if (createTodo.description !== "") {
      setDescription("");
    }
  };

  const deleteCompleted = async () => {
    // const deletedTodos = await todosApi.deleteTodosComplete();
    // console.log(deletedTodos);
    // router.refresh();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <form onSubmit={obSumit} className="flex w-full items-center gap-2">
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-indigo-500 transition-all bg-gray-50 text-gray-700 placeholder-gray-400"
          placeholder="¿Qué necesita ser hecho?"
        />

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all font-medium cursor-pointer"
        >
          Crear
        </button>

        <button
          type="button"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all cursor-pointer"
          aria-label="Eliminar completados"
          title="Eliminar completados"
          onClick={() => deleteCompleted()}
        >
          <IoTrashOutline className="text-lg" />
          <span className="sr-only md:not-sr-only">Eliminar completados</span>
        </button>
      </form>
    </div>
  );
};
