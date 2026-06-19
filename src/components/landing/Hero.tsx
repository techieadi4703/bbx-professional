import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Reveal } from '@/components/shared/Reveal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { PROFESSIONS, CITIES } from '@/lib/professions';

const LeadCaptureCard = () => {
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [trade, setTrade] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !city || !trade) {
      toast({ description: "Please fill in all fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      // TODO: create professional_leads table in Supabase (phone text, city text, trade text, source text, created_at default now())
      await supabase.from("professional_leads").insert({
        phone,
        city,
        trade,
        source: "landing_hero"
      });
    } catch (err) {
      console.log("Supabase insert failed (swallowing error):", err);
    } finally {
      setLoading(false);
      navigate(`/auth?mode=signup&trade=${encodeURIComponent(trade)}&phone=${encodeURIComponent(phone)}&city=${encodeURIComponent(city)}`);
    }
  };

  return (
    <div className="bg-[#C5A572] dark:bg-[#1C2333] p-6 md:p-10 rounded-[3rem] shadow-xl border border-white/20 relative overflow-hidden max-w-md w-full">
      {/* Visual Blueprint accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 dark:bg-white/5 rounded-bl-[4rem] flex items-center justify-center border-l border-b border-black/10 dark:border-white/10 pointer-events-none">
        <span className="font-mono text-[10px] rotate-90 tracking-[0.5em] opacity-20 text-black dark:text-white uppercase">Form_Asset</span>
      </div>

      <h3 className="font-headline text-3xl font-bold tracking-tight mb-8 text-black dark:text-white relative z-10">Start your application</h3>
      
      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        <div className="space-y-3">
          <label className="text-[10px] uppercase font-mono tracking-widest text-black/60 dark:text-white/60 ml-1">Phone Number</label>
          <div className="relative flex items-center">
            <span className="absolute left-5 text-black/40 dark:text-white/40 font-bold text-sm">+91</span>
            <input 
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 sm:h-14 w-full rounded-2xl bg-[#E5DACE] dark:bg-[#20293A] border-transparent focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 focus:bg-white dark:focus:bg-[#2a364a] transition-all text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 shadow-sm pl-14 pr-5"
              placeholder="XXXXXXXXXX"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] uppercase font-mono tracking-widest text-black/60 dark:text-white/60 ml-1">City</label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="h-11 sm:h-14 w-full rounded-2xl bg-[#E5DACE] dark:bg-[#20293A] border-transparent focus:bg-white dark:focus:bg-[#2a364a] transition-all text-black dark:text-white shadow-sm px-5">
              <SelectValue placeholder="Select your city" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-white dark:bg-[#20293A] text-black dark:text-white border-transparent shadow-xl">
              {CITIES.map(c => <SelectItem key={c} value={c} className="rounded-lg hover:bg-black/5 dark:hover:bg-white/5 focus:bg-black/5 dark:focus:bg-white/5 cursor-pointer">{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] uppercase font-mono tracking-widest text-black/60 dark:text-white/60 ml-1">Trade / Profession</label>
          <Select value={trade} onValueChange={setTrade}>
            <SelectTrigger className="h-11 sm:h-14 w-full rounded-2xl bg-[#E5DACE] dark:bg-[#20293A] border-transparent focus:bg-white dark:focus:bg-[#2a364a] transition-all text-black dark:text-white shadow-sm px-5">
              <SelectValue placeholder="Select your trade" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-white dark:bg-[#20293A] text-black dark:text-white border-transparent shadow-xl">
              {PROFESSIONS.map(p => <SelectItem key={p} value={p} className="rounded-lg hover:bg-black/5 dark:hover:bg-white/5 focus:bg-black/5 dark:focus:bg-white/5 cursor-pointer">{p}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full h-14 sm:h-16 rounded-full text-lg font-bold shadow-[0_20px_40px_rgba(0,0,0,0.3)] bg-black dark:bg-[#4A7DE3] text-white hover:bg-black/80 dark:hover:bg-[#4A7DE3]/80 group relative overflow-hidden transition-all duration-500 mt-6 flex items-center justify-center gap-2"
        >
          <span className="relative z-10">{loading ? "Processing..." : "Apply now \u2192"}</span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
        <p className="text-center text-[10px] uppercase tracking-widest text-black/40 dark:text-white/40 mt-4 font-mono">We'll never spam you.</p>
      </form>
    </div>
  );
};

export const Hero = () => {
  return (
    <section className="relative min-h-[88vh] flex items-center pt-8 pb-8 md:pt-20 md:pb-16 overflow-hidden">
      {/* Background dotted grid */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-blueprint opacity-40" />
      


      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10">
        <Reveal width="100%">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8 justify-between">
            
            {/* Left Column */}
            <div className="w-full lg:w-[55%] space-y-8">
              <div className="inline-flex items-center gap-2 py-1.5 px-3 bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-widest rounded-full border border-secondary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                FOR PROFESSIONALS · PAN INDIA
              </div>
              
              <h1 className="font-headline font-semibold text-4xl md:text-5xl lg:text-[3.5rem] tracking-tight leading-[1.1] text-on-surface">
                Build your career on India's most trusted <span className="text-secondary">construction-trades</span> network.
              </h1>
              
              <p className="text-lg text-on-surface-variant font-medium leading-relaxed max-w-xl">
                Join thousands of verified electricians, plumbers, carpenters and other trade professionals who are growing their business with steady jobs, transparent pricing, and free training.
              </p>
              
              <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-bold text-on-surface">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-lg bg-secondary"></span>
                  10,000+ verified pros
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-lg bg-secondary"></span>
                  4.7★ avg rating
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-lg bg-secondary"></span>
                  ₹28,000+ avg monthly earnings
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-[40%] flex justify-center lg:justify-end">
              <LeadCaptureCard />
            </div>
            
          </div>
        </Reveal>
      </div>
    </section>
  );
};
