import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
        {eyebrow}
      </p>
      <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-slate-300">{description}</p>
    </motion.div>
  );
}
