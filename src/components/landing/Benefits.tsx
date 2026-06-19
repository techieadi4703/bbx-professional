import React from 'react';
import { TrendingUp, Clock, GraduationCap, ShieldCheck, Wallet, Award } from 'lucide-react';
import { Reveal, RevealItem } from '@/components/shared/Reveal';

export const Benefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Steady, higher income",
      body: "Top partners earn 50% more than entry-level salaries. Transparent, on-time payouts every week."
    },
    {
      icon: Clock,
      title: "Flexible hours",
      body: "Choose your own schedule. Work full-time or alongside your existing jobs."
    },
    {
      icon: GraduationCap,
      title: "Free training & upskilling",
      body: "Certified trainers help you sharpen your craft and learn new techniques at no cost."
    },
    {
      icon: ShieldCheck,
      title: "Life, accidental & health cover",
      body: "Active partners get free life and accidental insurance, plus health coverage for self and family."
    },
    {
      icon: Wallet,
      title: "Loans & financial support",
      body: "Service-kit loans and personal loans via partner NBFCs at fair rates."
    },
    {
      icon: Award,
      title: "Trusted brand, steady demand",
      body: "Customers come to us — you get a steady stream of nearby jobs without chasing them."
    }
  ];

  return (
    <section className="py-10 md:py-24 bg-surface">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <Reveal width="100%">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-headline tracking-tight text-on-surface">
              Why professionals choose <span className="italic text-secondary">BuildBazaarX</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <RevealItem key={i}>
                <div className="bg-surface-container-lowest p-4 md:p-8 rounded-2xl shadow-sm border border-border hover:border-secondary transition-colors h-full flex flex-col">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 md:mb-6 text-secondary">
                    <b.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface mb-2 md:mb-3">{b.title}</h3>
                  <p className="text-on-surface-variant font-medium leading-relaxed flex-grow text-xs sm:text-sm">
                    {b.body}
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
