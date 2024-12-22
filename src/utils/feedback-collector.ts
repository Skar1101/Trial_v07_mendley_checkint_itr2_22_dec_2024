import { ChatMessage } from '../types/chat';

export function collectFeedback(message: ChatMessage): Promise<FeedbackResult> {
  return new Promise((resolve) => {
    // Simulating an asynchronous feedback collection process
    setTimeout(() => {
      const feedback: FeedbackResult = {
        helpful: Math.random() > 0.5,
        rating: Math.floor(Math.random() * 5) + 1,
        comments: "This is a simulated feedback comment.",
      };
      resolve(feedback);
    }, 1000);
  });
}

interface FeedbackResult {
  helpful: boolean;
  rating: number;
  comments?: string;
}

export function analyzeFeedback(feedbackResults: FeedbackResult[]): FeedbackAnalysis {
  const totalFeedback = feedbackResults.length;
  const helpfulCount = feedbackResults.filter((result) => result.helpful).length;
  const averageRating = feedbackResults.reduce((sum, result) => sum + result.rating, 0) / totalFeedback;

  return {
    helpfulPercentage: (helpfulCount / totalFeedback) * 100,
    averageRating,
    totalFeedback,
  };
}

interface FeedbackAnalysis {
  helpfulPercentage: number;
  averageRating: number;
  totalFeedback: number;
}

