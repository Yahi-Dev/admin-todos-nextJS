import  { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    // Limpiar la base de datos
    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
      data: {
        email: 'test1@google.com',
        password: bcrypt.hashSync('123456'),
        roles: ['admin', 'client', 'super-user'],
        todos: {
          create: [
            { description: 'Piedra del alma', complete: false },
            { description: 'Piedra del tiempo', complete: true },
            { description: 'Piedra del espacio' },
            { description: 'Piedra del poder' }
          ]
        }
      }
    });

    // Crear nuevos registros
    // await prisma.todo.createMany({
    //   data: [
    //     { description: 'Piedra del alma', complete: false },
    //     { description: 'Piedra del tiempo', complete: true },
    //     { description: 'Piedra del espacio' },
    //     { description: 'Piedra del poder' }
    //   ]
    // });

    return NextResponse.json({ message: "Seed ejecutado correctamente" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al ejecutar el seed" },
      { status: 500 }
    );
  }
}