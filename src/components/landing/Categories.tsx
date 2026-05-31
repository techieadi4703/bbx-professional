import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Wrench, Hammer, PaintBucket, Pickaxe, Wind, Sofa, Flame, LayoutGrid, Grid3x3, Square } from 'lucide-react';
import { Reveal, RevealItem } from '@/components/shared/Reveal';
import { PROFESSIONS } from '@/lib/professions';

const iconMap: Record<string, React.ElementType> = {
  "Electrician": Zap,
  "Plumber": Wrench,
  "Carpenter": Hammer,
  "Painter": PaintBucket,
  "Mason": Pickaxe,
  "HVAC Technician": Wind,
  "Interior Fitter": Sofa,
  "Welder": Flame,
  "False Ceiling Expert": LayoutGrid,
  "Tile Layer": Grid3x3,
  "Glass & Aluminium Worker": Square,
};

export const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 md:py-24 bg-[#fcf9f6] border-t border-[#e5e2df]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <Reveal width="100%">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-headline tracking-tight text-[#1c1c1a]">
              Trades we hire for
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
            {PROFESSIONS.map((trade, i) => {
              const Icon = iconMap[trade] || Hammer;
              return (
                <RevealItem key={i}>
                  <button 
                    onClick={() => navigate(`/auth?mode=signup&trade=${encodeURIComponent(trade)}`)}
                    className="w-full h-full bg-[#fcf9f6] border border-[#e5e2df] rounded-xl p-2 sm:p-6 flex flex-col items-center justify-center gap-1.5 sm:gap-4 hover:border-[#735c00] hover:bg-white hover:shadow-md transition-all text-center group"
                  >
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#74777d] group-hover:text-[#735c00] transition-colors" />
                    <span className="font-body text-xs sm:text-sm font-bold text-[#1c1c1a]">{trade}</span>
                  </button>
                </RevealItem>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
