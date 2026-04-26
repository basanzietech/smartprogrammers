import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { name, email, role, location, about, userId } = body;

    const user = await prisma.user.update({
      where: { id: userId || 'temp-user-id' }, 
      data: { name, email, location, about },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
