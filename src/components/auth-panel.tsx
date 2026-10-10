"use client"

import Image from "next/image"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { AlertCircle, ArrowRight, Code2, Github, Sparkles } from "lucide-react"

type AuthPanelProps = {
  mode: "login" | "signup"
  initialError: string
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.1-6.68-4.93H1.21v3.15C3.25 21.39 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.32 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.21C.44 8.11 0 9.99 0 12s.44 3.89 1.21 5.42l4.11-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.61 1.21 6.58l4.11 3.15c.94-2.83 3.57-4.98 6.68-4.98z"
      />
    </svg>
  )
}

export function AuthPanel({ mode, initialError }: AuthPanelProps) {
  const [loadingProvider, setLoadingProvider] = useState<
    "google" | "github" | null
  >(null)
  const [error, setError] = useState(initialError)
  const isSignup = mode === "signup"

  async function continueWith(provider: "google" | "github") {
    setError("")
    setLoadingProvider(provider)

    try {
      await signIn(provider, { redirectTo: "/explore" })
    } catch {
      setError("We couldn't start sign-in. Please try again.")
      setLoadingProvider(null)
    }
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 lg:grid lg:grid-cols-2">
      <section className="relative hidden min-h-screen overflow-hidden bg-gradient-to-br from-blue-700 via-blue-700 to-blue-900 px-10 py-9 text-white lg:flex lg:flex-col lg:justify-between xl:px-16">
        <div
          aria-hidden="true"
          className="absolute -right-28 top-24 h-80 w-80 rounded-full border-[48px] border-blue-500/30"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-48 -left-28 h-96 w-96 rounded-full border-[56px] border-cyan-300/10"
        />

        <Link href="/" className="relative z-10 inline-flex w-fit items-center gap-3">
          <Image
            src="/hackmate-ai-logo.png"
            alt=""
            width={40}
            height={40}
            priority
            className="rounded-xl bg-white p-1"
          />
          <span className="text-xl font-bold tracking-tight">
            HackMate <span className="text-blue-200">AI</span>
          </span>
        </Link>

        <div className="relative z-10 mx-auto w-full max-w-xl py-14">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-blue-50">
            <Sparkles aria-hidden="true" className="h-4 w-4" />
            Your AI-powered hackathon finder
          </div>
          <h1 className="max-w-lg text-5xl font-extrabold leading-[1.08] tracking-tight xl:text-6xl">
            {isSignup ? (
              <>
                Build your
                <br />
                next big idea.
              </>
            ) : (
              <>
                Discover.
                <br />
                Build.
                <br />
                Compete.
              </>
            )}
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-blue-100">
            {isSignup
              ? "Join builders discovering opportunities, learning new skills, and turning ideas into impact."
              : "Discover hackathons, connect with innovators, develop new skills, and turn your ideas into impact."}
          </p>

          <div
            aria-hidden="true"
            className="relative mx-auto mt-12 flex h-64 max-w-lg items-end justify-center"
          >
            <div className="absolute left-[9%] top-7 grid h-14 w-14 place-items-center rounded-2xl border border-white/25 bg-blue-500/70 shadow-xl shadow-blue-950/20">
              <Code2 className="h-7 w-7 text-white" />
            </div>
            <div className="absolute right-[12%] top-2 grid h-12 w-12 place-items-center rounded-2xl border border-white/25 bg-cyan-400/70 shadow-xl">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="absolute right-[4%] top-24 h-10 w-24 rounded-xl border border-white/25 bg-white/15 p-2">
              <div className="h-1.5 w-12 rounded-full bg-white/70" />
              <div className="mt-2 h-1.5 w-16 rounded-full bg-cyan-200/70" />
            </div>
            <div className="absolute left-[3%] top-28 h-10 w-20 rounded-xl border border-white/25 bg-white/15 p-2">
              <div className="h-1.5 w-12 rounded-full bg-white/70" />
              <div className="mt-2 h-1.5 w-10 rounded-full bg-blue-200/80" />
            </div>
            <div className="absolute bottom-3 h-36 w-64 rounded-t-[2rem] border border-white/25 bg-gradient-to-b from-blue-300/80 to-blue-500/80 shadow-2xl shadow-blue-950/30">
              <div className="absolute inset-x-8 top-7 grid h-16 place-items-center rounded-xl border border-white/30 bg-blue-800/25">
                <Code2 className="h-9 w-9 text-white" />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-9 rounded-t-xl bg-blue-950/40" />
            </div>
            <div className="absolute bottom-0 h-3 w-80 rounded-full bg-cyan-200/80 shadow-lg shadow-cyan-300/30" />
          </div>
        </div>

        <p className="relative z-10 border-t border-white/20 pt-5 text-xs text-blue-100">
          HackMate AI <span className="px-1.5 text-blue-300">•</span> Discover.
          Build. Compete.
        </p>
      </section>

      <section className="flex min-h-screen flex-col px-6 py-6 sm:px-12 lg:justify-center lg:px-14 xl:px-24">
        <div className="mb-12 flex items-center justify-between lg:hidden">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image
              src="/hackmate-ai-logo.png"
              alt=""
              width={36}
              height={36}
              priority
              className="rounded-lg"
            />
            <span className="text-lg font-bold">
              HackMate <span className="text-blue-600">AI</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-blue-700"
          >
            Home
          </Link>
        </div>

        <div className="mx-auto w-full max-w-md">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            {isSignup ? "Your builder journey starts here" : "Welcome to HackMate AI"}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {isSignup ? "Build Your Next Big Idea." : "Welcome Back!"}
          </h2>
          <p className="mt-3 text-base leading-6 text-slate-600">
            {isSignup
              ? "Create an account with a provider to start discovering opportunities."
              : "Sign in to your HackMate AI account."}
          </p>

          {error && (
            <div
              role="alert"
              className="mt-7 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"
            >
              <AlertCircle
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0"
              />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-9 space-y-3">
            <button
              type="button"
              onClick={() => void continueWith("google")}
              disabled={loadingProvider !== null}
              className="flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-300 hover:bg-blue-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
            >
              {loadingProvider === "google" ? (
                <span
                  aria-hidden="true"
                  className="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-700"
                />
              ) : (
                <GoogleIcon />
              )}
              {loadingProvider === "google"
                ? "Connecting to Google…"
                : "Continue with Google"}
            </button>
            <button
              type="button"
              onClick={() => void continueWith("github")}
              disabled={loadingProvider !== null}
              className="flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-300 hover:bg-blue-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
            >
              {loadingProvider === "github" ? (
                <span
                  aria-hidden="true"
                  className="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-700"
                />
              ) : (
                <Github aria-hidden="true" className="h-5 w-5" />
              )}
              {loadingProvider === "github"
                ? "Connecting to GitHub…"
                : "Continue with GitHub"}
            </button>
          </div>

          <div className="my-8 flex items-center gap-4 text-xs font-medium text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            OR
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="text-center text-sm text-slate-600">
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <Link
              href={isSignup ? "/login" : "/signup"}
              className="font-semibold text-blue-700 underline-offset-4 hover:underline"
            >
              {isSignup ? "Log in" : "Sign Up"}
            </Link>
          </p>
          <p className="mt-10 text-center text-xs leading-5 text-slate-500">
            Continuing uses your Google or GitHub account. First-time provider
            sign-ins create a session automatically; no password or separate
            registration database is used.
          </p>
        </div>

        <Link
          href="/"
          className="mx-auto mt-auto inline-flex items-center gap-2 pt-12 text-sm font-medium text-slate-500 hover:text-blue-700 lg:mt-12"
        >
          <ArrowRight aria-hidden="true" className="h-4 w-4 rotate-180" />
          Back to HackMate AI
        </Link>
      </section>
    </main>
  )
}
