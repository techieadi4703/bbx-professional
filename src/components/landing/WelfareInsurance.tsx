import React from 'react';
import { HeartPulse, ShieldCheck, GraduationCap } from 'lucide-react';
import { Reveal, RevealItem } from '@/components/shared/Reveal';

export const WelfareInsurance = () => {
  const items = [
    {
      icon: ShieldCheck,
      title: "Life & accidental cover",
      desc: "Free for all active partners. ₹5 lakh life cover, ₹2 lakh accidental cover."
    },
    {
      icon: HeartPulse,
      title: "Health insurance",
      desc: "Coverage for self and family for partners completing 30+ jobs per quarter."
    },
    {
      icon: GraduationCap,
      title: "Financial literacy",
      desc: "Workshops on savings, taxes, and credit — plus access to formal loans."
    }
  ];

  return (
    <section className="py-10 md:py-24 bg-surface-container-low text-on-surface overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <Reveal width="100%">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-headline tracking-tight">
              We care about your <span className="italic text-secondary">wellbeing</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 border-t border-border pt-8 md:pt-16">
            {items.map((item, i) => (
              <RevealItem key={i}>
                <div className="flex flex-col text-left bg-surface-container-lowest/5 p-4 md:p-0 rounded-xl md:rounded-none md:bg-transparent">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 md:mb-6 text-secondary">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h3 className="font-headline text-lg md:text-xl font-bold mb-2 md:mb-3">{item.title}</h3>
                  <p className="text-on-surface-variant font-body text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
