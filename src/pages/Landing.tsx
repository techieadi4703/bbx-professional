import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';

import { Hero } from '@/components/landing/Hero';
import { StatsBand } from '@/components/landing/StatsBand';
import { Benefits } from '@/components/landing/Benefits';
import { Categories } from '@/components/landing/Categories';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { EarningsCalculator } from '@/components/landing/EarningsCalculator';
import { Testimonials } from '@/components/landing/Testimonials';
import { GrowthPathway } from '@/components/landing/GrowthPathway';
import { WelfareInsurance } from '@/components/landing/WelfareInsurance';
import { FAQ } from '@/components/landing/FAQ';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { StickyApplyCTA } from '@/components/landing/StickyApplyCTA';

export default function Landing() {
  return (
    <Layout>
      <Helmet>
        <title>Join BuildBazaarX as a Professional — Build your trade career</title>
        <meta name="description" content="Join 10,000+ verified construction-trade professionals on BuildBazaarX. Steady jobs, transparent pricing, free training and insurance." />
        <meta property="og:title" content="Become a BuildBazaarX Professional" />
        <meta property="og:description" content="Steady jobs, transparent pricing, free training and insurance for verified trade professionals across India." />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://buildbazaarx.com/professional" />
      </Helmet>

      <div className="relative bg-[#fcf9f6] w-full overflow-hidden text-[#1c1c1a]">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@200..800&display=swap');
          .font-headline { font-family: 'Newsreader', serif; }
          .font-body { font-family: 'Manrope', sans-serif; }
        `}</style>
        
        <Hero />
        <StatsBand />
        <Benefits />
        <Categories />
        <HowItWorks />
        <EarningsCalculator />
        <Testimonials />
        <GrowthPathway />
        <WelfareInsurance />
        <FAQ />
        <FinalCTA />
        <StickyApplyCTA />
      </div>
    </Layout>
  );
}
