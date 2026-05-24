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
    <section className="py-16 md:py-24 bg-[#1c1c1a] text-white overflow-hidden relative">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
          backgroundSize: '32px 32px' 
        }}
      />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <Reveal width="100%">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-headline tracking-tight">
              We care about your <span className="italic text-[#735c00]">wellbeing</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16">
            {items.map((item, i) => (
              <RevealItem key={i}>
                <div className="flex flex-col text-left">
                  <div className="w-14 h-14 rounded-full bg-[#735c00]/10 flex items-center justify-center mb-6 text-[#735c00]">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-headline text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/70 font-body text-sm leading-relaxed">
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
