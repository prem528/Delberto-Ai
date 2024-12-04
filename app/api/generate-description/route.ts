import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the request body type
interface RequestBody {
  title: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    // Parse the request body
    const body: RequestBody = await req.json();

    if (!body.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const { title } = body;

    // Call OpenAI API with the appropriate model
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `Write a brief description about: ${title}` },
      ],
      max_tokens: 100,
    });

    const description = completion.choices[0]?.message?.content?.trim();

    if (!description) {
      throw new Error('Description not generated');
    }

    return NextResponse.json({ description });
  } catch (error) {
    console.error('Error generating description:', (error as Error).message);
    return NextResponse.json(
      { error: 'Failed to generate description' },
      { status: 500 }
    );
  }
}
