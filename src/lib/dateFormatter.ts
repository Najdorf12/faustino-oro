/* * Formatea una fecha a formato DD/MM/YYYY */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

/**
 * Formatea un rango de fechas
 */
export function formatDateRange(
  startDate: Date | string,
  endDate: Date | string,
): string {
  const start = formatDate(startDate);
  const end = formatDate(endDate);

  return `${start} a ${end}`;
}

/**
 * Verifica si un torneo está activo (en curso o futuro)
 */
export function isTournamentActive(endDate: Date | string): boolean {
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return end >= today;
}
