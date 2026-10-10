import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const apiKey = process.env.SERPAPI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { message: "Web search is not configured yet." },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: "Invalid JSON request." }, { status: 400 })
  }

  const query: unknown =
    typeof body === "object" && body !== null && "query" in body
      ? Reflect.get(body, "query")
      : undefined
  if (typeof query !== "string" || !query.trim() || query.trim().length > 200) {
    return NextResponse.json(
      { message: "Enter a search query between 1 and 200 characters." },
      { status: 400 }
    )
  }
  const cleanQuery = /\bhackathons?\b/i.test(query.trim())
    ? query.trim()
    : `${query.trim()} hackathons`

  const params = new URLSearchParams({
    engine: "google",
    q: cleanQuery,
    api_key: apiKey,
    num: "5",
  })

  let response: Response
  try {
    response = await fetch(`https://serpapi.com/search.json?${params}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    })
  } catch {
    return NextResponse.json(
      { message: "The web search provider could not be reached. Please try again." },
      { status: 502 }
    )
  }

  if (response.status === 429) {
    return NextResponse.json(
      { message: "The search provider is rate-limiting requests. Try again shortly." },
      { status: 429 }
    )
  }
  if (!response.ok) {
    return NextResponse.json(
      { message: "The search provider could not complete this request." },
      { status: 502 }
    )
  }

  let payload: unknown
  try {
    payload = await response.json()
  } catch {
    return NextResponse.json(
      { message: "The search provider returned an invalid response." },
      { status: 502 }
    )
  }

  if (
    typeof payload !== "object" ||
    payload === null ||
    Reflect.get(payload, "error") ||
    !Array.isArray(Reflect.get(payload, "organic_results"))
  ) {
    return NextResponse.json(
      { message: "The search provider could not complete this request." },
      { status: 502 }
    )
  }

  const organicResults: unknown[] = Reflect.get(payload, "organic_results")
  const results = organicResults.flatMap((candidate) => {
    if (typeof candidate !== "object" || candidate === null) return []
    const title = Reflect.get(candidate, "title")
    const rawLink = Reflect.get(candidate, "link")
    const snippet = Reflect.get(candidate, "snippet")
    if (typeof title !== "string" || typeof rawLink !== "string") {
      return []
    }

    try {
      const link = new URL(rawLink)
      if (link.protocol !== "https:" && link.protocol !== "http:") return []
      return [
        {
          title: title.slice(0, 500),
          link: link.toString(),
          ...(typeof snippet === "string"
            ? { snippet: snippet.slice(0, 2000) }
            : {}),
        },
      ]
    } catch {
      return []
    }
  }).slice(0, 5)

  return NextResponse.json({ results })
}
