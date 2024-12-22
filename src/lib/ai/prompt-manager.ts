import fs from 'fs';
import path from 'path';

interface PromptConfig {
  mode: string;
  objective: string;
}

export function loadPrompt(config: PromptConfig): string {
  const modePrompt = loadJsonFile(`modes/${config.mode}-mode.json`);
  const objectivePrompt = loadJsonFile(`objectives/${config.objective}.json`);

  return `${modePrompt}\n\n${objectivePrompt}`;
}

function loadJsonFile(filePath: string): string {
  const fullPath = path.join(process.cwd(), 'prompts', filePath);
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(fileContent).prompt;
}

