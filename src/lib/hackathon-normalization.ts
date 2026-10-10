import type { AddressWithCountryLogo, Prize } from "@/types/unstop"
import type { NormalizedPrize } from "@/types/hackathon"

interface ParsedDatePart {
  month: number
  day: number
  year: number | null
}

export interface ParsedDateRange {
  startDate: string | null
  endDate: string | null
}

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
]

function parseDatePart(
  value: string,
  defaultMonth: number | null = null
): ParsedDatePart | null {
  const match = value
    .trim()
    .match(/^(?:([a-z]+)\s+)?(\d{1,2})(?:,\s*(\d{4}))?$/i)
  if (!match) return null

  const month = match[1]
    ? MONTHS.indexOf(match[1].slice(0, 3).toLowerCase())
    : defaultMonth
  const day = Number(match[2])
  const year = match[3] ? Number(match[3]) : null

  if (month === null || month === -1 || day < 1 || day > 31) return null
  if (year !== null && !isValidCalendarDate(year, month + 1, day)) return null

  return { month, day, year }
}

function isValidCalendarDate(year: number, month: number, day: number): boolean {
  const date = new Date(Date.UTC(year, month - 1, day))
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

function toIsoDate(part: ParsedDatePart, year: number): string | null {
  if (!isValidCalendarDate(year, part.month + 1, part.day)) return null
  return `${year.toString().padStart(4, "0")}-${(part.month + 1)
    .toString()
    .padStart(2, "0")}-${part.day.toString().padStart(2, "0")}`
}

export function parseDevpostDateRange(value: string | null | undefined): ParsedDateRange {
  if (!value) return { startDate: null, endDate: null }

  const parts = value.split(/\s+-\s+/)
  if (parts.length !== 2) return { startDate: null, endDate: null }

  const start = parseDatePart(parts[0])
  if (!start) return { startDate: null, endDate: null }
  const end = parseDatePart(parts[1], start.month)
  if (!end) return { startDate: null, endDate: null }

  let startYear = start.year
  let endYear = end.year

  if (startYear === null && endYear !== null) {
    startYear =
      start.month * 100 + start.day > end.month * 100 + end.day
        ? endYear - 1
        : endYear
  } else if (endYear === null && startYear !== null) {
    endYear =
      end.month * 100 + end.day < start.month * 100 + start.day
        ? startYear + 1
        : startYear
  }

  if (startYear === null || endYear === null) {
    return { startDate: null, endDate: null }
  }

  const startDate = toIsoDate(start, startYear)
  const endDate = toIsoDate(end, endYear)
  if (!startDate || !endDate || startDate > endDate) {
    return { startDate: null, endDate: null }
  }
  return { startDate, endDate }
}

export function normalizeSourceDate(
  value: string | Date | null | undefined
): string | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value.toISOString()
  }
  if (typeof value !== "string" || !value.trim()) return null

  const dateValue = value.trim()
  const dateOnly = dateValue.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (dateOnly) {
    const [, year, month, day] = dateOnly
    return isValidCalendarDate(Number(year), Number(month), Number(day))
      ? dateValue
      : null
  }

  const isoDateTime = dateValue.match(
    /^(\d{4})-(\d{2})-(\d{2})T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})$/i
  )
  if (!isoDateTime) return null

  const [, year, month, day] = isoDateTime
  if (
    !isValidCalendarDate(Number(year), Number(month), Number(day)) ||
    !Number.isFinite(Date.parse(dateValue))
  ) {
    return null
  }

  return dateValue
}

function parsePrizeNumber(value: string): number | null {
  const normalized = value.replace(/,/g, "").trim()
  if (!/^\d+(?:\.\d+)?$/.test(normalized)) return null

  const amount = Number(normalized)
  return Number.isFinite(amount) ? amount : null
}

export function parseDevpostPrize(value: string | null | undefined): NormalizedPrize[] {
  if (!value?.trim()) return []

  const htmlPrize = value
    .trim()
    .match(/^\s*([^<\s]+)?\s*<span\b[^>]*>\s*([^<]+?)\s*<\/span>\s*$/i)
  const plainPrize = htmlPrize
    ? null
    : value.trim().match(/^\s*([^\d\s.,]+)?\s*([\d,]+(?:\.\d+)?)\s*$/)
  const currency = htmlPrize?.[1] ?? plainPrize?.[1] ?? null
  const amountValue = htmlPrize?.[2] ?? plainPrize?.[2]
  const amount = amountValue ? parsePrizeNumber(amountValue) : null

  if (amount === null) return []

  return [{
    basis: "official",
    amount,
    currency,
    currencyCode: null,
    label: "Prize pool",
    details: null,
  }]
}

