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
      <div className="bg-surface text-on-surface min-h-screen font-body w-full pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0 bg-blueprint opacity-30" />
        
        <main className="max-w-[1440px] mx-auto px-4 md:px-12 py-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-center min-h-[75vh]">
            
            <div className="w-full md:w-1/3 shrink-0">
               <span className="font-body uppercase tracking-[0.2em] text-[10px] text-secondary mb-4 block font-bold">FOR PROFESSIONALS</span>
               <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline tracking-tight leading-tight mb-6">
                {isLogin ? "Welcome" : "Join us"} <br/><span className="italic">{isLogin ? "back." : "today."}</span>
              </h1>
               <div className="w-12 h-[1px] bg-surface-container-highest mb-6"></div>
              <p className="text-lg font-body text-on-surface-variant leading-relaxed max-w-sm">
                {isLogin 
                  ? "Log in to manage your jobs, schedule, and earnings." 
                  : "Join India's most trusted network of construction and trade professionals."}
              </p>
            </div>

            <div className="w-full md:w-2/3 max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#C5A572] dark:bg-[#1C2333] p-6 md:p-12 rounded-[3rem] shadow-xl border border-white/20 relative overflow-hidden z-10 w-full"
              >
                {/* Visual Blueprint accents */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 dark:bg-white/5 rounded-bl-[4rem] flex items-center justify-center border-l border-b border-black/10 dark:border-white/10 pointer-events-none">
                  <span className="font-mono text-[10px] rotate-90 tracking-[0.5em] opacity-20 text-black dark:text-white uppercase">Form_Asset</span>
                </div>

                <div className="relative z-10">
                  <form onSubmit={handleAuth} className="space-y-6">
                    {!isLogin && (
                      <>
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase font-mono tracking-widest text-black/60 dark:text-white/60 ml-1">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" />
                            <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Aditya Srivastava" className="h-11 sm:h-14 w-full rounded-2xl bg-[#E5DACE] dark:bg-[#20293A] border-transparent focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 focus:bg-white dark:focus:bg-[#2a364a] transition-all text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 shadow-sm pl-12 pr-5" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <label className="text-[10px] uppercase font-mono tracking-widest text-black/60 dark:text-white/60 ml-1">Phone Number</label>
                            <div className="relative">
                              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" />
                              <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 XXXXX" className="h-11 sm:h-14 w-full rounded-2xl bg-[#E5DACE] dark:bg-[#20293A] border-transparent focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 focus:bg-white dark:focus:bg-[#2a364a] transition-all text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 shadow-sm pl-12 pr-5" />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <label className="text-[10px] uppercase font-mono tracking-widest text-black/60 dark:text-white/60 ml-1">City</label>
                            <div className="relative">
                              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" />
                              <input required type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Jaipur" className="h-11 sm:h-14 w-full rounded-2xl bg-[#E5DACE] dark:bg-[#20293A] border-transparent focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 focus:bg-white dark:focus:bg-[#2a364a] transition-all text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 shadow-sm pl-12 pr-5" />
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-black/60 dark:text-white/60 ml-1">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" />
                        <input 
                          required 
                          type="email" 
                          autoComplete="off"
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="name@provider.com" 
                          className="h-11 sm:h-14 w-full rounded-2xl bg-[#E5DACE] dark:bg-[#20293A] border-transparent focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 focus:bg-white dark:focus:bg-[#2a364a] transition-all text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 shadow-sm pl-12 pr-5" 
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-black/60 dark:text-white/60 ml-1">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" />
                        <input 
                          required 
                          type="password" 
                          autoComplete="new-password"
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                          placeholder="••••••••" 
                          className="h-11 sm:h-14 w-full rounded-2xl bg-[#E5DACE] dark:bg-[#20293A] border-transparent focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 focus:bg-white dark:focus:bg-[#2a364a] transition-all text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 shadow-sm pl-12 pr-5" 
                        />
                      </div>
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full h-14 sm:h-16 rounded-full text-lg font-bold shadow-[0_20px_40px_rgba(0,0,0,0.3)] bg-black dark:bg-[#4A7DE3] text-white hover:bg-black/80 dark:hover:bg-[#4A7DE3]/80 group relative overflow-hidden transition-all duration-500 mt-8 flex items-center justify-center gap-2">
                      <span className="relative z-10 flex items-center gap-2">
                        {isLoading ? "Processing..." : isLogin ? "Log in" : "Create my account"}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </button>
                  </form>

                  <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-sm font-medium text-black/60 dark:text-white/60">
                      {isLogin ? "New professional?" : "Already have an account?"}
                    </span>
                    <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-sm font-bold text-black dark:text-white hover:underline underline-offset-4">
                      {isLogin ? "Create an account" : "Log in"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </main>
      </div>
    </Layout>
  );
}
