import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.issue.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Issue deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete issue' }, { status: 500 });
  }
}
