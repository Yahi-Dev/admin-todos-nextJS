import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server'
import * as yup from 'yup';

export async function GET(request: Request) { 

    const { searchParams } = new URL(request.url)
    const take = searchParams.get('take') ?? '10'

    if (isNaN(+take)) {
        return NextResponse.json({message: 'Take tiene que ser un numero'}, {status: 400});
    }

    const todos = await prisma.todo.findMany({
        take: +take,
    });

    const skip = searchParams.get('skip') ?? '0'

    if (isNaN(+skip)) {
        return NextResponse.json({message: 'Skip tiene que ser un numero'}, {status: 400});
    }

    return NextResponse.json(todos);

};


const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) { 
    try {
        const body = await request.json();

        const validatedData = await postSchema.validate(body);

        const todo = await prisma.todo.create({ data: validatedData });

        return NextResponse.json(todo);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error en la validación o creación' }, { status: 400 });
    }
}



export async function DELETE() { 
    try {    
      await prisma.todo.deleteMany({ where: { complete: true } }); 
      return NextResponse.json({ message: 'Tareas completadas eliminadas' });
    } catch (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
  }