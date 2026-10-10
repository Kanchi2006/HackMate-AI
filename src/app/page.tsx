import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CalendarDays,
  Code2,
  Compass,
  Search,
  Sparkles,
} from "lucide-react"
import { SerpApiSearch } from "@/components/serpapi-search"
import { SiteHeader } from "@/components/site-header"

const features = [
  {
    icon: Compass,
    title: "Discover Opportunities",
    description:
      "Explore open hackathons from Devpost and Unstop, with the event details each platform provides.",
  },
  {
    icon: Code2,
    title: "Explore Technologies",
    description:
      "Use available event tags and the discovery search to explore opportunities across topics and technologies.",
  },
  {
    icon: CalendarDays,
    title: "See Key Dates",
    description:
      "Review the dates and registration or submission deadlines supplied by event platforms.",
  },
  {
    icon: Sparkles,
    title: "Search Beyond Feeds",
    description:
      "Search the web for more opportunities with SerpApi. Search results link to their original sources and are not pre-verified events.",
  },
]

const steps = [
  {
    number: "01",
    title: "Search",
    description: "Enter your interests, technologies, or preferred location.",
    icon: Search,
  },
  {
    number: "02",
    title: "Discover",
    description: "Review opportunities from supported platforms and web search.",
    icon: Compass,
  },
  {
    number: "03",
    title: "Participate",
    description: "Open the official event page to check details and register.",
    icon: ArrowRight,
  },
]



export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-24">
            <div className="relative z-10">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3.5 py-2 text-xs font-semibold text-blue-800 shadow-sm">
                <Sparkles aria-hidden="true" className="h-4 w-4 text-blue-600" />
                Your AI-Powered Hackathon Finder
              </div>
              <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.05] tracking-tight text-blue-950 sm:text-6xl">
                Discover.
                <br />
                Build.
                <br />
                <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
                  Compete.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Discover hackathons, connect with innovators, develop new
                skills, and turn your ideas into impact.
              </p>

              <div className="mt-8 max-w-2xl">
                <SerpApiSearch />
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/explore"
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-blue-700 px-5 text-sm font-semibold text-white shadow-md shadow-blue-700/20 transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  Explore Hackathons
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-blue-200 bg-white px-5 text-sm font-semibold text-blue-800 transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  Get Started
                </Link>
              </div>
              <p className="mt-6 text-xs text-slate-500">
                Explore existing Devpost and Unstop listings, or try a separate
                SerpApi web search.
              </p>
            </div>

            <div
              aria-label="Illustration of hackathon discovery"
              role="img"
              className="relative mx-auto flex h-[340px] w-full max-w-xl items-center justify-center sm:h-[420px]"
            >
              <div className="absolute inset-8 rounded-full bg-blue-100/80 blur-3xl" />
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200 bg-gradient-to-br from-blue-100 to-white sm:h-80 sm:w-80" />
              <div className="absolute left-[9%] top-[20%] grid h-14 w-14 place-items-center rounded-2xl border border-blue-100 bg-white text-blue-700 shadow-lg shadow-blue-900/5 sm:left-[14%]">
                <Code2 aria-hidden="true" className="h-7 w-7" />
              </div>
              <div className="absolute right-[9%] top-[18%] grid h-12 w-12 place-items-center rounded-2xl border border-blue-100 bg-white text-cyan-600 shadow-lg shadow-blue-900/5 sm:right-[13%]">
                <Sparkles aria-hidden="true" className="h-6 w-6" />
              </div>
              <div className="absolute bottom-[18%] left-[5%] rounded-2xl border border-blue-100 bg-white p-3 shadow-xl shadow-blue-900/5 sm:left-[7%]">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-blue-700">
                    <Compass aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold text-slate-800">
                      Discover
                    </span>
                    <span className="block text-[10px] text-slate-500">
                      Opportunities
                    </span>
                  </span>
                </div>
              </div>
              <div className="absolute right-[4%] bottom-[17%] rounded-2xl border border-blue-100 bg-white p-3 shadow-xl shadow-blue-900/5 sm:right-[8%]">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-50 text-cyan-700">
                    <CalendarDays aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold text-slate-800">
                      Compare
                    </span>
                    <span className="block text-[10px] text-slate-500">
                      Event details
                    </span>
                  </span>
                </div>
              </div>
              <div className="relative z-10 grid h-48 w-60 place-items-center rounded-[2rem] border border-blue-200 bg-gradient-to-br from-white to-blue-50 shadow-2xl shadow-blue-900/10 sm:h-56 sm:w-72">
                <div className="grid h-28 w-40 place-items-center rounded-2xl border border-blue-200 bg-white shadow-md sm:h-32 sm:w-48">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25">
                    <Code2 aria-hidden="true" className="h-9 w-9" />
                  </div>
                </div>
                <div className="absolute inset-x-8 bottom-4 h-2 rounded-full bg-gradient-to-r from-blue-300 to-cyan-300" />
              </div>
              <div className="absolute right-[20%] top-[35%] h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <div className="absolute bottom-[34%] right-[21%] h-3 w-3 rounded-full bg-blue-500" />
            </div>
          </div>
        </section>

        <section className="border-y border-blue-50 bg-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-3 px-5 py-7 text-center sm:px-8">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Discover across
            </span>
            <span className="text-sm font-bold text-slate-700">Devpost</span>
            <span className="text-sm font-bold text-slate-700">Unstop</span>
            <span className="text-sm font-bold text-blue-700">SerpApi web search</span>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 bg-white px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
                Explore with confidence
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Find the right challenge for you
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                One place to browse opportunities, compare the details
                available, and follow the source to take part.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-blue-100 bg-gradient-to-b from-white to-blue-50/60 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/5"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-100 text-blue-700">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-base font-bold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-blue-50/70 px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                From idea to opportunity
              </h2>
            </div>
            <ol className="mt-12 grid gap-7 md:grid-cols-3">
              {steps.map(({ number, title, description, icon: Icon }) => (
                <li
                  key={number}
                  className="relative rounded-2xl border border-blue-100 bg-white p-7 text-center shadow-sm"
                >
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blue-700 text-white shadow-lg shadow-blue-700/20">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <span className="mt-5 block text-xs font-bold tracking-[0.16em] text-blue-700">
                    STEP {number}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 rounded-3xl bg-gradient-to-r from-blue-700 to-blue-600 px-7 py-10 text-white shadow-xl shadow-blue-900/15 sm:px-10 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Ready to find your next hackathon?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100">
                Explore opportunities from supported platforms or search the
                web for a challenge that fits your interests.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/explore"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-blue-800 transition hover:bg-blue-50"
              >
                Explore Hackathons
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="/signup"
                className="inline-flex min-h-11 items-center rounded-xl border border-white/40 px-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-blue-100 bg-white px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image
              src="/hackmate-ai-logo.png"
              alt=""
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-sm font-bold text-slate-900">
              HackMate <span className="text-blue-700">AI</span>
            </span>
          </Link>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
            <Link className="hover:text-blue-700" href="/">
              Home
            </Link>
            <Link className="hover:text-blue-700" href="/explore">
              Explore Hackathons
            </Link>
            <Link className="hover:text-blue-700" href="/login">
              Login
            </Link>
            <Link className="hover:text-blue-700" href="/signup">
              Sign Up
            </Link>
          </nav>
          <p className="text-xs text-slate-500">
            Discover. Build. Compete.
          </p>
        </div>
      </footer>
    </>
  )
}
