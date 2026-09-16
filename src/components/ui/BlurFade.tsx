'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

// Adapted from Magic UI's Blur Fade, discovered via 21st.dev (MIT).
// https://21st.dev/@dillionverma/components/blur-fade
export default function BlurFade({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0.35, filter: 'blur(8px)', y: 16 }} whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
