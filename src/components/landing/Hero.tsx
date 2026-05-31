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
    <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-8 max-w-md w-full relative z-10 border border-[#e5e2df]">
      <h3 className="font-headline text-2xl tracking-tight mb-6">Start your application</h3>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[#74777d]">Phone Number</label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-[#74777d] font-bold text-sm">+91</span>
            <input 
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#f6f3f0] border border-transparent focus:border-[#735c00] rounded-lg text-sm font-bold outline-none transition-colors"
              placeholder="XXXXXXXXXX"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[#74777d]">City</label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="w-full h-[46px] bg-[#f6f3f0] border-transparent focus:border-[#735c00] rounded-lg font-bold">
              <SelectValue placeholder="Select your city" />
            </SelectTrigger>
            <SelectContent>
              {CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[#74777d]">Trade / Profession</label>
          <Select value={trade} onValueChange={setTrade}>
            <SelectTrigger className="w-full h-[46px] bg-[#f6f3f0] border-transparent focus:border-[#735c00] rounded-lg font-bold">
              <SelectValue placeholder="Select your trade" />
            </SelectTrigger>
            <SelectContent>
              {PROFESSIONS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-4 mt-2 bg-[#1c1c1a] text-white rounded-full font-bold hover:bg-[#735c00] transition-colors flex items-center justify-center gap-2"
        >
          {loading ? "Processing..." : "Apply now \u2192"}
        </button>
        <p className="text-center text-xs text-[#74777d] mt-4">We'll never spam you.</p>
      </form>
    </div>
  );
};

export const Hero = () => {
  return (
    <section className="relative min-h-[88vh] flex items-center pt-8 pb-8 md:pt-20 md:pb-16 overflow-hidden">
      {/* Background dotted grid */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{ 
          backgroundImage: 'linear-gradient(#e5e2df 1px, transparent 1px), linear-gradient(90deg, #e5e2df 1px, transparent 1px)', 
          backgroundSize: '40px 40px', 
          opacity: 0.4 
        }} 
      />
      
      {/* Background Image (mobile faded, desktop aligned right) */}
      <div className="absolute inset-0 z-0 opacity-10 lg:opacity-30 lg:translate-x-1/3 flex items-center justify-end pointer-events-none">
        <img src="/branding_hero.png" alt="" className="h-[120%] object-cover object-left max-w-none" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10">
        <Reveal width="100%">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8 justify-between">
            
            {/* Left Column */}
            <div className="w-full lg:w-[55%] space-y-8">
              <span className="inline-block py-1.5 px-3 bg-[#735c00]/10 text-[#735c00] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#735c00]/20">
                FOR PROFESSIONALS · PAN INDIA
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-headline tracking-tight leading-[1.1] text-[#1c1c1a]">
                Build your career on India's most trusted construction-trades network.
              </h1>
              
              <p className="text-lg text-[#74777d] font-medium leading-relaxed max-w-xl">
                Join thousands of verified electricians, plumbers, carpenters and other trade professionals who are growing their business with steady jobs, transparent pricing, and free training.
              </p>
              
              <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-bold text-[#1c1c1a]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#735c00]"></span>
                  10,000+ verified pros
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#735c00]"></span>
                  4.7★ avg rating
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#735c00]"></span>
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
