import React from 'react';
import { Star, Shield, Trophy } from 'lucide-react';
import { Reveal, RevealItem } from '@/components/shared/Reveal';

export const GrowthPathway = () => {
  const tiers = [
    {
      name: "Classic",
      icon: Star,
      requirements: "Start here · Avg rating 4.0+",
      perks: [
        "Access to basic job pool",
        "Weekly payouts",
        "Basic insurance cover"
      ],
      style: "bg-white border-[#e5e2df] text-[#1c1c1a]"
    },
    {
      name: "Prime",
      icon: Shield,
      requirements: "Top 20% · Avg rating 4.5+",
      perks: [
        "Priority access to jobs",
        "Higher hourly rates",
        "Extended health insurance",
        "Tool financing options"
      ],
      style: "bg-white border-[#735c00] text-[#1c1c1a] shadow-lg relative z-10 scale-100 md:scale-105"
    },
    {
      name: "Elite",
      icon: Trophy,
      requirements: "Top 5% · Avg rating 4.8+",
      perks: [
        "Premium corporate jobs",
        "Highest payout bracket",
        "Full family health cover",
        "Featured partner profile",
        "Zero platform fees on tips"
      ],
      style: "bg-[#735c00] border-[#735c00] text-white"
    }
  ];

  return (
    <section className="py-10 md:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <Reveal width="100%">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-headline tracking-tight text-[#1c1c1a]">
              Grow from <span className="italic text-[#735c00]">Classic to Elite</span>
            </h2>
            <p className="mt-4 text-[#74777d] max-w-2xl mx-auto font-medium">
              We reward quality work. The better your ratings and completion rates, the higher you climb.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-stretch max-w-5xl mx-auto">
            {tiers.map((tier, i) => (
              <RevealItem key={i} className="h-full">
                <div className={`p-4 md:p-10 rounded-2xl border-2 h-full flex flex-col transition-all ${tier.style}`}>
                  <div className="mb-4 md:mb-8">
                    <tier.icon className={`w-8 h-8 mb-3 md:w-10 md:h-10 md:mb-6 ${tier.name === 'Elite' ? 'text-white/80' : 'text-[#735c00]'}`} />
                    <h3 className="font-headline text-xl md:text-3xl italic font-bold mb-1 md:mb-2">{tier.name}</h3>
                    <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${tier.name === 'Elite' ? 'text-white/70' : 'text-[#74777d]'}`}>
                      {tier.requirements}
                    </p>
                  </div>
                  
                  <ul className={`space-y-2 md:space-y-4 flex-grow ${tier.name === 'Elite' ? 'text-white/90' : 'text-[#44474c]'}`}>
                    {tier.perks.map((perk, j) => (
                      <li key={j} className="flex items-start gap-2.5 md:gap-3">
                        <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${tier.name === 'Elite' ? 'bg-white' : 'bg-[#735c00]'}`} />
                        <span className="font-medium text-xs sm:text-sm leading-relaxed">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
