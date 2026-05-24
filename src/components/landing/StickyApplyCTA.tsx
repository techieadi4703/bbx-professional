import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export const StickyApplyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling down roughly half a hero section height (e.g. 400px)
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
          transition={{ duration: 0.3 }}
          className="fixed z-50 bottom-0 inset-x-0 md:inset-x-auto md:bottom-8 md:right-8"
        >
          {/* Desktop Version */}
          <div className="hidden md:block">
            <Link 
              to="/auth?mode=signup" 
              className="flex items-center gap-3 bg-[#1c1c1a] text-white px-8 py-4 rounded-full shadow-2xl font-body font-bold text-lg hover:bg-[#735c00] hover:scale-105 transition-all"
            >
              Apply now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Version */}
          <div className="md:hidden bg-white border-t border-[#e5e2df] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] p-4 flex items-center gap-3">
            <a 
              href="tel:+919876543210" 
              className="flex-1 flex items-center justify-center gap-2 bg-[#fcf9f6] text-[#1c1c1a] border border-[#e5e2df] py-3.5 rounded-xl font-bold font-body"
            >
              <Phone className="w-4 h-4" /> Call us
            </a>
            <Link 
              to="/auth?mode=signup" 
              className="flex-1 flex items-center justify-center gap-2 bg-[#1c1c1a] text-white py-3.5 rounded-xl font-bold font-body"
            >
              Apply now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
