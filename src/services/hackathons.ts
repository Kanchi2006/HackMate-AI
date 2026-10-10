import { formatImageUrl } from "@/lib/utils"
import {
  normalizeSourceDate,
  normalizeDevpostLocation,
  normalizeUnstopLocation,
  normalizeUnstopPrizes,
  parseAdvertisedPrize,
  parseDevpostDateRange,
  parseDevpostPrize,
} from "@/lib/hackathon-normalization"
import { DevpostHackathon } from "@/types/devpost"
import { NormalizedHackathon } from "@/types/hackathon"
import { UnstopHackathon } from "@/types/unstop"

type DevpostHackathonDetails = Exclude<
  DevpostHackathon["hackathons"],
  undefined
>[0]

export async function fetchDevpostHackathons(
  page: number
): Promise<NormalizedHackathon[]> {
  try {
    const response = await fetch(
      `https://devpost.com/api/hackathons?page=${page ?? 1}`,
      {
        cache: "force-cache",
        next: {
          revalidate: 60 * 60 * 24,
          tags: ["devpost-hackathons"],
        },
      }
    )
    const data = await response.json()

    const normalizedData = data.hackathons.map(
      (hackathon: DevpostHackathonDetails) => {
        const submissionPeriod = parseDevpostDateRange(
          hackathon.submission_period_dates
        )
        const structuredPrizes = parseDevpostPrize(hackathon.prize_amount)
        const advertisedPrize = parseAdvertisedPrize(hackathon.title)
        const structuredPrizeAmount = structuredPrizes[0]?.amount
        const hasConflictingZeroAndAdvertisedPrize =
          structuredPrizeAmount === 0 && advertisedPrize !== null

        return {
          title: hackathon.title,
          url: hackathon.url,
          organizer: hackathon.organization_name,
          imageUrl: formatImageUrl(hackathon.thumbnail_url),
          eventDates: { start: null, end: null },
          submissionPeriod,
          deadline: {
            kind: "submission" as const,
            date: submissionPeriod.endDate,
          },
          prizes:
            hasConflictingZeroAndAdvertisedPrize
              ? [advertisedPrize]
              : structuredPrizes.length > 0
                ? structuredPrizes
                : advertisedPrize
                  ? [advertisedPrize]
                  : [],
          timeLeft: hackathon.time_left_to_submission,
          tags: hackathon.themes.map((theme) => theme.name),
          registrationCount: hackathon.registrations_count,
          location: normalizeDevpostLocation(
            hackathon.displayed_location?.location
          ),
          source: "devpost" as const,
        }
      }
    )

    return normalizedData
  } catch (error) {
    console.error("Error fetching Devpost hackathons:", error)
    return []
  }
}

type UnstopHackathonDetails = UnstopHackathon["data"]["data"][0]

export async function fetchUnstopHackathons(
  page: number = 1
): Promise<NormalizedHackathon[]> {
  try {
    const response = await fetch(
      `https://unstop.com/api/public/opportunity/search-result?opportunity=hackathons&page=${
        page ?? 1
      }&per_page=15&oppstatus=open&quickApply=true`,
      {
        cache: "force-cache",
        next: {
          revalidate: 60 * 60 * 24,
          tags: ["unstop-hackathons"],
        },
      }
    )
    const data = await response.json()

    const normalizedData = data.data.data.map(
      (hackathon: UnstopHackathonDetails) => ({
        title: hackathon.title,
        url: `https://unstop.com/${hackathon.public_url}`,
        organizer: hackathon.organisation.name,
        imageUrl: hackathon.banner_mobile?.image_url ?? hackathon.logoUrl2,
        eventDates: {
          start: normalizeSourceDate(hackathon.start_date),
          end: normalizeSourceDate(hackathon.end_date),
        },
        submissionPeriod: null,
        deadline: {
          kind: "registration" as const,
          date: normalizeSourceDate(
            hackathon.regnRequirements?.end_regn_dt
          ),
        },
        prizes: normalizeUnstopPrizes(
          hackathon.prizes,
          hackathon.title,
          hackathon.details
        ),
        location: normalizeUnstopLocation(
          hackathon.address_with_country_logo,
          hackathon.region
        ),
        tags: (hackathon.filters ?? []).map((filter: { name: string }) => filter.name),
        source: "unstop" as const,
        registrationCount: hackathon.registerCount,
        timeLeft: hackathon.regnRequirements?.remain_days,
      })
    )

    return normalizedData
  } catch (error) {
    console.error("Error fetching Unstop hackathons:", error)
    return []
  }
}

export async function fetchAllHackathons(): Promise<NormalizedHackathon[]> {
  const pageCount = 6
  const [devpostHackathons, unstopHackathons] = await Promise.all([
    Promise.all(
      Array.from({ length: pageCount }, (_, index) =>
        fetchDevpostHackathons(index + 1)
      )
    ).then((results) => results.flat()),
    Promise.all(
      Array.from({ length: pageCount }, (_, index) =>
        fetchUnstopHackathons(index + 1)
      )
    ).then((results) => results.flat()),
  ])

  return [...devpostHackathons, ...unstopHackathons]
}
