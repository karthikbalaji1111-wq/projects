import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "../data";
import { SectionHeader } from "./SectionHeader";

export function FAQ() {
  return (
    <section id="faq" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 soft-grid opacity-30" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Questions"
          title="Built for the README details developers actually care about."
          description="Fast enough for a weekend project, structured enough for polished product launches."
        />

        <div className="mt-14 space-y-3">
          {faqs.map((faq, index) => (
            <motion.details
              key={faq.question}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              className="group rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-line backdrop-blur-xl open:bg-white/[0.075]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-white">
                {faq.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180 group-open:text-cyan-200" />
              </summary>
              <p className="mt-4 leading-7 text-slate-300">{faq.answer}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
