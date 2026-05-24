import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, MapPin, ChevronDown, X } from "lucide-react";
import { CITIES } from "@/lib/professions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
      <DialogContent className="sm:max-w-md bg-white border-[#e5e2df] p-6 rounded-xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl tracking-tight text-[#1c1c1a]">Select your city</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {CITIES.map((c) => (
            <button
              key={c}
              onClick={() => handleSelect(c)}
              className={`p-3 text-sm font-body font-medium rounded-lg border transition-all ${city === c
                ? "border-[#735c00] bg-[#735c00]/5 text-[#735c00]"
                : "border-[#e5e2df] hover:border-[#735c00] text-[#1c1c1a]"
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
        ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#e5e2df] text-[#1c1c1a] py-3"
        : "bg-transparent text-[#1c1c1a] py-5"
        }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between h-12">

        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-1 group">
          <span className="text-2xl font-headline font-bold tracking-tight">BuildBazaarX</span>
          <span className="text-xl font-headline italic text-[#735c00]">Professional</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8 font-body text-sm font-medium">
            <a href="https://buildbazaarx.com" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">Book a service</a>
            <Link to="/about" className="hover:opacity-70 transition-opacity">About</Link>
            <Link to="/help" className="hover:opacity-70 transition-opacity">Help</Link>
            <CitySelector />
          </nav>

          <div className="flex items-center gap-6">
            <Link
              to="/auth?mode=login"
              className="bg-[#1c1c1a] text-white px-6 py-2.5 rounded-full text-sm font-body font-bold hover:bg-[#735c00] transition-colors flex items-center gap-2"
            >
              Log in
            </Link>
            {/* <Link
              to="/auth?mode=signup"
              className="bg-[#1c1c1a] text-white px-6 py-2.5 rounded-full text-sm font-body font-bold hover:bg-[#735c00] transition-colors flex items-center gap-2"
            >
              Apply now <span aria-hidden="true">&rarr;</span>
            </Link> */}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 -mr-2">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Open Menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white border-l-[#e5e2df] text-[#1c1c1a] p-6 w-full sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="mt-8 flex flex-col gap-6 text-lg font-headline">
                  <a href="https://buildbazaarx.com" target="_blank" rel="noreferrer" className="hover:text-[#735c00]">Book a service</a>
                  <Link to="/about" className="hover:text-[#735c00]">About</Link>
                  <Link to="/help" className="hover:text-[#735c00]">Help</Link>
                </div>

                <div className="mt-8 border-t border-[#e5e2df] pt-8">
                  <CitySelector />
                </div>

                <div className="mt-auto mb-8 flex flex-col gap-3">
                  <Link
                    to="/auth?mode=login"
                    className="w-full bg-[#f6f3f0] text-[#1c1c1a] border border-[#e5e2df] px-6 py-4 rounded-full text-center text-sm font-body font-bold hover:bg-[#e5e2df] transition-colors block"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/auth?mode=signup"
                    className="w-full bg-[#1c1c1a] text-white px-6 py-4 rounded-full text-center text-sm font-body font-bold hover:bg-[#735c00] transition-colors block"
                  >
                    Apply now &rarr;
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
};
