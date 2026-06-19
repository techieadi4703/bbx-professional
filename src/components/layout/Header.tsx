import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MapPin, ChevronDown, LogOut } from "lucide-react";
import { CITIES } from "@/lib/professions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { logoIcon } from "@/lib/cdnImages";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export const CitySelector = () => {
  const [city, setCity] = useState("Varanasi");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bbx_city");
    if (saved && CITIES.includes(saved)) {
      setCity(saved);
    }
  }, []);

  const handleSelect = (c: string) => {
    setCity(c);
    localStorage.setItem("bbx_city", c);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
          <MapPin className="w-4 h-4" />
          <span className="font-body text-sm font-medium">{city}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-surface-container-lowest border-border p-6 rounded-xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl tracking-tight text-on-surface">Select your city</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {CITIES.map((c) => (
            <button
              key={c}
              onClick={() => handleSelect(c)}
              className={`p-3 text-sm font-body font-medium rounded-lg border transition-all ${city === c
                ? "border-secondary bg-secondary/5 text-secondary"
                : "border-border hover:border-secondary text-on-surface"
                }`}
            >
              {c}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === "/dashboard";
  const { isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${scrolled
        ? "bg-surface-container-lowest/95 backdrop-blur-md shadow-sm border-b border-border text-on-surface py-2.5 md:py-3"
        : "bg-transparent text-on-surface py-3 md:py-5"
        }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex items-center justify-between h-10 md:h-12">

        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group">
          <img src={logoIcon} className="h-[28px] sm:h-[37px] w-auto object-contain shrink-0" alt="BuildBazaarX Logo Icon" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-1 leading-none">
            <span className="text-[15px] sm:text-2xl font-headline font-bold tracking-tight leading-none">BuildBazaarX</span>
            <span className="text-[10px] sm:text-xl font-headline italic text-secondary leading-none">Professional</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8 font-body text-sm font-medium">
            <a href="https://buildbazaarx.com" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">Book a service</a>
            <CitySelector />
          </nav>

          <div className="flex items-center gap-6">
            <ThemeToggle />
            {!isAuthenticated ? (
              <Link
                to="/auth?mode=login"
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-body font-semibold hover:bg-secondary transition-colors flex items-center gap-2"
              >
                Log in
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="bg-secondary text-secondary-foreground px-6 py-2.5 rounded-lg text-sm font-body font-semibold hover:bg-primary hover:text-primary-foreground transition-colors flex items-center gap-2"
              >
                Dashboard
              </Link>
            )}
            {/* <Link
              to="/auth?mode=signup"
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-body font-bold hover:bg-secondary transition-colors flex items-center gap-2"
            >
              Apply now <span aria-hidden="true">&rarr;</span>
            </Link> */}
          </div>
        </div>

        {/* Mobile Action Button */}
        {!isDashboard && (
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            {!isAuthenticated ? (
              <Link
                to="/auth?mode=login"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-body font-semibold hover:bg-secondary transition-colors"
              >
                Log in
              </Link>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="bg-secondary/10 text-secondary px-4 py-2 rounded-lg text-sm font-body font-semibold hover:bg-secondary/20 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-surface-container-low text-on-surface border border-border px-3 py-2 rounded-lg text-sm font-body font-semibold hover:bg-surface-container transition-colors flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        )}

      </div>
    </header>
  );
};
