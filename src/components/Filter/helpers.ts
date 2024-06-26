const getCurrentYear = () => new Date().getFullYear();

export const generateYearValues = (numYears: number) => {
  const currentYear = getCurrentYear();
  const years = Array.from({ length: numYears }, (_, i) => currentYear - i);
  return years.map(year => ({
    label: year,
    value: String(year)
  }));
};
