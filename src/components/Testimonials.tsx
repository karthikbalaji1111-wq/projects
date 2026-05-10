import { motion } from "framer-motion";
import { testimonials } from "../data";
import { SectionHeader } from "./SectionHeader";

export function Testimonials() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="absolute inset-x-0 top-1/2 h-72 -translate-y-1/2 bg-cyan-300/[0.035] blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Loved by builders"
          title="A README workflow that feels fast, refined, and surprisingly calm."
          description="From solo launches to engineering teams, the generator keeps documentation quality high without slowing the release rhythm."
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-6 shadow-line backdrop-blur-xl"
            >
              <blockquote className="text-lg leading-8 text-white">"{testimonial.quote}"</blockquote>
              <figcaption className="mt-8">
                <div className="font-semibold text-white">{testimonial.author}</div>
                <div className="mt-1 text-sm text-slate-400">{testimonial.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
