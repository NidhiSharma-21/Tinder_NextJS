// Mock match percentage calculation
export const calculateMatchPercentage = (): number => {
  // More sophisticated mock algorithm
  const factors = [
    Math.random() * 0.25, // Random compatibility
    0.15, // Base compatibility
    Math.random() * 0.2, // Interest overlap
    Math.random() * 0.15, // Location proximity
    Math.random() * 0.15, // Age compatibility
    Math.random() * 0.1, // Lifestyle match
  ];
  
  const percentage = factors.reduce((sum, factor) => sum + factor, 0) * 100;
  return Math.round(Math.min(Math.max(percentage, 65), 98)); // Keep between 65-98%
};

export const getMatchMessage = (percentage: number): string => {
  if (percentage >= 90) return "It's a perfect match! 💕";
  if (percentage >= 80) return "Great compatibility! 🌟";
  if (percentage >= 70) return "Good match potential! ✨";
  if (percentage >= 60) return "Decent match! 👍";
  return "Let's see how it goes! 🤔";
};

export const getMatchColor = (percentage: number): string => {
  if (percentage >= 90) return "text-red-500";
  if (percentage >= 80) return "text-pink-500";
  if (percentage >= 70) return "text-purple-500";
  if (percentage >= 60) return "text-blue-500";
  return "text-gray-500";
};
