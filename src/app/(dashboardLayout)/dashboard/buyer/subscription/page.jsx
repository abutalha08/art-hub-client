"use client";

import { Card, Button } from "@heroui/react";
import { FaInfinity } from "react-icons/fa6";
import { FiCheck, FiLayers, FiZap } from "react-icons/fi";

export default function SubscriptionPricing() {
  
  // ✅ DYNAMIC SUBSCRIPTION DATA FROM YOUR OVERVIEW / image_28a722.png
  const subscriptionPlans = [
    {
      name: "Free",
      id: "collector_free",
      price: "$0",
      period: "/ forever",
      description: "Essential features for getting started and organizing your initial art collection.",
      icon: <FiLayers className="text-3xl text-neutral-400" />,
      features: [
        "Max Purchases: 3 paintings",
        "Standard Art Gallery Access",
        "Basic Artwork Details View",
        "Standard Community Support",
      ],
      cta: "Current Plan",
      popular: false,
      badgeText: "Default",
      borderGradient: "hover:from-neutral-700 hover:to-neutral-900",
      iconContainerBg: "bg-neutral-800/50 border-neutral-700",
    },
    {
      name: "Pro",
      id: "collector_pro",
      price: "$9.99",
      period: "/ month",
      description: "Our most popular option for serious art lovers looking to expand their gallery.",
      icon: <FiZap className="text-3xl text-purple-400" />,
      features: [
        "Max Purchases: 9 paintings",
        "Premium Badge on Profile",
        "Priority Customer Support",
        "Advanced Collection Insights",
      ],
      cta: "Upgrade to Pro",
      popular: true,
      badgeText: "Popular",
      borderGradient: "hover:from-purple-500 hover:to-purple-900",
      iconContainerBg: "bg-purple-500/10 border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.05)]",
    },
    {
      name: "Premium",
      id: "collector_premium",
      price: "$19.99",
      period: "/ month",
      description: "Uncapped potential and unlimited art collection limits with elite vip benefits.",
      icon: <FaInfinity className="text-3xl text-purple-300" />,
      features: [
        "Max Purchases: Unlimited",
        "Early Access to Rare Artworks",
        "Dedicated Account Manager",
        "Exclusive High-Res Downloads",
      ],
      cta: "Go Unlimited",
      popular: false,
      badgeText: "Elite",
      borderGradient: "hover:from-purple-400 hover:to-indigo-500",
      iconContainerBg: "bg-purple-500/10 border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.05)]",
    },
  ];

  return (
    <div className="p-6 md:p-12 space-y-10 bg-[#050508] min-h-screen text-white selection:bg-purple-500/30 flex flex-col justify-center">
      
      {/* SECTION HEADER */}
      <div className="space-y-2 max-w-7xl mx-auto text-center mb-6">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
          Upgrade Your{" "}
          <span className="relative inline-block bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.25)] animate-pulse [animation-duration:5s] tracking-wide opacity-95">
            Collection Limit
          </span>
        </h1>
        <p className="text-base text-neutral-400 max-w-xl mx-auto font-medium">
          Choose the perfect tier to expand your gallery and collect premium artwork.
        </p>
      </div>

      {/* PRICING CARDS CONTAINER (RENDERED DYNAMICALLY) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative group rounded-3xl p-[1px] bg-gradient-to-b from-neutral-800 to-transparent ${plan.borderGradient} transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}
          >
            <Card className="p-8 flex flex-col justify-between bg-[#0e0e16]/90 backdrop-blur-xl rounded-[23px] border-none h-full min-h-[440px] transition-all duration-500 group-hover:bg-[#0e0e16]/70">
              <div className="space-y-6">
                
                {/* Icon & Badge */}
                <div className="flex justify-between items-start">
                  <div className={`p-4 rounded-2xl border group-hover:scale-105 transition-all duration-300 ${plan.iconContainerBg}`}>
                    {plan.icon}
                  </div>
                  <span
                    className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                      plan.popular
                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        : plan.name === "Premium"
                        ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-transparent"
                        : "bg-neutral-800 text-neutral-400 border-neutral-700"
                    }`}
                  >
                    {plan.badgeText}
                  </span>
                </div>

                {/* Pricing Name & Amount */}
                <div className="space-y-1">
                  <p className={`text-xs font-bold tracking-widest uppercase ${plan.name === "Free" ? "text-neutral-400" : "text-purple-400"}`}>
                    {plan.name}
                  </p>
                  <p className="text-4xl font-black text-white tracking-tight">
                    {plan.price}{" "}
                    <span className="text-sm font-normal text-neutral-500">{plan.period}</span>
                  </p>
                  <p className="text-xs text-neutral-400/80 font-medium pt-1 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Features Line */}
                <div className="space-y-3 pt-2">
                  {plan.features.map((feature, idx) => {
                    // Highlight dynamic terms like "Unlimited", "3 paintings", or "9 paintings"
                    const isHighlight = feature.includes("Unlimited") || feature.includes("paintings");
                    
                    return (
                      <div key={idx} className="flex items-center gap-3 text-neutral-300">
                        <FiCheck className={`${plan.name === "Free" ? "text-neutral-500" : "text-purple-400"} text-xl flex-shrink-0`} />
                        <p className="text-sm font-medium">
                          {isHighlight ? (
                            <>
                              {feature.split(":")[0]}:{" "}
                              <span className={`font-black ${feature.includes("Unlimited") ? "bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent" : "text-white"}`}>
                                {feature.split(":")[1]}
                              </span>
                            </>
                          ) : (
                            feature
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <Button
                className={`w-full mt-8 py-6 font-bold rounded-xl transition-all duration-300 ${
                  plan.name === "Free"
                    ? "bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700"
                    : plan.name === "Premium"
                    ? "bg-white text-black hover:bg-neutral-200"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white shadow-[0_4px_20px_rgba(168,85,247,0.2)]"
                }`}
              >
                {plan.cta}
              </Button>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}