export const getRandomGeneratedPassword = (): string => {
  return Math.random().toString(36).slice(-8);
};
