import React from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/shared/Reveal";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Help() {
  const faqs = [
    {
      q: "How do I start receiving jobs?",
      a: "Once you complete your setup and your profile is verified by our team, ensure your status is marked as 'Available for Jobs' in your Dashboard. You'll start receiving notifications for jobs in your selected city."
    },
    {
      q: "How does the payment process work?",
      a: "Payments are processed securely through the BuildBazaarX platform. For hourly jobs, earnings are calculated automatically and disbursed to your registered bank account weekly. For contract jobs, milestone payments apply."
    },
    {
      q: "Can I choose my own hours?",
      a: "Yes. Use the 'Manage Schedule' tab in your Dashboard to add specific time slots when you are available. Customers will only be able to book you during those pre-defined slots."
    },
    {
      q: "What if a customer cancels at the last minute?",
      a: "We offer cancellation protection. If a customer cancels within 2 hours of the scheduled slot, you will receive a standard cancellation fee to compensate for your blocked time."
    },
    {
      q: "How are my rates determined?",
      a: "You have full control over your hourly and daily rates. You can update them at any time from the 'My Profile' section in your Dashboard."
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Help & Support — BuildBazaarX Professional</title>
        <meta name="description" content="Get help and support for your BuildBazaarX Professional account." />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@200..800&display=swap');
        .font-headline { font-family: 'Newsreader', serif; }
        .font-body { font-family: 'Manrope', sans-serif; }
      `}</style>

      <div className="bg-[#fcf9f6] min-h-screen text-[#1c1c1a] font-body">
        {/* Header */}
        <section className="pt-16 pb-8 px-6 md:px-12 text-center border-b border-[#e5e2df]">
          <Reveal width="100%">
            <h1 className="text-4xl md:text-6xl font-headline tracking-tight leading-tight mb-6">
              How can we <span className="italic">help?</span>
            </h1>
            <p className="text-lg text-[#74777d] max-w-xl mx-auto">
              Find answers to common questions or reach out to our dedicated professional support team.
            </p>
          </Reveal>
        </section>

        <section className="py-10 md:py-24 px-6 md:px-12 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* FAQs */}
          <div className="lg:col-span-8">
            <Reveal width="100%">
              <h2 className="text-3xl font-headline tracking-tight mb-8">Frequently Asked <span className="italic">Questions</span></h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-[#e5e2df]">
                    <AccordionTrigger className="font-headline font-bold text-xl text-[#1c1c1a] hover:no-underline text-left py-6">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#74777d] leading-relaxed text-base pb-6">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>

          {/* Contact Support */}
          <div className="lg:col-span-4">
            <Reveal width="100%">
              <div className="bg-white border border-[#e5e2df] p-5 md:p-8 rounded-2xl shadow-sm md:sticky md:top-32">
                <h3 className="text-2xl font-headline tracking-tight mb-6">Contact <span className="italic">Support</span></h3>
                <p className="text-[#74777d] text-sm mb-8">
                  Our professional support team is available Monday through Saturday, 9 AM to 7 PM.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f6f3f0] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-[#735c00]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#74777d] mb-1">Helpline</p>
                      <p className="font-bold text-[#1c1c1a]">+91 1800 123 4567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f6f3f0] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-[#735c00]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#74777d] mb-1">Email</p>
                      <p className="font-bold text-[#1c1c1a]">partners@buildbazaarx.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f6f3f0] flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4 text-[#735c00]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#74777d] mb-1">WhatsApp</p>
                      <p className="font-bold text-[#1c1c1a]">+91 98765 43210</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </section>
      </div>
    </Layout>
  );
}
