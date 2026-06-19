import React from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/shared/Reveal";
import { ShieldCheck, TrendingUp, Users } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <Helmet>
        <title>About Us — BuildBazaarX Professional</title>
        <meta name="description" content="Learn about our mission to empower India's construction and trade professionals." />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@200..800&display=swap');
        .font-headline { font-family: 'Newsreader', serif; }
        .font-body { font-family: 'Manrope', sans-serif; }
      `}</style>

      <div className="bg-surface min-h-screen text-on-surface font-body">
        {/* Hero Section */}
        <section className="pt-16 pb-10 md:pt-32 md:pb-20 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none z-0 bg-blueprint opacity-30" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Reveal width="100%">
              <span className="inline-block py-1.5 px-3 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest rounded-full border border-secondary/20 mb-6">
                OUR MISSION
              </span>
              <h1 className="text-4xl md:text-7xl font-headline tracking-tight leading-tight mb-8">
                Empowering India's <span className="italic">Builders</span>
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
                BuildBazaarX Professional is dedicated to organizing the unorganized sector of construction and home services. We provide verified professionals with a platform to grow their business, manage their schedule, and increase their earnings.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Pillars Section */}
        <section className="py-10 md:py-24 bg-surface-container-lowest border-y border-border">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <Reveal width="100%">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-secondary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold">Trust & Transparency</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    We ensure transparent pricing for both our professionals and customers. No hidden fees, no unfair cuts. You know exactly what you'll earn before you accept a job.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-secondary">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold">Predictable Growth</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    With thousands of daily customer requests, we provide a steady stream of high-quality jobs, helping you scale your independent business sustainably.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-secondary">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold">Community Support</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    You're never alone on the job. From free skills training to medical insurance and welfare programs, we invest heavily in the well-being of our network.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-10 md:py-24 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <Reveal width="100%">
              <h2 className="text-4xl font-headline tracking-tight mb-8">The <span className="italic">Story</span></h2>
              <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg">
                <p>
                  For decades, skilled tradespeople in India have relied on word-of-mouth and localized networks to find work. This often led to unpredictable income, lack of professional recognition, and vulnerability to exploitation.
                </p>
                <p>
                  BuildBazaarX was founded to bridge this gap. We recognized that the demand for high-quality construction and home services was massive, but the infrastructure to connect vetted professionals with homeowners was broken.
                </p>
                <p>
                  Today, our Professional network spans across major Indian cities, comprising electricians, plumbers, carpenters, and civil experts. By providing a digital storefront, standardized processes, and robust support, we are elevating the dignity of labor and transforming the trades into highly respected, lucrative careers.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </Layout>
  );
}
