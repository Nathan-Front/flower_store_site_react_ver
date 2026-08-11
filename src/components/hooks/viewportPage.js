export function getCardsPerPage() {
  if (window.innerWidth <= 540) return 6; // 1 × 6
  if (window.innerWidth <= 920) return 6; // 2 × 3 just to show grid style, can delete it if wanted
  if (window.innerWidth <= 950) return 9; // 3 x 3
  return 12; // 4 × 3
}
