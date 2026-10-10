"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { useEffect } from "react"
import PostHogPageView from "@/components/posthog-page-view"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
 useEffect(() => {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  // Skip analytics initialization when no key is configured.
  if (!posthogKey) return;

  posthog.init(posthogKey, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    // Keep any other existing options here.
  });
}, []);
  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  )
}
