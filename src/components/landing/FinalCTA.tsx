import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/shared/Reveal';

export const FinalCTA = () => {
  return (
    <section className="bg-surface-container-lowest text-on-surface py-12 md:py-32 text-center relative overflow-hidden border-y border-border">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <Reveal width="100%">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-headline tracking-tight italic">
              Ready to build your future?
            </h2>
            
            <p className="text-lg text-on-surface-variant font-medium leading-relaxed">
              Join thousands of professionals securing steady income and growing their business with BuildBazaarX.
            </p>
            
            <div className="pt-4">
              <Link 
                to="/auth?mode=signup" 
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-surface hover:scale-105 transition-all shadow-sm"
              >
                Apply now <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
