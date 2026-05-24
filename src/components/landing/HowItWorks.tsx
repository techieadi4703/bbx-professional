import React from 'react';
import { FileText, BadgeCheck, GraduationCap, IndianRupee, ArrowRight } from 'lucide-react';
import { Reveal, RevealItem } from '@/components/shared/Reveal';

export const HowItWorks = () => {
  const steps = [
    { num: "01", title: "Apply online", icon: FileText },
    { num: "02", title: "Get verified", icon: BadgeCheck },
    { num: "03", title: "Free training", icon: GraduationCap },
    { num: "04", title: "Start earning", icon: IndianRupee },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#fcf9f6]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <Reveal width="100%">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-headline tracking-tight text-[#1c1c1a]">
              How it works · <span className="italic text-[#735c00]">4 simple steps</span>
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative">
            {/* Horizontal connecting line on desktop */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[1px] border-t border-dashed border-[#735c00]/30 -translate-y-1/2 z-0" />

            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <RevealItem className="w-full md:w-1/4 z-10 relative">
                  <div className="bg-white border border-[#e5e2df] p-8 rounded-2xl shadow-sm flex flex-col items-center text-center relative group hover:border-[#735c00] transition-colors">
                    
                    <div className="absolute -top-4 -left-4 w-9 h-9 rounded-full bg-[#1c1c1a] text-white flex items-center justify-center font-headline italic text-sm shadow-md">
                      {step.num}
                    </div>

                    <div className="w-16 h-16 rounded-full bg-[#fcf9f6] flex items-center justify-center mb-6 text-[#1c1c1a] group-hover:bg-[#735c00]/10 group-hover:text-[#735c00] transition-colors">
                      <step.icon className="w-8 h-8" />
                    </div>

                    <h3 className="font-headline text-xl font-bold text-[#1c1c1a]">{step.title}</h3>
                  </div>
                </RevealItem>

                {i < steps.length - 1 && (
                  <div className="hidden md:flex flex-col items-center justify-center z-10 w-8">
                    <span className="text-[#735c00] font-bold text-lg">&rarr;</span>
                  </div>
                )}
                
                {i < steps.length - 1 && (
                  <div className="md:hidden flex justify-center w-full">
                    <div className="h-8 w-[1px] border-l border-dashed border-[#e5e2df]" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
