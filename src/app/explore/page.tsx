import { HackathonList } from "@/components/hackathon-list"
import { SiteHeader } from "@/components/site-header"
import { fetchAllHackathons } from "@/services/hackathons"

export default async function ExplorePage() {
  const hackathons = await fetchAllHackathons()

  return (
    <>
      <SiteHeader />
      <main className="mx-auto min-h-[calc(100vh-72px)] max-w-7xl px-4 py-10 sm:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Explore opportunities
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Hackathons from Devpost and Unstop
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Filter and compare listings using the details provided by each
            platform. Open an event to confirm its current requirements.
          </p>
        </div>
        <HackathonList hackathons={hackathons} />
      </main>
    </>
  )
}
