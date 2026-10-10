export interface NormalizedHackathon {
  title: string
  url: string
  imageUrl: string
  eventDates?: {
    start: string | null
    end: string | null
  }
  submissionPeriod?: {
    start: string | null
    end: string | null
  } | null
  deadline?: {
    kind: "registration" | "submission"
    date: string | null
  } | null
  organizer: string
  prizes: NormalizedPrize[]
  tags: string[]
  source: "devpost" | "unstop"
  registrationCount: number
  timeLeft?: string
  location: string
}

export interface NormalizedPrize {
  basis: "official" | "advertised"
  amount: number | null
  currency: string | null
  currencyCode?: string | null
  label: string | null
  details: string | null
  advertisedText?: string
}
