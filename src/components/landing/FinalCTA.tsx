import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/shared/Reveal';

export const FinalCTA = () => {
  return (
    <section className="bg-[#1c1c1a] text-white py-12 md:py-32 text-center relative overflow-hidden border-y border-[#1c1c1a]">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
          backgroundSize: '40px 40px',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <Reveal width="100%">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-headline tracking-tight italic">
              Ready to build your future?
            </h2>
            
            <p className="text-lg text-white/80 font-medium leading-relaxed">
              Join thousands of professionals securing steady income and growing their business with BuildBazaarX.
            </p>
            
            <div className="pt-4">
              <Link 
                to="/auth?mode=signup" 
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#1c1c1a] rounded-full font-bold text-lg hover:bg-[#fcf9f6] hover:scale-105 transition-all shadow-xl"
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
