import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Groq API Key is not configured on the server' }, { status: 500 });
    }

    // Direct HTTP request to Groq's OpenAI-compatible completions endpoint
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', 
        messages: [
          {
            role: 'system',
            content: 'You are a warm, empathetic AI assistant for Soulful Healing. Answer inquiries thoughtfully. If the user expresses a desire for a deeper or one-on-one session, guide them gracefully to visit the booking section at /book.',
          },
          ...messages,
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Groq upstream error (${response.status}): ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantReply = data.choices?.[0]?.message?.content || '';
    
    return NextResponse.json({ content: assistantReply });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}