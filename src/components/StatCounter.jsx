import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function StatCounter({ value, suffix = '', label, citation, duration = 1.5 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const numericValue = parseInt(value.toString().replace(/,/g, ''));
    const startTime = Date.now();
    const durationMs = duration * 1000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericValue));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-start text-center bg-white border-2 border-primary/10 rounded-3xl px-4 py-8 min-h-[160px] shadow-md shadow-primary/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
    >
      <div className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-3 leading-tight break-words w-full">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="font-body text-xs sm:text-sm text-muted-foreground leading-snug mb-2">
        {label}
      </p>
      {citation && (
        <p className="font-body text-[10px] text-muted-foreground/60 italic mt-auto">
          {citation}
        </p>
      )}
    </motion.div>
  );
}