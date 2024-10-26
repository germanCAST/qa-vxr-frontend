export const calculateProgress = (
  startDate: string,
  endDate: string
): number => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const today = new Date().getTime();

  if (today < start) return 0;
  if (today > end) return 100;

  return ((today - start) / (end - start)) * 100;
};
