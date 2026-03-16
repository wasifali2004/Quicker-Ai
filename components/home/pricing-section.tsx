import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon, Zap } from "lucide-react";

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
  badge?: string;
};

export const plans: PriceType[] = [
  {
    id: "basic",
    name: "Starter",
    price: 9,
    description: "Perfect for personal use and occasional summarizing.",
    badge: "",
    items: [
      "5 PDF summaries per month",
      "Up to 20MB per file",
      "Standard processing speed",
      "Download summaries",
      "Email support",
    ],
    paymentLink: "",
    priceId: "",
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    description: "For professionals, researchers, and power users.",
    badge: "Most popular",
    items: [
      "Unlimited PDF summaries",
      "Up to 50MB per file",
      "Priority processing",
      "Markdown & PDF export",
      "Section navigation",
      "24/7 priority support",
    ],
    paymentLink: "",
    priceId: "",
  },
];

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
  badge,
}: PriceType) => {
  const isPro = id === "pro";

  return (
    <div
      className={cn(
        "relative flex flex-col w-full max-w-sm rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1",
        isPro
          ? "border-rose-200 bg-white shadow-xl shadow-rose-100/50"
          : "border-gray-100 bg-white shadow-sm hover:shadow-md"
      )}
    >
      {/* Pro badge */}
      {badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-rose-600 text-white text-xs font-semibold shadow-lg shadow-rose-200">
            <Zap className="w-3 h-3 fill-white" />
            {badge}
          </span>
        </div>
      )}

      {/* Plan name & description */}
      <div className="mb-6">
        <div
          className={cn(
            "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold mb-3",
            isPro ? "bg-rose-50 text-rose-700" : "bg-gray-50 text-gray-600"
          )}
        >
          {name}
        </div>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-4xl font-black text-gray-900">${price}</span>
        <span className="text-sm text-gray-400 font-medium">/month</span>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 w-full mb-6" />

      {/* Features */}
      <ul className="space-y-3 flex-1 mb-8">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
              <CheckIcon className="w-2.5 h-2.5 text-green-600" strokeWidth={3} />
            </div>
            <span className="text-sm text-gray-600">{item}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={paymentLink || "/#pricing"}
        className={cn(
          "flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 group",
          isPro
            ? "bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-200 hover:shadow-rose-300"
            : "border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
        )}
      >
        Get started
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
      </Link>
    </div>
  );
};

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-20 lg:py-28 bg-gray-50">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-semibold text-gray-500 uppercase tracking-widest mb-5 shadow-sm">
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-lg mx-auto">
            No hidden fees. No complicated tiers. Cancel anytime.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mt-6 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>

        {/* FAQ link */}
        <p className="text-center text-sm text-gray-400 mt-10">
          Have questions?{" "}
          <Link
            href="#"
            className="text-gray-600 underline underline-offset-2 hover:text-gray-900 transition-colors"
          >
            Read our FAQ
          </Link>
          {" "}or{" "}
          <Link
            href="#"
            className="text-gray-600 underline underline-offset-2 hover:text-gray-900 transition-colors"
          >
            contact support
          </Link>
          .
        </p>
      </div>
    </section>
  );
}