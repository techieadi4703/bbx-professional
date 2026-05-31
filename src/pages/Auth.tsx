import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, Mail, Lock, Wrench, ShieldCheck, MapPin, Phone, User, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfessionalAuth() {
  const [searchParams] = useSearchParams();
  const isLoginParam = searchParams.get("mode") === "login";
  const [isLogin, setIsLogin] = useState(isLoginParam);
  const [isLoading, setIsLoading] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [profession, setProfession] = useState(searchParams.get("trade") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [phone, setPhone] = useState(searchParams.get("phone") || "");
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const resolveProfessionalDestination = async (userId: string) => {
    const { data: profData, error: profError } = await supabase
      .from("professionals")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    if (profError) throw profError;

    return profData ? "/dashboard" : "/setup";
  };

  useEffect(() => {
    setIsLogin(isLoginParam);
  }, [isLoginParam]);

  useEffect(() => {
    const checkExistingSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        try {
          const path = await resolveProfessionalDestination(session.user.id);
          navigate(path);
        } catch (error) {
          console.error("Existing session check error:", error);
          navigate("/setup");
        }
      }
    };
    checkExistingSession();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (isLogin) {
        const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        if (authData.user) {
          const nextPath = await resolveProfessionalDestination(authData.user.id);
          navigate(nextPath);
        } else {
          navigate("/dashboard");
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: "professional",
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          // Safety Sync: Explicitly update the profiles table to ensure role, contact and location info are attached first
          await supabase.from('profiles').update({ 
            role: 'professional', 
            full_name: fullName,
            phone: phone,
            city: city
          }).eq('id', data.user.id);

          toast({ title: "Account created", description: "Proceeding to professional setup..." });
          navigate(`/setup?trade=${encodeURIComponent(profession)}`);
        }
      }
    } catch (error: any) {
      // Ignore errors caused by component unmounting/request abortion during navigation
      if (error.name === 'AbortError' || error.message?.includes('aborted')) {
        console.log("Auth request aborted during navigation - ignoring");
        return;
      }

      console.error("Auth error:", error);
      toast({ 
        variant: "destructive", 
        title: "Login failed", 
        description: error.message || "Authentication failed. Please check your credentials." 
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
      
      <div className="bg-[#fcf9f6] text-[#1c1c1a] min-h-screen font-body w-full pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e5e2df 1px, transparent 1px), linear-gradient(90deg, #e5e2df 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3 }} />
        
        <main className="max-w-[1440px] mx-auto px-4 md:px-12 pt-2 pb-8 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-start">
            
            <div className="w-full md:w-1/3 shrink-0 md:sticky md:top-32">
               <span className="font-body uppercase tracking-[0.2em] text-[10px] text-[#735c00] mb-4 block font-bold">FOR PROFESSIONALS</span>
               <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline tracking-tight leading-none mb-6">
                {isLogin ? "Welcome" : "Join us"} <br/><span className="italic">{isLogin ? "back." : "today."}</span>
              </h1>
               <div className="w-12 h-[1px] bg-[#c4c6cc] mb-6"></div>
              <p className="text-lg font-body text-[#44474c] leading-relaxed max-w-sm">
                {isLogin 
                  ? "Log in to manage your jobs, schedule, and earnings." 
                  : "Join India's most trusted network of construction and trade professionals."}
              </p>
            </div>

            <div className="w-full md:w-2/3 max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-[#e5e2df] p-5 md:p-12 rounded-2xl shadow-2xl hover:border-[#735c00] transition-colors relative z-10"
              >
                <form onSubmit={handleAuth} className="space-y-5">
                  {!isLogin && (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-[#74777d]">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#74777d]" />
                          <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Aditya Srivastava" className="w-full pl-11 pr-4 py-3 bg-[#f6f3f0] border border-transparent focus:border-[#735c00] rounded-lg text-sm font-bold outline-none transition-colors" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-[#74777d]">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#74777d]" />
                            <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 XXXXX" className="w-full pl-11 pr-4 py-3 bg-[#f6f3f0] border border-transparent focus:border-[#735c00] rounded-lg text-sm font-bold outline-none transition-colors" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-[#74777d]">City</label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#74777d]" />
                            <input required type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Jaipur" className="w-full pl-11 pr-4 py-3 bg-[#f6f3f0] border border-transparent focus:border-[#735c00] rounded-lg text-sm font-bold outline-none transition-colors" />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#74777d]">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#74777d]" />
                      <input 
                        required 
                        type="email" 
                        autoComplete="off"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="name@provider.com" 
                        className="w-full pl-11 pr-4 py-3 bg-[#f6f3f0] border border-transparent focus:border-[#735c00] rounded-lg text-sm font-bold outline-none transition-colors" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#74777d]">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#74777d]" />
                      <input 
                        required 
                        type="password" 
                        autoComplete="new-password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="••••••••" 
                        className="w-full pl-11 pr-4 py-3 bg-[#f6f3f0] border border-transparent focus:border-[#735c00] rounded-lg text-sm font-bold outline-none transition-colors" 
                      />
                    </div>
                  </div>

                  <button type="submit" disabled={isLoading} className="w-full py-4 mt-2 bg-[#1c1c1a] text-white rounded-full font-bold hover:bg-[#735c00] transition-colors flex items-center justify-center gap-2 text-sm shadow-md">
                    {isLoading ? "Signing you in…" : isLogin ? "Log in" : "Create my account"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="mt-12 pt-8 border-t border-[#e5e2df] flex items-center justify-between">
                  <span className="text-sm font-medium text-[#74777d]">
                    {isLogin ? "New professional?" : "Already have an account?"}
                  </span>
                  <button onClick={() => setIsLogin(!isLogin)} className="text-sm font-bold text-[#735c00] hover:underline underline-offset-4">
                    {isLogin ? "Create an account" : "Log in"}
                  </button>
                </div>
              </motion.div>
            </div>

          </div>
        </main>
      </div>
    </Layout>
  );
}
