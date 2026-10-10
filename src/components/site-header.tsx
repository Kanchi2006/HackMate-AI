"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-blue-100/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5"
          onClick={closeMenu}
        >
          <Image
            src="/hackmate-ai-logo.png"
            alt=""
            width={36}
            height={36}
            priority
            className="rounded-lg"
          />
          <span className="text-lg font-bold tracking-tight text-slate-900">
            HackMate <span className="text-blue-600">AI</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          <Link className="text-sm font-medium text-blue-700" href="/">
            Home
          </Link>
          <Link
            className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
            href="/explore"
          >
            Explore Hackathons
          </Link>
          <Link
            className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
            href="/#features"
          >
            About
          </Link>
          <Link
            className="text-sm font-semibold text-slate-700 transition hover:text-blue-700"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            href="/signup"
          >
            Sign Up
          </Link>
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-700 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 md:hidden"
        >
          {menuOpen ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-blue-100 bg-white px-5 py-4 shadow-lg md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            <Link
              className="rounded-lg px-3 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
              href="/"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50"
              href="/explore"
              onClick={closeMenu}
            >
              Explore Hackathons
            </Link>
            <Link
              className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50"
              href="/#features"
              onClick={closeMenu}
            >
              About
            </Link>
            <div className="mt-2 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
              <Link
                className="rounded-lg border border-blue-200 px-4 py-3 text-center text-sm font-semibold text-blue-700 hover:bg-blue-50"
                href="/login"
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link
                className="rounded-lg bg-blue-700 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-800"
                href="/signup"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
