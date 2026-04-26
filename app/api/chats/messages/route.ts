import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get('conversationId');

  if (!conversationId) {
    return NextResponse.json({ error: 'Conversation ID required' }, { status: 400 });
  }

  try {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, senderId, conversationId } = body;

    // If conversationId doesn't exist, create one (simplification)
    let convId = conversationId;
    if (!convId) {
      const conv = await prisma.conversation.create({
        data: {
          users: { connect: [{ id: senderId }] }
        }
      });
      convId = conv.id;
    }

    const message = await prisma.message.create({
      data: {
        text,
        senderId,
        conversationId: convId,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
