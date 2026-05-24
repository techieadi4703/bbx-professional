import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';

export const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const testimonials = [
    {
      name: "Anil Kumar",
      city: "Lucknow",
      trade: "Electrician",
      before: "₹15,000/mo",
      after: "₹38,000/mo",
      quote: "I used to chase work. Now jobs come to me. My family finally feels secure.",
      photoUrl: "https://i.pravatar.cc/200?img=11"
    },
    {
      name: "Rekha Devi",
      city: "Jaipur",
      trade: "Painter",
      before: "₹12,000/mo",
      after: "₹32,000/mo",
      quote: "Training made me confident with new techniques. Customers leave great reviews.",
      photoUrl: "https://i.pravatar.cc/200?img=5"
    },
    {
      name: "Ramesh Singh",
      city: "Varanasi",
      trade: "Mason",
      before: "₹18,000/mo",
      after: "₹45,000/mo",
      quote: "BuildBazaarX respects my craft. The weekly payouts mean I never have to wait.",
      photoUrl: "https://i.pravatar.cc/200?img=12"
    },
    {
      name: "Sunil Verma",
      city: "Pune",
      trade: "Plumber",
      before: "₹20,000/mo",
      after: "₹42,000/mo",
      quote: "The insurance cover gives me peace of mind. I'm focusing completely on my work now.",
      photoUrl: "https://i.pravatar.cc/200?img=13"
    },
    {
      name: "Karan Patel",
      city: "Ahmedabad",
      trade: "Carpenter",
      before: "₹22,000/mo",
      after: "₹50,000/mo",
      quote: "Steady jobs in my own locality. I've grown from Classic to Elite tier.",
      photoUrl: "https://i.pravatar.cc/200?img=14"
    },
    {
      name: "Vinod Kumar",
      city: "Chennai",
      trade: "Tile Layer",
      before: "₹16,000/mo",
      after: "₹35,000/mo",
      quote: "Transparent pricing is the best part. No more bargaining with customers.",
      photoUrl: "https://i.pravatar.cc/200?img=15"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#fcf9f6] border-y border-[#e5e2df]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <Reveal width="100%">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-headline tracking-tight text-[#1c1c1a]">
              Stories from our <span className="italic text-[#735c00]">partners</span>
            </h2>
          </div>

          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {testimonials.map((t, i) => (
                  <div key={i} className="pl-4 min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3">
                    <div className="bg-white border border-[#e5e2df] p-8 rounded-2xl h-full flex flex-col justify-between group hover:border-[#735c00] transition-colors">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <img src={t.photoUrl} alt={t.name} className="w-16 h-16 rounded-full object-cover bg-[#f6f3f0]" />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-headline font-bold text-xl text-[#1c1c1a]">{t.name}</h3>
                              <CheckCircle className="w-4 h-4 text-[#735c00]" />
                            </div>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#74777d] mt-1">{t.trade} · {t.city}</p>
                          </div>
                        </div>
                        <p className="font-headline italic text-2xl text-[#1c1c1a] leading-snug mb-8">"{t.quote}"</p>
                      </div>
                      
                      <div className="bg-[#fcf9f6] rounded-xl p-4 flex items-center justify-between border border-[#e5e2df]">
                        <div className="text-center">
                          <p className="text-[10px] uppercase font-bold tracking-widest text-[#74777d]">Before</p>
                          <p className="text-[#1c1c1a] font-bold mt-1">{t.before}</p>
                        </div>
                        <div className="text-[#735c00] font-bold">&rarr;</div>
                        <div className="text-center">
                          <p className="text-[10px] uppercase font-bold tracking-widest text-[#74777d]">After</p>
                          <p className="text-[#735c00] font-bold mt-1">{t.after}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation under the carousel */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${index === selectedIndex ? 'bg-[#735c00]' : 'bg-[#e5e2df]'}`}
                    onClick={() => scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  className="w-12 h-12 rounded-full border border-[#e5e2df] flex items-center justify-center text-[#1c1c1a] hover:bg-[#fcf9f6] transition-colors disabled:opacity-50"
                  onClick={scrollPrev}
                  disabled={!prevBtnEnabled}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  className="w-12 h-12 rounded-full border border-[#e5e2df] flex items-center justify-center text-[#1c1c1a] hover:bg-[#fcf9f6] transition-colors disabled:opacity-50"
                  onClick={scrollNext}
                  disabled={!nextBtnEnabled}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
