"use client";

import { Typewriter } from "../Typewriter/Typewriter";


export const UserGreeting = ({ name }: { name?: string | null }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">
        Bienvenido, <span className="text-indigo-600">{name || "Usuario"}</span>
      </h1>
      <p className="text-gray-600">
        Hola de nuevo <Typewriter text={name || "Usuario"} />
      </p>
      <p className="text-sm text-gray-500 mt-1">
        Último acceso: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};