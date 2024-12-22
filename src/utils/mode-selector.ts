import { UserPreferences } from '../types/preferences';
import { ChatSettings } from '../types/chat';

export function selectMode(preferences: UserPreferences): ChatSettings {
  return {
    mode: preferences.chatMode,
    objective: preferences.primaryObjective,
  };
}

export function adjustModeBasedOnContext(
  currentSettings: ChatSettings,
  context: string
): ChatSettings {
  // This is a simple example. In a real application, you might use more
  // sophisticated natural language processing to analyze the context.
  const lowercaseContext = context.toLowerCase();

  if (lowercaseContext.includes('sad') || lowercaseContext.includes('upset')) {
    return { ...currentSettings, mode: 'friend', objective: 'emotional-release' };
  }

  if (lowercaseContext.includes('goal') || lowercaseContext.includes('improve')) {
    return { ...currentSettings, mode: 'mentor', objective: 'confidence-building' };
  }

  // If no specific context is detected, return the current settings
  return currentSettings;
}

