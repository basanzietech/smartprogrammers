import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const issues = await prisma.issue.findMany({
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(issues);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch issues' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, priority, userId } = body;

    const issue = await prisma.issue.create({
      data: {
        title,
        priority,
        userId: userId || 'temp-user-id', // We should ideally get this from auth
      },
    });

    return NextResponse.json(issue);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create issue' }, { status: 500 });
  }
}
