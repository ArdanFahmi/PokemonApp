export const formatCapital = (input: string) => {
  return !input
    ? input
    : input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
};