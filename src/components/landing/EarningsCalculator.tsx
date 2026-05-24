import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Reveal, RevealItem } from '@/components/shared/Reveal';
import { PROFESSIONS, DEFAULT_HOURLY_RATES } from '@/lib/professions';

export const EarningsCalculator = () => {
  const [trade, setTrade] = useState('Electrician');
  const [hours, setHours] = useState([8]);
  const [days, setDays] = useState([24]);

  const rate = DEFAULT_HOURLY_RATES[trade] || 350;
  const earnings = Math.round(hours[0] * days[0] * rate * 0.8);

  return (
    <section className="py-16 md:py-24 bg-[#1c1c1a] text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <Reveal width="100%">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline tracking-tight">
                Estimate your <span className="italic text-[#735c00]">earnings</span>
              </h2>
              <p className="text-white/80 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                See how much you could earn by partnering with BuildBazaarX. Our top professionals make up to 50% more than standard industry rates, with payouts sent directly to your bank account every week.
              </p>
            </div>

            {/* Right Column */}
            <RevealItem className="w-full lg:w-1/2">
              <div className="bg-white text-[#1c1c1a] rounded-3xl p-8 md:p-12 shadow-2xl border border-[#e5e2df]">
                
                <div className="mb-10 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#74777d] block mb-2">Estimated Net Earnings</span>
                  <div className="text-5xl md:text-6xl font-headline font-bold text-[#735c00]">
                    ₹{earnings.toLocaleString('en-IN')}<span className="text-2xl font-body text-[#74777d] font-normal">/month</span>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                      <span className="text-[#74777d] text-[10px]">Your Trade</span>
                    </div>
                    <Select value={trade} onValueChange={setTrade}>
                      <SelectTrigger className="w-full h-14 bg-[#fcf9f6] border-[#e5e2df] focus:border-[#735c00] rounded-xl font-bold text-base">
                        <SelectValue placeholder="Select trade" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROFESSIONS.map(p => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                      <span className="text-[#74777d] text-[10px]">Hours per day</span>
                      <span className="text-[#1c1c1a] text-xs">{hours[0]} hrs</span>
                    </div>
                    <Slider 
                      value={hours} 
                      onValueChange={setHours} 
                      min={4} 
                      max={12} 
                      step={1}
                      className="py-4"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                      <span className="text-[#74777d] text-[10px]">Days per month</span>
                      <span className="text-[#1c1c1a] text-xs">{days[0]} days</span>
                    </div>
                    <Slider 
                      value={days} 
                      onValueChange={setDays} 
                      min={15} 
                      max={30} 
                      step={1}
                      className="py-4"
                    />
                  </div>
                </div>

                <p className="text-[10px] text-center text-[#74777d] mt-10">
                  Estimate only. Actual earnings depend on job mix, location, and ratings.
                </p>
              </div>
            </RevealItem>

          </div>
        </Reveal>
      </div>
    </section>
  );
};
