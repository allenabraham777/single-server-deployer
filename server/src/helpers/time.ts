export const getFormattedNow = (): string => {
  const time = Date.now();
  const today = new Date(time);
  return today.toISOString();
};
