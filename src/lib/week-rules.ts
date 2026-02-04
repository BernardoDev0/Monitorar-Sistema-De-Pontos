import { formatDateISO, getLastDayOfMonth } from './date-utils'

export function getFixedWeekFromDate(date: Date): number | null {
  const d = date.getDate()
  if (d >= 1 && d <= 8) return 1
  if (d >= 9 && d <= 15) return 2
  if (d >= 16 && d <= 22) return 3
  if (d >= 23 && d <= 29) return 4
  return 5
}

export function getFixedWeekRangesForMonth(
  weekNumber: number,
  referenceDate: Date
): Array<{ start: Date; end: Date }> {
  const year = referenceDate.getFullYear()
  const month = referenceDate.getMonth()
  const lastDay = getLastDayOfMonth(new Date(year, month, 1)).getDate()

  if (weekNumber < 1 || weekNumber > 5) return []

  if (weekNumber >= 1 && weekNumber <= 4) {
    const startDay = weekNumber === 1 ? 1 : weekNumber === 2 ? 9 : weekNumber === 3 ? 16 : 23
    const endDayRaw = weekNumber === 1 ? 8 : weekNumber === 2 ? 15 : weekNumber === 3 ? 22 : 29
    const endDay = Math.min(endDayRaw, lastDay)
    return [{ start: new Date(year, month, startDay), end: new Date(year, month, endDay) }]
  }

  if (lastDay <= 29) return []
  return [{ start: new Date(year, month, 30), end: new Date(year, month, lastDay) }]
}

export function getFixedWeekDateRangesISO(
  weekNumber: number,
  referenceDate: Date
): Array<{ start: string; end: string }> {
  return getFixedWeekRangesForMonth(weekNumber, referenceDate).map(r => ({
    start: formatDateISO(r.start),
    end: formatDateISO(r.end),
  }))
}
