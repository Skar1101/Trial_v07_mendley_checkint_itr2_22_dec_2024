import { generateResponse } from './ai/openai-client';

export async function analyzeContext(text: string): Promise<string> {
  const prompt = `Analyze the following text and provide a brief summary of its context and main themes:

${text}

Summary:`;

  try {
    const analysis = await generateResponse(prompt);
    return analysis;
  } catch (error) {
    console.error('Error analyzing context:', error);
    throw error;
  }
}

