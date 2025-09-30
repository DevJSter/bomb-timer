export const formatTime = (h: number, m: number, s: number): string => {
  // Ensure no negative values are displayed
  const safeH = Math.max(0, h);
  const safeM = Math.max(0, m);
  const safeS = Math.max(0, s);
  return `${String(safeH).padStart(2, "0")}:${String(safeM).padStart(2, "0")}:${String(safeS).padStart(2, "0")}`;
};