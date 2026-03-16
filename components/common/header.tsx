import React from "react";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import NavLink from "./nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import PlanBadge from "./plan-badge";

const Header = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full bg-white/75 backdrop-blur-2xl border-b border-white/20 shadow-[0_1px_theme(colors.slate.100)_inset] transition-all duration-300">
      <nav className="max-w-6xl flex items-center justify-between h-[60px] mx-auto px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center lg:flex-1">
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group transition-all duration-200 hover:opacity-80"
          >
            <div className="flex items-center justify-center text-slate-900 transition-transform duration-300 group-hover:scale-105">
              <BookOpen className="w-5 h-5 text-rose-500" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-slate-800 text-[17px] tracking-tight">
              Quicker
            </span>
          </Link>
        </div>

        {/* Center Nav */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-8">
          <NavLink
            href="/#pricing"
            className="text-[14px] font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200"
          >
            Pricing
          </NavLink>
          <SignedIn>
            <NavLink
              href="/dashboard"
              className="text-[14px] font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200"
            >
              Dashboard
            </NavLink>
          </SignedIn>
        </div>

        {/* Right CTA */}
        <div className="flex items-center justify-end gap-4 lg:flex-1">
          <SignedIn>
            <Link
              href="/upload"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-[14px] font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-all shadow-sm active:scale-95"
            >
              Upload PDF
            </Link>
            <PlanBadge />
            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8 rounded-full border border-slate-200 shadow-sm" } }} />
          </SignedIn>
          <SignedOut>
            <NavLink
              href="/sign-in"
              className="px-3 py-2 text-[14px] font-medium text-slate-600 hover:text-slate-900 transition-colors duration-150"
            >
              Log in
            </NavLink>
            <Link
              href="/sign-up"
              className="px-4 py-2 mt-0.5 text-[14px] font-medium text-white bg-slate-900 hover:bg-slate-800 hover:shadow-lg rounded-full transition-all duration-200 shadow-sm"
            >
              Get started
            </Link>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
