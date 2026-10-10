"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { AlertCircle, ArrowRight, ExternalLink, Search } from "lucide-react"

type SearchResult = {
  title: string
  link: string
  snippet?: string
}

const popularSearches = ["AI", "Web3", "College", "India", "Open Now"]

function resultDomain(link: string) {
  try {
    return new URL(link).hostname.replace(/^www\./, "")
  } catch {
    return ""
  }
}

export function SerpApiSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const cleanQuery = query.trim()
    if (!cleanQuery) {
      setError("Enter a topic, technology, or location to search.")
      return
    }

    setLoading(true)
    setError("")
    setHasSearched(true)

    try {
      const response = await fetch("/api/serpapi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: cleanQuery }),
      })
      const payload = (await response.json()) as {
        message?: string
        results?: SearchResult[]
      }

      if (!response.ok) {
        throw new Error(payload.message ?? "Search failed. Please try again.")
      }

      setResults(payload.results ?? [])
    } catch (searchError) {
      setResults([])
      setError(
        searchError instanceof Error
          ? searchError.message
          : "Search failed. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <form
        className="flex flex-col gap-2 rounded-2xl border border-blue-100 bg-white p-2 shadow-lg shadow-blue-900/5 sm:flex-row"
        onSubmit={search}
      >
        <label className="flex min-h-12 flex-1 items-center gap-3 px-3">
          <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-blue-600" />
          <span className="sr-only">Search hackathon topics</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search AI, Web3, India, and more…"
            maxLength={200}
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? "Searching…" : "Search"}
          {!loading && <ArrowRight aria-hidden="true" className="h-4 w-4" />}
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-medium text-slate-500">
          Popular searches:
        </span>
        {popularSearches.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => {
              setQuery(`${term} hackathons`)
              setError("")
            }}
            className="rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-medium text-blue-800 transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            {term}
          </button>
        ))}
      </div>

      {(error || loading || (hasSearched && results.length === 0)) && (
        <div
          className="mt-5 rounded-2xl border border-blue-100 bg-white p-4 text-sm"
          role={error ? "alert" : "status"}
          aria-live="polite"
        >
          {error ? (
            <span className="flex items-start gap-2 text-rose-700">
              <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </span>
          ) : loading ? (
            <span className="text-slate-600">Searching the web for opportunities…</span>
          ) : (
            <span className="text-slate-600">
              No web results found for that query. Try a broader search.
            </span>
          )}
        </div>
      )}

      {results.length > 0 && (
        <section
          aria-label="Web search results"
          aria-live="polite"
          className="mt-6 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Web search results
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Search results are not verified event listings. Check the
                original source for details.
              </p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
              SerpApi
            </span>
          </div>
          <ul className="divide-y divide-slate-100">
            {results.map((result, index) => (
              <li key={`${result.link}-${index}`} className="py-4 first:pt-0 last:pb-0">
                <a
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-2 font-semibold text-blue-800 hover:text-blue-950"
                >
                  <span>{result.title}</span>
                  <ExternalLink
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 opacity-60 group-hover:opacity-100"
                  />
                </a>
                {resultDomain(result.link) && (
                  <p className="mt-1 text-xs text-emerald-700">
                    {resultDomain(result.link)}
                  </p>
                )}
                {result.snippet && (
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">
                    {result.snippet}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
