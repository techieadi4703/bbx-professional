import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { PROFESSIONS } from "@/lib/professions";
import { MapPin, User, ArrowRight, ShieldCheck, Phone, Briefcase, IndianRupee } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProfessionalSetup() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({
    fullName: "",
    profession: searchParams.get("trade") || "",
    phone: "",
    city: "",
    address: "",
    pincode: "",
    hourlyRate: "",
    dailyRate: "",
    bio: ""
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUserId(session.user.id);
      
      const { data: profileData } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .maybeSingle();

      if (profileData && profileData.role !== "professional") {
        navigate("/dashboard");
        return;
      }
      
      const { data: profileInfo } = await supabase
        .from("profiles")
        .select("full_name, phone, city")
        .eq("id", session.user.id)
        .maybeSingle();

      if (profileInfo) {
        setForm(prev => ({
          ...prev,
          fullName: profileInfo.full_name || prev.fullName,
          phone: profileInfo.phone || prev.phone,
          city: profileInfo.city || prev.city
        }));
      }
      
      const { data } = await supabase
        .from("professionals")
        .select("id")
        .eq("id", session.user.id)
        .maybeSingle();
      
      if (data) {
        navigate("/dashboard");
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("professionals")
        .upsert({
          id: userId,
          full_name: form.fullName,
          profession: form.profession,
          phone: form.phone,
          city: form.city,
          address: form.address || null,
          pincode: form.pincode || null,
          hourly_rate: form.hourlyRate ? parseInt(form.hourlyRate) : null,
          daily_rate: form.dailyRate ? parseInt(form.dailyRate) : null,
          bio: form.bio || null,
        });

      if (error) throw error;

      toast({
        title: "Profile Configured! ✨",
        description: "Your professional workspace is ready.",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Setup Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@200..800&display=swap');
        .font-headline { font-family: 'Newsreader', serif; }
        .font-body { font-family: 'Manrope', sans-serif; }
      `}</style>
      
      <div className="bg-[#fcf9f6] text-[#1c1c1a] min-h-screen font-body w-full relative overflow-hidden flex flex-col items-center justify-start py-8 md:py-24">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e5e2df 1px, transparent 1px), linear-gradient(90deg, #e5e2df 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3 }} />
        
        <div className="w-full max-w-2xl px-6 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-headline tracking-tight leading-tight mb-3">
              Professional <span className="italic">Onboarding</span>
            </h1>
            <p className="text-sm font-body text-[#74777d] leading-relaxed max-w-md mx-auto">
              Complete your technical profile to start receiving client projects.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#e5e2df] p-4 md:p-10 rounded-2xl shadow-2xl hover:border-[#735c00] transition-colors"
          >
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#e5e2df]">
              <ShieldCheck className="w-5 h-5 text-[#735c00]" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#1c1c1a]">Identity & Workspace</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#74777d]">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#74777d]" />
                    <input 
                      required 
                      type="text" 
                      value={form.fullName} 
                      onChange={(e) => setForm({...form, fullName: e.target.value})} 
                      placeholder="Your name" 
                      className="w-full pl-11 pr-4 py-2 bg-[#f6f3f0] border border-transparent focus:border-[#735c00] rounded-lg text-sm font-bold outline-none transition-colors" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#74777d]">Profession</label>
                  <Select required value={form.profession} onValueChange={(val) => setForm({...form, profession: val})}>
                    <SelectTrigger className="w-full h-[38px] sm:h-[42px] bg-[#f6f3f0] border-transparent focus:border-[#735c00] rounded-lg font-bold text-sm">
                      <SelectValue placeholder="What do you do?" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROFESSIONS.map(prof => (
                        <SelectItem key={prof} value={prof}>{prof}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#74777d]">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#74777d]" />
                    <input 
                      required 
                      type="tel" 
                      value={form.phone} 
                      onChange={(e) => setForm({...form, phone: e.target.value})} 
                      placeholder="+91" 
                      className="w-full pl-11 pr-4 py-2 bg-[#f6f3f0] border border-transparent focus:border-[#735c00] rounded-lg text-sm font-bold outline-none transition-colors" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#74777d]">City</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#74777d]" />
                    <input 
                      required 
                      type="text" 
                      value={form.city} 
                      onChange={(e) => setForm({...form, city: e.target.value})} 
                      placeholder="e.g. Jaipur" 
                      className="w-full pl-11 pr-4 py-2 bg-[#f6f3f0] border border-transparent focus:border-[#735c00] rounded-lg text-sm font-bold outline-none transition-colors" 
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#74777d]">Hourly Rate (₹)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#74777d]" />
                    <input 
                      type="number" 
                      value={form.hourlyRate} 
                      onChange={(e) => setForm({...form, hourlyRate: e.target.value})} 
                      placeholder="e.g. 500" 
                      className="w-full pl-11 pr-4 py-2 bg-[#f6f3f0] border border-transparent focus:border-[#735c00] rounded-lg text-sm font-bold outline-none transition-colors" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#74777d]">Daily Rate (₹)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#74777d]" />
                    <input 
                      type="number" 
                      value={form.dailyRate} 
                      onChange={(e) => setForm({...form, dailyRate: e.target.value})} 
                      placeholder="e.g. 2500" 
                      className="w-full pl-11 pr-4 py-2 bg-[#f6f3f0] border border-transparent focus:border-[#735c00] rounded-lg text-sm font-bold outline-none transition-colors" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#74777d]">Address (Optional)</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#74777d]" />
                  <input 
                    type="text" 
                    value={form.address} 
                    onChange={(e) => setForm({...form, address: e.target.value})} 
                    placeholder="Shop / Office No, Area..." 
                    className="w-full pl-11 pr-4 py-2 bg-[#f6f3f0] border border-transparent focus:border-[#735c00] rounded-lg text-sm font-bold outline-none transition-colors" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#74777d]">Professional Bio (Optional)</label>
                <textarea 
                  maxLength={300} 
                  value={form.bio} 
                  onChange={(e) => setForm({...form, bio: e.target.value})} 
                  placeholder="A brief summary of your expertise..." 
                  rows={2} 
                  className="w-full px-4 py-3 bg-[#f6f3f0] border border-transparent focus:border-[#735c00] rounded-lg text-sm font-bold outline-none transition-colors resize-none" 
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading} 
                className="w-full py-3 mt-2 bg-[#1c1c1a] text-white rounded-full font-bold hover:bg-[#735c00] transition-colors flex items-center justify-center gap-2 text-sm shadow-md"
              >
                {isLoading ? "Setting up workspace..." : "Complete Setup"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
