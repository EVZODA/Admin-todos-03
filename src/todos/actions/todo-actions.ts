'use server'

import { getUserSessionServer } from "@/auth/actions/auth-actions"
import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export const sleep = async (seconds:number) => {

    return new Promise (resolve=> {
        setTimeout(() => {
            resolve(true)
        }, seconds * 1000);
    })

}


export const toogleTodo = async (id:string, complete:boolean):Promise<Todo | null> => {



    await sleep(3)

    const sessionUser = await getUserSessionServer()

    if(!sessionUser) redirect('/api/auth/signin')

    const todo = await prisma.todo.findFirst({where:{id}})

    if (!todo) {
        throw `Todo con el ${id} no encontrado`
    }
    
    const updatedTodo = await prisma.todo.update({
        where:{id},
        data:{complete}
    })

    

    revalidatePath('/dashboard/server-todos')
    return updatedTodo
}

export const createTodo = async (description:string) => {
    const sessionUser = await getUserSessionServer()

    if(!sessionUser) redirect('/api/auth/signin')

    try {
        
    
        const todo = await prisma.todo.create({data:{
            userId:sessionUser?.id!,
            description
        }})
        revalidatePath('/dashboard/server-todos')
        return todo
    
        
        } catch (error) {
            return {
                message:'Error creando todo'
            }
        }
}

export const deleteCompleted = async ():Promise<void> => {
    const sessionUser = await getUserSessionServer()

    if(!sessionUser) redirect('/api/auth/signin')
        
    try {




        await prisma.todo.deleteMany({
            where: { complete: true, userId:sessionUser.id  },
        })

        revalidatePath('/dashboard/server-todos')
        
    } catch (error) {
        error
    }
}