import  { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Limpiar la base de datos
    await prisma.todo.deleteMany();

    // Crear nuevos registros
    await prisma.todo.createMany({
      data: [
        { description: 'Piedra del alma', complete: false },
        { description: 'Piedra del tiempo', complete: true },
        { description: 'Piedra del espacio' },
        { description: 'Piedra del poder' }
      ]
    });

    return NextResponse.json({ message: "Seed ejecutado correctamente" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al ejecutar el seed" },
      { status: 500 }
    );
  }
}