function extractAdvertisedPrize(text: string | null | undefined): NormalizedPrize | null {
  if (!text) return null

  const plainText = text
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#8377;|&#x20b9;/gi, "₹")
    .replace(/&dollar;/gi, "$")
    .replace(/&pound;/gi, "£")
    .replace(/&euro;/gi, "€")
    .replace(/&amp;/gi, "&")
  const amountPattern =
    String.raw`(?:₹|[$€£]|USD|INR|EUR|GBP)\s*\d[\d,.]*(?:\s*(?:k|m|b|lakhs?|crores?))?\+?(?:\s*(?:USD|INR|EUR|GBP))?|\d[\d,.]*(?:\s*(?:k|m|b|lakhs?|crores?))?\+?\s*(?:USD|INR|EUR|GBP)`
  const prizePhrase =
    String.raw`\b(?:(?:total\s+)?prize(?:s|\s+(?:pool|money))?|rewards?)`
  const phraseFirst = new RegExp(
    String.raw`${prizePhrase}\s*(?:(?:of|worth|is|up\s+to|valued\s+at)\s*)?(?:[:—-]\s*)?(${amountPattern})`,
    "i"
  ).exec(plainText)
  const amountFirst = new RegExp(
    String.raw`(${amountPattern})\s+in\s+(?:the\s+)?(?:prizes?|prize\s+pool|rewards?)`,
    "i"
  ).exec(plainText)
  const advertisedText = phraseFirst?.[1] ?? amountFirst?.[1]
  if (!advertisedText) return null

  return {
    basis: "advertised",
    amount: null,
    currency: null,
    currencyCode: null,
    label: null,
    details: null,
    advertisedText: advertisedText.replace(/\s+/g, " ").trim(),
  }
}

export function parseAdvertisedPrize(
  ...sources: (string | null | undefined)[]
): NormalizedPrize | null {
  for (const source of sources) {
    const prize = extractAdvertisedPrize(source)
    if (prize) return prize
  }
  return null
}

function advertisedPrizeFromRecord(prize: Prize): NormalizedPrize | null {
  if (prize.cash !== null || !prize.others?.trim()) return null

  const amount = prize.others.trim().match(/^(\d[\d,.]*(?:\s*(?:k|m|b|l|cr|lakhs?|crores?))?\+?)$/i)
  if (!amount) return null

  const currency = prize.currencyCode || prize.currency
  const currencyDisplay =
    currency === "fa-rupee"
      ? "₹"
      : currency && /^[A-Z]{3}$/.test(currency)
        ? `${currency} `
        : currency ?? ""
  if (!currencyDisplay) return null

  return {
    basis: "advertised",
    amount: null,
    currency,
    currencyCode: prize.currencyCode || null,
    label: prize.rank || null,
    details: null,
    advertisedText: `${currencyDisplay}${amount[1]}`,
  }
}

export function normalizeUnstopPrizes(
  prizes: Prize[] | null | undefined,
  ...advertisementSources: (string | null | undefined)[]
): NormalizedPrize[] {
  const sourcePrizes = prizes ?? []
  const normalized: NormalizedPrize[] = sourcePrizes.map((prize) => ({
    basis: "official" as const,
    amount:
      typeof prize.cash === "number" && Number.isFinite(prize.cash)
        ? prize.cash
        : null,
    currency: prize.currency || null,
    currencyCode: prize.currencyCode || null,
    label: prize.rank || null,
    details: prize.others || null,
  }))
  if (!normalized.some((prize) => prize.amount !== null)) {
    const recordIndex = sourcePrizes.findIndex((prize) =>
      advertisedPrizeFromRecord(prize)
    )
    const recordAdvertisement =
      recordIndex === -1
        ? null
        : advertisedPrizeFromRecord(sourcePrizes[recordIndex])
    const advertised =
      recordAdvertisement ?? parseAdvertisedPrize(...advertisementSources)
    if (advertised) {
      if (recordIndex !== -1) normalized.splice(recordIndex, 1)
      normalized.push(advertised)
    }
  }
  return normalized
}

export function normalizeUnstopLocation(
  address: AddressWithCountryLogo | null | undefined,
  region: string | null | undefined
): string {
  const components = [
    address?.address,
    address?.city,
    address?.state,
    address?.country?.name,
  ]
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value))

  if (components.length > 0) return [...new Set(components)].join(", ")
  if (region?.toLowerCase() === "online") return "Online"
  return "Location not specified"
}

export function normalizeDevpostLocation(value: string | null | undefined): string {
  const location = value?.trim()
  if (!location || /\b(?:grand\s+)?finals?\s+\d{4}\b/i.test(location)) {
    return "Location not specified"
  }

  return location
}

export function formatPrizeAmount(amount: number): string {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 20,
  }).format(amount)
}

export function formatHackathonDate(value: string): string {
  const datePart = value.slice(0, 10)
  const match = datePart.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return value

  const [, year, month, day] = match
  const date = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day))
  )
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date)
}
