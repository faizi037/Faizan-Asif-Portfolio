import { motion } from 'framer-motion';
import { useCountAnimation } from '@/hooks/useCountAnimation';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter = ({ 
  end, 
  suffix = '', 
  prefix = '', 
  duration = 2000,
  className = ''
}: AnimatedCounterProps) => {
  const { ref, displayValue } = useCountAnimation({ 
    end, 
    suffix, 
    prefix, 
    duration 
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      {displayValue}
    </motion.div>
  );
};