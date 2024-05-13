
import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

   const deleteTodo = await prisma.todo.deleteMany()

   const todo = await prisma.todo.createMany({
    data:[
        {description:'Piedra del alma', complete:true},
        {description:'Piedra del alma'},
        {description:'Piedra del alma'},
        {description:'Piedra del alma'},
        {description:'Piedra del alma'}
    ]
   })

  

  return NextResponse.json({
    deleteTodo,
    todo,
    msg:'seed data'
  })
}