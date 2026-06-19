import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Star, Clock, Calendar, CheckCircle, Mail, User, ListTodo, Wallet, MessageSquare, LogOut, ArrowRight, Save, Trash, X, MapPin, Briefcase, IndianRupee, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfessionalDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [slots, setSlots] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("slots");

  const [newSlot, setNewSlot] = useState({
    date: "",
    startTime: "",
    endTime: ""
  });

  const [skillsInput, setSkillsInput] = useState("");
  const [languagesInput, setLanguagesInput] = useState("");
  const [portfolioInput, setPortfolioInput] = useState("");

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);

      // First check role in profiles table to avoid mis-redirection
      const { data: profileData } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .maybeSingle();

      if (profileData && profileData.role !== "professional") {
        navigate("/dashboard");
        return;
      }

      const { data: profData, error: profError } = await supabase
        .from("professionals")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (profError || !profData) {
        navigate("/setup");
        return;
      }

      setProfile(profData);
      setSkillsInput((profData.skills || []).join(", "));
      setLanguagesInput((profData.languages || []).join(", "));
      setPortfolioInput((profData.portfolio_urls || []).join(", "));

      const today = new Date().toISOString().split('T')[0];
      const { data: slotsData } = await supabase
        .from("professional_slots")
        .select("*")
        .eq("professional_id", session.user.id)
        .gte("date", today)
        .order("date", { ascending: true })
        .order("start_time", { ascending: true });

      if (slotsData) setSlots(slotsData);

      const { data: reviewsData } = await supabase
        .from("professional_reviews")
        .select("*")
        .eq("professional_id", session.user.id)
        .order("created_at", { ascending: false });

      if (reviewsData) setReviews(reviewsData);
    } catch (err: any) {
      console.error("ProfessionalDashboard fetchData error:", err);
      toast({ title: "Load Failed", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      const skills = skillsInput.split(",").map(s => s.trim()).filter(s => s);
      const languages = languagesInput.split(",").map(l => l.trim()).filter(l => l);
      const portfolio_urls = portfolioInput.split(",").map(p => p.trim()).filter(p => p);

      const { error: professionalError } = await supabase
        .from("professionals")
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
          profession: profile.profession,
          bio: profile.bio,
          city: profile.city,
          address: profile.address,
          pincode: profile.pincode,
          hourly_rate: profile.hourly_rate,
          daily_rate: profile.daily_rate,
          years_experience: profile.years_experience,
          is_available: profile.is_available,
          skills,
          languages,
          portfolio_urls
        })
        .eq("id", profile.id);

      if (professionalError) throw professionalError;

      if (profile.full_name) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ full_name: profile.full_name })
          .eq('id', profile.id);
        if (profileError) throw profileError;
      }
      toast({ title: "Profile updated successfully!" });
      fetchData();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Update Failed", description: error.message });
    }
  };

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    if (!newSlot.startTime || !newSlot.endTime) {
      toast({ variant: "destructive", title: "Time Required", description: "Please select both start and end times." });
      return;
    }

    if (newSlot.endTime <= newSlot.startTime) {
      toast({ variant: "destructive", title: "Invalid Time Range", description: "End time must be later than start time." });
      return;
    }

    try {
      const { error } = await supabase
        .from("professional_slots")
        .insert({
          professional_id: profile.id,
          date: newSlot.date,
          start_time: newSlot.startTime,
          end_time: newSlot.endTime,
        });

      if (error) throw error;
      toast({ title: "Slot added successfully." });
      setNewSlot({ date: "", startTime: "", endTime: "" });
      fetchData();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Adding Slot Failed", description: error.message });
    }
  };

  const handleDeleteSlot = async (slotId: number) => {
    try {
      const { error } = await supabase
        .from("professional_slots")
        .delete()
        .eq("id", slotId);

      if (error) throw error;
      toast({ title: "Slot removed." });
      fetchData();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Delete Failed", description: error.message });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (isLoading || !profile) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] bg-surface">
          <div className="w-10 h-10 border-4 border-border border-t-secondary rounded-full animate-spin"></div>
          <p className="font-body text-xs font-bold uppercase tracking-widest text-on-surface-variant mt-6">Loading Dashboard...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="bg-surface text-on-surface min-h-screen font-body w-full pb-20 relative">
        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-blueprint opacity-30" />

        <main className="max-w-[1440px] mx-auto px-4 md:px-12 pt-2 pb-6 md:py-24 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

            {/* Sidebar Navigation */}
            <div className="hidden lg:block w-1/4 shrink-0 sticky top-32">
              <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-headline font-semibold tracking-tight text-on-surface mb-1 flex items-center gap-2">
                  Hi, {profile.full_name?.split(' ')[0]}
                </h1>
                <p className="text-sm text-on-surface-variant mb-4">Professional Portal</p>

                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="px-2.5 py-0.5 font-bold text-[10px] uppercase tracking-widest bg-surface border-border text-on-surface-variant">{profile.profession}</Badge>
                  {profile.years_experience > 0 && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant bg-surface-container-low border border-transparent px-2.5 py-0.5 rounded-full">{profile.years_experience} Yrs Exp</span>
                  )}
                </div>
              </div>

              <div className="space-y-2 pt-6 border-t border-border">
                {[
                  { id: "profile", label: "My Profile", icon: User },
                  { id: "slots", label: "Manage Schedule", icon: Calendar },
                  { id: "earnings", label: "Earnings", icon: Wallet },
                  { id: "reviews", label: "Customer Reviews", icon: MessageSquare },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all relative group font-bold text-sm ${activeTab === item.id
                        ? "bg-surface-container-lowest border border-border text-on-surface shadow-sm"
                        : "border border-transparent text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-4 h-4 ${activeTab === item.id ? "text-secondary" : "opacity-70"}`} />
                      <span>{item.label}</span>
                    </div>
                    {activeTab === item.id && (
                      <ArrowRight className="w-4 h-4 text-secondary" />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-4 text-on-surface-variant hover:bg-red-50 hover:text-red-600 rounded-xl transition-all font-bold text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full lg:w-3/4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-surface-container-lowest border border-border p-4 md:p-12 rounded-2xl shadow-sm shadow-black/5 min-h-[600px]"
                >

                  {/* PROFILE TAB */}
                  {activeTab === "profile" && (
                    <div className="space-y-10">
                      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8">
                        <div>
                          <h2 className="text-3xl font-headline tracking-tight mb-2">My <span className="italic">Profile</span></h2>
                          <p className="text-sm font-body text-on-surface-variant">Manage your public professional information and rates.</p>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
                          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Status:</span>
                          <button
                            onClick={() => setProfile({ ...profile, is_available: !profile.is_available })}
                            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${profile.is_available
                                ? "bg-secondary text-secondary-foreground shadow-md shadow-secondary/20"
                                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                              }`}
                          >
                            {profile.is_available ? "Available" : "Unavailable"}
                          </button>
                          <button
                            onClick={handleLogout}
                            className="lg:hidden px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-all flex items-center gap-1.5"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            Log out
                          </button>
                        </div>
                      </header>

                      <form onSubmit={handleUpdateProfile} className="space-y-6 md:space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-6">

                          {/* Full Name */}
                          <div className="space-y-2 opacity-70">
                            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Full Name</label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                              <input value={profile.full_name} disabled className="w-full pl-11 pr-4 py-2 md:py-3 bg-surface-container-low border border-transparent rounded-lg text-sm font-bold outline-none cursor-not-allowed" />
                            </div>
                          </div>

                          {/* Trade */}
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Trade *</label>
                            <div className="relative">
                              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                              <input value={profile.profession} onChange={e => setProfile({ ...profile, profession: e.target.value })} className="w-full pl-11 pr-4 py-2 md:py-3 bg-surface-container-low border border-transparent focus:border-secondary rounded-lg text-sm font-bold outline-none transition-colors" />
                            </div>
                          </div>

                          {/* Rates */}
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Hourly Rate (₹)</label>
                            <div className="relative">
                              <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                              <input type="number" value={profile.hourly_rate} onChange={e => setProfile({ ...profile, hourly_rate: parseInt(e.target.value) })} className="w-full pl-11 pr-4 py-2 md:py-3 bg-surface-container-low border border-transparent focus:border-secondary rounded-lg text-sm font-bold outline-none transition-colors" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Daily Rate (₹)</label>
                            <div className="relative">
                              <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                              <input type="number" value={profile.daily_rate} onChange={e => setProfile({ ...profile, daily_rate: parseInt(e.target.value) })} className="w-full pl-11 pr-4 py-2 md:py-3 bg-surface-container-low border border-transparent focus:border-secondary rounded-lg text-sm font-bold outline-none transition-colors" />
                            </div>
                          </div>

                          {/* City */}
                          <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">City</label>
                            <div className="relative">
                              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                              <input value={profile.city} onChange={e => setProfile({ ...profile, city: e.target.value })} className="w-full pl-11 pr-4 py-2 md:py-3 bg-surface-container-low border border-transparent focus:border-secondary rounded-lg text-sm font-bold outline-none transition-colors" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Skills (comma-separated)</label>
                            <input value={skillsInput} onChange={e => setSkillsInput(e.target.value)} placeholder="Structural Wiring, Civil Foundations..." className="w-full px-4 py-2 md:py-3 bg-surface-container-low border border-transparent focus:border-secondary rounded-lg text-sm font-bold outline-none transition-colors" />
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Professional Bio</label>
                            <textarea value={profile.bio || ""} onChange={e => setProfile({ ...profile, bio: e.target.value })} rows={3} placeholder="A brief summary of your expertise and experience..." className="w-full px-4 py-2 md:py-3 bg-surface-container-low border border-transparent focus:border-secondary rounded-lg text-sm font-bold outline-none transition-colors resize-none" />
                          </div>
                        </div>

                        <div className="pt-8 border-t border-border flex justify-end">
                          <button type="submit" className="flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-secondary transition-colors shadow-md text-sm">
                            <Save className="w-4 h-4" />
                            Save Profile Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* SCHEDULE TAB */}
                  {activeTab === "slots" && (
                    <div className="space-y-10">
                      <header className="border-b border-border pb-8">
                        <h2 className="text-3xl font-headline tracking-tight mb-2">Manage <span className="italic">Schedule</span></h2>
                        <p className="text-sm font-body text-on-surface-variant">Add your available time slots so clients can book you.</p>
                      </header>

                      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">

                        {/* Add Slot Form */}
                        <div className="xl:col-span-5 space-y-6">
                          <div className="bg-surface p-5 md:p-8 rounded-2xl border border-border">
                            <h3 className="text-lg font-headline font-bold mb-6 flex items-center gap-2">
                              <Calendar className="w-5 h-5 text-secondary" />
                              Add Availability
                            </h3>
                            <form onSubmit={handleAddSlot} className="space-y-5">
                              <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Date</label>
                                <input type="date" required min={new Date().toISOString().split('T')[0]} value={newSlot.date} onChange={e => setNewSlot({ ...newSlot, date: e.target.value })} className="w-full px-4 py-3 bg-surface-container-lowest border border-border focus:border-secondary rounded-lg text-sm outline-none font-bold transition-colors" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Start time</label>
                                  <input type="time" required value={newSlot.startTime} onChange={e => setNewSlot({ ...newSlot, startTime: e.target.value, endTime: newSlot.endTime && newSlot.endTime <= e.target.value ? "" : newSlot.endTime })} className="w-full px-4 py-3 bg-surface-container-lowest border border-border focus:border-secondary rounded-lg text-sm outline-none font-bold transition-colors" />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">End time</label>
                                  <input type="time" required min={newSlot.startTime || undefined} value={newSlot.endTime} onChange={e => setNewSlot({ ...newSlot, endTime: e.target.value })} className="w-full px-4 py-3 bg-surface-container-lowest border border-border focus:border-secondary rounded-lg text-sm outline-none font-bold transition-colors" />
                                </div>
                              </div>
                              <button type="submit" className="w-full py-3.5 mt-2 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-secondary transition-colors shadow-md text-sm">
                                Add Slot
                              </button>
                            </form>
                          </div>
                        </div>

                        {/* Upcoming Slots */}
                        <div className="xl:col-span-7 space-y-6">
                          <h3 className="text-lg font-headline font-bold mb-4">Upcoming Slots</h3>
                          {slots.length === 0 ? (
                            <div className="py-16 text-center border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center bg-surface">
                              <Calendar className="w-10 h-10 text-outline-variant mb-4" />
                              <p className="text-sm font-bold text-on-surface-variant">No upcoming availability.</p>
                              <p className="text-xs text-outline-variant mt-1">Add slots using the form to receive bookings.</p>
                            </div>
                          ) : (
                            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                              {slots.map((slot) => (
                                <div key={slot.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-surface-container-lowest border border-border rounded-xl hover:border-secondary transition-all gap-4">
                                  <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 shrink-0 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface">
                                      <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-bold text-on-surface">{new Date(slot.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                      <p className="text-xs font-bold text-on-surface-variant mt-1 bg-surface inline-block px-2 py-0.5 rounded border border-border">
                                        {slot.start_time.substring(0, 5)} — {slot.end_time.substring(0, 5)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center sm:justify-end justify-start w-full sm:w-auto">
                                    {slot.is_booked ? (
                                      <Badge className="bg-secondary text-secondary-foreground font-bold text-xs uppercase tracking-widest px-3 py-1.5">Booked</Badge>
                                    ) : (
                                      <button
                                        onClick={() => handleDeleteSlot(slot.id)}
                                        className="px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 flex items-center gap-2"
                                      >
                                        <Trash className="w-3 h-3" />
                                        Remove
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* EARNINGS TAB */}
                  {activeTab === "earnings" && (
                    <div className="space-y-10">
                      <header className="border-b border-border pb-8">
                        <h2 className="text-3xl font-headline tracking-tight mb-2">My <span className="italic">Earnings</span></h2>
                        <p className="text-sm font-body text-on-surface-variant">Track your jobs, ratings, and financial performance.</p>
                      </header>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                          { label: "Jobs Completed", value: profile.total_jobs, icon: CheckCircle },
                          { label: "Overall Rating", value: profile.rating, icon: Star, highlight: true },
                          { label: "Total Reviews", value: profile.total_reviews, icon: MessageSquare }
                        ].map((stat, i) => (
                          <div key={i} className="p-6 border border-border bg-surface rounded-2xl relative overflow-hidden group hover:border-secondary transition-colors">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 bg-surface-container-lowest border border-border shadow-sm ${stat.highlight ? "text-secondary" : "text-on-surface"}`}>
                              <stat.icon className="w-5 h-5" />
                            </div>
                            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">{stat.label}</p>
                            <p className="text-4xl font-headline font-black text-on-surface">{stat.value || "0"}</p>
                          </div>
                        ))}
                      </div>

                      <div className="py-24 mt-8 rounded-2xl text-center border-2 border-dashed border-border bg-surface">
                        <Wallet className="w-12 h-12 mx-auto mb-4 text-outline-variant" />
                        <h3 className="text-lg font-bold text-on-surface">Detailed Ledger</h3>
                        <p className="text-sm text-on-surface-variant mt-2">Coming soon to the dashboard.</p>
                      </div>
                    </div>
                  )}

                  {/* REVIEWS TAB */}
                  {activeTab === "reviews" && (
                    <div className="space-y-10">
                      <header className="border-b border-border pb-8">
                        <h2 className="text-3xl font-headline tracking-tight mb-2">Customer <span className="italic">Reviews</span></h2>
                        <p className="text-sm font-body text-on-surface-variant">See what clients are saying about your work.</p>
                      </header>

                      {reviews.length === 0 ? (
                        <div className="py-24 text-center border border-border rounded-2xl bg-surface">
                          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-outline-variant" />
                          <h3 className="text-lg font-bold text-on-surface">No reviews yet</h3>
                          <p className="text-sm text-on-surface-variant mt-2">Complete jobs to start receiving feedback from clients.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {reviews.map((rev) => (
                            <div key={rev.id} className="p-5 md:p-8 border border-border rounded-2xl bg-surface-container-lowest hover:border-secondary transition-all shadow-sm">
                              <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-4 h-4 ${i < rev.rating ? "text-secondary fill-current" : "text-outline-variant"}`} />
                                ))}
                              </div>
                              <p className="font-body text-base text-on-surface leading-relaxed italic mb-6">"{rev.review}"</p>
                              <div className="flex justify-between items-center border-t border-border pt-4">
                                <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-1 text-on-surface-variant">
                                  <ShieldCheck className="w-4 h-4 text-green-600" />
                                  Verified
                                </span>
                                <span className="text-xs font-bold text-outline-variant">{new Date(rev.created_at).toLocaleDateString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-50 px-3 sm:px-6 py-2 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]">
          <nav className="flex items-center justify-around">
            {[
              { id: "slots", label: "Schedule", icon: Calendar },
              { id: "earnings", label: "Earnings", icon: Wallet },
              { id: "reviews", label: "Reviews", icon: MessageSquare },
              { id: "profile", label: "Profile", icon: User },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="relative flex flex-col items-center gap-1 py-1"
                >
                  <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-secondary text-secondary-foreground shadow-lg' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50'}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[9px] font-bold tracking-widest uppercase transition-colors ${isActive ? 'text-secondary' : 'text-on-surface-variant'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

      </div>
    </Layout>
  );
}
