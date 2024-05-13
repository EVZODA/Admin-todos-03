import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import * as yup from 'yup'
import { Todo } from '@prisma/client'

interface Segments {
    params: {
        id: string
    }
}

const getTodo = async (id: string): Promise<Todo | null> => {
    const todo = await prisma.todo.findFirst({
        where: {
            id
        }
    })

    return todo
}

export async function GET(request: Request, { params }: Segments) {

    const { id } = params

    const todo = await getTodo(id)

    if (!todo) return NextResponse.json({
        msg: 'El todo con ese uuid no existe'
    }, { status: 404 })



    return NextResponse.json({
        todo
    })
}

const putSchema = yup.object({
    complete: yup.boolean().optional(),
    description: yup.string().optional()
})

export async function PUT(request: Request, { params }: Segments) {

    try {
        const { id } = params

        const todo = await getTodo(id)

        if (!todo) return NextResponse.json({
            msg: 'El todo con ese uuid no existe'
        }, { status: 404 })


        const { complete, description } = await putSchema.validate(await request.json())

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: { complete, description }
        })


        return NextResponse.json({
            updatedTodo
        })
    } catch (error) {
        return NextResponse.json(
            error,
            { status: 400 }
        )
    }


}


