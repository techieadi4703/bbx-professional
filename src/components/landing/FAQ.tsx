import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Reveal } from '@/components/shared/Reveal';

export const FAQ = () => {
  const faqs = [
    {
      q: "Who can join BuildBazaarX as a professional?",
      a: "Any skilled tradesperson with valid identification and at least 1 year of hands-on experience can apply. We currently onboard electricians, plumbers, carpenters, painters, and other specialized construction trades."
    },
    {
      q: "Is there any joining fee?",
      a: "No, there is absolutely zero joining fee. BuildBazaarX takes a small platform commission only on the jobs you successfully complete through the app."
    },
    {
      q: "When and how do I get paid?",
      a: "All your earnings (minus platform fees) are transferred directly to your registered bank account every week. You can track your daily earnings right inside the app."
    },
    {
      q: "Do I need my own tools?",
      a: "Yes, you must bring your own standard toolkit. However, for specialized equipment or high-value tools, we offer tool-financing loans through our NBFC partners."
    },
    {
      q: "What documents do I need to verify?",
      a: "You'll need a government-issued ID (Aadhaar or PAN), a passport-sized photo, bank account details for payouts, and any trade certifications if applicable."
    },
    {
      q: "How does the verification process work?",
      a: "After you apply, our team will review your documents. You'll then be invited for a short skills assessment at our local training center. Once you pass, your profile goes live."
    },
    {
      q: "Can I work part-time / set my own hours?",
      a: "Absolutely. BuildBazaarX gives you complete control over your schedule. You can mark yourself as available only on weekends, evenings, or whenever you are free."
    },
    {
      q: "I am new to the trade — do you train me?",
      a: "We require a basic level of experience to join, but once you are a partner, we provide free upskilling workshops led by certified master craftsmen to help you learn advanced techniques."
    },
    {
      q: "How are customer disputes handled?",
      a: "We have a dedicated support team to mediate disputes fairly. If the issue is due to a faulty part, we cover it. If it's a workmanship error, we ask you to fix it at no extra cost to maintain your rating."
    },
    {
      q: "How do I get promoted to Prime / Elite?",
      a: "Promotions happen automatically at the end of each quarter based on three metrics: your average customer rating, your job completion rate, and the total number of jobs done."
    }
  ];

  return (
    <section className="py-10 md:py-24 bg-white">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <Reveal width="100%">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-headline tracking-tight text-[#1c1c1a]">
              Frequently asked <span className="italic text-[#735c00]">questions</span>
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-[#e5e2df] bg-[#fcf9f6] rounded-xl px-4 md:px-6">
                <AccordionTrigger className="font-headline font-bold text-lg md:text-xl text-[#1c1c1a] hover:no-underline text-left py-4 md:py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#74777d] font-body text-base leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
};
