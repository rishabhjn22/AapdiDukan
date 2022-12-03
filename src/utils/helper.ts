export const truncateString = (value: string, limit?: number) => {
  if (limit) {
    return (
      value && value.substring(0, limit) + (value.length > limit ? '...' : '')
    );
  }

  return value;
};
