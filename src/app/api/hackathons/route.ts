import { NextResponse } from "next/server"
import { fetchAllHackathons } from "@/services/hackathons"

export async function GET() {
  try {
    return NextResponse.json({
      hackathons: await fetchAllHackathons(),
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch hackathons", error: error },
      { status: 500 }
    )
  }
}
