
import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {

  await prisma.todo.deleteMany()
  await prisma.user.deleteMany()

  const user = await prisma.user.create({
    data: {
      email: 'test1@hotmail.com',
      password: bcrypt.hashSync('123456'),
      roles: ['admin', 'client'],
      todos: {
        create: [
          { description: 'piedra de marte', complete: true },
          { description: 'piedra de marte', complete: true },
          { description: 'piedra de marte', complete: true },
          { description: 'piedra de marte', complete: true },
          { description: 'piedra de marte', complete: true },
        ]
      }

    }
  })


  return NextResponse.json({
    msg:'ejecutado',
    user
})


}