import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1c1c1a] text-white/80 font-body py-6 md:py-16">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 mb-8 md:mb-16">
          
          {/* Column 1 */}
          <div className="space-y-3 md:space-y-6 col-span-2 sm:col-span-1">
            <Link to="/" className="flex flex-col gap-1 inline-block">
              <span className="text-2xl font-headline font-bold tracking-tight text-white">BuildBazaarX</span>
              <span className="text-xl font-headline italic text-[#735c00]">Professional</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Empowering India's best trade professionals with steady jobs, fair pay, and comprehensive benefits.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="X (Twitter)"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-3 md:space-y-6">
            <h3 className="font-headline text-lg text-white">Company</h3>
            <ul className="space-y-2 md:space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Anti-Discrimination Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Information Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-3 md:space-y-6">
            <h3 className="font-headline text-lg text-white">For Professionals</h3>
            <ul className="space-y-2 md:space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Welfare Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-3 md:space-y-6">
            <h3 className="font-headline text-lg text-white">For Customers</h3>
            <ul className="space-y-2 md:space-y-4 text-sm">
              <li><a href="https://buildbazaarx.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Book a service</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-[10px] uppercase tracking-widest text-white/50">* Statistics as on Dec 31, 2024</p>
            <p className="text-sm">&copy; 2014–{currentYear} BuildBazaarX Technologies</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
