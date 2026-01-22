import { formatDateISO, getLastDayOfMonth } from './date-utils'

export function getFixedWeekFromDate(date: Date): number | null {
  const d = date.getDate()
  if (d >= 5 && d <= 9) return 1
  if (d >= 12 && d <= 16) return 2
  if (d >= 19 && d <= 23) return 3
  if (d >= 26 && d <= 30) return 4
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
    const startDay = weekNumber === 1 ? 5 : weekNumber === 2 ? 12 : weekNumber === 3 ? 19 : 26
    const endDayRaw = weekNumber === 1 ? 9 : weekNumber === 2 ? 16 : weekNumber === 3 ? 23 : 30
    const endDay = Math.min(endDayRaw, lastDay)
    return [{ start: new Date(year, month, startDay), end: new Date(year, month, endDay) }]
  }

  const reserved: Array<[number, number]> = [
    [5, Math.min(9, lastDay)],
    [12, Math.min(16, lastDay)],
    [19, Math.min(23, lastDay)],
    [26, Math.min(30, lastDay)],
  ]

  const ranges: Array<{ start: Date; end: Date }> = []
  let currentStart: number | null = null

  for (let day = 1; day <= lastDay; day++) {
    const inReserved = reserved.some(([s, e]) => day >= s && day <= e)
    if (inReserved) {
      if (currentStart !== null) {
        ranges.push({ start: new Date(year, month, currentStart), end: new Date(year, month, day - 1) })
        currentStart = null
      }
      continue
    }
    if (currentStart === null) currentStart = day
    const isLastDay = day === lastDay
    const nextDayInReserved = !isLastDay && reserved.some(([s, e]) => day + 1 >= s && day + 1 <= e)
    if (isLastDay || nextDayInReserved) {
      ranges.push({ start: new Date(year, month, currentStart), end: new Date(year, month, day) })
      currentStart = null
    }
  }

  return ranges
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
