import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
};

export const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 9,
    description: "",
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email Support",
    ],
    paymentLink: "",
    priceId: "",
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF Summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
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
  index,
}: PriceType & { index: number }) => {
  return (
    <div className="relative w-full max-w-lg transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
      {/* Pro badge */}
      {id === "pro" && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
            Most Popular
          </div>
        </div>
      )}

      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 border-[1px] p-8 border-y-gray-500/20 rounded-2xl bg-white/5 backdrop-blur-sm transition-all duration-300 hover:shadow-xl",
          id === "pro" && "border-rose-500 gap-5 border-2 bg-gradient-to-b from-rose-50/10 to-transparent hover:shadow-rose-500/25"
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize transition-colors duration-300 hover:text-rose-500">
              {name}
            </p>
            {description && (
              <p className="text-gray-500/80 mt-2">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <p className="flex tracking-tight font-extrabold text-4xl transition-all duration-300 hover:scale-110 hover:text-rose-500">
            ${price}
          </p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">USD</p>
            <p className="text-xs">/month</p>
          </div>
        </div>

        <ul className="space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((item, idx) => (
            <li 
              key={idx} 
              className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1"
            >
              <div className="transform transition-transform duration-300 hover:scale-110">
                <CheckIcon size={18} className="text-green-500" />
              </div>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="transform transition-all duration-300 hover:scale-105">
          <Link
            href={paymentLink}
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-3 font-semibold transition-all duration-300 group",
              id === "pro"
                ? "border-rose-900 shadow-lg hover:shadow-xl"
                : "border-rose-100 from-rose-400 to-rose-500"
            )}
          >
            Buy Now
            <ArrowRight 
              size={18} 
              className="transition-transform duration-200 group-hover:translate-x-1" 
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex items-center justify-center w-full pb-10">
          <h2 className="uppercase font-bold text-3xl mb-8 text-rose-500 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg">
            Pricing
          </h2>
        </div>
        
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={plan.id} {...plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}