import OpenAI from 'openai';

if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API Key');
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateResponse(prompt: string): Promise<string> {
  if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    return "Error: OpenAI API key is not configured.";
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content || "I couldn't generate a response.";
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

