import  { prisma }  from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {


  // await prisma.todo.deleteMany({where: {complete: true}});
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
      {description: 'Piedra del alma', complete: false},
      {description: 'Piedra del tiempo', complete: true},
      {description: 'Piedra del espacio'},
      {description: 'Piedra del poder'}
    ]
  })


  return NextResponse.json({ message: "Seed Executed" })
}



