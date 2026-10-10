import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NormalizedHackathon } from "@/types/hackathon"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  formatHackathonDate,
  formatPrizeAmount,
} from "@/lib/hackathon-normalization"

function formatPrizeValue(
  amount: number,
  currency: string | null,
  currencyCode: string | null | undefined
): string {
  const code = currencyCode ?? (/^[A-Z]{3}$/.test(currency ?? "") ? currency : null)
  const symbols: Record<string, string> = {
    EUR: "€",
    GBP: "£",
    INR: "₹",
    USD: "$",
  }
  const symbol =
    currency === "fa-rupee"
      ? "₹"
      : currency && !/^[A-Z]{3}$/.test(currency)
        ? currency
        : code
          ? symbols[code] ?? ""
          : ""
  const formattedAmount = formatPrizeAmount(amount)
  if (symbol) return `${symbol}${formattedAmount}${code ? ` ${code}` : ""}`
  return code
    ? `${code} ${formattedAmount}`
    : currency
      ? `${currency} ${formattedAmount}`
      : formattedAmount
}

export function HackathonCard({
  hackathon,
}: {
  hackathon: NormalizedHackathon
}) {
  const prizes = hackathon.prizes ?? []
  const eventDates = hackathon.eventDates
  const submissionPeriod = hackathon.submissionPeriod
  const deadline = hackathon.deadline
  const deadlineKind =
    deadline?.kind ?? (hackathon.source === "devpost" ? "submission" : "registration")

  return (
    <Link href={hackathon.url} target="_blank" rel="noopener noreferrer">
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="relative w-full h-48 mb-4">
            <Image
              src={hackathon.imageUrl}
              alt={hackathon.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain rounded-t-lg w-full h-full"
              placeholder="blur"
              blurDataURL={hackathon.imageUrl}
            />
            <div className="absolute top-0 right-0">
              <Badge variant="secondary">{hackathon.source}</Badge>
            </div>
          </div>
          <CardTitle className="mt-4">{hackathon.title}</CardTitle>
          <CardDescription>{hackathon.organizer}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p className="text-sm">
              {prizes.length === 0
                ? <>
                    <span className="font-semibold">Prize:</span>{" "}
                    Prize not specified
                  </>
                : prizes.map((prize, index) => (
                    <span key={`${prize.label ?? "prize"}-${index}`}>
                      {index > 0 ? " · " : ""}
                      <span className="font-semibold">
                        {prize.basis === "advertised"
                          ? "Advertised prize:"
                          : `${prize.label ?? "Prize"}:`}
                      </span>{" "}
                      {prize.basis === "advertised"
                        ? `${prize.label ? `${prize.label}: ` : ""}${prize.advertisedText}`
                        : `${prize.amount === null
                            ? "Prize not specified"
                            : `${formatPrizeValue(prize.amount, prize.currency, prize.currencyCode)}${prize.currency || prize.currencyCode ? "" : " (currency not specified)"}`
                          }${prize.details ? ` (${prize.details})` : ""}`}
                    </span>
                  ))}
            </p>
            {submissionPeriod?.start && submissionPeriod.end && (
              <p className="text-sm">
                <span className="font-semibold">Submission period:</span>{" "}
                {formatHackathonDate(submissionPeriod.start)} -{" "}
                {formatHackathonDate(submissionPeriod.end)}
              </p>
            )}
            {(eventDates?.start || eventDates?.end) && (
              <p className="text-sm">
                <span className="font-semibold">Event dates:</span>{" "}
                {eventDates.start && eventDates.end
                  ? `${formatHackathonDate(eventDates.start)} - ${formatHackathonDate(eventDates.end)}`
                  : eventDates.start
                    ? `Starts ${formatHackathonDate(eventDates.start)}`
                    : eventDates.end
                      ? `Ends ${formatHackathonDate(eventDates.end)}`
                      : "Not specified"}
              </p>
            )}
            <p className="text-sm">
              <span className="font-semibold">
                {deadlineKind === "submission"
                  ? "Submission deadline:"
                  : "Registration deadline:"}
              </span>{" "}
              {deadline?.date
                ? `${formatHackathonDate(deadline.date)}${hackathon.timeLeft ? ` (${hackathon.timeLeft})` : ""}`
                : "Deadline not specified"}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Registrations:</span>{" "}
              {hackathon.registrationCount}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Location:</span>{" "}
              {hackathon.location}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <div className="flex flex-wrap gap-2">
            {hackathon.tags.map((tag) => (
              <span
                key={tag}
                className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
